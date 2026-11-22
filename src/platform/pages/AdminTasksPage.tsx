import { useState, useMemo } from 'react';
import {
  Plus,
  CheckCircle2,
  Trash2,
  Edit2,
  User,
  Kanban,
  Table as TableIcon,
  Search,
  X,
} from 'lucide-react';
import { usePlatform } from '../platformContext';
import { useAuth } from '../auth/AuthContext';
import PlatformLayout from '../components/PlatformLayout';
import type { Task, TaskPriority, TaskStatus } from '../types';

export default function AdminTasksPage() {
  const { tasks, projects, teamMembers, addTask, updateTask, deleteTask, toggleTaskStatus } =
    usePlatform();
  const { currentUser } = useAuth();

  // View Mode: 'list' vs 'kanban'
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');

  // Filters
  const [selectedProjectId, setSelectedProjectId] = useState<string>('all');
  const [selectedMemberId, setSelectedMemberId] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [myTasksOnly, setMyTasksOnly] = useState(false);
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
  const [status, setStatus] = useState<TaskStatus>('todo');
  const [dueDate, setDueDate] = useState('');
  const [estimatedHours, setEstimatedHours] = useState(8);

  const KANBAN_COLUMNS: { key: TaskStatus; label: string; color: string }[] = [
    { key: 'todo', label: 'To Do', color: 'border-blue-500/30' },
    { key: 'in_progress', label: 'In Progress', color: 'border-[#D4FF3A]/30' },
    { key: 'review', label: 'In Review', color: 'border-purple-500/30' },
    { key: 'done', label: 'Completed', color: 'border-emerald-500/30' },
  ];

  const openCreateModal = () => {
    setEditingTask(null);
    setTitle('');
    setDescription('');
    setProjectId(projects[0]?.id || '');
    setAssignedTo(teamMembers[0]?.id || '');
    setPriority('medium');
    setStatus('todo');
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
    setStatus(task.status);
    setDueDate(task.dueDate || '');
    setEstimatedHours(task.estimatedHours || 8);
    setShowModal(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !projectId) return;

    const assignedMember = teamMembers.find((m) => m.id === assignedTo);

    if (editingTask) {
      updateTask(editingTask.id, {
        title: title.trim(),
        description: description.trim(),
        projectId,
        assignedTo,
        assignedToName: assignedMember?.name || 'Unassigned',
        priority,
        status,
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
        status,
        dueDate,
        estimatedHours: Number(estimatedHours),
      });
    }

    setShowModal(false);
  };

  // Filtered Tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      if (selectedProjectId !== 'all' && t.projectId !== selectedProjectId) return false;
      if (selectedMemberId !== 'all' && t.assignedTo !== selectedMemberId) return false;
      if (selectedStatus !== 'all' && t.status !== selectedStatus) return false;
      if (selectedPriority !== 'all' && t.priority !== selectedPriority) return false;
      if (myTasksOnly) {
        // Match against current user name or id
        const userMatches =
          t.assignedTo === currentUser?.id ||
          (t.assignedToName && currentUser?.name && t.assignedToName.includes(currentUser.name.split(' ')[0]));
        if (!userMatches) return false;
      }
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
  }, [tasks, selectedProjectId, selectedMemberId, selectedStatus, selectedPriority, myTasksOnly, search, currentUser]);

  const priorityStyles: Record<TaskPriority, string> = {
    urgent: 'bg-red-500/20 text-red-400 border border-red-500/30',
    high: 'bg-orange-500/20 text-orange-400 border border-orange-500/30',
    medium: 'bg-[#D4FF3A]/20 text-[#D4FF3A] border border-[#D4FF3A]/30',
    low: 'bg-white/[0.06] text-white/60 border border-white/[0.08]',
  };

  return (
    <PlatformLayout
      title="Tasks & Sprint Board"
      subtitle="Section 07 Spec: Sprint task allocation, overdue alerts, priority board, and velocity tracking."
      actions={
        <div className="flex items-center gap-2">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-white/[0.04] border border-white/[0.08] rounded-lg p-0.5">
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-1.5 rounded-md text-xs flex items-center gap-1.5 transition-all ${
                viewMode === 'kanban'
                  ? 'bg-[#D4FF3A] text-[#08090A] font-bold shadow'
                  : 'text-white/60 hover:text-white'
              }`}
              title="Kanban Board View"
            >
              <Kanban className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Kanban</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md text-xs flex items-center gap-1.5 transition-all ${
                viewMode === 'list'
                  ? 'bg-[#D4FF3A] text-[#08090A] font-bold shadow'
                  : 'text-white/60 hover:text-white'
              }`}
              title="Table List View"
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">List</span>
            </button>
          </div>

          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#D4FF3A] text-[#08090A] text-xs font-bold tracking-tight hover:brightness-110 shadow-[0_4px_16px_rgba(212,255,58,0.25)] transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Task</span>
          </button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Filter Controls Bar */}
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3 flex-1 min-w-[240px]">
            {/* Search */}
            <div className="relative flex-1 max-w-xs">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-white/40" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#111316] border border-white/[0.1] rounded-lg pl-9 pr-3 py-1.5 text-white placeholder-white/40 focus:outline-none focus:border-[#D4FF3A]"
              />
            </div>

            {/* My Tasks Toggle */}
            <button
              onClick={() => setMyTasksOnly(!myTasksOnly)}
              className={`px-3 py-1.5 rounded-lg border font-mono text-[11px] transition-all flex items-center gap-1.5 ${
                myTasksOnly
                  ? 'bg-[#D4FF3A] text-[#08090A] border-[#D4FF3A] font-bold'
                  : 'bg-white/[0.03] text-white/70 border-white/[0.08] hover:text-white'
              }`}
            >
              <User className="w-3 h-3" />
              <span>My Tasks</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Project Filter */}
            <select
              value={selectedProjectId}
              onChange={(e) => setSelectedProjectId(e.target.value)}
              className="bg-[#111316] border border-white/[0.1] rounded-lg px-2.5 py-1.5 text-white font-mono text-[11px]"
            >
              <option value="all">All Projects ({projects.length})</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.companyName}
                </option>
              ))}
            </select>

            {/* Assignee Filter */}
            <select
              value={selectedMemberId}
              onChange={(e) => setSelectedMemberId(e.target.value)}
              className="bg-[#111316] border border-white/[0.1] rounded-lg px-2.5 py-1.5 text-white font-mono text-[11px]"
            >
              <option value="all">All Assignees</option>
              {teamMembers.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-[#111316] border border-white/[0.1] rounded-lg px-2.5 py-1.5 text-white font-mono text-[11px]"
            >
              <option value="all">All Statuses</option>
              <option value="todo">To Do</option>
              <option value="in_progress">In Progress</option>
              <option value="review">Review</option>
              <option value="done">Completed</option>
            </select>

            {/* Priority Filter */}
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="bg-[#111316] border border-white/[0.1] rounded-lg px-2.5 py-1.5 text-white font-mono text-[11px]"
            >
              <option value="all">All Priorities</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>

        {/* View Mode 1: Kanban Board */}
        {viewMode === 'kanban' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pb-4">
            {KANBAN_COLUMNS.map((col) => {
              const colTasks = filteredTasks.filter((t) => t.status === col.key);

              return (
                <div
                  key={col.key}
                  className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col min-h-[400px]"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white tracking-tight">{col.label}</span>
                      <span className="px-1.5 py-0.2 rounded-full bg-white/[0.06] text-[10px] font-mono text-white/60">
                        {colTasks.length}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 flex-1">
                    {colTasks.length === 0 ? (
                      <div className="text-center py-12 text-white/30 italic text-[11px] font-mono">
                        No tasks in {col.label}
                      </div>
                    ) : (
                      colTasks.map((t) => {
                        const proj = projects.find((p) => p.id === t.projectId);

                        return (
                          <div
                            key={t.id}
                            className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.18] transition-all space-y-2.5 text-xs group"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <span className="text-[10px] font-mono text-[#D4FF3A] truncate block">
                                {proj?.companyName || 'Project'}
                              </span>
                              <span className={`text-[9px] font-mono uppercase px-1.5 py-0.2 rounded ${priorityStyles[t.priority]}`}>
                                {t.priority}
                              </span>
                            </div>

                            <h4 className="font-bold text-white tracking-tight leading-snug">{t.title}</h4>

                            {t.description && (
                              <p className="text-[11px] text-white/60 line-clamp-2">{t.description}</p>
                            )}

                            {/* Meta & Column Mover */}
                            <div className="pt-2 border-t border-white/[0.04] flex items-center justify-between text-[10px] font-mono text-white/40">
                              <div className="flex items-center gap-1.5">
                                <User className="w-3 h-3 text-white/40" />
                                <span>{t.assignedToName?.split(' ')[0] || 'Unassigned'}</span>
                              </div>

                              <div className="flex items-center gap-1">
                                <select
                                  value={t.status}
                                  onChange={(e) => updateTask(t.id, { status: e.target.value as TaskStatus })}
                                  className="bg-[#111316] border border-white/[0.08] rounded px-1.5 py-0.5 text-[9px] text-white/70"
                                >
                                  <option value="todo">To Do</option>
                                  <option value="in_progress">In Progress</option>
                                  <option value="review">Review</option>
                                  <option value="done">Done</option>
                                </select>

                                <button
                                  onClick={() => openEditModal(t)}
                                  className="p-1 rounded hover:bg-white/[0.1] text-white/60 hover:text-white"
                                  title="Edit"
                                >
                                  <Edit2 className="w-3 h-3" />
                                </button>
                                <button
                                  onClick={() => setTaskToDelete(t)}
                                  className="p-1 rounded hover:bg-red-500/20 text-white/60 hover:text-red-400"
                                  title="Delete"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* View Mode 2: Table List View */}
        {viewMode === 'list' && (
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/[0.02] border-b border-white/[0.06] text-white/50 font-mono text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4 w-10">Done</th>
                  <th className="py-3 px-4">Task Title & Details</th>
                  <th className="py-3 px-4">Project</th>
                  <th className="py-3 px-4">Assignee</th>
                  <th className="py-3 px-4">Priority</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Due Date</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {filteredTasks.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-white/40 italic font-mono">
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
                          t.isCompleted ? 'opacity-50' : ''
                        }`}
                      >
                        <td className="py-3 px-4">
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
                        <td className="py-3 px-4">
                          <div className={`font-semibold text-white ${t.isCompleted ? 'line-through text-white/50' : ''}`}>
                            {t.title}
                          </div>
                          {t.description && <div className="text-[11px] text-white/50 mt-0.5">{t.description}</div>}
                        </td>
                        <td className="py-3 px-4 font-mono text-white/70">{proj?.companyName || 'Project'}</td>
                        <td className="py-3 px-4 font-mono text-white/80">{t.assignedToName || 'Unassigned'}</td>
                        <td className="py-3 px-4">
                          <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded ${priorityStyles[t.priority]}`}>
                            {t.priority}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <select
                            value={t.status}
                            onChange={(e) => updateTask(t.id, { status: e.target.value as TaskStatus })}
                            className="bg-[#111316] border border-white/[0.08] rounded px-2 py-0.5 text-xs text-white"
                          >
                            <option value="todo">To Do</option>
                            <option value="in_progress">In Progress</option>
                            <option value="review">In Review</option>
                            <option value="done">Completed</option>
                          </select>
                        </td>
                        <td className="py-3 px-4 font-mono text-white/60">{t.dueDate || '—'}</td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => openEditModal(t)}
                              className="p-1 rounded hover:bg-white/[0.08] text-white/60 hover:text-white"
                              title="Edit"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setTaskToDelete(t)}
                              className="p-1 rounded hover:bg-red-500/20 text-white/60 hover:text-red-400"
                              title="Delete"
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
        )}
      </div>

      {/* Create / Edit Task Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#0E1013] border border-white/[0.15] rounded-2xl p-6 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <h3 className="text-base font-bold text-white">
                {editingTask ? 'Edit Task' : 'Create New Sprint Task'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-white/60"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3.5">
              <div>
                <label className="block text-white/70 mb-1">Task Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Build faceted catalog search index"
                  className="w-full bg-[#111316] border border-white/[0.1] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D4FF3A]"
                />
              </div>

              <div>
                <label className="block text-white/70 mb-1">Associated Project *</label>
                <select
                  value={projectId}
                  onChange={(e) => setProjectId(e.target.value)}
                  className="w-full bg-[#111316] border border-white/[0.1] rounded-xl px-3 py-2 text-white focus:outline-none font-mono"
                >
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.companyName} — {p.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/70 mb-1">Assignee</label>
                  <select
                    value={assignedTo}
                    onChange={(e) => setAssignedTo(e.target.value)}
                    className="w-full bg-[#111316] border border-white/[0.1] rounded-xl px-3 py-2 text-white focus:outline-none font-mono"
                  >
                    {teamMembers.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name} ({m.department})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-white/70 mb-1">Priority</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as TaskPriority)}
                    className="w-full bg-[#111316] border border-white/[0.1] rounded-xl px-3 py-2 text-white focus:outline-none font-mono"
                  >
                    <option value="urgent">Urgent</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/70 mb-1">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as TaskStatus)}
                    className="w-full bg-[#111316] border border-white/[0.1] rounded-xl px-3 py-2 text-white focus:outline-none font-mono"
                  >
                    <option value="todo">To Do</option>
                    <option value="in_progress">In Progress</option>
                    <option value="review">In Review</option>
                    <option value="done">Completed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white/70 mb-1">Target Due Date</label>
                  <input
                    type="text"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    placeholder="e.g. In 5 days"
                    className="w-full bg-[#111316] border border-white/[0.1] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D4FF3A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/70 mb-1">Description / Acceptance Criteria</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Task details, technical specs, edge test criteria..."
                  className="w-full bg-[#111316] border border-white/[0.1] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D4FF3A]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-white/70"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-[#D4FF3A] text-[#08090A] font-bold hover:brightness-110 shadow-[0_4px_16px_rgba(212,255,58,0.25)]"
                >
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Task Confirmation Modal */}
      {taskToDelete && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-[#0E1013] border border-white/[0.15] rounded-2xl p-6 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center gap-2 text-red-400 pb-2 border-b border-white/[0.08]">
              <Trash2 className="w-4 h-4" />
              <h3 className="text-base font-bold text-white">Delete Sprint Task</h3>
            </div>
            <p className="text-white/70 leading-relaxed">
              Are you sure you want to delete task <strong className="text-white">{taskToDelete.title}</strong>?
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setTaskToDelete(null)}
                className="px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-white/70"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteTask(taskToDelete.id);
                  setTaskToDelete(null);
                }}
                className="px-4 py-1.5 rounded-lg bg-red-500 text-white font-bold hover:bg-red-600 shadow-[0_4px_16px_rgba(239,68,68,0.3)]"
              >
                Delete Task
              </button>
            </div>
          </div>
        </div>
      )}
    </PlatformLayout>
  );
}
