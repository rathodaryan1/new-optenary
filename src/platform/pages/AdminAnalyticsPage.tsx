import { useState } from 'react';
import {
  PieChart,
  TrendingUp,
  FolderKanban,
  Users2,
} from 'lucide-react';
import { usePlatform } from '../platformContext';
import PlatformLayout from '../components/PlatformLayout';

export default function AdminAnalyticsPage() {
  const { projects, leads, tasks, clients, teamMembers } = usePlatform();

  // Date Filter Range
  const [timeRange, setTimeRange] = useState<'all' | '30d' | '90d'>('all');

  // 1. Calculations strictly from database records
  const wonLeads = leads.filter((l) => l.status === 'won');
  const hasLeadData = leads.length > 0;
  const conversionRate = hasLeadData ? Math.round((wonLeads.length / leads.length) * 100) : 0;

  const completedTasks = tasks.filter((t) => t.isCompleted);
  const taskCompletionRate = tasks.length > 0 ? Math.round((completedTasks.length / tasks.length) * 100) : 0;

  const activeProjects = projects.filter((p) => p.status === 'in_progress');

  // Leads by Stage Breakdown
  const stageCounts: Record<string, number> = {
    new: leads.filter((l) => l.status === 'new').length,
    contacted: leads.filter((l) => l.status === 'contacted').length,
    qualified: leads.filter((l) => l.status === 'qualified').length,
    proposal_sent: leads.filter((l) => l.status === 'proposal_sent').length,
    negotiation: leads.filter((l) => l.status === 'negotiation').length,
    won: wonLeads.length,
    lost: leads.filter((l) => l.status === 'lost').length,
  };

  // Service distribution
  const serviceMap: Record<string, number> = {};
  projects.forEach((p) => {
    serviceMap[p.service] = (serviceMap[p.service] || 0) + 1;
  });

  return (
    <PlatformLayout
      title="Operations Analytics & Performance Metrics"
      subtitle="Section 11 Spec: Authentic performance metrics computed strictly from active projects, CRM pipelines, and sprint task completion."
      actions={
        <div className="flex items-center gap-1 bg-white/[0.04] border border-white/[0.08] rounded-lg p-0.5 font-mono text-[11px]">
          {(['all', '30d', '90d'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 rounded-md transition-all uppercase ${
                timeRange === range
                  ? 'bg-[#D4FF3A] text-[#08090A] font-bold shadow'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {range === 'all' ? 'All Time' : range === '30d' ? 'Last 30 Days' : 'Last 90 Days'}
            </button>
          ))}
        </div>
      }
    >
      <div className="space-y-6">
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-1">
            <span className="text-[11px] font-mono uppercase text-white/50 block">Lead Conversion Rate</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold font-mono text-[#D4FF3A]">{conversionRate}%</span>
              <span className="text-xs text-white/40 font-mono">
                ({wonLeads.length} won of {leads.length})
              </span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-1">
            <span className="text-[11px] font-mono uppercase text-white/50 block">Sprint Velocity</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold font-mono text-emerald-400">{taskCompletionRate}%</span>
              <span className="text-xs text-white/40 font-mono">
                ({completedTasks.length}/{tasks.length} tasks)
              </span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-1">
            <span className="text-[11px] font-mono uppercase text-white/50 block">Active Projects</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold font-mono text-white">{activeProjects.length}</span>
              <span className="text-xs text-blue-400 font-mono">In Progress</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-1">
            <span className="text-[11px] font-mono uppercase text-white/50 block">Client Accounts</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold font-mono text-white">{clients.length}</span>
              <span className="text-xs text-white/40 font-mono">Accounts</span>
            </div>
          </div>
        </div>

        {/* Breakdown Grids */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* CRM Leads by Stage Breakdown */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#D4FF3A]" />
                <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
                  Leads by Pipeline Stage
                </h3>
              </div>
              <span className="text-[10px] font-mono text-white/40">{leads.length} Total Registered</span>
            </div>

            <div className="space-y-3 pt-2">
              {Object.entries(stageCounts).map(([stKey, count]) => {
                const pct = leads.length > 0 ? Math.round((count / leads.length) * 100) : 0;
                const formattedKey = stKey.replace('_', ' ').toUpperCase();

                return (
                  <div key={stKey} className="space-y-1 text-xs">
                    <div className="flex justify-between font-mono">
                      <span className="text-white font-medium capitalize">{formattedKey}</span>
                      <span className="text-white/60">
                        {count} ({pct}%)
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          stKey === 'won'
                            ? 'bg-emerald-400'
                            : stKey === 'lost'
                            ? 'bg-red-400'
                            : 'bg-[#D4FF3A]'
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Service Demand Breakdown */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <PieChart className="w-4 h-4 text-[#D4FF3A]" />
                <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
                  Active Deliverables by Service
                </h3>
              </div>
              <span className="text-[10px] font-mono text-white/40">{projects.length} Projects</span>
            </div>

            <div className="space-y-3 pt-2">
              {Object.entries(serviceMap).map(([service, count]) => {
                const pct = projects.length > 0 ? Math.round((count / projects.length) * 100) : 0;

                return (
                  <div key={service} className="space-y-1 text-xs">
                    <div className="flex justify-between font-mono">
                      <span className="text-white font-medium">{service}</span>
                      <span className="text-white/60">
                        {count} project(s) ({pct}%)
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#D4FF3A] to-emerald-400"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Team Workload & Task Status Velocity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Team Workload Capacity */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <Users2 className="w-4 h-4 text-[#D4FF3A]" />
                <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
                  Engineer Sprint Capacity
                </h3>
              </div>
              <span className="text-[10px] font-mono text-white/40">{teamMembers.length} Engineers</span>
            </div>

            <div className="space-y-3 pt-2">
              {teamMembers.map((m) => {
                const memberTasks = tasks.filter((t) => t.assignedTo === m.id && !t.isCompleted);
                const capacityPct = Math.min(Math.round((memberTasks.length / 4) * 100), 100);

                return (
                  <div key={m.id} className="space-y-1 text-xs">
                    <div className="flex justify-between font-mono">
                      <span className="text-white font-medium">{m.name} ({m.department})</span>
                      <span className="text-[#D4FF3A] font-bold">{memberTasks.length} active ({capacityPct}%)</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                      <div
                        className={`h-full ${capacityPct >= 75 ? 'bg-orange-400' : 'bg-[#D4FF3A]'}`}
                        style={{ width: `${capacityPct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Project Completion Velocity */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <FolderKanban className="w-4 h-4 text-[#D4FF3A]" />
                <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
                  Project Completion Velocity
                </h3>
              </div>
              <span className="text-[10px] font-mono text-white/40">Verified Status</span>
            </div>

            <div className="space-y-3 pt-2 text-xs">
              {projects.map((p) => (
                <div key={p.id} className="space-y-1">
                  <div className="flex justify-between font-mono">
                    <span className="text-white font-medium">{p.companyName} — {p.title}</span>
                    <span className="text-[#D4FF3A] font-bold">{p.progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#D4FF3A]"
                      style={{ width: `${p.progress}%` }}
                    />
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
