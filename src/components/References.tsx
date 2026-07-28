import React from 'react';
import { REFERENCES_LIST } from '../data/curriculumData';
import { BookmarkCheck, BookOpen, ExternalLink, ShieldCheck } from 'lucide-react';

export const References: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-[#1e293b] border border-slate-700 shadow-lg space-y-2">
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold">
          <BookmarkCheck className="w-4 h-4" />
          <span>DAFTAR PUSTAKA & RUJUKAN KURIKULUM RESMI BIOLOGI</span>
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-slate-50">
          Referensi Pustaka & Sumber Belajar Kredibel
        </h2>
        <p className="text-xs md:text-sm text-slate-300">
          Seluruh konsep, persamaan matematika bioperilaku, dan indikator kurikulum dalam simulasi ini mengacu pada literatur biologi dan fisiologi kedokteran standar internasional.
        </p>
      </div>

      {/* List of References */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {REFERENCES_LIST.map((ref) => (
          <div
            key={ref.id}
            className="p-5 rounded-2xl bg-[#1e293b] border border-slate-700 hover:border-cyan-500/40 transition-all shadow-md space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20 capitalize">
                {ref.type}
              </span>
              <span className="text-xs text-slate-400 font-mono font-bold">
                {ref.year}
              </span>
            </div>

            <h3 className="font-bold text-sm text-slate-100">
              {ref.title}
            </h3>

            <p className="text-xs font-mono text-slate-400">
              Penulis: {ref.author} ({ref.publisher})
            </p>

            <p className="text-xs text-slate-300 leading-relaxed pt-1 border-t border-slate-700">
              {ref.description}
            </p>
          </div>
        ))}
      </div>

      {/* Curriculum Compliance Statement */}
      <div className="p-5 rounded-2xl bg-[#1e293b] border border-slate-700 flex items-center gap-3 shadow-lg">
        <ShieldCheck className="w-8 h-8 text-emerald-400 shrink-0" />
        <div className="space-y-1 text-xs">
          <h4 className="font-bold text-slate-200">
            Kepatuhan Kurikulum & Standar Materi:
          </h4>
          <p className="text-slate-400 leading-relaxed">
            Materi dan simulasi ini disusun oleh <strong>Pak GuruAI</strong> khusus untuk memenuhi Capaian Pembelajaran (CP) Biologi Fase F SMA Kurikulum Merdeka Kemendikbudristek RI.
          </p>
        </div>
      </div>

    </div>
  );
};
