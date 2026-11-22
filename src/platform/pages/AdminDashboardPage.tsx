import { Link } from 'react-router-dom';
import {
  FolderKanban,
  Clock,
  TrendingUp,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { usePlatform } from '../platformContext';
import PlatformLayout from '../components/PlatformLayout';

export default function AdminDashboardPage() {
  const { projects, clients, leads, setCurrentClientId, setRole } = usePlatform();

  const activeProjects = projects.filter((p) => p.status === 'active');
  const completedProjects = projects.filter((p) => p.status === 'completed');
  const pendingMilestonesCount = projects.reduce(
    (acc, p) => acc + p.milestones.filter((m) => m.status !== 'completed').length,
    0
  );

  return (
    <PlatformLayout
      title="Optenary Operations Command"
      subtitle="Section 08 Spec: Centralized oversight for all active projects, client milestones, and revenue pipeline."
      actions={
        <div className="flex items-center gap-2">
          <Link
            to="/admin/projects"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.06] border border-white/[0.1] text-xs font-medium text-white hover:bg-white/[0.1] transition-colors"
          >
            <FolderKanban className="w-3.5 h-3.5" />
            <span>Manage Projects</span>
          </Link>
          <Link
            to="/admin/crm"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#D4FF3A] text-[#08090A] text-xs font-bold tracking-tight hover:brightness-110 shadow-[0_4px_16px_rgba(212,255,58,0.25)] transition-all"
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Leads & Proposals</span>
          </Link>
        </div>
      }
    >
      <div className="space-y-8">
        {/* KPI Dashboard Metrics Cards (Section 08 Spec) */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
          <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-white/50 block">Active Projects</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">{activeProjects.length}</span>
              <span className="text-xs text-emerald-400 font-mono">In Progress</span>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-white/50 block">Active Clients</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">{clients.length}</span>
              <span className="text-xs text-white/40 font-mono">Retained</span>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-white/50 block">Pending Milestones</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">{pendingMilestonesCount}</span>
              <span className="text-xs text-[#D4FF3A] font-mono">Sprints</span>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-white/50 block">Completed Projects</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">{completedProjects.length + 31}</span>
              <span className="text-xs text-emerald-400 font-mono">100% On-Time</span>
            </div>
          </div>

          <div className="col-span-2 lg:col-span-1 p-4 sm:p-5 rounded-2xl bg-[#D4FF3A]/[0.04] border border-[#D4FF3A]/25 space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#D4FF3A] block">Pipeline Value</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">₹2.8L+</span>
              <span className="text-xs text-[#D4FF3A] font-mono">Q4 Active</span>
            </div>
          </div>
        </div>

        {/* Active Projects Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">Active Client Deliverables</h3>
              <p className="text-xs text-white/50">Live status across engineering, design systems, and QA.</p>
            </div>
            <Link
              to="/admin/projects"
              className="text-xs text-[#D4FF3A] font-medium flex items-center gap-1 hover:underline"
            >
              <span>View all projects</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.15] transition-all space-y-4 relative group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-[#D4FF3A] uppercase tracking-wider">
                        {proj.companyName}
                      </span>
                      <span className="text-white/30">•</span>
                      <span className="text-xs text-white/60">{proj.clientName}</span>
                    </div>
                    <h4 className="text-base font-bold text-white tracking-tight mt-1 group-hover:text-[#D4FF3A] transition-colors">
                      {proj.title}
                    </h4>
                  </div>

                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider font-bold flex-none ${
                      proj.status === 'active'
                        ? 'bg-[#D4FF3A]/20 text-[#D4FF3A] border border-[#D4FF3A]/40'
                        : proj.status === 'completed'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-white/10 text-white/70'
                    }`}
                  >
                    {proj.status}
                  </span>
                </div>

                {/* Progress bar */}
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-white/60">Execution Progress</span>
                    <span className="text-white font-bold">{proj.progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/[0.08] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#D4FF3A] to-emerald-400 transition-all duration-500"
                      style={{ width: `${proj.progress}%` }}
                    />
                  </div>
                </div>

                {/* Footer metadata & direct actions */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/[0.06] text-xs">
                  <div className="flex items-center gap-2 text-white/50 font-mono text-[11px]">
                    <Clock className="w-3.5 h-3.5 text-[#D4FF3A]" />
                    <span>Target: {proj.targetDeliveryDate}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* View in Portal as this client */}
                    <button
                      onClick={() => {
                        setCurrentClientId(proj.clientId);
                        setRole('client');
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/[0.06] hover:bg-white/[0.12] text-white/80 hover:text-white transition-colors text-[11px]"
                      title="Preview client view"
                    >
                      <span>Client Portal</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>

                    <Link
                      to={`/admin/projects`}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#D4FF3A] text-[#08090A] font-bold text-[11px]"
                    >
                      <span>Manage</span>
                      <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lead Funnel Snapshot & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Operations Activity */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-base font-bold text-white tracking-tight">Recent Historical Operations Log</h3>
            <div className="space-y-3">
              {projects.flatMap((p) => p.timeline).slice(0, 5).map((ev) => (
                <div
                  key={ev.id}
                  className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-3.5"
                >
                  <div className="w-2 h-2 rounded-full bg-[#D4FF3A] mt-1.5 flex-none" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h5 className="text-xs font-bold text-white">{ev.title}</h5>
                      <span className="text-[11px] font-mono text-white/40">{ev.date}</span>
                    </div>
                    <p className="text-xs text-white/60 mt-0.5">{ev.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick CRM Snapshot */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white tracking-tight">Active Leads Pipeline</h3>
              <Link to="/admin/crm" className="text-xs text-[#D4FF3A] hover:underline">
                View CRM
              </Link>
            </div>

            <div className="space-y-3">
              {leads.slice(0, 3).map((lead) => (
                <div key={lead.id} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{lead.company}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-white/10 text-white/80">
                      {lead.status.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-xs text-white/60 truncate">{lead.notes}</p>
                  <div className="flex justify-between items-center text-[11px] font-mono text-white/50 pt-1 border-t border-white/[0.04]">
                    <span>Budget: {lead.budget}</span>
                    <span className="text-white/80">{lead.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PlatformLayout>
  );
}
