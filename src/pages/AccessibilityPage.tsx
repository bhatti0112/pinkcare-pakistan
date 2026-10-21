import React from 'react';
import { Eye, CheckCircle2, ShieldCheck } from 'lucide-react';

export const AccessibilityPage: React.FC = () => {
  return (
    <div className="py-10 bg-[#FFF8FB] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#E83E8C]">
            <Eye className="w-4 h-4" />
            <span>Inclusive Digital Access</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#42152F] mt-1">
            Accessibility Statement
          </h1>
          <p className="text-sm text-[#625766] mt-2 leading-relaxed">
            PinkCare is committed to ensuring digital accessibility for individuals of all abilities, adhering to WCAG 2.2 Level AA guidelines where practical.
          </p>
        </div>

        <div className="bg-white border border-[#FCE7F3] rounded-3xl p-6 sm:p-8 space-y-6 text-xs sm:text-sm text-[#625766] leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-base font-bold text-[#42152F]">Measures to Support Accessibility</h2>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>High Contrast Palette: </strong>Text and interactive buttons maintain compliant contrast ratios (&ge; 4.5:1 for body copy).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Bilingual RTL Support: </strong>Full native support for Urdu typography (Noto Nastaliq Urdu) with correct right-to-left alignment.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Reduced Motion Controls: </strong>All 3D ribbon scenes and interface animations automatically disable when your device enables prefers-reduced-motion.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Screen Reader Announcements: </strong>Dynamic search filters and medical notices use semantic HTML and ARIA labels.</span>
              </li>
            </ul>
          </section>

          <section className="space-y-2 pt-2 border-t border-[#FCE7F3]">
            <h2 className="text-base font-bold text-[#42152F]">Feedback and Assistance</h2>
            <p>
              If you experience any accessibility barrier while browsing PinkCare, please notify us at <strong className="text-[#42152F]">accessibility@pinkcare.pk</strong> so our engineering team can review and resolve the issue.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
