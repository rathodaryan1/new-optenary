import { Link } from 'react-router-dom';
import {
  FolderKanban,
  Clock,
  TrendingUp,
  ExternalLink,
  ChevronRight,
  Users2,
  Calendar,
  Building2,
  CheckSquare,
  AlertCircle,
  FileCheck2,
  ArrowUpRight,
} from 'lucide-react';
import { usePlatform } from '../platformContext';
import PlatformLayout from '../components/PlatformLayout';

export default function AdminDashboardPage() {
  const { projects, clients, leads, tasks, teamMembers, auditLogs, setCurrentClientId } = usePlatform();

  // Strict Data-Derived Statistics (Zero Fake/Fabricated Metrics)
  const activeProjects = projects.filter((p) => p.status === 'in_progress');
  const completedProjects = projects.filter((p) => p.status === 'completed');
  const pendingTasks = tasks.filter((t) => !t.isCompleted);
  const activeClients = clients.filter((c) => c.status === 'active');
  const urgentTasks = tasks.filter((t) => !t.isCompleted && (t.priority === 'urgent' || t.priority === 'high'));

  // Project Status Distribution
  const statusCounts = {
    planning: projects.filter((p) => p.status === 'planning').length,
    in_progress: projects.filter((p) => p.status === 'in_progress').length,
    review: projects.filter((p) => p.status === 'review').length,
    completed: projects.filter((p) => p.status === 'completed').length,
    on_hold: projects.filter((p) => p.status === 'on_hold').length,
  };

  // Recent Leads & Clients
  const recentLeads = [...leads].slice(0, 4);
  const recentClients = [...clients].slice(0, 4);

  // Recent Activity Feed
  const recentAudit = auditLogs && auditLogs.length > 0 ? auditLogs.slice(0, 6) : [];

  return (
    <PlatformLayout
      title="Optenary Operations Command Center"
      subtitle="Comprehensive internal agency overview: live sprint deliveries, client accounts, and pipeline metrics."
      actions={
        <div className="flex items-center gap-2">
          <Link
            to="/admin/projects"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.06] border border-white/[0.1] text-xs font-medium text-white hover:bg-white/[0.1] transition-colors"
          >
            <FolderKanban className="w-3.5 h-3.5" />
            <span>Projects</span>
          </Link>
          <Link
            to="/admin/leads"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#D4FF3A] text-[#08090A] text-xs font-bold tracking-tight hover:brightness-110 shadow-[0_4px_16px_rgba(212,255,58,0.25)] transition-all"
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Leads CRM</span>
          </Link>
        </div>
      }
    >
      <div className="space-y-8">
        {/* 6 Click-Through KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {/* Total Leads */}
          <Link
            to="/admin/leads"
            className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-[#D4FF3A]/40 hover:bg-white/[0.04] transition-all space-y-2 group block"
          >
            <div className="flex items-center justify-between text-white/40 group-hover:text-[#D4FF3A] transition-colors">
              <span className="text-[10px] font-mono uppercase tracking-wider">Total Leads</span>
              <TrendingUp className="w-4 h-4" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono group-hover:text-[#D4FF3A] transition-colors">
                {leads.length}
              </span>
              <span className="text-[11px] text-white/40 font-mono">Inbound</span>
            </div>
          </Link>

          {/* Active Clients */}
          <Link
            to="/admin/clients"
            className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-[#D4FF3A]/40 hover:bg-white/[0.04] transition-all space-y-2 group block"
          >
            <div className="flex items-center justify-between text-white/40 group-hover:text-[#D4FF3A] transition-colors">
              <span className="text-[10px] font-mono uppercase tracking-wider">Active Clients</span>
              <Building2 className="w-4 h-4" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono group-hover:text-[#D4FF3A] transition-colors">
                {activeClients.length}
              </span>
              <span className="text-[11px] text-white/40 font-mono">Retained</span>
            </div>
          </Link>

          {/* Active Projects */}
          <Link
            to="/admin/projects"
            className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-[#D4FF3A]/40 hover:bg-white/[0.04] transition-all space-y-2 group block"
          >
            <div className="flex items-center justify-between text-white/40 group-hover:text-[#D4FF3A] transition-colors">
              <span className="text-[10px] font-mono uppercase tracking-wider">Active Projects</span>
              <FolderKanban className="w-4 h-4 text-[#D4FF3A]" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#D4FF3A] font-mono">
                {activeProjects.length}
              </span>
              <span className="text-[11px] text-[#D4FF3A]/70 font-mono">In Sprints</span>
            </div>
          </Link>

          {/* Pending Tasks */}
          <Link
            to="/admin/tasks"
            className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-orange-400/40 hover:bg-white/[0.04] transition-all space-y-2 group block"
          >
            <div className="flex items-center justify-between text-white/40 group-hover:text-orange-400 transition-colors">
              <span className="text-[10px] font-mono uppercase tracking-wider">Pending Tasks</span>
              <CheckSquare className="w-4 h-4 text-orange-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-orange-400 font-mono">
                {pendingTasks.length}
              </span>
              <span className="text-[11px] text-white/40 font-mono">Open</span>
            </div>
          </Link>

          {/* Upcoming Deadlines */}
          <Link
            to="/admin/projects"
            className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-[#D4FF3A]/40 hover:bg-white/[0.04] transition-all space-y-2 group block"
          >
            <div className="flex items-center justify-between text-white/40 group-hover:text-white transition-colors">
              <span className="text-[10px] font-mono uppercase tracking-wider">Deadlines</span>
              <Calendar className="w-4 h-4" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                {projects.length}
              </span>
              <span className="text-[11px] text-white/40 font-mono">Milestones</span>
            </div>
          </Link>

          {/* Completed Projects */}
          <Link
            to="/admin/projects"
            className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-emerald-400/40 hover:bg-white/[0.04] transition-all space-y-2 group block"
          >
            <div className="flex items-center justify-between text-white/40 group-hover:text-emerald-400 transition-colors">
              <span className="text-[10px] font-mono uppercase tracking-wider">Delivered</span>
              <FileCheck2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">
                {completedProjects.length}
              </span>
              <span className="text-[11px] text-emerald-400/70 font-mono">Done</span>
            </div>
          </Link>
        </div>

        {/* Section 1: Project Status Distribution */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-4">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white uppercase font-mono tracking-wider">
                1. Project Status Distribution
              </span>
              <span className="px-2 py-0.5 rounded-full bg-white/[0.06] text-[10px] font-mono text-white/60">
                {projects.length} Registered
              </span>
            </div>
            <Link to="/admin/projects" className="text-[11px] text-[#D4FF3A] hover:underline flex items-center gap-1 font-mono">
              <span>View All</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="w-full h-3 bg-white/[0.06] rounded-full overflow-hidden flex">
            {statusCounts.in_progress > 0 && (
              <div
                className="h-full bg-[#D4FF3A]"
                style={{ width: `${(statusCounts.in_progress / projects.length) * 100}%` }}
                title={`In Progress: ${statusCounts.in_progress}`}
              />
            )}
            {statusCounts.completed > 0 && (
              <div
                className="h-full bg-emerald-500"
                style={{ width: `${(statusCounts.completed / projects.length) * 100}%` }}
                title={`Completed: ${statusCounts.completed}`}
              />
            )}
            {statusCounts.planning > 0 && (
              <div
                className="h-full bg-blue-500"
                style={{ width: `${(statusCounts.planning / projects.length) * 100}%` }}
                title={`Planning: ${statusCounts.planning}`}
              />
            )}
            {statusCounts.review > 0 && (
              <div
                className="h-full bg-purple-500"
                style={{ width: `${(statusCounts.review / projects.length) * 100}%` }}
                title={`Review: ${statusCounts.review}`}
              />
            )}
            {statusCounts.on_hold > 0 && (
              <div
                className="h-full bg-yellow-500"
                style={{ width: `${(statusCounts.on_hold / projects.length) * 100}%` }}
                title={`On Hold: ${statusCounts.on_hold}`}
              />
            )}
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-white/60 pt-1">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D4FF3A]" />
              <span>In Progress ({statusCounts.in_progress})</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>Completed ({statusCounts.completed})</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              <span>Planning ({statusCounts.planning})</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
              <span>Review ({statusCounts.review})</span>
            </span>
            {statusCounts.on_hold > 0 && (
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <span>On Hold ({statusCounts.on_hold})</span>
              </span>
            )}
          </div>
        </div>

        {/* Section 2 & 3: Activity Timeline & Upcoming Deadlines */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Section 2: Recent Activity Timeline */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <span className="font-bold text-white text-xs uppercase font-mono tracking-wider">
                2. Operations Activity Timeline
              </span>
              <span className="text-[10px] font-mono text-white/40">Real Audit Log</span>
            </div>

            <div className="space-y-3">
              {recentAudit.length === 0 ? (
                <div className="py-8 text-center text-white/40 italic font-mono text-xs">
                  No operations logs recorded yet.
                </div>
              ) : (
                recentAudit.map((log) => (
                  <div key={log.id} className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] flex items-start justify-between gap-3 text-xs">
                    <div className="space-y-0.5">
                      <div className="font-semibold text-white">{log.action}</div>
                      <p className="text-[11px] text-white/60 leading-relaxed">{log.details}</p>
                      <div className="text-[10px] font-mono text-white/40">By {log.actor}</div>
                    </div>
                    <span className="text-[10px] font-mono text-white/40 whitespace-nowrap">{log.timestamp}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Section 3: Upcoming Deadlines & Target Milestones */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <span className="font-bold text-white text-xs uppercase font-mono tracking-wider">
                3. Upcoming Project Deadlines
              </span>
              <Clock className="w-4 h-4 text-[#D4FF3A]" />
            </div>

            <div className="space-y-3">
              {projects.slice(0, 4).map((p) => (
                <div key={p.id} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-semibold text-white">{p.companyName}</h4>
                    <p className="text-[11px] text-white/50">{p.title}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <div className="w-24 h-1.5 bg-white/[0.08] rounded-full overflow-hidden">
                        <div className="h-full bg-[#D4FF3A]" style={{ width: `${p.progress}%` }} />
                      </div>
                      <span className="text-[10px] font-mono text-[#D4FF3A]">{p.progress}%</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono uppercase text-white/40 block">Target Deadline</span>
                    <span className="font-mono text-xs font-bold text-white">{p.targetDeliveryDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 4 & 5: Recent Leads & Recent Clients */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Section 4: Recent Leads */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#D4FF3A]" />
                <span className="font-bold text-white text-xs uppercase font-mono tracking-wider">
                  4. Recent Inbound Leads
                </span>
              </div>
              <Link to="/admin/leads" className="text-[11px] text-[#D4FF3A] hover:underline flex items-center gap-1 font-mono">
                <span>CRM Pipeline</span>
                <ChevronRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="space-y-2.5">
              {recentLeads.length === 0 ? (
                <div className="py-8 text-center text-white/40 italic font-mono text-xs">No active leads.</div>
              ) : (
                recentLeads.map((l) => (
                  <div
                    key={l.id}
                    className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold text-white">{l.company}</div>
                      <div className="text-[11px] text-white/50">{l.name} • {l.service}</div>
                    </div>
                    <div className="text-right space-y-1">
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/[0.06] text-[#D4FF3A]">
                        {l.status}
                      </span>
                      <div className="text-[10px] font-mono text-white/40">{l.budget}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Section 5: Recent Clients */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#D4FF3A]" />
                <span className="font-bold text-white text-xs uppercase font-mono tracking-wider">
                  5. Retained Client Accounts
                </span>
              </div>
              <Link to="/admin/clients" className="text-[11px] text-[#D4FF3A] hover:underline flex items-center gap-1 font-mono">
                <span>All Accounts</span>
                <ChevronRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="space-y-2.5">
              {recentClients.length === 0 ? (
                <div className="py-8 text-center text-white/40 italic font-mono text-xs">No client accounts.</div>
              ) : (
                recentClients.map((c) => (
                  <div
                    key={c.id}
                    className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold text-white">{c.company}</div>
                      <div className="text-[11px] text-white/50">{c.name} • {c.email}</div>
                    </div>
                    <div className="text-right space-y-1">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">
                        {c.totalValue}
                      </span>
                      <div className="text-[10px] font-mono text-white/40">{c.activeProjectsCount} Project(s)</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Section 6: Active Project Table */}
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              <FolderKanban className="w-4 h-4 text-[#D4FF3A]" />
              <span className="font-bold text-white text-xs uppercase font-mono tracking-wider">
                6. Active Engineering Projects
              </span>
            </div>
            <Link to="/admin/projects" className="text-[11px] text-[#D4FF3A] hover:underline flex items-center gap-1 font-mono">
              <span>Manage Projects</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/[0.02] border-b border-white/[0.06] text-white/50 font-mono text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="py-2.5 px-3">Company / Project</th>
                  <th className="py-2.5 px-3">Service Category</th>
                  <th className="py-2.5 px-3">Milestone Progress</th>
                  <th className="py-2.5 px-3">Target Due</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Portal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {projects.map((p) => (
                  <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-3">
                      <div className="font-bold text-white">{p.companyName}</div>
                      <div className="text-[11px] text-white/50">{p.title}</div>
                    </td>
                    <td className="py-3 px-3 font-mono text-white/70">{p.service}</td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-1.5 bg-white/[0.08] rounded-full overflow-hidden">
                          <div className="h-full bg-[#D4FF3A]" style={{ width: `${p.progress}%` }} />
                        </div>
                        <span className="font-mono text-white font-bold">{p.progress}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 font-mono text-[#D4FF3A]">{p.targetDeliveryDate}</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-white/[0.06] text-white/80">
                        {p.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => setCurrentClientId(p.clientId)}
                        className="p-1 rounded hover:bg-white/[0.08] text-white/60 hover:text-white"
                        title="Preview client view"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 7 & 8: Team Workload & Tasks Requiring Attention */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Section 7: Team Workload */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <Users2 className="w-4 h-4 text-[#D4FF3A]" />
                <span className="font-bold text-white text-xs uppercase font-mono tracking-wider">
                  7. Studio Team Workload & Capacity
                </span>
              </div>
              <Link to="/admin/team" className="text-[11px] text-[#D4FF3A] hover:underline flex items-center gap-1 font-mono">
                <span>Team Board</span>
                <ChevronRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="space-y-3">
              {teamMembers.map((m) => {
                const memberTasks = tasks.filter((t) => t.assignedTo === m.id && !t.isCompleted);
                const capacityPct = Math.min(Math.round((memberTasks.length / 4) * 100), 100);

                return (
                  <div key={m.id} className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-bold text-white">{m.name}</span>
                        <span className="text-[11px] text-white/40 ml-2 font-mono">{m.roleTitle}</span>
                      </div>
                      <span className="text-[10px] font-mono text-[#D4FF3A]">
                        {memberTasks.length} active task(s)
                      </span>
                    </div>

                    <div className="w-full h-1.5 bg-white/[0.08] rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          capacityPct >= 75 ? 'bg-orange-400' : 'bg-[#D4FF3A]'
                        }`}
                        style={{ width: `${capacityPct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 8: Tasks Requiring Attention */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-orange-400" />
                <span className="font-bold text-white text-xs uppercase font-mono tracking-wider">
                  8. Sprints & Tasks Requiring Attention
                </span>
              </div>
              <Link to="/admin/tasks" className="text-[11px] text-orange-400 hover:underline flex items-center gap-1 font-mono">
                <span>Sprint Board</span>
                <ChevronRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="space-y-2.5">
              {urgentTasks.length === 0 ? (
                <div className="py-8 text-center text-white/40 italic font-mono text-xs">
                  Zero critical blockers or overdue sprint items.
                </div>
              ) : (
                urgentTasks.map((t) => (
                  <div
                    key={t.id}
                    className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-semibold text-white">{t.title}</div>
                      <div className="text-[10px] text-white/40 font-mono">
                        Assignee: {t.assignedToName || 'Unassigned'} • Due: {t.dueDate || 'Sprint End'}
                      </div>
                    </div>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-orange-500/20 text-orange-300 font-bold">
                      {t.priority}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </PlatformLayout>
  );
}
