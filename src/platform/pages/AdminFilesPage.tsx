import { useState, useRef } from 'react';
import {
  FileText,
  Trash2,
  Download,
  Upload,
  Search,
  AlertCircle,
  X,
} from 'lucide-react';
import { usePlatform } from '../platformContext';
import PlatformLayout from '../components/PlatformLayout';
import type { FileItem } from '../types';

export default function AdminFilesPage() {
  const { projects, addProjectFile, deleteProjectFile, addAuditLog } = usePlatform();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProjectId, setSelectedProjectId] = useState<string>('all');
  const [search, setSearch] = useState('');

  // Upload Modal State
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [targetProjectId, setTargetProjectId] = useState(projects[0]?.id || '');
  const [fileCategory, setFileCategory] = useState<FileItem['category']>('deliverables');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Delete Modal State
  const [fileToDelete, setFileToDelete] = useState<{ projectId: string; file: FileItem } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Aggregate files across projects
  const allFiles = projects.flatMap((p) =>
    p.files.map((f) => ({
      ...f,
      companyName: p.companyName,
      clientName: p.clientName,
    }))
  );

  const filteredFiles = allFiles.filter((f) => {
    if (selectedCategory !== 'all' && f.category !== selectedCategory) return false;
    if (selectedProjectId !== 'all' && f.projectId !== selectedProjectId) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        f.name.toLowerCase().includes(q) ||
        f.companyName.toLowerCase().includes(q) ||
        f.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setUploadError(null);

    if (!file) {
      setUploadedFile(null);
      return;
    }

    // Size limit: 15 MB
    const maxSize = 15 * 1024 * 1024;
    if (file.size > maxSize) {
      setUploadError('File size exceeds the 15MB maximum limit.');
      setUploadedFile(null);
      return;
    }

    setUploadedFile(file);
  };

  const handleConfirmUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadedFile || !targetProjectId) {
      setUploadError('Please select a valid file to upload.');
      return;
    }

    const formattedSize =
      uploadedFile.size > 1024 * 1024
        ? `${(uploadedFile.size / (1024 * 1024)).toFixed(1)} MB`
        : `${Math.round(uploadedFile.size / 1024)} KB`;

    const blobUrl = URL.createObjectURL(uploadedFile);
    const ext = uploadedFile.name.split('.').pop()?.toLowerCase() || 'file';

    addProjectFile(targetProjectId, {
      name: uploadedFile.name,
      category: fileCategory,
      size: formattedSize,
      url: blobUrl,
      type: ext,
      uploadedBy: 'Tirth Rathod (Lead Architect)',
    });

    const targetProject = projects.find((p) => p.id === targetProjectId);

    addAuditLog({
      actor: 'Tirth Rathod',
      action: 'File Uploaded',
      category: 'file',
      details: `Uploaded ${uploadedFile.name} (${formattedSize}) to ${targetProject?.companyName || 'Project'} under ${fileCategory}.`,
    });

    setUploadedFile(null);
    setShowUploadModal(false);
  };

  return (
    <PlatformLayout
      title="Project Deliverables & File Manager"
      subtitle="Section 10 Spec: Validated project file uploads, deliverables handover, contracts, and design assets."
      actions={
        <button
          onClick={() => {
            setUploadedFile(null);
            setUploadError(null);
            setShowUploadModal(true);
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#D4FF3A] text-[#08090A] text-xs font-bold tracking-tight hover:brightness-110 shadow-[0_4px_16px_rgba(212,255,58,0.25)] transition-all"
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Upload File</span>
        </button>
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
                placeholder="Search files by name or company..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#111316] border border-white/[0.1] rounded-lg pl-9 pr-3 py-1.5 text-white placeholder-white/40 focus:outline-none focus:border-[#D4FF3A]"
              />
            </div>

            {/* Project Filter */}
            <select
              value={selectedProjectId}
              onChange={(e) => setSelectedProjectId(e.target.value)}
              className="bg-[#111316] border border-white/[0.1] rounded-lg px-3 py-1.5 text-white font-mono text-[11px]"
            >
              <option value="all">All Projects ({projects.length})</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.companyName}
                </option>
              ))}
            </select>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1 font-mono text-[10px]">
            {['all', 'deliverables', 'designs', 'requirements', 'brand_assets', 'documents'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-md uppercase transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#D4FF3A] text-[#08090A] font-bold'
                    : 'bg-white/[0.03] text-white/60 hover:text-white'
                }`}
              >
                {cat.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Files Data Table */}
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/[0.02] border-b border-white/[0.06] text-white/50 font-mono text-[11px] uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">File Name & Format</th>
                <th className="py-3 px-4">Project / Client</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">File Size</th>
                <th className="py-3 px-4">Upload Date</th>
                <th className="py-3 px-4">Uploaded By</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {filteredFiles.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-white/40 italic font-mono">
                    No files found matching criteria.
                  </td>
                </tr>
              ) : (
                filteredFiles.map((file) => (
                  <tr key={file.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <FileText className="w-4 h-4 text-[#D4FF3A] flex-none" />
                        <div>
                          <span className="font-semibold text-white block">{file.name}</span>
                          <span className="text-[10px] font-mono text-white/40 uppercase">
                            .{file.type}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono text-white/80">
                      <div>{file.companyName}</div>
                      <div className="text-[10px] text-white/40">{file.clientName}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/[0.06] text-white/70">
                        {file.category.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-white/60">{file.size}</td>
                    <td className="py-3 px-4 font-mono text-white/40">{file.uploadedAt}</td>
                    <td className="py-3 px-4 font-mono text-white/60">{file.uploadedBy || 'Tirth Rathod'}</td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={file.url}
                          download={file.name}
                          className="p-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-white/70 hover:text-white transition-colors"
                          title="Download File"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </a>
                        <button
                          onClick={() => setFileToDelete({ projectId: file.projectId, file })}
                          className="p-1.5 rounded-lg bg-white/[0.05] hover:bg-red-500/20 text-white/70 hover:text-red-400 transition-colors"
                          title="Delete File"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Real File Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#0E1013] border border-white/[0.15] rounded-2xl p-6 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <Upload className="w-4 h-4 text-[#D4FF3A]" />
                <h3 className="text-base font-bold text-white">Upload Project File</h3>
              </div>
              <button
                onClick={() => setShowUploadModal(false)}
                className="p-1 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-white/60"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleConfirmUpload} className="space-y-3.5">
              <div>
                <label className="block text-white/70 mb-1">Target Project *</label>
                <select
                  value={targetProjectId}
                  onChange={(e) => setTargetProjectId(e.target.value)}
                  className="w-full bg-[#111316] border border-white/[0.1] rounded-xl px-3 py-2 text-white font-mono text-xs focus:outline-none"
                >
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.companyName} — {p.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white/70 mb-1">File Category</label>
                <select
                  value={fileCategory}
                  onChange={(e) => setFileCategory(e.target.value as any)}
                  className="w-full bg-[#111316] border border-white/[0.1] rounded-xl px-3 py-2 text-white font-mono text-xs focus:outline-none"
                >
                  <option value="deliverables">Deliverables & Code Handover</option>
                  <option value="designs">UI/UX Designs & Prototypes</option>
                  <option value="requirements">Requirements & Specifications</option>
                  <option value="brand_assets">Brand Assets & Logos</option>
                  <option value="documents">Contracts & Reports</option>
                </select>
              </div>

              {/* Real File Input Zone */}
              <div>
                <label className="block text-white/70 mb-1">Select File (Max 15MB) *</label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="p-6 rounded-xl border border-dashed border-white/20 hover:border-[#D4FF3A] bg-white/[0.02] flex flex-col items-center justify-center text-center cursor-pointer transition-colors space-y-2"
                >
                  <Upload className="w-6 h-6 text-white/40" />
                  {uploadedFile ? (
                    <div>
                      <div className="font-bold text-white text-xs">{uploadedFile.name}</div>
                      <div className="text-[10px] font-mono text-[#D4FF3A]">
                        {uploadedFile.size > 1024 * 1024
                          ? `${(uploadedFile.size / (1024 * 1024)).toFixed(1)} MB`
                          : `${Math.round(uploadedFile.size / 1024)} KB`}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="font-semibold text-white">Click or drag file here</div>
                      <div className="text-[10px] text-white/40 font-mono mt-0.5">
                        PDF, ZIP, PNG, JPG, SVG, DOCX, JSON (Max 15MB)
                      </div>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
              </div>

              {uploadError && (
                <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-2 text-red-400 text-xs">
                  <AlertCircle className="w-4 h-4 flex-none" />
                  <span>{uploadError}</span>
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-white/70"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!uploadedFile}
                  className="px-4 py-1.5 rounded-lg bg-[#D4FF3A] text-[#08090A] font-bold hover:brightness-110 shadow-[0_4px_16px_rgba(212,255,58,0.25)] disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Upload Deliverable
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete File Confirmation Modal */}
      {fileToDelete && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-[#0E1013] border border-white/[0.15] rounded-2xl p-6 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center gap-2 text-red-400 pb-2 border-b border-white/[0.08]">
              <Trash2 className="w-4 h-4" />
              <h3 className="text-base font-bold text-white">Delete File</h3>
            </div>
            <p className="text-white/70 leading-relaxed">
              Are you sure you want to delete file <strong className="text-white">{fileToDelete.file.name}</strong>?
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setFileToDelete(null)}
                className="px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-white/70"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteProjectFile(fileToDelete.projectId, fileToDelete.file.id);
                  setFileToDelete(null);
                }}
                className="px-4 py-1.5 rounded-lg bg-red-500 text-white font-bold hover:bg-red-600 shadow-[0_4px_16px_rgba(239,68,68,0.3)]"
              >
                Delete File
              </button>
            </div>
          </div>
        </div>
      )}
    </PlatformLayout>
  );
}
