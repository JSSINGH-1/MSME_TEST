import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Eye, EyeOff, LogIn, BarChart3 } from 'lucide-react';
import emblemImg from '@/assets/emblem.png';
import ministryText from '@/assets/ministry-text.png';

const VALID_CREDS = { username: 'analyst', password: 'analyst123' };
const AUTH_KEY = 'msme_intel_auth';

export function isNewDashAuthenticated() {
  return sessionStorage.getItem(AUTH_KEY) === 'true';
}

export function logoutNewDash() {
  sessionStorage.removeItem(AUTH_KEY);
}

export default function NewDashLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(isNewDashAuthenticated());

  if (authenticated) return <Navigate to="/new-dashboard" replace />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    setTimeout(() => {
      if (username === VALID_CREDS.username && password === VALID_CREDS.password) {
        sessionStorage.setItem(AUTH_KEY, 'true');
        setAuthenticated(true);
      } else {
        setError('Invalid username or password');
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* ── Top bar — matches dashboard exactly ────────── */}
      <div className="w-full bg-[#0d1f4c] border-b border-white/10 flex-shrink-0">
        <div className="flex items-center justify-center gap-4 py-4 px-4">
          <img
            src={emblemImg}
            alt="Government of India"
            className="h-14 sm:h-16 lg:h-20 w-auto object-contain"
            style={{ mixBlendMode: 'screen' }}
          />
          <img
            src={ministryText}
            alt="Ministry of Micro, Small & Medium Enterprises"
            className="h-14 sm:h-16 lg:h-20 w-auto object-contain"
            style={{ mixBlendMode: 'screen' }}
          />
        </div>
      </div>

      {/* ── Body — clean white ─────────────────────────── */}
      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 p-8 sm:p-10">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#0d1f4c]/5 border border-[#0d1f4c]/10 mb-4">
                <BarChart3 size={26} className="text-[#0d1f4c]" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-[#0d1f4c] tracking-wide">
                Intelligence &amp; Planning
              </h1>
              <p className="text-slate-500 text-sm mt-1.5">
                Sign in to access the analytics dashboard
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="intel-username" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Username
                </label>
                <input
                  id="intel-username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  autoComplete="username"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400
                             focus:outline-none focus:ring-2 focus:ring-[#0d1f4c]/20 focus:border-[#0d1f4c]/40 transition-all text-sm"
                  required
                />
              </div>

              <div>
                <label htmlFor="intel-password" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="intel-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className="w-full px-4 py-3 pr-11 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400
                               focus:outline-none focus:ring-2 focus:ring-[#0d1f4c]/20 focus:border-[#0d1f4c]/40 transition-all text-sm"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 px-4 py-2.5 bg-red-50 border border-red-200 rounded-xl">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                  <span className="text-red-600 text-xs font-medium">{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-[#0d1f4c] hover:bg-[#162d6b] text-white font-semibold rounded-xl
                           shadow-lg shadow-[#0d1f4c]/20 hover:shadow-[#0d1f4c]/30
                           transition-all duration-200 text-sm flex items-center justify-center gap-2
                           disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <LogIn size={16} />
                    Sign In
                  </>
                )}
              </button>
            </form>

            {/* Hint */}
            <div className="mt-6 pt-5 border-t border-slate-100">
              <p className="text-[11px] text-slate-400 text-center">
                Demo credentials: <span className="text-slate-600 font-mono">analyst</span> / <span className="text-slate-600 font-mono">analyst123</span>
              </p>
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-[10px] text-slate-400 mt-6">
            © 2026 Ministry of Micro, Small &amp; Medium Enterprises, Government of India
          </p>
        </div>
      </div>
    </div>
  );
}
