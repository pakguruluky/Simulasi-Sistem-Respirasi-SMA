import React from 'react';
import { Activity, BookOpen, Target, FileText, BookmarkCheck, Printer } from 'lucide-react';

interface HeaderProps {
  activeTab: 'objectives' | 'theory' | 'simulation' | 'lkpd' | 'references';
  setActiveTab: (tab: 'objectives' | 'theory' | 'simulation' | 'lkpd' | 'references') => void;
  onPrintLkpd: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onPrintLkpd }) => {
  return (
    <header className="no-print pt-4 px-4 md:px-6 max-w-7xl mx-auto w-full">
      <div className="bg-[#1e293b] border border-slate-700 p-4 rounded-2xl shadow-lg flex flex-col lg:flex-row justify-between items-center gap-4">
        
        {/* Brand & Title (Bento Style Logo) */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center text-slate-900 font-bold text-xl shadow-inner">
            R
          </div>
          <div>
            <h1 className="text-base md:text-lg font-bold text-slate-50 uppercase tracking-wider flex items-center gap-2">
              Sistem Respirasi Interaktif
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                SMA KELAS XI
              </span>
            </h1>
            <p className="text-xs text-slate-400">
              Modul Biologi SMA Kelas XI • Kurikulum Merdeka
            </p>
          </div>
        </div>

        {/* Navigation Tabs (Bento Pills) */}
        <nav className="flex items-center gap-1.5 bg-[#0f172a] p-1.5 rounded-xl border border-slate-700 overflow-x-auto max-w-full">
          <button
            onClick={() => setActiveTab('simulation')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
              activeTab === 'simulation'
                ? 'bg-cyan-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span className="flex items-center gap-1">
              Simulasi
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </span>
          </button>

          <button
            onClick={() => setActiveTab('objectives')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
              activeTab === 'objectives'
                ? 'bg-cyan-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            <span>Tujuan</span>
          </button>

          <button
            onClick={() => setActiveTab('theory')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
              activeTab === 'theory'
                ? 'bg-cyan-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Ringkasan Materi</span>
          </button>

          <button
            onClick={() => setActiveTab('lkpd')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
              activeTab === 'lkpd'
                ? 'bg-cyan-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>LKPD Digital</span>
          </button>

          <button
            onClick={() => setActiveTab('references')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
              activeTab === 'references'
                ? 'bg-cyan-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <BookmarkCheck className="w-3.5 h-3.5" />
            <span>Referensi</span>
          </button>
        </nav>

        {/* Header Right Actions & Session Status */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-[10px] text-slate-500 uppercase font-bold">Status Sesi</span>
            <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              Aktif
            </span>
          </div>

          <button
            onClick={onPrintLkpd}
            className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-inner transition-colors flex items-center gap-2"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Unduh / Cetak LKPD</span>
          </button>
        </div>

      </div>
    </header>
  );
};
