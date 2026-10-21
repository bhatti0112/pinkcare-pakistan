import { db } from '../data/db';
import { GoogleGenAI } from '@google/genai';

export interface RagResponse {
  answer: string;
  isDiagnosticRefusal: boolean;
  citations: { title: string; link?: string; publisher?: string }[];
  providerUsed: 'gemini' | 'grounded_rag_fallback';
}

export async function processRagQuery(userQuery: string): Promise<RagResponse> {
  const query = userQuery.trim().toLowerCase();

  // 1. Mandatory Diagnostic Refusal Safety Filter
  const diagnosticKeywords = [
    'do i have cancer',
    'diagnose',
    'is this cancer',
    'am i sick',
    'tell me if i have',
    'stage of my cancer',
    'my biopsy says',
    'what stage am i',
    'calculate my risk',
    'my percentage risk',
  ];

  const triggersRefusal = diagnosticKeywords.some(kw => query.includes(kw));

  if (triggersRefusal) {
    return {
      answer:
        'I cannot determine or diagnose whether you have cancer. An AI educational assistant cannot replace clinical examination, ultrasound, or mammography performed by a certified healthcare professional.\n\nIf you have discovered a lump, notice persistent breast changes, or have concerning symptoms, please visit a certified physician or breast specialist promptly. Early clinical evaluation ensures accurate testing and effective treatment.',
      isDiagnosticRefusal: true,
      citations: [
        { title: 'PinkCare Verified Hospital Directory (Pakistan)', link: '/find-care' },
        { title: 'Preparing for Your Doctor Appointment Guide', link: '/appointment-guide' },
      ],
      providerUsed: 'grounded_rag_fallback',
    };
  }

  // 2. Retrieve Approved Evidence Excerpts
  const matchingArticles = db.articles.filter(a => {
    const text = (a.title + ' ' + a.summary + ' ' + a.sections.map(s => s.heading + ' ' + s.content).join(' ')).toLowerCase();
    return query.split(' ').some(word => word.length > 3 && text.includes(word));
  });

  const matchingFacilities = db.facilities.filter(f => {
    return query.includes(f.city.toLowerCase()) || query.includes('hospital') || query.includes('centre') || query.includes('clinic');
  });

  const citations: { title: string; link?: string; publisher?: string }[] = [];

  matchingArticles.slice(0, 3).forEach(a => {
    citations.push({ title: a.title, link: `/learn/${a.slug}` });
    a.sources.forEach(s => {
      if (!citations.some(c => c.title === s.name)) {
        citations.push({ title: s.name, publisher: s.publisher });
      }
    });
  });

  if (matchingFacilities.length > 0) {
    citations.push({ title: 'Verified Healthcare Facility Directory', link: '/find-care' });
  }

  // Ensure baseline citation
  if (citations.length === 0) {
    citations.push({ title: 'WHO Global Breast Cancer Initiative', publisher: 'WHO' });
    citations.push({ title: 'PinkCare Breast Health Guide', link: '/breast-health' });
  }

  // 3. Try Gemini Provider if API Key is configured in environment
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey && apiKey !== 'MY_GEMINI_API_KEY' && apiKey.length > 10) {
    try {
      const ai = new GoogleGenAI();
      const contextText = matchingArticles
        .map(a => `Source Title: ${a.title}\nContent: ${a.sections.map(s => s.content).join('\n')}`)
        .join('\n\n');

      const systemPrompt = `You are "Ask PinkCare", an evidence-based educational breast cancer awareness assistant for Pakistan.
CRITICAL SAFETY BOUNDARIES:
- You must NEVER diagnose, evaluate individual scans, or calculate personalized cancer probability.
- Always recommend timely clinical assessment by a doctor for new or persistent symptoms.
- Answers must be compassionate, grounded in evidence, accessible, and scientifically responsible.
- Use the following approved clinical context:
${contextText || 'Evidence from WHO, Shaukat Khanum, and NCCN clinical oncology guidelines.'}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: [
          { role: 'user', parts: [{ text: `${systemPrompt}\n\nVisitor Question: ${userQuery}` }] },
        ],
      });

      if (response.text) {
        return {
          answer: response.text,
          isDiagnosticRefusal: false,
          citations,
          providerUsed: 'gemini',
        };
      }
    } catch (err) {
      // Fallback seamlessly to local RAG adapter if API call fails
      console.warn('Gemini API call failed, using local grounded RAG adapter:', err);
    }
  }

  // 4. Grounded Local RAG Adapter (Deterministic & Safe fallback)
  if (query.includes('hospital') || query.includes('clinic') || query.includes('lahore') || query.includes('karachi') || query.includes('islamabad')) {
    return {
      answer:
        'Major verified breast cancer care centres in Pakistan include:\n\n• Shaukat Khanum Memorial Cancer Hospital (Lahore & Peshawar) — Complete cancer care with Zakat financial assistance.\n• Aga Khan University Hospital (AKUH, Karachi) — Dedicated Breast Care Clinic and 3D digital mammography.\n• Pakistan Institute of Medical Sciences / PIMS (Islamabad) — Federal One-Stop Breast Clinic.\n• JPMC Cancer Pavilion (Karachi) — Comprehensive public tertiary oncology services.\n• PAEC Cancer Centres: NORI (Islamabad), INMOL (Lahore), KIRAN (Karachi), CENAR (Quetta).\n\nYou can view contact numbers, verified services, and map directions on the PinkCare Hospital Directory.',
      isDiagnosticRefusal: false,
      citations: [
        { title: 'PinkCare Hospital Directory', link: '/find-care' },
      ],
      providerUsed: 'grounded_rag_fallback',
    };
  }

  if (query.includes('mammogram') || query.includes('screen') || query.includes('age')) {
    return {
      answer:
        'Clinical screening recommendations for Pakistan:\n\n• Ages 20–39: Monthly breast self-awareness and a Clinical Breast Examination (CBE) every 1–3 years by a trained physician.\n• Ages 40 and older: Annual or biennial screening mammogram.\n• High-Risk individuals: Those with a strong family history (first-degree relatives diagnosed under age 50) or BRCA1/2 genetic alterations should consult a specialist to begin screening earlier, typically around age 30.\n\nMammography can identify abnormal cellular changes up to two years before any lump can be felt by hand.',
      isDiagnosticRefusal: false,
      citations: [
        { title: 'Screening and Mammography Guidelines', link: '/screening' },
        { title: 'American College of Radiology (ACR) Criteria', publisher: 'ACR' },
      ],
      providerUsed: 'grounded_rag_fallback',
    };
  }

  if (query.includes('sign') || query.includes('symptom') || query.includes('lump')) {
    return {
      answer:
        'Primary warning signs to monitor:\n\n1. A new, firm lump or thickening in the breast or armpit (most common presentation).\n2. Changes in breast shape, outline, or size.\n3. Skin dimpling, puckering, or an orange-peel texture.\n4. Nipple changes, including new inversion or spontaneous discharge (especially clear or blood-stained).\n5. Persistent redness or scaling that does not resolve.\n\nNote: Up to 80% of breast lumps examined by physicians turn out to be benign (non-cancerous) cysts or fibroadenomas. However, any persistent symptom requires clinical evaluation.',
      isDiagnosticRefusal: false,
      citations: [
        { title: 'Recognizing Early Warning Signs', link: '/warning-signs' },
        { title: 'WHO Global Breast Cancer Initiative', publisher: 'WHO' },
      ],
      providerUsed: 'grounded_rag_fallback',
    };
  }

  return {
    answer:
      'PinkCare promotes evidence-based awareness and early evaluation across Pakistan. When breast changes are identified and treated in early stages (Stage 1), long-term survival exceeds 90%.\n\nFor personalized questions, would you like to explore:\n• Recommended screening ages and mammograms\n• Warning signs checklist\n• Locating verified cancer hospitals in your province\n• Questions to ask your doctor during a clinic consultation?',
    isDiagnosticRefusal: false,
    citations,
    providerUsed: 'grounded_rag_fallback',
  };
}
