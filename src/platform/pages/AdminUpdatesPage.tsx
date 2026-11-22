import { useState } from 'react';
import {
  MessageSquare,
  Send,
  Shield,
  Search,
  CheckCircle2,
} from 'lucide-react';
import { usePlatform } from '../platformContext';
import PlatformLayout from '../components/PlatformLayout';

export default function AdminUpdatesPage() {
  const { projects, auditLogs, addProjectUpdate, addAuditLog } = usePlatform();

  // Active Concept: 'client_updates' vs 'internal_audit'
  const [activeTab, setActiveTab] = useState<'client_updates' | 'internal_audit'>('client_updates');

  // Client Update Dispatcher State
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id || '');
  const [updateTitle, setUpdateTitle] = useState('');
  const [updateContent, setUpdateContent] = useState('');
  const [updateTag, setUpdateTag] = useState('Engineering');
  const [isPublic, setIsPublic] = useState(true);
  const [isPosting, setIsPosting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  // Internal Audit Filter
  const [auditCategory, setAuditCategory] = useState<string>('all');
  const [auditSearch, setAuditSearch] = useState('');

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!updateTitle.trim() || !updateContent.trim() || !selectedProjectId) return;

    setIsPosting(true);
    addProjectUpdate(selectedProjectId, {
      title: updateTitle.trim(),
      content: updateContent.trim(),
      author: 'Tirth Rathod (Lead Architect)',
      isPublicToClient: isPublic,
      tag: updateTag,
    });

    const targetProject = projects.find((p) => p.id === selectedProjectId);

    addAuditLog({
      actor: 'Tirth Rathod',
      action: 'Project Update Published',
      category: 'project',
      details: `Published "${updateTitle.trim()}" for ${targetProject?.companyName || 'Project'}. Visibility: ${
        isPublic ? 'Client Visible' : 'Internal Only'
      }.`,
    });

    setUpdateTitle('');
    setUpdateContent('');
    setIsPosting(false);
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 3000);
  };

  // Aggregate all updates across projects
  const allUpdates = projects.flatMap((p) =>
    p.updates.map((u) => ({
      ...u,
      companyName: p.companyName,
      projectTitle: p.title,
    }))
  );

  // Filtered internal audit logs
  const filteredAudit = auditLogs.filter((log) => {
    if (auditCategory !== 'all' && log.category !== auditCategory) return false;
    if (auditSearch.trim()) {
      const q = auditSearch.toLowerCase();
      return (
        log.action.toLowerCase().includes(q) ||
        log.details.toLowerCase().includes(q) ||
        log.actor.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <PlatformLayout
      title="Communications & Operations Activity"
      subtitle="Section 09 Spec: Clearly separated client-facing sprint progress updates and internal administrative audit logs."
    >
      <div className="space-y-6">
        {/* Concept Switcher Tabs */}
        <div className="flex items-center gap-2 border-b border-white/[0.08] pb-1 text-xs font-mono">
          <button
            onClick={() => setActiveTab('client_updates')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl transition-all ${
              activeTab === 'client_updates'
                ? 'border-b-2 border-[#D4FF3A] text-white font-bold bg-white/[0.03]'
                : 'text-white/50 hover:text-white'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#D4FF3A]" />
            <span>A. Client-Visible Project Updates ({allUpdates.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('internal_audit')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl transition-all ${
              activeTab === 'internal_audit'
                ? 'border-b-2 border-[#D4FF3A] text-white font-bold bg-white/[0.03]'
                : 'text-white/50 hover:text-white'
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-orange-400" />
            <span>B. Internal Operations Audit Log ({auditLogs.length})</span>
          </button>
        </div>

        {/* Tab A: Client-Visible Project Updates */}
        {activeTab === 'client_updates' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Dispatcher Form */}
            <div className="lg:col-span-1 space-y-4">
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-4 text-xs">
                <div className="flex items-center gap-2 pb-2 border-b border-white/[0.06]">
                  <MessageSquare className="w-4 h-4 text-[#D4FF3A]" />
                  <h3 className="text-sm font-bold text-white">Broadcast Client Update</h3>
                </div>

                {successMsg && (
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2 text-emerald-400 text-xs">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Update broadcasted to client feed!</span>
                  </div>
                )}

                <form onSubmit={handlePost} className="space-y-3.5">
                  <div>
                    <label className="block text-white/70 mb-1">Target Project *</label>
                    <select
                      value={selectedProjectId}
                      onChange={(e) => setSelectedProjectId(e.target.value)}
                      className="w-full bg-[#111316] border border-white/[0.1] rounded-xl px-3 py-2 text-white focus:outline-none font-mono"
                    >
                      {projects.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.companyName} — {p.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-white/70 mb-1">Update Headline *</label>
                    <input
                      type="text"
                      required
                      value={updateTitle}
                      onChange={(e) => setUpdateTitle(e.target.value)}
                      placeholder="e.g. Sub-Second Query Cache Deployed"
                      className="w-full bg-[#111316] border border-white/[0.1] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D4FF3A]"
                    />
                  </div>

                  <div>
                    <label className="block text-white/70 mb-1">Category Tag</label>
                    <select
                      value={updateTag}
                      onChange={(e) => setUpdateTag(e.target.value)}
                      className="w-full bg-[#111316] border border-white/[0.1] rounded-xl px-3 py-2 text-white focus:outline-none font-mono"
                    >
                      <option value="Engineering">Engineering Sprint</option>
                      <option value="Milestone">Milestone Achieved</option>
                      <option value="UI/UX Design">UI/UX Design Handover</option>
                      <option value="QA Audit">QA Audit & Benchmarks</option>
                      <option value="Deployment">Staging / Production Go-Live</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white/70 mb-1">Update Content (Markdown / Text) *</label>
                    <textarea
                      rows={4}
                      required
                      value={updateContent}
                      onChange={(e) => setUpdateContent(e.target.value)}
                      placeholder="Provide transparent sprint progress for the client portal..."
                      className="w-full bg-[#111316] border border-white/[0.1] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D4FF3A]"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="isPublic"
                      checked={isPublic}
                      onChange={(e) => setIsPublic(e.target.checked)}
                      className="rounded bg-[#111316] border-white/20 text-[#D4FF3A] focus:ring-0"
                    />
                    <label htmlFor="isPublic" className="text-white/70 text-[11px] cursor-pointer">
                      Publish to client's portal feed immediately
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isPosting}
                    className="w-full py-2.5 rounded-xl bg-[#D4FF3A] text-[#08090A] font-bold hover:brightness-110 shadow-[0_4px_16px_rgba(212,255,58,0.25)] flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Publish Update</span>
                  </button>
                </form>
              </div>
            </div>

            {/* Right: Broadcast Feed */}
            <div className="lg:col-span-2 space-y-4">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] flex items-center justify-between text-xs">
                <span className="font-bold text-white font-mono uppercase">
                  Published Client Updates Feed ({allUpdates.length})
                </span>
                <span className="text-[10px] font-mono text-white/40">Visible to Authenticated Clients</span>
              </div>

              <div className="space-y-3">
                {allUpdates.length === 0 ? (
                  <div className="p-12 rounded-2xl bg-white/[0.02] border border-white/[0.08] text-center text-white/40 italic font-mono text-xs">
                    No updates published yet.
                  </div>
                ) : (
                  allUpdates.map((u) => (
                    <div
                      key={u.id}
                      className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2 text-xs"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/[0.06] text-[#D4FF3A] font-bold">
                            {u.companyName}
                          </span>
                          <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/[0.04] text-white/60">
                            {u.tag || 'Update'}
                          </span>
                        </div>
                        <span className="font-mono text-[10px] text-white/40">{u.date}</span>
                      </div>

                      <h4 className="text-sm font-bold text-white">{u.title}</h4>
                      <p className="text-white/70 leading-relaxed text-[11px]">{u.content}</p>

                      <div className="pt-2 border-t border-white/[0.04] flex items-center justify-between text-[10px] font-mono text-white/40">
                        <span>Posted by {u.author}</span>
                        <span className="text-emerald-400">✓ Verified Live</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab B: Internal Administrative Activity Audit Log */}
        {activeTab === 'internal_audit' && (
          <div className="space-y-4 text-xs">
            {/* Filter Bar */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3 flex-1 min-w-[240px]">
                <div className="relative flex-1 max-w-sm">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-white/40" />
                  <input
                    type="text"
                    placeholder="Search operations audit log..."
                    value={auditSearch}
                    onChange={(e) => setAuditSearch(e.target.value)}
                    className="w-full bg-[#111316] border border-white/[0.1] rounded-lg pl-9 pr-3 py-1.5 text-white placeholder-white/40 focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-1 font-mono text-[10px]">
                  {['all', 'lead', 'client', 'project', 'task', 'file'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setAuditCategory(cat)}
                      className={`px-2.5 py-1 rounded-md uppercase transition-all ${
                        auditCategory === cat
                          ? 'bg-[#D4FF3A] text-[#08090A] font-bold'
                          : 'bg-white/[0.03] text-white/60 hover:text-white'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <span className="text-[10px] font-mono text-orange-400 flex items-center gap-1">
                <Shield className="w-3 h-3" />
                <span>Internal System Only — Hidden from Clients</span>
              </span>
            </div>

            {/* Audit Log Table */}
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-white/[0.02] border-b border-white/[0.06] text-white/50 font-mono text-[11px] uppercase">
                  <tr>
                    <th className="py-2.5 px-3">Timestamp</th>
                    <th className="py-2.5 px-3">Actor</th>
                    <th className="py-2.5 px-3">Category</th>
                    <th className="py-2.5 px-3">Action</th>
                    <th className="py-2.5 px-3">Audit Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {filteredAudit.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-white/40 italic font-mono">
                        No operations audit events found.
                      </td>
                    </tr>
                  ) : (
                    filteredAudit.map((log) => (
                      <tr key={log.id} className="hover:bg-white/[0.02]">
                        <td className="py-3 px-3 font-mono text-white/40 whitespace-nowrap">{log.timestamp}</td>
                        <td className="py-3 px-3 font-semibold text-white">{log.actor}</td>
                        <td className="py-3 px-3">
                          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/[0.06] text-white/70">
                            {log.category}
                          </span>
                        </td>
                        <td className="py-3 px-3 font-bold text-[#D4FF3A]">{log.action}</td>
                        <td className="py-3 px-3 text-white/70 leading-relaxed">{log.details}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </PlatformLayout>
  );
}
