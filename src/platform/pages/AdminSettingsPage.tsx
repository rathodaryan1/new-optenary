import { useState } from 'react';
import {
  Settings,
  ShieldCheck,
  Download,
  RotateCcw,
  CheckCircle2,
  Database,
  Globe,
  Mail,
  Phone,
} from 'lucide-react';
import { usePlatform } from '../platformContext';
import { useAuth } from '../auth/AuthContext';
import PlatformLayout from '../components/PlatformLayout';
import { isSupabaseConfigured, SUPABASE_URL } from '../../lib/supabase';

export default function AdminSettingsPage() {
  const { resetToDefaults, exportDatabaseJSON } = usePlatform();
  const { currentUser, role } = useAuth();

  const [confirmReset, setConfirmReset] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleReset = () => {
    resetToDefaults();
    setConfirmReset(false);
    setResetSuccess(true);
    setTimeout(() => setResetSuccess(false), 3000);
  };

  return (
    <PlatformLayout
      title="Platform Settings & System Configuration"
      subtitle="Manage role permissions, data backups, and environment connectivity."
    >
      <div className="max-w-4xl space-y-6">
        {/* Authenticated User Session Card */}
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-white/[0.06]">
            <Settings className="w-4 h-4 text-[#D4FF3A]" />
            <h3 className="text-base font-bold text-white tracking-tight">Active User Profile & Role</h3>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="w-12 h-12 rounded-xl bg-[#D4FF3A] text-[#08090A] font-extrabold flex items-center justify-center text-base">
              {currentUser?.avatar || 'US'}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm">{currentUser?.name}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-[#D4FF3A]/20 text-[#D4FF3A] font-bold">
                  {role}
                </span>
              </div>
              <div className="text-white/50 font-mono">{currentUser?.email}</div>
              <div className="text-white/40">{currentUser?.companyName || 'Optenary Operations'}</div>
            </div>
          </div>
        </div>

        {/* Studio Branding & Metadata Verification */}
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-white/[0.06]">
            <Globe className="w-4 h-4 text-[#D4FF3A]" />
            <h3 className="text-base font-bold text-white tracking-tight">Optenary Verified Public Metadata</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
              <span className="text-[10px] font-mono uppercase text-white/40 block">Studio Name & Tagline</span>
              <div className="font-semibold text-white">Optenary</div>
              <div className="text-white/60">Where Technology Evolves</div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
              <span className="text-[10px] font-mono uppercase text-white/40 block">Production Domain</span>
              <div className="font-semibold text-[#D4FF3A] font-mono">https://optenary.in</div>
              <div className="text-white/60">Verified Canonical SSL</div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
              <span className="text-[10px] font-mono uppercase text-white/40 block">Official Contact Email</span>
              <div className="font-semibold text-white font-mono flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#D4FF3A]" />
                <span>hello@optenary.in</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
              <span className="text-[10px] font-mono uppercase text-white/40 block">Studio Telephone</span>
              <div className="font-semibold text-white font-mono flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#D4FF3A]" />
                <span>+91 93166 88014</span>
              </div>
            </div>
          </div>
        </div>

        {/* Database & Cloud State */}
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-white/[0.06]">
            <Database className="w-4 h-4 text-[#D4FF3A]" />
            <h3 className="text-base font-bold text-white tracking-tight">Database & Persistence Layer</h3>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-start justify-between gap-4 text-xs">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white">PostgreSQL / Supabase Engine</span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                    isSupabaseConfigured
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-[#D4FF3A]/20 text-[#D4FF3A]'
                  }`}
                >
                  {isSupabaseConfigured ? 'Connected to Cloud' : 'Persistent Browser Engine'}
                </span>
              </div>
              <p className="text-white/60 text-[11px] leading-relaxed">
                {isSupabaseConfigured
                  ? `Connected to Supabase endpoint: ${SUPABASE_URL}`
                  : 'Operating via isolated persistent browser storage engine with full CRUD and zero data loss across reloads.'}
              </p>
            </div>
          </div>
        </div>

        {/* Backup & Data Reset Section */}
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-white/[0.06]">
            <ShieldCheck className="w-4 h-4 text-[#D4FF3A]" />
            <h3 className="text-base font-bold text-white tracking-tight">Data Management & Disaster Recovery</h3>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div>
              <h4 className="font-semibold text-white">Full Database JSON Export</h4>
              <p className="text-white/50 text-[11px]">Download all projects, clients, leads, tasks, and updates in structured JSON.</p>
            </div>
            <button
              onClick={exportDatabaseJSON}
              className="px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white font-semibold flex items-center gap-2 transition-all flex-none"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export JSON Backup</span>
            </button>
          </div>

          <div className="pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div>
              <h4 className="font-semibold text-red-400">Reset to Clean Demo Records</h4>
              <p className="text-white/50 text-[11px]">Restores default accounts (Shree Enterprise, Mehta Dairy, etc.) and clears temporary records.</p>
            </div>
            {!confirmReset ? (
              <button
                onClick={() => setConfirmReset(true)}
                className="px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 font-semibold flex items-center gap-2 transition-all flex-none"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Demo State</span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setConfirmReset(false)}
                  className="px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReset}
                  className="px-4 py-1.5 rounded-lg bg-red-500 hover:bg-red-600 text-white font-bold"
                >
                  Confirm Reset
                </button>
              </div>
            )}
          </div>

          {resetSuccess && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Database successfully restored to clean demo state.</span>
            </div>
          )}
        </div>
      </div>
    </PlatformLayout>
  );
}
