import { ReferenceItem, QuizQuestion } from '../types';

export const LEARNING_OBJECTIVES = [
  {
    id: 1,
    code: 'TP.BIO.11.1',
    title: 'Anatomi & Struktur Organ Respirasi',
    description: 'Menganalisis keterkaitan antara struktur jaringan organ pernapasan (hidung, faring, laring, trakea, bronkus, bronkiolus, alveolus) dengan fungsinya dalam mekanisme pernapasan manusia.',
    taxonomy: 'C4 - Analisis'
  },
  {
    id: 2,
    code: 'TP.BIO.11.2',
    title: 'Mekanisme Ventilasi Paru (Dada & Perut)',
    description: 'Membedakan mekanisme pernapasan dada dan pernapasan perut pada fase inspirasi dan ekspirasi berdasarkan kontraksi dan relaksasi otot antar tulang rusuk serta otot diafragma.',
    taxonomy: 'C4 - Analisis'
  },
  {
    id: 3,
    code: 'TP.BIO.11.3',
    title: 'Pertukaran Gas di Alveolus & Jaringan',
    description: 'Menerapkan Hukum Fick untuk menjelaskan proses difusi gas O2 dan CO2 menembus membran respirasi alveolus-kapiler serta jaringan tubuh berdasarkan perbedaan tekanan parsial (PO2 dan PCO2).',
    taxonomy: 'C3 - Aplikasi / C4 - Analisis'
  },
  {
    id: 4,
    code: 'TP.BIO.11.4',
    title: 'Pengangkutan O2 & CO2 dalam Darah',
    description: 'Menjelaskan mekanisme pengangkutan oksigen oleh hemoglobin (oksihemoglobin) dan tiga cara pengangkutan karbondioksida (ion bikarbonat HCO3-, senyawa karbominohemoglobin, dan terlarut dalam plasma) serta Effect Bohr.',
    taxonomy: 'C4 - Analisis'
  },
  {
    id: 5,
    code: 'TP.BIO.11.5',
    title: 'Faktor-Faktor Yang Mempengaruhi Laju Respirasi',
    description: 'Menganalisis pengaruh jenis aktivitas fisik, usia, jenis kelamin, suhu tubuh, posisi tubuh, dan ketinggian tempat (tekanan udara) terhadap frekuensi napas dan volume tidal manusia.',
    taxonomy: 'C4 - Analisis'
  },
  {
    id: 6,
    code: 'TP.BIO.11.6',
    title: 'Gangguan & Teknologi Sistem Respirasi',
    description: 'Mengevaluasi pengaruh pola hidup, polusi, dan kelainan fisiologis (asma, emfisema, hipoksia, asidosis/alkalosis respiratorik) terhadap kesehatan organ pernapasan manusia.',
    taxonomy: 'C5 - Evaluasi'
  }
];

export const THEORY_SECTIONS = [
  {
    id: 'anatomi',
    title: '1. Anatomi & Saluran Pernapasan Manusia',
    icon: 'GitPullRequest',
    content: `
Sistem respirasi manusia tersusun atas saluran pernapasan atas dan bawah yang dirancang khusus untuk menyaring, menghangatkan, melembabkan, serta mengalirkan udara menuju alveolus tempat pertukaran gas.

* **Rongga Hidung (Cavum Nasalis):** Dilengkapi rambut hidung (vibrissae) untuk menyaring partikel debu besar, serta konka nasalis yang kaya kapiler darah untuk menghangatkan dan melembabkan udara masuk. Sel epitel bersilia menghasilkan mukus untuk menangkap mikrobia.
* **Faring (Tekak):** Persimpangan antara saluran pernapasan (nasofaring) dan saluran pencernaan (orofaring).
* **Laring (Pangkal Tenggorokan):** Mengandung pita suara (vocal cords) dan **Epiglottis** (katup kartilago yang menutup laring saat menelan makanan agar tidak tersedak).
* **Trakea (Batang Tenggorokan):** Dinding trakea diperkuat oleh cincin tulang rawan hialin berbentuk huruf 'C'. Dilapisi epitel bersilindris bersilia berlapis semu (pseudostratified ciliated columnar epithelium) yang mendorong sekret mukus dan debu ke arah atas (mucociliary escalator).
* **Bronkus & Bronkiolus:** Trakea bercabang menjadi bronkus kanan dan kiri yang masuk ke dalam paru-paru. Bronkus bercabang lagi menjadi bronkiolus yang semakin halus hingga bronkiolus terminalis dan respiratori.
* **Alveolus:** Kantong-kantong tipis berdinding epitel skuamosa selapis (tipe I pneumosit) yang dikelilingi oleh jaring-jaring kapiler darah halus. Tempat berlangsungnya pertukaran gas sejati.
    `
  },
  {
    id: 'mekanisme',
    title: '2. Mekanisme Ventilasi Paru (Inspirasi & Ekspirasi)',
    icon: 'Maximize2',
    content: `
Ventilasi paru mengikuti **Hukum Boyle** ($P_1 \cdot V_1 = P_2 \cdot V_2$), di mana tekanan gas berbanding terbalik dengan volumenya. Air mengalir dari tempat bertekanan tinggi ke tempat bertekanan lebih rendah.

### A. Pernapasan Dada (Peran Otot Antartulang Rusuk / Interkostalis):
* **Inspirasi Dada:** Otot interkostalis eksternal berkontraksi $\rightarrow$ Tulang rusuk dan dada terangkat $\rightarrow$ Volume rongga dada membesar $\rightarrow$ Tekanan intrapulmonal menurun di bawah tekanan atmosfer ($\sim 757\text{ mmHg}$) $\rightarrow$ Udara luar masuk ke paru-paru.
* **Ekspirasi Dada:** Otot interkostalis eksternal berelaksasi $\rightarrow$ Tulang rusuk kembali ke posisi semula $\rightarrow$ Volume rongga dada mengecil $\rightarrow$ Tekanan intrapulmonal meningkat di atas tekanan atmosfer ($\sim 763\text{ mmHg}$) $\rightarrow$ Udara terdorong keluar.

### B. Pernapasan Perut (Peran Otot Diafragma):
* **Inspirasi Perut:** Otot diafragma berkontraksi $\rightarrow$ Diafragma mendatar $\rightarrow$ Volume rongga dada membesar secara vertikal $\rightarrow$ Tekanan paru-paru mengecil $\rightarrow$ Udara masuk.
* **Ekspirasi Perut:** Otot diafragma berelaksasi $\rightarrow$ Diafragma melengkung cembung ke atas $\rightarrow$ Volume rongga dada mengecil $\rightarrow$ Tekanan paru-paru membumbung naik $\rightarrow$ Udara terdorong keluar.
    `
  },
  {
    id: 'pertukaran',
    title: '3. Pertukaran Gas Alveolus & Jaringan (Hukum Fick)',
    icon: 'RefreshCw',
    content: `
Pertukaran gas terjadi secara **difusi pasif** melintasi membran respirasi (membran alveolus-kapiler) setebal hanya $0.2 - 0.5\ \mu\text{m}$.

### A. Difusi Alveolus-Kapiler (Respirasi Eksternal):
* **Oksigen ($O_2$):** Tekanan parsial $O_2$ di alveolus ($PAO_2 \approx 104\text{ mmHg}$) lebih tinggi daripada di darah kapiler deoksigenasi ($PaO_2 \approx 40\text{ mmHg}$). Perbedaan gradien $\Delta P = 64\text{ mmHg}$ mendorong $O_2$ berdifusi cepat menembus membran alveolus masuk ke dalam eritrosit di kapiler.
* **Karbondioksida ($CO_2$):** Tekanan parsial $CO_2$ di kapiler vena ($PaCO_2 \approx 45\text{ mmHg}$) lebih tinggi dibanding alveolus ($PACO_2 \approx 40\text{ mmHg}$). Gradien $\Delta P = 5\text{ mmHg}$ mendorong $CO_2$ berdifusi keluar dari darah menuju alveolus untuk dihembuskan. ($CO_2$ memiliki kelarutan $20\times$ lebih tinggi dibanding $O_2$, sehingga gradien $5\text{ mmHg}$ sudah sangat efektif).

### B. Laju Difusi Gas (Hukum Fick):
$$\text{Laju Difusi } (J) = \frac{A \cdot D \cdot (P_1 - P_2)}{T}$$
* $A$ = Luas permukaan total alveolus ($\sim 70 - 100\text{ m}^2$)
* $D$ = Koefisien kelarutan gas
* $(P_1 - P_2)$ = Beda tekanan parsial gas
* $T$ = Ketebalan membran respirasi
    `
  },
  {
    id: 'transport',
    title: '4. Transport O2 & CO2 dalam Darah & Bohr Effect',
    icon: 'TrendingUp',
    content: `
### Pengangkutan Oksigen ($O_2$):
1. **Terikat Hemoglobin ($98.5\%$):** Dalam sel darah merah, $O_2$ berikatan secara reversibel dengan atom besi ($\text{Fe}^{2+}$) pada gugus heme membentuk **Oksihemoglobin** ($\text{HbO}_2$).
   $$\text{Hb} + 4O_2 \rightleftharpoons \text{Hb}(O_2)_4$$
2. **Terlarut dalam Plasma ($1.5\%$):** Karena $O_2$ kurang larut dalam air.

### Pengangkutan Karbondioksida ($CO_2$):
1. **Bentuk Ion Bikarbonat ($\text{HCO}_3^-$, $70\%$):** $CO_2$ masuk eritrosit bereaksi dengan $H_2O$ dibantu enzim **Karbonik Anhidrase** menjadi Asam Karbonat ($H_2CO_3$), lalu terdisosiasi menjadi $\text{H}^+$ dan $\text{HCO}_3^-$. Ion bikarbonat dipompa keluar plasma darah.
2. **Terikat Hemoglobin ($\text{HbCO}_2$, $23\%$):** Membentuk senyawa **Karbaminohemoglobin** pada gugus amina protein globin.
3. **Terlarut dalam Plasma ($7\%$):** $CO_2$ terlarut langsung sebagai gas.

### Efek Bohr (Bohr Effect):
Kondisi lingkungan jaringan yang aktif bekerja (peningkatan $PCO_2$, suhu tinggi, dan pH rendah/suasana asam) akan **menggeser kurva disosiasi oksihemoglobin ke kanan**. Hal ini menurunkan afinitas hemoglobin terhadap $O_2$, sehingga hemoglobin lebih mudah melepaskan oksigen untuk dikonsumsi oleh jaringan sel otot.
    `
  },
  {
    id: 'gangguan',
    title: '5. Patofisiologi & Kelainan Sistem Respirasi',
    icon: 'ShieldAlert',
    content: `
* **Asma:** Inflamasi kronis dan hipersensitivitas saluran napas yang menyebabkan otot polos bronkus berkontraksi (bronkospasme), pembengkakan mukosa, dan produksi lendir berlebih. Gejala: sesak napas, bunyi mengi (*wheezing*).
* **Emfisema:** Kerusakan progresif pada dinding antar-alveolus akibat paparan asap rokok atau polutan. Luas permukaan pertukaran gas merosot drastis dan paru-paru kehilangan elastisitas rekoil.
* **Hipoksia:** Kondisi insufisiensi oksigen pada tingkat jaringan tubuh.
  * *Hipoksia Hipoksik:* Akibat tekanan $O_2$ udara rendah (ketinggian gunung).
  * *Hipoksia Anemik:* Akibat kurangnya hemoglobin pembawa $O_2$.
  * *Hipoksia Stagnan:* Akibat gangguan sirkulasi/aliran darah (gagal jantung).
* **Asidosis Respiratorik:** Penurunan pH darah ($< 7.35$) akibat peningkatan kadar $CO_2$ ($PaCO_2 > 45\text{ mmHg}$) disebabkan hypoventilasi paru-paru.
* **Alkalosis Respiratorik:** Peningkatan pH darah ($> 7.45$) akibat penurunan drastis $CO_2$ ($PaCO_2 < 35\text{ mmHg}$) akibat hembusan napas terlalu cepat/hiperventilasi.
    `
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Pada fase inspirasi pernapasan dada manusia, urutan peristiwa mekanis yang tepat adalah...',
    options: [
      'Otot interkostalis eksternal relaksasi -> tulang rusuk turun -> volume dada mengecil -> udara masuk',
      'Otot interkostalis eksternal kontraksi -> tulang rusuk terangkat -> volume dada membesar -> tekanan dada turun -> udara masuk',
      'Diafragma melengkung -> volume rongga dada membesar -> tekanan udara dalam paru naik -> udara masuk',
      'Otot interkostalis internal kontraksi -> rongga dada membesar -> tekanan intrapulmonal naik -> udara keluar'
    ],
    correctAnswer: 1,
    explanation: 'Saat inspirasi dada, otot interkostalis eksternal berkontraksi sehingga tulang rusuk terangkat. Akibatnya volume dada membesar, tekanan udara paru-paru menurun di bawah tekanan atmosfer, dan udara luar mengalir masuk.'
  },
  {
    id: 2,
    question: 'Mengapa karbondioksida (CO2) dapat berdifusi cepat dari darah kapiler ke alveolus meskipun beda tekanan parsialnya (ΔP) hanya sekitar 5 mmHg?',
    options: [
      'Karena sel darah merah mendorong CO2 keluar menggunakan transpor aktif',
      'Karena diameter kapiler alveolus membesar saat ekspirasi',
      'Karena kelarutan gas CO2 dalam membran respirasi 20 kali lebih tinggi dibanding gas O2',
      'Karena molekul CO2 diikat kuat oleh hemoglobin di rongga alveolus'
    ],
    correctAnswer: 2,
    explanation: 'Berdasarkan Hukum Fick, laju difusi dipengaruhi oleh kelarutan gas. CO2 memiliki tingkat kelarutan (solubility) sekitar 20-24 kali lebih tinggi daripada O2 dalam cairan dan membran biologis.'
  },
  {
    id: 3,
    question: 'Seorang pendaki gunung tiba di Puncak Everest (8.848m) tanpa tabung O2. Parameter fisiologis apa yang pertama kali mengalami perubahan ekstrim?',
    options: [
      'Penurunan tajam tekanan parsial O2 terinspirasi (PO2) yang memicu hipoksia dan takikardia kompensasi',
      'Peningkatan pH darah menjadi asam akibat penumpukan bikarbonat',
      'Penurunan laju denyut jantung menjadi di bawah 40 bpm',
      'Peningkatan volume tidal hingga 5000 mL secara tiba-tiba'
    ],
    correctAnswer: 0,
    explanation: 'Pada ketinggian ekstrem, tekanan atmosfer merosot drastis (dari 760 mmHg menjadi ~250 mmHg), menurunkan PO2 terinspirasi secara tajam dan menyebabkan hipoksia hipoksik yang memicu jantung berdetak lebih cepat (takikardia).'
  },
  {
    id: 4,
    question: 'Bagaimana dampak Efek Bohr (Bohr Effect) terhadap pelepasan oksigen ke sel-sel otot saat seorang atlet sedang berlari cepat?',
    options: [
      'Peningkatan pH darah membuat hemoglobin mengikat O2 lebih erat',
      'Penurunan suhu otot menghambat pelepasan O2 ke mitokondria',
      'Peningkatan CO2, penurunan pH (suasana asam), dan kenaikan suhu otot menggeser kurva disosiasi Hb-O2 ke kanan, mempermudah pelepasan O2',
      'Hemoglobin mengubah O2 menjadi gas nitrogen untuk energi otot'
    ],
    correctAnswer: 2,
    explanation: 'Efek Bohr menjelaskan bahwa saat metabolik otot tinggi (CO2 naik, pH turun, suhu naik), afinitas Hb terhadap O2 menurun (kurva bergeser ke kanan) sehingga O2 lebih mudah dilepaskan untuk metabolisme sel.'
  },
  {
    id: 5,
    question: 'Pada penderita Asidosis Respiratorik akibat serangan Asma berat, perubahan kondisi kimiawi darah yang terdeteksi adalah...',
    options: [
      'pH darah > 7.45 dan PaCO2 rendah (< 35 mmHg)',
      'pH darah < 7.35 dan PaCO2 tinggi (> 45 mmHg) akibat retensi CO2 karena hipoventilasi',
      'Saturasi O2 (SpO2) 100% dengan kadar laktat nol',
      'Tekanan PaO2 meningkat melebihi 120 mmHg'
    ],
    correctAnswer: 1,
    explanation: 'Asidosis respiratorik terjadi ketika ventilasi paru terganggu (hipoventilasi/obstruksi asma) sehingga CO2 tidak dapat dibuang dengan lancar. CO2 yang tertahan bereaksi membentuk asam karbonat, menurunkan pH darah di bawah 7.35.'
  }
];

export const REFERENCES_LIST: ReferenceItem[] = [
  {
    id: 1,
    title: 'Campbell Biology (12th Edition)',
    author: 'Urry, L. A., Cain, M. L., Wasserman, S. A., Minorsky, P. V., & Orr, R. B.',
    year: '2020',
    publisher: 'Pearson Education, Inc.',
    description: 'Buku teks standar internasional Biologi tingkat universitas dan referensi utama Olimpiade Biologi.',
    type: 'buku'
  },
  {
    id: 2,
    title: 'Guyton and Hall Textbook of Medical Physiology (14th Edition)',
    author: 'Hall, J. E., & Hall, M. E.',
    year: '2021',
    publisher: 'Elsevier Health Sciences',
    description: 'Referensi utama fisiologi kedokteran untuk pembahasan rinci mekanika paru, pertukaran gas alveolus, dan regulasi asam-basa darah.',
    type: 'buku'
  },
  {
    id: 3,
    title: 'Capaian Pembelajaran dan Alur Tujuan Pembelajaran (ATP) Biologi SMA Fase F',
    author: 'Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi RI',
    year: '2024',
    publisher: 'Badan Standar, Kurikulum, dan Asesmen Pendidikan (BSKAP) Kemendikbudristek',
    description: 'Panduan kurikulum resmi Kurikulum Merdeka untuk mata pelajaran Biologi tingkat SMA Kelas XI.',
    type: 'kurikulum'
  },
  {
    id: 4,
    title: 'Biologi untuk SMA/MA Kelas XI (Kurikulum Merdeka)',
    author: 'Rochmah, S. N., Widayati, S., & Murni, S.',
    year: '2023',
    publisher: 'Pusat Perbukuan Kemendikbudristek RI',
    description: 'Buku teks siswa Biologi SMA resmi yang memuat konsep sistem organ manusia dan integrasi teknologi pembelajaran.',
    type: 'buku'
  }
];
