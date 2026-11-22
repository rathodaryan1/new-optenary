import { useState } from 'react';
import {
  Plus,
  CheckCircle2,
  Trash2,
  Edit2,
  User,
} from 'lucide-react';
import { usePlatform } from '../platformContext';
import PlatformLayout from '../components/PlatformLayout';
import type { Task, TaskPriority } from '../types';

export default function AdminTasksPage() {
  const { tasks, projects, teamMembers, addTask, updateTask, deleteTask, toggleTaskStatus } =
    usePlatform();

  // Filters
  const [selectedProjectId, setSelectedProjectId] = useState<string>('all');
  const [selectedMemberId, setSelectedMemberId] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [search, setSearch] = useState('');

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  // Form Fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [projectId, setProjectId] = useState(projects[0]?.id || '');
  const [assignedTo, setAssignedTo] = useState(teamMembers[0]?.id || '');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [dueDate, setDueDate] = useState('');
  const [estimatedHours, setEstimatedHours] = useState(8);

  const openCreateModal = () => {
    setEditingTask(null);
    setTitle('');
    setDescription('');
    setProjectId(projects[0]?.id || '');
    setAssignedTo(teamMembers[0]?.id || '');
    setPriority('medium');
    setDueDate('In 5 days');
    setEstimatedHours(8);
    setShowModal(true);
  };

  const openEditModal = (task: Task) => {
    setEditingTask(task);
    setTitle(task.title);
    setDescription(task.description || '');
    setProjectId(task.projectId);
    setAssignedTo(task.assignedTo || '');
    setPriority(task.priority);
    setDueDate(task.dueDate || '');
    setEstimatedHours(task.estimatedHours || 8);
    setShowModal(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const assignedMember = teamMembers.find((m) => m.id === assignedTo);

    if (editingTask) {
      updateTask(editingTask.id, {
        title: title.trim(),
        description: description.trim(),
        projectId,
        assignedTo,
        assignedToName: assignedMember?.name || 'Unassigned',
        priority,
        dueDate,
        estimatedHours: Number(estimatedHours),
      });
    } else {
      addTask({
        title: title.trim(),
        description: description.trim(),
        projectId,
        assignedTo,
        assignedToName: assignedMember?.name || 'Unassigned',
        priority,
        status: 'todo',
        dueDate,
        estimatedHours: Number(estimatedHours),
      });
    }

    setShowModal(false);
  };

  // Filtered List
  const filteredTasks = tasks.filter((t) => {
    if (selectedProjectId !== 'all' && t.projectId !== selectedProjectId) return false;
    if (selectedMemberId !== 'all' && t.assignedTo !== selectedMemberId) return false;
    if (selectedStatus !== 'all' && t.status !== selectedStatus) return false;
    if (selectedPriority !== 'all' && t.priority !== selectedPriority) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        t.title.toLowerCase().includes(q) ||
        (t.description && t.description.toLowerCase().includes(q)) ||
        (t.assignedToName && t.assignedToName.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const completedCount = tasks.filter((t) => t.isCompleted).length;
  const pendingCount = tasks.length - completedCount;
  const urgentCount = tasks.filter((t) => t.priority === 'urgent' && !t.isCompleted).length;

  return (
    <PlatformLayout
      title="Tasks & Sprint Deliverables"
      subtitle="Section 04 Spec: Manage development sprints, assign engineers, and track real completion progress."
      actions={
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#D4FF3A] text-[#08090A] text-xs font-bold tracking-tight hover:brightness-110 shadow-[0_4px_16px_rgba(212,255,58,0.25)] transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Create Task</span>
        </button>
      }
    >
      <div className="space-y-6">
        {/* KPI Mini Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] space-y-1">
            <span className="text-[10px] font-mono uppercase text-white/50 block">Total Sprints</span>
            <span className="text-2xl font-bold font-mono text-white">{tasks.length}</span>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] space-y-1">
            <span className="text-[10px] font-mono uppercase text-[#D4FF3A] block">Pending Tasks</span>
            <span className="text-2xl font-bold font-mono text-[#D4FF3A]">{pendingCount}</span>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] space-y-1">
            <span className="text-[10px] font-mono uppercase text-emerald-400 block">Completed</span>
            <span className="text-2xl font-bold font-mono text-emerald-400">{completedCount}</span>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] space-y-1">
            <span className="text-[10px] font-mono uppercase text-red-400 block">Urgent Priority</span>
            <span className="text-2xl font-bold font-mono text-red-400">{urgentCount}</span>
          </div>
        </div>

        {/* Filters & Search Bar */}
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] flex flex-wrap items-center gap-3 text-xs">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks, descriptions, or engineers..."
            className="flex-1 min-w-[200px] bg-white/[0.04] border border-white/[0.1] rounded-lg px-3 py-1.5 text-white placeholder-white/30 focus:outline-none focus:border-[#D4FF3A]"
          />

          <select
            value={selectedProjectId}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            className="bg-[#111316] border border-white/[0.1] rounded-lg px-3 py-1.5 text-white"
          >
            <option value="all">All Projects</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.companyName}
              </option>
            ))}
          </select>

          <select
            value={selectedMemberId}
            onChange={(e) => setSelectedMemberId(e.target.value)}
            className="bg-[#111316] border border-white/[0.1] rounded-lg px-3 py-1.5 text-white"
          >
            <option value="all">All Engineers</option>
            {teamMembers.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-[#111316] border border-white/[0.1] rounded-lg px-3 py-1.5 text-white"
          >
            <option value="all">All Statuses</option>
            <option value="todo">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="review">Review</option>
            <option value="done">Completed</option>
          </select>

          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="bg-[#111316] border border-white/[0.1] rounded-lg px-3 py-1.5 text-white"
          >
            <option value="all">All Priorities</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        {/* Tasks Data Table */}
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/[0.04] border-b border-white/[0.08] text-white/50 font-mono text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4 w-10">Done</th>
                  <th className="py-3 px-4">Task Title & Details</th>
                  <th className="py-3 px-4">Project</th>
                  <th className="py-3 px-4">Assignee</th>
                  <th className="py-3 px-4">Priority</th>
                  <th className="py-3 px-4">Due Date</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {filteredTasks.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-white/40 italic">
                      No tasks matching active criteria.
                    </td>
                  </tr>
                ) : (
                  filteredTasks.map((t) => {
                    const proj = projects.find((p) => p.id === t.projectId);

                    return (
                      <tr
                        key={t.id}
                        className={`hover:bg-white/[0.02] transition-colors ${
                          t.isCompleted ? 'opacity-60 bg-white/[0.01]' : ''
                        }`}
                      >
                        {/* Checkbox status */}
                        <td className="py-3 px-4">
                          <button
                            onClick={() => toggleTaskStatus(t.id)}
                            className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${
                              t.isCompleted
                                ? 'bg-emerald-500 border-emerald-500 text-[#08090A]'
                                : 'border-white/20 hover:border-[#D4FF3A]'
                            }`}
                            title={t.isCompleted ? 'Mark incomplete' : 'Mark done'}
                          >
                            {t.isCompleted && <CheckCircle2 className="w-3.5 h-3.5" />}
                          </button>
                        </td>

                        {/* Title & Description */}
                        <td className="py-3 px-4">
                          <div className={`font-semibold text-white ${t.isCompleted ? 'line-through text-white/50' : ''}`}>
                            {t.title}
                          </div>
                          {t.description && (
                            <p className="text-[11px] text-white/50 line-clamp-1 mt-0.5">{t.description}</p>
                          )}
                        </td>

                        {/* Project */}
                        <td className="py-3 px-4 whitespace-nowrap">
                          <span className="font-mono text-[#D4FF3A] font-semibold">{proj?.companyName || '—'}</span>
                        </td>

                        {/* Assignee */}
                        <td className="py-3 px-4 whitespace-nowrap">
                          <div className="flex items-center gap-1.5 text-white/80">
                            <User className="w-3.5 h-3.5 text-white/40" />
                            <span>{t.assignedToName || 'Unassigned'}</span>
                          </div>
                        </td>

                        {/* Priority */}
                        <td className="py-3 px-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold ${
                              t.priority === 'urgent'
                                ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                                : t.priority === 'high'
                                ? 'bg-orange-500/20 text-orange-400'
                                : t.priority === 'medium'
                                ? 'bg-[#D4FF3A]/20 text-[#D4FF3A]'
                                : 'bg-white/10 text-white/60'
                            }`}
                          >
                            {t.priority}
                          </span>
                        </td>

                        {/* Due Date */}
                        <td className="py-3 px-4 whitespace-nowrap font-mono text-white/60">
                          {t.dueDate || '—'}
                        </td>

                        {/* Actions */}
                        <td className="py-3 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => openEditModal(t)}
                              className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] text-white/70 hover:text-white transition-colors"
                              title="Edit task"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setTaskToDelete(t)}
                              className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-red-500/20 text-white/70 hover:text-red-400 transition-colors"
                              title="Delete task"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Create / Edit Task Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-lg bg-[#0D0E11] border border-white/[0.12] rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <h3 className="font-bold text-white text-base">
                {editingTask ? 'Edit Task' : 'Create Engineering Task'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-white/40 hover:text-white">
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-white/70 mb-1">Task Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Implement edge caching for product detail queries"
                  className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D4FF3A]"
                />
              </div>

              <div>
                <label className="block text-white/70 mb-1">Description / Acceptance Criteria</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Technical specifications, acceptance thresholds..."
                  className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl p-3 text-white focus:outline-none focus:border-[#D4FF3A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/70 mb-1">Project *</label>
                  <select
                    value={projectId}
                    onChange={(e) => setProjectId(e.target.value)}
                    className="w-full bg-[#111316] border border-white/[0.1] rounded-xl px-3 py-2 text-white"
                  >
                    {projects.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.companyName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-white/70 mb-1">Assign Engineer</label>
                  <select
                    value={assignedTo}
                    onChange={(e) => setAssignedTo(e.target.value)}
                    className="w-full bg-[#111316] border border-white/[0.1] rounded-xl px-3 py-2 text-white"
                  >
                    {teamMembers.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name} ({m.department})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-white/70 mb-1">Priority</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as TaskPriority)}
                    className="w-full bg-[#111316] border border-white/[0.1] rounded-xl px-3 py-2 text-white"
                  >
                    <option value="urgent">Urgent</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/70 mb-1">Due Date</label>
                  <input
                    type="text"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    placeholder="e.g. Dec 02, 2026"
                    className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-white/70 mb-1">Est. Hours</label>
                  <input
                    type="number"
                    value={estimatedHours}
                    onChange={(e) => setEstimatedHours(Number(e.target.value))}
                    className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2.5 pt-3 border-t border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#D4FF3A] text-[#08090A] font-bold"
                >
                  {editingTask ? 'Save Changes' : 'Create Task'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {taskToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-sm bg-[#0D0E11] border border-white/[0.12] rounded-2xl p-6 space-y-4">
            <h3 className="font-bold text-white text-base">Confirm Task Deletion</h3>
            <p className="text-xs text-white/60">
              Are you sure you want to delete task <span className="text-white font-semibold">"{taskToDelete.title}"</span>? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2.5 pt-2">
              <button
                onClick={() => setTaskToDelete(null)}
                className="px-3.5 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-xs text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteTask(taskToDelete.id);
                  setTaskToDelete(null);
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
