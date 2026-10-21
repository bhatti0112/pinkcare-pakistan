/**
 * PinkCare Pakistan Database Layer
 * Provides data models and persistence with seed data for verified facilities,
 * peer-reviewed articles, cited sources, authorized staff users, and audit logs.
 */

export interface FacilityDoc {
  id: string;
  name: string;
  urduName: string;
  slug: string;
  city: string;
  province: string;
  location: {
    type: 'Point';
    coordinates: [number, number]; // [longitude, latitude] GeoJSON standard
  };
  address: {
    province: string;
    city: string;
    fullAddress: string;
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
  createdAt: string;
  updatedAt: string;
}

export interface ArticleDoc {
  id: string;
  slug: string;
  title: string;
  urduTitle: string;
  summary: string;
  urduSummary: string;
  category: 'breast_health' | 'warning_signs' | 'screening' | 'risk_factors' | 'patient_guide';
  language: 'en' | 'ur' | 'both';
  readTimeMinutes: number;
  author: string;
  reviewer: string;
  publicationStatus: 'published' | 'draft' | 'under_review' | 'archived';
  medicalReviewStatus: 'approved' | 'pending' | 'revision_required';
  lastReviewedAt: string;
  sources: { name: string; url?: string; publisher: string }[];
  sections: {
    heading: string;
    urduHeading: string;
    content: string;
    urduContent: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface SourceDoc {
  id: string;
  name: string;
  officialUrl?: string;
  publisher: string;
  topic: string;
  verificationStatus: 'verified' | 'pending';
  lastAccessed: string;
}

export interface AuditLogDoc {
  id: string;
  action: string;
  actorEmail: string;
  role: string;
  resourceType: string;
  resourceId?: string;
  timestamp: string;
  status: 'SUCCESS' | 'FAILED' | 'REJECTED';
}

export interface FacilityReportDoc {
  id: string;
  facilityId: string;
  facilityName: string;
  details: string;
  reporterEmail?: string;
  status: 'pending' | 'investigated' | 'resolved';
  submittedAt: string;
}

export interface UserDoc {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'editor' | 'medical_reviewer';
  passwordHash: string; // bcrypt/argon placeholder
  createdAt: string;
}

// Initial In-Memory Database State
class PinkCareDatabase {
  facilities: FacilityDoc[] = [
    {
      id: 'fac-skmch-lhr',
      name: 'Shaukat Khanum Memorial Cancer Hospital & Research Centre (Lahore)',
      urduName: 'شوکت خانم میموریل کینسر ہسپتال اینڈ ریسرچ سینٹر، لاہور',
      slug: 'shaukat-khanum-lahore',
      city: 'Lahore',
      province: 'Punjab',
      location: { type: 'Point', coordinates: [74.2755, 31.4284] },
      address: {
        province: 'Punjab',
        city: 'Lahore',
        fullAddress: '7A Block R-3, Johar Town, Lahore, Punjab 54000',
      },
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
      notes: 'Comprehensive dedicated cancer hospital with multidisciplinary breast clinic and extensive financial aid.',
      createdAt: '2026-01-01T00:00:00Z',
      updatedAt: '2026-09-15T00:00:00Z',
    },
    {
      id: 'fac-akuh-khi',
      name: 'Aga Khan University Hospital (AKUH)',
      urduName: 'آغا خان یونیورسٹی ہسپتال، کراچی',
      slug: 'aga-khan-karachi',
      city: 'Karachi',
      province: 'Sindh',
      location: { type: 'Point', coordinates: [67.0722, 24.8931] },
      address: {
        province: 'Sindh',
        city: 'Karachi',
        fullAddress: 'Stadium Road, P.O. Box 3500, Karachi 74800, Sindh',
      },
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
      notes: 'JCIA accredited tertiary centre with dedicated Breast Care Clinic and 3D mammography.',
      createdAt: '2026-01-01T00:00:00Z',
      updatedAt: '2026-10-01T00:00:00Z',
    },
    {
      id: 'fac-nori-isb',
      name: 'Nuclear Medicine, Oncology and Radiotherapy Institute (NORI)',
      urduName: 'نیوکلیئر میڈیسن، آنکولوجی اینڈ ریڈیو تھراپی انسٹیٹیوٹ (نوری)، اسلام آباد',
      slug: 'nori-islamabad',
      city: 'Islamabad',
      province: 'Islamabad Capital Territory',
      location: { type: 'Point', coordinates: [73.0479, 33.6844] },
      address: {
        province: 'Islamabad Capital Territory',
        city: 'Islamabad',
        fullAddress: 'Hanna Road, Sector G-8/3, Islamabad',
      },
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
      notes: 'PAEC atomic energy cancer hospital offering subsidized diagnostic and treatment care for Northern Pakistan.',
      createdAt: '2026-01-01T00:00:00Z',
      updatedAt: '2026-08-20T00:00:00Z',
    },
    {
      id: 'fac-skmch-pew',
      name: 'Shaukat Khanum Memorial Cancer Hospital (Peshawar)',
      urduName: 'شوکت خانم میموریل کینسر ہسپتال، پشاور',
      slug: 'shaukat-khanum-peshawar',
      city: 'Peshawar',
      province: 'Khyber Pakhtunkhwa',
      location: { type: 'Point', coordinates: [71.4789, 33.9922] },
      address: {
        province: 'Khyber Pakhtunkhwa',
        city: 'Peshawar',
        fullAddress: 'Plot 5-B, Sector A-2, Phase 5, Hayatabad, Peshawar, KP',
      },
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
      notes: 'Dedicated cancer hospital serving Khyber Pakhtunkhwa and Northern districts with patient financial support.',
      createdAt: '2026-01-01T00:00:00Z',
      updatedAt: '2026-09-10T00:00:00Z',
    },
    {
      id: 'fac-cenar-qta',
      name: 'Center for Nuclear Medicine & Radiotherapy (CENAR)',
      urduName: 'سینٹر فار نیوکلیئر میڈیسن اینڈ ریڈیو تھراپی (سینار)، کوئٹہ',
      slug: 'cenar-quetta',
      city: 'Quetta',
      province: 'Balochistan',
      location: { type: 'Point', coordinates: [67.0145, 30.2241] },
      address: {
        province: 'Balochistan',
        city: 'Quetta',
        fullAddress: 'Brewery Road, Western Bypass Junction, Quetta, Balochistan',
      },
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
      notes: 'Primary cancer treatment institution in Balochistan offering mammography screening and radiotherapy.',
      createdAt: '2026-01-01T00:00:00Z',
      updatedAt: '2026-09-05T00:00:00Z',
    },
    {
      id: 'fac-jpmc-khi',
      name: 'Jinnah Postgraduate Medical Centre (JPMC) - Cancer Pavilion',
      urduName: 'جناح پوسٹ گریجویٹ میڈیکل سینٹر (کینسر وارڈ)، کراچی',
      slug: 'jpmc-karachi',
      city: 'Karachi',
      province: 'Sindh',
      location: { type: 'Point', coordinates: [67.0478, 24.8532] },
      address: {
        province: 'Sindh',
        city: 'Karachi',
        fullAddress: 'Rafiqui Shaheed Road, Cantt, Karachi 75510, Sindh',
      },
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
      notes: 'Major public tertiary hospital with advanced robotic radiotherapy and free oncology treatment.',
      createdAt: '2026-01-01T00:00:00Z',
      updatedAt: '2026-09-22T00:00:00Z',
    },
  ];

  articles: ArticleDoc[] = [
    {
      id: 'art-warning-signs',
      slug: 'breast-cancer-warning-signs',
      title: 'Recognizing Early Warning Signs of Breast Cancer',
      urduTitle: 'چھاتی کے کینسر کی ابتدائی انتباہی علامات کی پہچان',
      summary: 'A clear, non-alarmist guide to noticeable changes in the breast and when to consult a certified doctor.',
      urduSummary: 'چھاتی میں نمایاں تبدیلیوں اور ڈاکٹر سے فوری رجوع کرنے کے بارے میں ایک مستند طبی گائیڈ۔',
      category: 'warning_signs',
      language: 'both',
      readTimeMinutes: 5,
      author: 'PinkCare Clinical Education Team',
      reviewer: 'Reviewed by Consultant Oncologist',
      publicationStatus: 'published',
      medicalReviewStatus: 'approved',
      lastReviewedAt: '2026-09-01',
      sources: [
        { name: 'World Health Organization (WHO) Global Breast Cancer Initiative', url: 'https://who.int', publisher: 'WHO' },
        { name: 'Shaukat Khanum Memorial Cancer Hospital Clinical Guidelines', url: 'https://shaukatkhanum.org.pk', publisher: 'SKMCH&RC' },
      ],
      sections: [
        {
          heading: 'What Changes to Watch For',
          urduHeading: 'کن تبدیلیوں پر نظر رکھنی چاہیے؟',
          content: 'While many breast changes are benign (non-cancerous), it is essential to have any new or unusual symptom examined by a physician. Common signs include a firm lump, skin dimpling, or nipple changes.',
          urduContent: 'اگرچہ چھاتی کی زیادہ تر تبدیلیاں بے ضرر ہوتی ہیں، لیکن کسی بھی نئی تبدیلی پر ڈاکٹر سے معائنہ کروانا ضروری ہے۔',
        },
      ],
      createdAt: '2026-01-01T00:00:00Z',
      updatedAt: '2026-09-01T00:00:00Z',
    },
    {
      id: 'art-screening-guidelines',
      slug: 'screening-mammography-guide',
      title: 'Screening and Mammography: Guidelines for Women in Pakistan',
      urduTitle: 'میموگرافی اور اسکریننگ: پاکستانی خواتین کے لیے رہنما اصول',
      summary: 'Evidence-based screening schedules, clinical breast exams, and what to expect during a mammogram.',
      urduSummary: 'میموگرافی کب اور کیوں ضروری ہے؟ اسکریننگ کے طریقہ کار اور احتیاطی تدابیر کی تفصیل۔',
      category: 'screening',
      language: 'both',
      readTimeMinutes: 6,
      author: 'PinkCare Preventive Health Group',
      reviewer: 'Reviewed by Radiologist & Oncology Panel',
      publicationStatus: 'published',
      medicalReviewStatus: 'approved',
      lastReviewedAt: '2026-08-15',
      sources: [
        { name: 'Pakistan Society of Breast Surgeons Guidelines', publisher: 'PSBS' },
        { name: 'American College of Radiology (ACR) Screening Appropriateness Criteria', publisher: 'ACR' },
      ],
      sections: [
        {
          heading: 'Why Regular Screening Matters',
          urduHeading: 'باقاعدہ اسکریننگ کیوں اہم ہے؟',
          content: 'A screening mammogram can detect abnormal tissue growths up to two years before a lump can be felt by hand. Women aged 40 and older should receive annual or biennial mammograms.',
          urduContent: 'میموگرافی کے ذریعے چھاتی میں تبدیلی یا گلٹی کا ہاتھ سے محسوس ہونے سے تقریباً دو سال پہلے ہی پتہ لگایا جا سکتا ہے۔',
        },
      ],
      createdAt: '2026-01-01T00:00:00Z',
      updatedAt: '2026-08-15T00:00:00Z',
    },
  ];

  sources: SourceDoc[] = [
    {
      id: 'src-who-gbci',
      name: 'Global Breast Cancer Initiative Implementation Framework',
      officialUrl: 'https://www.who.int/initiatives/global-breast-cancer-initiative',
      publisher: 'World Health Organization (WHO)',
      topic: 'Global early detection targets and screening protocols.',
      verificationStatus: 'verified',
      lastAccessed: '2026-09-20',
    },
    {
      id: 'src-skmch',
      name: 'Clinical Breast Examination & Oncology Practice Guidelines',
      officialUrl: 'https://shaukatkhanum.org.pk',
      publisher: 'Shaukat Khanum Memorial Cancer Hospital & Research Centre',
      topic: 'Pakistan-specific cancer epidemiology and diagnostic protocols.',
      verificationStatus: 'verified',
      lastAccessed: '2026-08-30',
    },
    {
      id: 'src-nccn',
      name: 'Breast Cancer Screening and Diagnosis Guidelines',
      officialUrl: 'https://www.nccn.org/guidelines',
      publisher: 'National Comprehensive Cancer Network (NCCN)',
      topic: 'Risk assessment, mammography frequency, and multidisciplinary treatment standards.',
      verificationStatus: 'verified',
      lastAccessed: '2026-09-12',
    },
  ];

  reports: FacilityReportDoc[] = [];

  users: UserDoc[] = [
    {
      id: 'usr-admin-1',
      email: 'admin@pinkcare.pk',
      name: 'Senior Clinical Administrator',
      role: 'admin',
      passwordHash: 'argon2id_mock_valid_hash',
      createdAt: '2026-01-01T00:00:00Z',
    },
    {
      id: 'usr-rev-1',
      email: 'reviewer@pinkcare.pk',
      name: 'Dr. Fatima Zahra (Oncology Panel)',
      role: 'medical_reviewer',
      passwordHash: 'argon2id_mock_valid_hash',
      createdAt: '2026-01-15T00:00:00Z',
    },
  ];

  auditLogs: AuditLogDoc[] = [
    {
      id: 'log-1',
      action: 'FACILITY_VERIFIED',
      actorEmail: 'reviewer@pinkcare.pk',
      role: 'medical_reviewer',
      resourceType: 'facility',
      resourceId: 'fac-akuh-khi',
      timestamp: '2026-10-01T12:00:00Z',
      status: 'SUCCESS',
    },
    {
      id: 'log-2',
      action: 'FACILITY_VERIFIED',
      actorEmail: 'reviewer@pinkcare.pk',
      role: 'medical_reviewer',
      resourceType: 'facility',
      resourceId: 'fac-skmch-lhr',
      timestamp: '2026-09-15T09:30:00Z',
      status: 'SUCCESS',
    },
    {
      id: 'log-3',
      action: 'ARTICLE_PUBLISHED',
      actorEmail: 'reviewer@pinkcare.pk',
      role: 'medical_reviewer',
      resourceType: 'article',
      resourceId: 'art-warning-signs',
      timestamp: '2026-09-01T14:15:00Z',
      status: 'SUCCESS',
    },
  ];
}

export const db = new PinkCareDatabase();
