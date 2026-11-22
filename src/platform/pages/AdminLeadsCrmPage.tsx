import { useState } from 'react';
import {
  FileCheck2,
  Plus,
  CheckCircle2,
  Trash2,
  Edit2,
  Search,
} from 'lucide-react';
import { usePlatform } from '../platformContext';
import PlatformLayout from '../components/PlatformLayout';
import type { Lead, LeadStatus } from '../types';

export default function AdminLeadsCrmPage() {
  const { leads, addLead, updateLead, deleteLead, updateLeadStatus, createProposal, convertLeadToClient } =
    usePlatform();

  // Search & Stage Filter
  const [search, setSearch] = useState('');
  const [stageFilter, setStageFilter] = useState<string>('all');

  // Modals & Selection
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [leadToDelete, setLeadToDelete] = useState<Lead | null>(null);

  // Form Fields
  const [leadName, setLeadName] = useState('');
  const [leadCompany, setLeadCompany] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadService, setLeadService] = useState('Custom Software & ERP');
  const [leadBudget, setLeadBudget] = useState('₹50,000');
  const [leadSource, setLeadSource] = useState('Website Inbound');
  const [leadFollowUp, setLeadFollowUp] = useState('');
  const [leadNotes, setLeadNotes] = useState('');

  // Proposal Creator State
  const [selectedLeadForProposal, setSelectedLeadForProposal] = useState<Lead | null>(null);
  const [proposalTitle, setProposalTitle] = useState('');
  const [proposalAmount, setProposalAmount] = useState('₹50,000');
  const [proposalWeeks, setProposalWeeks] = useState(4);
  const [proposalScopeText, setProposalScopeText] = useState('1. Database Architecture\n2. Real-time Staging\n3. Client Review');

  // 7 Stages requested in Section 04: New → Contacted → Qualified → Proposal Sent → Negotiation → Won / Lost
  const STAGES: { key: LeadStatus; label: string }[] = [
    { key: 'new', label: 'New' },
    { key: 'contacted', label: 'Contacted' },
    { key: 'qualified', label: 'Qualified' },
    { key: 'proposal_sent', label: 'Proposal Sent' },
    { key: 'negotiation', label: 'Negotiation' },
    { key: 'won', label: 'Won' },
    { key: 'lost', label: 'Lost' },
  ];

  const openCreateModal = () => {
    setEditingLead(null);
    setLeadName('');
    setLeadCompany('');
    setLeadEmail('');
    setLeadPhone('');
    setLeadService('Custom Software & ERP');
    setLeadBudget('₹50,000');
    setLeadSource('Website Inbound');
    setLeadFollowUp('In 3 days');
    setLeadNotes('');
    setShowLeadModal(true);
  };

  const openEditModal = (lead: Lead) => {
    setEditingLead(lead);
    setLeadName(lead.name);
    setLeadCompany(lead.company);
    setLeadEmail(lead.email);
    setLeadPhone(lead.phone);
    setLeadService(lead.service);
    setLeadBudget(lead.budget);
    setLeadSource(lead.source || 'Website Inbound');
    setLeadFollowUp(lead.followUpDate || '');
    setLeadNotes(lead.notes);
    setShowLeadModal(true);
  };

  const handleSaveLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadCompany || !leadName) return;

    if (editingLead) {
      updateLead(editingLead.id, {
        name: leadName.trim(),
        company: leadCompany.trim(),
        email: leadEmail.trim(),
        phone: leadPhone.trim(),
        service: leadService,
        budget: leadBudget,
        source: leadSource,
        followUpDate: leadFollowUp,
        notes: leadNotes.trim(),
      });
    } else {
      addLead({
        name: leadName.trim(),
        company: leadCompany.trim(),
        email: leadEmail.trim(),
        phone: leadPhone.trim(),
        service: leadService,
        budget: leadBudget,
        source: leadSource,
        status: 'new',
        followUpDate: leadFollowUp || 'In 3 days',
        notes: leadNotes.trim(),
      });
    }

    setShowLeadModal(false);
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

  const filteredLeads = leads.filter((l) => {
    if (stageFilter !== 'all' && l.status !== stageFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        l.name.toLowerCase().includes(q) ||
        l.company.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        l.service.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <PlatformLayout
      title="Lead CRM & Proposal Pipeline"
      subtitle="Sections 04, 14 & 15 Spec: Manage inbound inquiries, proposal generation, and automatic project conversion."
      actions={
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#D4FF3A] text-[#08090A] text-xs font-bold tracking-tight hover:brightness-110 shadow-[0_4px_16px_rgba(212,255,58,0.25)] transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Inbound Lead</span>
        </button>
      }
    >
      <div className="space-y-6">
        {/* Search & Filter Bar */}
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-3.5 h-3.5 text-white/40 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search leads by company, person, email, or service..."
              className="w-full bg-white/[0.04] border border-white/[0.1] rounded-lg pl-9 pr-3 py-1.5 text-white placeholder-white/30 focus:outline-none focus:border-[#D4FF3A]"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-white/40">Stage:</span>
            <select
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value)}
              className="bg-[#111316] border border-white/[0.1] rounded-lg px-2.5 py-1.5 text-white"
            >
              <option value="all">All Stages ({leads.length})</option>
              {STAGES.map((s) => (
                <option key={s.key} value={s.key}>
                  {s.label} ({leads.filter((l) => l.status === s.key).length})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 7-Stage Pipeline Columns View */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-3 overflow-x-auto pb-4">
          {STAGES.map((stage) => {
            const stageLeads = filteredLeads.filter((l) => l.status === stage.key);

            return (
              <div
                key={stage.key}
                className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col min-w-[200px]"
              >
                <div className="flex items-center justify-between pb-2.5 border-b border-white/[0.06] mb-3">
                  <span className="text-xs font-bold text-white tracking-tight">{stage.label}</span>
                  <span className="px-1.5 py-0.2 rounded-full bg-white/[0.06] text-[10px] font-mono text-white/60">
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
                        className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.18] transition-all space-y-2 text-xs group"
                      >
                        <div className="flex items-start justify-between">
                          <h4 className="font-bold text-white tracking-tight">{lead.company}</h4>
                          <span className="text-[10px] font-mono text-[#D4FF3A]">{lead.budget}</span>
                        </div>

                        <div className="text-[11px] text-white/50">{lead.name}</div>
                        <p className="text-[11px] text-white/60 line-clamp-2">{lead.notes || lead.service}</p>

                        <div className="pt-2 border-t border-white/[0.04] flex items-center justify-between text-[10px] font-mono text-white/40">
                          <span>{lead.source || 'Inbound'}</span>
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => openEditModal(lead)}
                              className="p-1 rounded bg-white/[0.05] hover:bg-white/[0.1] text-white/70"
                              title="Edit lead"
                            >
                              <Edit2 className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => setLeadToDelete(lead)}
                              className="p-1 rounded bg-white/[0.05] hover:bg-red-500/20 text-white/70 hover:text-red-400"
                              title="Delete lead"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        {/* Stage Dropdown & Actions */}
                        <div className="pt-1.5 border-t border-white/[0.04] space-y-1.5">
                          <select
                            value={lead.status}
                            onChange={(e) => updateLeadStatus(lead.id, e.target.value as LeadStatus)}
                            className="w-full bg-[#111316] border border-white/[0.1] rounded px-1.5 py-0.5 text-[10px] text-white"
                          >
                            {STAGES.map((s) => (
                              <option key={s.key} value={s.key}>
                                {s.label}
                              </option>
                            ))}
                          </select>

                          {lead.status === 'qualified' && !lead.proposal && (
                            <button
                              onClick={() => {
                                setSelectedLeadForProposal(lead);
                                setProposalTitle(`${lead.company} ${lead.service}`);
                                setProposalAmount(lead.budget);
                              }}
                              className="w-full py-1 rounded bg-[#D4FF3A]/10 text-[#D4FF3A] hover:bg-[#D4FF3A]/20 text-[10px] font-semibold"
                            >
                              + Create Proposal
                            </button>
                          )}

                          {lead.status === 'proposal_sent' && (
                            <button
                              onClick={() => handleApproveAndConvert(lead.id)}
                              className="w-full py-1 rounded bg-[#D4FF3A] text-[#08090A] font-bold text-[10px] tracking-tight flex items-center justify-center gap-1"
                            >
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Convert to Client</span>
                            </button>
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
          <div className="flex items-center gap-2">
            <FileCheck2 className="w-4 h-4 text-[#D4FF3A]" />
            <h3 className="text-base font-bold text-white tracking-tight">Active Proposals & Scopes</h3>
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
                        <span>Client Approved • Convert</span>
                      </button>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {/* Create / Edit Lead Modal */}
      {showLeadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-lg bg-[#0D0E11] border border-white/[0.12] rounded-2xl p-6 space-y-4">
            <h3 className="font-bold text-white text-base">
              {editingLead ? 'Edit Lead Record' : 'Record Inbound Client Lead'}
            </h3>

            <form onSubmit={handleSaveLead} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/70 mb-1">Company / Organization *</label>
                  <input
                    type="text"
                    required
                    value={leadCompany}
                    onChange={(e) => setLeadCompany(e.target.value)}
                    placeholder="e.g. Surat Fasteners Corp"
                    className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-white/70 mb-1">Contact Person Name *</label>
                  <input
                    type="text"
                    required
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    placeholder="e.g. Ramesh Patel"
                    className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/70 mb-1">Email</label>
                  <input
                    type="email"
                    value={leadEmail}
                    onChange={(e) => setLeadEmail(e.target.value)}
                    placeholder="contact@company.com"
                    className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-white/70 mb-1">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    value={leadPhone}
                    onChange={(e) => setLeadPhone(e.target.value)}
                    placeholder="+91..."
                    className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-white/70 mb-1">Required Service</label>
                  <select
                    value={leadService}
                    onChange={(e) => setLeadService(e.target.value)}
                    className="w-full bg-[#111316] border border-white/[0.1] rounded-xl px-3 py-2 text-white"
                  >
                    <option value="Web & SaaS Engineering">Web & SaaS</option>
                    <option value="Mobile Application">Mobile App</option>
                    <option value="AI Agents & Automation">AI & Automation</option>
                    <option value="Digital Commerce">Digital Commerce</option>
                    <option value="Custom Software & ERP">Custom ERP</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/70 mb-1">Budget Range</label>
                  <input
                    type="text"
                    value={leadBudget}
                    onChange={(e) => setLeadBudget(e.target.value)}
                    placeholder="e.g. ₹50,000"
                    className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-white/70 mb-1">Lead Source</label>
                  <select
                    value={leadSource}
                    onChange={(e) => setLeadSource(e.target.value)}
                    className="w-full bg-[#111316] border border-white/[0.1] rounded-xl px-3 py-2 text-white"
                  >
                    <option value="Website Inbound">Website Inbound</option>
                    <option value="Referral">Client Referral</option>
                    <option value="WhatsApp Direct">WhatsApp Direct</option>
                    <option value="LinkedIn">LinkedIn</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-white/70 mb-1">Internal Notes & Context</label>
                <textarea
                  rows={3}
                  value={leadNotes}
                  onChange={(e) => setLeadNotes(e.target.value)}
                  placeholder="Client background, key pain points, architecture ideas..."
                  className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl p-3 text-white"
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-3 border-t border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setShowLeadModal(false)}
                  className="px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#D4FF3A] text-[#08090A] font-bold"
                >
                  {editingLead ? 'Save Changes' : 'Record Lead'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Proposal Generator Modal */}
      {selectedLeadForProposal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-lg bg-[#0D0E11] border border-white/[0.12] rounded-2xl p-6 space-y-4">
            <h3 className="font-bold text-white text-base">
              Generate Proposal for {selectedLeadForProposal.company}
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
                  <label className="block text-white/70 mb-1">Total Fixed Price</label>
                  <input
                    type="text"
                    required
                    value={proposalAmount}
                    onChange={(e) => setProposalAmount(e.target.value)}
                    className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-white/70 mb-1">Timeline (Weeks)</label>
                  <input
                    type="number"
                    required
                    value={proposalWeeks}
                    onChange={(e) => setProposalWeeks(Number(e.target.value))}
                    className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/70 mb-1">Scope Deliverables (1 per line)</label>
                <textarea
                  rows={4}
                  required
                  value={proposalScopeText}
                  onChange={(e) => setProposalScopeText(e.target.value)}
                  className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl p-3 text-white font-mono"
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-3 border-t border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setSelectedLeadForProposal(null)}
                  className="px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#D4FF3A] text-[#08090A] font-bold"
                >
                  Create Proposal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {leadToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-sm bg-[#0D0E11] border border-white/[0.12] rounded-2xl p-6 space-y-4">
            <h3 className="font-bold text-white text-base">Confirm Lead Deletion</h3>
            <p className="text-xs text-white/60">
              Are you sure you want to delete lead <span className="text-white font-semibold">"{leadToDelete.company}"</span>? This cannot be undone.
            </p>
            <div className="flex justify-end gap-2.5 pt-2">
              <button
                onClick={() => setLeadToDelete(null)}
                className="px-3.5 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-xs text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteLead(leadToDelete.id);
                  setLeadToDelete(null);
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
