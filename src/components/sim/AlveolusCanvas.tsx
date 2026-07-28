import React, { useEffect, useRef } from 'react';
import { SimParams, SimMetrics } from '../../types';

interface AlveolusCanvasProps {
  params: SimParams;
  metrics: SimMetrics;
}

export const AlveolusCanvas: React.FC<AlveolusCanvasProps> = ({ params, metrics }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let rbcOffset = 0; // Movement offset for red blood cells in capillary

    // Particle arrays for O2 and CO2 molecules
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      type: 'O2' | 'CO2';
      progress: number; // 0 to 1 across membrane
    }

    const o2Particles: Particle[] = Array.from({ length: 16 }, () => ({
      x: 60 + Math.random() * 120,
      y: 40 + Math.random() * 80,
      vx: (Math.random() - 0.5) * 0.8,
      vy: 0.5 + Math.random() * 1.2,
      type: 'O2',
      progress: Math.random()
    }));

    const co2Particles: Particle[] = Array.from({ length: 14 }, () => ({
      x: 40 + Math.random() * 300,
      y: 200 + Math.random() * 30,
      vx: (Math.random() - 0.5) * 0.8,
      vy: -0.6 - Math.random() * 1.0,
      type: 'CO2',
      progress: Math.random()
    }));

    const width = 450;
    const height = 320;
    canvas.width = width * 2;
    canvas.height = height * 2;
    ctx.scale(2, 2);

    const render = () => {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, width, height);

      // 1. Draw Alveolar Cavity (Rongga Alveolus) Top Region
      const gradientAlveolus = ctx.createLinearGradient(0, 0, 0, 160);
      gradientAlveolus.addColorStop(0, '#0284c7'); // Soft blue atmospheric gas
      gradientAlveolus.addColorStop(1, '#0f172a');
      ctx.fillStyle = gradientAlveolus;
      ctx.beginPath();
      ctx.rect(0, 0, width, 160);
      ctx.fill();

      // Label Alveolus Cavity
      ctx.fillStyle = '#7dd3fc';
      ctx.font = 'bold 12px Plus Jakarta Sans, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('RONGGA ALVEOLUS (Udara Terinspirasi)', 20, 28);

      // Display Partial Pressures in Alveolus
      ctx.fillStyle = '#e0f2fe';
      ctx.font = '11px JetBrains Mono, monospace';
      ctx.fillText(`PAO₂ = ${Math.round(metrics.paO2 + 5)} mmHg | PACO₂ = ${Math.round(metrics.paCO2 - 2)} mmHg`, 20, 46);

      // 2. Draw Respiratory Membrane (Membran Respirasi Alveolus-Kapiler)
      // Thickness variation for emphysema or asthma
      const membraneY = 160;
      const membraneThickness = params.lungCondition === 'emphysema' ? 14 : 8;

      ctx.fillStyle = params.lungCondition === 'emphysema' ? '#64748b' : '#38bdf8';
      ctx.fillRect(0, membraneY - membraneThickness / 2, width, membraneThickness);

      ctx.strokeStyle = '#e0f2fe';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, membraneY - membraneThickness / 2);
      ctx.lineTo(width, membraneY - membraneThickness / 2);
      ctx.moveTo(0, membraneY + membraneThickness / 2);
      ctx.lineTo(width, membraneY + membraneThickness / 2);
      ctx.stroke();

      // Membrane Label
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px Plus Jakarta Sans, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`Membran Respirasi (Ketebalan ~0.2 - 0.5 µm) - Efisiensi Difusi: ${metrics.diffusionRate}%`, width / 2, membraneY + 3);

      // 3. Draw Blood Capillary Bed (Kapiler Darah Vena -> Arteri)
      const capillaryGradient = ctx.createLinearGradient(0, 170, 0, 320);
      capillaryGradient.addColorStop(0, '#1e293b');
      capillaryGradient.addColorStop(1, '#450a0a'); // Deep crimson capillary bed
      ctx.fillStyle = capillaryGradient;
      ctx.fillRect(0, 175, width, 145);

      ctx.fillStyle = '#fca5a5';
      ctx.font = 'bold 12px Plus Jakarta Sans, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('KAPILER DARAH PARU-PARU (Aliran Sel Darah Merah)', 20, 195);

      ctx.fillStyle = '#fecdd3';
      ctx.font = '11px JetBrains Mono, monospace';
      ctx.fillText(`PaO₂ = ${metrics.paO2} mmHg | PaCO₂ = ${metrics.paCO2} mmHg | SpO₂ = ${metrics.spO2}%`, 20, 212);

      // 4. Draw Flowing Red Blood Cells (Eritrosit / RBC) in Capillary
      // Speed proportional to Heart Rate
      const rbcSpeed = (metrics.heartRate / 70) * 1.8;
      rbcOffset += rbcSpeed;
      if (rbcOffset > 80) rbcOffset = 0;

      const numRBCs = 7;
      for (let i = -1; i < numRBCs; i++) {
        const rbcX = i * 70 + rbcOffset;
        const rbcY = 265 + Math.sin(rbcX * 0.05) * 6;

        // Color transition: Left side deoxygenated (purplish-red), Right side oxygenated (bright crimson)
        const oxygenationRatio = Math.min(1, Math.max(0, rbcX / width));
        const rbcColor = oxygenationRatio > 0.4 ? '#ef4444' : '#881337'; // Red vs dark maroon

        ctx.save();
        ctx.translate(rbcX, rbcY);
        
        // Biconcave RBC shape
        ctx.fillStyle = rbcColor;
        ctx.beginPath();
        ctx.ellipse(0, 0, 24, 14, 0.1, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#fca5a5';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Inner dimple for biconcave cell
        ctx.fillStyle = oxygenationRatio > 0.4 ? '#dc2626' : '#4c0519';
        ctx.beginPath();
        ctx.ellipse(0, 0, 10, 6, 0.1, 0, Math.PI * 2);
        ctx.fill();

        // Hemoglobin binding status text
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 8px JetBrains Mono, monospace';
        ctx.textAlign = 'center';
        ctx.fillText(oxygenationRatio > 0.4 ? 'HbO₂' : 'Hb', 0, 3);

        ctx.restore();
      }

      // 5. Diffusing O2 Particles (Cyan Spheres moving Downward into Capillary)
      o2Particles.forEach((p) => {
        p.y += (metrics.diffusionRate / 100) * 1.2;
        p.x += p.vx;
        if (p.y > 250) {
          p.y = 35 + Math.random() * 40;
          p.x = 40 + Math.random() * 380;
        }

        ctx.fillStyle = '#38bdf8'; // Cyan O2
        ctx.shadowColor = '#0284c7';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 7px JetBrains Mono, monospace';
        ctx.textAlign = 'center';
        ctx.fillText('O₂', p.x, p.y + 2.5);
      });

      // 6. Diffusing CO2 Particles (Rose Spheres moving Upward into Alveolus)
      co2Particles.forEach((p) => {
        p.y -= (metrics.diffusionRate / 100) * 1.1;
        p.x += p.vx;
        if (p.y < 35) {
          p.y = 230 + Math.random() * 30;
          p.x = 40 + Math.random() * 380;
        }

        ctx.shadowBlur = 8;
        ctx.fillStyle = '#f43f5e'; // Rose CO2
        ctx.shadowColor = '#e11d48';
        ctx.beginPath();
        ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 7px JetBrains Mono, monospace';
        ctx.textAlign = 'center';
        ctx.fillText('CO₂', p.x, p.y + 2.5);
      });

      ctx.shadowBlur = 0;

      // 7. Draw Diffusion Directional Legend / Callouts
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 10px Plus Jakarta Sans, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('↓ Difusi O₂ (Alveolus → Darah)', width - 15, 120);

      ctx.fillStyle = '#fb7185';
      ctx.fillText('↑ Difusi CO₂ (Darah → Alveolus)', width - 15, 140);

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
        <span className="text-xs font-semibold text-rose-400 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse"></span>
          Mikroskopis: Pertukaran Gas Alveolus-Kapiler
        </span>
        <span className="text-[10px] text-slate-400 font-mono">
          Hukum Fick | Laju Difusi: {metrics.diffusionRate}%
        </span>
      </div>
      <canvas ref={canvasRef} className="w-full h-auto block rounded-xl" style={{ aspectRatio: '450/320' }} />
    </div>
  );
};
