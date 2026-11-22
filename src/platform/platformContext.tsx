import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type {
  Client,
  Project,
  Lead,
  Milestone,
  Task,
  TeamMember,
  ProjectUpdate,
  FileItem,
  UserRole,
  OnboardingData,
  Proposal,
} from './types';
import { useAuth } from './auth/AuthContext';

interface PlatformContextType {
  role: UserRole;
  currentClientId: string;
  setCurrentClientId: (id: string) => void;

  // Data Stores
  clients: Client[];
  projects: Project[];
  leads: Lead[];
  tasks: Task[];
  teamMembers: TeamMember[];

  // Client CRUD
  addClient: (client: Omit<Client, 'id' | 'joinedDate' | 'activeProjectsCount'>) => Client;
  updateClient: (id: string, updates: Partial<Client>) => void;
  deleteClient: (id: string) => void;

  // Project CRUD
  addProject: (project: Omit<Project, 'id' | 'timeline' | 'updates' | 'files' | 'progress'>) => Project;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  updateMilestone: (projectId: string, milestoneId: string, status: Milestone['status'], progress: number) => void;

  // Task CRUD
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'isCompleted'>) => Task;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTaskStatus: (id: string) => void;

  // Team Member CRUD
  addTeamMember: (member: Omit<TeamMember, 'id' | 'activeTasksCount'>) => TeamMember;
  updateTeamMember: (id: string, updates: Partial<TeamMember>) => void;
  deleteTeamMember: (id: string) => void;

  // Project Communication & Files
  addProjectUpdate: (projectId: string, update: Omit<ProjectUpdate, 'id' | 'date' | 'projectId'>) => void;
  addProjectFile: (projectId: string, file: Omit<FileItem, 'id' | 'uploadedAt' | 'projectId'>) => void;
  deleteProjectFile: (projectId: string, fileId: string) => void;

  // Onboarding & Leads
  submitOnboarding: (data: OnboardingData) => { client: Client; project: Project };
  addLead: (lead: Omit<Lead, 'id' | 'createdAt'>) => void;
  updateLead: (id: string, updates: Partial<Lead>) => void;
  deleteLead: (id: string) => void;
  updateLeadStatus: (leadId: string, status: Lead['status']) => void;
  createProposal: (leadId: string, proposal: Omit<Proposal, 'id'>) => void;
  convertLeadToClient: (leadId: string) => { client: Client; project: Project } | null;

  // Utilities
  resetToDefaults: () => void;
  exportDatabaseJSON: () => void;

  // AI Copilot
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

const STORAGE_KEY = 'optenary_platform_db_v2';

const INITIAL_TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'tm-1',
    name: 'Tirth Rathod',
    email: 'tirth@optenary.in',
    roleTitle: 'Founder & Lead Architect',
    department: 'Engineering & Architecture',
    activeTasksCount: 2,
    avatarUrl: 'TR',
  },
  {
    id: 'tm-2',
    name: 'Yudhisthir Rathod',
    email: 'yudhisthir@optenary.in',
    roleTitle: 'Cloud Architect & Database Lead',
    department: 'Infrastructure',
    activeTasksCount: 1,
    avatarUrl: 'YR',
  },
  {
    id: 'tm-3',
    name: 'Gaurav',
    email: 'gaurav@optenary.in',
    roleTitle: 'Full-Stack & Mobile Engineer',
    department: 'Frontend & Mobile',
    activeTasksCount: 2,
    avatarUrl: 'GV',
  },
  {
    id: 'tm-4',
    name: 'Bhavik',
    email: 'bhavik@optenary.in',
    roleTitle: 'UI/UX Design Systems Engineer',
    department: 'Design',
    activeTasksCount: 1,
    avatarUrl: 'BH',
  },
];

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
    industry: 'Industrial Hardware & Fasteners',
    isDemo: true,
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
    industry: 'Dairy & Agritech Logistics',
    isDemo: true,
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
    industry: 'FMCG & Spices',
    isDemo: true,
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
    industry: 'Hospitality & Real Estate',
    isDemo: true,
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
    progress: 75,
    status: 'in_progress',
    startDate: 'Oct 15, 2026',
    targetDeliveryDate: 'Dec 10, 2026',
    budget: '₹48,000',
    requirementsSummary: 'Sub-second lookup across 10,000+ industrial hardware SKUs with instant category filters, live GST invoicing, and WhatsApp order dispatch.',
    liveUrl: 'https://catalog.shree-enterprise.com',
    isDemo: true,
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
        projectId: 'proj-shree',
        name: 'Shree_Fastener_Catalog_Architecture_v1.pdf',
        category: 'requirements',
        size: '1.4 MB',
        uploadedAt: 'Oct 16, 2026',
        url: '#',
        type: 'pdf',
      },
      {
        id: 'f-2',
        projectId: 'proj-shree',
        name: 'Brand_Logo_Assets_HighRes.zip',
        category: 'brand_assets',
        size: '8.2 MB',
        uploadedAt: 'Oct 18, 2026',
        url: '#',
        type: 'zip',
      },
      {
        id: 'f-3',
        projectId: 'proj-shree',
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
    progress: 76,
    status: 'in_progress',
    startDate: 'Sep 18, 2026',
    targetDeliveryDate: 'Nov 30, 2026',
    budget: '₹85,000',
    requirementsSummary: 'Real-time collection center milk intake tracking, fat/SNF rate calculation, automated payment slips, and morning delivery route dispatch.',
    isDemo: true,
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

const INITIAL_TASKS: Task[] = [
  {
    id: 'tsk-1',
    projectId: 'proj-shree',
    title: 'Benchmark 10,000 SKU query response under 400ms',
    description: 'Tune memory index and Postgres full-text indexing for hardware bolt specs.',
    status: 'in_progress',
    priority: 'urgent',
    assignedTo: 'tm-1',
    assignedToName: 'Tirth Rathod',
    dueDate: 'Nov 25, 2026',
    estimatedHours: 8,
    isCompleted: false,
    createdAt: 'Nov 18, 2026',
    isDemo: true,
  },
  {
    id: 'tsk-2',
    projectId: 'proj-shree',
    title: 'Mobile touch ergonomics for fastener selector',
    description: 'Ensure filter pills and bottom modal sheets work smoothly on 360px viewport.',
    status: 'in_progress',
    priority: 'high',
    assignedTo: 'tm-4',
    assignedToName: 'Bhavik',
    dueDate: 'Nov 26, 2026',
    estimatedHours: 6,
    isCompleted: false,
    createdAt: 'Nov 19, 2026',
    isDemo: true,
  },
  {
    id: 'tsk-3',
    projectId: 'proj-shree',
    title: 'GST wholesale tax breakdown in PDF quote output',
    description: 'Validate CGST + SGST vs IGST for inter-state Gujarat hardware shipments.',
    status: 'done',
    priority: 'medium',
    assignedTo: 'tm-3',
    assignedToName: 'Gaurav',
    dueDate: 'Nov 20, 2026',
    estimatedHours: 12,
    isCompleted: true,
    createdAt: 'Nov 14, 2026',
    isDemo: true,
  },
  {
    id: 'tsk-4',
    projectId: 'proj-mehta',
    title: 'Stress-test offline sqlite sync on tablet devices',
    description: 'Simulate connection drops during 6:00 AM rural milk collection rounds.',
    status: 'in_progress',
    priority: 'urgent',
    assignedTo: 'tm-3',
    assignedToName: 'Gaurav',
    dueDate: 'Nov 27, 2026',
    estimatedHours: 14,
    isCompleted: false,
    createdAt: 'Nov 16, 2026',
    isDemo: true,
  },
  {
    id: 'tsk-5',
    projectId: 'proj-mehta',
    title: 'Thermal Bluetooth printer handshake protocol',
    description: 'Ensure 1-click receipt printing on Android 14 without Bluetooth disconnects.',
    status: 'done',
    priority: 'high',
    assignedTo: 'tm-2',
    assignedToName: 'Yudhisthir',
    dueDate: 'Nov 19, 2026',
    estimatedHours: 10,
    isCompleted: true,
    createdAt: 'Nov 12, 2026',
    isDemo: true,
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
    source: 'Website Inbound',
    status: 'proposal_sent',
    notes: 'Interested in automated inventory forecasting and WhatsApp supplier quote bot.',
    createdAt: 'Nov 19, 2026',
    isDemo: true,
    proposal: {
      id: 'prop-apex',
      title: 'Apex Mill Autonomous Inventory Agent',
      totalAmount: '₹65,000',
      scopeItems: [
        'WhatsApp Supplier RFQ Dispatch Bot',
        'Gemini Structured Reasoning Integration',
        'Yarn Stock Threshold Alerts',
        'Staff Dashboard & Audit Logging',
      ],
      timelineWeeks: 3,
      status: 'sent',
      validUntil: 'Dec 05, 2026',
    },
  },
  {
    id: 'lead-2',
    name: 'Divya Patel',
    company: 'Zenith Ceramics',
    email: 'divya@zenithceramics.in',
    phone: '+91 98795 33201',
    service: 'Web Development & Catalog',
    budget: '₹45,000',
    source: 'Referral',
    status: 'qualified',
    notes: 'Tile & slab manufacturer needing high-res 3D tile visualizer and distributor portal.',
    createdAt: 'Nov 21, 2026',
    isDemo: true,
  },
  {
    id: 'lead-3',
    name: 'Nitin Desai',
    company: 'Surat Diamond Craft',
    email: 'nitin@diamondcraft.com',
    phone: '+91 98250 88990',
    service: 'Custom Software & ERP',
    budget: '₹1,20,000',
    source: 'Direct Inbound',
    status: 'new',
    notes: 'Inquiry received for custom rough-to-polish diamond tracking ERP.',
    createdAt: 'Nov 22, 2026',
    isDemo: true,
  },
];

const PlatformContext = createContext<PlatformContextType | undefined>(undefined);

export function PlatformProvider({ children }: { children: ReactNode }) {
  const { currentUser, role } = useAuth();

  const [clients, setClients] = useState<Client[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_clients`);
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_CLIENTS;
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_projects`);
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_PROJECTS;
  });

  const [leads, setLeads] = useState<Lead[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_leads`);
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_LEADS;
  });

  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_tasks`);
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_TASKS;
  });

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_team`);
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_TEAM_MEMBERS;
  });

  // Client ID selection: strictly isolated if logged in as client!
  const [selectedClientId, setSelectedClientId] = useState<string>('c-shree');

  const currentClientId =
    role === 'client' && currentUser?.clientId ? currentUser.clientId : selectedClientId;

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_clients`, JSON.stringify(clients));
      localStorage.setItem(`${STORAGE_KEY}_projects`, JSON.stringify(projects));
      localStorage.setItem(`${STORAGE_KEY}_leads`, JSON.stringify(leads));
      localStorage.setItem(`${STORAGE_KEY}_tasks`, JSON.stringify(tasks));
      localStorage.setItem(`${STORAGE_KEY}_team`, JSON.stringify(teamMembers));
    } catch {}
  }, [clients, projects, leads, tasks, teamMembers]);

  // Recalculate Project Progress Automatically from Milestones or Tasks
  const recalculateProgress = (milestones: Milestone[]): number => {
    if (!milestones.length) return 0;
    const total = milestones.reduce((sum, m) => sum + m.progress, 0);
    return Math.round(total / milestones.length);
  };

  // CLIENT CRUD
  const addClient = (data: Omit<Client, 'id' | 'joinedDate' | 'activeProjectsCount'>): Client => {
    const newClient: Client = {
      ...data,
      id: `c-${Date.now().toString(36)}`,
      joinedDate: 'Today',
      activeProjectsCount: 0,
      isDemo: false,
    };
    setClients((prev) => [newClient, ...prev]);
    return newClient;
  };

  const updateClient = (id: string, updates: Partial<Client>) => {
    setClients((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));
  };

  const deleteClient = (id: string) => {
    setClients((prev) => prev.filter((c) => c.id !== id));
    setProjects((prev) => prev.filter((p) => p.clientId !== id));
  };

  // PROJECT CRUD
  const addProject = (data: Omit<Project, 'id' | 'timeline' | 'updates' | 'files' | 'progress'>): Project => {
    const newProject: Project = {
      ...data,
      id: `proj-${Date.now().toString(36)}`,
      progress: recalculateProgress(data.milestones || []),
      status: 'planning',
      updates: [],
      files: [],
      timeline: [
        {
          id: `ev-${Date.now()}`,
          date: 'Today',
          title: 'Project Initialized',
          description: `Project "${data.title}" registered in system.`,
          type: 'onboarding',
        },
      ],
      isDemo: false,
    };
    setProjects((prev) => [newProject, ...prev]);
    setClients((prev) =>
      prev.map((c) =>
        c.id === data.clientId ? { ...c, activeProjectsCount: c.activeProjectsCount + 1 } : c
      )
    );
    return newProject;
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    setTasks((prev) => prev.filter((t) => t.projectId !== id));
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

        const updatedMilestones = p.milestones.map((m) => {
          if (m.id !== milestoneId) return m;
          return {
            ...m,
            status,
            progress,
            completedAt: status === 'completed' ? 'Today' : m.completedAt,
          };
        });

        const newProgress = recalculateProgress(updatedMilestones);
        const newStatus = newProgress === 100 ? 'completed' : newProgress > 0 ? 'in_progress' : p.status;

        return {
          ...p,
          milestones: updatedMilestones,
          progress: newProgress,
          status: newStatus,
          timeline: [
            {
              id: `ev-${Date.now()}`,
              date: 'Today',
              title: `Milestone updated: ${status.toUpperCase()}`,
              description: `Progress reached ${progress}%.`,
              type: 'milestone',
            },
            ...p.timeline,
          ],
        };
      })
    );
  };

  // TASK CRUD
  const addTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'isCompleted'>): Task => {
    const newTask: Task = {
      ...taskData,
      id: `tsk-${Date.now().toString(36)}`,
      createdAt: 'Today',
      isCompleted: taskData.status === 'done',
      isDemo: false,
    };
    setTasks((prev) => [newTask, ...prev]);
    return newTask;
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const status = updates.status !== undefined ? updates.status : t.status;
        return {
          ...t,
          ...updates,
          isCompleted: status === 'done',
        };
      })
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleTaskStatus = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const nextStatus = t.status === 'done' ? 'todo' : 'done';
        return {
          ...t,
          status: nextStatus,
          isCompleted: nextStatus === 'done',
        };
      })
    );
  };

  // TEAM CRUD
  const addTeamMember = (data: Omit<TeamMember, 'id' | 'activeTasksCount'>): TeamMember => {
    const newMember: TeamMember = {
      ...data,
      id: `tm-${Date.now().toString(36)}`,
      activeTasksCount: 0,
      avatarUrl: data.name.slice(0, 2).toUpperCase(),
    };
    setTeamMembers((prev) => [...prev, newMember]);
    return newMember;
  };

  const updateTeamMember = (id: string, updates: Partial<TeamMember>) => {
    setTeamMembers((prev) => prev.map((tm) => (tm.id === id ? { ...tm, ...updates } : tm)));
  };

  const deleteTeamMember = (id: string) => {
    setTeamMembers((prev) => prev.filter((tm) => tm.id !== id));
  };

  // UPDATES & FILES
  const addProjectUpdate = (
    projectId: string,
    updateData: Omit<ProjectUpdate, 'id' | 'date' | 'projectId'>
  ) => {
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

  const addProjectFile = (
    projectId: string,
    fileData: Omit<FileItem, 'id' | 'uploadedAt' | 'projectId'>
  ) => {
    const newFile: FileItem = {
      ...fileData,
      id: `f-${Date.now()}`,
      projectId,
      uploadedAt: 'Today',
    };

    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== projectId) return p;
        return {
          ...p,
          files: [newFile, ...p.files],
        };
      })
    );
  };

  const deleteProjectFile = (projectId: string, fileId: string) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== projectId) return p;
        return {
          ...p,
          files: p.files.filter((f) => f.id !== fileId),
        };
      })
    );
  };

  // LEADS & ONBOARDING
  const addLead = (leadData: Omit<Lead, 'id' | 'createdAt'>) => {
    const newLead: Lead = {
      ...leadData,
      id: `lead-${Date.now().toString(36)}`,
      createdAt: 'Today',
      isDemo: false,
    };
    setLeads((prev) => [newLead, ...prev]);
  };

  const updateLead = (id: string, updates: Partial<Lead>) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, ...updates } : l)));
  };

  const deleteLead = (id: string) => {
    setLeads((prev) => prev.filter((l) => l.id !== id));
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
      totalValue: lead.proposal?.totalAmount || lead.budget,
      status: 'active',
      isDemo: false,
    };

    const newProject: Project = {
      id: projectId,
      clientId,
      clientName: lead.name,
      companyName: lead.company,
      title: lead.proposal?.title || `${lead.company} Digital Platform`,
      service: lead.service,
      progress: 20,
      status: 'in_progress',
      startDate: 'Today',
      targetDeliveryDate: lead.proposal ? `In ${lead.proposal.timelineWeeks} Weeks` : 'In 4 Weeks',
      budget: lead.proposal?.totalAmount || lead.budget,
      requirementsSummary: lead.notes || `Contracted via lead conversion: ${lead.service}`,
      teamMembers: [{ name: 'Tirth Rathod', role: 'Lead Architect' }],
      milestones: [
        { id: 'm-1', name: 'Scope Confirmation & Requirements', status: 'completed', progress: 100, completedAt: 'Today' },
        { id: 'm-2', name: 'UI/UX Interactive System', status: 'in_progress', progress: 20, dueDate: 'Sprint 1' },
        { id: 'm-3', name: 'Core Engine & Architecture', status: 'pending', progress: 0, dueDate: 'Sprint 2' },
        { id: 'm-4', name: 'QA Testing & Client Review', status: 'pending', progress: 0, dueDate: 'Sprint 3' },
        { id: 'm-5', name: 'Production Launch & Go-Live', status: 'pending', progress: 0, dueDate: 'Sprint 4' },
      ],
      updates: [
        {
          id: `up-${Date.now()}`,
          projectId,
          date: 'Just now',
          title: 'Proposal Approved & Project Initiated',
          content: `Lead converted to active client. Project workspace provisioned.`,
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
          title: 'Contract Approved & Client Onboarded',
          description: `Converted from lead with scope value ${newClient.totalValue}.`,
          type: 'onboarding',
        },
      ],
      isDemo: false,
    };

    setClients((prev) => [newClient, ...prev]);
    setProjects((prev) => [newProject, ...prev]);
    setLeads((prev) => prev.map((l) => (l.id === leadId ? { ...l, status: 'won' } : l)));
    setSelectedClientId(clientId);

    return { client: newClient, project: newProject };
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
      totalValue: data.budget,
      status: 'active',
      industry: data.industry,
      website: data.website,
      onboardingData: data,
      isDemo: false,
    };

    const newProject: Project = {
      id: projectId,
      clientId,
      clientName: data.clientName,
      companyName: data.companyName,
      title: data.projectTitle || `${data.companyName} Core System`,
      service: data.service || 'Web Development',
      progress: 20,
      status: 'in_progress',
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
              projectId,
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
          title: 'Structured Onboarding Intake Completed',
          description: `Deliverables: ${data.deliverables.join(', ')}`,
          type: 'onboarding',
        },
      ],
      isDemo: false,
    };

    setClients((prev) => [newClient, ...prev]);
    setProjects((prev) => [newProject, ...prev]);
    setSelectedClientId(clientId);

    return { client: newClient, project: newProject };
  };

  // RESET & BACKUP
  const resetToDefaults = () => {
    localStorage.removeItem(`${STORAGE_KEY}_clients`);
    localStorage.removeItem(`${STORAGE_KEY}_projects`);
    localStorage.removeItem(`${STORAGE_KEY}_leads`);
    localStorage.removeItem(`${STORAGE_KEY}_tasks`);
    localStorage.removeItem(`${STORAGE_KEY}_team`);

    setClients(INITIAL_CLIENTS);
    setProjects(INITIAL_PROJECTS);
    setLeads(INITIAL_LEADS);
    setTasks(INITIAL_TASKS);
    setTeamMembers(INITIAL_TEAM_MEMBERS);
    setSelectedClientId('c-shree');
  };

  const exportDatabaseJSON = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      platform: 'Optenary Digital Operations Platform',
      version: '2.0.0',
      clients,
      projects,
      leads,
      tasks,
      teamMembers,
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `optenary_operations_backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // AI OPERATIONS COPILOT
  const aiAnalyzeRequirements = async (rawText: string) => {
    await new Promise((r) => setTimeout(r, 600));

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
    await new Promise((r) => setTimeout(r, 600));
    const proj = projects.find((p) => p.id === projectId) || projects[0];

    const completed = proj.milestones.filter((m) => m.status === 'completed').map((m) => m.name);
    const active = proj.milestones.find((m) => m.status === 'in_progress')?.name || 'Sprint Execution';

    return {
      headline: `${proj.companyName} is pacing on schedule at ${proj.progress}% completion.`,
      completedHighlights: completed.length ? completed : ['Requirements approved & repository initialized'],
      activeFocus: `Engineering team is actively implementing: ${active}. Target delivery is ${proj.targetDeliveryDate}.`,
      risksAndBlockers: 'Zero critical blockers. Edge cache TTL and mobile layout responsiveness verified in staging.',
      nextMilestoneDeadline: proj.targetDeliveryDate,
    };
  };

  const aiDraftClientUpdate = async (rawNotes: string) => {
    await new Promise((r) => setTimeout(r, 500));

    return {
      title: 'Sprint Milestone Reached & Staging Deployed',
      formattedMessage: `Hello Team,\n\nWe are pleased to share our latest engineering update:\n\n• ${rawNotes.trim()}\n\nAll automated end-to-end checks have completed successfully. You can preview these updates directly on the staging environment. Our team remains focused on the next milestone deliverable.\n\nWarm regards,\nOptenary Engineering Team`,
    };
  };

  return (
    <PlatformContext.Provider
      value={{
        role,
        currentClientId,
        setCurrentClientId: setSelectedClientId,
        clients,
        projects,
        leads,
        tasks,
        teamMembers,
        addClient,
        updateClient,
        deleteClient,
        addProject,
        updateProject,
        deleteProject,
        updateMilestone,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskStatus,
        addTeamMember,
        updateTeamMember,
        deleteTeamMember,
        addProjectUpdate,
        addProjectFile,
        deleteProjectFile,
        submitOnboarding,
        addLead,
        updateLead,
        deleteLead,
        updateLeadStatus,
        createProposal,
        convertLeadToClient,
        resetToDefaults,
        exportDatabaseJSON,
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
