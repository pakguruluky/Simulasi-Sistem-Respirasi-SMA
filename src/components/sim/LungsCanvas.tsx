import React, { useEffect, useRef } from 'react';
import { SimParams, SimMetrics } from '../../types';

interface LungsCanvasProps {
  params: SimParams;
  metrics: SimMetrics;
}

export const LungsCanvas: React.FC<LungsCanvasProps> = ({ params, metrics }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let phase = 0; // Phase angle for breath cycle (0 to 2*PI)

    // Set high DPI canvas size
    const width = 450;
    const height = 320;
    canvas.width = width * 2;
    canvas.height = height * 2;
    ctx.scale(2, 2);

    const render = () => {
      // Clear background with dark slate tone
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, width, height);

      // Draw subtle background medical grid
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Calculate breath phase cycle based on Respiratory Rate (RR)
      // RR breaths per min -> frequency = RR / 60 Hz -> angle increment = (RR/60) * 2*PI * dt
      const breathFreq = params.respiratoryRate / 60;
      phase += (breathFreq * 2 * Math.PI) / 60; // Assuming ~60 FPS
      if (phase > Math.PI * 2) phase -= Math.PI * 2;

      // Sine wave for breath cycle: sine ranges from -1 to 1
      const cycle = Math.sin(phase); 
      const isInspiration = cycle >= 0; // Cycle > 0 = Inspiration, < 0 = Expiration

      // Expansion factor based on Tidal Volume (TV) and breath phase
      const tvExpansion = (params.tidalVolume / 2500) * 0.22;
      const lungScale = 1 + (cycle + 1) * 0.5 * (0.12 + tvExpansion);

      // Diaphragm displacement (Moves down in inspiration, moves up in expiration)
      const diaphragmY = 240 + cycle * 18;

      const centerX = width / 2;
      const topY = 40;

      // 1. Draw Trachea & Main Bronchi
      ctx.lineWidth = params.lungCondition === 'asthma' ? 8 : 12;
      ctx.strokeStyle = params.lungCondition === 'asthma' ? '#f59e0b' : '#38bdf8';
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // Trachea
      ctx.beginPath();
      ctx.moveTo(centerX, topY);
      ctx.lineTo(centerX, topY + 60);
      ctx.stroke();

      // Trachea Cartilage Rings
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 2;
      for (let ringY = topY + 10; ringY < topY + 55; ringY += 8) {
        ctx.beginPath();
        ctx.moveTo(centerX - 8, ringY);
        ctx.lineTo(centerX + 8, ringY);
        ctx.stroke();
      }

      // Main Bronchi (Left & Right)
      ctx.lineWidth = params.lungCondition === 'asthma' ? 5 : 8;
      ctx.strokeStyle = params.lungCondition === 'asthma' ? '#f59e0b' : '#38bdf8';
      ctx.beginPath();
      ctx.moveTo(centerX, topY + 60);
      ctx.lineTo(centerX - 40, topY + 95);
      ctx.moveTo(centerX, topY + 60);
      ctx.lineTo(centerX + 40, topY + 95);
      ctx.stroke();

      // 2. Draw Left & Right Lungs (PULMONARY LOBES)
      // Base lung colors based on health condition
      let lungGradientColor1 = '#0ea5e9'; // Normal cyan/blue
      let lungGradientColor2 = '#0284c7';
      if (params.lungCondition === 'asthma') {
        lungGradientColor1 = '#f59e0b'; // Amber/warning
        lungGradientColor2 = '#d97706';
      } else if (params.lungCondition === 'emphysema') {
        lungGradientColor1 = '#64748b'; // Damaged gray/slate
        lungGradientColor2 = '#334155';
      }

      // Right Lung Lobes
      ctx.save();
      ctx.translate(centerX - 65, topY + 140);
      ctx.scale(lungScale, lungScale);
      
      const gradientR = ctx.createRadialGradient(0, 0, 10, 0, 0, 70);
      gradientR.addColorStop(0, lungGradientColor1);
      gradientR.addColorStop(1, lungGradientColor2);
      ctx.fillStyle = gradientR;
      ctx.shadowColor = lungGradientColor1;
      ctx.shadowBlur = isInspiration ? 15 : 5;

      ctx.beginPath();
      ctx.ellipse(0, 0, 50, 68, -0.15, 0, Math.PI * 2);
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#e0f2fe';
      ctx.stroke();

      // Draw bronchial tree branches inside right lung
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(15, -35); ctx.lineTo(-10, -10);
      ctx.moveTo(-10, -10); ctx.lineTo(-25, 20);
      ctx.moveTo(-10, -10); ctx.lineTo(10, 25);
      ctx.stroke();
      ctx.restore();

      // Left Lung Lobes
      ctx.save();
      ctx.translate(centerX + 65, topY + 140);
      ctx.scale(lungScale, lungScale);

      const gradientL = ctx.createRadialGradient(0, 0, 10, 0, 0, 70);
      gradientL.addColorStop(0, lungGradientColor1);
      gradientL.addColorStop(1, lungGradientColor2);
      ctx.fillStyle = gradientL;
      ctx.shadowColor = lungGradientColor1;
      ctx.shadowBlur = isInspiration ? 15 : 5;

      ctx.beginPath();
      ctx.ellipse(0, 0, 48, 66, 0.15, 0, Math.PI * 2);
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#e0f2fe';
      ctx.stroke();

      // Draw bronchial tree branches inside left lung
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-15, -35); ctx.lineTo(10, -10);
      ctx.moveTo(10, -10); ctx.lineTo(25, 20);
      ctx.moveTo(10, -10); ctx.lineTo(-10, 25);
      ctx.stroke();
      ctx.restore();

      // 3. Draw Diaphragm Muscle (Otot Diafragma)
      ctx.shadowBlur = 0;
      ctx.fillStyle = isInspiration ? '#10b981' : '#059669'; // Emerald muscle tone
      ctx.strokeStyle = '#6ee7b7';
      ctx.lineWidth = 3;

      ctx.beginPath();
      ctx.moveTo(centerX - 130, diaphragmY + 25);
      ctx.quadraticCurveTo(centerX, diaphragmY - 15, centerX + 130, diaphragmY + 25);
      ctx.lineTo(centerX + 130, diaphragmY + 45);
      ctx.quadraticCurveTo(centerX, diaphragmY + 5, centerX - 130, diaphragmY + 45);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Diaphragm label
      ctx.fillStyle = '#a7f3d0';
      ctx.font = '11px Plus Jakarta Sans, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(
        isInspiration ? 'Otot Diafragma KONTRAKSI (Mendatar)' : 'Otot Diafragma RELAKSASI (Melengkung)',
        centerX,
        diaphragmY + 38
      );

      // 4. Airflow Particle Simulation (Panah Udara Inspirasi / Ekspirasi)
      const particleY = topY + 15 + ((phase / (Math.PI * 2)) * 60) % 50;
      ctx.fillStyle = isInspiration ? '#38bdf8' : '#f43f5e';
      ctx.font = '12px JetBrains Mono, monospace';

      if (isInspiration) {
        // Downward blue arrows (O2)
        ctx.fillText('↓ O₂ Air In', centerX, particleY);
      } else {
        // Upward rose arrows (CO2)
        ctx.fillText('↑ CO₂ Air Out', centerX, topY + 65 - (particleY - topY));
      }

      // 5. Overlay Status Badge & Live Breath State
      ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
      ctx.fillRect(10, 10, 150, 42);
      ctx.strokeStyle = '#334155';
      ctx.strokeRect(10, 10, 150, 42);

      ctx.fillStyle = isInspiration ? '#38bdf8' : '#fb7185';
      ctx.font = 'bold 12px Plus Jakarta Sans, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(isInspiration ? '● INSPIRASI (Napas Masuk)' : '● EKSPIRASI (Napas Keluar)', 18, 28);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px JetBrains Mono, monospace';
      ctx.fillText(`Laju: ${params.respiratoryRate} RPM | Vol: ${params.tidalVolume} mL`, 18, 43);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [params, metrics]);

  return (
    <div className="relative rounded-2xl bg-[#1e293b] border border-slate-700 overflow-hidden shadow-lg p-2">
      <div className="flex items-center justify-between px-3 py-1.5 bg-[#0f172a] rounded-xl mb-2 border border-slate-700/60">
        <span className="text-xs font-semibold text-cyan-400 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
          Visualisasi Paru-Paru & Diafragma
        </span>
        <span className="text-[10px] text-slate-400 font-mono">
          Kondisi: <strong className="text-slate-200 capitalize">{params.lungCondition}</strong>
        </span>
      </div>
      <canvas ref={canvasRef} className="w-full h-auto block rounded-xl" style={{ aspectRatio: '450/320' }} />
    </div>
  );
};
