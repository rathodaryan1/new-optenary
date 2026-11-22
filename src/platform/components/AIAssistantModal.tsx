import { useState } from 'react';
import {
  Sparkles,
  X,
  FileSearch,
  FileCheck2,
  Send,
  Loader2,
  Copy,
  Check,
  Bot,
  Zap,
} from 'lucide-react';
import { usePlatform } from '../platformContext';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProjectId?: string;
}

export default function AIAssistantModal({
  isOpen,
  onClose,
  defaultProjectId,
}: AIAssistantModalProps) {
  const { projects, aiAnalyzeRequirements, aiGenerateProjectSummary, aiDraftClientUpdate } = usePlatform();

  const [activeTab, setActiveTab] = useState<'scope' | 'summary' | 'update'>('scope');

  // Scope Tab State
  const [scopeInput, setScopeInput] = useState(
    'We need an instant B2B distributor portal for spices and dry fruits. Over 500 wholesale products, sub-second search, bulk price tier calculation, and order dispatch via WhatsApp for regional dealers.'
  );
  const [scopeResult, setScopeResult] = useState<any>(null);
  const [scopeLoading, setScopeLoading] = useState(false);

  // Summary Tab State
  const [selectedProjectId, setSelectedProjectId] = useState<string>(
    defaultProjectId || (projects[0]?.id || '')
  );
  const [summaryResult, setSummaryResult] = useState<any>(null);
  const [summaryLoading, setSummaryLoading] = useState(false);

  // Update Tab State
  const [updateNotes, setUpdateNotes] = useState(
    '1. Finished sub-second search indexing.\n2. Deployed GST invoice generator on staging.\n3. Began testing WhatsApp auto dispatch.'
  );
  const [updateResult, setUpdateResult] = useState<any>(null);
  const [updateLoading, setUpdateLoading] = useState(false);

  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleRunScope = async () => {
    if (!scopeInput.trim()) return;
    setScopeLoading(true);
    try {
      const res = await aiAnalyzeRequirements(scopeInput);
      setScopeResult(res);
    } finally {
      setScopeLoading(false);
    }
  };

  const handleRunSummary = async () => {
    if (!selectedProjectId) return;
    setSummaryLoading(true);
    try {
      const res = await aiGenerateProjectSummary(selectedProjectId);
      setSummaryResult(res);
    } finally {
      setSummaryLoading(false);
    }
  };

  const handleRunUpdate = async () => {
    if (!updateNotes.trim()) return;
    setUpdateLoading(true);
    try {
      const res = await aiDraftClientUpdate(updateNotes);
      setUpdateResult(res);
    } finally {
      setUpdateLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-3xl bg-[#0D0E11] border border-white/[0.12] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#D4FF3A] to-purple-500 flex items-center justify-center text-[#08090A]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base tracking-tight flex items-center gap-2">
                <span>Optenary AI Operations Copilot</span>
                <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-mono border border-purple-500/30">
                  Section 18 Spec
                </span>
              </h3>
              <p className="text-xs text-white/50">
                Automating requirement analysis, executive summaries, and client updates.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/[0.08] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigator */}
        <div className="flex border-b border-white/[0.08] bg-[#0A0B0D] px-4 sm:px-6 overflow-x-auto whitespace-nowrap flex-nowrap">
          <button
            onClick={() => setActiveTab('scope')}
            className={`py-3 px-4 text-xs font-semibold flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === 'scope'
                ? 'border-[#D4FF3A] text-white'
                : 'border-transparent text-white/50 hover:text-white/80'
            }`}
          >
            <FileSearch className="w-3.5 h-3.5" />
            <span>AI Requirement Analyzer</span>
          </button>

          <button
            onClick={() => setActiveTab('summary')}
            className={`py-3 px-4 text-xs font-semibold flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === 'summary'
                ? 'border-[#D4FF3A] text-white'
                : 'border-transparent text-white/50 hover:text-white/80'
            }`}
          >
            <FileCheck2 className="w-3.5 h-3.5" />
            <span>AI Project Summarizer</span>
          </button>

          <button
            onClick={() => setActiveTab('update')}
            className={`py-3 px-4 text-xs font-semibold flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === 'update'
                ? 'border-[#D4FF3A] text-white'
                : 'border-transparent text-white/50 hover:text-white/80'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>AI Client Communicator</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* TAB 1: SCOPE & REQUIREMENT ANALYZER */}
          {activeTab === 'scope' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-white/80 mb-1.5">
                  Raw Client Intake / Rough Description
                </label>
                <textarea
                  rows={4}
                  value={scopeInput}
                  onChange={(e) => setScopeInput(e.target.value)}
                  placeholder="Paste what the client requested via WhatsApp, email, or meeting..."
                  className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl p-3 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#D4FF3A]"
                />
              </div>

              <button
                onClick={handleRunScope}
                disabled={scopeLoading}
                className="w-full py-2.5 px-4 rounded-xl bg-[#D4FF3A] text-[#08090A] font-bold text-xs tracking-tight flex items-center justify-center gap-2 hover:brightness-110 disabled:opacity-50 transition-all"
              >
                {scopeLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Analyzing Architectural Scope...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    <span>Generate Structured Engineering Scope</span>
                  </>
                )}
              </button>

              {scopeResult && (
                <div className="mt-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.1] space-y-3.5 text-xs">
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-2">
                    <span className="font-bold text-white uppercase font-mono tracking-wider text-[11px]">
                      Recommended Service: {scopeResult.suggestedService}
                    </span>
                    <span className="text-[#D4FF3A] font-mono font-bold">
                      ~{scopeResult.estimatedWeeks} Weeks • {scopeResult.recommendedBudget}
                    </span>
                  </div>

                  <div>
                    <span className="text-white/50 block font-medium mb-1">Architectural Pages:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {scopeResult.pages.map((p: string, idx: number) => (
                        <span key={idx} className="px-2.5 py-1 rounded-md bg-white/[0.06] text-white/90">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-white/50 block font-medium mb-1">Key Deliverable Features:</span>
                    <ul className="list-disc list-inside space-y-1 text-white/80">
                      {scopeResult.features.map((f: string, idx: number) => (
                        <li key={idx}>{f}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="text-white/50 block font-medium mb-1">Production Technology Stack:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {scopeResult.technicalStack.map((t: string, idx: number) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono text-[11px]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: PROJECT STATUS SUMMARY */}
          {activeTab === 'summary' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-white/80 mb-1.5">
                  Select Project to Summarize
                </label>
                <select
                  value={selectedProjectId}
                  onChange={(e) => setSelectedProjectId(e.target.value)}
                  className="w-full bg-[#111316] border border-white/[0.1] rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#D4FF3A]"
                >
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.companyName} — {p.title} ({p.progress}% Complete)
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleRunSummary}
                disabled={summaryLoading}
                className="w-full py-2.5 px-4 rounded-xl bg-[#D4FF3A] text-[#08090A] font-bold text-xs tracking-tight flex items-center justify-center gap-2 hover:brightness-110 disabled:opacity-50 transition-all"
              >
                {summaryLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Synthesizing Project Updates & Risks...</span>
                  </>
                ) : (
                  <>
                    <Bot className="w-4 h-4" />
                    <span>Generate Executive Status Summary</span>
                  </>
                )}
              </button>

              {summaryResult && (
                <div className="mt-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.1] space-y-3 text-xs">
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-2 font-bold text-white">
                    <span>{summaryResult.headline}</span>
                    <span className="text-white/40 font-mono text-[11px]">
                      Target: {summaryResult.nextMilestoneDeadline}
                    </span>
                  </div>

                  <div>
                    <span className="text-white/50 block font-medium mb-1">Delivered Highlights:</span>
                    <ul className="list-disc list-inside space-y-1 text-[#D4FF3A]">
                      {summaryResult.completedHighlights.map((h: string, idx: number) => (
                        <li key={idx} className="text-white/80">
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="text-white/50 block font-medium mb-1">Current Sprint Focus:</span>
                    <p className="text-white/90 bg-white/[0.05] p-2.5 rounded-lg">{summaryResult.activeFocus}</p>
                  </div>

                  <div>
                    <span className="text-white/50 block font-medium mb-1">Risk & Timeline Buffer:</span>
                    <p className="text-white/70">{summaryResult.risksAndBlockers}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: CLIENT UPDATE WRITER */}
          {activeTab === 'update' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-white/80 mb-1.5">
                  Internal Engineering Notes / Bullet Points
                </label>
                <textarea
                  rows={4}
                  value={updateNotes}
                  onChange={(e) => setUpdateNotes(e.target.value)}
                  placeholder="Enter raw technical bullet points..."
                  className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl p-3 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#D4FF3A]"
                />
              </div>

              <button
                onClick={handleRunUpdate}
                disabled={updateLoading}
                className="w-full py-2.5 px-4 rounded-xl bg-[#D4FF3A] text-[#08090A] font-bold text-xs tracking-tight flex items-center justify-center gap-2 hover:brightness-110 disabled:opacity-50 transition-all"
              >
                {updateLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Drafting Professional Update...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Draft Client Communication Message</span>
                  </>
                )}
              </button>

              {updateResult && (
                <div className="mt-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.1] space-y-3 text-xs relative">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white">{updateResult.title}</span>
                    <button
                      onClick={() => copyToClipboard(updateResult.formattedMessage)}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/[0.08] hover:bg-white/[0.14] text-white/80 text-[11px] transition-colors"
                    >
                      {copied ? <Check className="w-3 h-3 text-[#D4FF3A]" /> : <Copy className="w-3 h-3" />}
                      <span>{copied ? 'Copied' : 'Copy Message'}</span>
                    </button>
                  </div>

                  <pre className="whitespace-pre-wrap font-sans text-white/80 bg-black/40 p-3.5 rounded-xl border border-white/[0.06] leading-relaxed">
                    {updateResult.formattedMessage}
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
