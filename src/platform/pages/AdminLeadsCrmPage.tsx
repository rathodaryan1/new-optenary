import { useState, useMemo } from 'react';
import {
  FileCheck2,
  Plus,
  Trash2,
  Edit2,
  Search,
  Kanban,
  Table as TableIcon,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  X,
  AlertTriangle,
  Send,
  CheckSquare,
} from 'lucide-react';
import { usePlatform } from '../platformContext';
import PlatformLayout from '../components/PlatformLayout';
import type { Lead, LeadStatus } from '../types';

export default function AdminLeadsCrmPage() {
  const {
    leads,
    clients,
    addLead,
    updateLead,
    deleteLead,
    updateLeadStatus,
    createProposal,
    convertLeadToClient,
  } = usePlatform();

  // View Mode: 'kanban' vs 'table'
  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban');

  // Search & Filters
  const [search, setSearch] = useState('');
  const [stageFilter, setStageFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'company' | 'createdAt' | 'status'>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Pagination for Table
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Modals & Drawers
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [leadToDelete, setLeadToDelete] = useState<Lead | null>(null);
  const [selectedLeadDrawer, setSelectedLeadDrawer] = useState<Lead | null>(null);

  // Conversion Confirmation Modal
  const [leadToConvert, setLeadToConvert] = useState<Lead | null>(null);
  const [duplicateWarning, setDuplicateWarning] = useState<string | null>(null);

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
  const [proposalScopeText, setProposalScopeText] = useState(
    '1. Database Architecture & Schema Design\n2. Sub-Second Query Engine\n3. Responsive Client Portal'
  );

  // 7 Stages requested in Section 04: New → Contacted → Qualified → Proposal Sent → Negotiation → Won / Lost
  const STAGES: { key: LeadStatus; label: string; color: string }[] = [
    { key: 'new', label: 'New', color: 'bg-blue-500/20 text-blue-400' },
    { key: 'contacted', label: 'Contacted', color: 'bg-indigo-500/20 text-indigo-400' },
    { key: 'qualified', label: 'Qualified', color: 'bg-purple-500/20 text-purple-400' },
    { key: 'proposal_sent', label: 'Proposal Sent', color: 'bg-yellow-500/20 text-yellow-400' },
    { key: 'negotiation', label: 'Negotiation', color: 'bg-orange-500/20 text-orange-400' },
    { key: 'won', label: 'Won', color: 'bg-emerald-500/20 text-emerald-400' },
    { key: 'lost', label: 'Lost', color: 'bg-red-500/20 text-red-400' },
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
    if (!leadCompany.trim() || !leadName.trim()) return;

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
      if (selectedLeadDrawer?.id === editingLead.id) {
        setSelectedLeadDrawer({
          ...selectedLeadDrawer,
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
      }
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

  const initiateConvert = (lead: Lead) => {
    setLeadToConvert(lead);
    // Duplicate check
    const existing = clients.find(
      (c) =>
        c.email.trim().toLowerCase() === lead.email.trim().toLowerCase() ||
        c.company.trim().toLowerCase() === lead.company.trim().toLowerCase()
    );
    if (existing) {
      setDuplicateWarning(
        `A client account for "${existing.company}" (${existing.email}) already exists. Converting will attach a new project to the existing client rather than creating a duplicate.`
      );
    } else {
      setDuplicateWarning(null);
    }
  };

  const confirmConvert = () => {
    if (!leadToConvert) return;
    convertLeadToClient(leadToConvert.id);
    setLeadToConvert(null);
    setDuplicateWarning(null);
    if (selectedLeadDrawer?.id === leadToConvert.id) {
      setSelectedLeadDrawer(null);
    }
  };

  // Filtered & Sorted Leads
  const filteredLeads = useMemo(() => {
    return leads
      .filter((l) => {
        if (stageFilter !== 'all' && l.status !== stageFilter) return false;
        if (search.trim()) {
          const q = search.toLowerCase();
          return (
            l.company.toLowerCase().includes(q) ||
            l.name.toLowerCase().includes(q) ||
            l.email.toLowerCase().includes(q) ||
            l.service.toLowerCase().includes(q)
          );
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'company') {
          return sortOrder === 'asc'
            ? a.company.localeCompare(b.company)
            : b.company.localeCompare(a.company);
        }
        if (sortBy === 'status') {
          return sortOrder === 'asc'
            ? a.status.localeCompare(b.status)
            : b.status.localeCompare(a.status);
        }
        return sortOrder === 'asc'
          ? a.createdAt.localeCompare(b.createdAt)
          : b.createdAt.localeCompare(a.createdAt);
      });
  }, [leads, stageFilter, search, sortBy, sortOrder]);

  // Paginated Leads for Table View
  const paginatedLeads = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredLeads.slice(start, start + itemsPerPage);
  }, [filteredLeads, currentPage]);

  const totalPages = Math.ceil(filteredLeads.length / itemsPerPage) || 1;

  return (
    <PlatformLayout
      title="CRM & Inbound Lead Pipeline"
      subtitle="7-stage structured client journey: from inquiry and qualification to formal proposal and contract won."
      actions={
        <div className="flex items-center gap-2">
          {/* View Toggle */}
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
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-md text-xs flex items-center gap-1.5 transition-all ${
                viewMode === 'table'
                  ? 'bg-[#D4FF3A] text-[#08090A] font-bold shadow'
                  : 'text-white/60 hover:text-white'
              }`}
              title="Table Directory View"
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Table</span>
            </button>
          </div>

          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#D4FF3A] text-[#08090A] text-xs font-bold tracking-tight hover:brightness-110 shadow-[0_4px_16px_rgba(212,255,58,0.25)] transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Lead</span>
          </button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Search & Filter Bar */}
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3 flex-1 min-w-[240px]">
            <div className="relative flex-1 max-w-md">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-white/40" />
              <input
                type="text"
                placeholder="Search leads by company, contact, or service..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full bg-[#111316] border border-white/[0.1] rounded-lg pl-9 pr-3 py-1.5 text-white placeholder-white/40 focus:outline-none focus:border-[#D4FF3A]"
              />
            </div>

            <select
              value={stageFilter}
              onChange={(e) => {
                setStageFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-[#111316] border border-white/[0.1] rounded-lg px-2.5 py-1.5 text-white focus:outline-none"
            >
              <option value="all">All Stages ({leads.length})</option>
              {STAGES.map((s) => (
                <option key={s.key} value={s.key}>
                  {s.label} ({leads.filter((l) => l.status === s.key).length})
                </option>
              ))}
            </select>
          </div>

          {viewMode === 'table' && (
            <div className="flex items-center gap-2 font-mono text-[11px] text-white/60">
              <span>Sort:</span>
              <button
                onClick={() => {
                  if (sortBy === 'company') setSortOrder((o) => (o === 'asc' ? 'desc' : 'asc'));
                  else {
                    setSortBy('company');
                    setSortOrder('asc');
                  }
                }}
                className={`px-2 py-1 rounded bg-white/[0.04] border border-white/[0.06] flex items-center gap-1 ${
                  sortBy === 'company' ? 'text-[#D4FF3A] border-[#D4FF3A]/30' : ''
                }`}
              >
                <span>Company</span>
                <ArrowUpDown className="w-2.5 h-2.5" />
              </button>
              <button
                onClick={() => {
                  if (sortBy === 'createdAt') setSortOrder((o) => (o === 'asc' ? 'desc' : 'asc'));
                  else {
                    setSortBy('createdAt');
                    setSortOrder('desc');
                  }
                }}
                className={`px-2 py-1 rounded bg-white/[0.04] border border-white/[0.06] flex items-center gap-1 ${
                  sortBy === 'createdAt' ? 'text-[#D4FF3A] border-[#D4FF3A]/30' : ''
                }`}
              >
                <span>Date</span>
                <ArrowUpDown className="w-2.5 h-2.5" />
              </button>
            </div>
          )}
        </div>

        {/* View Mode 1: 7-Stage Kanban Board */}
        {viewMode === 'kanban' && (
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-3 overflow-x-auto pb-4">
            {STAGES.map((stage) => {
              const stageLeads = filteredLeads.filter((l) => l.status === stage.key);

              return (
                <div
                  key={stage.key}
                  className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col min-w-[210px]"
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
                          className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.18] transition-all space-y-2 text-xs group cursor-pointer"
                          onClick={() => setSelectedLeadDrawer(lead)}
                        >
                          <div className="flex items-start justify-between">
                            <h4 className="font-bold text-white tracking-tight group-hover:text-[#D4FF3A] transition-colors">
                              {lead.company}
                            </h4>
                            <span className="text-[10px] font-mono text-[#D4FF3A]">{lead.budget}</span>
                          </div>

                          <div className="text-[11px] text-white/50">{lead.name}</div>
                          <p className="text-[11px] text-white/60 line-clamp-2">{lead.notes || lead.service}</p>

                          {/* Quick Stage Mover Selector */}
                          <div
                            className="pt-2 border-t border-white/[0.04] flex items-center justify-between text-[10px] font-mono text-white/40"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <select
                              value={lead.status}
                              onChange={(e) => updateLeadStatus(lead.id, e.target.value as LeadStatus)}
                              className="bg-[#111316] border border-white/[0.08] rounded px-1.5 py-0.5 text-[10px] text-white/70"
                            >
                              {STAGES.map((s) => (
                                <option key={s.key} value={s.key}>
                                  → {s.label}
                                </option>
                              ))}
                            </select>

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

                          {/* Proposal or Conversion Action Button */}
                          {lead.status === 'qualified' && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedLeadForProposal(lead);
                                setProposalTitle(`${lead.company} Architecture & Delivery Proposal`);
                                setProposalAmount(lead.budget);
                              }}
                              className="w-full py-1 rounded bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 font-mono text-[10px] font-bold flex items-center justify-center gap-1 transition-colors"
                            >
                              <FileCheck2 className="w-3 h-3" />
                              <span>Draft Proposal</span>
                            </button>
                          )}

                          {(lead.status === 'negotiation' || lead.status === 'proposal_sent') && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                initiateConvert(lead);
                              }}
                              className="w-full py-1 rounded bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-mono text-[10px] font-bold flex items-center justify-center gap-1 transition-colors"
                            >
                              <CheckSquare className="w-3 h-3" />
                              <span>Convert to Client</span>
                            </button>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* View Mode 2: Table Directory View */}
        {viewMode === 'table' && (
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-white/[0.02] border-b border-white/[0.06] text-white/50 font-mono text-[11px] uppercase tracking-wider">
                  <tr>
                    <th className="py-2.5 px-3">Company & Contact</th>
                    <th className="py-2.5 px-3">Service Required</th>
                    <th className="py-2.5 px-3">Budget</th>
                    <th className="py-2.5 px-3">Pipeline Stage</th>
                    <th className="py-2.5 px-3">Follow-up</th>
                    <th className="py-2.5 px-3">Source</th>
                    <th className="py-2.5 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {paginatedLeads.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-white/40 italic font-mono">
                        No leads matching current search or stage filter.
                      </td>
                    </tr>
                  ) : (
                    paginatedLeads.map((lead) => {
                      return (
                        <tr
                          key={lead.id}
                          className="hover:bg-white/[0.02] transition-colors cursor-pointer"
                          onClick={() => setSelectedLeadDrawer(lead)}
                        >
                          <td className="py-3 px-3">
                            <div className="font-bold text-white hover:text-[#D4FF3A] transition-colors">
                              {lead.company}
                            </div>
                            <div className="text-[11px] text-white/50">
                              {lead.name} • {lead.email}
                            </div>
                          </td>
                          <td className="py-3 px-3 font-mono text-white/70">{lead.service}</td>
                          <td className="py-3 px-3 font-mono text-[#D4FF3A] font-bold">{lead.budget}</td>
                          <td className="py-3 px-3">
                            <select
                              value={lead.status}
                              onClick={(e) => e.stopPropagation()}
                              onChange={(e) => updateLeadStatus(lead.id, e.target.value as LeadStatus)}
                              className="bg-[#111316] border border-white/[0.08] rounded px-2 py-0.5 text-xs text-white"
                            >
                              {STAGES.map((s) => (
                                <option key={s.key} value={s.key}>
                                  {s.label}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="py-3 px-3 font-mono text-white/60">{lead.followUpDate || '—'}</td>
                          <td className="py-3 px-3 font-mono text-white/40">{lead.source || 'Inbound'}</td>
                          <td className="py-3 px-3 text-right" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-end gap-1.5">
                              {lead.status !== 'won' && (
                                <button
                                  onClick={() => initiateConvert(lead)}
                                  className="px-2 py-1 rounded bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-mono text-[10px] font-bold"
                                  title="Convert to Client"
                                >
                                  Convert
                                </button>
                              )}
                              <button
                                onClick={() => openEditModal(lead)}
                                className="p-1 rounded hover:bg-white/[0.08] text-white/60 hover:text-white"
                                title="Edit"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => setLeadToDelete(lead)}
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

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between pt-3 border-t border-white/[0.06] text-xs font-mono text-white/50">
                <div>
                  Showing {paginatedLeads.length} of {filteredLeads.length} leads
                </div>
                <div className="flex items-center gap-1">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => p - 1)}
                    className="p-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/[0.08]"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-2">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => p + 1)}
                    className="p-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/[0.08]"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Lead Details Drawer */}
      {selectedLeadDrawer && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-lg bg-[#0E1013] border-l border-white/[0.12] p-6 overflow-y-auto space-y-6 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div>
                <span className="text-[10px] font-mono text-[#D4FF3A] uppercase">Lead Record</span>
                <h2 className="text-xl font-bold text-white tracking-tight">{selectedLeadDrawer.company}</h2>
              </div>
              <button
                onClick={() => setSelectedLeadDrawer(null)}
                className="p-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-white/60 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Status and Actions */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-white/40 block">Current Stage</span>
                <span className="text-xs font-mono uppercase font-bold text-[#D4FF3A]">
                  {selectedLeadDrawer.status.replace('_', ' ')}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openEditModal(selectedLeadDrawer)}
                  className="px-2.5 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-white font-medium flex items-center gap-1"
                >
                  <Edit2 className="w-3 h-3" />
                  <span>Edit</span>
                </button>
                {selectedLeadDrawer.status !== 'won' && (
                  <button
                    onClick={() => initiateConvert(selectedLeadDrawer)}
                    className="px-3 py-1.5 rounded-lg bg-emerald-500 text-[#08090A] font-bold flex items-center gap-1 hover:brightness-110"
                  >
                    <span>Convert to Client</span>
                  </button>
                )}
              </div>
            </div>

            {/* Contact Details */}
            <div className="space-y-3">
              <h3 className="font-bold text-white text-xs uppercase font-mono tracking-wider">Contact Information</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
                  <span className="text-[10px] font-mono text-white/40 block">Contact Person</span>
                  <div className="font-semibold text-white">{selectedLeadDrawer.name}</div>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
                  <span className="text-[10px] font-mono text-white/40 block">Budget Scope</span>
                  <div className="font-semibold text-[#D4FF3A] font-mono">{selectedLeadDrawer.budget}</div>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
                  <span className="text-[10px] font-mono text-white/40 block">Email Address</span>
                  <div className="font-mono text-white truncate">{selectedLeadDrawer.email}</div>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
                  <span className="text-[10px] font-mono text-white/40 block">Phone</span>
                  <div className="font-mono text-white">{selectedLeadDrawer.phone}</div>
                </div>
              </div>
            </div>

            {/* Requirements & Notes */}
            <div className="space-y-2">
              <h3 className="font-bold text-white text-xs uppercase font-mono tracking-wider">Internal Notes & Scoping</h3>
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-white/70 leading-relaxed font-sans">
                {selectedLeadDrawer.notes || 'No internal notes registered for this lead.'}
              </div>
            </div>

            {/* Proposal Details if generated */}
            {selectedLeadDrawer.proposal && (
              <div className="space-y-2">
                <h3 className="font-bold text-white text-xs uppercase font-mono tracking-wider">Associated Proposal</h3>
                <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/20 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-purple-300">{selectedLeadDrawer.proposal.title}</span>
                    <span className="font-mono text-xs font-bold text-white">{selectedLeadDrawer.proposal.totalAmount}</span>
                  </div>
                  <div className="text-[11px] text-white/60">
                    Estimated Delivery: {selectedLeadDrawer.proposal.timelineWeeks} Weeks
                  </div>
                  <div className="space-y-1 pt-2 border-t border-purple-500/20">
                    <span className="text-[10px] font-mono text-purple-300 uppercase block">Scope Items:</span>
                    {selectedLeadDrawer.proposal.scopeItems.map((item, idx) => (
                      <div key={idx} className="text-white/70 pl-2 border-l border-purple-500/30">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Convert to Client Confirmation Modal (Duplicate Prevention) */}
      {leadToConvert && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#0E1013] border border-white/[0.15] rounded-2xl p-6 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center gap-2 text-white pb-2 border-b border-white/[0.08]">
              <CheckSquare className="w-5 h-5 text-emerald-400" />
              <h3 className="text-base font-bold">Convert Lead to Client Account</h3>
            </div>

            <p className="text-white/70 leading-relaxed">
              Are you sure you want to approve proposal and convert <strong className="text-white">{leadToConvert.company}</strong> into an active client?
            </p>

            {duplicateWarning && (
              <div className="p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/30 flex items-start gap-2.5 text-yellow-300">
                <AlertTriangle className="w-4 h-4 flex-none mt-0.5" />
                <span className="leading-relaxed">{duplicateWarning}</span>
              </div>
            )}

            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1.5 font-mono text-[11px]">
              <div className="flex justify-between">
                <span className="text-white/40">Client Entity:</span>
                <span className="text-white font-bold">{leadToConvert.company}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40">Primary Contact:</span>
                <span className="text-white">{leadToConvert.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40">Scope Value:</span>
                <span className="text-[#D4FF3A] font-bold">{leadToConvert.budget}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40">Target Service:</span>
                <span className="text-white">{leadToConvert.service}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setLeadToConvert(null);
                  setDuplicateWarning(null);
                }}
                className="px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-white/70"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmConvert}
                className="px-4 py-1.5 rounded-lg bg-emerald-500 text-[#08090A] font-bold hover:brightness-110 shadow-[0_4px_16px_rgba(16,185,129,0.3)]"
              >
                Confirm Conversion
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create / Edit Lead Modal */}
      {showLeadModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#0E1013] border border-white/[0.15] rounded-2xl p-6 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <h3 className="text-base font-bold text-white">
                {editingLead ? 'Edit Lead Record' : 'Register New Lead'}
              </h3>
              <button
                onClick={() => setShowLeadModal(false)}
                className="p-1 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-white/60"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveLead} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/70 mb-1">Company / Entity *</label>
                  <input
                    type="text"
                    required
                    value={leadCompany}
                    onChange={(e) => setLeadCompany(e.target.value)}
                    placeholder="e.g. Radhika Export"
                    className="w-full bg-[#111316] border border-white/[0.1] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D4FF3A]"
                  />
                </div>
                <div>
                  <label className="block text-white/70 mb-1">Contact Name *</label>
                  <input
                    type="text"
                    required
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    placeholder="e.g. Kirit Patel"
                    className="w-full bg-[#111316] border border-white/[0.1] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D4FF3A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/70 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={leadEmail}
                    onChange={(e) => setLeadEmail(e.target.value)}
                    placeholder="kirit@radhikaexport.com"
                    className="w-full bg-[#111316] border border-white/[0.1] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D4FF3A]"
                  />
                </div>
                <div>
                  <label className="block text-white/70 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={leadPhone}
                    onChange={(e) => setLeadPhone(e.target.value)}
                    placeholder="+91 98251 00000"
                    className="w-full bg-[#111316] border border-white/[0.1] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D4FF3A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/70 mb-1">Required Service</label>
                  <select
                    value={leadService}
                    onChange={(e) => setLeadService(e.target.value)}
                    className="w-full bg-[#111316] border border-white/[0.1] rounded-xl px-3 py-2 text-white focus:outline-none"
                  >
                    <option value="Custom Software & ERP">Custom Software & ERP</option>
                    <option value="Web & SaaS Engineering">Web & SaaS Engineering</option>
                    <option value="Mobile Application">Mobile Application</option>
                    <option value="AI Workflow Automation">AI Workflow Automation</option>
                    <option value="Digital Commerce">Digital Commerce</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white/70 mb-1">Budget Expectation</label>
                  <input
                    type="text"
                    value={leadBudget}
                    onChange={(e) => setLeadBudget(e.target.value)}
                    placeholder="₹50,000"
                    className="w-full bg-[#111316] border border-white/[0.1] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D4FF3A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/70 mb-1">Lead Source</label>
                  <select
                    value={leadSource}
                    onChange={(e) => setLeadSource(e.target.value)}
                    className="w-full bg-[#111316] border border-white/[0.1] rounded-xl px-3 py-2 text-white focus:outline-none"
                  >
                    <option value="Website Inbound">Website Inbound</option>
                    <option value="Referral">Client Referral</option>
                    <option value="LinkedIn">LinkedIn Outreach</option>
                    <option value="WhatsApp Direct">WhatsApp Direct</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white/70 mb-1">Follow-Up Target</label>
                  <input
                    type="text"
                    value={leadFollowUp}
                    onChange={(e) => setLeadFollowUp(e.target.value)}
                    placeholder="e.g. In 2 days"
                    className="w-full bg-[#111316] border border-white/[0.1] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D4FF3A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/70 mb-1">Internal Scoping Notes</label>
                <textarea
                  rows={3}
                  value={leadNotes}
                  onChange={(e) => setLeadNotes(e.target.value)}
                  placeholder="Key features discussed, customer pain points, technical requirements..."
                  className="w-full bg-[#111316] border border-white/[0.1] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D4FF3A]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setShowLeadModal(false)}
                  className="px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-white/70"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-[#D4FF3A] text-[#08090A] font-bold hover:brightness-110 shadow-[0_4px_16px_rgba(212,255,58,0.25)]"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Proposal Creator Modal */}
      {selectedLeadForProposal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#0E1013] border border-white/[0.15] rounded-2xl p-6 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-purple-400" />
                <h3 className="text-base font-bold text-white">
                  Draft Proposal for {selectedLeadForProposal.company}
                </h3>
              </div>
              <button
                onClick={() => setSelectedLeadForProposal(null)}
                className="p-1 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-white/60"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateProposal} className="space-y-3.5">
              <div>
                <label className="block text-white/70 mb-1">Proposal Title</label>
                <input
                  type="text"
                  required
                  value={proposalTitle}
                  onChange={(e) => setProposalTitle(e.target.value)}
                  className="w-full bg-[#111316] border border-white/[0.1] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/70 mb-1">Contract Amount</label>
                  <input
                    type="text"
                    required
                    value={proposalAmount}
                    onChange={(e) => setProposalAmount(e.target.value)}
                    className="w-full bg-[#111316] border border-white/[0.1] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-400"
                  />
                </div>
                <div>
                  <label className="block text-white/70 mb-1">Delivery Timeline (Weeks)</label>
                  <input
                    type="number"
                    min={1}
                    max={24}
                    value={proposalWeeks}
                    onChange={(e) => setProposalWeeks(Number(e.target.value))}
                    className="w-full bg-[#111316] border border-white/[0.1] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/70 mb-1">Scope of Work Deliverables (1 per line)</label>
                <textarea
                  rows={4}
                  required
                  value={proposalScopeText}
                  onChange={(e) => setProposalScopeText(e.target.value)}
                  className="w-full bg-[#111316] border border-white/[0.1] rounded-xl px-3 py-2 text-white font-mono text-[11px] focus:outline-none focus:border-purple-400"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setSelectedLeadForProposal(null)}
                  className="px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-white/70"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-purple-500 text-white font-bold hover:brightness-110 shadow-[0_4px_16px_rgba(168,85,247,0.3)] flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Dispatch Proposal</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Lead Confirmation Modal */}
      {leadToDelete && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-[#0E1013] border border-white/[0.15] rounded-2xl p-6 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center gap-2 text-red-400 pb-2 border-b border-white/[0.08]">
              <Trash2 className="w-4 h-4" />
              <h3 className="text-base font-bold text-white">Delete Lead</h3>
            </div>
            <p className="text-white/70 leading-relaxed">
              Are you sure you want to permanently delete lead record for{' '}
              <strong className="text-white">{leadToDelete.company}</strong>? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setLeadToDelete(null)}
                className="px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-white/70"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteLead(leadToDelete.id);
                  setLeadToDelete(null);
                  if (selectedLeadDrawer?.id === leadToDelete.id) {
                    setSelectedLeadDrawer(null);
                  }
                }}
                className="px-4 py-1.5 rounded-lg bg-red-500 text-white font-bold hover:bg-red-600 shadow-[0_4px_16px_rgba(239,68,68,0.3)]"
              >
                Delete Lead
              </button>
            </div>
          </div>
        </div>
      )}
    </PlatformLayout>
  );
}
