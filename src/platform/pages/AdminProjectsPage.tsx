import { useState } from 'react';
import {
  FolderKanban,
  Clock,
  Send,
  FileText,
  ExternalLink,
  MessageSquare,
  Plus,
  Trash2,
  Edit2,
} from 'lucide-react';
import { usePlatform } from '../platformContext';
import PlatformLayout from '../components/PlatformLayout';
import MilestoneTracker from '../components/MilestoneTracker';
import type { Project, ProjectStatus } from '../types';

export default function AdminProjectsPage() {
  const {
    projects,
    clients,
    addProject,
    updateProject,
    deleteProject,
    updateMilestone,
    addProjectUpdate,
    addProjectFile,
    setCurrentClientId,
  } = usePlatform();

  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id || '');

  // Modals
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);

  // Form Fields for Project Create / Edit
  const [clientId, setClientId] = useState(clients[0]?.id || '');
  const [title, setTitle] = useState('');
  const [service, setService] = useState('Web & SaaS Engineering');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<ProjectStatus>('in_progress');
  const [budget, setBudget] = useState('₹45,000');
  const [targetDeliveryDate, setTargetDeliveryDate] = useState('In 30 days');
  const [liveUrl, setLiveUrl] = useState('');

  // Update Dispatcher State
  const [updateTitle, setUpdateTitle] = useState('');
  const [updateContent, setUpdateContent] = useState('');
  const [updateTag, setUpdateTag] = useState('Engineering');
  const [isUpdatePosting, setIsUpdatePosting] = useState(false);

  // File Upload State
  const [fileName, setFileName] = useState('');
  const [fileCategory, setFileCategory] = useState<any>('deliverables');

  const selectedProject = projects.find((p) => p.id === selectedProjectId) || projects[0];

  const openCreateModal = () => {
    setEditingProject(null);
    setClientId(clients[0]?.id || '');
    setTitle('');
    setService('Web & SaaS Engineering');
    setDescription('');
    setStatus('in_progress');
    setBudget('₹45,000');
    setTargetDeliveryDate('In 30 days');
    setLiveUrl('');
    setShowCreateModal(true);
  };

  const openEditModal = (proj: Project) => {
    setEditingProject(proj);
    setClientId(proj.clientId);
    setTitle(proj.title);
    setService(proj.service);
    setDescription(proj.requirementsSummary || '');
    setStatus(proj.status);
    setBudget(proj.budget);
    setTargetDeliveryDate(proj.targetDeliveryDate);
    setLiveUrl(proj.liveUrl || '');
    setShowCreateModal(true);
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !clientId) return;

    const assignedClient = clients.find((c) => c.id === clientId);

    if (editingProject) {
      updateProject(editingProject.id, {
        clientId,
        clientName: assignedClient?.name || editingProject.clientName,
        companyName: assignedClient?.company || editingProject.companyName,
        title: title.trim(),
        service,
        status,
        budget,
        targetDeliveryDate,
        liveUrl: liveUrl.trim(),
        requirementsSummary: description.trim(),
      });
    } else {
      const created = addProject({
        clientId,
        clientName: assignedClient?.name || 'Client',
        companyName: assignedClient?.company || 'Company',
        title: title.trim(),
        service,
        status,
        startDate: 'Today',
        targetDeliveryDate,
        budget,
        requirementsSummary: description.trim() || 'Custom digital system engineering deliverable.',
        liveUrl: liveUrl.trim(),
        teamMembers: [{ name: 'Tirth Rathod', role: 'Lead Architect' }],
        milestones: [
          { id: 'm-1', name: 'Sprint 0: Architecture & Data Schema', status: 'completed', progress: 100, completedAt: 'Today' },
          { id: 'm-2', name: 'Sprint 1: UI/UX & Interactive Design', status: 'in_progress', progress: 30, dueDate: 'Week 1' },
          { id: 'm-3', name: 'Sprint 2: Core Engine & API Services', status: 'pending', progress: 0, dueDate: 'Week 2' },
          { id: 'm-4', name: 'Sprint 3: End-to-End QA Testing', status: 'pending', progress: 0, dueDate: 'Week 3' },
          { id: 'm-5', name: 'Sprint 4: Edge Deployment & Launch', status: 'pending', progress: 0, dueDate: 'Week 4' },
        ],
      });
      setSelectedProjectId(created.id);
    }

    setShowCreateModal(false);
  };

  const handlePostUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!updateTitle.trim() || !updateContent.trim() || !selectedProject) return;

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
    if (!fileName.trim() || !selectedProject) return;

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
      subtitle="Sections 04 & 09 Spec: Manage deliverables, assign client accounts, and track calculated milestone progress."
      actions={
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#D4FF3A] text-[#08090A] text-xs font-bold tracking-tight hover:brightness-110 shadow-[0_4px_16px_rgba(212,255,58,0.25)] transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Project</span>
        </button>
      }
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
            {/* Left 2 Columns: Project Meta, Milestones, and Client Updates */}
            <div className="lg:col-span-2 space-y-8">
              {/* Project Meta Card */}
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono uppercase text-[#D4FF3A] tracking-wider block">
                        {selectedProject.service}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.06] text-white/70 uppercase">
                        {selectedProject.status.replace('_', ' ')}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-white tracking-tight mt-0.5">
                      {selectedProject.title}
                    </h2>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(selectedProject)}
                      className="p-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-white/70 hover:text-white"
                      title="Edit project"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setProjectToDelete(selectedProject)}
                      className="p-1.5 rounded-lg bg-white/[0.05] hover:bg-red-500/20 text-white/70 hover:text-red-400"
                      title="Delete project"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        setCurrentClientId(selectedProject.clientId);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.1] text-xs font-semibold text-white hover:bg-white/[0.1] transition-colors"
                    >
                      <span>Preview Client Portal</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
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

              {/* Interactive Milestones Tracker */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white tracking-tight">Active Sprints & Milestones</h3>
                    <p className="text-xs text-white/40 font-mono">
                      Overall progress ({selectedProject.progress}%) is automatically calculated from milestones.
                    </p>
                  </div>
                </div>

                <MilestoneTracker
                  milestones={selectedProject.milestones}
                  editable={true}
                  onUpdateMilestone={(mId, status, progress) =>
                    updateMilestone(selectedProject.id, mId, status, progress)
                  }
                />
              </div>

              {/* Direct Client Update Dispatcher */}
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-white/[0.06]">
                  <MessageSquare className="w-4 h-4 text-[#D4FF3A]" />
                  <h3 className="text-base font-bold text-white tracking-tight">
                    Publish Direct Progress Update to Client Feed
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
              {/* File Management */}
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

              {/* Historical Activity Timeline */}
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

      {/* Create / Edit Project Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-lg bg-[#0D0E11] border border-white/[0.12] rounded-2xl p-6 space-y-4">
            <h3 className="font-bold text-white text-base">
              {editingProject ? 'Edit Project Workspace' : 'Initialize New Project Workspace'}
            </h3>

            <form onSubmit={handleSaveProject} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/70 mb-1">Assign Client Account *</label>
                  <select
                    value={clientId}
                    onChange={(e) => setClientId(e.target.value)}
                    className="w-full bg-[#111316] border border-white/[0.1] rounded-xl px-3 py-2 text-white"
                  >
                    {clients.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.company} ({c.name})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-white/70 mb-1">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as ProjectStatus)}
                    className="w-full bg-[#111316] border border-white/[0.1] rounded-xl px-3 py-2 text-white"
                  >
                    <option value="planning">Planning</option>
                    <option value="in_progress">In Progress</option>
                    <option value="review">Review</option>
                    <option value="completed">Completed</option>
                    <option value="on_hold">On Hold</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-white/70 mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Real-Time B2B Inventory Portal"
                  className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D4FF3A]"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-white/70 mb-1">Service Type</label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full bg-[#111316] border border-white/[0.1] rounded-xl px-3 py-2 text-white"
                  >
                    <option value="Web & SaaS Engineering">Web & SaaS</option>
                    <option value="Mobile Application">Mobile App</option>
                    <option value="AI Agents & Automation">AI & Automation</option>
                    <option value="Digital Commerce">Digital Commerce</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/70 mb-1">Budget</label>
                  <input
                    type="text"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="₹50,000"
                    className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-white/70 mb-1">Target Deadline</label>
                  <input
                    type="text"
                    value={targetDeliveryDate}
                    onChange={(e) => setTargetDeliveryDate(e.target.value)}
                    placeholder="e.g. Dec 15, 2026"
                    className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/70 mb-1">Live Staging / Production URL</label>
                <input
                  type="url"
                  value={liveUrl}
                  onChange={(e) => setLiveUrl(e.target.value)}
                  placeholder="https://staging.client.com"
                  className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-white/70 mb-1">Requirements Summary</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Key functional requirements and delivery objectives..."
                  className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl p-3 text-white"
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-3 border-t border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#D4FF3A] text-[#08090A] font-bold"
                >
                  {editingProject ? 'Save Changes' : 'Initialize Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {projectToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-sm bg-[#0D0E11] border border-white/[0.12] rounded-2xl p-6 space-y-4">
            <h3 className="font-bold text-white text-base">Confirm Project Deletion</h3>
            <p className="text-xs text-white/60">
              Are you sure you want to delete project <span className="text-white font-semibold">"{projectToDelete.title}"</span>?
            </p>
            <div className="flex justify-end gap-2.5 pt-2">
              <button
                onClick={() => setProjectToDelete(null)}
                className="px-3.5 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-xs text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteProject(projectToDelete.id);
                  setProjectToDelete(null);
                  if (selectedProjectId === projectToDelete.id) {
                    setSelectedProjectId(projects[0]?.id || '');
                  }
                }}
                className="px-4 py-1.5 rounded-lg bg-red-500 hover:bg-red-600 text-xs font-bold text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </PlatformLayout>
  );
}
