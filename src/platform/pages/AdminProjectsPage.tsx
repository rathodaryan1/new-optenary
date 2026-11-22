import { useState } from 'react';
import {
  FolderKanban,
  Send,
  FileText,
  ExternalLink,
  MessageSquare,
  Plus,
  Trash2,
  Edit2,
  CheckSquare,
  CheckCircle2,
  Search,
  Layers,
  Activity,
  X,
  Upload,
} from 'lucide-react';
import { usePlatform } from '../platformContext';
import PlatformLayout from '../components/PlatformLayout';
import MilestoneTracker from '../components/MilestoneTracker';
import type { Project, ProjectStatus } from '../types';

export default function AdminProjectsPage() {
  const {
    projects,
    clients,
    tasks,
    teamMembers,
    addProject,
    updateProject,
    deleteProject,
    updateMilestone,
    addTask,
    toggleTaskStatus,
    addProjectUpdate,
    addProjectFile,
    deleteProjectFile,
    setCurrentClientId,
  } = usePlatform();

  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id || '');
  const [activeTab, setActiveTab] = useState<'overview' | 'milestones' | 'tasks' | 'files' | 'updates' | 'activity'>(
    'overview'
  );

  // Filters & Search
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

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

  // File Upload State (Real file handling)
  const [fileCategory, setFileCategory] = useState<'deliverables' | 'designs' | 'requirements' | 'brand_assets' | 'documents'>('deliverables');

  // Quick Task Creation for this project
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskAssignee, setNewTaskAssignee] = useState(teamMembers[0]?.id || '');

  const selectedProject = projects.find((p) => p.id === selectedProjectId) || projects[0];

  const filteredProjects = projects.filter((p) => {
    if (statusFilter !== 'all' && p.status !== statusFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.companyName.toLowerCase().includes(q) ||
        p.service.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const projectTasks = selectedProject
    ? tasks.filter((t) => t.projectId === selectedProject.id)
    : [];

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
          { id: 'm-2', name: 'Sprint 1: UI & Interactive Workflow', status: 'in_progress', progress: 25, dueDate: 'Sprint 1' },
          { id: 'm-3', name: 'Sprint 2: Real-Time Engine & API', status: 'pending', progress: 0, dueDate: 'Sprint 2' },
          { id: 'm-4', name: 'Sprint 3: QA Verification & Handover', status: 'pending', progress: 0, dueDate: 'Sprint 3' },
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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !selectedProject) return;

    // Validate file size: Max 15MB
    if (file.size > 15 * 1024 * 1024) {
      alert('File exceeds 15MB maximum size limit.');
      return;
    }

    const formattedSize =
      file.size > 1024 * 1024
        ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
        : `${Math.round(file.size / 1024)} KB`;

    const fileUrl = URL.createObjectURL(file);

    addProjectFile(selectedProject.id, {
      name: file.name,
      category: fileCategory,
      size: formattedSize,
      url: fileUrl,
      type: file.name.split('.').pop() || 'file',
      uploadedBy: 'Tirth Rathod',
    });

    // Reset input
    e.target.value = '';
  };

  const handleQuickAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim() || !selectedProject) return;

    const assignedMember = teamMembers.find((m) => m.id === newTaskAssignee);

    addTask({
      title: newTaskTitle.trim(),
      projectId: selectedProject.id,
      assignedTo: newTaskAssignee,
      assignedToName: assignedMember?.name || 'Unassigned',
      priority: 'medium',
      status: 'todo',
      dueDate: selectedProject.targetDeliveryDate,
      estimatedHours: 8,
    });

    setNewTaskTitle('');
  };

  return (
    <PlatformLayout
      title="Engineering Projects & Delivery OS"
      subtitle="Section 06 Spec: Milestone recalculation, task allocation, deliverables handover, and transparent client updates."
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
      <div className="space-y-6">
        {/* Project Selector Pills & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] text-xs">
          <div className="flex items-center gap-2 flex-1">
            <Search className="w-3.5 h-3.5 text-white/40" />
            <input
              type="text"
              placeholder="Search active projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full max-w-xs bg-transparent text-white placeholder-white/40 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#111316] border border-white/[0.1] rounded-lg px-2.5 py-1 text-white text-xs font-mono"
            >
              <option value="all">All Statuses ({projects.length})</option>
              <option value="in_progress">In Progress</option>
              <option value="review">Review</option>
              <option value="planning">Planning</option>
              <option value="completed">Completed</option>
              <option value="on_hold">On Hold</option>
            </select>
          </div>
        </div>

        {/* Project Selector Horizontal Scroll */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {filteredProjects.map((p) => {
            const isSelected = selectedProjectId === p.id;

            return (
              <button
                key={p.id}
                onClick={() => setSelectedProjectId(p.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border flex items-center gap-2.5 ${
                  isSelected
                    ? 'bg-[#D4FF3A] text-[#08090A] border-[#D4FF3A] font-bold shadow-[0_4px_16px_rgba(212,255,58,0.2)]'
                    : 'bg-white/[0.02] border-white/[0.08] text-white/70 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <span>{p.companyName}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                    isSelected ? 'bg-[#08090A] text-[#D4FF3A]' : 'bg-white/[0.08] text-white/70'
                  }`}
                >
                  {p.progress}%
                </span>
              </button>
            );
          })}
        </div>

        {selectedProject ? (
          <div className="space-y-6">
            {/* Top Project Banner */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono uppercase text-[#D4FF3A] tracking-wider font-bold">
                      {selectedProject.service}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.06] text-white/70 uppercase">
                      {selectedProject.status.replace('_', ' ')}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
                    {selectedProject.title}
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(selectedProject)}
                    className="p-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-white/70 hover:text-white"
                    title="Edit Project"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setProjectToDelete(selectedProject)}
                    className="p-1.5 rounded-lg bg-white/[0.05] hover:bg-red-500/20 text-white/70 hover:text-red-400"
                    title="Delete Project"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      setCurrentClientId(selectedProject.clientId);
                      window.location.href = '/portal';
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.06] border border-white/[0.1] text-xs font-semibold text-white hover:bg-white/[0.1] transition-all"
                  >
                    <span>Preview Client Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Progress & Meta Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-white/[0.06] text-xs font-mono">
                <div>
                  <span className="text-white/40 block text-[10px]">Client Sponsor</span>
                  <span className="text-white font-bold">{selectedProject.clientName}</span>
                </div>
                <div>
                  <span className="text-white/40 block text-[10px]">Milestone Completion</span>
                  <span className="text-[#D4FF3A] font-bold">{selectedProject.progress}%</span>
                </div>
                <div>
                  <span className="text-white/40 block text-[10px]">Target Deadline</span>
                  <span className="text-white font-bold">{selectedProject.targetDeliveryDate}</span>
                </div>
                <div>
                  <span className="text-white/40 block text-[10px]">Budget Scope</span>
                  <span className="text-white font-bold">{selectedProject.budget}</span>
                </div>
              </div>
            </div>

            {/* 6 Tabs as specified in Section 06 */}
            <div className="flex items-center gap-1 border-b border-white/[0.08] text-xs font-mono overflow-x-auto pb-1">
              {[
                { key: 'overview', label: 'Overview', icon: FolderKanban },
                { key: 'milestones', label: `Milestones (${selectedProject.milestones.length})`, icon: Layers },
                { key: 'tasks', label: `Tasks (${projectTasks.length})`, icon: CheckSquare },
                { key: 'files', label: `Files (${selectedProject.files.length})`, icon: FileText },
                { key: 'updates', label: `Updates (${selectedProject.updates.length})`, icon: MessageSquare },
                { key: 'activity', label: 'Activity Timeline', icon: Activity },
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

            {/* Tab 1: Overview */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-4 text-xs">
                  <h3 className="font-bold text-white text-xs uppercase font-mono tracking-wider">
                    Requirements & Architecture Scope
                  </h3>
                  <p className="text-white/70 leading-relaxed bg-white/[0.02] p-4 rounded-xl border border-white/[0.05]">
                    {selectedProject.requirementsSummary}
                  </p>

                  {selectedProject.liveUrl && (
                    <div className="flex items-center gap-2 pt-2">
                      <span className="text-white/40 font-mono text-[11px]">Production Endpoint:</span>
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#D4FF3A] hover:underline font-mono text-[11px] flex items-center gap-1"
                      >
                        <span>{selectedProject.liveUrl}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>

                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-4 text-xs">
                  <h3 className="font-bold text-white text-xs uppercase font-mono tracking-wider">
                    Assigned Engineering Roster
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedProject.teamMembers.map((tm, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#D4FF3A]/20 text-[#D4FF3A] font-bold flex items-center justify-center font-mono">
                          {tm.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-bold text-white">{tm.name}</div>
                          <div className="text-[11px] text-white/50">{tm.role}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Milestones */}
            {activeTab === 'milestones' && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between text-xs font-mono">
                  <span className="text-white/60">
                    Rule: Overall progress ({selectedProject.progress}%) is derived strictly from milestone averages.
                  </span>
                  <span className="text-[#D4FF3A] font-bold">{selectedProject.milestones.length} Sprints</span>
                </div>

                <MilestoneTracker
                  milestones={selectedProject.milestones}
                  editable={true}
                  onUpdateMilestone={(mId, status, progress) =>
                    updateMilestone(selectedProject.id, mId, status, progress)
                  }
                />
              </div>
            )}

            {/* Tab 3: Tasks */}
            {activeTab === 'tasks' && (
              <div className="space-y-4 text-xs">
                {/* Quick Add Task */}
                <form onSubmit={handleQuickAddTask} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] flex flex-wrap items-center gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Add task to this project..."
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    className="flex-1 bg-[#111316] border border-white/[0.1] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D4FF3A]"
                  />
                  <select
                    value={newTaskAssignee}
                    onChange={(e) => setNewTaskAssignee(e.target.value)}
                    className="bg-[#111316] border border-white/[0.1] rounded-xl px-3 py-2 text-white focus:outline-none font-mono text-xs"
                  >
                    {teamMembers.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name}
                      </option>
                    ))}
                  </select>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#D4FF3A] text-[#08090A] font-bold hover:brightness-110 flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Task</span>
                  </button>
                </form>

                {/* Project Tasks Table */}
                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-white/[0.02] border-b border-white/[0.06] text-white/50 font-mono text-[11px] uppercase">
                      <tr>
                        <th className="py-2.5 px-3 w-10">Done</th>
                        <th className="py-2.5 px-3">Task</th>
                        <th className="py-2.5 px-3">Assignee</th>
                        <th className="py-2.5 px-3">Priority</th>
                        <th className="py-2.5 px-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.04]">
                      {projectTasks.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="py-8 text-center text-white/40 italic font-mono">
                            No sprint tasks assigned yet.
                          </td>
                        </tr>
                      ) : (
                        projectTasks.map((t) => (
                          <tr key={t.id} className="hover:bg-white/[0.02]">
                            <td className="py-3 px-3">
                              <button
                                onClick={() => toggleTaskStatus(t.id)}
                                className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${
                                  t.isCompleted
                                    ? 'bg-emerald-500 border-emerald-500 text-[#08090A]'
                                    : 'border-white/20 hover:border-[#D4FF3A]'
                                }`}
                              >
                                {t.isCompleted && <CheckCircle2 className="w-3.5 h-3.5" />}
                              </button>
                            </td>
                            <td className="py-3 px-3 font-semibold text-white">{t.title}</td>
                            <td className="py-3 px-3 font-mono text-white/60">{t.assignedToName || 'Unassigned'}</td>
                            <td className="py-3 px-3">
                              <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-white/[0.06]">
                                {t.priority}
                              </span>
                            </td>
                            <td className="py-3 px-3 font-mono text-white/60 uppercase text-[10px]">{t.status}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Tab 4: Files */}
            {activeTab === 'files' && (
              <div className="space-y-4 text-xs">
                {/* Upload Deliverable */}
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <select
                      value={fileCategory}
                      onChange={(e) => setFileCategory(e.target.value as any)}
                      className="bg-[#111316] border border-white/[0.1] rounded-xl px-3 py-2 text-white font-mono text-xs focus:outline-none"
                    >
                      <option value="deliverables">Deliverables & Code</option>
                      <option value="designs">UI/UX Designs</option>
                      <option value="requirements">Requirements & PRD</option>
                      <option value="brand_assets">Brand Assets</option>
                      <option value="documents">Contracts & Reports</option>
                    </select>

                    <label className="cursor-pointer px-4 py-2 rounded-xl bg-[#D4FF3A] text-[#08090A] font-bold hover:brightness-110 flex items-center gap-1.5 transition-all">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload File (Max 15MB)</span>
                      <input type="file" onChange={handleFileUpload} className="hidden" />
                    </label>
                  </div>

                  <span className="text-[10px] font-mono text-white/40">
                    Validated file upload with downloadable staging URLs
                  </span>
                </div>

                <div className="space-y-2">
                  {selectedProject.files.length === 0 ? (
                    <div className="p-8 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center text-white/40 italic font-mono">
                      No files uploaded for this project yet.
                    </div>
                  ) : (
                    selectedProject.files.map((file) => (
                      <div
                        key={file.id}
                        className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="w-4 h-4 text-[#D4FF3A]" />
                          <div>
                            <div className="font-bold text-white">{file.name}</div>
                            <div className="text-[10px] font-mono text-white/40">
                              {file.category} • {file.size} • {file.uploadedAt}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <a
                            href={file.url}
                            download={file.name}
                            className="px-2.5 py-1 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-white font-mono text-[11px]"
                          >
                            Download
                          </a>
                          <button
                            onClick={() => deleteProjectFile(selectedProject.id, file.id)}
                            className="p-1 rounded hover:bg-red-500/20 text-white/40 hover:text-red-400"
                            title="Delete File"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Tab 5: Client-Visible Updates */}
            {activeTab === 'updates' && (
              <div className="space-y-6 text-xs">
                {/* Publish Update */}
                <form onSubmit={handlePostUpdate} className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-3.5">
                  <div className="flex items-center gap-2 pb-2 border-b border-white/[0.06]">
                    <MessageSquare className="w-4 h-4 text-[#D4FF3A]" />
                    <h3 className="text-sm font-bold text-white">Publish Direct Progress Update to Client Feed</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-white/70 mb-1">Headline</label>
                      <input
                        type="text"
                        required
                        value={updateTitle}
                        onChange={(e) => setUpdateTitle(e.target.value)}
                        placeholder="e.g. Sub-Second Query Engine Live on Staging"
                        className="w-full bg-[#111316] border border-white/[0.1] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D4FF3A]"
                      />
                    </div>
                    <div>
                      <label className="block text-white/70 mb-1">Category</label>
                      <select
                        value={updateTag}
                        onChange={(e) => setUpdateTag(e.target.value)}
                        className="w-full bg-[#111316] border border-white/[0.1] rounded-xl px-3 py-2 text-white focus:outline-none font-mono"
                      >
                        <option value="Engineering">Engineering</option>
                        <option value="Milestone">Milestone</option>
                        <option value="UI/UX Design">UI/UX Design</option>
                        <option value="Deployment">Deployment</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/70 mb-1">Update Content (Visible in Client Portal)</label>
                    <textarea
                      rows={3}
                      required
                      value={updateContent}
                      onChange={(e) => setUpdateContent(e.target.value)}
                      placeholder="Detailed update notes for the client..."
                      className="w-full bg-[#111316] border border-white/[0.1] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D4FF3A]"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isUpdatePosting}
                      className="px-4 py-2 rounded-xl bg-[#D4FF3A] text-[#08090A] font-bold hover:brightness-110 flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Broadcast to Client Portal</span>
                    </button>
                  </div>
                </form>

                {/* Published Updates List */}
                <div className="space-y-3">
                  {selectedProject.updates.map((up) => (
                    <div key={up.id} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-xs">{up.title}</span>
                        <span className="text-[10px] font-mono text-white/40">{up.date}</span>
                      </div>
                      <p className="text-white/70 leading-relaxed text-[11px]">{up.content}</p>
                      <div className="text-[10px] font-mono text-[#D4FF3A] pt-1">Posted by {up.author}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 6: Activity */}
            {activeTab === 'activity' && (
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-3 text-xs">
                <h3 className="font-bold text-white text-xs uppercase font-mono tracking-wider pb-2 border-b border-white/[0.06]">
                  Project Audit & Event History
                </h3>
                <div className="space-y-3">
                  {selectedProject.timeline.map((ev) => (
                    <div key={ev.id} className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] flex items-start justify-between">
                      <div>
                        <div className="font-semibold text-white">{ev.title}</div>
                        <p className="text-[11px] text-white/60 leading-relaxed">{ev.description}</p>
                      </div>
                      <span className="text-[10px] font-mono text-white/40 whitespace-nowrap">{ev.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="p-12 rounded-2xl bg-white/[0.02] border border-white/[0.08] text-center text-white/40 italic font-mono text-xs">
            No projects found matching criteria.
          </div>
        )}
      </div>

      {/* Create / Edit Project Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#0E1013] border border-white/[0.15] rounded-2xl p-6 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <h3 className="text-base font-bold text-white">
                {editingProject ? 'Edit Project Scope' : 'Provision New Engineering Project'}
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-white/60"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-3.5">
              <div>
                <label className="block text-white/70 mb-1">Target Client Sponsor *</label>
                <select
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  className="w-full bg-[#111316] border border-white/[0.1] rounded-xl px-3 py-2 text-white focus:outline-none"
                >
                  {clients.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.company} ({c.name})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white/70 mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Industrial Catalog Search & Inquiry Portal"
                  className="w-full bg-[#111316] border border-white/[0.1] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D4FF3A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/70 mb-1">Service Category</label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full bg-[#111316] border border-white/[0.1] rounded-xl px-3 py-2 text-white focus:outline-none"
                  >
                    <option value="Web & SaaS Engineering">Web & SaaS Engineering</option>
                    <option value="Custom Software & ERP">Custom Software & ERP</option>
                    <option value="Mobile Application">Mobile Application</option>
                    <option value="AI Workflow Automation">AI Workflow Automation</option>
                    <option value="Digital Commerce">Digital Commerce</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white/70 mb-1">Project Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as ProjectStatus)}
                    className="w-full bg-[#111316] border border-white/[0.1] rounded-xl px-3 py-2 text-white focus:outline-none"
                  >
                    <option value="planning">Planning</option>
                    <option value="in_progress">In Progress</option>
                    <option value="review">Review</option>
                    <option value="completed">Completed</option>
                    <option value="on_hold">On Hold</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/70 mb-1">Target Deadline</label>
                  <input
                    type="text"
                    value={targetDeliveryDate}
                    onChange={(e) => setTargetDeliveryDate(e.target.value)}
                    placeholder="e.g. In 4 Weeks"
                    className="w-full bg-[#111316] border border-white/[0.1] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D4FF3A]"
                  />
                </div>
                <div>
                  <label className="block text-white/70 mb-1">Budget Allocation</label>
                  <input
                    type="text"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="₹48,000"
                    className="w-full bg-[#111316] border border-white/[0.1] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D4FF3A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/70 mb-1">Live Endpoint (Optional)</label>
                <input
                  type="url"
                  value={liveUrl}
                  onChange={(e) => setLiveUrl(e.target.value)}
                  placeholder="https://client-staging.optenary.in"
                  className="w-full bg-[#111316] border border-white/[0.1] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D4FF3A]"
                />
              </div>

              <div>
                <label className="block text-white/70 mb-1">Architecture & Requirement Summary</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="High-level engineering requirements, key integrations..."
                  className="w-full bg-[#111316] border border-white/[0.1] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D4FF3A]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-white/70"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-[#D4FF3A] text-[#08090A] font-bold hover:brightness-110 shadow-[0_4px_16px_rgba(212,255,58,0.25)]"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Project Confirmation Modal */}
      {projectToDelete && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-[#0E1013] border border-white/[0.15] rounded-2xl p-6 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center gap-2 text-red-400 pb-2 border-b border-white/[0.08]">
              <Trash2 className="w-4 h-4" />
              <h3 className="text-base font-bold text-white">Delete Project</h3>
            </div>
            <p className="text-white/70 leading-relaxed">
              Are you sure you want to permanently delete <strong className="text-white">{projectToDelete.title}</strong>?
              All associated milestones, tasks, and updates will be deleted.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setProjectToDelete(null)}
                className="px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-white/70"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteProject(projectToDelete.id);
                  if (selectedProjectId === projectToDelete.id) {
                    const remaining = projects.filter((p) => p.id !== projectToDelete.id);
                    setSelectedProjectId(remaining[0]?.id || '');
                  }
                  setProjectToDelete(null);
                }}
                className="px-4 py-1.5 rounded-lg bg-red-500 text-white font-bold hover:bg-red-600 shadow-[0_4px_16px_rgba(239,68,68,0.3)]"
              >
                Delete Project
              </button>
            </div>
          </div>
        </div>
      )}
    </PlatformLayout>
  );
}
