import { useState } from 'react';
import {
  Plus,
  Mail,
  FolderKanban,
  CheckSquare,
  Trash2,
  Edit2,
  ShieldCheck,
} from 'lucide-react';
import { usePlatform } from '../platformContext';
import PlatformLayout from '../components/PlatformLayout';
import type { TeamMember } from '../types';

export default function AdminTeamPage() {
  const { teamMembers, tasks, addTeamMember, updateTeamMember, deleteTeamMember } =
    usePlatform();

  const [showModal, setShowModal] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [memberToDelete, setMemberToDelete] = useState<TeamMember | null>(null);

  // Form
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
      });
    }

    setShowModal(false);
  };

  return (
    <PlatformLayout
      title="Engineering & Operations Team"
      subtitle="Section 10 Spec: Manage studio team members, monitor sprint workloads, and review project assignments."
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
            const completedTasks = tasks.filter((t) => t.assignedTo === member.id && t.isCompleted);

            return (
              <div
                key={member.id}
                className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.15] transition-all flex flex-col justify-between space-y-4 relative group"
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#D4FF3A]/20 to-purple-500/20 border border-[#D4FF3A]/30 flex items-center justify-center font-bold text-white text-sm">
                      {member.avatarUrl || member.name.slice(0, 2).toUpperCase()}
                    </div>

                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => openEditModal(member)}
                        className="p-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-white/70 hover:text-white"
                        title="Edit member"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setMemberToDelete(member)}
                        className="p-1.5 rounded-lg bg-white/[0.05] hover:bg-red-500/20 text-white/70 hover:text-red-400"
                        title="Delete member"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <h3 className="font-bold text-base text-white">{member.name}</h3>
                  <div className="text-xs text-[#D4FF3A] font-medium mt-0.5">{member.roleTitle}</div>
                  <div className="text-[11px] font-mono text-white/40 mt-1 flex items-center gap-1">
                    <Mail className="w-3 h-3" />
                    <span>{member.email}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/[0.06] space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/50 flex items-center gap-1">
                      <CheckSquare className="w-3.5 h-3.5 text-[#D4FF3A]" />
                      <span>Active Tasks:</span>
                    </span>
                    <span className="font-mono font-bold text-white">{memberTasks.length}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/50 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Completed:</span>
                    </span>
                    <span className="font-mono font-bold text-emerald-400">{completedTasks.length}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Workload Overview Table */}
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-4">
          <div className="flex items-center gap-2">
            <FolderKanban className="w-4 h-4 text-[#D4FF3A]" />
            <h3 className="text-base font-bold text-white tracking-tight">Active Workload & Capacity</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/[0.04] text-white/50 font-mono text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="py-2.5 px-4">Engineer</th>
                  <th className="py-2.5 px-4">Department</th>
                  <th className="py-2.5 px-4">Active Tasks</th>
                  <th className="py-2.5 px-4">Bandwidth Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {teamMembers.map((m) => {
                  const activeCount = tasks.filter((t) => t.assignedTo === m.id && !t.isCompleted).length;
                  const isHeavy = activeCount >= 3;

                  return (
                    <tr key={m.id} className="hover:bg-white/[0.02]">
                      <td className="py-3 px-4 font-semibold text-white">{m.name}</td>
                      <td className="py-3 px-4 text-white/60">{m.department}</td>
                      <td className="py-3 px-4 font-mono font-bold text-white">{activeCount} tasks</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                            isHeavy
                              ? 'bg-orange-500/20 text-orange-400'
                              : 'bg-emerald-500/20 text-emerald-400'
                          }`}
                        >
                          {isHeavy ? 'High Load' : 'Available Capacity'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add / Edit Member Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-[#0D0E11] border border-white/[0.12] rounded-2xl p-6 space-y-4">
            <h3 className="font-bold text-white text-base">
              {editingMember ? 'Edit Team Member' : 'Register New Team Member'}
            </h3>
            <form onSubmit={handleSave} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-white/70 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Aryan Rathod"
                  className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-white/70 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. aryan@optenary.in"
                  className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-white/70 mb-1">Role Title</label>
                <input
                  type="text"
                  value={roleTitle}
                  onChange={(e) => setRoleTitle(e.target.value)}
                  placeholder="e.g. Senior Full-Stack Architect"
                  className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-white/70 mb-1">Department</label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full bg-[#111316] border border-white/[0.1] rounded-xl px-3 py-2 text-white"
                >
                  <option value="Engineering">Engineering</option>
                  <option value="Architecture">Architecture</option>
                  <option value="Frontend & Mobile">Frontend & Mobile</option>
                  <option value="Design">Design Systems</option>
                  <option value="Operations">Operations & QA</option>
                </select>
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
                  {editingMember ? 'Save Changes' : 'Add Member'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {memberToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-sm bg-[#0D0E11] border border-white/[0.12] rounded-2xl p-6 space-y-4">
            <h3 className="font-bold text-white text-base">Remove Team Member</h3>
            <p className="text-xs text-white/60">
              Are you sure you want to remove <span className="text-white font-semibold">"{memberToDelete.name}"</span>?
            </p>
            <div className="flex justify-end gap-2.5 pt-2">
              <button
                onClick={() => setMemberToDelete(null)}
                className="px-3.5 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-xs text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteTeamMember(memberToDelete.id);
                  setMemberToDelete(null);
                }}
                className="px-4 py-1.5 rounded-lg bg-red-500 hover:bg-red-600 text-xs font-bold text-white"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </PlatformLayout>
  );
}
