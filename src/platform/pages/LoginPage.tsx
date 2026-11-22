import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth, DEMO_USERS } from '../auth/AuthContext';
import { ShieldCheck, ArrowRight, Mail, ChevronRight } from 'lucide-react';
import SEO from '../../components/SEO';

export default function LoginPage() {
  const { login, loginAsDemo, currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Destination after login
  const from = (location.state as any)?.from?.pathname || (currentUser?.role === 'client' ? '/portal' : '/admin');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    try {
      await login(email);
      navigate(from, { replace: true });
    } catch {
      setError('Unable to authenticate. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = (preset: 'admin' | 'team' | 'client_shree' | 'client_mehta') => {
    loginAsDemo(preset);
    if (preset === 'client_shree' || preset === 'client_mehta') {
      navigate('/portal', { replace: true });
    } else {
      navigate('/admin', { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-[#08090A] text-white flex flex-col justify-between selection:bg-[#D4FF3A] selection:text-[#08090A]">
      <SEO
        title="Sign In | Optenary Operations & Client Management"
        description="Secure authenticated access for Optenary team administrators and client portals."
        canonicalPath="/login"
      />

      {/* Top Bar */}
      <header className="p-6 flex items-center justify-between border-b border-white/[0.06]">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#D4FF3A] flex items-center justify-center font-extrabold text-[#08090A] text-base">
            O
          </div>
          <span className="font-bold text-base tracking-tight text-white">Optenary</span>
          <span className="text-white/40 text-xs font-mono">/ OS</span>
        </Link>

        <Link
          to="/"
          className="text-xs text-white/60 hover:text-white transition-colors flex items-center gap-1 font-mono"
        >
          <span>Return to website</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 my-8">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4FF3A]/10 border border-[#D4FF3A]/30 text-[#D4FF3A] text-xs font-mono uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Role-Based Secure Access</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Sign in to Optenary
            </h1>
            <p className="text-xs sm:text-sm text-white/50">
              Access the Internal Operations Command Center or your verified Client Portal.
            </p>
          </div>

          {/* Quick Demo Credentials Switcher */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-wider text-white/40 block">
              Instant Demo Access (Click to test roles)
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleDemoLogin('admin')}
                className="p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] text-left transition-all group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-white group-hover:text-[#D4FF3A]">Administrator</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#D4FF3A]/20 text-[#D4FF3A]">All OS</span>
                </div>
                <div className="text-[11px] text-white/50 font-mono truncate">{DEMO_USERS.admin.email}</div>
              </button>

              <button
                type="button"
                onClick={() => handleDemoLogin('team')}
                className="p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] text-left transition-all group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-white group-hover:text-[#D4FF3A]">Team Architect</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300">Staff</span>
                </div>
                <div className="text-[11px] text-white/50 font-mono truncate">{DEMO_USERS.team.email}</div>
              </button>

              <button
                type="button"
                onClick={() => handleDemoLogin('client_shree')}
                className="p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] text-left transition-all group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-white group-hover:text-[#D4FF3A]">Client: Shree Ent.</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">Portal</span>
                </div>
                <div className="text-[11px] text-white/50 font-mono truncate">Ramesh Patel</div>
              </button>

              <button
                type="button"
                onClick={() => handleDemoLogin('client_mehta')}
                className="p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] text-left transition-all group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-white group-hover:text-[#D4FF3A]">Client: Mehta Dairy</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">Portal</span>
                </div>
                <div className="text-[11px] text-white/50 font-mono truncate">Rajesh Mehta</div>
              </button>
            </div>
          </div>

          {/* Standard Email Authentication Form */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-white/70 mb-1.5">
                  Corporate or Client Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-white/30 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#D4FF3A]"
                  />
                </div>
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-[#D4FF3A] text-[#08090A] font-bold text-xs tracking-tight flex items-center justify-center gap-2 hover:brightness-110 transition-all shadow-[0_4px_20px_rgba(212,255,58,0.25)]"
              >
                <span>{loading ? 'Authenticating...' : 'Sign In with Email'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="pt-2 text-center">
              <span className="text-[11px] text-white/40">
                New client embarking on a digital build?{' '}
                <Link to="/portal/onboarding" className="text-[#D4FF3A] hover:underline font-medium">
                  Submit Onboarding
                </Link>
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center text-[11px] text-white/30 font-mono border-t border-white/[0.04]">
        Optenary Digital Operations Platform • Authenticated Session Protection Active
      </footer>
    </div>
  );
}
