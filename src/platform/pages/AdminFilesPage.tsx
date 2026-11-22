import { useState } from 'react';
import {
  FileText,
  Plus,
  Trash2,
  ExternalLink,
} from 'lucide-react';
import { usePlatform } from '../platformContext';
import PlatformLayout from '../components/PlatformLayout';
import type { FileItem } from '../types';

export default function AdminFilesPage() {
  const { projects, addProjectFile, deleteProjectFile } = usePlatform();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProjectId, setSelectedProjectId] = useState<string>('all');
  const [showModal, setShowModal] = useState(false);
  const [fileToDelete, setFileToDelete] = useState<{ projectId: string; file: FileItem } | null>(null);

  // Form State
  const [projectId, setProjectId] = useState(projects[0]?.id || '');
  const [fileName, setFileName] = useState('');
  const [category, setCategory] = useState<FileItem['category']>('deliverables');
  const [fileUrl, setFileUrl] = useState('');

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileName.trim() || !projectId) return;

    addProjectFile(projectId, {
      name: fileName.trim(),
      category,
      size: `${(Math.random() * 6 + 1).toFixed(1)} MB`,
      url: fileUrl.trim() || '#',
      type: fileName.split('.').pop() || 'file',
    });

    setFileName('');
    setFileUrl('');
    setShowModal(false);
  };

  // Aggregate files across projects
  const allFiles = projects.flatMap((p) =>
    p.files.map((f) => ({
      ...f,
      companyName: p.companyName,
    }))
  );

  const filteredFiles = allFiles.filter((f) => {
    if (selectedCategory !== 'all' && f.category !== selectedCategory) return false;
    if (selectedProjectId !== 'all' && f.projectId !== selectedProjectId) return false;
    return true;
  });

  return (
    <PlatformLayout
      title="Project Deliverables & File Management"
      subtitle="Section 12 Spec: Centralized repository for requirements, brand assets, UI/UX designs, and code handovers."
      actions={
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#D4FF3A] text-[#08090A] text-xs font-bold tracking-tight hover:brightness-110 shadow-[0_4px_16px_rgba(212,255,58,0.25)] transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Upload Deliverable</span>
        </button>
      }
    >
      <div className="space-y-6">
        {/* Filter Bar */}
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] flex flex-wrap items-center gap-3 text-xs">
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

          <div className="flex flex-wrap gap-1.5">
            {['all', 'deliverables', 'designs', 'requirements', 'brand_assets'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg font-mono text-[11px] uppercase transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#D4FF3A] text-[#08090A] font-bold'
                    : 'bg-white/[0.04] text-white/60 hover:text-white hover:bg-white/[0.08]'
                }`}
              >
                {cat.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Files Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredFiles.length === 0 ? (
            <div className="col-span-full text-center py-16 bg-white/[0.01] border border-white/[0.06] rounded-2xl text-xs text-white/40 italic">
              No files or deliverables matching this category.
            </div>
          ) : (
            filteredFiles.map((f) => (
              <div
                key={f.id}
                className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.15] transition-all flex flex-col justify-between space-y-4 relative group"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center flex-none text-[#D4FF3A]">
                    <FileText className="w-5 h-5" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-mono text-[#D4FF3A] block uppercase truncate">
                      {f.companyName}
                    </span>
                    <h4 className="text-xs font-bold text-white truncate mt-0.5" title={f.name}>
                      {f.name}
                    </h4>
                    <div className="text-[11px] text-white/40 font-mono mt-1">
                      {f.size} • {f.category.replace('_', ' ')}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/[0.04] flex items-center justify-between text-xs">
                  <span className="text-[10px] font-mono text-white/40">Uploaded {f.uploadedAt}</span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setFileToDelete({ projectId: f.projectId, file: f })}
                      className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-red-500/20 text-white/60 hover:text-red-400 transition-colors"
                      title="Delete file"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <a
                      href={f.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/[0.06] hover:bg-[#D4FF3A] hover:text-[#08090A] text-white text-[11px] font-semibold transition-all"
                    >
                      <span>Access</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Upload File Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-[#0D0E11] border border-white/[0.12] rounded-2xl p-6 space-y-4">
            <h3 className="font-bold text-white text-base">Attach Project Deliverable</h3>

            <form onSubmit={handleUpload} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-white/70 mb-1">Target Project *</label>
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
                <label className="block text-white/70 mb-1">File Name *</label>
                <input
                  type="text"
                  required
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  placeholder="e.g. Postgres_Cluster_Benchmark_Report.pdf"
                  className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D4FF3A]"
                />
              </div>

              <div>
                <label className="block text-white/70 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as FileItem['category'])}
                  className="w-full bg-[#111316] border border-white/[0.1] rounded-xl px-3 py-2 text-white"
                >
                  <option value="deliverables">Final Deliverable / Code Release</option>
                  <option value="designs">UI/UX Design & Prototype</option>
                  <option value="requirements">Specifications & Architecture</option>
                  <option value="brand_assets">Brand Assets & Logos</option>
                </select>
              </div>

              <div>
                <label className="block text-white/70 mb-1">File URL / Cloud Drive Link</label>
                <input
                  type="url"
                  value={fileUrl}
                  onChange={(e) => setFileUrl(e.target.value)}
                  placeholder="https://drive.google.com/... or https://github.com/..."
                  className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D4FF3A]"
                />
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
                  Upload & Sync
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {fileToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-sm bg-[#0D0E11] border border-white/[0.12] rounded-2xl p-6 space-y-4">
            <h3 className="font-bold text-white text-base">Remove File</h3>
            <p className="text-xs text-white/60">
              Are you sure you want to remove <span className="text-white font-semibold">"{fileToDelete.file.name}"</span>?
            </p>
            <div className="flex justify-end gap-2.5 pt-2">
              <button
                onClick={() => setFileToDelete(null)}
                className="px-3.5 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-xs text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteProjectFile(fileToDelete.projectId, fileToDelete.file.id);
                  setFileToDelete(null);
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
