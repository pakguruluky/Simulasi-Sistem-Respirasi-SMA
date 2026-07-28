import React, { useState, useMemo } from 'react';
import { SimParams, StudentIdentity, LkpdObservationRecord, LkpdAnswers } from './types';
import { calculateSimMetrics, PRESET_SCENARIOS } from './utils/bioPhysics';
import { Header } from './components/Header';
import { Objectives } from './components/Objectives';
import { Theory } from './components/Theory';
import { Simulation } from './components/Simulation';
import { Lkpd } from './components/Lkpd';
import { References } from './components/References';
import { Footer } from './components/Footer';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'objectives' | 'theory' | 'simulation' | 'lkpd' | 'references'>('simulation');

  // Initial Simulation Parameters (Normal Rest State)
  const [params, setParams] = useState<SimParams>({
    respiratoryRate: 14,
    tidalVolume: 500,
    activityLevel: 'rest',
    altitudeLevel: 'sea',
    lungCondition: 'normal'
  });

  // Toast Notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Calculate Physiological Metrics real-time
  const metrics = useMemo(() => calculateSimMetrics(params), [params]);

  // Student Identity State
  const [identity, setIdentity] = useState<StudentIdentity>({
    nama: '',
    kelas: '',
    absentNo: '',
    sekolah: 'SMA Negeri 1 Biologi',
    tanggal: new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })
  });

  // LKPD Recorded Observations
  const [records, setRecords] = useState<LkpdObservationRecord[]>([
    {
      id: 'init-1',
      timestamp: new Date().toLocaleTimeString('id-ID'),
      scenarioName: '1. Istirahat Normal (Baseline)',
      rr: 14,
      tv: 500,
      minuteVentilation: 7.0,
      spO2: 98,
      paO2: 99,
      paCO2: 40,
      bloodpH: 7.40,
      condition: 'Normal',
      userNotes: 'Suhu dan homeostasis normal.'
    }
  ]);

  // LKPD Answers State
  const [answers, setAnswers] = useState<LkpdAnswers>({
    q1_pembahasan_aktivitas: '',
    q2_pembahasan_hipoksia: '',
    q3_pembahasan_patologi: '',
    q4_mekanisme_pertukaran: '',
    kesimpulan: ''
  });

  // Handler: Log current simulation metrics to LKPD table
  const handleLogToLkpd = () => {
    let scenarioLabel = 'Kustomasi Parameter';
    if (params.activityLevel === 'heavy') scenarioLabel = 'Latihan Olahraga Berat';
    else if (params.altitudeLevel === 'everest') scenarioLabel = 'Puncak Everest (8.848m)';
    else if (params.lungCondition === 'asthma') scenarioLabel = 'Serangan Asma Akut';
    else if (params.lungCondition === 'emphysema') scenarioLabel = 'Emfisema Paru';

    const newRecord: LkpdObservationRecord = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleTimeString('id-ID'),
      scenarioName: scenarioLabel,
      rr: params.respiratoryRate,
      tv: params.tidalVolume,
      minuteVentilation: metrics.minuteVentilation,
      spO2: metrics.spO2,
      paO2: metrics.paO2,
      paCO2: metrics.paCO2,
      bloodpH: metrics.bloodpH,
      condition: params.lungCondition,
      userNotes: metrics.statusText
    };

    setRecords(prev => [...prev, newRecord]);

    // Show toast confirmation
    setToastMessage('✓ Data parameter simulasi berhasil disalin ke Tabel LKPD!');
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Handler: Trigger Browser Print Document View
  const handlePrintLkpd = () => {
    setActiveTab('lkpd');
    setTimeout(() => {
      window.print();
    }, 300);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* Top Header & Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onPrintLkpd={handlePrintLkpd}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 space-y-6">
        
        {/* Toast Notification Banner */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs shadow-2xl flex items-center gap-2 border border-emerald-300 animate-bounce no-print">
            <CheckCircle2 className="w-5 h-5" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Tab 1: Objectives */}
        {activeTab === 'objectives' && (
          <Objectives onStartSim={() => setActiveTab('simulation')} />
        )}

        {/* Tab 2: Theory */}
        {activeTab === 'theory' && <Theory />}

        {/* Tab 3: Interactive Simulation Suite */}
        {activeTab === 'simulation' && (
          <Simulation
            params={params}
            setParams={setParams}
            metrics={metrics}
            onLogToLkpd={handleLogToLkpd}
          />
        )}

        {/* Tab 4: LKPD Digital & Printable Report */}
        {activeTab === 'lkpd' && (
          <Lkpd
            identity={identity}
            setIdentity={setIdentity}
            records={records}
            setRecords={setRecords}
            answers={answers}
            setAnswers={setAnswers}
            onPrint={handlePrintLkpd}
          />
        )}

        {/* Tab 5: References */}
        {activeTab === 'references' && <References />}

      </main>

      {/* Footer containing mandatory copyright */}
      <Footer />

    </div>
  );
}
