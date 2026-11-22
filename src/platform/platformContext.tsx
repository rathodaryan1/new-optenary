import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type {
  Client,
  Project,
  Lead,
  Milestone,
  ProjectUpdate,
  FileItem,
  UserRole,
  OnboardingData,
  Proposal,
} from './types';

interface PlatformContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  toggleRole: () => void;
  currentClientId: string;
  setCurrentClientId: (id: string) => void;
  clients: Client[];
  projects: Project[];
  leads: Lead[];
  addClient: (client: Omit<Client, 'id' | 'joinedDate' | 'activeProjectsCount'>) => Client;
  updateClient: (id: string, updates: Partial<Client>) => void;
  addProject: (project: Omit<Project, 'id' | 'timeline' | 'updates' | 'files'>) => Project;
  updateProject: (id: string, updates: Partial<Project>) => void;
  updateMilestone: (projectId: string, milestoneId: string, status: Milestone['status'], progress: number) => void;
  addProjectUpdate: (projectId: string, update: Omit<ProjectUpdate, 'id' | 'date' | 'projectId'>) => void;
  addProjectFile: (projectId: string, file: Omit<FileItem, 'id' | 'uploadedAt'>) => void;
  submitOnboarding: (data: OnboardingData) => { client: Client; project: Project };
  addLead: (lead: Omit<Lead, 'id' | 'createdAt'>) => void;
  updateLeadStatus: (leadId: string, status: Lead['status']) => void;
  createProposal: (leadId: string, proposal: Omit<Proposal, 'id'>) => void;
  convertLeadToClient: (leadId: string) => { client: Client; project: Project } | null;
  resetToDefaults: () => void;
  // AI Tools
  aiAnalyzeRequirements: (rawText: string) => Promise<{
    summary: string;
    suggestedService: string;
    pages: string[];
    features: string[];
    technicalStack: string[];
    estimatedWeeks: number;
    recommendedBudget: string;
  }>;
  aiGenerateProjectSummary: (projectId: string) => Promise<{
    headline: string;
    completedHighlights: string[];
    activeFocus: string;
    risksAndBlockers: string;
    nextMilestoneDeadline: string;
  }>;
  aiDraftClientUpdate: (rawNotes: string) => Promise<{
    title: string;
    formattedMessage: string;
  }>;
}

const STORAGE_KEY = 'optenary_platform_state_v1';

const INITIAL_CLIENTS: Client[] = [
  {
    id: 'c-shree',
    name: 'Ramesh Patel',
    company: 'Shree Enterprise',
    email: 'ramesh@shree-enterprise.com',
    phone: '+91 98251 44210',
    joinedDate: 'Oct 12, 2026',
    activeProjectsCount: 1,
    totalValue: '₹48,000',
    status: 'active',
  },
  {
    id: 'c-mehta',
    name: 'Rajesh Mehta',
    company: 'Mehta Dairy',
    email: 'rajesh@mehtadairy.in',
    phone: '+91 94268 77319',
    joinedDate: 'Sep 15, 2026',
    activeProjectsCount: 1,
    totalValue: '₹85,000',
    status: 'active',
  },
  {
    id: 'c-vishal',
    name: 'Vishal Shah',
    company: 'Vishal Masala',
    email: 'vishal@vishalmasala.com',
    phone: '+91 97243 11802',
    joinedDate: 'Aug 04, 2026',
    activeProjectsCount: 1,
    totalValue: '₹36,000',
    status: 'completed',
  },
  {
    id: 'c-urban',
    name: 'Priya Dave',
    company: 'Urban Nest',
    email: 'priya@urbannestpg.com',
    phone: '+91 98980 55140',
    joinedDate: 'Oct 28, 2026',
    activeProjectsCount: 1,
    totalValue: '₹42,000',
    status: 'active',
  },
];

const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-shree',
    clientId: 'c-shree',
    clientName: 'Ramesh Patel',
    companyName: 'Shree Enterprise',
    title: 'Instant Industrial Fastener Catalog & B2B Search Engine',
    service: 'Custom Software & Web Application',
    progress: 72,
    status: 'active',
    startDate: 'Oct 15, 2026',
    targetDeliveryDate: 'Dec 10, 2026',
    budget: '₹48,000',
    requirementsSummary: 'Sub-second lookup across 10,000+ industrial hardware SKUs with instant category filters, live GST invoicing, and WhatsApp order dispatch.',
    liveUrl: 'https://catalog.shree-enterprise.com',
    teamMembers: [
      { name: 'Tirth Rathod', role: 'Lead Architect & Engineering' },
      { name: 'Gaurav', role: 'Full-Stack Developer' },
      { name: 'Yudhisthir', role: 'Cloud & Database Optimization' },
    ],
    milestones: [
      {
        id: 'm-1',
        name: 'Planning & Data Architecture',
        status: 'completed',
        progress: 100,
        dueDate: 'Oct 22, 2026',
        completedAt: 'Oct 21, 2026',
        deliverables: ['Schema design', '10,000 SKU indexing roadmap', 'API contracts'],
      },
      {
        id: 'm-2',
        name: 'UI/UX Design Systems',
        status: 'completed',
        progress: 100,
        dueDate: 'Nov 02, 2026',
        completedAt: 'Nov 01, 2026',
        deliverables: ['Figma design', 'Mobile search ergonomics', 'Specs'],
      },
      {
        id: 'm-3',
        name: 'Frontend Search & Core Engine',
        status: 'in_progress',
        progress: 75,
        dueDate: 'Nov 26, 2026',
        deliverables: ['Sub-second query cache', 'Faceted filters', 'Cart preview'],
      },
      {
        id: 'm-4',
        name: 'Testing, QA & GST Flow',
        status: 'pending',
        progress: 0,
        dueDate: 'Dec 04, 2026',
        deliverables: ['Stress testing', 'ERP synchronization', 'Cross-device audit'],
      },
      {
        id: 'm-5',
        name: 'Production Deployment & Launch',
        status: 'pending',
        progress: 0,
        dueDate: 'Dec 10, 2026',
        deliverables: ['Cloudflare Edge routing', 'SSL certification', 'Staff walkthrough'],
      },
    ],
    updates: [
      {
        id: 'up-1',
        projectId: 'proj-shree',
        date: 'Today, 11:20 AM',
        title: 'Instant Fastener Filter Engine is Live on Staging',
        content: 'We integrated the memory-cached search index. Searching across 10,400 bolt and fastener specifications now returns results in under 0.4s on both 4G mobile and desktop.',
        author: 'Tirth Rathod',
        isPublicToClient: true,
        tag: 'Milestone',
      },
      {
        id: 'up-2',
        projectId: 'proj-shree',
        date: 'Nov 18, 2026',
        title: 'GST Invoice Calculation Module Completed',
        content: 'Verified multi-tier tax computation for wholesale B2B invoices. Downloadable PDF receipts generated with matching HSN codes.',
        author: 'Gaurav',
        isPublicToClient: true,
        tag: 'Engineering',
      },
    ],
    files: [
      {
        id: 'f-1',
        name: 'Shree_Fastener_Catalog_Architecture_v1.pdf',
        category: 'requirements',
        size: '1.4 MB',
        uploadedAt: 'Oct 16, 2026',
        url: '#',
        type: 'pdf',
      },
      {
        id: 'f-2',
        name: 'Brand_Logo_Assets_HighRes.zip',
        category: 'brand_assets',
        size: '8.2 MB',
        uploadedAt: 'Oct 18, 2026',
        url: '#',
        type: 'zip',
      },
      {
        id: 'f-3',
        name: 'Figma_UI_Components_Specification.fig',
        category: 'designs',
        size: '14.5 MB',
        uploadedAt: 'Nov 02, 2026',
        url: '#',
        type: 'figma',
      },
    ],
    timeline: [
      {
        id: 'ev-1',
        date: 'Oct 15, 2026',
        title: 'Project Initiated',
        description: 'Client onboarding completed and requirements approved.',
        type: 'onboarding',
      },
      {
        id: 'ev-2',
        date: 'Oct 21, 2026',
        title: 'Architecture Finalized',
        description: 'PostgreSQL search index schema validated for 10k items.',
        type: 'milestone',
      },
      {
        id: 'ev-3',
        date: 'Nov 01, 2026',
        title: 'UI/UX Design Approved',
        description: 'Mobile-first design approved by Ramesh Patel.',
        type: 'milestone',
      },
    ],
  },
  {
    id: 'proj-mehta',
    clientId: 'c-mehta',
    clientName: 'Rajesh Mehta',
    companyName: 'Mehta Dairy',
    title: 'Enterprise Milk Supply Chain & Route Logistics ERP',
    service: 'Mobile & Cloud Architecture',
    progress: 88,
    status: 'active',
    startDate: 'Sep 18, 2026',
    targetDeliveryDate: 'Nov 30, 2026',
    budget: '₹85,000',
    requirementsSummary: 'Real-time collection center milk intake tracking, fat/SNF rate calculation, automated payment slips, and morning delivery route dispatch.',
    teamMembers: [
      { name: 'Tirth Rathod', role: 'System Architect' },
      { name: 'Gaurav', role: 'React Native & Mobile Lead' },
    ],
    milestones: [
      { id: 'mm-1', name: 'Planning & Hardware Protocol', status: 'completed', progress: 100 },
      { id: 'mm-2', name: 'Collection Center Tablet App', status: 'completed', progress: 100 },
      { id: 'mm-3', name: 'Route Dispatch & Fleet Tracking', status: 'completed', progress: 100 },
      { id: 'mm-4', name: 'UAT & Field Pilot Verification', status: 'in_progress', progress: 80, dueDate: 'Nov 27, 2026' },
      { id: 'mm-5', name: 'Production Rollout', status: 'pending', progress: 0, dueDate: 'Nov 30, 2026' },
    ],
    updates: [
      {
        id: 'mup-1',
        projectId: 'proj-mehta',
        date: 'Nov 20, 2026',
        title: 'Pilot testing across 12 collection centers completed',
        content: 'Zero sync errors recorded during morning milk intake. Thermal receipts generated in 1.2s.',
        author: 'Tirth Rathod',
        isPublicToClient: true,
      },
    ],
    files: [],
    timeline: [
      { id: 'mev-1', date: 'Sep 18, 2026', title: 'Onboarding Completed', description: 'Kickoff meeting held at Surat plant.', type: 'onboarding' },
    ],
  },
];

const INITIAL_LEADS: Lead[] = [
  {
    id: 'lead-1',
    name: 'Karan Varma',
    company: 'Apex Textile Mills',
    email: 'karan@apextextiles.com',
    phone: '+91 98240 12345',
    service: 'AI Agents & Automation',
    budget: '₹65,000',
    status: 'proposal_sent',
    notes: 'Interested in automated inventory forecasting and WhatsApp supplier quote bot.',
    createdAt: 'Nov 19, 2026',
    proposal: {
      id: 'prop-1',
      title: 'AI Textile Supply Forecast & Automated Bot',
      totalAmount: '₹65,000',
      scopeItems: ['ERP sync', 'Predictive demand engine', 'WhatsApp Business bot integration'],
      timelineWeeks: 4,
      status: 'sent',
      validUntil: 'Dec 05, 2026',
    },
  },
  {
    id: 'lead-2',
    name: 'Sneha Kapadia',
    company: 'Lumiere Dental Studio',
    email: 'dr.sneha@lumiereclinic.in',
    phone: '+91 99099 87654',
    service: 'Web Development & Booking Portal',
    budget: '₹35,000',
    status: 'qualified',
    notes: 'Needs appointment booking, patient intake forms, and fast mobile website.',
    createdAt: 'Nov 21, 2026',
  },
  {
    id: 'lead-3',
    name: 'Hitesh Prajapati',
    company: 'Gujarat Logistics Hub',
    email: 'hitesh@glh-freight.com',
    phone: '+91 97129 33211',
    service: 'Custom Software',
    budget: '₹95,000',
    status: 'contacted',
    notes: 'Discussed interstate fleet tracking and driver trip settlement portal.',
    createdAt: 'Nov 22, 2026',
  },
];

const PlatformContext = createContext<PlatformContextType | undefined>(undefined);

export function PlatformProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<UserRole>('client');
  const [currentClientId, setCurrentClientId] = useState<string>('c-shree');
  const [clients, setClients] = useState<Client[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_clients');
      return saved ? JSON.parse(saved) : INITIAL_CLIENTS;
    } catch {
      return INITIAL_CLIENTS;
    }
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_projects');
      return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
    } catch {
      return INITIAL_PROJECTS;
    }
  });

  const [leads, setLeads] = useState<Lead[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_leads');
      return saved ? JSON.parse(saved) : INITIAL_LEADS;
    } catch {
      return INITIAL_LEADS;
    }
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY + '_clients', JSON.stringify(clients));
    } catch { }
  }, [clients]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY + '_projects', JSON.stringify(projects));
    } catch { }
  }, [projects]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY + '_leads', JSON.stringify(leads));
    } catch { }
  }, [leads]);

  const toggleRole = () => {
    setRoleState((prev) => (prev === 'admin' ? 'client' : 'admin'));
  };

  const addClient = (clientData: Omit<Client, 'id' | 'joinedDate' | 'activeProjectsCount'>) => {
    const newClient: Client = {
      ...clientData,
      id: `c-${Date.now().toString(36)}`,
      joinedDate: 'Today',
      activeProjectsCount: 1,
    };
    setClients((prev) => [newClient, ...prev]);
    return newClient;
  };

  const updateClient = (id: string, updates: Partial<Client>) => {
    setClients((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));
  };

  const addProject = (projectData: Omit<Project, 'id' | 'timeline' | 'updates' | 'files'>) => {
    const newProject: Project = {
      ...projectData,
      id: `proj-${Date.now().toString(36)}`,
      timeline: [
        {
          id: `ev-${Date.now()}`,
          date: 'Today',
          title: 'Project Created',
          description: `Initialized project for ${projectData.companyName}.`,
          type: 'status',
        },
      ],
      updates: [
        {
          id: `up-${Date.now()}`,
          projectId: `proj-${Date.now().toString(36)}`,
          date: 'Just now',
          title: 'Welcome to your Optenary Project Workspace',
          content: 'Our team is preparing your project timeline and architectural roadmap. Milestones will be updated here live.',
          author: 'Tirth Rathod',
          isPublicToClient: true,
        },
      ],
      files: [],
    };
    setProjects((prev) => [newProject, ...prev]);
    return newProject;
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  };

  const updateMilestone = (
    projectId: string,
    milestoneId: string,
    status: Milestone['status'],
    progress: number
  ) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== projectId) return p;
        const updatedMilestones = p.milestones.map((m) =>
          m.id === milestoneId
            ? {
                ...m,
                status,
                progress,
                completedAt: status === 'completed' ? 'Today' : undefined,
              }
            : m
        );
        // Recalculate total project progress
        const totalProgress = Math.round(
          updatedMilestones.reduce((acc, curr) => acc + curr.progress, 0) /
            (updatedMilestones.length || 1)
        );

        const newTimelineEvent = {
          id: `ev-${Date.now()}`,
          date: 'Today',
          title: `Milestone Updated: ${milestoneId}`,
          description: `Progress updated to ${progress}% (${status}).`,
          type: 'milestone' as const,
        };

        return {
          ...p,
          milestones: updatedMilestones,
          progress: totalProgress,
          timeline: [newTimelineEvent, ...p.timeline],
        };
      })
    );
  };

  const addProjectUpdate = (projectId: string, updateData: Omit<ProjectUpdate, 'id' | 'date' | 'projectId'>) => {
    const newUpdate: ProjectUpdate = {
      ...updateData,
      id: `up-${Date.now()}`,
      projectId,
      date: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== projectId) return p;
        return {
          ...p,
          updates: [newUpdate, ...p.updates],
          timeline: [
            {
              id: `ev-${Date.now()}`,
              date: 'Today',
              title: updateData.title,
              description: updateData.content.slice(0, 100) + '...',
              type: 'note',
            },
            ...p.timeline,
          ],
        };
      })
    );
  };

  const addProjectFile = (projectId: string, fileData: Omit<FileItem, 'id' | 'uploadedAt'>) => {
    const newFile: FileItem = {
      ...fileData,
      id: `f-${Date.now()}`,
      uploadedAt: 'Today',
    };

    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== projectId) return p;
        return {
          ...p,
          files: [newFile, ...p.files],
          timeline: [
            {
              id: `ev-${Date.now()}`,
              date: 'Today',
              title: `File Uploaded: ${fileData.name}`,
              description: `Added to ${fileData.category.replace('_', ' ')}.`,
              type: 'file',
            },
            ...p.timeline,
          ],
        };
      })
    );
  };

  const submitOnboarding = (data: OnboardingData) => {
    const clientId = `c-${Date.now().toString(36)}`;
    const projectId = `proj-${Date.now().toString(36)}`;

    const newClient: Client = {
      id: clientId,
      name: data.clientName,
      company: data.companyName,
      email: data.email,
      phone: data.phone,
      joinedDate: 'Today',
      activeProjectsCount: 1,
      totalValue: data.budget || '₹35,000',
      status: 'active',
      onboardingData: data,
    };

    const newProject: Project = {
      id: projectId,
      clientId,
      clientName: data.clientName,
      companyName: data.companyName,
      title: data.projectTitle || `${data.companyName} Core System`,
      service: data.service || 'Web Development',
      progress: 15,
      status: 'active',
      startDate: 'Today',
      targetDeliveryDate: 'In 30 days',
      budget: data.budget || '₹35,000',
      requirementsSummary: data.requirements || data.objectives,
      teamMembers: [
        { name: 'Tirth Rathod', role: 'Lead Architect' },
        { name: 'Optenary Engineering', role: 'Full-Stack Team' },
      ],
      milestones: [
        { id: 'm-1', name: 'Onboarding & Requirement Verification', status: 'completed', progress: 100, completedAt: 'Today' },
        { id: 'm-2', name: 'UI/UX & Interactive Prototypes', status: 'in_progress', progress: 25, dueDate: 'Week 1' },
        { id: 'm-3', name: 'Core Architecture & API Integration', status: 'pending', progress: 0, dueDate: 'Week 2' },
        { id: 'm-4', name: 'QA Testing & User Acceptance', status: 'pending', progress: 0, dueDate: 'Week 3' },
        { id: 'm-5', name: 'Production Launch & Go-Live', status: 'pending', progress: 0, dueDate: 'Week 4' },
      ],
      updates: [
        {
          id: `up-${Date.now()}`,
          projectId,
          date: 'Just now',
          title: 'Onboarding Submission Received & Verified',
          content: `We received your requirements for ${data.projectTitle}. Our team has initiated the architecture roadmap.`,
          author: 'Tirth Rathod',
          isPublicToClient: true,
          tag: 'Onboarding',
        },
      ],
      files: data.brandAssetsLink
        ? [
            {
              id: `f-${Date.now()}`,
              name: 'Client_Brand_Assets_Submitted.url',
              category: 'brand_assets',
              size: 'External',
              uploadedAt: 'Today',
              url: data.brandAssetsLink,
              type: 'link',
            },
          ]
        : [],
      timeline: [
        {
          id: `ev-${Date.now()}`,
          date: 'Today',
          title: 'Client Onboarding Completed',
          description: `${data.clientName} submitted intake requirements.`,
          type: 'onboarding',
        },
      ],
    };

    setClients((prev) => [newClient, ...prev]);
    setProjects((prev) => [newProject, ...prev]);
    setCurrentClientId(clientId);

    return { client: newClient, project: newProject };
  };

  const addLead = (leadData: Omit<Lead, 'id' | 'createdAt'>) => {
    const newLead: Lead = {
      ...leadData,
      id: `lead-${Date.now().toString(36)}`,
      createdAt: 'Today',
    };
    setLeads((prev) => [newLead, ...prev]);
  };

  const updateLeadStatus = (leadId: string, status: Lead['status']) => {
    setLeads((prev) => prev.map((l) => (l.id === leadId ? { ...l, status } : l)));
  };

  const createProposal = (leadId: string, proposalData: Omit<Proposal, 'id'>) => {
    const newProposal: Proposal = {
      ...proposalData,
      id: `prop-${Date.now().toString(36)}`,
    };
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status: 'proposal_sent', proposal: newProposal } : l))
    );
  };

  const convertLeadToClient = (leadId: string) => {
    const lead = leads.find((l) => l.id === leadId);
    if (!lead) return null;

    updateLeadStatus(leadId, 'won');

    const clientId = `c-${Date.now().toString(36)}`;
    const projectId = `proj-${Date.now().toString(36)}`;

    const newClient: Client = {
      id: clientId,
      name: lead.name,
      company: lead.company,
      email: lead.email,
      phone: lead.phone,
      joinedDate: 'Today',
      activeProjectsCount: 1,
      totalValue: lead.budget || lead.proposal?.totalAmount || '₹40,000',
      status: 'active',
    };

    const newProject: Project = {
      id: projectId,
      clientId,
      clientName: lead.name,
      companyName: lead.company,
      title: `${lead.company} ${lead.service || 'Platform'}`,
      service: lead.service || 'Web Development',
      progress: 20,
      status: 'active',
      startDate: 'Today',
      targetDeliveryDate: `In ${lead.proposal?.timelineWeeks || 4} weeks`,
      budget: lead.proposal?.totalAmount || lead.budget || '₹40,000',
      requirementsSummary: lead.notes || lead.proposal?.scopeItems.join(', ') || 'Initial scope approved.',
      teamMembers: [{ name: 'Tirth Rathod', role: 'Lead Architect' }],
      milestones: [
        { id: 'm-1', name: 'Proposal Approval & Kickoff', status: 'completed', progress: 100, completedAt: 'Today' },
        { id: 'm-2', name: 'UI Design & Wireframing', status: 'in_progress', progress: 30, dueDate: 'Week 1' },
        { id: 'm-3', name: 'Core System Implementation', status: 'pending', progress: 0, dueDate: 'Week 2' },
        { id: 'm-4', name: 'Client Testing & Review', status: 'pending', progress: 0, dueDate: 'Week 3' },
        { id: 'm-5', name: 'Deployment & Launch', status: 'pending', progress: 0, dueDate: 'Week 4' },
      ],
      updates: [
        {
          id: `up-${Date.now()}`,
          projectId,
          date: 'Today',
          title: 'Proposal Approved & Project Initialized',
          content: 'Contract confirmed. Engineering team assigned and kick-off initiated.',
          author: 'Tirth Rathod',
          isPublicToClient: true,
          tag: 'Kickoff',
        },
      ],
      files: [],
      timeline: [
        {
          id: `ev-${Date.now()}`,
          date: 'Today',
          title: 'Converted from Lead Pipeline',
          description: `Proposal accepted for ${lead.company}.`,
          type: 'status',
        },
      ],
    };

    setClients((prev) => [newClient, ...prev]);
    setProjects((prev) => [newProject, ...prev]);

    return { client: newClient, project: newProject };
  };

  const resetToDefaults = () => {
    localStorage.removeItem(STORAGE_KEY + '_clients');
    localStorage.removeItem(STORAGE_KEY + '_projects');
    localStorage.removeItem(STORAGE_KEY + '_leads');
    setClients(INITIAL_CLIENTS);
    setProjects(INITIAL_PROJECTS);
    setLeads(INITIAL_LEADS);
    setCurrentClientId('c-shree');
  };

  // AI Operations Layer
  const aiAnalyzeRequirements = async (rawText: string) => {
    // Artificial latency for authentic AI thinking feedback
    await new Promise((r) => setTimeout(r, 650));

    const isEcommerce = /store|shop|product|sell|order|fastener|catalog/i.test(rawText);
    const isMobile = /mobile|app|ios|android|flutter/i.test(rawText);
    const isAutomation = /ai|agent|bot|whatsapp|scrape|automate/i.test(rawText);

    let suggestedService = 'Web & SaaS Engineering';
    let pages = ['Landing Page', 'Catalog / Directory', 'Item Detail & Specs', 'Customer Inquiries', 'Admin Portal'];
    let features = ['Instant faceted search (<0.5s lookup)', 'Mobile responsive touch layout', 'WhatsApp instant quote trigger', 'Clean SEO meta tags'];
    let technicalStack = ['React 19 + TypeScript', 'Vite & Tailwind CSS', 'Edge Cache / Cloudflare', 'PostgreSQL / Supabase'];
    let estimatedWeeks = 3;
    let recommendedBudget = '₹35,000 - ₹50,000';

    if (isAutomation) {
      suggestedService = 'AI Agents & Workflow Automation';
      pages = ['Automation Dashboard', 'Webhook Logs', 'Prompt Configurator', 'Dispatch Monitor'];
      features = ['Gemini API structured reasoning', 'Automated WhatsApp trigger', 'Data extraction & JSON export', 'Error self-healing'];
      technicalStack = ['Python FastAPI / Node.js', 'Gemini Flash API', 'Redis Queue', 'PostgreSQL'];
      estimatedWeeks = 2;
      recommendedBudget = '₹40,000 - ₹65,000';
    } else if (isMobile) {
      suggestedService = 'Mobile Application Development';
      pages = ['Splash & Onboarding', 'Home Feed', 'Operations Log', 'Profile & Settings'];
      features = ['Offline-first sync', 'Instant camera / scanner integration', 'Push notifications', 'Sub-second start time'];
      technicalStack = ['React Native', 'TypeScript', 'Secure Storage', 'Node.js Backend'];
      estimatedWeeks = 4;
      recommendedBudget = '₹50,000 - ₹80,000';
    } else if (isEcommerce) {
      suggestedService = 'Digital Commerce & Storefront';
      pages = ['Storefront', 'Product Catalog & Filters', 'Cart & 1-Click Checkout', 'Order Tracking', 'Inventory Admin'];
      features = ['Sub-second cart calculation', 'Razorpay & UPI gateway integration', 'Automated SMS / WhatsApp dispatch alerts', 'Live stock decrement'];
      technicalStack = ['Next.js 15 & React 19', 'Tailwind CSS', 'Shopify Storefront API / Node.js', 'PostgreSQL'];
      estimatedWeeks = 3;
      recommendedBudget = '₹45,000 - ₹70,000';
    }

    return {
      summary: `Automated architectural scoping for: "${rawText.slice(0, 80)}..."`,
      suggestedService,
      pages,
      features,
      technicalStack,
      estimatedWeeks,
      recommendedBudget,
    };
  };

  const aiGenerateProjectSummary = async (projectId: string) => {
    await new Promise((r) => setTimeout(r, 550));
    const proj = projects.find((p) => p.id === projectId);
    if (!proj) {
      return {
        headline: 'Project Status Overview',
        completedHighlights: ['Milestones on track'],
        activeFocus: 'General sprint execution',
        risksAndBlockers: 'None identified.',
        nextMilestoneDeadline: 'Next Sprint',
      };
    }

    const completed = proj.milestones.filter((m) => m.status === 'completed');
    const inProgress = proj.milestones.find((m) => m.status === 'in_progress');

    return {
      headline: `${proj.companyName}: ${proj.progress}% Complete — ${proj.status.toUpperCase()}`,
      completedHighlights: completed.map((c) => `${c.name} (100% complete)`),
      activeFocus: inProgress ? `Actively delivering ${inProgress.name} (${inProgress.progress}%)` : 'Final delivery & UAT',
      risksAndBlockers: proj.progress > 80 ? 'No critical risks. Target delivery within scheduled buffer.' : 'Verify client asset sign-off.',
      nextMilestoneDeadline: inProgress?.dueDate || proj.targetDeliveryDate,
    };
  };

  const aiDraftClientUpdate = async (rawNotes: string) => {
    await new Promise((r) => setTimeout(r, 450));
    return {
      title: 'Milestone Progress: Architecture & Core Engineering Update',
      formattedMessage: `Hi team! Here is our latest progress update:\n\n• ${rawNotes.replace(/\n/g, '\n• ')}\n\nEverything is performing smoothly on staging. Our engineers are proceeding with the next deliverable right on schedule. Let us know if you have any questions!`,
    };
  };

  return (
    <PlatformContext.Provider
      value={{
        role,
        setRole: setRoleState,
        toggleRole,
        currentClientId,
        setCurrentClientId,
        clients,
        projects,
        leads,
        addClient,
        updateClient,
        addProject,
        updateProject,
        updateMilestone,
        addProjectUpdate,
        addProjectFile,
        submitOnboarding,
        addLead,
        updateLeadStatus,
        createProposal,
        convertLeadToClient,
        resetToDefaults,
        aiAnalyzeRequirements,
        aiGenerateProjectSummary,
        aiDraftClientUpdate,
      }}
    >
      {children}
    </PlatformContext.Provider>
  );
}

export function usePlatform() {
  const context = useContext(PlatformContext);
  if (!context) {
    throw new Error('usePlatform must be used within a PlatformProvider');
  }
  return context;
}
