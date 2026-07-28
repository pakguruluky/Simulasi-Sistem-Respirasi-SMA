import React, { useState } from 'react';
import { THEORY_SECTIONS } from '../data/curriculumData';
import { BookOpen, ChevronDown, ChevronUp, GitPullRequest, Maximize2, RefreshCw, TrendingUp, ShieldAlert, Check } from 'lucide-react';

export const Theory: React.FC = () => {
  const [openSection, setOpenSection] = useState<string>('anatomi');

  const toggleSection = (id: string) => {
    setOpenSection(openSection === id ? '' : id);
  };

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'GitPullRequest': return <GitPullRequest className="w-4 h-4 text-cyan-400" />;
      case 'Maximize2': return <Maximize2 className="w-4 h-4 text-cyan-400" />;
      case 'RefreshCw': return <RefreshCw className="w-4 h-4 text-cyan-400" />;
      case 'TrendingUp': return <TrendingUp className="w-4 h-4 text-cyan-400" />;
      case 'ShieldAlert': return <ShieldAlert className="w-4 h-4 text-rose-400" />;
      default: return <BookOpen className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Title Header */}
      <div className="p-6 rounded-2xl bg-[#1e293b] border border-slate-700 shadow-lg space-y-2">
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold">
          <BookOpen className="w-4 h-4" />
          <span>RINGKASAN MATERI KONSEPTUAL DEEP-DIVE BIOLOGI SMA</span>
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-slate-50">
          Landasan Teori: Fisiologi Sistem Respirasi & Fisiokimia Pertukaran Gas
        </h2>
        <p className="text-xs md:text-sm text-slate-300">
          Pahami konsep ilmiah mendalam di bawah ini sebelum menguji parameter biologis pada modul simulasi interaktif.
        </p>
      </div>

      {/* Accordion Sections */}
      <div className="space-y-4">
        {THEORY_SECTIONS.map((sec) => {
          const isOpen = openSection === sec.id;
          return (
            <div
              key={sec.id}
              className="rounded-2xl bg-[#1e293b] border border-slate-700 overflow-hidden shadow-lg transition-all"
            >
              <button
                onClick={() => toggleSection(sec.id)}
                className="w-full p-4 md:p-5 flex items-center justify-between gap-3 text-left hover:bg-slate-800/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#0f172a] border border-slate-700 flex items-center justify-center shrink-0">
                    {renderIcon(sec.icon)}
                  </div>
                  <h3 className="font-bold text-sm md:text-base text-slate-100">
                    {sec.title}
                  </h3>
                </div>
                <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 shrink-0">
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {isOpen && (
                <div className="p-5 md:p-6 bg-slate-950/60 border-t border-slate-800 text-slate-300 text-xs md:text-sm leading-relaxed space-y-3 whitespace-pre-line font-normal">
                  {sec.content}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Summary Reference Table */}
      <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider">
          Tabel Ringkasan Parameter Fisiologis Normal Paru Manusia:
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-700 bg-slate-800/80 text-cyan-300">
                <th className="p-2.5">Parameter Fisiologis</th>
                <th className="p-2.5">Nilai Normal Istirahat</th>
                <th className="p-2.5">Satuan</th>
                <th className="p-2.5">Keterangan Biologis</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300 font-mono">
              <tr>
                <td className="p-2.5 font-bold text-slate-200">Frekuensi Napas (RR)</td>
                <td className="p-2.5 text-cyan-400">12 - 18</td>
                <td className="p-2.5">Napas / Menit</td>
                <td className="p-2.5 text-slate-400">Diatur oleh pusat respirasi medula oblongata</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold text-slate-200">Volume Tidal (TV)</td>
                <td className="p-2.5 text-cyan-400">500</td>
                <td className="p-2.5">mL</td>
                <td className="p-2.5 text-slate-400">Volume udara inspirasi/ekspirasi biasa</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold text-slate-200">Kapasitas Vital (VC)</td>
                <td className="p-2.5 text-cyan-400">3500 - 4800</td>
                <td className="p-2.5">mL</td>
                <td className="p-2.5 text-slate-400">TV + Volume Cadangan Inspirasi (IRV) + Ekspirasi (ERV)</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold text-slate-200">Saturasi Oksigen (SpO2)</td>
                <td className="p-2.5 text-emerald-400">95 - 100</td>
                <td className="p-2.5">%</td>
                <td className="p-2.5 text-slate-400">Persentase hemoglobin yang terikat O2</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold text-slate-200">pH Darah Arteri</td>
                <td className="p-2.5 text-emerald-400">7.35 - 7.45</td>
                <td className="p-2.5">pH</td>
                <td className="p-2.5 text-slate-400">Rentang asam-basa ideal jaringan tubuh</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
