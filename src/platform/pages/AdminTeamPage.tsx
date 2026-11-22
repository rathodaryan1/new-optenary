import { useState } from 'react';
import {
  Plus,
  Mail,
  FolderKanban,
  CheckSquare,
  Trash2,
  Edit2,
  X,
} from 'lucide-react';
import { usePlatform } from '../platformContext';
import PlatformLayout from '../components/PlatformLayout';
import type { TeamMember } from '../types';

export default function AdminTeamPage() {
  const { teamMembers, tasks, projects, addTeamMember, updateTeamMember, deleteTeamMember } =
    usePlatform();

  const [showModal, setShowModal] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [memberToDelete, setMemberToDelete] = useState<TeamMember | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [roleTitle, setRoleTitle] = useState('');
  const [department, setDepartment] = useState('Engineering');

  const openCreateModal = () => {
    setEditingMember(null);
    setName('');
    setEmail('');
    setRoleTitle('');
    setDepartment('Engineering');
    setShowModal(true);
  };

  const openEditModal = (member: TeamMember) => {
    setEditingMember(member);
    setName(member.name);
    setEmail(member.email);
    setRoleTitle(member.roleTitle);
    setDepartment(member.department);
    setShowModal(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    if (editingMember) {
      updateTeamMember(editingMember.id, {
        name: name.trim(),
        email: email.trim(),
        roleTitle: roleTitle.trim(),
        department,
      });
    } else {
      addTeamMember({
        name: name.trim(),
        email: email.trim(),
        roleTitle: roleTitle.trim() || 'Software Engineer',
        department,
        avatarUrl: name.trim().slice(0, 2).toUpperCase(),
      });
    }

    setShowModal(false);
  };

  return (
    <PlatformLayout
      title="Engineering & Operations Team"
      subtitle="Section 08 Spec: Staff allocation, active sprint capacity, and department oversight."
      actions={
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#D4FF3A] text-[#08090A] text-xs font-bold tracking-tight hover:brightness-110 shadow-[0_4px_16px_rgba(212,255,58,0.25)] transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Team Member</span>
        </button>
      }
    >
      <div className="space-y-6">
        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {teamMembers.map((member) => {
            const memberTasks = tasks.filter((t) => t.assignedTo === member.id && !t.isCompleted);

            // Compute member's active projects
            const memberProjects = projects.filter(
              (p) =>
                p.teamMembers.some((tm) => tm.name.toLowerCase().includes(member.name.toLowerCase())) ||
                tasks.some((t) => t.projectId === p.id && t.assignedTo === member.id)
            );

            // Workload calculation: 4 active tasks = 100% capacity
            const workloadPct = Math.min(Math.round((memberTasks.length / 4) * 100), 100);

            return (
              <div
                key={member.id}
                className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.15] transition-all flex flex-col justify-between space-y-4 relative group text-xs"
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#D4FF3A]/20 to-purple-500/20 border border-[#D4FF3A]/30 flex items-center justify-center font-bold text-white text-sm font-mono">
                      {member.avatarUrl || member.name.slice(0, 2).toUpperCase()}
                    </div>

                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => openEditModal(member)}
                        className="p-1 rounded bg-white/[0.05] hover:bg-white/[0.1] text-white/70"
                        title="Edit member"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setMemberToDelete(member)}
                        className="p-1 rounded bg-white/[0.05] hover:bg-red-500/20 text-white/70 hover:text-red-400"
                        title="Deactivate / Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-white tracking-tight">{member.name}</h3>
                  <div className="text-[11px] text-[#D4FF3A] font-mono mt-0.5">{member.roleTitle}</div>
                  <div className="text-[10px] text-white/40 font-mono mt-0.5">{member.department}</div>

                  <div className="pt-3 mt-3 border-t border-white/[0.04] space-y-2">
                    <div className="flex items-center gap-2 text-white/60 text-[11px] font-mono truncate">
                      <Mail className="w-3 h-3 flex-none text-white/40" />
                      <span className="truncate">{member.email}</span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-white/50">
                      <span className="flex items-center gap-1">
                        <FolderKanban className="w-3 h-3 text-[#D4FF3A]" />
                        <span>{memberProjects.length} Projects</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <CheckSquare className="w-3 h-3 text-orange-400" />
                        <span>{memberTasks.length} Active Tasks</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Workload Meter */}
                <div className="pt-2 border-t border-white/[0.04] space-y-1.5 font-mono">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-white/40">Sprint Capacity</span>
                    <span
                      className={`font-bold ${
                        workloadPct >= 80 ? 'text-orange-400' : 'text-[#D4FF3A]'
                      }`}
                    >
                      {workloadPct}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        workloadPct >= 80 ? 'bg-orange-400' : 'bg-[#D4FF3A]'
                      }`}
                      style={{ width: `${workloadPct}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add / Edit Member Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#0E1013] border border-white/[0.15] rounded-2xl p-6 shadow-2xl space-y-4 text-xs max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <h3 className="text-base font-bold text-white">
                {editingMember ? 'Edit Team Member' : 'Add Team Member'}
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
                <label className="block text-white/70 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Aryan Rathod"
                  className="w-full bg-[#111316] border border-white/[0.1] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D4FF3A]"
                />
              </div>

              <div>
                <label className="block text-white/70 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="aryan@optenary.in"
                  className="w-full bg-[#111316] border border-white/[0.1] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D4FF3A]"
                />
              </div>

              <div>
                <label className="block text-white/70 mb-1">Role Title *</label>
                <input
                  type="text"
                  required
                  value={roleTitle}
                  onChange={(e) => setRoleTitle(e.target.value)}
                  placeholder="e.g. Lead Full-Stack Architect"
                  className="w-full bg-[#111316] border border-white/[0.1] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D4FF3A]"
                />
              </div>

              <div>
                <label className="block text-white/70 mb-1">Department</label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full bg-[#111316] border border-white/[0.1] rounded-xl px-3 py-2 text-white focus:outline-none font-mono"
                >
                  <option value="Engineering & Architecture">Engineering & Architecture</option>
                  <option value="Infrastructure & Cloud">Infrastructure & Cloud</option>
                  <option value="Frontend & Mobile">Frontend & Mobile</option>
                  <option value="Design Systems & UI/UX">Design Systems & UI/UX</option>
                  <option value="Product Operations">Product Operations</option>
                </select>
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
                  Save Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Member Confirmation Modal */}
      {memberToDelete && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-[#0E1013] border border-white/[0.15] rounded-2xl p-6 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center gap-2 text-red-400 pb-2 border-b border-white/[0.08]">
              <Trash2 className="w-4 h-4" />
              <h3 className="text-base font-bold text-white">Deactivate Member</h3>
            </div>
            <p className="text-white/70 leading-relaxed">
              Are you sure you want to deactivate <strong className="text-white">{memberToDelete.name}</strong>?
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setMemberToDelete(null)}
                className="px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-white/70"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteTeamMember(memberToDelete.id);
                  setMemberToDelete(null);
                }}
                className="px-4 py-1.5 rounded-lg bg-red-500 text-white font-bold hover:bg-red-600 shadow-[0_4px_16px_rgba(239,68,68,0.3)]"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </PlatformLayout>
  );
}
