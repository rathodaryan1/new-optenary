import {
  BarChart3,
  PieChart,
} from 'lucide-react';
import { usePlatform } from '../platformContext';
import PlatformLayout from '../components/PlatformLayout';

export default function AdminAnalyticsPage() {
  const { projects, leads, tasks, clients } = usePlatform();

  // 1. Calculations
  const wonLeads = leads.filter((l) => l.status === 'won');
  const conversionRate = leads.length > 0 ? Math.round((wonLeads.length / leads.length) * 100) : 0;

  const completedTasks = tasks.filter((t) => t.isCompleted);
  const taskCompletionRate = tasks.length > 0 ? Math.round((completedTasks.length / tasks.length) * 100) : 0;

  const activeProjects = projects.filter((p) => p.status === 'in_progress');

  // Service distribution
  const serviceMap: Record<string, number> = {};
  projects.forEach((p) => {
    serviceMap[p.service] = (serviceMap[p.service] || 0) + 1;
  });

  return (
    <PlatformLayout
      title="Operations & Business Analytics"
      subtitle="Section 17 Spec: Real metrics calculated strictly from active database records and sprint delivery logs."
    >
      <div className="space-y-6">
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-1">
            <span className="text-[11px] font-mono uppercase text-white/50 block">Lead Conversion</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold font-mono text-[#D4FF3A]">{conversionRate}%</span>
              <span className="text-xs text-white/40 font-mono">({wonLeads.length}/{leads.length} won)</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-1">
            <span className="text-[11px] font-mono uppercase text-white/50 block">Sprint Task Velocity</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold font-mono text-emerald-400">{taskCompletionRate}%</span>
              <span className="text-xs text-white/40 font-mono">Completed</span>
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
            <span className="text-[11px] font-mono uppercase text-white/50 block">Retained Clients</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold font-mono text-white">{clients.length}</span>
              <span className="text-xs text-white/40 font-mono">Accounts</span>
            </div>
          </div>
        </div>

        {/* Breakdown Grids */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Service Demand Breakdown */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-4">
            <div className="flex items-center gap-2">
              <PieChart className="w-4 h-4 text-[#D4FF3A]" />
              <h3 className="text-base font-bold text-white tracking-tight">Active Deliverables by Service</h3>
            </div>

            <div className="space-y-3 pt-2">
              {Object.entries(serviceMap).map(([service, count]) => {
                const pct = Math.round((count / projects.length) * 100);

                return (
                  <div key={service} className="space-y-1.5 text-xs">
                    <div className="flex justify-between font-mono">
                      <span className="text-white font-medium">{service}</span>
                      <span className="text-white/60">
                        {count} project ({pct}%)
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

          {/* Project Status Velocity Distribution */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-[#D4FF3A]" />
              <h3 className="text-base font-bold text-white tracking-tight">Project Health & Execution Status</h3>
            </div>

            <div className="space-y-4 pt-2">
              {projects.map((p) => (
                <div key={p.id} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-[#D4FF3A] uppercase">{p.companyName}</span>
                      <h4 className="font-semibold text-white mt-0.5">{p.title}</h4>
                    </div>
                    <span className="font-mono font-bold text-white">{p.progress}%</span>
                  </div>

                  <div className="w-full h-1.5 bg-white/[0.08] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#D4FF3A] to-emerald-400"
                      style={{ width: `${p.progress}%` }}
                    />
                  </div>

                  <div className="flex justify-between text-[11px] font-mono text-white/40 pt-1">
                    <span>Deadline: {p.targetDeliveryDate}</span>
                    <span className="uppercase">{p.status.replace('_', ' ')}</span>
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
