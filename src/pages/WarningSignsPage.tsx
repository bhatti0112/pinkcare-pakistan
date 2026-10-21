import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import {
  Activity,
  AlertCircle,
  ShieldCheck,
  ChevronRight,
  MapPin,
  Calendar,
  CheckCircle2,
} from 'lucide-react';

export const WarningSignsPage: React.FC = () => {
  const { t, language } = useLanguage();

  const warningSigns = [
    {
      title: 'Lump or Thickening',
      urduTitle: 'گلٹی یا سخت ابھار',
      description: 'A new, firm lump in the breast tissue or under the armpit. Most breast lumps are not cancerous (often benign cysts or fibroadenomas), but every new lump must be evaluated by a doctor.',
      urduDesc: 'چھاتی یا بغل میں نئی، سخت گلٹی۔ زیادہ تر گلٹیاں کینسر نہیں ہوتیں، لیکن ڈاکٹر سے چیک کروانا لازمی ہے۔',
      action: 'Schedule clinical breast examination immediately.',
    },
    {
      title: 'Skin Dimpling or Puckering',
      urduTitle: 'جلد میں گڑھے یا جھریاں',
      description: 'The skin resembling an orange peel (peau d\'orange), puckering, or dimpling when you raise your arms.',
      urduDesc: 'چھاتی کی جلد پر مالٹے کے چھلکے جیسی بناوٹ یا جلد کا اندر کی طرف دھنس جانا۔',
      action: 'Requires clinical inspection and imaging.',
    },
    {
      title: 'Nipple Inversion or Retraction',
      urduTitle: 'نپل کا اندر مڑ جانا',
      description: 'A nipple that begins turning inward or changes direction, or spontaneous discharge that is clear or tinged with blood.',
      urduDesc: 'نپل کی سمت میں اچانک تبدیلی یا خود بخود خون یا پانی جیسی رطوبت کا اخراج۔',
      action: 'Mention nipple changes explicitly during consultation.',
    },
    {
      title: 'Redness, Rash or Flaking',
      urduTitle: 'سرخی، خارش یا چھلکے اترنا',
      description: 'Persistent redness, inflammation, eczema-like scaling on the areola or surrounding breast skin that does not heal.',
      urduDesc: 'چھاتی کی جلد پر مستقل سرخی یا خارش جو عام مرہم سے ٹھیک نہ ہو۔',
      action: 'Rule out inflammatory conditions or skin involvement.',
    },
    {
      title: 'Unexplained Size or Shape Change',
      urduTitle: 'سائز یا بناوٹ میں واضح تبدیلی',
      description: 'Sudden swelling or noticeable asymmetry between breasts unrelated to normal menstrual cycles.',
      urduDesc: 'ماہواری کے علاوہ چھاتی کے سائز یا شکل میں واضح غیر متوقع تبدیلی۔',
      action: 'Monitor cycle timing and seek clinical review.',
    },
    {
      title: 'Persistent Pain in One Spot',
      urduTitle: 'ایک ہی جگہ پر مسلسل درد',
      description: 'While cyclical tenderness in both breasts is common and usually benign, persistent localized pain in one specific spot warrants investigation.',
      urduDesc: 'ایک ہی مخصوص مقام پر بغیر کسی وجہ کے مسلسل درد کا رہنا۔',
      action: 'Differentiate hormonal tenderness from localized pain.',
    },
  ];

  return (
    <div className="py-10 bg-[#FFF8FB] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#E83E8C]">
            <Activity className="w-4 h-4" />
            <span>Educational Awareness · Non-Diagnostic</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#42152F]">
            {language === 'ur' ? 'چھاتی کے کینسر کی ابتدائی انتباہی علامات' : 'Recognizing Breast Cancer Warning Signs'}
          </h1>
          <p className="text-sm text-[#625766] max-w-3xl leading-relaxed">
            Understanding your baseline breast anatomy helps you notice changes early. Finding a symptom does <em>not</em> mean you have cancer, but timely evaluation by a qualified doctor is essential.
          </p>
        </div>

        {/* Safety Callout */}
        <div className="p-5 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-900 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h2 className="font-bold text-amber-950 text-xs">Remember: Most breast changes are benign</h2>
            <p className="leading-relaxed">
              Up to 80% of breast lumps examined by physicians turn out to be harmless cysts, hormonal fibroadenomas, or benign infections. However, you cannot determine whether a lump is benign without clinical imaging (ultrasound/mammogram) and medical review.
            </p>
          </div>
        </div>

        {/* Warning Signs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {warningSigns.map((sign, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#FCE7F3] rounded-2xl p-6 flex flex-col justify-between hover:shadow-xs transition-shadow"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold text-[#E83E8C]">
                    Sign 0{idx + 1}
                  </span>
                  <span className="text-[11px] text-[#625766] font-urdu">{sign.urduTitle}</span>
                </div>
                <h3 className="text-base font-bold text-[#42152F]">{sign.title}</h3>
                <p className="text-xs text-[#625766] leading-relaxed">
                  {language === 'ur' ? sign.urduDesc : sign.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#FCE7F3] text-[11px] text-[#42152F] font-medium flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#E83E8C]" />
                <span>Recommended Action: {sign.action}</span>
              </div>
            </div>
          ))}
        </div>

        {/* What to do next */}
        <div className="bg-[#42152F] text-white rounded-3xl p-8 space-y-4 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-bold">What to Do If You Notice a Change</h2>
          <p className="text-xs sm:text-sm text-[#FCE7F3] leading-relaxed max-w-2xl">
            Do not wait or hesitate due to fear or embarrassment. Early detection significantly increases treatment success rates to over 90%. Reach out to a verified healthcare centre or breast clinic today.
          </p>
          <div className="pt-2 flex flex-wrap gap-4">
            <Link
              to="/find-care"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#E83E8C] hover:bg-[#D81B60] text-white text-xs font-semibold rounded-xl transition-colors"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Find Healthcare Facilities in Pakistan</span>
            </Link>
            <Link
              to="/appointment-guide"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl border border-white/20 transition-colors"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>How to Prepare for Doctor Visit</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
