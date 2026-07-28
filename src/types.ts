/**
 * Tipe Data dan Interface untuk Simulasi Sistem Respirasi SMA
 * @author Pak GuruAI
 */

export type ActivityLevel = 'rest' | 'walk' | 'run' | 'heavy';
export type AltitudeLevel = 'sea' | 'mountain' | 'everest';
export type LungCondition = 'normal' | 'asthma' | 'emphysema' | 'anemia';

export interface SimParams {
  respiratoryRate: number; // Napas per menit (RR) [8 - 40]
  tidalVolume: number;     // Volume tidal (mL) [300 - 2500]
  activityLevel: ActivityLevel;
  altitudeLevel: AltitudeLevel;
  lungCondition: LungCondition;
}

export interface SimMetrics {
  minuteVentilation: number; // L/menit (RR * TV / 1000)
  spO2: number;              // % Saturasi O2 [70 - 100]
  paO2: number;              // mmHg [40 - 105]
  paCO2: number;             // mmHg [25 - 60]
  bloodpH: number;           // pH [7.10 - 7.60]
  diffusionRate: number;     // % Efisiensi difusi gas
  heartRate: number;         // bpm
  lactateLevel: number;      // mmol/L
  statusText: string;        // Ringkasan diagnosis fisiologis
  statusSeverity: 'success' | 'warning' | 'danger';
}

export interface PresetScenario {
  id: string;
  name: string;
  description: string;
  iconName: string;
  params: SimParams;
}

export interface StudentIdentity {
  nama: string;
  kelas: string;
  absentNo: string;
  sekolah: string;
  tanggal: string;
}

export interface LkpdObservationRecord {
  id: string;
  timestamp: string;
  scenarioName: string;
  rr: number;
  tv: number;
  minuteVentilation: number;
  spO2: number;
  paO2: number;
  paCO2: number;
  bloodpH: number;
  condition: string;
  userNotes: string;
}

export interface LkpdAnswers {
  q1_pembahasan_aktivitas: string;
  q2_pembahasan_hipoksia: string;
  q3_pembahasan_patologi: string;
  q4_mekanisme_pertukaran: string;
  kesimpulan: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface ReferenceItem {
  id: number;
  title: string;
  author: string;
  year: string;
  publisher: string;
  description: string;
  type: 'buku' | 'jurnal' | 'kurikulum';
}
