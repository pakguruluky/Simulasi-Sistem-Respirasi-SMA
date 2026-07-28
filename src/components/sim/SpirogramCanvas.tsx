import React, { useEffect, useRef } from 'react';
import { SimParams, SimMetrics } from '../../types';

interface SpirogramCanvasProps {
  params: SimParams;
  metrics: SimMetrics;
}

export const SpirogramCanvas: React.FC<SpirogramCanvasProps> = ({ params, metrics }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    // Buffer array to store historical wave points
    const waveHistory: number[] = [];
    const maxPoints = 300;

    const width = 900;
    const height = 180;
    canvas.width = width * 2;
    canvas.height = height * 2;
    ctx.scale(2, 2);

    const render = () => {
      // Clear with dark slate background
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, width, height);

      // Draw Retro Medical ECG/Spirogram Grid
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 15) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 15) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Calculate current instant lung volume point
      // Normal FRC baseline = 2400 mL
      // Oscillates by Tidal Volume / 2
      const rr = params.respiratoryRate;
      const tv = params.tidalVolume;
      const freq = (rr / 60) * 0.08;

      time += 1;
      const waveVal = Math.sin(time * freq * Math.PI * 2) * (tv / 2);
      
      // Scale to canvas height: 0 mL = y:170, 6000 mL = y:10
      // Normal baseline FRC ~ 2400 mL
      const baseVol = 2400;
      const currentVol = baseVol + waveVal;

      // Push to history
      waveHistory.push(currentVol);
      if (waveHistory.length > maxPoints) {
        waveHistory.shift();
      }

      // Draw Spirogram Curve Line
      ctx.beginPath();
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = '#38bdf8'; // Cyan neon line
      ctx.shadowColor = '#0284c7';
      ctx.shadowBlur = 6;

      const stepX = width / maxPoints;

      for (let i = 0; i < waveHistory.length; i++) {
        const x = i * stepX;
        const vol = waveHistory[i];
        // Map 0 - 6000 mL to 170 - 10 px
        const y = 170 - (vol / 5000) * 150;

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Draw Lead Dot at the tip
      if (waveHistory.length > 0) {
        const lastX = (waveHistory.length - 1) * stepX;
        const lastVol = waveHistory[waveHistory.length - 1];
        const lastY = 170 - (lastVol / 5000) * 150;

        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.arc(lastX, lastY, 5, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.shadowBlur = 0;

      // Horizontal Reference Volume Lines
      ctx.setLineDash([4, 4]);
      ctx.lineWidth = 1;
      ctx.strokeStyle = '#475569';

      // 5000 mL line
      ctx.beginPath();
      ctx.moveTo(0, 20); ctx.lineTo(width, 20);
      ctx.stroke();

      // 2400 mL FRC line
      const frcY = 170 - (2400 / 5000) * 150;
      ctx.strokeStyle = '#334155';
      ctx.beginPath();
      ctx.moveTo(0, frcY); ctx.lineTo(width, frcY);
      ctx.stroke();

      ctx.setLineDash([]);

      // Volume Labels
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px JetBrains Mono, monospace';
      ctx.textAlign = 'right';
      ctx.fillText('5000 mL (TLC)', width - 10, 18);
      ctx.fillText('2400 mL (FRC)', width - 10, frcY - 4);
      ctx.fillText('0 mL', width - 10, 168);

      // Live Readout overlay
      ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
      ctx.fillRect(10, 10, 280, 36);
      ctx.strokeStyle = '#334155';
      ctx.strokeRect(10, 10, 280, 36);

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 11px Plus Jakarta Sans, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('GRAFIK SPIROGRAM REAL-TIME (Spirometri)', 18, 26);

      ctx.fillStyle = '#e2e8f0';
      ctx.font = '10px JetBrains Mono, monospace';
      ctx.fillText(`Vol Tidal: ${tv} mL | Frekuensi: ${rr} RPM | V_E: ${metrics.minuteVentilation} L/m`, 18, 39);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [params, metrics]);

  return (
    <div className="relative rounded-2xl bg-[#1e293b] border border-slate-700 overflow-hidden shadow-lg p-2 mt-3">
      <div className="flex items-center justify-between px-3 py-1.5 bg-[#0f172a] rounded-xl mb-2 border border-slate-700/60">
        <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          Rekaman Gelombang Spirogram (Volume Udara vs Waktu)
        </span>
        <span className="text-[10px] text-slate-400 font-mono">
          Ventilasi Semenit: <strong className="text-cyan-300">{metrics.minuteVentilation} L/menit</strong>
        </span>
      </div>
      <canvas ref={canvasRef} className="w-full h-auto block rounded-xl" style={{ aspectRatio: '900/180' }} />
    </div>
  );
};
