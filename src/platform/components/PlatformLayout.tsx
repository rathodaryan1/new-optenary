import { useState, type ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderKanban,
  TrendingUp,
  FileText,
  Sparkles,
  Building2,
  CheckSquare,
  Users2,
  MessageSquare,
  BarChart3,
  Settings,
  ExternalLink,
  ChevronDown,
  LogOut,
  Menu,
  X,
  Download,
  RotateCcw,
} from 'lucide-react';
import { usePlatform } from '../platformContext';
import { useAuth, DEMO_USERS } from '../auth/AuthContext';
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
  const { currentClientId, setCurrentClientId, clients, resetToDefaults, exportDatabaseJSON } =
    usePlatform();
  const { currentUser, role, logout, loginAsDemo } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [clientDropdownOpen, setClientDropdownOpen] = useState(false);
  const [demoDropdownOpen, setDemoDropdownOpen] = useState(false);

  const currentClient = clients.find((c) => c.id === currentClientId) || clients[0];

  // 10 Requested Admin Navigation Modules
  const adminNavItems = [
    { label: 'Overview', href: '/admin', icon: LayoutDashboard },
    { label: 'Leads & CRM', href: '/admin/leads', icon: TrendingUp },
    { label: 'Clients', href: '/admin/clients', icon: Building2 },
    { label: 'Projects', href: '/admin/projects', icon: FolderKanban },
    { label: 'Tasks & Sprints', href: '/admin/tasks', icon: CheckSquare },
    { label: 'Team', href: '/admin/team', icon: Users2 },
    { label: 'Updates Feed', href: '/admin/updates', icon: MessageSquare },
    { label: 'Deliverables & Files', href: '/admin/files', icon: FileText },
    { label: 'Operations Analytics', href: '/admin/analytics', icon: BarChart3 },
    { label: 'Platform Settings', href: '/admin/settings', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#08090A] text-white flex flex-col selection:bg-[#D4FF3A] selection:text-[#08090A] antialiased">
      {/* Top Bar for Desktop and Mobile */}
      <header className="sticky top-0 z-40 h-16 border-b border-white/[0.08] bg-[#08090A]/90 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between">
        {/* Left: Brand & Mobile Trigger */}
        <div className="flex items-center gap-3">
          {role !== 'client' && (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white hover:bg-white/[0.1]"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          )}

          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#D4FF3A] flex items-center justify-center font-extrabold text-[#08090A] text-sm">
              O
            </div>
            <span className="font-bold text-sm tracking-tight text-white hidden sm:inline">Optenary</span>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-white/[0.06] text-white/70 border border-white/[0.08]">
              {role === 'client' ? 'Client Portal' : 'Operations OS'}
            </span>
          </Link>
        </div>

        {/* Right Header Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* AI Operations Copilot Trigger */}
          <button
            onClick={() => setAiModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-500/15 to-[#D4FF3A]/15 border border-[#D4FF3A]/30 text-white text-xs font-semibold hover:border-[#D4FF3A] transition-all"
            title="Open AI Operations Copilot"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D4FF3A]" />
            <span className="hidden sm:inline">AI Copilot</span>
          </button>

          {/* Quick Demo Role Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDemoDropdownOpen(!demoDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] text-xs font-medium text-white transition-all"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="hidden md:inline font-mono">{currentUser?.name || 'Account'}</span>
              <span className="text-[10px] font-mono uppercase px-1.5 py-0.2 rounded bg-white/10 text-[#D4FF3A]">
                {role}
              </span>
              <ChevronDown className="w-3 h-3 text-white/50" />
            </button>

            {demoDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-[#0D0E11] border border-white/[0.12] rounded-xl shadow-2xl p-2 z-50 space-y-1 text-xs">
                <div className="px-2.5 py-1.5 text-[10px] font-mono text-white/40 uppercase tracking-wider border-b border-white/[0.06]">
                  Switch Role / Test Accounts
                </div>
                <button
                  onClick={() => {
                    loginAsDemo('admin');
                    setDemoDropdownOpen(false);
                    navigate('/admin');
                  }}
                  className={`w-full text-left px-2.5 py-2 rounded-lg flex items-center justify-between ${
                    role === 'admin' ? 'bg-[#D4FF3A]/10 text-[#D4FF3A]' : 'text-white/80 hover:bg-white/[0.05]'
                  }`}
                >
                  <div>
                    <div className="font-semibold">{DEMO_USERS.admin.name}</div>
                    <div className="text-[10px] text-white/40">{DEMO_USERS.admin.email}</div>
                  </div>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10">Admin</span>
                </button>

                <button
                  onClick={() => {
                    loginAsDemo('team');
                    setDemoDropdownOpen(false);
                    navigate('/admin');
                  }}
                  className={`w-full text-left px-2.5 py-2 rounded-lg flex items-center justify-between ${
                    role === 'team' ? 'bg-[#D4FF3A]/10 text-[#D4FF3A]' : 'text-white/80 hover:bg-white/[0.05]'
                  }`}
                >
                  <div>
                    <div className="font-semibold">{DEMO_USERS.team.name}</div>
                    <div className="text-[10px] text-white/40">{DEMO_USERS.team.email}</div>
                  </div>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10">Team</span>
                </button>

                <button
                  onClick={() => {
                    loginAsDemo('client_shree');
                    setDemoDropdownOpen(false);
                    navigate('/portal');
                  }}
                  className={`w-full text-left px-2.5 py-2 rounded-lg flex items-center justify-between ${
                    role === 'client' && currentClientId === 'c-shree'
                      ? 'bg-[#D4FF3A]/10 text-[#D4FF3A]'
                      : 'text-white/80 hover:bg-white/[0.05]'
                  }`}
                >
                  <div>
                    <div className="font-semibold">{DEMO_USERS.client_shree.name}</div>
                    <div className="text-[10px] text-white/40">Shree Enterprise</div>
                  </div>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">Client</span>
                </button>

                <button
                  onClick={() => {
                    loginAsDemo('client_mehta');
                    setDemoDropdownOpen(false);
                    navigate('/portal');
                  }}
                  className={`w-full text-left px-2.5 py-2 rounded-lg flex items-center justify-between ${
                    role === 'client' && currentClientId === 'c-mehta'
                      ? 'bg-[#D4FF3A]/10 text-[#D4FF3A]'
                      : 'text-white/80 hover:bg-white/[0.05]'
                  }`}
                >
                  <div>
                    <div className="font-semibold">{DEMO_USERS.client_mehta.name}</div>
                    <div className="text-[10px] text-white/40">Mehta Dairy</div>
                  </div>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">Client</span>
                </button>

                <div className="pt-1.5 border-t border-white/[0.06] flex items-center justify-between px-2">
                  <button
                    onClick={() => {
                      resetToDefaults();
                      setDemoDropdownOpen(false);
                    }}
                    className="text-[10px] text-white/40 hover:text-white flex items-center gap-1 font-mono"
                    title="Reset to default seed accounts"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset Data</span>
                  </button>

                  <button
                    onClick={() => {
                      exportDatabaseJSON();
                      setDemoDropdownOpen(false);
                    }}
                    className="text-[10px] text-[#D4FF3A] hover:underline flex items-center gap-1 font-mono"
                    title="Export JSON backup"
                  >
                    <Download className="w-3 h-3" />
                    <span>Export JSON</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Logout / Exit */}
          <button
            onClick={handleLogout}
            className="p-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white/60 hover:text-white hover:bg-white/[0.08] transition-colors"
            title="Sign Out"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Main Container with Sidebar + Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Admin Sidebar Navigation */}
        {role !== 'client' && (
          <aside
            className={`fixed inset-y-0 left-0 z-30 w-64 bg-[#0A0B0D] border-r border-white/[0.08] flex flex-col justify-between pt-16 lg:static lg:pt-0 transition-transform duration-300 ${
              mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
            }`}
          >
            {/* Nav List */}
            <div className="p-4 space-y-1 overflow-y-auto flex-1">
              <div className="px-3 py-2 text-[10px] font-mono uppercase tracking-wider text-white/40">
                Operations Modules
              </div>

              {adminNavItems.map((item) => {
                const isActive = location.pathname === item.href;
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-[#D4FF3A] text-[#08090A] shadow-[0_4px_16px_rgba(212,255,58,0.2)]'
                        : 'text-white/70 hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    <Icon className="w-4 h-4 flex-none" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Sidebar Bottom: Quick Client Portal View launcher */}
            <div className="p-4 border-t border-white/[0.08] bg-black/20 space-y-2">
              <div className="text-[10px] font-mono uppercase tracking-wider text-white/40 px-1">
                Preview Client Portal
              </div>

              <div className="relative">
                <button
                  onClick={() => setClientDropdownOpen(!clientDropdownOpen)}
                  className="w-full flex items-center justify-between p-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs font-medium text-white hover:bg-white/[0.06]"
                >
                  <div className="truncate text-left">
                    <span className="block truncate font-bold">{currentClient?.company}</span>
                    <span className="text-[10px] text-white/40 block truncate">{currentClient?.name}</span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-white/40 flex-none" />
                </button>

                {clientDropdownOpen && (
                  <div className="absolute bottom-full left-0 right-0 mb-1 bg-[#111316] border border-white/[0.12] rounded-xl p-1 shadow-2xl z-50 max-h-48 overflow-y-auto">
                    {clients.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => {
                          setCurrentClientId(c.id);
                          setClientDropdownOpen(false);
                        }}
                        className={`w-full text-left p-2 rounded-lg text-xs truncate ${
                          c.id === currentClientId ? 'bg-[#D4FF3A] text-[#08090A] font-bold' : 'text-white/80 hover:bg-white/[0.05]'
                        }`}
                      >
                        {c.company} ({c.name})
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <Link
                to="/portal"
                className="w-full py-2 px-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Launch Client Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </aside>
        )}

        {/* Content Pane */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Header Title & Actions */}
          {(title || actions) && (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.06]">
              <div>
                {title && <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">{title}</h1>}
                {subtitle && <p className="text-xs sm:text-sm text-white/50 mt-1">{subtitle}</p>}
              </div>
              {actions && <div className="flex items-center gap-2.5 flex-wrap">{actions}</div>}
            </div>
          )}

          {/* Page Body */}
          {children}
        </main>
      </div>

      {/* AI Assistant Modal */}
      <AIAssistantModal isOpen={aiModalOpen} onClose={() => setAiModalOpen(false)} />
    </div>
  );
}
