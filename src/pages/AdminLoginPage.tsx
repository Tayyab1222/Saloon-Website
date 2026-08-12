import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Lock, User, ArrowRight, ShieldAlert, CheckCircle2, Sparkles } from 'lucide-react';
import { BrandLogo } from '../components/common/BrandLogo';

interface AdminLoginPageProps {
  onLoginSuccess: () => void;
  onNavigate?: (path: string) => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({
  onLoginSuccess,
  onNavigate,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Check if already authenticated
    const token = localStorage.getItem('shiny_admin_token');
    const headers: Record<string, string> = token ? { Authorization: `Bearer ${token}` } : {};

    fetch('/api/admin/check-auth', { headers })
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) {
          onLoginSuccess();
        }
      })
      .catch((err) => console.error('Auth check error:', err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!username.trim() || !password.trim()) {
      setErrorMsg('Please enter both username and password.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.trim(), password }),
      });

      const data = await response.json();

      if (data.success) {
        if (data.token) {
          localStorage.setItem('shiny_admin_token', data.token);
        }
        onLoginSuccess();
      } else {
        setErrorMsg(data.error || 'Invalid username or password.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setErrorMsg('Server error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-[#F5F1E8] flex items-center justify-center px-6 py-20 relative font-sans selection:bg-[#D4AF37] selection:text-[#080808]">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#111111]/80 via-[#080808] to-[#080808] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-[#111111] border border-[#D4AF37]/30 shadow-2xl p-8 sm:p-12 relative z-10 space-y-8"
      >
        {/* Header */}
        <div className="text-center space-y-3 flex flex-col items-center">
          <BrandLogo size="md" className="justify-center mb-2" />

          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#080808] border border-[#D4AF37]/30 text-[10px] uppercase tracking-[0.3em] font-mono text-[#D4AF37]">
            <Sparkles className="w-3 h-3 text-[#D4AF37]" />
            <span>PROTECTED AREA</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl text-[#F5F1E8] tracking-wider uppercase font-light">
            GALLERY <span className="italic text-[#D4AF37]">ADMIN</span>
          </h1>

          <p className="text-xs uppercase tracking-[0.2em] text-[#A9A39A] font-mono">
            SHINY'S HAIR & BEAUTY SALON
          </p>
        </div>

        {/* Error Banner */}
        {errorMsg && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 p-4 bg-red-950/40 border border-red-500/40 text-red-200 text-xs font-mono"
          >
            <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMsg}</span>
          </motion.div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username Field */}
          <div className="space-y-2">
            <label className="block text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-mono">
              USERNAME
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#A9A39A]">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
                className="w-full bg-[#080808] border border-[#D4AF37]/30 focus:border-[#D4AF37] text-xs text-[#F5F1E8] placeholder-[#A9A39A]/50 pl-10 pr-4 py-3.5 outline-none transition-colors"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label className="block text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-mono">
              PASSWORD
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#A9A39A]">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                className="w-full bg-[#080808] border border-[#D4AF37]/30 focus:border-[#D4AF37] text-xs text-[#F5F1E8] placeholder-[#A9A39A]/50 pl-10 pr-4 py-3.5 outline-none transition-colors"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full group inline-flex items-center justify-center px-8 py-4 text-xs uppercase tracking-[0.25em] font-semibold text-[#080808] bg-[#D4AF37] hover:bg-[#F5C542] transition-colors disabled:opacity-50"
          >
            <span>{isSubmitting ? 'AUTHENTICATING...' : 'LOGIN TO DASHBOARD'}</span>
            <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </form>

        {/* Return to Public Website */}
        <div className="pt-4 text-center border-t border-[#D4AF37]/10">
          <button
            onClick={() => onNavigate && onNavigate('/')}
            className="text-[10px] uppercase tracking-[0.25em] text-[#A9A39A] hover:text-[#D4AF37] transition-colors font-mono"
          >
            ← RETURN TO WEBSITE
          </button>
        </div>
      </motion.div>
    </div>
  );
};
