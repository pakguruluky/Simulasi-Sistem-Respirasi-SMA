import React from 'react';
import { SimParams, SimMetrics, ActivityLevel, AltitudeLevel, LungCondition } from '../types';
import { PRESET_SCENARIOS } from '../utils/bioPhysics';
import { LungsCanvas } from './sim/LungsCanvas';
import { AlveolusCanvas } from './sim/AlveolusCanvas';
import { SpirogramCanvas } from './sim/SpirogramCanvas';
import { Activity, Zap, Mountain, Wind, AlertTriangle, RefreshCcw, Save, Flame, Compass, Heart, Droplets, Gauge } from 'lucide-react';

interface SimulationProps {
  params: SimParams;
  setParams: React.Dispatch<React.SetStateAction<SimParams>>;
  metrics: SimMetrics;
  onLogToLkpd: () => void;
}

export const Simulation: React.FC<SimulationProps> = ({
  params,
  setParams,
  metrics,
  onLogToLkpd
}) => {

  const handleSliderChange = (field: keyof SimParams, value: number) => {
    setParams(prev => ({ ...prev, [field]: value }));
  };

  const handleSelectPreset = (scenarioParams: SimParams) => {
    setParams(scenarioParams);
  };

  const renderPresetIcon = (iconName: string) => {
    switch (iconName) {
      case 'Activity': return <Activity className="w-3.5 h-3.5 text-cyan-400" />;
      case 'Zap': return <Zap className="w-3.5 h-3.5 text-amber-400" />;
      case 'Mountain': return <Mountain className="w-3.5 h-3.5 text-indigo-400" />;
      case 'Compass': return <Compass className="w-3.5 h-3.5 text-rose-400" />;
      case 'AlertTriangle': return <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />;
      case 'Wind': return <Wind className="w-3.5 h-3.5 text-slate-400" />;
      default: return <Activity className="w-3.5 h-3.5 text-cyan-400" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">

      {/* Preset Scenarios Header */}
      <div className="p-4 rounded-2xl bg-[#1e293b] border border-slate-700 shadow-lg space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-cyan-400" />
            Pilih Skenario Simulasi Cepat (Presets Kasus Fisiologis):
          </span>
          <button
            onClick={() => handleSelectPreset(PRESET_SCENARIOS[0].params)}
            className="text-[11px] text-slate-400 hover:text-cyan-300 flex items-center gap-1 font-mono transition-colors"
          >
            <RefreshCcw className="w-3 h-3" />
            Reset ke Normal
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {PRESET_SCENARIOS.map((scenario) => {
            return (
              <button
                key={scenario.id}
                onClick={() => handleSelectPreset(scenario.params)}
                className="p-2.5 rounded-xl bg-[#0f172a] border border-slate-700/80 hover:border-cyan-500/50 hover:bg-slate-800/60 text-left transition-all group flex flex-col justify-between"
              >
                <div className="flex items-center gap-1.5 mb-1">
                  {renderPresetIcon(scenario.iconName)}
                  <span className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 line-clamp-1">
                    {scenario.name}
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 line-clamp-2 leading-tight">
                  {scenario.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Controls vs Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left Column: Interactive Sliders & Parameters (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          
          <div className="p-5 rounded-2xl bg-[#1e293b] border border-slate-700 shadow-lg space-y-5">
            <div className="flex items-center justify-between border-b border-slate-700 pb-3">
              <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
                <Gauge className="w-4 h-4 text-cyan-400" />
                Panel Kontrol Parameter Fisiologis
              </h3>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-md border border-cyan-500/20">
                Real-time
              </span>
            </div>

            {/* Slider 1: Respiratory Rate (RR) */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-semibold text-slate-200">
                  Laju Pernapasan (Respiratory Rate / RR)
                </label>
                <span className="font-mono font-bold text-cyan-400 bg-slate-800 px-2 py-0.5 rounded">
                  {params.respiratoryRate} napas/menit
                </span>
              </div>
              <input
                type="range"
                min={8}
                max={40}
                step={1}
                value={params.respiratoryRate}
                onChange={(e) => handleSliderChange('respiratoryRate', Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>8 (Bradipnea)</span>
                <span>12 - 18 (Normal)</span>
                <span>40 (Takipnea)</span>
              </div>
            </div>

            {/* Slider 2: Tidal Volume (TV) */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-semibold text-slate-200">
                  Volume Tidal (Tidal Volume / TV)
                </label>
                <span className="font-mono font-bold text-cyan-400 bg-slate-800 px-2 py-0.5 rounded">
                  {params.tidalVolume} mL
                </span>
              </div>
              <input
                type="range"
                min={300}
                max={2500}
                step={50}
                value={params.tidalVolume}
                onChange={(e) => handleSliderChange('tidalVolume', Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>300 mL (Dangkal)</span>
                <span>500 mL (Istirahat)</span>
                <span>2500 mL (Maksimal)</span>
              </div>
            </div>

            {/* Option 3: Physical Activity Level */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-200 block">
                Tingkat Aktivitas Fisik (Exercise Level):
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { id: 'rest', label: 'Istirahat (Rest)' },
                  { id: 'walk', label: 'Jalan Santai' },
                  { id: 'run', label: 'Lari / Olahraga' },
                  { id: 'heavy', label: 'Olahraga Berat' },
                ].map((act) => (
                  <button
                    key={act.id}
                    onClick={() => setParams(p => ({ ...p, activityLevel: act.id as ActivityLevel }))}
                    className={`p-2 rounded-lg text-left transition-all ${
                      params.activityLevel === act.id
                        ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                        : 'bg-slate-950/80 text-slate-300 hover:bg-slate-800 border border-slate-800'
                    }`}
                  >
                    {act.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Option 4: Altitude Level */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-200 block">
                Ketinggian Tempat (Tekanan O2 Udara):
              </label>
              <div className="grid grid-cols-3 gap-1.5 text-[11px]">
                {[
                  { id: 'sea', label: 'Dataran Rendah (0m)' },
                  { id: 'mountain', label: 'Gunung (3.000m)' },
                  { id: 'everest', label: 'Everest (8.848m)' },
                ].map((alt) => (
                  <button
                    key={alt.id}
                    onClick={() => setParams(p => ({ ...p, altitudeLevel: alt.id as AltitudeLevel }))}
                    className={`p-2 rounded-lg text-center leading-tight transition-all ${
                      params.altitudeLevel === alt.id
                        ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                        : 'bg-slate-950/80 text-slate-300 hover:bg-slate-800 border border-slate-800'
                    }`}
                  >
                    {alt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Option 5: Lung Health Condition */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-200 block">
                Kondisi Kesehatan Organ Paru / Darah:
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { id: 'normal', label: 'Sehat Normal' },
                  { id: 'asthma', label: 'Asma (Bronkospasme)' },
                  { id: 'emphysema', label: 'Emfisema Paru' },
                  { id: 'anemia', label: 'Anemia Defisiensi Hb' },
                ].map((cond) => (
                  <button
                    key={cond.id}
                    onClick={() => setParams(p => ({ ...p, lungCondition: cond.id as LungCondition }))}
                    className={`p-2 rounded-lg text-left transition-all ${
                      params.lungCondition === cond.id
                        ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                        : 'bg-slate-950/80 text-slate-300 hover:bg-slate-800 border border-slate-800'
                    }`}
                  >
                    {cond.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Copy Data to LKPD Action */}
            <div className="pt-2">
              <button
                onClick={onLogToLkpd}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-600/20"
              >
                <Save className="w-4 h-4" />
                <span>Salin Parameter Simulasi Ini ke Tabel LKPD</span>
              </button>
            </div>

          </div>

          {/* Clinical Diagnostic Analysis Card */}
          <div className={`p-4 rounded-xl border ${
            metrics.statusSeverity === 'danger'
              ? 'bg-rose-950/40 border-rose-800/80 text-rose-200'
              : metrics.statusSeverity === 'warning'
              ? 'bg-amber-950/40 border-amber-800/80 text-amber-200'
              : 'bg-emerald-950/40 border-emerald-800/80 text-emerald-200'
          } shadow-lg space-y-2`}>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4" />
              <span>Analisis Diagnostik Fisiologis Real-Time:</span>
            </div>
            <p className="text-xs leading-relaxed font-medium">
              {metrics.statusText}
            </p>
          </div>

        </div>

        {/* Right Column: Dynamic Visualizations & Real-time Gauges (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* Readout Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            
            {/* Metric 1: Ventilasi Semenit */}
            <div className="p-3.5 rounded-2xl bg-[#1e293b] border border-slate-700 shadow-md space-y-1">
              <span className="text-[10px] font-semibold text-slate-400 block uppercase">
                Ventilasi Semenit (V_E)
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-extrabold text-cyan-400 font-mono">
                  {metrics.minuteVentilation}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">L/mnt</span>
              </div>
              <span className="text-[9px] text-slate-400 block">RR × TV</span>
            </div>

            {/* Metric 2: SpO2 Saturasi O2 */}
            <div className="p-3.5 rounded-2xl bg-[#1e293b] border border-slate-700 shadow-md space-y-1">
              <span className="text-[10px] font-semibold text-slate-400 block uppercase">
                Saturasi Oksigen (SpO2)
              </span>
              <div className="flex items-baseline gap-1">
                <span className={`text-xl font-extrabold font-mono ${
                  metrics.spO2 < 88 ? 'text-rose-400 animate-pulse' : 'text-emerald-400'
                }`}>
                  {metrics.spO2}%
                </span>
              </div>
              <span className="text-[9px] text-slate-400 block">Normal &gt; 95%</span>
            </div>

            {/* Metric 3: pH Darah */}
            <div className="p-3.5 rounded-2xl bg-[#1e293b] border border-slate-700 shadow-md space-y-1">
              <span className="text-[10px] font-semibold text-slate-400 block uppercase">
                pH Darah Arteri
              </span>
              <div className="flex items-baseline gap-1">
                <span className={`text-xl font-extrabold font-mono ${
                  metrics.bloodpH < 7.35 || metrics.bloodpH > 7.45 ? 'text-amber-400' : 'text-cyan-400'
                }`}>
                  {metrics.bloodpH}
                </span>
              </div>
              <span className="text-[9px] text-slate-400 block">Ideal 7.35 - 7.45</span>
            </div>

            {/* Metric 4: Detak Jantung HR */}
            <div className="p-3.5 rounded-2xl bg-[#1e293b] border border-slate-700 shadow-md space-y-1">
              <span className="text-[10px] font-semibold text-slate-400 block uppercase">
                Denyut Jantung (HR)
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-extrabold text-rose-400 font-mono">
                  {metrics.heartRate}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">bpm</span>
              </div>
              <span className="text-[9px] text-slate-400 block">Respon Kardio</span>
            </div>

          </div>

          {/* Two Interactive Canvas Views side by side on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <LungsCanvas params={params} metrics={metrics} />
            <AlveolusCanvas params={params} metrics={metrics} />
          </div>

          {/* Spirogram Canvas View below */}
          <SpirogramCanvas params={params} metrics={metrics} />

        </div>

      </div>

    </div>
  );
};
