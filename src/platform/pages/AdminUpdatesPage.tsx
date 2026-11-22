import { useState } from 'react';
import {
  MessageSquare,
  Send,
} from 'lucide-react';
import { usePlatform } from '../platformContext';
import PlatformLayout from '../components/PlatformLayout';

export default function AdminUpdatesPage() {
  const { projects, addProjectUpdate } = usePlatform();

  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id || '');
  const [updateTitle, setUpdateTitle] = useState('');
  const [updateContent, setUpdateContent] = useState('');
  const [updateTag, setUpdateTag] = useState('Engineering');
  const [isPublic, setIsPublic] = useState(true);
  const [isPosting, setIsPosting] = useState(false);

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

    setUpdateTitle('');
    setUpdateContent('');
    setIsPosting(false);
  };

  // Aggregate all updates across projects
  const allUpdates = projects.flatMap((p) =>
    p.updates.map((u) => ({
      ...u,
      companyName: p.companyName,
      projectTitle: p.title,
    }))
  );

  return (
    <PlatformLayout
      title="Client Updates & Communications Feed"
      subtitle="Sections 07 & 13 Spec: Post verified sprint updates and maintain transparent client communication."
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Post New Update */}
        <div className="lg:col-span-1 space-y-4">
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-white/[0.06]">
              <MessageSquare className="w-4 h-4 text-[#D4FF3A]" />
              <h3 className="text-base font-bold text-white tracking-tight">Publish Project Update</h3>
            </div>

            <form onSubmit={handlePost} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-white/70 mb-1">Target Project *</label>
                <select
                  value={selectedProjectId}
                  onChange={(e) => setSelectedProjectId(e.target.value)}
                  className="w-full bg-[#111316] border border-white/[0.1] rounded-xl px-3 py-2 text-white"
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
                  className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D4FF3A]"
                />
              </div>

              <div>
                <label className="block text-white/70 mb-1">Category Tag</label>
                <select
                  value={updateTag}
                  onChange={(e) => setUpdateTag(e.target.value)}
                  className="w-full bg-[#111316] border border-white/[0.1] rounded-xl px-3 py-2 text-white"
                >
                  <option value="Engineering">Engineering</option>
                  <option value="Milestone">Milestone Achieved</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                  <option value="QA Audit">QA Audit</option>
                  <option value="Deployment">Staging / Production</option>
                </select>
              </div>

              <div>
                <label className="block text-white/70 mb-1">Message Content *</label>
                <textarea
                  rows={4}
                  required
                  value={updateContent}
                  onChange={(e) => setUpdateContent(e.target.value)}
                  placeholder="Clear, professional update visible on the client's live portal..."
                  className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl p-3 text-white focus:outline-none focus:border-[#D4FF3A]"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isPublic"
                  checked={isPublic}
                  onChange={(e) => setIsPublic(e.target.checked)}
                  className="accent-[#D4FF3A] rounded"
                />
                <label htmlFor="isPublic" className="text-white/70">
                  Visible on Client's Portal Feed
                </label>
              </div>

              <button
                type="submit"
                disabled={isPosting}
                className="w-full py-2.5 rounded-xl bg-[#D4FF3A] text-[#08090A] font-bold text-xs tracking-tight flex items-center justify-center gap-2 hover:brightness-110 transition-all shadow-[0_4px_16px_rgba(212,255,58,0.25)]"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isPosting ? 'Publishing...' : 'Dispatch Update to Client Feed'}</span>
              </button>
            </form>
          </div>
        </div>

        {/* Right 2 Columns: Chronological Live Feed */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">Active Communications Log</h3>
              <p className="text-xs text-white/50">All updates published across active clients.</p>
            </div>
            <span className="text-xs font-mono text-[#D4FF3A]">{allUpdates.length} Published Updates</span>
          </div>

          <div className="space-y-3.5">
            {allUpdates.length === 0 ? (
              <div className="text-center py-12 bg-white/[0.01] border border-white/[0.06] rounded-2xl text-xs text-white/40">
                No updates published yet.
              </div>
            ) : (
              allUpdates.map((u) => (
                <div
                  key={u.id}
                  className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.15] transition-all space-y-2.5 text-xs"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#D4FF3A]" />
                      <span className="font-bold text-white">{u.companyName}</span>
                      <span className="text-white/40 font-mono text-[11px]">• {u.author}</span>
                    </div>

                    <div className="flex items-center gap-2 font-mono text-[10px]">
                      <span className="px-2 py-0.5 rounded-full bg-white/[0.06] text-white/70 uppercase">
                        {u.tag || 'Update'}
                      </span>
                      <span className="text-white/40">{u.date}</span>
                    </div>
                  </div>

                  <h4 className="text-sm font-semibold text-white tracking-tight">{u.title}</h4>
                  <p className="text-white/70 leading-relaxed whitespace-pre-line">{u.content}</p>

                  <div className="pt-2 border-t border-white/[0.04] flex items-center justify-between text-[11px] font-mono text-white/40">
                    <span>Project: {u.projectTitle}</span>
                    <span className="text-emerald-400">● Live on Client Portal</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </PlatformLayout>
  );
}
