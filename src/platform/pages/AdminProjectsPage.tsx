import { useState } from 'react';
import {
  FolderKanban,
  Clock,
  Send,
  FileText,
  ExternalLink,
  MessageSquare,
} from 'lucide-react';
import { usePlatform } from '../platformContext';
import PlatformLayout from '../components/PlatformLayout';
import MilestoneTracker from '../components/MilestoneTracker';

export default function AdminProjectsPage() {
  const {
    projects,
    updateMilestone,
    addProjectUpdate,
    addProjectFile,
    setCurrentClientId,
    setRole,
  } = usePlatform();

  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id || '');

  // Update Dispatcher State
  const [updateTitle, setUpdateTitle] = useState('');
  const [updateContent, setUpdateContent] = useState('');
  const [updateTag, setUpdateTag] = useState('Engineering');
  const [isUpdatePosting, setIsUpdatePosting] = useState(false);

  // File Upload Mock State
  const [fileName, setFileName] = useState('');
  const [fileCategory, setFileCategory] = useState<any>('deliverables');

  const selectedProject = projects.find((p) => p.id === selectedProjectId) || projects[0];

  const handlePostUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!updateTitle.trim() || !updateContent.trim()) return;

    setIsUpdatePosting(true);
    addProjectUpdate(selectedProject.id, {
      title: updateTitle.trim(),
      content: updateContent.trim(),
      author: 'Tirth Rathod (Lead Architect)',
      isPublicToClient: true,
      tag: updateTag,
    });

    setUpdateTitle('');
    setUpdateContent('');
    setIsUpdatePosting(false);
  };

  const handleAddFile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileName.trim()) return;

    addProjectFile(selectedProject.id, {
      name: fileName.trim(),
      category: fileCategory,
      size: `${(Math.random() * 8 + 1).toFixed(1)} MB`,
      url: '#',
      type: fileName.split('.').pop() || 'file',
    });

    setFileName('');
  };

  return (
    <PlatformLayout
      title="Project Operations Engine"
      subtitle="Sections 09 – 13 Spec: Manage active milestones, publish verified client updates, and track deliverables."
    >
      <div className="space-y-8">
        {/* Project Selector Bar */}
        <div className="flex overflow-x-auto gap-2 pb-2">
          {projects.map((p) => {
            const isSelected = p.id === selectedProjectId;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedProjectId(p.id)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-[#D4FF3A] text-[#08090A] border-[#D4FF3A] shadow-[0_4px_16px_rgba(212,255,58,0.2)]'
                    : 'bg-white/[0.02] border-white/[0.08] text-white/70 hover:bg-white/[0.06] hover:text-white'
                }`}
              >
                <FolderKanban className="w-3.5 h-3.5" />
                <span>{p.companyName}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                    isSelected ? 'bg-black/20 text-[#08090A]' : 'bg-white/10 text-white/60'
                  }`}
                >
                  {p.progress}%
                </span>
              </button>
            );
          })}
        </div>

        {selectedProject && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left 2 Columns: Milestones & Client Update Dispatcher */}
            <div className="lg:col-span-2 space-y-8">
              {/* Project Meta Card */}
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-mono uppercase text-[#D4FF3A] tracking-wider block">
                      {selectedProject.service}
                    </span>
                    <h2 className="text-xl font-bold text-white tracking-tight mt-0.5">
                      {selectedProject.title}
                    </h2>
                  </div>

                  <button
                    onClick={() => {
                      setCurrentClientId(selectedProject.clientId);
                      setRole('client');
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.1] text-xs font-semibold text-white hover:bg-white/[0.1] transition-colors"
                  >
                    <span>View Client's Live Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>

                <p className="text-xs text-white/60 leading-relaxed">
                  {selectedProject.requirementsSummary}
                </p>

                <div className="grid grid-cols-3 gap-3 pt-3 border-t border-white/[0.06] text-xs font-mono">
                  <div>
                    <span className="text-white/40 block text-[10px]">Client / Sponsor</span>
                    <span className="text-white font-bold">{selectedProject.clientName}</span>
                  </div>
                  <div>
                    <span className="text-white/40 block text-[10px]">Target Deadline</span>
                    <span className="text-[#D4FF3A] font-bold">{selectedProject.targetDeliveryDate}</span>
                  </div>
                  <div>
                    <span className="text-white/40 block text-[10px]">Budget Scope</span>
                    <span className="text-white font-bold">{selectedProject.budget}</span>
                  </div>
                </div>
              </div>

              {/* Interactive Milestones Tracker (Editable in Admin Mode) */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white tracking-tight">Active Sprints & Milestones</h3>
                  <span className="text-xs font-mono text-white/40">Real-time sync with client portal</span>
                </div>

                <MilestoneTracker
                  milestones={selectedProject.milestones}
                  editable={true}
                  onUpdateMilestone={(mId, status, progress) =>
                    updateMilestone(selectedProject.id, mId, status, progress)
                  }
                />
              </div>

              {/* Direct Client Update Dispatcher (Section 07 & 13 Spec) */}
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-white/[0.06]">
                  <MessageSquare className="w-4 h-4 text-[#D4FF3A]" />
                  <h3 className="text-base font-bold text-white tracking-tight">
                    Publish Direct Progress Update to Client
                  </h3>
                </div>

                <form onSubmit={handlePostUpdate} className="space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-white/70 mb-1">Update Headline</label>
                      <input
                        type="text"
                        required
                        value={updateTitle}
                        onChange={(e) => setUpdateTitle(e.target.value)}
                        placeholder="e.g. Sub-Second Query Engine Live on Staging"
                        className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4FF3A]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-white/70 mb-1">Sprint Category</label>
                      <select
                        value={updateTag}
                        onChange={(e) => setUpdateTag(e.target.value)}
                        className="w-full bg-[#111316] border border-white/[0.1] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4FF3A]"
                      >
                        <option value="Engineering">Engineering</option>
                        <option value="Milestone">Milestone</option>
                        <option value="Design">UI/UX Design</option>
                        <option value="QA Audit">QA Audit</option>
                        <option value="Deployment">Deployment</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-white/70 mb-1">
                      Detailed Message (Visible on Client Dashboard)
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={updateContent}
                      onChange={(e) => setUpdateContent(e.target.value)}
                      placeholder="Write the clear client-friendly update..."
                      className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl p-3 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#D4FF3A]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isUpdatePosting}
                    className="px-5 py-2.5 rounded-xl bg-[#D4FF3A] text-[#08090A] font-bold text-xs tracking-tight flex items-center gap-2 hover:brightness-110 transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Publish Update to Client Feed</span>
                  </button>
                </form>
              </div>
            </div>

            {/* Right Column: Files & Timeline */}
            <div className="space-y-6">
              {/* File Management (Section 12 Spec) */}
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-4">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#D4FF3A]" />
                  <h3 className="font-bold text-white text-sm">Project Deliverables & Files</h3>
                </div>

                <form onSubmit={handleAddFile} className="space-y-2.5">
                  <input
                    type="text"
                    required
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    placeholder="File name (e.g. Invoicing_API_Specs.pdf)"
                    className="w-full bg-white/[0.04] border border-white/[0.1] rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#D4FF3A]"
                  />
                  <div className="flex gap-2">
                    <select
                      value={fileCategory}
                      onChange={(e) => setFileCategory(e.target.value)}
                      className="flex-1 bg-[#111316] border border-white/[0.1] rounded-lg px-2 py-1.5 text-[11px] text-white"
                    >
                      <option value="deliverables">Deliverable</option>
                      <option value="requirements">Requirements</option>
                      <option value="designs">UI Design</option>
                      <option value="brand_assets">Brand Assets</option>
                    </select>
                    <button
                      type="submit"
                      className="px-3 py-1.5 rounded-lg bg-white/[0.1] hover:bg-white/[0.2] text-xs font-semibold text-white transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </form>

                <div className="space-y-2 pt-2 border-t border-white/[0.06]">
                  {selectedProject.files.map((f) => (
                    <div
                      key={f.id}
                      className="p-2.5 rounded-lg bg-white/[0.03] flex items-center justify-between text-xs"
                    >
                      <div className="truncate mr-2">
                        <div className="font-semibold text-white truncate">{f.name}</div>
                        <div className="text-[10px] text-white/40 font-mono">
                          {f.size} • {f.category}
                        </div>
                      </div>
                      <span className="text-[10px] text-emerald-400 font-mono">Synced</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Historical Activity Timeline (Section 11 Spec) */}
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#D4FF3A]" />
                  <h3 className="font-bold text-white text-sm">Chronological Audit Log</h3>
                </div>

                <div className="space-y-3 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/[0.06] pl-6">
                  {selectedProject.timeline.map((ev) => (
                    <div key={ev.id} className="relative space-y-0.5 text-xs">
                      <div className="absolute -left-6 top-1.5 w-2 h-2 rounded-full bg-[#D4FF3A]" />
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-white">{ev.title}</span>
                        <span className="text-[10px] font-mono text-white/40">{ev.date}</span>
                      </div>
                      <p className="text-[11px] text-white/60">{ev.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </PlatformLayout>
  );
}
