import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  CheckCircle2,
  Building2,
  ArrowRight,
  ShieldCheck,
  Layers,
} from 'lucide-react';
import { usePlatform } from '../platformContext';
import PlatformLayout from '../components/PlatformLayout';
import type { OnboardingData } from '../types';

export default function ClientOnboardingPage() {
  const { submitOnboarding } = usePlatform();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<OnboardingData>({
    clientName: '',
    companyName: '',
    email: '',
    phone: '',
    industry: 'Technology & E-commerce',
    website: '',
    projectTitle: '',
    service: 'Web Development',
    budget: '₹40,000',
    requirements: '',
    objectives: '',
    deliverables: ['Custom Web Architecture', 'Mobile Touch Optimization', 'Lighthouse 95+ Performance'],
    referenceLinks: '',
    brandAssetsLink: '',
    additionalNotes: '',
    submittedAt: '',
  });

  const [deliverableInput, setDeliverableInput] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleAddDeliverable = () => {
    if (!deliverableInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      deliverables: [...prev.deliverables, deliverableInput.trim()],
    }));
    setDeliverableInput('');
  };

  const handleRemoveDeliverable = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      deliverables: prev.deliverables.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientName || !formData.companyName) {
      alert('Please provide your name and company name to initiate onboarding.');
      return;
    }

    const payload: OnboardingData = {
      ...formData,
      submittedAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    };

    submitOnboarding(payload);
    setSubmitted(true);

    setTimeout(() => {
      navigate('/portal');
    }, 1500);
  };

  return (
    <PlatformLayout
      title="Client Onboarding Engine"
      subtitle="Section 06 Spec: Structured intake for requirements, brand assets, and project provisioning."
    >
      <div className="max-w-3xl mx-auto space-y-8">
        {submitted ? (
          <div className="text-center py-20 p-8 rounded-2xl bg-white/[0.02] border border-white/[0.1] space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#D4FF3A] text-[#08090A] flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(212,255,58,0.4)]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Onboarding Received & Initialized</h2>
            <p className="text-sm text-white/60 max-w-md mx-auto">
              Your project record and milestone workspace have been provisioned. Redirecting you to your private client portal...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Step 1: Client & Company Information */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-5">
              <div className="flex items-center gap-2.5 pb-3 border-b border-white/[0.06]">
                <Building2 className="w-4 h-4 text-[#D4FF3A]" />
                <h3 className="font-bold text-white text-base tracking-tight">01 — Company & Contact Information</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-white/70 mb-1.5">
                    Your Full Name <span className="text-[#D4FF3A]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    placeholder="e.g. Ramesh Patel"
                    className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#D4FF3A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/70 mb-1.5">
                    Company / Organization Name <span className="text-[#D4FF3A]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="e.g. Shree Enterprise"
                    className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#D4FF3A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/70 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. ramesh@shree-enterprise.com"
                    className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#D4FF3A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/70 mb-1.5">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. +91 98251 44210"
                    className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#D4FF3A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/70 mb-1.5">Industry</label>
                  <select
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    className="w-full bg-[#111316] border border-white/[0.1] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4FF3A]"
                  >
                    <option value="Manufacturing & Industrial">Manufacturing & Industrial</option>
                    <option value="Dairy & FMCG">Dairy & FMCG</option>
                    <option value="Textiles & Garments">Textiles & Garments</option>
                    <option value="Hospitality & Real Estate">Hospitality & Real Estate</option>
                    <option value="Healthcare & Clinics">Healthcare & Clinics</option>
                    <option value="Technology & SaaS">Technology & SaaS</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/70 mb-1.5">Existing Website (Optional)</label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    placeholder="https://example.com"
                    className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#D4FF3A]"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Project Scope & Objectives */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-5">
              <div className="flex items-center gap-2.5 pb-3 border-b border-white/[0.06]">
                <FileText className="w-4 h-4 text-[#D4FF3A]" />
                <h3 className="font-bold text-white text-base tracking-tight">02 — Project Scope & Requirements</h3>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-white/70 mb-1.5">Project Name / Title</label>
                    <input
                      type="text"
                      value={formData.projectTitle}
                      onChange={(e) => setFormData({ ...formData, projectTitle: e.target.value })}
                      placeholder="e.g. Sub-Second B2B Fastener Catalog"
                      className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#D4FF3A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-white/70 mb-1.5">Primary Service Required</label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-[#111316] border border-white/[0.1] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#D4FF3A]"
                    >
                      <option value="Web Development">Web Development</option>
                      <option value="Mobile Applications">Mobile Applications</option>
                      <option value="Custom Software & ERP">Custom Software & ERP</option>
                      <option value="AI Agents & Automation">AI Agents & Automation</option>
                      <option value="Digital Commerce & Shopify">Digital Commerce & Shopify</option>
                      <option value="UI/UX & Design Systems">UI/UX & Design Systems</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/70 mb-1.5">
                    What are the core requirements & features?
                  </label>
                  <textarea
                    rows={4}
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    placeholder="Describe what the system needs to do (e.g. 10,000 product lookup, WhatsApp integration, user roles, billing flow)..."
                    className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl p-3.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#D4FF3A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/70 mb-1.5">
                    What is the primary business goal / objective?
                  </label>
                  <input
                    type="text"
                    value={formData.objectives}
                    onChange={(e) => setFormData({ ...formData, objectives: e.target.value })}
                    placeholder="e.g. Reduce catalog search time from 5 minutes to 0.4 seconds and increase repeat distributor orders"
                    className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#D4FF3A]"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Deliverables & Brand Assets */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-5">
              <div className="flex items-center gap-2.5 pb-3 border-b border-white/[0.06]">
                <Layers className="w-4 h-4 text-[#D4FF3A]" />
                <h3 className="font-bold text-white text-base tracking-tight">03 — Expected Deliverables & Brand Assets</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-white/70 mb-1.5">Key Deliverables Checklist</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={deliverableInput}
                      onChange={(e) => setDeliverableInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddDeliverable();
                        }
                      }}
                      placeholder="Add specific deliverable (e.g. GST Invoicing Module)"
                      className="flex-1 bg-white/[0.04] border border-white/[0.1] rounded-xl px-3.5 py-2 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#D4FF3A]"
                    />
                    <button
                      type="button"
                      onClick={handleAddDeliverable}
                      className="px-4 py-2 rounded-xl bg-white/[0.1] hover:bg-white/[0.2] text-xs font-semibold text-white transition-colors"
                    >
                      Add
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {formData.deliverables.map((d, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.05] border border-white/[0.1] text-xs text-white/90"
                      >
                        <span>{d}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveDeliverable(index)}
                          className="text-white/40 hover:text-red-400 font-bold"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-white/70 mb-1.5">
                      Brand Assets / Google Drive Link
                    </label>
                    <input
                      type="url"
                      value={formData.brandAssetsLink}
                      onChange={(e) => setFormData({ ...formData, brandAssetsLink: e.target.value })}
                      placeholder="https://drive.google.com/..."
                      className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#D4FF3A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-white/70 mb-1.5">Reference Websites / Competitors</label>
                    <input
                      type="text"
                      value={formData.referenceLinks}
                      onChange={(e) => setFormData({ ...formData, referenceLinks: e.target.value })}
                      placeholder="e.g. stripe.com, reachwise.io"
                      className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#D4FF3A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/70 mb-1.5">Additional Notes & Specific Instructions</label>
                  <textarea
                    rows={2}
                    value={formData.additionalNotes}
                    onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                    placeholder="Anything else Tirth and the Optenary engineering team should keep in mind..."
                    className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl p-3 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#D4FF3A]"
                  />
                </div>
              </div>
            </div>

            {/* Submit Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-[#D4FF3A]/[0.05] border border-[#D4FF3A]/20">
              <div className="flex items-center gap-2.5 text-xs text-white/70">
                <ShieldCheck className="w-4 h-4 text-[#D4FF3A]" />
                <span>Submitting automatically provisions your secure project portal and milestones.</span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#D4FF3A] text-[#08090A] font-bold text-xs tracking-tight flex items-center justify-center gap-2 hover:brightness-110 shadow-[0_4px_20px_rgba(212,255,58,0.3)] transition-all"
              >
                <span>Complete Onboarding & Enter Portal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </PlatformLayout>
  );
}
