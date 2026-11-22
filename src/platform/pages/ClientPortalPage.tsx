import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FolderKanban,
  CheckCircle2,
  Clock,
  Download,
  ExternalLink,
  MessageSquare,
  FileText,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { usePlatform } from '../platformContext';
import PlatformLayout from '../components/PlatformLayout';
import MilestoneTracker from '../components/MilestoneTracker';

export default function ClientPortalPage() {
  const { currentClientId, clients, projects } = usePlatform();

  const client = clients.find((c) => c.id === currentClientId) || clients[0];
  const project = projects.find((p) => p.clientId === currentClientId) || projects[0];

  const [activeTab, setActiveTab] = useState<'milestones' | 'updates' | 'files'>('milestones');

  if (!project) {
    return (
      <PlatformLayout title="Client Portal" subtitle="Track your active project and deliverables in real time.">
        <div className="text-center py-20 bg-white/[0.02] border border-white/[0.08] rounded-2xl p-8">
          <FolderKanban className="w-12 h-12 text-white/30 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-white mb-2">No Active Projects Found</h3>
          <p className="text-sm text-white/50 max-w-md mx-auto mb-6">
            You don't have an active project assigned yet. Complete client onboarding to initiate your project workspace.
          </p>
          <Link
            to="/portal/onboarding"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#D4FF3A] text-[#08090A] font-bold text-xs tracking-tight"
          >
            <span>Start Client Onboarding</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </PlatformLayout>
    );
  }

  return (
    <PlatformLayout
      title={`${client?.company || project.companyName} Portal`}
      subtitle={`Welcome, ${client?.name || project.clientName}. Track live progress, milestones, and deliverable handovers.`}
      actions={
        <div className="flex items-center gap-2">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.1] text-xs font-semibold text-white hover:bg-white/[0.1] transition-colors"
            >
              <span>Live Staging</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
          <Link
            to="/contact"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#D4FF3A] text-[#08090A] text-xs font-bold tracking-tight hover:brightness-110 transition-all shadow-[0_4px_16px_rgba(212,255,58,0.2)]"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Contact Lead Architect</span>
          </Link>
        </div>
      }
    >
      <div className="space-y-8">
        {/* Top Hero Card: Project Overview & Health Status */}
        <div className="relative overflow-hidden p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/[0.1] shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#D4FF3A]/10 to-purple-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-2.5 py-0.5 rounded-full bg-[#D4FF3A]/15 text-[#D4FF3A] text-[11px] font-mono font-bold tracking-wider uppercase border border-[#D4FF3A]/30">
                  {project.service}
                </span>
                <span className="text-white/40 text-xs font-mono">•</span>
                <span className="text-white/60 text-xs font-mono">Started {project.startDate}</span>
              </div>

              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-tight">
                {project.title}
              </h2>

              <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
                {project.requirementsSummary}
              </p>
            </div>

            {/* Overall Progress Gauge */}
            <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-3 bg-black/40 p-4 sm:p-5 rounded-xl border border-white/[0.08]">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
                  {project.progress}%
                </span>
                <span className="text-xs uppercase font-mono tracking-wider text-white/50">Overall Progress</span>
              </div>

              <div className="w-48 sm:w-56 h-2 bg-white/[0.08] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#D4FF3A] to-emerald-400 rounded-full transition-all duration-700"
                  style={{ width: `${project.progress}%` }}
                />
              </div>

              <div className="flex items-center gap-2 text-[11px] text-white/50 font-mono mt-1">
                <Clock className="w-3.5 h-3.5 text-[#D4FF3A]" />
                <span>Target Delivery: {project.targetDeliveryDate}</span>
              </div>
            </div>
          </div>

          {/* Assigned Engineering Team */}
          <div className="mt-6 pt-6 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <span className="text-white/40 font-mono uppercase text-[10px] tracking-wider">Engineering Lead:</span>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#D4FF3A] text-[#08090A] font-bold flex items-center justify-center text-[10px]">
                  TR
                </div>
                <span className="font-semibold text-white">Tirth Rathod</span>
                <span className="text-white/40">• Lead Architect</span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-white/50 text-xs">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>
                  {project.milestones.filter((m) => m.status === 'completed').length} of{' '}
                  {project.milestones.length} Milestones Complete
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-white/[0.08] gap-6 text-sm">
          <button
            onClick={() => setActiveTab('milestones')}
            className={`pb-3 font-semibold transition-all relative ${
              activeTab === 'milestones' ? 'text-white' : 'text-white/50 hover:text-white/80'
            }`}
          >
            <span>Milestone Roadmap</span>
            {activeTab === 'milestones' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D4FF3A] rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('updates')}
            className={`pb-3 font-semibold transition-all relative flex items-center gap-2 ${
              activeTab === 'updates' ? 'text-white' : 'text-white/50 hover:text-white/80'
            }`}
          >
            <span>Agency Updates</span>
            <span className="px-1.5 py-0.2 rounded-full bg-white/10 text-[10px] font-mono text-white/70">
              {project.updates.length}
            </span>
            {activeTab === 'updates' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D4FF3A] rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('files')}
            className={`pb-3 font-semibold transition-all relative flex items-center gap-2 ${
              activeTab === 'files' ? 'text-white' : 'text-white/50 hover:text-white/80'
            }`}
          >
            <span>Files & Deliverables</span>
            <span className="px-1.5 py-0.2 rounded-full bg-white/10 text-[10px] font-mono text-white/70">
              {project.files.length}
            </span>
            {activeTab === 'files' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D4FF3A] rounded-full" />
            )}
          </button>
        </div>

        {/* TAB 1: MILESTONES */}
        {activeTab === 'milestones' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white tracking-tight">Active Execution Pipeline</h3>
                <span className="text-xs text-white/40 font-mono">Live updates from Optenary</span>
              </div>
              <MilestoneTracker milestones={project.milestones} />
            </div>

            {/* Side Card: Deliverable Promise & Value */}
            <div className="space-y-4">
              <div className="p-6 rounded-xl bg-white/[0.02] border border-white/[0.08] space-y-4">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <ShieldCheck className="w-4 h-4 text-[#D4FF3A]" />
                  <span>The Optenary Promise</span>
                </div>
                <p className="text-xs text-white/60 leading-relaxed">
                  "The client should always know what's happening without needing to ask." Every update, commit, and deliverable is logged transparently.
                </p>

                <div className="pt-3 border-t border-white/[0.06] space-y-2 text-xs">
                  <div className="flex justify-between text-white/70">
                    <span>Target Delivery Date:</span>
                    <span className="font-mono text-white font-semibold">{project.targetDeliveryDate}</span>
                  </div>
                  <div className="flex justify-between text-white/70">
                    <span>Live Staging Status:</span>
                    <span className="font-mono text-emerald-400 font-semibold">Active & Monitored</span>
                  </div>
                </div>
              </div>

              {/* Latest update preview */}
              {project.updates[0] && (
                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.08] space-y-2.5">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-white/40 block">
                    Latest Progress Log
                  </span>
                  <h4 className="text-sm font-semibold text-white">{project.updates[0].title}</h4>
                  <p className="text-xs text-white/60 line-clamp-3">{project.updates[0].content}</p>
                  <button
                    onClick={() => setActiveTab('updates')}
                    className="text-xs text-[#D4FF3A] font-medium flex items-center gap-1 hover:underline pt-1"
                  >
                    <span>Read all updates</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: AGENCY UPDATES FEED */}
        {activeTab === 'updates' && (
          <div className="max-w-3xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white tracking-tight">Direct Project Updates</h3>
                <p className="text-xs text-white/50">Chronological communication from the Optenary engineering team.</p>
              </div>
            </div>

            <div className="space-y-4">
              {project.updates.map((update) => (
                <div
                  key={update.id}
                  className="p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-3 relative group hover:border-white/[0.15] transition-all"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#D4FF3A]" />
                      <span className="font-semibold text-white">{update.author}</span>
                      <span className="text-white/40 font-mono text-[11px]">• {update.date}</span>
                    </div>

                    {update.tag && (
                      <span className="px-2 py-0.5 rounded-full bg-white/[0.06] text-white/70 text-[10px] font-mono uppercase tracking-wider">
                        {update.tag}
                      </span>
                    )}
                  </div>

                  <h4 className="text-base font-bold text-white tracking-tight">{update.title}</h4>
                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed whitespace-pre-line">
                    {update.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: FILES & DELIVERABLES */}
        {activeTab === 'files' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white tracking-tight">Project Documents & Assets</h3>
                <p className="text-xs text-white/50">Specifications, Figma files, branding assets, and release builds.</p>
              </div>
            </div>

            {project.files.length === 0 ? (
              <div className="text-center py-12 bg-white/[0.01] border border-white/[0.06] rounded-xl text-xs text-white/40">
                No deliverables published yet. Files will appear here as sprints are completed.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.files.map((file) => (
                  <div
                    key={file.id}
                    className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] flex items-center justify-between gap-3 hover:border-white/[0.15] transition-all"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center flex-none text-white/70">
                        <FileText className="w-4 h-4 text-[#D4FF3A]" />
                      </div>
                      <div className="min-w-0">
                        <h5 className="text-xs font-semibold text-white truncate">{file.name}</h5>
                        <div className="text-[11px] text-white/40 font-mono">
                          {file.size} • {file.category.replace('_', ' ')}
                        </div>
                      </div>
                    </div>

                    <a
                      href={file.url}
                      className="p-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.12] text-white/70 hover:text-white transition-colors flex-none"
                      title="Download file"
                    >
                      <Download className="w-4 h-4" />
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </PlatformLayout>
  );
}
