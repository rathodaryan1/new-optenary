import { useState } from 'react';
import {
  FileCheck2,
  Plus,
  CheckCircle2,
} from 'lucide-react';
import { usePlatform } from '../platformContext';
import PlatformLayout from '../components/PlatformLayout';
import type { Lead, LeadStatus } from '../types';

export default function AdminLeadsCrmPage() {
  const { leads, addLead, updateLeadStatus, createProposal, convertLeadToClient } =
    usePlatform();

  // New Lead Modal State
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [leadName, setLeadName] = useState('');
  const [leadCompany, setLeadCompany] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadService, setLeadService] = useState('Custom Software & ERP');
  const [leadBudget, setLeadBudget] = useState('₹50,000');
  const [leadNotes, setLeadNotes] = useState('');

  // Proposal Creator State
  const [selectedLeadForProposal, setSelectedLeadForProposal] = useState<Lead | null>(null);
  const [proposalTitle, setProposalTitle] = useState('');
  const [proposalAmount, setProposalAmount] = useState('₹50,000');
  const [proposalWeeks, setProposalWeeks] = useState(4);
  const [proposalScopeText, setProposalScopeText] = useState('1. Database Architecture\n2. Real-time Staging\n3. Client Review');

  const STAGES: { key: LeadStatus; label: string }[] = [
    { key: 'new', label: 'New Enquiry' },
    { key: 'contacted', label: 'Contacted' },
    { key: 'qualified', label: 'Qualified' },
    { key: 'proposal_sent', label: 'Proposal Sent' },
    { key: 'won', label: 'Won / Approved' },
  ];

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadCompany || !leadName) return;

    addLead({
      name: leadName,
      company: leadCompany,
      email: leadEmail,
      phone: leadPhone,
      service: leadService,
      budget: leadBudget,
      status: 'new',
      notes: leadNotes,
    });

    setShowLeadModal(false);
    setLeadName('');
    setLeadCompany('');
    setLeadEmail('');
    setLeadPhone('');
    setLeadNotes('');
  };

  const handleCreateProposal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLeadForProposal) return;

    const scopeItems = proposalScopeText
      .split('\n')
      .map((s) => s.replace(/^\d+\.\s*/, '').trim())
      .filter(Boolean);

    createProposal(selectedLeadForProposal.id, {
      title: proposalTitle || `${selectedLeadForProposal.company} Solution Proposal`,
      totalAmount: proposalAmount,
      timelineWeeks: proposalWeeks,
      scopeItems,
      status: 'sent',
      validUntil: 'In 14 Days',
    });

    setSelectedLeadForProposal(null);
  };

  const handleApproveAndConvert = (leadId: string) => {
    const res = convertLeadToClient(leadId);
    if (res) {
      alert(`Success! ${res.client.company} has been converted into an active client and project.`);
    }
  };

  return (
    <PlatformLayout
      title="Lead CRM & Proposal Engine"
      subtitle="Sections 05, 14 & 15 Spec: Track inbound enquiries through proposal creation to automatic project kickoff."
      actions={
        <button
          onClick={() => setShowLeadModal(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#D4FF3A] text-[#08090A] text-xs font-bold tracking-tight hover:brightness-110 shadow-[0_4px_16px_rgba(212,255,58,0.25)] transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Inbound Enquiry</span>
        </button>
      }
    >
      <div className="space-y-8">
        {/* Pipeline Columns View */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-4">
          {STAGES.map((stage) => {
            const stageLeads = leads.filter((l) => l.status === stage.key);

            return (
              <div
                key={stage.key}
                className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col min-w-[220px]"
              >
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] mb-3">
                  <span className="text-xs font-bold text-white tracking-tight">{stage.label}</span>
                  <span className="px-2 py-0.5 rounded-full bg-white/[0.06] text-[10px] font-mono text-white/60">
                    {stageLeads.length}
                  </span>
                </div>

                <div className="space-y-3 flex-1">
                  {stageLeads.length === 0 ? (
                    <div className="text-center py-8 text-[11px] text-white/30 italic">No leads in stage</div>
                  ) : (
                    stageLeads.map((lead) => (
                      <div
                        key={lead.id}
                        className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.18] transition-all space-y-2.5 text-xs group"
                      >
                        <div className="flex items-start justify-between">
                          <h4 className="font-bold text-white tracking-tight">{lead.company}</h4>
                          <span className="text-[10px] font-mono text-[#D4FF3A]">{lead.budget}</span>
                        </div>

                        <p className="text-[11px] text-white/60 line-clamp-2">{lead.notes || lead.service}</p>

                        <div className="text-[10px] text-white/40 font-mono">{lead.name} • {lead.createdAt}</div>

                        {/* Stage Controls */}
                        <div className="pt-2 border-t border-white/[0.04] flex flex-wrap gap-1.5 justify-between items-center">
                          {lead.status !== 'won' && (
                            <select
                              value={lead.status}
                              onChange={(e) => updateLeadStatus(lead.id, e.target.value as LeadStatus)}
                              className="bg-[#111316] border border-white/[0.1] rounded px-1.5 py-0.5 text-[10px] text-white"
                            >
                              <option value="new">New</option>
                              <option value="contacted">Contacted</option>
                              <option value="qualified">Qualified</option>
                              <option value="proposal_sent">Proposal Sent</option>
                              <option value="won">Won</option>
                            </select>
                          )}

                          {lead.status === 'qualified' && !lead.proposal && (
                            <button
                              onClick={() => {
                                setSelectedLeadForProposal(lead);
                                setProposalTitle(`${lead.company} ${lead.service}`);
                                setProposalAmount(lead.budget);
                              }}
                              className="text-[10px] text-[#D4FF3A] hover:underline font-semibold"
                            >
                              + Proposal
                            </button>
                          )}

                          {lead.status === 'proposal_sent' && (
                            <button
                              onClick={() => handleApproveAndConvert(lead.id)}
                              className="w-full mt-1 py-1 rounded bg-[#D4FF3A] text-[#08090A] font-bold text-[10px] tracking-tight flex items-center justify-center gap-1"
                            >
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Convert to Client</span>
                            </button>
                          )}

                          {lead.status === 'won' && (
                            <span className="text-[10px] text-emerald-400 font-mono font-bold flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Active Project</span>
                            </span>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Proposals Showcase & Creator (Section 15 Spec) */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-[#D4FF3A]" />
                <h3 className="text-base font-bold text-white tracking-tight">Active Proposals & Scopes</h3>
              </div>
              <p className="text-xs text-white/50 mt-0.5">
                Proposals automatically provision milestones and client portals when approved.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {leads
              .filter((l) => l.proposal)
              .map((lead) => {
                const prop = lead.proposal!;
                return (
                  <div
                    key={prop.id}
                    className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-3 text-xs"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-mono uppercase text-[#D4FF3A]">{lead.company}</span>
                        <h4 className="font-bold text-white text-sm mt-0.5">{prop.title}</h4>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-purple-500/20 text-purple-300 font-bold">
                        {prop.status}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-white/40 text-[10px] block uppercase font-mono">Scope Deliverables:</span>
                      <ul className="list-disc list-inside space-y-0.5 text-white/80">
                        {prop.scopeItems.map((s, idx) => (
                          <li key={idx} className="truncate">
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex justify-between items-center pt-3 border-t border-white/[0.04] font-mono text-xs">
                      <span className="text-white/50">{prop.timelineWeeks} Weeks</span>
                      <span className="text-[#D4FF3A] font-bold text-sm">{prop.totalAmount}</span>
                    </div>

                    {lead.status !== 'won' && (
                      <button
                        onClick={() => handleApproveAndConvert(lead.id)}
                        className="w-full py-2 rounded-lg bg-[#D4FF3A] text-[#08090A] font-bold text-xs flex items-center justify-center gap-1.5 hover:brightness-110 transition-all"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Client Approved • Kickoff Project</span>
                      </button>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {/* Add Lead Modal */}
      {showLeadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-[#0D0E11] border border-white/[0.12] rounded-2xl p-6 space-y-4">
            <h3 className="font-bold text-white text-base">New Inbound Inquiry / Lead</h3>
            <form onSubmit={handleCreateLead} className="space-y-3 text-xs">
              <div>
                <label className="block text-white/70 mb-1">Company Name</label>
                <input
                  type="text"
                  required
                  value={leadCompany}
                  onChange={(e) => setLeadCompany(e.target.value)}
                  placeholder="e.g. Apex Industrial"
                  className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-3 py-2 text-white"
                />
              </div>
              <div>
                <label className="block text-white/70 mb-1">Contact Name</label>
                <input
                  type="text"
                  required
                  value={leadName}
                  onChange={(e) => setLeadName(e.target.value)}
                  placeholder="e.g. Karan Varma"
                  className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-3 py-2 text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/70 mb-1">Email</label>
                  <input
                    type="email"
                    value={leadEmail}
                    onChange={(e) => setLeadEmail(e.target.value)}
                    placeholder="karan@apex.com"
                    className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-white/70 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={leadPhone}
                    onChange={(e) => setLeadPhone(e.target.value)}
                    placeholder="+91..."
                    className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/70 mb-1">Service</label>
                  <input
                    type="text"
                    value={leadService}
                    onChange={(e) => setLeadService(e.target.value)}
                    className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-white/70 mb-1">Budget</label>
                  <input
                    type="text"
                    value={leadBudget}
                    onChange={(e) => setLeadBudget(e.target.value)}
                    className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-white/70 mb-1">Initial Requirements / Discussion Notes</label>
                <textarea
                  rows={2}
                  value={leadNotes}
                  onChange={(e) => setLeadNotes(e.target.value)}
                  placeholder="What does the client want to build?"
                  className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl p-2.5 text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowLeadModal(false)}
                  className="px-4 py-2 rounded-xl text-white/60 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#D4FF3A] text-[#08090A] font-bold text-xs"
                >
                  Add Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Proposal Modal */}
      {selectedLeadForProposal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-lg bg-[#0D0E11] border border-white/[0.12] rounded-2xl p-6 space-y-4">
            <h3 className="font-bold text-white text-base">
              Draft Proposal for {selectedLeadForProposal.company}
            </h3>
            <form onSubmit={handleCreateProposal} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-white/70 mb-1">Proposal Title</label>
                <input
                  type="text"
                  required
                  value={proposalTitle}
                  onChange={(e) => setProposalTitle(e.target.value)}
                  className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-3 py-2 text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/70 mb-1">Total Pricing (₹)</label>
                  <input
                    type="text"
                    required
                    value={proposalAmount}
                    onChange={(e) => setProposalAmount(e.target.value)}
                    className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-white/70 mb-1">Estimated Timeline (Weeks)</label>
                  <input
                    type="number"
                    min="1"
                    max="16"
                    value={proposalWeeks}
                    onChange={(e) => setProposalWeeks(Number(e.target.value))}
                    className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-white/70 mb-1">Scope & Key Deliverables (1 per line)</label>
                <textarea
                  rows={4}
                  required
                  value={proposalScopeText}
                  onChange={(e) => setProposalScopeText(e.target.value)}
                  className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl p-3 text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedLeadForProposal(null)}
                  className="px-4 py-2 rounded-xl text-white/60 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#D4FF3A] text-[#08090A] font-bold text-xs"
                >
                  Generate & Send Proposal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </PlatformLayout>
  );
}
