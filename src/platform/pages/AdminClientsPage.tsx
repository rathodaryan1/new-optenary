import { useState } from 'react';
import {
  ExternalLink,
  Plus,
} from 'lucide-react';
import { usePlatform } from '../platformContext';
import PlatformLayout from '../components/PlatformLayout';
import type { Client } from '../types';

export default function AdminClientsPage() {
  const { clients, projects, addClient, setCurrentClientId, setRole } = usePlatform();

  const [search, setSearch] = useState('');
  const [selectedClient, setSelectedClient] = useState<Client | null>(clients[0] || null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newClientName, setNewClientName] = useState('');
  const [newCompanyName, setNewCompanyName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newTotalValue, setNewTotalValue] = useState('₹40,000');

  const filteredClients = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.company.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreateClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName || !newCompanyName) return;

    const created = addClient({
      name: newClientName,
      company: newCompanyName,
      email: newEmail,
      phone: newPhone,
      totalValue: newTotalValue,
      status: 'active',
    });

    setSelectedClient(created);
    setShowAddModal(false);
    setNewClientName('');
    setNewCompanyName('');
    setNewEmail('');
    setNewPhone('');
  };

  return (
    <PlatformLayout
      title="Client Roster & Relationship Records"
      subtitle="Section 06 & 08 Spec: Centralized directory of client accounts, onboarding submissions, and contract values."
      actions={
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#D4FF3A] text-[#08090A] text-xs font-bold tracking-tight hover:brightness-110 shadow-[0_4px_16px_rgba(212,255,58,0.25)] transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Client Account</span>
        </button>
      }
    >
      <div className="space-y-6">
        {/* Search Bar */}
        <div className="flex items-center justify-between gap-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search clients by name, company, or domain..."
            className="w-full max-w-md bg-white/[0.04] border border-white/[0.1] rounded-xl px-4 py-2 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#D4FF3A]"
          />
          <span className="text-xs font-mono text-white/50">{filteredClients.length} Accounts Registered</span>
        </div>

        {/* Clients Directory & Detail Drawer */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Client Table / Cards */}
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

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentClientId(c.id);
                        setRole('client');
                      }}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-[#D4FF3A] hover:text-[#08090A] text-white text-xs font-semibold transition-all"
                      title="Open portal as this client"
                    >
                      <span>Portal</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
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
                  <span className="text-white/50">Joined Date:</span>
                  <span className="text-white font-mono">{selectedClient.joinedDate}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/[0.04]">
                  <span className="text-white/50">Total Relationship Value:</span>
                  <span className="text-[#D4FF3A] font-mono font-bold">{selectedClient.totalValue}</span>
                </div>
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
                    setRole('client');
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

      {/* New Client Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-[#0D0E11] border border-white/[0.12] rounded-2xl p-6 space-y-4">
            <h3 className="font-bold text-white text-base">Register New Client Account</h3>
            <form onSubmit={handleCreateClient} className="space-y-3 text-xs">
              <div>
                <label className="block text-white/70 mb-1">Company Name</label>
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
                <label className="block text-white/70 mb-1">Primary Contact Person</label>
                <input
                  type="text"
                  required
                  value={newClientName}
                  onChange={(e) => setNewClientName(e.target.value)}
                  placeholder="e.g. Tirth Rathod"
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
              <div>
                <label className="block text-white/70 mb-1">Estimated Contract Value</label>
                <input
                  type="text"
                  value={newTotalValue}
                  onChange={(e) => setNewTotalValue(e.target.value)}
                  placeholder="₹45,000"
                  className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-white/60 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#D4FF3A] text-[#08090A] font-bold text-xs"
                >
                  Create Client
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </PlatformLayout>
  );
}
