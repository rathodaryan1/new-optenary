import { useState } from 'react';
import {
  ExternalLink,
  Plus,
  Trash2,
  Edit2,
  Search,
} from 'lucide-react';
import { usePlatform } from '../platformContext';
import PlatformLayout from '../components/PlatformLayout';
import type { Client } from '../types';

export default function AdminClientsPage() {
  const { clients, projects, addClient, updateClient, deleteClient, setCurrentClientId } =
    usePlatform();

  const [search, setSearch] = useState('');
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

  const filteredClients = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.company.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

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
    if (!newClientName || !newCompanyName) return;

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

  return (
    <PlatformLayout
      title="Client Accounts Management"
      subtitle="Section 04 Spec: Maintain verified client profiles, company records, and associated project workspaces."
      actions={
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#D4FF3A] text-[#08090A] text-xs font-bold tracking-tight hover:brightness-110 shadow-[0_4px_16px_rgba(212,255,58,0.25)] transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Client Account</span>
        </button>
      }
    >
      <div className="space-y-6">
        {/* Search Bar */}
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] flex items-center gap-3 text-xs">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-white/40 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search clients by company name, contact person, or email..."
              className="w-full bg-white/[0.04] border border-white/[0.1] rounded-lg pl-9 pr-3 py-1.5 text-white placeholder-white/30 focus:outline-none focus:border-[#D4FF3A]"
            />
          </div>
          <span className="text-white/40 font-mono text-[11px]">{filteredClients.length} Accounts Found</span>
        </div>

        {/* 2-Column: Client Accounts List + Client Profile Drawer */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Client List */}
          <div className="lg:col-span-2 space-y-3">
            {filteredClients.map((c) => {
              const isSelected = selectedClient?.id === c.id;
              const clientProjects = projects.filter((p) => p.clientId === c.id);

              return (
                <div
                  key={c.id}
                  onClick={() => setSelectedClient(c)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    isSelected
                      ? 'bg-white/[0.05] border-[#D4FF3A]/50 shadow-[0_0_20px_rgba(212,255,58,0.06)]'
                      : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.1] flex items-center justify-center font-bold text-white text-sm">
                      {c.company.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-white">{c.company}</h4>
                        <span className="text-xs text-white/40">• {c.name}</span>
                        {c.isDemo && (
                          <span className="px-1.5 py-0.2 rounded bg-white/[0.06] text-white/40 text-[9px] font-mono">
                            Demo
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-[11px] text-white/50 font-mono mt-0.5">
                        <span>{c.email || 'No email logged'}</span>
                        <span>•</span>
                        <span>{c.phone || 'No phone'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 self-end sm:self-auto">
                    <div className="text-right font-mono text-xs">
                      <span className="text-white font-bold block">{c.totalValue}</span>
                      <span className="text-white/40 text-[10px]">{clientProjects.length} Active Project</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openEditModal(c);
                        }}
                        className="p-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-white/70 hover:text-white"
                        title="Edit client"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setClientToDelete(c);
                        }}
                        className="p-1.5 rounded-lg bg-white/[0.05] hover:bg-red-500/20 text-white/70 hover:text-red-400"
                        title="Delete client"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Client Profile Drawer */}
          {selectedClient && (
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-6 h-fit">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
                <div>
                  <h3 className="text-base font-bold text-white">{selectedClient.company}</h3>
                  <p className="text-xs text-white/50">{selectedClient.name}</p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase bg-[#D4FF3A]/20 text-[#D4FF3A] font-bold">
                  {selectedClient.status}
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1 border-b border-white/[0.04]">
                  <span className="text-white/50">Email:</span>
                  <span className="text-white font-mono">{selectedClient.email || '—'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/[0.04]">
                  <span className="text-white/50">Phone:</span>
                  <span className="text-white font-mono">{selectedClient.phone || '—'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/[0.04]">
                  <span className="text-white/50">Industry:</span>
                  <span className="text-white">{selectedClient.industry || 'Enterprise'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/[0.04]">
                  <span className="text-white/50">Joined Date:</span>
                  <span className="text-white font-mono">{selectedClient.joinedDate}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/[0.04]">
                  <span className="text-white/50">Total Relationship Value:</span>
                  <span className="text-[#D4FF3A] font-mono font-bold">{selectedClient.totalValue}</span>
                </div>
              </div>

              {/* Associated Projects */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 block">
                  Associated Projects
                </span>
                {projects
                  .filter((p) => p.clientId === selectedClient.id)
                  .map((p) => (
                    <div
                      key={p.id}
                      className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs space-y-1"
                    >
                      <div className="font-semibold text-white">{p.title}</div>
                      <div className="flex justify-between text-[11px] font-mono text-white/50">
                        <span>{p.service}</span>
                        <span className="text-[#D4FF3A] font-bold">{p.progress}%</span>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Onboarding Intake Records if submitted */}
              {selectedClient.onboardingData && (
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-2 text-xs">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 block">
                    Verified Intake Requirements
                  </span>
                  <div className="font-semibold text-white">{selectedClient.onboardingData.projectTitle}</div>
                  <p className="text-white/60 line-clamp-3">{selectedClient.onboardingData.requirements}</p>
                  {selectedClient.onboardingData.brandAssetsLink && (
                    <a
                      href={selectedClient.onboardingData.brandAssetsLink}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-[#D4FF3A] hover:underline block pt-1"
                    >
                      View Attached Drive Assets ↗
                    </a>
                  )}
                </div>
              )}

              <div className="pt-2">
                <button
                  onClick={() => {
                    setCurrentClientId(selectedClient.id);
                  }}
                  className="w-full py-2.5 rounded-xl bg-[#D4FF3A] text-[#08090A] font-bold text-xs tracking-tight flex items-center justify-center gap-2 hover:brightness-110 transition-all"
                >
                  <span>Launch {selectedClient.company} Client Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* New / Edit Client Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-[#0D0E11] border border-white/[0.12] rounded-2xl p-6 space-y-4">
            <h3 className="font-bold text-white text-base">
              {editingClient ? 'Edit Client Account' : 'Register New Client Account'}
            </h3>

            <form onSubmit={handleSaveClient} className="space-y-3 text-xs">
              <div>
                <label className="block text-white/70 mb-1">Company Name *</label>
                <input
                  type="text"
                  required
                  value={newCompanyName}
                  onChange={(e) => setNewCompanyName(e.target.value)}
                  placeholder="e.g. Surat Fasteners Corp"
                  className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-white/70 mb-1">Primary Contact Person *</label>
                <input
                  type="text"
                  required
                  value={newClientName}
                  onChange={(e) => setNewClientName(e.target.value)}
                  placeholder="e.g. Ramesh Patel"
                  className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/70 mb-1">Email</label>
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="contact@company.com"
                    className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-white/70 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    placeholder="+91..."
                    className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/70 mb-1">Industry</label>
                  <input
                    type="text"
                    value={newIndustry}
                    onChange={(e) => setNewIndustry(e.target.value)}
                    placeholder="e.g. Hardware Manufacturing"
                    className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-white/70 mb-1">Total Relationship Value</label>
                  <input
                    type="text"
                    value={newTotalValue}
                    onChange={(e) => setNewTotalValue(e.target.value)}
                    placeholder="e.g. ₹50,000"
                    className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/70 mb-1">Internal Notes</label>
                <textarea
                  rows={2}
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="Account context, key decision makers..."
                  className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl p-3 text-white"
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-3 border-t border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#D4FF3A] text-[#08090A] font-bold"
                >
                  {editingClient ? 'Save Changes' : 'Register Client'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {clientToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-sm bg-[#0D0E11] border border-white/[0.12] rounded-2xl p-6 space-y-4">
            <h3 className="font-bold text-white text-base">Confirm Account Deletion</h3>
            <p className="text-xs text-white/60">
              Are you sure you want to delete <span className="text-white font-semibold">"{clientToDelete.company}"</span>? All associated project records and files will also be removed.
            </p>
            <div className="flex justify-end gap-2.5 pt-2">
              <button
                onClick={() => setClientToDelete(null)}
                className="px-3.5 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-xs text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteClient(clientToDelete.id);
                  setClientToDelete(null);
                  if (selectedClient?.id === clientToDelete.id) {
                    setSelectedClient(clients[0] || null);
                  }
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
