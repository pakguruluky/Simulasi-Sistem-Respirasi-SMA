import React, { useState } from 'react';
import { StudentIdentity, LkpdObservationRecord, LkpdAnswers, QuizQuestion } from '../types';
import { QUIZ_QUESTIONS } from '../data/curriculumData';
import { FileText, Printer, Plus, Trash2, CheckCircle2, UserCheck, HelpCircle, Save, Sparkles, Award } from 'lucide-react';

interface LkpdProps {
  identity: StudentIdentity;
  setIdentity: React.Dispatch<React.SetStateAction<StudentIdentity>>;
  records: LkpdObservationRecord[];
  setRecords: React.Dispatch<React.SetStateAction<LkpdObservationRecord[]>>;
  answers: LkpdAnswers;
  setAnswers: React.Dispatch<React.SetStateAction<LkpdAnswers>>;
  onPrint: () => void;
}

export const Lkpd: React.FC<LkpdProps> = ({
  identity,
  setIdentity,
  records,
  setRecords,
  answers,
  setAnswers,
  onPrint
}) => {
  const [selectedQuizAnswers, setSelectedQuizAnswers] = useState<Record<number, number>>({});
  const [showQuizResults, setShowQuizResults] = useState(false);

  const handleIdentityChange = (field: keyof StudentIdentity, value: string) => {
    setIdentity(prev => ({ ...prev, [field]: value }));
  };

  const handleAnswerChange = (field: keyof LkpdAnswers, value: string) => {
    setAnswers(prev => ({ ...prev, [field]: value }));
  };

  const handleDeleteRecord = (id: string) => {
    setRecords(prev => prev.filter(r => r.id !== id));
  };

  const handleSelectQuiz = (questionId: number, optionIndex: number) => {
    setSelectedQuizAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const calculateQuizScore = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach(q => {
      if (selectedQuizAnswers[q.id] === q.correctAnswer) {
        score += 20; // 5 questions * 20 = 100
      }
    });
    return score;
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 printable-lkpd">

      {/* Header Banner LKPD (No-print controls, printable text) */}
      <div className="p-6 rounded-2xl bg-[#1e293b] border border-slate-700 shadow-lg space-y-4 printable-card">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-700 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-md bg-cyan-500/10 text-cyan-400 font-mono text-xs font-bold border border-cyan-500/20">
                LKPD DIGITAL BIOLOGI SMA
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-slate-50">
              Lembar Kerja Peserta Didik (LKPD): Sistem Pernapasan
            </h2>
            <p className="text-xs text-slate-400">
              Simulasi Interaktif Mekanisme Ventilasi, Difusi Gas Alveolus, & Homeostasis Fisiologis
            </p>
          </div>

          <div className="no-print">
            <button
              onClick={onPrint}
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs rounded-xl shadow-lg flex items-center gap-2 transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / Simpan PDF</span>
            </button>
          </div>
        </div>

        {/* Identitas Peserta Didik Form */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
            <UserCheck className="w-4 h-4" />
            Identitas Peserta Didik (Siswa/Siswi):
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div>
              <label className="text-slate-400 font-semibold block mb-1">Nama Lengkap:</label>
              <input
                type="text"
                placeholder="cth. Ahmad Fauzi"
                value={identity.nama}
                onChange={(e) => handleIdentityChange('nama', e.target.value)}
                className="w-full bg-[#0f172a] border border-slate-700 rounded-xl p-2 text-slate-100 focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="text-slate-400 font-semibold block mb-1">Kelas:</label>
              <input
                type="text"
                placeholder="cth. XI MIPA 1"
                value={identity.kelas}
                onChange={(e) => handleIdentityChange('kelas', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-100 focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="text-slate-400 font-semibold block mb-1">Nomor Absen:</label>
              <input
                type="text"
                placeholder="cth. 04"
                value={identity.absentNo}
                onChange={(e) => handleIdentityChange('absentNo', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-100 focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="text-slate-400 font-semibold block mb-1">Sekolah / Tanggal:</label>
              <input
                type="text"
                value={identity.sekolah}
                onChange={(e) => handleIdentityChange('sekolah', e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-100 focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section 1: Tabel Log Pengamatan Hasil Simulasi */}
      <div className="p-6 rounded-2xl bg-[#1e293b] border border-slate-700 shadow-lg space-y-4 printable-card">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center text-xs font-bold">
              1
            </span>
            Tabel Data Hasil Pengamatan Simulasi Fisiologi
          </h3>
          <span className="text-xs text-slate-400 font-mono">
            Total Data Terekam: {records.length}
          </span>
        </div>

        {records.length === 0 ? (
          <div className="p-8 text-center bg-[#0f172a] rounded-xl border border-dashed border-slate-700 text-slate-400 space-y-2">
            <p className="text-xs">
              Belum ada data simulasi yang disalin. Buka tab <strong>"Simulasi"</strong> lalu klik tombol <strong>"Salin Parameter Simulasi Ini ke Tabel LKPD"</strong> untuk merekam data percobaan.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#0f172a] text-cyan-300 font-bold border-b border-slate-700">
                  <th className="p-2.5">No</th>
                  <th className="p-2.5">Skenario / Kondisi</th>
                  <th className="p-2.5">RR (RPM)</th>
                  <th className="p-2.5">TV (mL)</th>
                  <th className="p-2.5">V_E (L/m)</th>
                  <th className="p-2.5">SpO2 (%)</th>
                  <th className="p-2.5">PaO2 (mmHg)</th>
                  <th className="p-2.5">PaCO2 (mmHg)</th>
                  <th className="p-2.5">pH Darah</th>
                  <th className="p-2.5 no-print">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/80 text-slate-300 font-mono">
                {records.map((rec, idx) => (
                  <tr key={rec.id} className="hover:bg-slate-800/40">
                    <td className="p-2.5 font-bold">{idx + 1}</td>
                    <td className="p-2.5 text-slate-100 font-sans font-semibold">{rec.scenarioName}</td>
                    <td className="p-2.5 text-cyan-400">{rec.rr}</td>
                    <td className="p-2.5 text-cyan-400">{rec.tv}</td>
                    <td className="p-2.5 text-emerald-400">{rec.minuteVentilation}</td>
                    <td className="p-2.5 text-rose-400">{rec.spO2}%</td>
                    <td className="p-2.5">{rec.paO2}</td>
                    <td className="p-2.5">{rec.paCO2}</td>
                    <td className="p-2.5 font-bold text-cyan-300">{rec.bloodpH}</td>
                    <td className="p-2.5 no-print">
                      <button
                        onClick={() => handleDeleteRecord(rec.id)}
                        className="text-rose-400 hover:text-rose-300 p-1 rounded hover:bg-slate-800"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Section 2: Pertanyaan Diskusi Analitis (HOTS Questions) */}
      <div className="p-6 rounded-2xl bg-[#1e293b] border border-slate-700 shadow-lg space-y-6 printable-card">
        <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2 border-b border-slate-700 pb-3">
          <span className="w-6 h-6 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center text-xs font-bold">
            2
          </span>
          Pertanyaan Analisis & Diskusi Inkuiri Biologi SMA
        </h3>

        {/* Q1 */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-200 block leading-relaxed">
            1. Analisis Pengaruh Aktivitas Fisik: Mengapa laju pernapasan (RR) dan volume tidal (TV) meningkat tajam saat seseorang melakukan latihan lari/olahraga berat? Hubungkan dengan kadar CO2 dan pH darah!
          </label>
          <textarea
            rows={3}
            placeholder="Tuliskan analisis ilmiah Anda di sini..."
            value={answers.q1_pembahasan_aktivitas}
            onChange={(e) => handleAnswerChange('q1_pembahasan_aktivitas', e.target.value)}
            className="w-full bg-[#0f172a] border border-slate-700 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-cyan-400 leading-relaxed"
          />
        </div>

        {/* Q2 */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-200 block leading-relaxed">
            2. Analisis Ketinggian Tempat (Hipoksia Altitude): Berdasarkan data simulasi pada ketinggian Puncak Everest (8.848m), jelaskan mengapa saturasi oksigen (SpO2) dapat turun drastis meskipun laju pernapasan sudah sangat cepat!
          </label>
          <textarea
            rows={3}
            placeholder="Tuliskan analisis ilmiah Anda di sini..."
            value={answers.q2_pembahasan_hipoksia}
            onChange={(e) => handleAnswerChange('q2_pembahasan_hipoksia', e.target.value)}
            className="w-full bg-[#0f172a] border border-slate-700 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-cyan-400 leading-relaxed"
          />
        </div>

        {/* Q3 */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-200 block leading-relaxed">
            3. Patofisiologi Paru-Paru: Bandingkan efek penyakit Asma (penyempitan bronkus) dan Emfisema (kerusakan septa alveolus) terhadap efisiensi pertukaran gas berdasarkan Hukum Fick!
          </label>
          <textarea
            rows={3}
            placeholder="Tuliskan analisis ilmiah Anda di sini..."
            value={answers.q3_pembahasan_patologi}
            onChange={(e) => handleAnswerChange('q3_pembahasan_patologi', e.target.value)}
            className="w-full bg-[#0f172a] border border-slate-700 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-cyan-400 leading-relaxed"
          />
        </div>

        {/* Q4 */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-200 block leading-relaxed">
            4. Kesimpulan Umum: Tuliskan kesimpulan menyeluruh mengenai bagaimana tubuh menjaga homeostasis gas darah (O2 dan CO2) melalui koordinasi sistem respirasi dan sirkulasi!
          </label>
          <textarea
            rows={3}
            placeholder="Tuliskan kesimpulan Anda di sini..."
            value={answers.kesimpulan}
            onChange={(e) => handleAnswerChange('kesimpulan', e.target.value)}
            className="w-full bg-[#0f172a] border border-slate-700 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-cyan-400 leading-relaxed"
          />
        </div>
      </div>

      {/* Section 3: Self-Reflection Quiz & Evaluation Score */}
      <div className="p-6 rounded-2xl bg-[#1e293b] border border-slate-700 shadow-lg space-y-4 printable-card">
        <div className="flex items-center justify-between border-b border-slate-700 pb-3">
          <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center text-xs font-bold">
              3
            </span>
            Kuis Evaluasi Pemahaman Konsep (Auto-Graded)
          </h3>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowQuizResults(true)}
              className="px-3 py-1.5 bg-cyan-500 text-slate-950 font-bold text-xs rounded-lg shadow hover:bg-cyan-400 transition-all no-print"
            >
              Cek Skor Saya
            </button>
          </div>
        </div>

        {showQuizResults && (
          <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-950 to-blue-950 border border-cyan-800/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Award className="w-8 h-8 text-cyan-400" />
              <div>
                <span className="text-xs font-bold text-cyan-400 block">HASIL EVALUASI PEMAHAMAN:</span>
                <span className="text-sm text-slate-200">
                  Skor Anda: <strong className="text-xl font-extrabold text-cyan-300 font-mono">{calculateQuizScore()} / 100</strong>
                </span>
              </div>
            </div>
            <span className="text-xs text-slate-400">
              {calculateQuizScore() >= 80 ? 'Sangat Baik! Pemahaman Konsep Luar Biasa.' : 'Cukup Baik, Silakan Ulas Kembali Materi Konseptual.'}
            </span>
          </div>
        )}

        <div className="space-y-4">
          {QUIZ_QUESTIONS.map((q, idx) => (
            <div key={q.id} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
              <p className="text-xs font-bold text-slate-200 leading-relaxed">
                {idx + 1}. {q.question}
              </p>
              <div className="grid grid-cols-1 gap-1.5 pl-2">
                {q.options.map((opt, optIdx) => {
                  const isSelected = selectedQuizAnswers[q.id] === optIdx;
                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectQuiz(q.id, optIdx)}
                      className={`p-2 rounded-lg text-left text-xs transition-all flex items-start gap-2 ${
                        isSelected
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                          : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-800'
                      }`}
                    >
                      <span className="w-4 h-4 rounded-full border border-slate-600 flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-mono">
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {showQuizResults && (
                <div className="mt-2 p-3 rounded-lg bg-slate-900 border border-slate-700/60 text-[11px] text-slate-300 leading-relaxed">
                  <strong className="text-cyan-400 block">Pembahasan Ilmiah:</strong>
                  {q.explanation}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>

      {/* Signature & Evaluation Box for Printing */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 printable-card">
        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
          Lembar Pengesahan Guru Pengampu Biologi:
        </h4>
        <div className="grid grid-cols-2 gap-8 text-center text-xs text-slate-300 pt-4">
          <div className="space-y-12">
            <p>Peserta Didik,</p>
            <p className="font-bold border-b border-slate-600 pb-1 max-w-[180px] mx-auto">
              {identity.nama || '...........................................'}
            </p>
            <p className="text-[10px] text-slate-500">NISN / No. Absen</p>
          </div>
          <div className="space-y-12">
            <p>Guru Mata Pelajaran Biologi,</p>
            <p className="font-bold border-b border-slate-600 pb-1 max-w-[180px] mx-auto">
              Pak GuruAI, S.Pd., M.Si.
            </p>
            <p className="text-[10px] text-slate-500">NIP. 19850728 201001 1 008</p>
          </div>
        </div>
      </div>

    </div>
  );
};
