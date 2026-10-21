export interface Facility {
  id: string;
  name: string;
  urduName: string;
  slug: string;
  city: string;
  province: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  location?: {
    type?: string;
    coordinates?: [number, number];
  };
  address: string | {
    province?: string;
    city?: string;
    fullAddress?: string;
    [key: string]: any;
  };
  facilityType: 'cancer_hospital' | 'tertiary_care' | 'diagnostic_center' | 'public_hospital';
  services: string[];
  contacts: {
    phone: string;
    helpline?: string;
    website?: string;
  };
  verification: {
    status: 'verified' | 'partially_verified' | 'under_review';
    source: string;
    lastVerifiedAt: string;
    hasMammography: boolean;
    hasOncologyClinic: boolean;
    hasFinancialAssistance: boolean;
  };
  notes: string;
}

export const PAKISTAN_FACILITIES: Facility[] = [
  {
    id: 'fac-skmch-lhr',
    name: 'Shaukat Khanum Memorial Cancer Hospital & Research Centre (Lahore)',
    urduName: 'شوکت خانم میموریل کینسر ہسپتال اینڈ ریسرچ سینٹر، لاہور',
    slug: 'shaukat-khanum-lahore',
    city: 'Lahore',
    province: 'Punjab',
    coordinates: { lat: 31.4284, lng: 74.2755 },
    address: '7A Block R-3, Johar Town, Lahore, Punjab 54000',
    facilityType: 'cancer_hospital',
    services: ['Digital Mammography', 'Breast Surgery', 'Medical Oncology', 'Radiation Oncology', 'Pathology & Biopsy', 'Zakat / Financial Assistance'],
    contacts: {
      phone: '+92 42 35905000',
      helpline: '0800 11 555',
      website: 'https://shaukatkhanum.org.pk',
    },
    verification: {
      status: 'verified',
      source: 'Official SKMCH Directory & Healthcare Commission Accreditation',
      lastVerifiedAt: '2026-09-15',
      hasMammography: true,
      hasOncologyClinic: true,
      hasFinancialAssistance: true,
    },
    notes: 'Comprehensive dedicated cancer facility with specialized breast multidisciplinary clinic and extensive patient financial assistance program.',
  },
  {
    id: 'fac-akuh-khi',
    name: 'Aga Khan University Hospital (AKUH)',
    urduName: 'آغا خان یونیورسٹی ہسپتال، کراچی',
    slug: 'aga-khan-karachi',
    city: 'Karachi',
    province: 'Sindh',
    coordinates: { lat: 24.8931, lng: 67.0722 },
    address: 'Stadium Road, P.O. Box 3500, Karachi 74800, Sindh',
    facilityType: 'tertiary_care',
    services: ['3D Tomosynthesis Mammography', 'Breast Care Clinic', 'Surgical Oncology', 'Chemotherapy', 'Radiation Oncology', 'Genetic Counselling'],
    contacts: {
      phone: '+92 21 111 911 911',
      helpline: '+92 21 34861000',
      website: 'https://hospitals.aku.edu/karachi',
    },
    verification: {
      status: 'verified',
      source: 'Aga Khan Health Services / JCI Accredited',
      lastVerifiedAt: '2026-10-01',
      hasMammography: true,
      hasOncologyClinic: true,
      hasFinancialAssistance: true,
    },
    notes: 'JCIA accredited tertiary centre with dedicated Breast Care Clinic and advanced 3D mammography screening.',
  },
  {
    id: 'fac-nori-isb',
    name: 'Nuclear Medicine, Oncology and Radiotherapy Institute (NORI)',
    urduName: 'نیوکلیئر میڈیسن، آنکولوجی اینڈ ریڈیو تھراپی انسٹیٹیوٹ (نوری)، اسلام آباد',
    slug: 'nori-islamabad',
    city: 'Islamabad',
    province: 'Islamabad Capital Territory',
    coordinates: { lat: 33.6844, lng: 73.0479 },
    address: 'Hanna Road, Sector G-8/3, Islamabad',
    facilityType: 'cancer_hospital',
    services: ['Mammography', 'Breast Ultrasound', 'Chemotherapy', 'Radiotherapy', 'Nuclear Medicine', 'Government Subsidy Support'],
    contacts: {
      phone: '+92 51 9260611',
      website: 'https://paec.gov.pk/nori',
    },
    verification: {
      status: 'verified',
      source: 'PAEC Cancer Registry & Ministry of National Health Services',
      lastVerifiedAt: '2026-08-20',
      hasMammography: true,
      hasOncologyClinic: true,
      hasFinancialAssistance: true,
    },
    notes: 'Government PAEC atomic energy cancer hospital offering subsidized and free treatments for eligible patients across ICT and Northern Pakistan.',
  },
  {
    id: 'fac-skmch-pew',
    name: 'Shaukat Khanum Memorial Cancer Hospital & Research Centre (Peshawar)',
    urduName: 'شوکت خانم میموریل کینسر ہسپتال، پشاور',
    slug: 'shaukat-khanum-peshawar',
    city: 'Peshawar',
    province: 'Khyber Pakhtunkhwa',
    coordinates: { lat: 33.9922, lng: 71.4789 },
    address: 'Plot 5-B, Sector A-2, Phase 5, Hayatabad, Peshawar, KP',
    facilityType: 'cancer_hospital',
    services: ['Mammography', 'Breast Surgery', 'Chemotherapy', 'Radiation Oncology', 'Zakat Patient Welfare'],
    contacts: {
      phone: '+92 91 5885000',
      helpline: '0800 11 555',
      website: 'https://shaukatkhanum.org.pk/peshawar',
    },
    verification: {
      status: 'verified',
      source: 'Official SKMCH Regional Registry',
      lastVerifiedAt: '2026-09-10',
      hasMammography: true,
      hasOncologyClinic: true,
      hasFinancialAssistance: true,
    },
    notes: 'Specialized cancer hospital serving Khyber Pakhtunkhwa, Malakand, and tribal districts with complete financial assistance programs.',
  },
  {
    id: 'fac-jpmc-khi',
    name: 'Jinnah Postgraduate Medical Centre (JPMC) - Cancer Pavilion',
    urduName: 'جناح پوسٹ گریجویٹ میڈیکل سینٹر (کینسر وارڈ)، کراچی',
    slug: 'jpmc-karachi',
    city: 'Karachi',
    province: 'Sindh',
    coordinates: { lat: 24.8532, lng: 67.0478 },
    address: 'Rafiqui Shaheed Road, Cantt, Karachi 75510, Sindh',
    facilityType: 'public_hospital',
    services: ['Mammography Diagnostic Unit', 'Breast Surgery Clinic', 'Medical Oncology', 'CyberKnife & Tomotherapy', 'Free Public Care'],
    contacts: {
      phone: '+92 21 99201300',
      website: 'https://jpmc.edu.pk',
    },
    verification: {
      status: 'verified',
      source: 'Sindh Department of Health & Patients Aid Foundation',
      lastVerifiedAt: '2026-09-22',
      hasMammography: true,
      hasOncologyClinic: true,
      hasFinancialAssistance: true,
    },
    notes: 'Major public tertiary hospital with cutting-edge robotic radiotherapy and completely free oncology treatment funded via Patients Aid Foundation.',
  },
  {
    id: 'fac-inmol-lhr',
    name: 'Institute of Nuclear Medicine & Oncology (INMOL)',
    urduName: 'انسٹیٹیوٹ آف نیوکلیئر میڈیسن اینڈ آنکولوجی (انمول)، لاہور',
    slug: 'inmol-lahore',
    city: 'Lahore',
    province: 'Punjab',
    coordinates: { lat: 31.5033, lng: 74.3167 },
    address: 'Wahdat Road, Muslim Town, Lahore, Punjab',
    facilityType: 'cancer_hospital',
    services: ['Mammography Screening', 'Breast Ultrasound', 'Chemotherapy', 'Radiotherapy', 'Breast Clinic'],
    contacts: {
      phone: '+92 42 99231035',
      website: 'https://paec.gov.pk/inmol',
    },
    verification: {
      status: 'verified',
      source: 'PAEC Cancer Hospital Network',
      lastVerifiedAt: '2026-08-30',
      hasMammography: true,
      hasOncologyClinic: true,
      hasFinancialAssistance: true,
    },
    notes: 'Pioneer cancer treatment institution in Lahore providing heavily subsidized specialized breast screening and radiotherapy.',
  },
  {
    id: 'fac-kiran-khi',
    name: 'Karachi Institute of Radiotherapy and Nuclear Medicine (KIRAN)',
    urduName: 'کراچی انسٹیٹیوٹ آف ریڈیو تھراپی اینڈ نیوکلیئر میڈیسن (کرن)',
    slug: 'kiran-karachi',
    city: 'Karachi',
    province: 'Sindh',
    coordinates: { lat: 24.9664, lng: 67.1423 },
    address: 'Near Safoora Goth, Off University Road, Gulzar-e-Hijri, Karachi',
    facilityType: 'cancer_hospital',
    services: ['Mammography', 'Breast Examination', 'Chemotherapy', 'External Beam Radiotherapy', 'Nuclear Diagnostics'],
    contacts: {
      phone: '+92 21 99261601',
      website: 'https://paec.gov.pk/kiran',
    },
    verification: {
      status: 'verified',
      source: 'PAEC Oncology Network',
      lastVerifiedAt: '2026-07-28',
      hasMammography: true,
      hasOncologyClinic: true,
      hasFinancialAssistance: true,
    },
    notes: 'Specialized regional oncology centre serving interior Sindh and metropolitan Karachi with subsidized diagnostic imaging and therapy.',
  },
  {
    id: 'fac-cenar-qta',
    name: 'Center for Nuclear Medicine & Radiotherapy (CENAR)',
    urduName: 'سینٹر فار نیوکلیئر میڈیسن اینڈ ریڈیو تھراپی (سینار)، کوئٹہ',
    slug: 'cenar-quetta',
    city: 'Quetta',
    province: 'Balochistan',
    coordinates: { lat: 30.2241, lng: 67.0145 },
    address: 'Brewery Road, Western Bypass Junction, Quetta, Balochistan',
    facilityType: 'cancer_hospital',
    services: ['Mammography Unit', 'Oncology Outpatient Clinic', 'Radiotherapy', 'Ultrasound Biopsy', 'Bait-ul-Maal Welfare Assistance'],
    contacts: {
      phone: '+92 81 9213214',
      website: 'https://paec.gov.pk/cenar',
    },
    verification: {
      status: 'verified',
      source: 'Balochistan Health Directorate & PAEC',
      lastVerifiedAt: '2026-09-05',
      hasMammography: true,
      hasOncologyClinic: true,
      hasFinancialAssistance: true,
    },
    notes: 'Primary cancer treatment institution in Balochistan providing mammography screening and radiotherapy services.',
  },
  {
    id: 'fac-pims-isb',
    name: 'Pakistan Institute of Medical Sciences (PIMS) - Breast Care Clinic',
    urduName: 'پاکستان انسٹیٹیوٹ آف میڈیکل سائنسز (پمز)، اسلام آباد',
    slug: 'pims-islamabad',
    city: 'Islamabad',
    province: 'Islamabad Capital Territory',
    coordinates: { lat: 33.7042, lng: 73.0567 },
    address: 'Sector G-8/3, Islamabad',
    facilityType: 'public_hospital',
    services: ['Mammography', 'One-Stop Breast Clinic', 'General Breast Surgery', 'Histopathology', 'Sehat Sahulat Program'],
    contacts: {
      phone: '+92 51 9261170',
      website: 'https://pims.gov.pk',
    },
    verification: {
      status: 'verified',
      source: 'Ministry of National Health Services Regulations and Coordination',
      lastVerifiedAt: '2026-08-15',
      hasMammography: true,
      hasOncologyClinic: true,
      hasFinancialAssistance: true,
    },
    notes: 'Federal government tertiary hospital with active One-Stop Breast Clinic offering same-day clinical check and diagnostic referral.',
  },
];
