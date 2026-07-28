import { SimParams, SimMetrics, ActivityLevel, AltitudeLevel, LungCondition, PresetScenario } from '../types';

/**
 * Kalkulator Fisiologi Respirasi
 * Menghitung parameter gas darah, ventilasi, dan status homeostasis secara real-time.
 */
export function calculateSimMetrics(params: SimParams): SimMetrics {
  const { respiratoryRate: rr, tidalVolume: tv, activityLevel, altitudeLevel, lungCondition } = params;

  // 1. Minute Ventilation & Alveolar Ventilation
  const minuteVentilation = Number(((rr * tv) / 1000).toFixed(1)); // L/menit
  const deadSpace = 150; // mL ruang rugi anatomis
  const alveolarVentilation = Math.max(0, (rr * (tv - deadSpace)) / 1000); // L/menit

  // Baseline ideal alveolar ventilation for rest = ~4.2 L/min
  const targetAlveolarVentilation = activityLevel === 'rest' ? 4.2 :
                                  activityLevel === 'walk' ? 7.5 :
                                  activityLevel === 'run' ? 15.0 : 25.0;

  // 2. Faktor Ketinggian (Tekanan Barometrik)
  let basePaO2 = 100; // Sea level baseline (mmHg)
  if (altitudeLevel === 'mountain') basePaO2 = 68;
  if (altitudeLevel === 'everest') basePaO2 = 38;

  // 3. Efisiensi Difusi Gas (Hukum Fick)
  let diffusionFactor = 1.0;
  if (lungCondition === 'emphysema') diffusionFactor = 0.50; // Luas permukaan alveolus berkurang
  if (lungCondition === 'asthma') diffusionFactor = 0.75;    // Penyempit bronkus mengurangi aliran udara
  if (lungCondition === 'anemia') diffusionFactor = 0.85;    // Kadar hemoglobin rendah

  // 4. Hitung PaO2 & PaCO2
  const ventilationRatio = alveolarVentilation / targetAlveolarVentilation;
  
  // PaCO2 berbanding terbalik dengan ventilasi alveolus (Normal = 40 mmHg)
  let paCO2 = 40 / Math.max(0.4, ventilationRatio);
  if (lungCondition === 'asthma' || lungCondition === 'emphysema') {
    paCO2 *= 1.25; // Retensi CO2 akibat obstruksi
  }
  paCO2 = Math.min(65, Math.max(22, Math.round(paCO2)));

  // PaO2 dipengaruhi oleh ketinggian, kondisi paru, dan kecukupan ventilasi
  let paO2 = basePaO2 * Math.min(1.2, Math.pow(ventilationRatio, 0.4)) * diffusionFactor;
  paO2 = Math.min(105, Math.max(30, Math.round(paO2)));

  // 5. Saturasi Oksigen (SpO2) berdasarkan Kurva Dissosiasi Oksihemoglobin (Model Sigmoid Severinghaus)
  // Normal PaO2 100 -> SpO2 ~98-99%. PaO2 60 -> SpO2 ~90%. PaO2 40 -> SpO2 ~75%.
  let spO2 = 100 / (1 + Math.exp(-0.07 * (paO2 - 50))) + 2;
  if (lungCondition === 'anemia') {
    // Pada anemia PaO2 bisa terlihat dekat normal tetapi kapasitas pembawa O2 darah turun
    spO2 -= 3;
  }
  spO2 = Math.min(100, Math.max(55, Math.round(spO2)));

  // 6. pH Darah (Henderson-Hasselbalch equation proxy)
  // pH Normal = 7.40. PCO2 naik -> Acidosis (pH turun). PCO2 turun -> Alkalosis (pH naik).
  let bloodpH = 7.40 - 0.008 * (paCO2 - 40);
  if (activityLevel === 'heavy') bloodpH -= 0.08; // Asidosis laktat saat olahraga berat
  bloodpH = Number(Math.min(7.60, Math.max(7.10, bloodpH)).toFixed(2));

  // 7. Laju Detak Jantung (Heart Rate) & Kadar Laktat
  let baseHR = 70;
  if (activityLevel === 'walk') baseHR = 105;
  if (activityLevel === 'run') baseHR = 145;
  if (activityLevel === 'heavy') baseHR = 175;

  // Kompensasi hipoksia: HR naik jika PaO2 rendah
  if (paO2 < 75) baseHR += Math.round((75 - paO2) * 0.8);
  const heartRate = Math.min(205, baseHR);

  let lactateLevel = 1.0;
  if (activityLevel === 'run') lactateLevel = 3.5;
  if (activityLevel === 'heavy') lactateLevel = 8.5;
  if (spO2 < 85) lactateLevel += (85 - spO2) * 0.15;
  lactateLevel = Number(lactateLevel.toFixed(1));

  // 8. Penilaian Status & Diagnosis Fisiologis
  let statusText = '';
  let statusSeverity: 'success' | 'warning' | 'danger' = 'success';

  if (bloodpH < 7.35 && paCO2 > 45) {
    statusText = 'Asidosis Respiratorik: Penumpukan CO2 (Hiperkapnia) akibat hypoventilasi atau gangguan saluran napas.';
    statusSeverity = 'danger';
  } else if (bloodpH > 7.45 && paCO2 < 35) {
    statusText = 'Alkalosis Respiratorik: CO2 terbuang berlebihan akibat hiperventilasi (napas terlalu cepat/dalam).';
    statusSeverity = 'warning';
  } else if (spO2 < 88) {
    statusText = 'Hipoksia Berat: Kejenuhan oksigen darah sangat rendah! Tubuh mengalami kompensasi takikardia.';
    statusSeverity = 'danger';
  } else if (altitudeLevel === 'everest') {
    statusText = 'Hipoksia Altitude Ekstrem: Tekanan parsial O2 atmosfer sangat tipis (Puncak Everest). Membutuhkan O2 tambahan.';
    statusSeverity = 'danger';
  } else if (lungCondition === 'asthma') {
    statusText = 'Serangan Asma: Bronkospasme menyempitkan lumen bronkiolus. Hambatan aliran udara meningkat.';
    statusSeverity = 'warning';
  } else if (lungCondition === 'emphysema') {
    statusText = 'Emfisema Paru: Kerusakan dinding alveolus mengurangi luas permukaan pertukaran gas secara permanen.';
    statusSeverity = 'warning';
  } else if (lungCondition === 'anemia') {
    statusText = 'Anemia: Konsentrasi Hemoglobin rendah menurunkan kapasitas total pasokan O2 ke jaringan tubuh.';
    statusSeverity = 'warning';
  } else if (activityLevel === 'heavy') {
    statusText = 'Respon Latihan Berat: Respirasi dan kardiovaskular bekerja maksimal menyuplai O2 ke otot yang aktif.';
    statusSeverity = 'success';
  } else {
    statusText = 'Homeostasis Normal: Pertukaran gas O2 dan CO2 seimbang. pH darah dan ventilasi paru dalam rentang ideal.';
    statusSeverity = 'success';
  }

  const diffusionRate = Math.round(diffusionFactor * 100);

  return {
    minuteVentilation,
    spO2,
    paO2,
    paCO2,
    bloodpH,
    diffusionRate,
    heartRate,
    lactateLevel,
    statusText,
    statusSeverity
  };
}

/**
 * Skenario Preset Pembelajaran
 */
export const PRESET_SCENARIOS: PresetScenario[] = [
  {
    id: 'normal',
    name: '1. Istirahat Normal',
    description: 'Kondisi tubuh tenang pada ketinggian permukaan laut. Respirasi ideal & stabil.',
    iconName: 'Activity',
    params: {
      respiratoryRate: 14,
      tidalVolume: 500,
      activityLevel: 'rest',
      altitudeLevel: 'sea',
      lungCondition: 'normal'
    }
  },
  {
    id: 'exercise',
    name: '2. Lari/Olahraga Berat',
    description: 'Metolisme otot meningkat tajam. Laju respirasi dan volume tidal naik pesat untuk membuang CO2 & memasok O2.',
    iconName: 'Zap',
    params: {
      respiratoryRate: 32,
      tidalVolume: 1800,
      activityLevel: 'heavy',
      altitudeLevel: 'sea',
      lungCondition: 'normal'
    }
  },
  {
    id: 'altitude',
    name: '3. Pendakian Gunung (3.000m)',
    description: 'Tekanan parsial O2 di udara tipis. Merangsang kemoreseptor untuk merespon hipoksia.',
    iconName: 'Mountain',
    params: {
      respiratoryRate: 24,
      tidalVolume: 850,
      activityLevel: 'walk',
      altitudeLevel: 'mountain',
      lungCondition: 'normal'
    }
  },
  {
    id: 'everest',
    name: '4. Ekstrem Everest (8.848m)',
    description: 'Zona kematian (Death Zone) dengan tekanan parsial O2 sangat rendah. Resiko hipoksia akut berat.',
    iconName: 'Compass',
    params: {
      respiratoryRate: 36,
      tidalVolume: 1200,
      activityLevel: 'walk',
      altitudeLevel: 'everest',
      lungCondition: 'normal'
    }
  },
  {
    id: 'asthma',
    name: '5. Serangan Asma Akut',
    description: 'Penyempitan lumen bronkus (konstriksi otot polos & inflamasi) menyulitkan aliran ekspirasi dan inspirasi.',
    iconName: 'AlertTriangle',
    params: {
      respiratoryRate: 28,
      tidalVolume: 350,
      activityLevel: 'rest',
      altitudeLevel: 'sea',
      lungCondition: 'asthma'
    }
  },
  {
    id: 'emphysema',
    name: '6. Emfisema Kronis',
    description: 'Kerusakan destruktif pada dinding dinding alveolus (kantong udara pecah/menyatu), kehilangan elastisitas.',
    iconName: 'Wind',
    params: {
      respiratoryRate: 22,
      tidalVolume: 450,
      activityLevel: 'rest',
      altitudeLevel: 'sea',
      lungCondition: 'emphysema'
    }
  }
];
