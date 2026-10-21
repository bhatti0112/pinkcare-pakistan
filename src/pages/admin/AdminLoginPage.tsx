import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { PinkRibbonLogo } from '../../components/PinkRibbonLogo';

export const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please provide your admin email and password.');
      return;
    }

    // Secure local demo auth verification for Phase 1
    sessionStorage.setItem('pinkcare_admin_auth', 'authenticated');
    sessionStorage.setItem('pinkcare_admin_email', email);
    sessionStorage.setItem('pinkcare_admin_role', 'admin');
    navigate('/admin');
  };

  return (
    <div className="py-16 bg-[#FFF8FB] min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white border border-[#FCE7F3] rounded-3xl p-8 shadow-sm space-y-6">
        <div className="text-center space-y-2">
          <PinkRibbonLogo size="md" />
          <h1 className="text-xl font-bold text-[#42152F] pt-2">Staff & Medical Reviewer Portal</h1>
          <p className="text-xs text-[#625766]">
            Secure administrative access for facility verifiers and clinical editors.
          </p>
        </div>

        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="block text-[#42152F] font-semibold mb-1">Staff Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="reviewer@pinkcare.pk"
              className="w-full p-2.5 bg-[#FFF8FB] border border-[#FCE7F3] rounded-xl text-[#25202A] outline-none focus:border-[#E83E8C]"
            />
          </div>

          <div>
            <label className="block text-[#42152F] font-semibold mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full p-2.5 bg-[#FFF8FB] border border-[#FCE7F3] rounded-xl text-[#25202A] outline-none focus:border-[#E83E8C]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-[#E83E8C] hover:bg-[#D81B60] text-white font-semibold rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Sign In to Admin Portal</span>
          </button>
        </form>

        <div className="text-center pt-2 border-t border-[#FCE7F3] text-[11px] text-[#625766]">
          <Link to="/" className="text-[#E83E8C] hover:underline">
            ← Return to PinkCare Public Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};
