import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Education Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-10 bg-[#FFF8FB] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#E83E8C]">
            <Mail className="w-4 h-4" />
            <span>Communication & Hospital Partner Desk</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#42152F] mt-1">
            Contact PinkCare
          </h1>
          <p className="text-sm text-[#625766] mt-2 leading-relaxed">
            Reach out for institutional partnerships, hospital directory updates, educational outreach, or general inquiries.
          </p>
        </div>

        {/* Emergency Reminder */}
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-start gap-3 text-xs text-rose-800">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <p>
            <strong>Note for urgent medical concerns: </strong>PinkCare is an informational platform and does not offer clinical consultations. If you need immediate medical assistance, contact Rescue 1122 or visit your nearest hospital emergency department.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Contact Details */}
          <div className="md:col-span-5 space-y-6">
            <div className="bg-white border border-[#FCE7F3] rounded-3xl p-6 space-y-4">
              <h2 className="text-base font-bold text-[#42152F]">Direct Desks</h2>

              <div className="space-y-3 text-xs text-[#625766]">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#E83E8C] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#42152F] block">General & Partnerships:</strong>
                    <span>contact@pinkcare.pk</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#E83E8C] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#42152F] block">Facility Verifications:</strong>
                    <span>directory@pinkcare.pk</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#E83E8C] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#42152F] block">Coverage Area:</strong>
                    <span>Nationwide — Punjab, Sindh, KPK, Balochistan, ICT, AJK & Gilgit-Baltistan</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-7 bg-white border border-[#FCE7F3] rounded-3xl p-6 sm:p-8">
            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-base font-bold text-[#42152F]">Message Received</h3>
                <p className="text-xs text-[#625766] max-w-sm mx-auto">
                  Thank you for reaching out. Our team will review your message and reply via email within 1–2 business days.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setMessage('');
                  }}
                  className="mt-4 px-4 py-2 text-xs font-semibold text-[#E83E8C] bg-[#FFF1F7] rounded-lg"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[#42152F] font-semibold mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Dr. Ayesha Khan"
                    className="w-full p-2.5 bg-[#FFF8FB] border border-[#FCE7F3] rounded-xl text-[#25202A] outline-none focus:border-[#E83E8C]"
                  />
                </div>

                <div>
                  <label className="block text-[#42152F] font-semibold mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ayesha@example.com"
                    className="w-full p-2.5 bg-[#FFF8FB] border border-[#FCE7F3] rounded-xl text-[#25202A] outline-none focus:border-[#E83E8C]"
                  />
                </div>

                <div>
                  <label className="block text-[#42152F] font-semibold mb-1">Inquiry Purpose</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full p-2.5 bg-[#FFF8FB] border border-[#FCE7F3] rounded-xl text-[#25202A] outline-none focus:border-[#E83E8C]"
                  >
                    <option>General Education Inquiry</option>
                    <option>Hospital Directory Update / Verification</option>
                    <option>NGO / University Partnership</option>
                    <option>Media & Press Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#42152F] font-semibold mb-1">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we assist you or collaborate?"
                    className="w-full p-2.5 bg-[#FFF8FB] border border-[#FCE7F3] rounded-xl text-[#25202A] outline-none focus:border-[#E83E8C]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#E83E8C] hover:bg-[#D81B60] text-white font-semibold rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
