import { useState, useEffect, type ReactNode } from 'react';
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
  Search,
  Bell,
  Check,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
} from 'lucide-react';
import { usePlatform } from '../platformContext';
import { useAuth, DEMO_USERS } from '../auth/AuthContext';
import AIAssistantModal from './AIAssistantModal';
import { isSupabaseConfigured } from '../../lib/supabase';

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
  const {
    currentClientId,
    setCurrentClientId,
    clients,
    projects,
    leads,
    tasks,
    teamMembers,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    clearNotifications,
    resetToDefaults,
    exportDatabaseJSON,
  } = usePlatform();

  const { currentUser, role, logout, loginAsDemo } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Collapsible sidebar state (persisted)
  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    try {
      return localStorage.getItem('optenary_sidebar_collapsed') === 'true';
    } catch {
      return false;
    }
  });

  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [clientDropdownOpen, setClientDropdownOpen] = useState(false);
  const [demoDropdownOpen, setDemoDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [themeMode, setThemeMode] = useState<'dark' | 'midnight'>(() => {
    try {
      return (localStorage.getItem('optenary_admin_theme') as 'dark' | 'midnight') || 'dark';
    } catch {
      return 'dark';
    }
  });

  const toggleSidebar = () => {
    setIsCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('optenary_sidebar_collapsed', String(next));
      } catch {}
      return next;
    });
  };

  const toggleTheme = () => {
    setThemeMode((prev) => {
      const next = prev === 'dark' ? 'midnight' : 'dark';
      try {
        localStorage.setItem('optenary_admin_theme', next);
      } catch {}
      return next;
    });
  };

  // Auto-close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close mobile drawer on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Keyboard shortcut for search (Ctrl+K / Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        if (searchModalOpen) setSearchModalOpen(false);
        if (mobileMenuOpen) setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchModalOpen, mobileMenuOpen]);

  const currentClient = clients.find((c) => c.id === currentClientId) || clients[0];
  const unreadNotifications = notifications.filter((n) => !n.isRead);

  // Dynamic Breadcrumb generation
  const getBreadcrumbs = () => {
    const path = location.pathname;
    const parts = [{ label: 'Admin', href: '/admin' }];

    if (path === '/admin') return parts;

    if (path.startsWith('/admin/leads') || path.startsWith('/admin/crm')) {
      parts.push({ label: 'CRM', href: '/admin/leads' });
      parts.push({ label: 'Leads & Pipeline', href: '/admin/leads' });
    } else if (path.startsWith('/admin/clients')) {
      parts.push({ label: 'Accounts', href: '/admin/clients' });
      parts.push({ label: 'Client Directory', href: '/admin/clients' });
    } else if (path.startsWith('/admin/projects')) {
      parts.push({ label: 'Delivery', href: '/admin/projects' });
      parts.push({ label: 'Projects & Sprints', href: '/admin/projects' });
    } else if (path.startsWith('/admin/tasks')) {
      parts.push({ label: 'Delivery', href: '/admin/tasks' });
      parts.push({ label: 'Tasks & Sprints', href: '/admin/tasks' });
    } else if (path.startsWith('/admin/team')) {
      parts.push({ label: 'Operations', href: '/admin/team' });
      parts.push({ label: 'Team & Capacity', href: '/admin/team' });
    } else if (path.startsWith('/admin/updates')) {
      parts.push({ label: 'Communication', href: '/admin/updates' });
      parts.push({ label: 'Project Updates', href: '/admin/updates' });
    } else if (path.startsWith('/admin/files')) {
      parts.push({ label: 'Assets', href: '/admin/files' });
      parts.push({ label: 'Files & Handover', href: '/admin/files' });
    } else if (path.startsWith('/admin/analytics')) {
      parts.push({ label: 'Executive', href: '/admin/analytics' });
      parts.push({ label: 'Operations Analytics', href: '/admin/analytics' });
    } else if (path.startsWith('/admin/settings')) {
      parts.push({ label: 'System', href: '/admin/settings' });
      parts.push({ label: 'Settings', href: '/admin/settings' });
    }
    return parts;
  };

  // 10 Requested Admin Navigation Modules
  const adminNavGroups = [
    {
      title: 'Command',
      items: [{ label: 'Overview', href: '/admin', icon: LayoutDashboard }],
    },
    {
      title: 'CRM & Accounts',
      items: [
        { label: 'Leads & CRM', href: '/admin/leads', icon: TrendingUp, badge: leads.length },
        { label: 'Clients', href: '/admin/clients', icon: Building2, badge: clients.length },
      ],
    },
    {
      title: 'Delivery & Sprints',
      items: [
        { label: 'Projects', href: '/admin/projects', icon: FolderKanban, badge: projects.length },
        { label: 'Tasks', href: '/admin/tasks', icon: CheckSquare, badge: tasks.filter((t) => !t.isCompleted).length },
        { label: 'Team', href: '/admin/team', icon: Users2 },
      ],
    },
    {
      title: 'Communications',
      items: [
        { label: 'Updates Feed', href: '/admin/updates', icon: MessageSquare },
        { label: 'Files & Deliverables', href: '/admin/files', icon: FileText },
      ],
    },
    {
      title: 'Executive',
      items: [
        { label: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
        { label: 'Settings', href: '/admin/settings', icon: Settings },
      ],
    },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Search Results filtering
  const searchResults = searchQuery.trim()
    ? {
        projects: projects.filter(
          (p) =>
            p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.service.toLowerCase().includes(searchQuery.toLowerCase())
        ),
        clients: clients.filter(
          (c) =>
            c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.email.toLowerCase().includes(searchQuery.toLowerCase())
        ),
        leads: leads.filter(
          (l) =>
            l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            l.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
            l.service.toLowerCase().includes(searchQuery.toLowerCase())
        ),
        tasks: tasks.filter(
          (t) =>
            t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (t.assignedToName && t.assignedToName.toLowerCase().includes(searchQuery.toLowerCase()))
        ),
        team: teamMembers.filter(
          (m) =>
            m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            m.roleTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
            m.department.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      }
    : null;

  return (
    <div
      className={`min-h-screen text-white flex flex-col selection:bg-[#D4FF3A] selection:text-[#08090A] antialiased ${
        themeMode === 'midnight' ? 'bg-[#040405]' : 'bg-[#08090A]'
      }`}
    >
      {/* Top Bar for Desktop and Mobile */}
      <header className="sticky top-0 z-40 h-16 border-b border-white/[0.08] bg-[#08090A]/90 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between">
        {/* Left: Brand & Mobile Trigger & Breadcrumbs */}
        <div className="flex items-center gap-3 sm:gap-4">
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
            <div className="w-7 h-7 rounded-lg bg-[#D4FF3A] flex items-center justify-center font-extrabold text-[#08090A] text-sm shadow-[0_0_12px_rgba(212,255,58,0.3)]">
              O
            </div>
            <span className="font-bold text-sm tracking-tight text-white hidden sm:inline">Optenary</span>
          </Link>

          {/* Breadcrumbs for desktop */}
          <nav className="hidden md:flex items-center gap-1.5 text-xs text-white/40 pl-3 border-l border-white/[0.08] font-mono">
            {getBreadcrumbs().map((b, idx, arr) => (
              <span key={b.href + idx} className="flex items-center gap-1.5">
                {idx > 0 && <span>/</span>}
                <Link
                  to={b.href}
                  className={`hover:text-white transition-colors ${
                    idx === arr.length - 1 ? 'text-white font-semibold' : ''
                  }`}
                >
                  {b.label}
                </Link>
              </span>
            ))}
          </nav>
        </div>

        {/* Center: Global Search Trigger */}
        <div className="hidden sm:flex items-center flex-1 max-w-xs mx-4">
          <button
            onClick={() => setSearchModalOpen(true)}
            className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-xs text-white/50 hover:border-white/[0.18] hover:text-white/80 transition-all font-mono"
          >
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-white/40" />
              <span>Search platform...</span>
            </div>
            <kbd className="px-1.5 py-0.5 rounded bg-white/[0.06] text-[10px] text-white/40 border border-white/[0.08]">
              Ctrl K
            </kbd>
          </button>
        </div>

        {/* Right Header Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Mobile Search Button */}
          <button
            onClick={() => setSearchModalOpen(true)}
            className="sm:hidden p-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white/70 hover:text-white"
            title="Search"
          >
            <Search className="w-3.5 h-3.5" />
          </button>

          {/* AI Operations Copilot Trigger */}
          <button
            onClick={() => setAiModalOpen(true)}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-500/15 to-[#D4FF3A]/15 border border-[#D4FF3A]/30 text-white text-xs font-semibold hover:border-[#D4FF3A] transition-all shadow-[0_0_10px_rgba(212,255,58,0.1)]"
            title="Open AI Operations Copilot"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D4FF3A]" />
            <span className="hidden sm:inline">AI Copilot</span>
          </button>

          {/* Notifications Popover */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative p-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white/70 hover:text-white hover:bg-white/[0.08] transition-colors"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadNotifications.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#D4FF3A] ring-2 ring-[#08090A]" />
              )}
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#0E1013] border border-white/[0.12] rounded-2xl shadow-2xl p-3 z-50 space-y-2 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-white/[0.08] px-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-xs">Notifications</span>
                    {unreadNotifications.length > 0 && (
                      <span className="px-1.5 py-0.2 rounded-full bg-[#D4FF3A] text-[#08090A] text-[10px] font-bold font-mono">
                        {unreadNotifications.length} new
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-mono">
                    <button
                      onClick={markAllNotificationsRead}
                      className="text-white/50 hover:text-white flex items-center gap-1"
                    >
                      <Check className="w-3 h-3" />
                      <span>Mark all read</span>
                    </button>
                    <span>•</span>
                    <button
                      onClick={clearNotifications}
                      className="text-red-400/80 hover:text-red-400"
                    >
                      Clear
                    </button>
                  </div>
                </div>

                <div className="max-h-64 overflow-y-auto space-y-1.5 pr-1">
                  {notifications.length === 0 ? (
                    <div className="py-8 text-center text-white/40 italic font-mono text-[11px]">
                      No notifications at this time
                    </div>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => {
                          markNotificationRead(n.id);
                          if (n.link) {
                            navigate(n.link);
                            setNotificationsOpen(false);
                          }
                        }}
                        className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                          n.isRead
                            ? 'bg-white/[0.01] border-white/[0.04] text-white/60'
                            : 'bg-white/[0.04] border-[#D4FF3A]/30 text-white shadow-sm'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-xs text-white">{n.title}</span>
                          <span className="text-[10px] font-mono text-white/40">{n.timestamp}</span>
                        </div>
                        <p className="text-[11px] text-white/70 leading-relaxed">{n.description}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Theme Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white/70 hover:text-white hover:bg-white/[0.08] transition-colors"
            title={`Switch to ${themeMode === 'dark' ? 'AMOLED Midnight' : 'Studio Dark'} mode`}
          >
            {themeMode === 'dark' ? <Moon className="w-4 h-4 text-white/70" /> : <Sun className="w-4 h-4 text-[#D4FF3A]" />}
          </button>

          {/* Role & Account Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDemoDropdownOpen(!demoDropdownOpen)}
              className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] text-xs font-medium text-white transition-all"
            >
              <div className="w-5 h-5 rounded-md bg-[#D4FF3A] text-[#08090A] flex items-center justify-center font-bold text-[10px]">
                {currentUser?.avatar || 'US'}
              </div>
              <span className="hidden md:inline font-mono text-[11px]">{currentUser?.name?.split(' ')[0]}</span>
              <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-white/10 text-[#D4FF3A] font-bold">
                {role}
              </span>
              <ChevronDown className="w-3 h-3 text-white/50" />
            </button>

            {demoDropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-[#0E1013] border border-white/[0.12] rounded-2xl shadow-2xl p-2.5 z-50 space-y-2 text-xs">
                {/* User Session Info */}
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-xs">{currentUser?.name}</span>
                    <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-[#D4FF3A]/20 text-[#D4FF3A] font-bold">
                      {role}
                    </span>
                  </div>
                  <div className="text-[11px] text-white/40 font-mono truncate">{currentUser?.email}</div>
                  <div className="text-[10px] text-white/50">{currentUser?.companyName || 'Optenary Operations'}</div>

                  {/* Engine Indicator */}
                  <div className="pt-2 mt-1 border-t border-white/[0.04] flex items-center justify-between text-[10px] font-mono">
                    <span className="text-white/40">Persistence Engine</span>
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {isSupabaseConfigured ? 'Supabase Cloud' : 'Local Storage'}
                    </span>
                  </div>
                </div>

                {/* Role Switcher */}
                <div className="space-y-1">
                  <div className="px-2 py-1 text-[10px] font-mono text-white/40 uppercase tracking-wider">
                    Switch Test Account / Role
                  </div>
                  <button
                    onClick={() => {
                      loginAsDemo('admin');
                      setDemoDropdownOpen(false);
                      navigate('/admin');
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between ${
                      role === 'admin' ? 'bg-[#D4FF3A]/10 text-[#D4FF3A]' : 'text-white/80 hover:bg-white/[0.05]'
                    }`}
                  >
                    <span>{DEMO_USERS.admin.name}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10">Admin</span>
                  </button>

                  <button
                    onClick={() => {
                      loginAsDemo('team');
                      setDemoDropdownOpen(false);
                      navigate('/admin');
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between ${
                      role === 'team' ? 'bg-[#D4FF3A]/10 text-[#D4FF3A]' : 'text-white/80 hover:bg-white/[0.05]'
                    }`}
                  >
                    <span>{DEMO_USERS.team.name}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10">Team</span>
                  </button>

                  <button
                    onClick={() => {
                      loginAsDemo('client');
                      setDemoDropdownOpen(false);
                      navigate('/portal');
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between ${
                      role === 'client'
                        ? 'bg-[#D4FF3A]/10 text-[#D4FF3A]'
                        : 'text-white/80 hover:bg-white/[0.05]'
                    }`}
                  >
                    <span>Client Portal</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">Client</span>
                  </button>
                </div>

                {/* Utilities */}
                <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between px-2 text-[10px] font-mono">
                  <button
                    onClick={() => {
                      resetToDefaults();
                      setDemoDropdownOpen(false);
                    }}
                    className="text-white/40 hover:text-white flex items-center gap-1"
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
                    className="text-[#D4FF3A] hover:underline flex items-center gap-1"
                    title="Export JSON backup"
                  >
                    <Download className="w-3 h-3" />
                    <span>Backup JSON</span>
                  </button>
                </div>

                <div className="pt-2 border-t border-white/[0.06]">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg text-red-400 hover:bg-red-500/10 flex items-center gap-2 font-medium"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Container with Sidebar + Content */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Mobile Navigation Drawer Backdrop */}
        {role !== 'client' && mobileMenuOpen && (
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 z-20 bg-black/70 backdrop-blur-sm lg:hidden transition-opacity"
            aria-hidden="true"
          />
        )}

        {/* Admin Sidebar Navigation */}
        {role !== 'client' && (
          <aside
            className={`fixed inset-y-0 left-0 z-30 bg-[#0A0B0D] border-r border-white/[0.08] flex flex-col justify-between pt-16 lg:static lg:pt-0 transition-all duration-300 ${
              mobileMenuOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0'
            } ${isCollapsed ? 'lg:w-[72px]' : 'lg:w-64'}`}
          >
            {/* Nav Group List */}
            <div className="p-3 space-y-4 overflow-y-auto flex-1">
              {adminNavGroups.map((group) => (
                <div key={group.title} className="space-y-1">
                  {!isCollapsed && (
                    <div className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-white/30">
                      {group.title}
                    </div>
                  )}

                  {group.items.map((item) => {
                    const isActive = location.pathname === item.href;
                    const Icon = item.icon;

                    return (
                      <Link
                        key={item.href}
                        to={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        title={isCollapsed ? item.label : undefined}
                        className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all group relative ${
                          isActive
                            ? 'bg-[#D4FF3A] text-[#08090A] shadow-[0_4px_16px_rgba(212,255,58,0.2)] font-bold'
                            : 'text-white/70 hover:text-white hover:bg-white/[0.04]'
                        } ${isCollapsed ? 'justify-center px-0' : ''}`}
                      >
                        <Icon className="w-4 h-4 flex-none" />
                        {!isCollapsed && <span className="flex-1 truncate">{item.label}</span>}
                        {!isCollapsed && typeof item.badge === 'number' && item.badge > 0 && (
                          <span
                            className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                              isActive ? 'bg-[#08090A] text-[#D4FF3A]' : 'bg-white/[0.08] text-white/60'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Sidebar Bottom Controls */}
            <div className="p-3 border-t border-white/[0.08] bg-black/20 space-y-2">
              {!isCollapsed ? (
                <>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-white/30 px-1">
                    Client Portal
                  </div>
                  <div className="relative">
                    <button
                      onClick={() => setClientDropdownOpen(!clientDropdownOpen)}
                      className="w-full flex items-center justify-between p-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs font-medium text-white hover:bg-white/[0.06]"
                    >
                      <div className="truncate text-left">
                        <span className="block truncate font-bold text-[11px]">{currentClient?.company}</span>
                        <span className="text-[9px] text-white/40 block truncate">{currentClient?.name}</span>
                      </div>
                      <ChevronDown className="w-3 h-3 text-white/40 flex-none" />
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
                              c.id === currentClientId
                                ? 'bg-[#D4FF3A] text-[#08090A] font-bold'
                                : 'text-white/80 hover:bg-white/[0.05]'
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
                    className="w-full py-1.5 px-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Launch Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </>
              ) : (
                <Link
                  to="/portal"
                  className="w-full py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-white flex items-center justify-center transition-colors"
                  title="Launch Client Portal"
                >
                  <ExternalLink className="w-4 h-4 text-[#D4FF3A]" />
                </Link>
              )}

              {/* Desktop Collapse / Expand Toggle */}
              <button
                onClick={toggleSidebar}
                className="hidden lg:flex w-full items-center justify-center py-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/[0.04] transition-colors text-xs font-mono"
                title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
              </button>
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

      {/* Global Search Modal (Ctrl+K) */}
      {searchModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-24 px-4">
          <div className="w-full max-w-2xl bg-[#0E1013] border border-white/[0.15] rounded-2xl shadow-2xl overflow-hidden flex flex-col text-xs">
            {/* Search Input Bar */}
            <div className="p-4 border-b border-white/[0.08] flex items-center gap-3">
              <Search className="w-4 h-4 text-[#D4FF3A]" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects, clients, leads, tasks, team..."
                className="w-full bg-transparent text-white placeholder-white/40 text-sm focus:outline-none"
              />
              <button
                onClick={() => setSearchModalOpen(false)}
                className="p-1 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-white/60 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Results or Helper */}
            <div className="p-4 max-h-96 overflow-y-auto space-y-4">
              {!searchQuery.trim() ? (
                <div className="text-center py-8 space-y-2 text-white/40 font-mono text-[11px]">
                  <div>Type any keyword to search across the entire Optenary platform.</div>
                  <div className="flex items-center justify-center gap-2">
                    <span className="px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/[0.08]">Projects</span>
                    <span className="px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/[0.08]">Clients</span>
                    <span className="px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/[0.08]">Leads</span>
                    <span className="px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/[0.08]">Tasks</span>
                  </div>
                </div>
              ) : searchResults && (
                <>
                  {/* Projects */}
                  {searchResults.projects.length > 0 && (
                    <div className="space-y-1">
                      <div className="text-[10px] font-mono text-white/40 uppercase tracking-wider flex items-center gap-1.5">
                        <FolderKanban className="w-3 h-3 text-[#D4FF3A]" />
                        <span>Projects ({searchResults.projects.length})</span>
                      </div>
                      {searchResults.projects.map((p) => (
                        <div
                          key={p.id}
                          onClick={() => {
                            navigate('/admin/projects');
                            setSearchModalOpen(false);
                          }}
                          className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-[#D4FF3A]/40 hover:bg-white/[0.04] transition-all cursor-pointer flex items-center justify-between"
                        >
                          <div>
                            <div className="font-semibold text-white">{p.title}</div>
                            <div className="text-[10px] text-white/40">{p.companyName} • {p.service}</div>
                          </div>
                          <span className="text-[10px] font-mono text-[#D4FF3A]">{p.progress}%</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Leads */}
                  {searchResults.leads.length > 0 && (
                    <div className="space-y-1">
                      <div className="text-[10px] font-mono text-white/40 uppercase tracking-wider flex items-center gap-1.5">
                        <TrendingUp className="w-3 h-3 text-[#D4FF3A]" />
                        <span>Leads CRM ({searchResults.leads.length})</span>
                      </div>
                      {searchResults.leads.map((l) => (
                        <div
                          key={l.id}
                          onClick={() => {
                            navigate('/admin/leads');
                            setSearchModalOpen(false);
                          }}
                          className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-[#D4FF3A]/40 hover:bg-white/[0.04] transition-all cursor-pointer flex items-center justify-between"
                        >
                          <div>
                            <div className="font-semibold text-white">{l.company} ({l.name})</div>
                            <div className="text-[10px] text-white/40">{l.service} • {l.email}</div>
                          </div>
                          <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-white/10 text-[#D4FF3A]">
                            {l.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Clients */}
                  {searchResults.clients.length > 0 && (
                    <div className="space-y-1">
                      <div className="text-[10px] font-mono text-white/40 uppercase tracking-wider flex items-center gap-1.5">
                        <Building2 className="w-3 h-3 text-[#D4FF3A]" />
                        <span>Clients ({searchResults.clients.length})</span>
                      </div>
                      {searchResults.clients.map((c) => (
                        <div
                          key={c.id}
                          onClick={() => {
                            navigate('/admin/clients');
                            setSearchModalOpen(false);
                          }}
                          className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-[#D4FF3A]/40 hover:bg-white/[0.04] transition-all cursor-pointer flex items-center justify-between"
                        >
                          <div>
                            <div className="font-semibold text-white">{c.company}</div>
                            <div className="text-[10px] text-white/40">{c.name} • {c.email}</div>
                          </div>
                          <span className="text-[10px] font-mono text-emerald-400">{c.totalValue}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tasks */}
                  {searchResults.tasks.length > 0 && (
                    <div className="space-y-1">
                      <div className="text-[10px] font-mono text-white/40 uppercase tracking-wider flex items-center gap-1.5">
                        <CheckSquare className="w-3 h-3 text-[#D4FF3A]" />
                        <span>Tasks ({searchResults.tasks.length})</span>
                      </div>
                      {searchResults.tasks.map((t) => (
                        <div
                          key={t.id}
                          onClick={() => {
                            navigate('/admin/tasks');
                            setSearchModalOpen(false);
                          }}
                          className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-[#D4FF3A]/40 hover:bg-white/[0.04] transition-all cursor-pointer flex items-center justify-between"
                        >
                          <div>
                            <div className="font-semibold text-white">{t.title}</div>
                            <div className="text-[10px] text-white/40">Assignee: {t.assignedToName || 'Unassigned'}</div>
                          </div>
                          <span className={`text-[10px] font-mono uppercase px-1.5 py-0.5 rounded ${
                            t.isCompleted ? 'bg-emerald-500/20 text-emerald-300' : 'bg-orange-500/20 text-orange-300'
                          }`}>
                            {t.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {searchResults.projects.length === 0 &&
                    searchResults.clients.length === 0 &&
                    searchResults.leads.length === 0 &&
                    searchResults.tasks.length === 0 && (
                      <div className="text-center py-8 text-white/40 italic font-mono text-[11px]">
                        No matching results found for "{searchQuery}".
                      </div>
                    )}
                </>
              )}
            </div>

            <div className="p-3 border-t border-white/[0.08] bg-black/40 flex items-center justify-between text-[10px] font-mono text-white/40">
              <span>Press ESC to exit</span>
              <span>Global Platform Index</span>
            </div>
          </div>
        </div>
      )}

      {/* AI Assistant Modal */}
      <AIAssistantModal isOpen={aiModalOpen} onClose={() => setAiModalOpen(false)} />
    </div>
  );
}
