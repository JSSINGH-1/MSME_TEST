import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, LogIn, Shield, CalendarDays, ArrowLeft, BriefcaseBusiness, ChevronRight } from 'lucide-react';
import emblemImg from '@/assets/emblem.png';
import ministryText from '@/assets/ministry-text.png';

const VALID_CREDS = { username: 'admin', password: 'admin123' };
const AUTH_KEY = 'msme_dfo_auth';

export function isAuthenticated() {
  return sessionStorage.getItem(AUTH_KEY) === 'true';
}

export function logout() {
  sessionStorage.removeItem(AUTH_KEY);
}

export default function LoginPage() {
  const navigate = useNavigate();
  const [view, setView] = useState('selection'); // 'selection', 'dashboard_login', 'appointment_login'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Mock API call
    setTimeout(() => {
      if (view === 'appointment_login' && username === 'user' && password === 'user123') {
        navigate('/book-appointment');
      } else if (view === 'dashboard_login' && username === 'admin' && password === 'admin123') {
        sessionStorage.setItem(AUTH_KEY, 'true');
        navigate('/dfo-performance');
      } else {
        setError('Invalid username or password');
        setIsLoading(false);
      }
    }, 1000);
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

          {view === 'selection' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 p-8 sm:p-10">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 mb-4">
                  <Shield size={26} className="text-blue-600" />
                </div>
                <h1 className="text-xl sm:text-2xl font-bold text-[#0d1f4c] tracking-wide">
                  Welcome to DRISHTI Portal
                </h1>
                <p className="text-slate-500 text-sm mt-1.5">
                  DFO Review & Insights for tracking and impact
                </p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => navigate('/book-appointment')}
                  className="w-full flex items-center justify-between p-4 rounded-xl border-2 border-slate-100 hover:border-blue-300 hover:bg-blue-50/50 transition-all group text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <CalendarDays size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#0d1f4c] text-sm group-hover:text-blue-700">Book Appointment with DFO</h3>
                      <p className="text-xs text-slate-500 mt-0.5">For MSMEs and Entrepreneurs</p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-slate-400 group-hover:text-blue-600" />
                </button>

                <button
                  onClick={() => setView('dashboard_login')}
                  className="w-full flex items-center justify-between p-4 rounded-xl border-2 border-slate-100 hover:border-blue-300 hover:bg-blue-50/50 transition-all group text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                      <BriefcaseBusiness size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#0d1f4c] text-sm group-hover:text-emerald-700">DFO Performance Dashboard</h3>
                      <p className="text-xs text-slate-500 mt-0.5">Admin & Officer Login</p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-slate-400 group-hover:text-emerald-600" />
                </button>
              </div>
            </div>
          )}

          {['dashboard_login', 'appointment_login'].includes(view) && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 p-8 sm:p-10 relative">
              <button
                onClick={() => setView('selection')}
                className="absolute top-8 left-8 text-slate-400 hover:text-[#0d1f4c] flex items-center gap-1 text-xs font-semibold transition-colors"
              >
                <ArrowLeft size={14} /> Back
              </button>

              <div className="text-center mb-8 mt-4">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#0d1f4c]/5 border border-[#0d1f4c]/10 mb-4">
                  <Shield size={26} className="text-[#0d1f4c]" />
                </div>
                <h1 className="text-xl sm:text-2xl font-bold text-[#0d1f4c] tracking-wide">
                  {view === 'appointment_login' ? 'Book Appointment Login' : 'Dashboard Login'}
                </h1>
                <p className="text-slate-500 text-sm mt-1.5">
                  Sign in to access the portal
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="dfo-username" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    Username
                  </label>
                  <input
                    id="dfo-username"
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
                  <label htmlFor="dfo-password" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="dfo-password"
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

                <div className="bg-blue-50 text-blue-800 text-xs p-3 rounded-lg flex items-start gap-2">
                  <LogIn size={14} className="mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold mb-0.5">Demo Credentials:</p>
                    {view === 'appointment_login' ? (
                      <p>Username: <span className="font-mono bg-blue-100/50 px-1 rounded font-semibold">user</span> | Password: <span className="font-mono bg-blue-100/50 px-1 rounded font-semibold">user123</span></p>
                    ) : (
                      <p>Username: <span className="font-mono bg-blue-100/50 px-1 rounded font-semibold">admin</span> | Password: <span className="font-mono bg-blue-100/50 px-1 rounded font-semibold">admin123</span></p>
                    )}
                  </div>
                </div>

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

              <div className="mt-6 pt-5 border-t border-slate-100">
                <p className="text-[11px] text-slate-400 text-center">
                  Demo credentials: <span className="text-slate-600 font-mono">{view === 'appointment_login' ? 'user' : 'admin'}</span> / <span className="text-slate-600 font-mono">{view === 'appointment_login' ? 'user123' : 'admin123'}</span>
                </p>
              </div>
            </div>
          )}

          {/* Footer
          <p className="text-center text-[10px] text-slate-400 mt-6">
            © 2025 Ministry of Micro, Small &amp; Medium Enterprises, Government of India
          </p> */}
        </div>
      </div>
    </div>
  );
}
