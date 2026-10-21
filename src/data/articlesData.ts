export interface Article {
  id: string;
  slug: string;
  title: string;
  urduTitle: string;
  summary: string;
  urduSummary: string;
  category: 'breast_health' | 'warning_signs' | 'screening' | 'risk_factors' | 'patient_guide';
  readTimeMinutes: number;
  author: string;
  reviewer: string;
  lastReviewedAt: string;
  sources: { name: string; url?: string; publisher: string }[];
  sections: {
    heading: string;
    urduHeading: string;
    content: string;
    urduContent: string;
  }[];
}

export const ARTICLES_DATA: Article[] = [
  {
    id: 'art-warning-signs',
    slug: 'breast-cancer-warning-signs',
    title: 'Recognizing Early Warning Signs of Breast Cancer',
    urduTitle: 'چھاتی کے کینسر کی ابتدائی انتباہی علامات کی پہچان',
    summary: 'A clear, non-alarmist guide to noticeable changes in the breast and when to consult a certified doctor.',
    urduSummary: 'چھاتی میں نمایاں تبدیلیوں اور ڈاکٹر سے فوری رجوع کرنے کے بارے میں ایک مستند طبی گائیڈ۔',
    category: 'warning_signs',
    readTimeMinutes: 5,
    author: 'PinkCare Clinical Education Team',
    reviewer: 'Reviewed by Consultant Oncologist',
    lastReviewedAt: '2026-09-01',
    sources: [
      { name: 'World Health Organization (WHO) Global Breast Cancer Initiative', url: 'https://who.int', publisher: 'WHO' },
      { name: 'Shaukat Khanum Memorial Cancer Hospital Clinical Guidelines', url: 'https://shaukatkhanum.org.pk', publisher: 'SKMCH&RC' },
    ],
    sections: [
      {
        heading: 'What Changes to Watch For',
        urduHeading: 'کن تبدیلیوں پر نظر رکھنی چاہیے؟',
        content: 'While many breast changes are benign (non-cancerous), it is essential to have any new or unusual symptom examined by a physician. Common signs include:\n\n1. A new, painless lump or firm thickening in the breast or underarm area (most frequent sign).\n2. Changes in breast shape, contour, or unexplained size asymmetry.\n3. Skin changes such as dimpling, puckering, or an "orange peel" (peau d\'orange) texture.\n4. Nipple inversion, newly retracted nipple, or spontaneous discharge (especially clear or blood-stained).\n5. Persistent redness, scaling, or rash on the nipple or breast skin.',
        urduContent: 'اگرچہ چھاتی کی زیادہ تر تبدیلیاں بے ضرر (نان کینسر) ہوتی ہیں، لیکن کسی بھی نئی تبدیلی پر ڈاکٹر سے معائنہ کروانا ضروری ہے۔ اہم علامات میں شامل ہیں:\n\n1۔ چھاتی یا بغل کے حصے میں کوئی نیا، بے درد سخت گلٹی یا ابھار۔\n2۔ چھاتی کی بناوٹ، شکل یا سائز میں غیر معمولی تبدیلی۔\n3۔ جلد کا اندر دھنس جانا، جھریاں یا مالٹے کے چھلکے جیسی کھردری بناوٹ۔\n4۔ نپل کا اندر مڑ جانا یا خودبخود رطوبت/خون آنا۔\n5۔ جلد پر مستقل سرخی یا خارش۔',
      },
      {
        heading: 'When to See a Doctor',
        urduHeading: 'ڈاکٹر سے کب رجوع کریں؟',
        content: 'If you notice a lump that does not go away after your next menstrual cycle, or if you are past menopause and discover a new breast change, make an appointment with a breast surgeon or general surgeon promptly. Early detection dramatically improves treatment success rates exceeding 90%.',
        urduContent: 'اگر کوئی گلٹی ماہواری کے اختتام کے بعد بھی ختم نہ ہو، یا مینوپاز کے بعد کوئی نئی تبدیلی محسوس ہو تو فوری طور پر ماہر سرجن سے معائنہ کروائیں۔ ابتدائی مرحلے میں تشخیص سے صحت یابی کے امکانات 90 فیصد سے زیادہ ہوتے ہیں۔',
      },
    ],
  },
  {
    id: 'art-screening-guidelines',
    slug: 'screening-mammography-guide',
    title: 'Screening and Mammography: Guidelines for Women in Pakistan',
    urduTitle: 'میموگرافی اور اسکریننگ: پاکستانی خواتین کے لیے رہنما اصول',
    summary: 'Evidence-based screening schedules, clinical breast exams, and what to expect during a mammogram.',
    urduSummary: 'میموگرافی کب اور کیوں ضروری ہے؟ اسکریننگ کے طریقہ کار اور احتیاطی تدابیر کی تفصیل۔',
    category: 'screening',
    readTimeMinutes: 6,
    author: 'PinkCare Preventive Health Group',
    reviewer: 'Reviewed by Radiologist & Oncology Panel',
    lastReviewedAt: '2026-08-15',
    sources: [
      { name: 'Pakistan Society of Breast Surgeons Guidelines', publisher: 'PSBS' },
      { name: 'American College of Radiology (ACR) Screening Appropriateness Criteria', publisher: 'ACR' },
    ],
    sections: [
      {
        heading: 'Why Regular Screening Matters',
        urduHeading: 'باقاعدہ اسکریننگ کیوں اہم ہے؟',
        content: 'A screening mammogram can detect abnormal tissue growths or microcalcifications up to two years before a lump can be felt by hand. Because Pakistan has the highest incidence of breast cancer in Asia, scheduled screening is vital.',
        urduContent: 'میموگرافی کے ذریعے چھاتی میں تبدیلی یا گلٹی کا ہاتھ سے محسوس ہونے سے تقریباً دو سال پہلے ہی پتہ لگایا جا سکتا ہے۔ چونکہ پاکستان میں ایشیا میں سب سے زیادہ شرح ہے، اس لیے بروقت اسکریننگ زندگی بچاتی ہے۔',
      },
      {
        heading: 'Recommended Screening Ages',
        urduHeading: 'اسکریننگ کی سفارش کردہ عمر',
        content: '• Ages 20–39: Monthly self-awareness and clinical breast examination (CBE) every 1–3 years by a trained female doctor.\n• Ages 40 and older: Annual or biennial screening mammogram.\n• High Risk (family history of early breast cancer or BRCA mutation): Discuss personalized screening starting earlier (often by age 30 or 10 years before the youngest affected family member).',
        urduContent: '• 20 سے 39 سال: ماہانہ خود آگاہی اور ہر ایک سے تین سال بعد ڈاکٹر سے معائنہ۔\n• 40 سال اور اس سے زائد: ہر ایک سے دو سال بعد باقاعدہ میموگرافی۔\n• زیادہ خطرے کے حامل افراد (خاندانی تاریخ): 30 سال کی عمر سے اسکریننگ پلان تیار کریں۔',
      },
    ],
  },
  {
    id: 'art-risk-factors',
    slug: 'understanding-risk-factors-and-myths',
    title: 'Understanding Risk Factors vs Debunking Common Myths',
    urduTitle: 'خطرے کے حقیقی اسباب اور عام غلط فہمیاں',
    summary: 'Differentiating established clinical risk factors from persistent cultural misconceptions in Pakistan.',
    urduSummary: 'حقیقی خطرات اور معاشرتی غلط فہمیوں کے درمیان سائنسی فرق کی وضاحت۔',
    category: 'risk_factors',
    readTimeMinutes: 5,
    author: 'PinkCare Research & Editorial Desk',
    reviewer: 'Reviewed by Community Health Specialist',
    lastReviewedAt: '2026-09-12',
    sources: [
      { name: 'National Comprehensive Cancer Network (NCCN) Guidelines', publisher: 'NCCN' },
      { name: 'Aga Khan University Hospital Patient Education Series', publisher: 'AKUH' },
    ],
    sections: [
      {
        heading: 'Established Risk Factors',
        urduHeading: 'طبی طور پر ثابت شدہ اسباب',
        content: '• Age: Risk naturally increases as women age, particularly over 40.\n• Family History: Having a first-degree relative (mother, sister, daughter) diagnosed increases personal risk.\n• Genetic Mutations: Inherited alterations in BRCA1 or BRCA2 genes.\n• Reproductive History: Early menstruation (before 12) or late menopause (after 55).\n• Lifestyle: Sedentary lifestyle, post-menopausal obesity, and lack of physical exercise.',
        urduContent: '• عمر: 40 سال کی عمر کے بعد امکانات میں قدرتی اضافہ۔\n• خاندانی تاریخ: والدہ، بہن یا بیٹی میں کینسر کی موجودگی۔\n• جینیاتی تغیرات: بی آر سی اے 1 یا 2 جینز۔\n• طرز زندگی: ورزش کی کمی، موٹاپا اور غیر متوازن خوراک۔',
      },
      {
        heading: 'Debunking Harmful Myths',
        urduHeading: 'عام غلط فہمیاں جن کی کوئی سائنسی بنیاد نہیں',
        content: '• Myth: Underwire bras or deodorants cause breast cancer. (Fact: Thorough scientific studies show no causal link).\n• Myth: Breast cancer is contagious. (Fact: Cancer cannot be transmitted from person to person).\n• Myth: A breast biopsy spreads cancer cells. (Fact: Biopsies are safe, essential diagnostic standards that accurately guide therapy).\n• Myth: Every breast lump is cancerous. (Fact: Over 80% of breast lumps examined turn out to be benign cysts or fibroadenomas).',
        urduContent: '• غلط فہمی: مخصوص انڈرویئر یا پرفیوم کینسر کا سبب بنتے ہیں۔ (حقیقت: سائنسی طور پر کوئی ثبوت نہیں)۔\n• غلط فہمی: کینسر ایک سے دوسرے کو لگ سکتا ہے۔ (حقیقت: یہ چھوت کا مرض بالکل نہیں ہے)۔\n• غلط فہمی: بایوپسی سے کینسر پھیلتا ہے۔ (حقیقت: بایوپسی تشخیص کے لیے مکمل محفوظ اور لازمی عمل ہے)۔\n• غلط فہمی: ہر گلٹی کینسر ہوتی ہے۔ (حقیقت: 80 فیصد سے زائد گلٹیاں بے ضرر سسٹ یا فائبروما ہوتی ہیں)۔',
      },
    ],
  },
  {
    id: 'art-doctor-visit',
    slug: 'preparing-for-doctor-appointment',
    title: 'How to Prepare for Your Breast Clinic Appointment',
    urduTitle: 'ڈاکٹر کے پاس جانے سے پہلے تیاری کا طریقہ',
    summary: 'Practical questions to ask, what documents to bring, and what to expect during clinical examination.',
    urduSummary: 'ڈاکٹر سے کن سوالات کے بارے میں بات کرنی چاہیے اور کون سے ٹیسٹ ضروری ہو سکتے ہیں؟',
    category: 'patient_guide',
    readTimeMinutes: 4,
    author: 'PinkCare Patient Advocacy Unit',
    reviewer: 'Reviewed by Breast Care Nurse Specialist',
    lastReviewedAt: '2026-08-25',
    sources: [
      { name: 'European Society for Medical Oncology (ESMO) Patient Guides', publisher: 'ESMO' },
    ],
    sections: [
      {
        heading: 'Key Questions to Ask Your Doctor',
        urduHeading: 'اپنے معالج سے پوچھنے والے اہم سوالات',
        content: '1. What type of tests do you recommend (Ultrasound, Mammogram, Biopsy)?\n2. If there is a lump, what are the chances it is benign?\n3. When can I expect test results and who will explain them to me?\n4. Are there any restrictions before my imaging scan?\n5. Can I bring a trusted family member or companion into the consultation?',
        urduContent: '1۔ آپ کون سے ٹیسٹ تجویز کرتے ہیں (الٹراساؤنڈ، میموگرافی، یا بایوپسی)؟\n2۔ کیا یہ گلٹی بے ضرر ہو سکتی ہے؟\n3۔ ٹیسٹ کے نتائج کتنے دنوں میں آئیں گے؟\n4۔ کیا اس ٹیسٹ سے پہلے کوئی خاص احتیاط ضروری ہے؟\n5۔ کیا میں اپنے ساتھ کسی قریبی فرد کو لا سکتی ہوں؟',
      },
    ],
  },
];
