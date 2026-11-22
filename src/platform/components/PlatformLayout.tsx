import { useState, type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  TrendingUp,
  FileText,
  Sparkles,
  ShieldCheck,
  UserCheck,
  RotateCcw,
  ExternalLink,
  ChevronDown,
  Building2,
  CheckCircle2,
  PlusCircle,
} from 'lucide-react';
import { usePlatform } from '../platformContext';
import AIAssistantModal from './AIAssistantModal';

interface PlatformLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
}

export default function PlatformLayout({
  children,
  title,
  subtitle,
  actions,
}: PlatformLayoutProps) {
  const { role, toggleRole, currentClientId, setCurrentClientId, clients, resetToDefaults } =
    usePlatform();
  const location = useLocation();
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [clientDropdownOpen, setClientDropdownOpen] = useState(false);

  const currentClient = clients.find((c) => c.id === currentClientId) || clients[0];

  const adminNavItems = [
    { label: 'Overview', href: '/admin', icon: LayoutDashboard },
    { label: 'Projects', href: '/admin/projects', icon: FolderKanban },
    { label: 'Clients', href: '/admin/clients', icon: Users },
    { label: 'Leads & CRM', href: '/admin/crm', icon: TrendingUp },
  ];

  const clientNavItems = [
    { label: 'Project Dashboard', href: '/portal', icon: FolderKanban },
    { label: 'New Onboarding', href: '/portal/onboarding', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-[#08090A] text-[#EEEEE8] flex flex-col font-sans selection:bg-[#D4FF3A] selection:text-[#08090A]">
      {/* Top Banner / Platform Header */}
      <header className="sticky top-0 z-40 bg-[#08090A]/90 backdrop-blur-md border-b border-white/[0.08] px-4 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 group">
              <span className="w-8 h-8 rounded-lg bg-[#D4FF3A] text-[#08090A] flex items-center justify-center font-bold text-sm tracking-tight shadow-[0_0_20px_rgba(212,255,58,0.3)]">
                O
              </span>
              <div className="flex flex-col">
                <span className="font-bold text-sm tracking-tight text-white group-hover:text-[#D4FF3A] transition-colors">
                  Optenary
                </span>
                <span className="text-[10px] uppercase font-mono tracking-wider text-white/50">
                  Operations OS
                </span>
              </div>
            </Link>

            {/* Role Badge Indicator */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.1] text-xs">
              <span className={`w-2 h-2 rounded-full ${role === 'admin' ? 'bg-[#FF3E88] animate-pulse' : 'bg-[#D4FF3A]'}`} />
              <span className="font-mono text-white/80">
                {role === 'admin' ? 'Admin / Engineering Mode' : 'Client Portal View'}
              </span>
            </div>
          </div>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-1 bg-white/[0.03] p-1 rounded-xl border border-white/[0.06]">
            {(role === 'admin' ? adminNavItems : clientNavItems).map((item) => {
              const active = location.pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    active
                      ? 'bg-white/[0.12] text-white shadow-sm'
                      : 'text-white/60 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Controls & Role Switcher */}
          <div className="flex items-center gap-2.5">
            {/* AI Assistant Quick Pill */}
            <button
              onClick={() => setAiModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-900/40 to-blue-900/30 border border-purple-500/30 text-purple-200 text-xs font-medium hover:border-purple-400 transition-all hover:shadow-[0_0_15px_rgba(139,92,246,0.3)]"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D4FF3A]" />
              <span className="hidden sm:inline">AI Operations</span>
            </button>

            {/* Client Switcher (Visible in Client View) */}
            {role === 'client' && (
              <div className="relative">
                <button
                  onClick={() => setClientDropdownOpen(!clientDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.1] text-xs text-white/90 hover:bg-white/[0.08] transition-colors"
                >
                  <Building2 className="w-3.5 h-3.5 text-[#D4FF3A]" />
                  <span className="max-w-[110px] truncate">{currentClient?.company || 'Select Client'}</span>
                  <ChevronDown className="w-3 h-3 text-white/50" />
                </button>

                {clientDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-[#111316] border border-white/[0.12] rounded-xl shadow-2xl py-1.5 z-50 text-xs">
                    <div className="px-3 py-1.5 text-[10px] font-mono uppercase text-white/40 tracking-wider">
                      Switch Active Client
                    </div>
                    {clients.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => {
                          setCurrentClientId(c.id);
                          setClientDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-white/[0.06] transition-colors ${
                          c.id === currentClientId ? 'text-[#D4FF3A] bg-white/[0.03]' : 'text-white/80'
                        }`}
                      >
                        <div>
                          <div className="font-semibold">{c.company}</div>
                          <div className="text-[11px] text-white/50">{c.name}</div>
                        </div>
                        {c.id === currentClientId && <CheckCircle2 className="w-4 h-4 text-[#D4FF3A]" />}
                      </button>
                    ))}
                    <div className="border-t border-white/[0.08] mt-1 pt-1">
                      <Link
                        to="/portal/onboarding"
                        onClick={() => setClientDropdownOpen(false)}
                        className="w-full text-left px-3 py-2 flex items-center gap-2 text-white/70 hover:text-white hover:bg-white/[0.06]"
                      >
                        <PlusCircle className="w-3.5 h-3.5 text-[#D4FF3A]" />
                        <span>Submit New Client Intake</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Fast Role Toggle */}
            <button
              onClick={toggleRole}
              title={`Switch to ${role === 'admin' ? 'Client Portal' : 'Admin Operations'}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#D4FF3A] text-[#08090A] font-bold text-xs tracking-tight hover:brightness-110 active:scale-95 transition-all shadow-[0_4px_16px_rgba(212,255,58,0.25)]"
            >
              {role === 'admin' ? (
                <>
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Switch to Client Portal</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Switch to Admin Mode</span>
                </>
              )}
            </button>

            {/* Link back to public site */}
            <Link
              to="/"
              title="Return to Public Website"
              className="p-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-white/60 hover:text-white transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="flex md:hidden overflow-x-auto gap-2 pt-3 pb-1 border-t border-white/[0.06] mt-2.5">
          {(role === 'admin' ? adminNavItems : clientNavItems).map((item) => {
            const active = location.pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap ${
                  active ? 'bg-white/[0.15] text-white' : 'text-white/60'
                }`}
              >
                <Icon className="w-3 h-3" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </header>

      {/* Page Header (Optional) */}
      {(title || actions) && (
        <div className="border-b border-white/[0.06] bg-white/[0.01] px-4 lg:px-8 py-6">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              {title && <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">{title}</h1>}
              {subtitle && <p className="text-sm text-white/60 mt-1 max-w-2xl">{subtitle}</p>}
            </div>
            {actions && <div className="flex items-center gap-3">{actions}</div>}
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-8">{children}</main>

      {/* Footer info & Reset Demo */}
      <footer className="border-t border-white/[0.06] py-5 px-4 lg:px-8 text-xs text-white/40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF3A]" />
            <span>Optenary Operations Platform v1.0 • Built for Scale & Transparency</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={resetToDefaults}
              className="inline-flex items-center gap-1.5 text-white/50 hover:text-white transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Demo Data</span>
            </button>
            <span>•</span>
            <Link to="/contact" className="hover:text-white transition-colors">
              Support & Inquiries
            </Link>
          </div>
        </div>
      </footer>

      {/* Global AI Operations Assistant Modal */}
      <AIAssistantModal isOpen={aiModalOpen} onClose={() => setAiModalOpen(false)} />
    </div>
  );
}
