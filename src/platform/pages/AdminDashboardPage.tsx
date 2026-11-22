import { Link } from 'react-router-dom';
import {
  FolderKanban,
  Clock,
  TrendingUp,
  ExternalLink,
  ChevronRight,
  Users2,
  Calendar,
} from 'lucide-react';
import { usePlatform } from '../platformContext';
import PlatformLayout from '../components/PlatformLayout';

export default function AdminDashboardPage() {
  const { projects, clients, leads, tasks, teamMembers, setCurrentClientId } = usePlatform();

  // Strict Data-Derived Statistics (No Hardcoded numbers)
  const activeProjects = projects.filter((p) => p.status === 'in_progress');
  const completedProjects = projects.filter((p) => p.status === 'completed');
  const pendingTasks = tasks.filter((t) => !t.isCompleted);
  const activeClients = clients.filter((c) => c.status === 'active');

  // Status Distribution
  const statusCounts = {
    planning: projects.filter((p) => p.status === 'planning').length,
    in_progress: projects.filter((p) => p.status === 'in_progress').length,
    review: projects.filter((p) => p.status === 'review').length,
    completed: projects.filter((p) => p.status === 'completed').length,
    on_hold: projects.filter((p) => p.status === 'on_hold').length,
  };

  // Recent Activity Feed
  const recentActivity = projects
    .flatMap((p) =>
      p.timeline.map((ev) => ({
        ...ev,
        companyName: p.companyName,
      }))
    )
    .slice(0, 6);

  return (
    <PlatformLayout
      title="Optenary Operations Command Center"
      subtitle="Section 08 Spec: Centralized oversight for active projects, sprint tasks, and client accounts."
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
        {/* KPI Dashboard Metrics Cards (Strictly Data-Derived) */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4">
          <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-1">
            <span className="text-[10px] font-mono uppercase text-white/50 block">Total Leads</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">{leads.length}</span>
              <span className="text-xs text-white/40 font-mono">Inbound</span>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-1">
            <span className="text-[10px] font-mono uppercase text-white/50 block">Active Clients</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">{activeClients.length}</span>
              <span className="text-xs text-white/40 font-mono">Retained</span>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-1">
            <span className="text-[10px] font-mono uppercase text-white/50 block">Active Projects</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#D4FF3A] font-mono">{activeProjects.length}</span>
              <span className="text-xs text-[#D4FF3A] font-mono">Live</span>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-1">
            <span className="text-[10px] font-mono uppercase text-white/50 block">Pending Tasks</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-orange-400 font-mono">{pendingTasks.length}</span>
              <span className="text-xs text-white/40 font-mono">Sprints</span>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-1">
            <span className="text-[10px] font-mono uppercase text-white/50 block">Upcoming Deadlines</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">{projects.length}</span>
              <span className="text-xs text-white/40 font-mono">Milestones</span>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-1">
            <span className="text-[10px] font-mono uppercase text-white/50 block">Completed Projects</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">{completedProjects.length}</span>
              <span className="text-xs text-emerald-400 font-mono">Delivered</span>
            </div>
          </div>
        </div>

        {/* Project Status Distribution Bar */}
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-white uppercase font-mono tracking-wider">Project Status Distribution</span>
            <span className="text-white/40 font-mono">{projects.length} Total Registered Projects</span>
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
                title={`In Review: ${statusCounts.review}`}
              />
            )}
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono text-white/60 pt-1">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#D4FF3A]" /> In Progress ({statusCounts.in_progress})
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" /> Completed ({statusCounts.completed})
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500" /> Planning ({statusCounts.planning})
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-500" /> Review ({statusCounts.review})
            </span>
          </div>
        </div>

        {/* Active Client Deliverables */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">Active Client Deliverables</h3>
              <p className="text-xs text-white/50">Live status calculated from active milestones.</p>
            </div>
            <Link to="/admin/projects" className="text-xs text-[#D4FF3A] font-medium flex items-center gap-1 hover:underline">
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
                      proj.status === 'in_progress'
                        ? 'bg-[#D4FF3A]/20 text-[#D4FF3A] border border-[#D4FF3A]/40'
                        : proj.status === 'completed'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-white/10 text-white/70'
                    }`}
                  >
                    {proj.status.replace('_', ' ')}
                  </span>
                </div>

                {/* Progress bar */}
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-white/60">Calculated Milestone Progress</span>
                    <span className="text-white font-bold">{proj.progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/[0.08] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#D4FF3A] to-emerald-400 transition-all duration-500"
                      style={{ width: `${proj.progress}%` }}
                    />
                  </div>
                </div>

                {/* Metadata & Actions */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/[0.06] text-xs">
                  <div className="flex items-center gap-2 text-white/50 font-mono text-[11px]">
                    <Clock className="w-3.5 h-3.5 text-[#D4FF3A]" />
                    <span>Target: {proj.targetDeliveryDate}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setCurrentClientId(proj.clientId);
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/[0.06] hover:bg-white/[0.12] text-white/80 hover:text-white transition-colors text-[11px]"
                      title="Set as active client"
                    >
                      <Link to="/portal" className="flex items-center gap-1">
                        <span>Portal</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </button>

                    <Link
                      to="/admin/projects"
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

        {/* 2-Column: Recent Operations Activity & Workload Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Operations Activity */}
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-4">
            <h3 className="text-base font-bold text-white tracking-tight">Recent Historical Operations Log</h3>
            <div className="space-y-3">
              {recentActivity.length === 0 ? (
                <div className="text-xs text-white/40 italic">No activity recorded yet.</div>
              ) : (
                recentActivity.map((ev) => (
                  <div
                    key={ev.id}
                    className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-3"
                  >
                    <div className="w-2 h-2 rounded-full bg-[#D4FF3A] mt-1.5 flex-none" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h5 className="text-xs font-bold text-white truncate">{ev.title}</h5>
                        <span className="text-[10px] font-mono text-white/40 flex-none">{ev.date}</span>
                      </div>
                      <p className="text-[11px] text-white/60 mt-0.5">{ev.description}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Workload Overview & Upcoming Deadlines */}
          <div className="space-y-6">
            {/* Team Workload */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users2 className="w-4 h-4 text-[#D4FF3A]" />
                  <h3 className="text-base font-bold text-white tracking-tight">Team Workload Overview</h3>
                </div>
                <Link to="/admin/team" className="text-xs text-[#D4FF3A] hover:underline font-mono">
                  Team View
                </Link>
              </div>

              <div className="space-y-2.5 text-xs">
                {teamMembers.map((m) => {
                  const mTasks = tasks.filter((t) => t.assignedTo === m.id && !t.isCompleted);
                  return (
                    <div key={m.id} className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-white">{m.name}</div>
                        <div className="text-[10px] text-white/40">{m.roleTitle}</div>
                      </div>
                      <span className="font-mono text-xs px-2 py-0.5 rounded bg-white/[0.05] text-[#D4FF3A]">
                        {mTasks.length} active tasks
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Upcoming Deadlines */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#D4FF3A]" />
                <h3 className="text-base font-bold text-white tracking-tight">Upcoming Project Deadlines</h3>
              </div>

              <div className="space-y-2.5 text-xs">
                {projects.map((p) => (
                  <div key={p.id} className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-white">{p.companyName}</div>
                      <div className="text-[10px] text-white/40">{p.title}</div>
                    </div>
                    <span className="font-mono text-xs text-[#D4FF3A] font-bold">
                      {p.targetDeliveryDate}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PlatformLayout>
  );
}
