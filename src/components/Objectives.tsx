import React from 'react';
import { LEARNING_OBJECTIVES } from '../data/curriculumData';
import { Target, CheckCircle2, Award, Sparkles, BookOpenCheck } from 'lucide-react';

interface ObjectivesProps {
  onStartSim: () => void;
}

export const Objectives: React.FC<ObjectivesProps> = ({ onStartSim }) => {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Banner Card */}
      <div className="p-6 md:p-8 rounded-2xl bg-[#1e293b] border border-slate-700 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-12 -mt-12 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Kurikulum Merdeka - Biologi SMA Fase F (Kelas XI)
          </span>
        </div>

        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-50 mb-3">
          Tujuan Pembelajaran: Sistem Respirasi & Pertukaran Gas
        </h2>

        <p className="text-sm md:text-base text-slate-300 leading-relaxed max-w-3xl">
          Modul simulasi interaktif ini dirancang untuk memfasilitasi pemahaman mendalam murid SMA mengenai struktur organ, mekanika pernapasan dada & perut, difusi gas berdasarkan Hukum Fick, serta fenomena homeostasis gas darah.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <button
            onClick={onStartSim}
            className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs md:text-sm flex items-center gap-2 transition-all shadow-lg"
          >
            <BookOpenCheck className="w-4 h-4" />
            <span>Mulai Simulasi Interaktif</span>
          </button>
        </div>
      </div>

      {/* Grid of Learning Objectives */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {LEARNING_OBJECTIVES.map((obj) => (
          <div
            key={obj.id}
            className="p-5 rounded-2xl bg-[#1e293b] border border-slate-700 hover:border-cyan-500/40 transition-all shadow-md group relative overflow-hidden"
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                <Target className="w-4 h-4" />
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                    {obj.code}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400 bg-[#0f172a] px-2 py-0.5 rounded">
                    {obj.taxonomy}
                  </span>
                </div>
                <h3 className="font-bold text-sm text-slate-100 group-hover:text-cyan-300 transition-colors">
                  {obj.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {obj.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Competency Indicators & HOTS Skills */}
      <div className="p-6 rounded-2xl bg-[#1e293b] border border-slate-700 space-y-4 shadow-lg">
        <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
          <Award className="w-4 h-4 text-cyan-400" />
          Indikator Ketercapaian Kompetensi (IKK):
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs text-slate-300">
          <div className="flex items-start gap-2 p-3 rounded-xl bg-[#0f172a] border border-slate-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>Mampu menghubungkan frekuensi napas dengan tingkat latihan fisik.</span>
          </div>
          <div className="flex items-start gap-2 p-3 rounded-xl bg-[#0f172a] border border-slate-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>Mampu menganalisis pengaruh ketinggian terhadap tekanan parsial O2.</span>
          </div>
          <div className="flex items-start gap-2 p-3 rounded-xl bg-[#0f172a] border border-slate-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>Mampu mengevaluasi patofisiologi penyakit Asma dan Emfisema.</span>
          </div>
        </div>
      </div>

    </div>
  );
};
