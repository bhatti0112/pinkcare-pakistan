import React from 'react';
import { ShieldCheck, Lock, EyeOff, UserCheck } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="py-10 bg-[#FFF8FB] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#E83E8C]">
            <Lock className="w-4 h-4" />
            <span>Transparency & Data Governance</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#42152F] mt-1">
            PinkCare Privacy Policy
          </h1>
          <p className="text-sm text-[#625766] mt-2 leading-relaxed">
            PinkCare is dedicated to safeguarding visitor privacy and handling healthcare information with ethical responsibility.
          </p>
        </div>

        <div className="bg-white border border-[#FCE7F3] rounded-3xl p-6 sm:p-8 space-y-6 text-xs sm:text-sm text-[#625766] leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#42152F]">1. Core Privacy Principles</h2>
            <p>
              PinkCare collects only minimal data necessary to provide hospital navigation and educational services. We <strong>never</strong> sell, monetize, or transmit visitor data to third-party data brokers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#42152F]">2. Geolocation Handling</h2>
            <p>
              When you select &quot;Use My Location&quot; on the hospital finder, your browser requests permission to access your coordinates. Your latitude and longitude are processed in memory strictly to calculate distances to nearby facilities. We do not store or track your location history.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#42152F]">3. Ask PinkCare AI Interaction Data</h2>
            <p>
              Queries entered into Ask PinkCare are processed temporarily in session memory to generate educational responses. We do not store conversational logs tied to user identities or build personal medical profiles.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#42152F]">4. Medical Non-Disclosure</h2>
            <p>
              Visitors are never asked to submit national identity numbers (CNIC), health insurance policy IDs, or personal medical diagnosis records.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#42152F]">5. Contact & Inquiries</h2>
            <p>
              For privacy-related questions, corrections, or inquiries, reach out through our verified contact desk at <strong className="text-[#42152F]">privacy@pinkcare.pk</strong>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
