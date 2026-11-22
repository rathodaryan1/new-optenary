import { useState } from 'react';
import {
  ExternalLink,
  Plus,
  Trash2,
  Edit2,
  Search,
  FolderKanban,
  ArrowUpRight,
  X,
} from 'lucide-react';
import { usePlatform } from '../platformContext';
import PlatformLayout from '../components/PlatformLayout';
import type { Client } from '../types';

export default function AdminClientsPage() {
  const { clients, projects, addClient, updateClient, deleteClient, setCurrentClientId } =
    usePlatform();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'onboarding' | 'completed'>('all');
  const [selectedClient, setSelectedClient] = useState<Client | null>(clients[0] || null);

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null);

  // Form Fields
  const [newClientName, setNewClientName] = useState('');
  const [newCompanyName, setNewCompanyName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newIndustry, setNewIndustry] = useState('');
  const [newTotalValue, setNewTotalValue] = useState('₹40,000');
  const [newNotes, setNewNotes] = useState('');

  const filteredClients = clients.filter((c) => {
    if (statusFilter !== 'all' && c.status !== statusFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        c.name.toLowerCase().includes(q) ||
        c.company.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        (c.industry && c.industry.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const openCreateModal = () => {
    setEditingClient(null);
    setNewClientName('');
    setNewCompanyName('');
    setNewEmail('');
    setNewPhone('');
    setNewIndustry('');
    setNewTotalValue('₹40,000');
    setNewNotes('');
    setShowAddModal(true);
  };

  const openEditModal = (client: Client) => {
    setEditingClient(client);
    setNewClientName(client.name);
    setNewCompanyName(client.company);
    setNewEmail(client.email);
    setNewPhone(client.phone);
    setNewIndustry(client.industry || '');
    setNewTotalValue(client.totalValue);
    setNewNotes(client.notes || '');
    setShowAddModal(true);
  };

  const handleSaveClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName.trim() || !newCompanyName.trim()) return;

    if (editingClient) {
      updateClient(editingClient.id, {
        name: newClientName.trim(),
        company: newCompanyName.trim(),
        email: newEmail.trim(),
        phone: newPhone.trim(),
        industry: newIndustry.trim(),
        totalValue: newTotalValue.trim(),
        notes: newNotes.trim(),
      });
      setSelectedClient((prev) =>
        prev?.id === editingClient.id
          ? {
              ...prev,
              name: newClientName.trim(),
              company: newCompanyName.trim(),
              email: newEmail.trim(),
              phone: newPhone.trim(),
              industry: newIndustry.trim(),
              totalValue: newTotalValue.trim(),
              notes: newNotes.trim(),
            }
          : prev
      );
    } else {
      const created = addClient({
        name: newClientName.trim(),
        company: newCompanyName.trim(),
        email: newEmail.trim(),
        phone: newPhone.trim(),
        industry: newIndustry.trim() || 'General Enterprise',
        totalValue: newTotalValue.trim(),
        notes: newNotes.trim(),
        status: 'active',
      });
      setSelectedClient(created);
    }

    setShowAddModal(false);
  };

  // Associated Projects for selected client
  const clientProjects = selectedClient
    ? projects.filter((p) => p.clientId === selectedClient.id)
    : [];

  return (
    <PlatformLayout
      title="Client Accounts Directory"
      subtitle="Section 05 Spec: Profiles, company records, associated engineering projects, and portal preview."
      actions={
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#D4FF3A] text-[#08090A] text-xs font-bold tracking-tight hover:brightness-110 shadow-[0_4px_16px_rgba(212,255,58,0.25)] transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Client</span>
        </button>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 1 Column: Client Directory List */}
        <div className="lg:col-span-1 space-y-4">
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] space-y-3 text-xs">
            {/* Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-white/40" />
              <input
                type="text"
                placeholder="Search clients..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#111316] border border-white/[0.1] rounded-lg pl-9 pr-3 py-1.5 text-white placeholder-white/40 focus:outline-none focus:border-[#D4FF3A]"
              />
            </div>

            {/* Status Filter Tabs */}
            <div className="flex items-center gap-1 font-mono text-[10px]">
              {(['all', 'active', 'onboarding', 'completed'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-2 py-1 rounded-md uppercase transition-all ${
                    statusFilter === st
                      ? 'bg-[#D4FF3A] text-[#08090A] font-bold'
                      : 'text-white/50 hover:text-white bg-white/[0.03]'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Client List Cards */}
          <div className="space-y-2.5 max-h-[calc(100vh-280px)] overflow-y-auto pr-1">
            {filteredClients.length === 0 ? (
              <div className="p-8 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center text-white/40 italic font-mono text-xs">
                No clients matching criteria.
              </div>
            ) : (
              filteredClients.map((client) => {
                const isSelected = selectedClient?.id === client.id;

                return (
                  <div
                    key={client.id}
                    onClick={() => setSelectedClient(client)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer relative group ${
                      isSelected
                        ? 'bg-white/[0.05] border-[#D4FF3A] shadow-[0_0_15px_rgba(212,255,58,0.15)]'
                        : 'bg-white/[0.02] border-white/[0.06] hover:border-white/[0.15]'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-white text-xs tracking-tight">{client.company}</h4>
                        <p className="text-[11px] text-white/50 mt-0.5">{client.name}</p>
                      </div>
                      <span className="text-[10px] font-mono text-[#D4FF3A] font-bold">{client.totalValue}</span>
                    </div>

                    <div className="pt-2 mt-2 border-t border-white/[0.04] flex items-center justify-between text-[10px] font-mono text-white/40">
                      <span>{client.industry || 'Enterprise'}</span>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openEditModal(client);
                          }}
                          className="p-1 rounded bg-white/[0.05] hover:bg-white/[0.1] text-white/70"
                          title="Edit client"
                        >
                          <Edit2 className="w-3 h-3" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setClientToDelete(client);
                          }}
                          className="p-1 rounded bg-white/[0.05] hover:bg-red-500/20 text-white/70 hover:text-red-400"
                          title="Delete client"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right 2 Columns: Selected Client Profile Details */}
        <div className="lg:col-span-2 space-y-6">
          {selectedClient ? (
            <>
              {/* Profile Header Card */}
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-4 text-xs">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/[0.06]">
                  <div>
                    <span className="text-[10px] font-mono text-[#D4FF3A] uppercase tracking-wider block">
                      {selectedClient.industry || 'Client Account'}
                    </span>
                    <h2 className="text-xl font-bold text-white tracking-tight mt-0.5">
                      {selectedClient.company}
                    </h2>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(selectedClient)}
                      className="p-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-white/70 hover:text-white"
                      title="Edit Profile"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setClientToDelete(selectedClient)}
                      className="p-1.5 rounded-lg bg-white/[0.05] hover:bg-red-500/20 text-white/70 hover:text-red-400"
                      title="Delete Client"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        setCurrentClientId(selectedClient.id);
                        window.location.href = '/portal';
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.06] border border-white/[0.1] text-xs font-semibold text-white hover:bg-white/[0.1] transition-all"
                    >
                      <span>Launch Client Portal</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Contact & Meta Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-1">
                    <span className="text-[10px] text-white/40 block">Key Sponsor</span>
                    <span className="font-bold text-white text-[11px]">{selectedClient.name}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-1">
                    <span className="text-[10px] text-white/40 block">Email Address</span>
                    <span className="text-white text-[11px] truncate block">{selectedClient.email}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-1">
                    <span className="text-[10px] text-white/40 block">Phone</span>
                    <span className="text-white text-[11px]">{selectedClient.phone}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-1">
                    <span className="text-[10px] text-white/40 block">Total Engagement</span>
                    <span className="text-[#D4FF3A] font-bold text-[11px]">{selectedClient.totalValue}</span>
                  </div>
                </div>

                {/* Internal Notes */}
                {selectedClient.notes && (
                  <div className="pt-2">
                    <span className="text-[10px] font-mono text-white/40 uppercase block mb-1">Internal Notes</span>
                    <p className="text-white/70 leading-relaxed bg-white/[0.02] p-3 rounded-xl border border-white/[0.05]">
                      {selectedClient.notes}
                    </p>
                  </div>
                )}
              </div>

              {/* Associated Projects Section */}
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-4 text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <FolderKanban className="w-4 h-4 text-[#D4FF3A]" />
                    <h3 className="font-bold text-white text-xs uppercase font-mono tracking-wider">
                      Associated Engineering Projects ({clientProjects.length})
                    </h3>
                  </div>
                  <a href="/admin/projects" className="text-[#D4FF3A] hover:underline flex items-center gap-1 font-mono text-[11px]">
                    <span>Manage in Projects</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>

                <div className="space-y-3">
                  {clientProjects.length === 0 ? (
                    <div className="py-8 text-center text-white/40 italic font-mono text-xs">
                      No active projects provisioned for this account yet.
                    </div>
                  ) : (
                    clientProjects.map((p) => (
                      <div
                        key={p.id}
                        className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between"
                      >
                        <div className="space-y-1">
                          <h4 className="font-bold text-white text-xs">{p.title}</h4>
                          <div className="text-[11px] text-white/50 font-mono">{p.service} • Target: {p.targetDeliveryDate}</div>
                          <div className="flex items-center gap-2 pt-1">
                            <div className="w-24 h-1.5 bg-white/[0.08] rounded-full overflow-hidden">
                              <div className="h-full bg-[#D4FF3A]" style={{ width: `${p.progress}%` }} />
                            </div>
                            <span className="text-[10px] font-mono text-[#D4FF3A] font-bold">{p.progress}%</span>
                          </div>
                        </div>

                        <div className="text-right space-y-1">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-white/[0.06] text-white/80 block">
                            {p.status.replace('_', ' ')}
                          </span>
                          <span className="text-[10px] font-mono text-[#D4FF3A] font-bold block">{p.budget}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="p-12 rounded-2xl bg-white/[0.02] border border-white/[0.08] text-center text-white/40 italic font-mono text-xs">
              Select a client account to inspect details and associated projects.
            </div>
          )}
        </div>
      </div>

      {/* Create / Edit Client Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#0E1013] border border-white/[0.15] rounded-2xl p-6 shadow-2xl space-y-4 text-xs max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <h3 className="text-base font-bold text-white">
                {editingClient ? 'Edit Client Account' : 'Register New Client'}
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-white/60"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveClient} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/70 mb-1">Company / Organization *</label>
                  <input
                    type="text"
                    required
                    value={newCompanyName}
                    onChange={(e) => setNewCompanyName(e.target.value)}
                    placeholder="e.g. Shree Enterprise"
                    className="w-full bg-[#111316] border border-white/[0.1] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D4FF3A]"
                  />
                </div>
                <div>
                  <label className="block text-white/70 mb-1">Primary Contact *</label>
                  <input
                    type="text"
                    required
                    value={newClientName}
                    onChange={(e) => setNewClientName(e.target.value)}
                    placeholder="e.g. Ramesh Patel"
                    className="w-full bg-[#111316] border border-white/[0.1] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D4FF3A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/70 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="ramesh@shree-enterprise.com"
                    className="w-full bg-[#111316] border border-white/[0.1] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D4FF3A]"
                  />
                </div>
                <div>
                  <label className="block text-white/70 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    placeholder="+91 98251 44210"
                    className="w-full bg-[#111316] border border-white/[0.1] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D4FF3A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/70 mb-1">Industry Sector</label>
                  <input
                    type="text"
                    value={newIndustry}
                    onChange={(e) => setNewIndustry(e.target.value)}
                    placeholder="e.g. Industrial Hardware & Fasteners"
                    className="w-full bg-[#111316] border border-white/[0.1] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D4FF3A]"
                  />
                </div>
                <div>
                  <label className="block text-white/70 mb-1">Engagement Value</label>
                  <input
                    type="text"
                    value={newTotalValue}
                    onChange={(e) => setNewTotalValue(e.target.value)}
                    placeholder="₹48,000"
                    className="w-full bg-[#111316] border border-white/[0.1] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D4FF3A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/70 mb-1">Internal Notes & Context</label>
                <textarea
                  rows={3}
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="Billing terms, server access credentials notes, communication schedule..."
                  className="w-full bg-[#111316] border border-white/[0.1] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D4FF3A]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-white/70"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-[#D4FF3A] text-[#08090A] font-bold hover:brightness-110 shadow-[0_4px_16px_rgba(212,255,58,0.25)]"
                >
                  Save Client
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Client Confirmation Modal */}
      {clientToDelete && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-[#0E1013] border border-white/[0.15] rounded-2xl p-6 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center gap-2 text-red-400 pb-2 border-b border-white/[0.08]">
              <Trash2 className="w-4 h-4" />
              <h3 className="text-base font-bold text-white">Delete Client Account</h3>
            </div>
            <p className="text-white/70 leading-relaxed">
              Are you sure you want to delete <strong className="text-white">{clientToDelete.company}</strong>?
              This will remove associated client directory records.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setClientToDelete(null)}
                className="px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-white/70"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteClient(clientToDelete.id);
                  if (selectedClient?.id === clientToDelete.id) {
                    setSelectedClient(clients.find((c) => c.id !== clientToDelete.id) || null);
                  }
                  setClientToDelete(null);
                }}
                className="px-4 py-1.5 rounded-lg bg-red-500 text-white font-bold hover:bg-red-600 shadow-[0_4px_16px_rgba(239,68,68,0.3)]"
              >
                Delete Client
              </button>
            </div>
          </div>
        </div>
      )}
    </PlatformLayout>
  );
}
