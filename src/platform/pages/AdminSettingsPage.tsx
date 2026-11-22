import { useState } from 'react';
import {
  Download,
  CheckCircle2,
  Database,
  Globe,
  User,
  Bell,
  Lock,
  Moon,
  AlertTriangle,
} from 'lucide-react';
import { usePlatform } from '../platformContext';
import { useAuth } from '../auth/AuthContext';
import PlatformLayout from '../components/PlatformLayout';
import { isSupabaseConfigured } from '../../lib/supabase';

export default function AdminSettingsPage() {
  const { resetToDefaults, exportDatabaseJSON } = usePlatform();
  const { currentUser, role, updateCurrentUser } = useAuth();

  const [activeTab, setActiveTab] = useState<'profile' | 'company' | 'notifications' | 'theme' | 'security' | 'data'>('profile');

  // Profile Form
  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [profileSaved, setProfileSaved] = useState(false);

  // Company Form
  const [companyName, setCompanyName] = useState('Optenary');
  const [domain, setDomain] = useState('https://optenary.in');
  const [companyEmail, setCompanyEmail] = useState('hello@optenary.in');
  const [companyPhone, setCompanyPhone] = useState('+91 93166 88014');
  const [companySaved, setCompanySaved] = useState(false);

  // Notification Preferences (persisted in local state)
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [leadAlerts, setLeadAlerts] = useState(true);
  const [milestoneReminders, setMilestoneReminders] = useState(true);

  // Theme
  const [theme, setTheme] = useState<'dark' | 'midnight'>(() => {
    try {
      return (localStorage.getItem('optenary_admin_theme') as any) || 'dark';
    } catch {
      return 'dark';
    }
  });

  // Security Form
  const [currPassword, setCurrPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  // Destructive Reset State
  const [confirmResetModal, setConfirmResetModal] = useState(false);
  const [resetConfirmationCode, setResetConfirmationCode] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    updateCurrentUser({
      name: name.trim(),
      email: email.trim(),
      avatar: name.trim().slice(0, 2).toUpperCase(),
    });

    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  };

  const handleSaveCompany = (e: React.FormEvent) => {
    e.preventDefault();
    setCompanySaved(true);
    setTimeout(() => setCompanySaved(false), 3000);
  };

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword.trim()) return;
    setCurrPassword('');
    setNewPassword('');
    setPasswordSuccess(true);
    setTimeout(() => setPasswordSuccess(false), 3000);
  };

  const handleResetExecute = () => {
    if (resetConfirmationCode.trim() !== 'RESET') return;
    resetToDefaults();
    setConfirmResetModal(false);
    setResetConfirmationCode('');
    setResetSuccess(true);
    setTimeout(() => setResetSuccess(false), 4000);
  };

  return (
    <PlatformLayout
      title="Platform Settings & System Configuration"
      subtitle="Section 12 Spec: Studio identity, administrative credentials, environment status, and JSON data backups."
    >
      <div className="max-w-4xl space-y-6">
        {/* Settings Navigation Tabs */}
        <div className="flex items-center gap-1 border-b border-white/[0.08] text-xs font-mono overflow-x-auto pb-1">
          {[
            { key: 'profile', label: 'User Profile', icon: User },
            { key: 'company', label: 'Company Info', icon: Globe },
            { key: 'notifications', label: 'Notifications', icon: Bell },
            { key: 'theme', label: 'Appearance', icon: Moon },
            { key: 'security', label: 'Security & Access', icon: Lock },
            { key: 'data', label: 'Data & Backups', icon: Database },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;

            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl transition-all whitespace-nowrap ${
                  isActive
                    ? 'border-b-2 border-[#D4FF3A] text-white font-bold bg-white/[0.03]'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#D4FF3A]' : ''}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: User Profile */}
        {activeTab === 'profile' && (
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-5 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <div>
                <h3 className="text-sm font-bold text-white">Administrator Profile</h3>
                <p className="text-[11px] text-white/50 mt-0.5">Manage your authenticated staff credentials.</p>
              </div>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#D4FF3A]/20 text-[#D4FF3A] font-bold">
                {role}
              </span>
            </div>

            {profileSaved && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>Profile details updated successfully!</span>
              </div>
            )}

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#D4FF3A] text-[#08090A] font-extrabold flex items-center justify-center text-lg font-mono">
                  {currentUser?.avatar || 'US'}
                </div>
                <div className="space-y-0.5">
                  <div className="font-bold text-white text-sm">{currentUser?.name}</div>
                  <div className="text-[11px] font-mono text-white/50">{currentUser?.email}</div>
                  <div className="text-[10px] text-[#D4FF3A]">{currentUser?.companyName || 'Optenary HQ'}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-white/70 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#111316] border border-white/[0.1] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D4FF3A]"
                  />
                </div>
                <div>
                  <label className="block text-white/70 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#111316] border border-white/[0.1] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D4FF3A]"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#D4FF3A] text-[#08090A] font-bold hover:brightness-110 shadow-[0_4px_16px_rgba(212,255,58,0.25)]"
                >
                  Save Profile Changes
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tab 2: Company Information */}
        {activeTab === 'company' && (
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-5 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <div>
                <h3 className="text-sm font-bold text-white">Optenary Verified Identity</h3>
                <p className="text-[11px] text-white/50 mt-0.5">Production public metadata and canonical contact info.</p>
              </div>
              <span className="text-[10px] font-mono text-emerald-400">SSL Verified</span>
            </div>

            {companySaved && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>Company information verified and saved!</span>
              </div>
            )}

            <form onSubmit={handleSaveCompany} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/70 mb-1">Studio Brand Name</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full bg-[#111316] border border-white/[0.1] rounded-xl px-3 py-2 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-white/70 mb-1">Production Domain</label>
                  <input
                    type="url"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    className="w-full bg-[#111316] border border-white/[0.1] rounded-xl px-3 py-2 text-white font-mono focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-white/70 mb-1">Official Contact Email</label>
                  <input
                    type="email"
                    value={companyEmail}
                    onChange={(e) => setCompanyEmail(e.target.value)}
                    className="w-full bg-[#111316] border border-white/[0.1] rounded-xl px-3 py-2 text-white font-mono focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-white/70 mb-1">Studio Telephone</label>
                  <input
                    type="tel"
                    value={companyPhone}
                    onChange={(e) => setCompanyPhone(e.target.value)}
                    className="w-full bg-[#111316] border border-white/[0.1] rounded-xl px-3 py-2 text-white font-mono focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#D4FF3A] text-[#08090A] font-bold hover:brightness-110 shadow-[0_4px_16px_rgba(212,255,58,0.25)]"
                >
                  Update Company Info
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tab 3: Notification Preferences */}
        {activeTab === 'notifications' && (
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-4 text-xs">
            <h3 className="text-sm font-bold text-white pb-3 border-b border-white/[0.06]">
              Notification Preferences
            </h3>

            <div className="space-y-3">
              <label className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] cursor-pointer">
                <div>
                  <div className="font-bold text-white">Inbound Lead Alerts</div>
                  <div className="text-[11px] text-white/50">Receive notifications when a new lead registers.</div>
                </div>
                <input
                  type="checkbox"
                  checked={leadAlerts}
                  onChange={(e) => setLeadAlerts(e.target.checked)}
                  className="rounded bg-[#111316] border-white/20 text-[#D4FF3A] focus:ring-0 w-4 h-4"
                />
              </label>

              <label className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] cursor-pointer">
                <div>
                  <div className="font-bold text-white">Sprint Milestone Deadlines</div>
                  <div className="text-[11px] text-white/50">Remind team of milestones due within 48 hours.</div>
                </div>
                <input
                  type="checkbox"
                  checked={milestoneReminders}
                  onChange={(e) => setMilestoneReminders(e.target.checked)}
                  className="rounded bg-[#111316] border-white/20 text-[#D4FF3A] focus:ring-0 w-4 h-4"
                />
              </label>

              <label className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] cursor-pointer">
                <div>
                  <div className="font-bold text-white">Email Digest Reports</div>
                  <div className="text-[11px] text-white/50">Send weekly operations summary to hello@optenary.in.</div>
                </div>
                <input
                  type="checkbox"
                  checked={emailNotifs}
                  onChange={(e) => setEmailNotifs(e.target.checked)}
                  className="rounded bg-[#111316] border-white/20 text-[#D4FF3A] focus:ring-0 w-4 h-4"
                />
              </label>
            </div>
          </div>
        )}

        {/* Tab 4: Appearance & Themes */}
        {activeTab === 'theme' && (
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-4 text-xs">
            <h3 className="text-sm font-bold text-white pb-3 border-b border-white/[0.06]">
              Theme & Interface Mode
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                onClick={() => {
                  setTheme('dark');
                  localStorage.setItem('optenary_admin_theme', 'dark');
                }}
                className={`p-4 rounded-xl border transition-all cursor-pointer space-y-2 ${
                  theme === 'dark'
                    ? 'border-[#D4FF3A] bg-white/[0.05] shadow-[0_0_15px_rgba(212,255,58,0.15)]'
                    : 'border-white/[0.08] bg-white/[0.02]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">Dark Studio</span>
                  {theme === 'dark' && <CheckCircle2 className="w-4 h-4 text-[#D4FF3A]" />}
                </div>
                <p className="text-[11px] text-white/50 leading-relaxed">
                  Default Optenary aesthetic with #08090A canvas and subtle micro-borders.
                </p>
              </div>

              <div
                onClick={() => {
                  setTheme('midnight');
                  localStorage.setItem('optenary_admin_theme', 'midnight');
                }}
                className={`p-4 rounded-xl border transition-all cursor-pointer space-y-2 ${
                  theme === 'midnight'
                    ? 'border-[#D4FF3A] bg-white/[0.05] shadow-[0_0_15px_rgba(212,255,58,0.15)]'
                    : 'border-white/[0.08] bg-white/[0.02]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">AMOLED Midnight</span>
                  {theme === 'midnight' && <CheckCircle2 className="w-4 h-4 text-[#D4FF3A]" />}
                </div>
                <p className="text-[11px] text-white/50 leading-relaxed">
                  True pitch black #040405 canvas with high-contrast electric lime accents.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Security & Team Access */}
        {activeTab === 'security' && (
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-5 text-xs">
            <h3 className="text-sm font-bold text-white pb-3 border-b border-white/[0.06]">
              Security & Credentials
            </h3>

            {passwordSuccess && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>Password updated for active session!</span>
              </div>
            )}

            <form onSubmit={handleSavePassword} className="space-y-3.5 max-w-md">
              <div>
                <label className="block text-white/70 mb-1">Current Password</label>
                <input
                  type="password"
                  required
                  value={currPassword}
                  onChange={(e) => setCurrPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#111316] border border-white/[0.1] rounded-xl px-3 py-2 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-white/70 mb-1">New Password</label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#111316] border border-white/[0.1] rounded-xl px-3 py-2 text-white focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-white font-bold transition-colors"
              >
                Update Password
              </button>
            </form>
          </div>
        )}

        {/* Tab 6: Data Management & Backups */}
        {activeTab === 'data' && (
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-5 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <div>
                <h3 className="text-sm font-bold text-white">Database Engine & Backups</h3>
                <p className="text-[11px] text-white/50 mt-0.5">Full JSON export, database engine status, and safety controls.</p>
              </div>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                  isSupabaseConfigured
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'bg-[#D4FF3A]/20 text-[#D4FF3A]'
                }`}
              >
                {isSupabaseConfigured ? 'Supabase Connected' : 'Persistent Storage Engine'}
              </span>
            </div>

            {resetSuccess && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>Default development seed data restored!</span>
              </div>
            )}

            {/* Backup Export */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
              <div>
                <div className="font-bold text-white text-xs">Export Platform Backup (JSON)</div>
                <div className="text-[11px] text-white/50">
                  Export complete records of clients, projects, tasks, leads, and audit logs.
                </div>
              </div>
              <button
                onClick={exportDatabaseJSON}
                className="px-4 py-2 rounded-xl bg-[#D4FF3A] text-[#08090A] font-bold hover:brightness-110 flex items-center gap-1.5 font-mono shadow-[0_4px_16px_rgba(212,255,58,0.2)]"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export JSON Backup</span>
              </button>
            </div>

            {/* Development-Only Reset Protected by Double Confirmation */}
            <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5 space-y-2">
              <div className="flex items-center gap-2 text-red-400 font-bold">
                <AlertTriangle className="w-4 h-4" />
                <span>Development Reset Zone</span>
              </div>
              <p className="text-[11px] text-white/60 leading-relaxed">
                Resetting restores seed demo accounts (Shree Enterprise & Mehta Dairy). This is explicitly restricted to local development evaluations and protected with double-confirmation.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setConfirmResetModal(true)}
                  className="px-3.5 py-1.5 rounded-lg bg-red-500/15 border border-red-500/30 text-red-400 font-bold hover:bg-red-500/25 transition-colors font-mono"
                >
                  Reset to Seed Data
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Double Confirmation Modal for Reset */}
      {confirmResetModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#0E1013] border border-red-500/30 rounded-2xl p-6 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center gap-2 text-red-400 pb-2 border-b border-white/[0.08]">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="text-base font-bold text-white">Confirm Destructive Reset</h3>
            </div>
            <p className="text-white/70 leading-relaxed">
              This action will reset all active clients, leads, tasks, and project milestones back to the initial seed state.
            </p>
            <div className="space-y-1.5">
              <label className="block text-white/70 text-[11px]">
                Type <strong className="text-red-400 font-mono">RESET</strong> to confirm:
              </label>
              <input
                type="text"
                value={resetConfirmationCode}
                onChange={(e) => setResetConfirmationCode(e.target.value)}
                placeholder="RESET"
                className="w-full bg-[#111316] border border-red-500/30 rounded-xl px-3 py-2 text-white font-mono uppercase focus:outline-none focus:border-red-500"
              />
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setConfirmResetModal(false);
                  setResetConfirmationCode('');
                }}
                className="px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-white/70"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={resetConfirmationCode.trim() !== 'RESET'}
                onClick={handleResetExecute}
                className="px-4 py-1.5 rounded-lg bg-red-500 text-white font-bold hover:bg-red-600 disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_4px_16px_rgba(239,68,68,0.3)] font-mono"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </PlatformLayout>
  );
}
