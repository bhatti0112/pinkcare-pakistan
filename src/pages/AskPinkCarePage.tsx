import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  Sparkles,
  Send,
  ShieldCheck,
  AlertCircle,
  BookOpen,
  Bot,
  User,
  ExternalLink,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  citations?: { title: string; link?: string; publisher?: string }[];
  isWarning?: boolean;
}

export const AskPinkCarePage: React.FC = () => {
  const { language } = useLanguage();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text:
        language === 'ur'
          ? 'خوش آمدید! میں پنک کیئر تعلیمی معاون ہوں۔ آپ مجھ سے چھاتی کی صحت، انتباہی علامات، اسکریننگ کے اصول اور پاکستان میں ہسپتالوں کے بارے میں پوچھ سکتے ہیں۔ براہ کرم یاد رکھیں کہ میں طبی تشخیص نہیں کر سکتا۔'
          : 'Welcome to Ask PinkCare. I am an evidence-grounded educational assistant. You can ask me about breast health fundamentals, warning signs, screening schedules, and finding healthcare facilities in Pakistan.\n\nPlease note: I cannot diagnose medical conditions, interpret test results, or calculate personal cancer risk. For medical concerns, always consult a certified doctor.',
    },
  ]);

  const quickPrompts = [
    'What are the most common early warning signs?',
    'At what age should women in Pakistan get a mammogram?',
    'What questions should I prepare for my breast clinic visit?',
    'Can you list major cancer hospitals in Karachi and Lahore?',
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const queryText = (textToSend || input).trim();
    if (!queryText || loading) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      sender: 'user',
      text: queryText,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/v1/ask-pinkcare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: queryText }),
      });

      if (res.ok) {
        const data = await res.json();
        setMessages((prev) => [
          ...prev,
          {
            id: Math.random().toString(),
            sender: 'assistant',
            text: data.answer,
            isWarning: data.isDiagnosticRefusal,
            citations: data.citations,
          },
        ]);
        setLoading(false);
        return;
      }
    } catch {
      // Handled via fallback below
    }

    // Client-side fallback if server endpoint is temporarily unreachable
    const q = queryText.toLowerCase();
    const isRefusal = q.includes('do i have cancer') || q.includes('diagnose') || q.includes('is this cancer');

    setMessages((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        sender: 'assistant',
        isWarning: isRefusal,
        text: isRefusal
          ? 'I cannot determine or diagnose whether you have cancer. An AI educational assistant cannot replace clinical examination or mammography by a medical doctor.\n\nPlease visit a qualified breast specialist or hospital promptly.'
          : 'Breast cancer awareness in Pakistan emphasizes early detection: when abnormalities are identified and treated early, the 5-year survival rate exceeds 90%.\n\nRecommended actions:\n• Monthly self-awareness\n• Clinical check every 1–3 years (ages 20–39)\n• Annual mammogram (ages 40+)\n• Visit our hospital directory to find verified centres in your city.',
        citations: [
          { title: 'Verified Hospital Directory', link: '/find-care' },
          { title: 'Warning Signs Guide', link: '/warning-signs' },
        ],
      },
    ]);
    setLoading(false);
  };

  return (
    <div className="py-8 bg-[#FFF8FB] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#E83E8C]">
            <Sparkles className="w-4 h-4" />
            <span>Grounded Retrieval AI Assistant · Non-Diagnostic</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#42152F] mt-1">
            Ask PinkCare Assistant
          </h1>
          <p className="text-xs sm:text-sm text-[#625766] mt-1 leading-relaxed">
            Get evidence-based answers regarding breast health, warning signs, screening milestones, and locating care in Pakistan.
          </p>
        </div>

        {/* Safety Disclaimer Banner */}
        <div className="p-4 bg-[#FFF1F7] border border-[#FCE7F3] rounded-2xl flex items-start gap-3 text-xs text-[#42152F]">
          <ShieldCheck className="w-4 h-4 text-[#E83E8C] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Safety Boundary: </strong>This assistant is designed strictly for educational awareness and healthcare navigation. It does not provide medical diagnoses, treatment plans, or individual risk probability scores.
          </p>
        </div>

        {/* Chat Window */}
        <div className="bg-white border border-[#FCE7F3] rounded-3xl shadow-xs overflow-hidden flex flex-col h-[520px]">
          {/* Messages scroll area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-[#FFF1F7] border border-[#FCE7F3] flex items-center justify-center shrink-0 text-[#E83E8C]">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed space-y-2 ${
                    msg.sender === 'user'
                      ? 'bg-[#E83E8C] text-white font-medium'
                      : msg.isWarning
                      ? 'bg-rose-50 text-rose-900 border border-rose-200'
                      : 'bg-[#FFF8FB] text-[#25202A] border border-[#FCE7F3]'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>

                  {/* Citations & Sources */}
                  {msg.citations && msg.citations.length > 0 && (
                    <div className="pt-2 border-t border-slate-200/60 mt-2 space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#625766] block">
                        Verified Sources & References:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {msg.citations.map((cite, i) => (
                          <a
                            key={i}
                            href={cite.link || '#'}
                            className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#E83E8C] hover:underline bg-white px-2 py-0.5 rounded border border-[#FCE7F3]"
                          >
                            <BookOpen className="w-3 h-3" />
                            <span>{cite.title}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {msg.sender === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-[#42152F] flex items-center justify-center shrink-0 text-white">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-xs text-[#625766]">
                <Bot className="w-4 h-4 text-[#E83E8C] animate-pulse" />
                <span>Retrieving verified educational guidance...</span>
              </div>
            )}
          </div>

          {/* Quick Prompts Strip */}
          <div className="p-3 bg-[#FFF8FB] border-t border-[#FCE7F3] flex items-center gap-2 overflow-x-auto text-[11px]">
            <span className="text-[#625766] shrink-0 font-medium">Suggestions:</span>
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(prompt)}
                className="px-2.5 py-1 bg-white hover:bg-[#FCE7F3] text-[#42152F] rounded-lg border border-[#FCE7F3] whitespace-nowrap transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-[#FCE7F3] flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask an educational question about breast health, screening, or facilities..."
              className="flex-1 px-4 py-2.5 bg-[#FFF8FB] border border-[#FCE7F3] rounded-xl text-xs sm:text-sm text-[#25202A] placeholder-[#625766]/60 outline-none focus:border-[#E83E8C]"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="px-4 py-2.5 bg-[#E83E8C] hover:bg-[#D81B60] disabled:opacity-50 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0 shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Ask</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
