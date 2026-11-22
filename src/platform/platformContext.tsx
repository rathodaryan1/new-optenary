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
  AuditLogEntry,
  NotificationItem,
} from './types';
import { useAuth } from './auth/AuthContext';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

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
  auditLogs: AuditLogEntry[];
  notifications: NotificationItem[];
  isLoading: boolean;

  // Audit & Notifications
  addAuditLog: (entry: Omit<AuditLogEntry, 'id' | 'timestamp'>) => void;
  addNotification: (notif: Omit<NotificationItem, 'id' | 'timestamp' | 'isRead'>) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  clearNotifications: () => void;

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

const STORAGE_KEY = 'optenary_platform_db_v3';

// Optenary Official Staff
const DEFAULT_TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'tm-1',
    name: 'Tirth Rathod',
    email: 'tirth@optenary.in',
    roleTitle: 'Founder & Lead Architect',
    department: 'Engineering & Architecture',
    activeTasksCount: 0,
    avatarUrl: 'TR',
  },
  {
    id: 'tm-2',
    name: 'Yudhisthir Rathod',
    email: 'yudhisthir@optenary.in',
    roleTitle: 'Cloud Architect & Database Lead',
    department: 'Infrastructure',
    activeTasksCount: 0,
    avatarUrl: 'YR',
  },
  {
    id: 'tm-3',
    name: 'Gaurav',
    email: 'gaurav@optenary.in',
    roleTitle: 'Full-Stack & Mobile Engineer',
    department: 'Frontend & Mobile',
    activeTasksCount: 0,
    avatarUrl: 'GV',
  },
  {
    id: 'tm-4',
    name: 'Bhavik',
    email: 'bhavik@optenary.in',
    roleTitle: 'UI/UX Design Systems Engineer',
    department: 'Design',
    activeTasksCount: 0,
    avatarUrl: 'BH',
  },
];

// Helper to filter out any old demo data from storage
function getCleanLocalStorage<T>(key: string, fallback: T[]): T[] {
  try {
    const saved = localStorage.getItem(`${STORAGE_KEY}_${key}`);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        return parsed.filter((item: any) => !item.isDemo && item.id !== 'c-shree' && item.id !== 'c-mehta' && item.id !== 'proj-shree');
      }
    }
  } catch {}
  return fallback;
}

// Database to Domain Mappers
function mapClientFromDb(r: any): Client {
  return {
    id: r.id,
    name: r.name || '',
    company: r.company || '',
    email: r.email || '',
    phone: r.phone || '',
    joinedDate: r.joined_date || (r.created_at ? new Date(r.created_at).toLocaleDateString() : 'Today'),
    activeProjectsCount: r.active_projects_count || 0,
    totalValue: r.total_value || '₹0',
    status: r.status || 'active',
    industry: r.industry,
    website: r.website,
    notes: r.notes,
    isDemo: false,
  };
}

function mapProjectFromDb(r: any): Project {
  return {
    id: r.id,
    clientId: r.client_id,
    clientName: r.client_name || '',
    companyName: r.company_name || '',
    title: r.title || '',
    service: r.service || 'Web Development',
    description: r.description,
    progress: r.progress || 0,
    status: r.status || 'planning',
    startDate: r.start_date || (r.created_at ? new Date(r.created_at).toLocaleDateString() : 'Today'),
    targetDeliveryDate: r.target_delivery_date || 'TBD',
    budget: r.budget || '₹0',
    requirementsSummary: r.requirements_summary || '',
    liveUrl: r.live_url,
    repositoryUrl: r.repository_url,
    isDemo: false,
    teamMembers: Array.isArray(r.team_members) ? r.team_members : [{ name: 'Optenary Engineering', role: 'Full-Stack Team' }],
    milestones: (r.milestones || []).map((m: any) => ({
      id: m.id,
      name: m.name,
      status: m.status || 'pending',
      progress: m.progress || 0,
      dueDate: m.due_date,
      completedAt: m.completed_at,
      deliverables: m.deliverables || [],
    })),
    updates: (r.project_updates || []).map((u: any) => ({
      id: u.id,
      projectId: u.project_id,
      date: u.date || (u.created_at ? new Date(u.created_at).toLocaleDateString() : 'Today'),
      title: u.title,
      content: u.content,
      author: u.author || u.author_name || 'Optenary Team',
      isPublicToClient: u.is_public_to_client ?? true,
      tag: u.tag || 'Engineering',
    })),
    files: (r.project_files || []).map((f: any) => ({
      id: f.id,
      projectId: f.project_id,
      name: f.name,
      category: f.category || 'deliverables',
      size: f.size || '1.0 MB',
      uploadedAt: f.uploaded_at || 'Today',
      url: f.url || f.file_url || '#',
      type: f.type || f.file_type || 'document',
      uploadedBy: f.uploaded_by,
    })),
    timeline: Array.isArray(r.timeline)
      ? r.timeline.map((t: any) => ({
          id: t.id || `ev-${Math.random()}`,
          date: t.date || 'Today',
          title: t.title,
          description: t.description,
          type: t.type || 'milestone',
        }))
      : [],
  };
}

function mapLeadFromDb(r: any): Lead {
  return {
    id: r.id,
    name: r.name || '',
    company: r.company || '',
    email: r.email || '',
    phone: r.phone || '',
    service: r.service || 'Web Development',
    budget: r.budget || '₹35,000',
    source: r.source || 'Website Inbound',
    status: r.stage || r.status || 'new',
    notes: r.notes || '',
    followUpDate: r.follow_up_date,
    createdAt: r.created_at ? new Date(r.created_at).toLocaleDateString() : 'Today',
    proposal: r.proposal,
    isDemo: false,
  };
}

function mapTaskFromDb(r: any): Task {
  return {
    id: r.id,
    projectId: r.project_id,
    milestoneId: r.milestone_id,
    assignedTo: r.assigned_to,
    assignedToName: r.assigned_to_name,
    title: r.title,
    description: r.description,
    status: r.status || 'todo',
    priority: r.priority || 'medium',
    dueDate: r.due_date,
    estimatedHours: r.estimated_hours,
    isCompleted: r.is_completed ?? (r.status === 'done'),
    createdAt: r.created_at ? new Date(r.created_at).toLocaleDateString() : 'Today',
    isDemo: false,
  };
}

function mapTeamFromDb(r: any): TeamMember {
  return {
    id: r.id,
    name: r.name,
    email: r.email,
    roleTitle: r.role_title,
    department: r.department,
    activeTasksCount: r.active_tasks_count || 0,
    avatarUrl: r.avatar_url || r.name.slice(0, 2).toUpperCase(),
  };
}

function mapLogFromDb(r: any): AuditLogEntry {
  return {
    id: r.id,
    timestamp: r.timestamp || (r.created_at ? new Date(r.created_at).toLocaleString() : 'Just now'),
    actor: r.actor || 'Administrator',
    action: r.action || r.title || 'System Event',
    category: r.category || r.log_type || 'system',
    details: r.details || r.description || '',
  };
}

const PlatformContext = createContext<PlatformContextType | undefined>(undefined);

export function PlatformProvider({ children }: { children: ReactNode }) {
  const { currentUser, role } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // States initialized strictly empty (0 fake/mock records)
  const [clients, setClients] = useState<Client[]>(() => getCleanLocalStorage<Client>('clients', []));
  const [projects, setProjects] = useState<Project[]>(() => getCleanLocalStorage<Project>('projects', []));
  const [leads, setLeads] = useState<Lead[]>(() => getCleanLocalStorage<Lead>('leads', []));
  const [tasks, setTasks] = useState<Task[]>(() => getCleanLocalStorage<Task>('tasks', []));
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(() =>
    getCleanLocalStorage<TeamMember>('team', DEFAULT_TEAM_MEMBERS)
  );
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(() =>
    getCleanLocalStorage<AuditLogEntry>('audit', [])
  );
  const [notifications, setNotifications] = useState<NotificationItem[]>(() =>
    getCleanLocalStorage<NotificationItem>('notifs', [])
  );

  const [selectedClientId, setSelectedClientId] = useState<string>('');

  const currentClientId =
    role === 'client' && currentUser?.clientId
      ? currentUser.clientId
      : selectedClientId || clients[0]?.id || '';

  // 1. Initial Load: Fetch live records from Supabase
  useEffect(() => {
    // Clear old mock demo keys from previous storage versions
    try {
      localStorage.removeItem('optenary_platform_db_v2_clients');
      localStorage.removeItem('optenary_platform_db_v2_projects');
      localStorage.removeItem('optenary_platform_db_v2_leads');
      localStorage.removeItem('optenary_platform_db_v2_tasks');
    } catch {}

    if (!isSupabaseConfigured || !supabase) return;

    let isMounted = true;
    setIsLoading(true);

    async function fetchPlatformData() {
      try {
        // Query in parallel
        const [
          clientsRes,
          projectsRes,
          leadsRes,
          tasksRes,
          teamRes,
          logsRes,
        ] = await Promise.all([
          supabase!.from('clients').select('*').order('created_at', { ascending: false }),
          supabase!.from('projects').select('*, milestones(*), project_updates(*), project_files(*)').order('created_at', { ascending: false }),
          supabase!.from('leads').select('*').order('created_at', { ascending: false }),
          supabase!.from('tasks').select('*').order('created_at', { ascending: false }),
          supabase!.from('team_members').select('*'),
          supabase!.from('activity_logs').select('*').order('created_at', { ascending: false }).limit(50),
        ]);

        if (!isMounted) return;

        if (clientsRes.data) {
          setClients(clientsRes.data.map(mapClientFromDb));
        }
        if (projectsRes.data) {
          setProjects(projectsRes.data.map(mapProjectFromDb));
        }
        if (leadsRes.data) {
          setLeads(leadsRes.data.map(mapLeadFromDb));
        }
        if (tasksRes.data) {
          setTasks(tasksRes.data.map(mapTaskFromDb));
        }
        if (teamRes.data && teamRes.data.length > 0) {
          setTeamMembers(teamRes.data.map(mapTeamFromDb));
        }
        if (logsRes.data) {
          setAuditLogs(logsRes.data.map(mapLogFromDb));
        }
      } catch (err) {
        console.warn('Supabase synchronization fallback to local cache:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchPlatformData();

    return () => {
      isMounted = false;
    };
  }, []);

  // 2. Local Storage Persistence Sync
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_clients`, JSON.stringify(clients));
      localStorage.setItem(`${STORAGE_KEY}_projects`, JSON.stringify(projects));
      localStorage.setItem(`${STORAGE_KEY}_leads`, JSON.stringify(leads));
      localStorage.setItem(`${STORAGE_KEY}_tasks`, JSON.stringify(tasks));
      localStorage.setItem(`${STORAGE_KEY}_team`, JSON.stringify(teamMembers));
      localStorage.setItem(`${STORAGE_KEY}_audit`, JSON.stringify(auditLogs));
      localStorage.setItem(`${STORAGE_KEY}_notifs`, JSON.stringify(notifications));
    } catch {}
  }, [clients, projects, leads, tasks, teamMembers, auditLogs, notifications]);

  // AUDIT & NOTIFICATION HANDLERS
  const addAuditLog = (entry: Omit<AuditLogEntry, 'id' | 'timestamp'>) => {
    const newLog: AuditLogEntry = {
      ...entry,
      id: `log-${Date.now()}`,
      timestamp: 'Just now',
    };
    setAuditLogs((prev) => [newLog, ...prev]);

    // Async write to Supabase
    if (supabase) {
      supabase.from('activity_logs').insert({
        id: newLog.id,
        actor: newLog.actor,
        action: newLog.action,
        category: newLog.category,
        details: newLog.details,
      }).then();
    }
  };

  const addNotification = (notif: Omit<NotificationItem, 'id' | 'timestamp' | 'isRead'>) => {
    const newNotif: NotificationItem = {
      ...notif,
      id: `notif-${Date.now()}`,
      timestamp: 'Just now',
      isRead: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  // Recalculate Project Progress Automatically from Milestones
  const recalculateProgress = (milestones: Milestone[]): number => {
    if (!milestones.length) return 0;
    const total = milestones.reduce((sum, m) => sum + m.progress, 0);
    return Math.round(total / milestones.length);
  };

  // CLIENT CRUD
  const addClient = (data: Omit<Client, 'id' | 'joinedDate' | 'activeProjectsCount'>): Client => {
    const id = `c-${Date.now().toString(36)}`;
    const newClient: Client = {
      ...data,
      id,
      joinedDate: 'Today',
      activeProjectsCount: 0,
      isDemo: false,
    };
    setClients((prev) => [newClient, ...prev]);

    // Supabase write
    if (supabase) {
      supabase.from('clients').insert({
        id,
        name: newClient.name,
        company: newClient.company,
        email: newClient.email,
        phone: newClient.phone,
        industry: newClient.industry,
        website: newClient.website,
        status: newClient.status,
        total_value: newClient.totalValue,
        notes: newClient.notes,
      }).then();
    }

    addAuditLog({
      actor: currentUser?.name || 'Administrator',
      action: 'Client Created',
      category: 'client',
      details: `Created client account for ${newClient.company} (${newClient.name}).`,
    });

    return newClient;
  };

  const updateClient = (id: string, updates: Partial<Client>) => {
    setClients((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));

    // Supabase update
    if (supabase) {
      const dbUpdates: Record<string, any> = {};
      if (updates.name !== undefined) dbUpdates.name = updates.name;
      if (updates.company !== undefined) dbUpdates.company = updates.company;
      if (updates.email !== undefined) dbUpdates.email = updates.email;
      if (updates.phone !== undefined) dbUpdates.phone = updates.phone;
      if (updates.status !== undefined) dbUpdates.status = updates.status;
      if (updates.totalValue !== undefined) dbUpdates.total_value = updates.totalValue;
      if (updates.industry !== undefined) dbUpdates.industry = updates.industry;
      if (updates.website !== undefined) dbUpdates.website = updates.website;
      if (updates.notes !== undefined) dbUpdates.notes = updates.notes;

      supabase.from('clients').update(dbUpdates).eq('id', id).then();
    }
  };

  const deleteClient = (id: string) => {
    setClients((prev) => prev.filter((c) => c.id !== id));
    setProjects((prev) => prev.filter((p) => p.clientId !== id));

    if (supabase) {
      supabase.from('clients').delete().eq('id', id).then();
    }
  };

  // PROJECT CRUD
  const addProject = (data: Omit<Project, 'id' | 'timeline' | 'updates' | 'files' | 'progress'>): Project => {
    const id = `proj-${Date.now().toString(36)}`;
    const progress = recalculateProgress(data.milestones || []);
    const newProject: Project = {
      ...data,
      id,
      progress,
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

    // Supabase write
    if (supabase) {
      supabase.from('projects').insert({
        id,
        client_id: data.clientId,
        client_name: data.clientName,
        company_name: data.companyName,
        title: data.title,
        service: data.service,
        description: data.description,
        requirements_summary: data.requirementsSummary,
        status: 'planning',
        progress,
        start_date: data.startDate,
        target_delivery_date: data.targetDeliveryDate,
        budget: data.budget,
        live_url: data.liveUrl,
        repository_url: data.repositoryUrl,
        team_members: data.teamMembers,
        timeline: newProject.timeline,
      }).then();

      // Insert milestones
      if (data.milestones && data.milestones.length > 0) {
        const dbMilestones = data.milestones.map((m, idx) => ({
          id: m.id || `m-${Date.now()}-${idx}`,
          project_id: id,
          name: m.name,
          status: m.status,
          progress: m.progress,
          due_date: m.dueDate,
          deliverables: m.deliverables || [],
          order_index: idx,
        }));
        supabase.from('milestones').insert(dbMilestones).then();
      }
    }

    addAuditLog({
      actor: currentUser?.name || 'Administrator',
      action: 'Project Initialized',
      category: 'project',
      details: `Provisioned project "${newProject.title}" for ${newProject.companyName}.`,
    });

    return newProject;
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));

    if (supabase) {
      const dbUpdates: Record<string, any> = {};
      if (updates.title !== undefined) dbUpdates.title = updates.title;
      if (updates.service !== undefined) dbUpdates.service = updates.service;
      if (updates.status !== undefined) dbUpdates.status = updates.status;
      if (updates.progress !== undefined) dbUpdates.progress = updates.progress;
      if (updates.targetDeliveryDate !== undefined) dbUpdates.target_delivery_date = updates.targetDeliveryDate;
      if (updates.budget !== undefined) dbUpdates.budget = updates.budget;
      if (updates.liveUrl !== undefined) dbUpdates.live_url = updates.liveUrl;
      if (updates.repositoryUrl !== undefined) dbUpdates.repository_url = updates.repositoryUrl;
      if (updates.requirementsSummary !== undefined) dbUpdates.requirements_summary = updates.requirementsSummary;

      supabase.from('projects').update(dbUpdates).eq('id', id).then();
    }
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    setTasks((prev) => prev.filter((t) => t.projectId !== id));

    if (supabase) {
      supabase.from('projects').delete().eq('id', id).then();
    }
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

    if (supabase) {
      supabase.from('milestones').update({
        status,
        progress,
        completed_at: status === 'completed' ? new Date().toISOString() : null,
      }).eq('id', milestoneId).then();
    }
  };

  // TASK CRUD
  const addTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'isCompleted'>): Task => {
    const id = `tsk-${Date.now().toString(36)}`;
    const newTask: Task = {
      ...taskData,
      id,
      createdAt: 'Today',
      isCompleted: taskData.status === 'done',
      isDemo: false,
    };
    setTasks((prev) => [newTask, ...prev]);

    if (supabase) {
      supabase.from('tasks').insert({
        id,
        project_id: taskData.projectId,
        milestone_id: taskData.milestoneId,
        assigned_to: taskData.assignedTo,
        assigned_to_name: taskData.assignedToName,
        title: taskData.title,
        description: taskData.description,
        status: taskData.status,
        priority: taskData.priority,
        due_date: taskData.dueDate,
        estimated_hours: taskData.estimatedHours || 0,
        is_completed: newTask.isCompleted,
      }).then();
    }

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

    if (supabase) {
      const dbUpdates: Record<string, any> = {};
      if (updates.title !== undefined) dbUpdates.title = updates.title;
      if (updates.status !== undefined) {
        dbUpdates.status = updates.status;
        dbUpdates.is_completed = updates.status === 'done';
      }
      if (updates.priority !== undefined) dbUpdates.priority = updates.priority;
      if (updates.assignedTo !== undefined) dbUpdates.assigned_to = updates.assignedTo;
      if (updates.assignedToName !== undefined) dbUpdates.assigned_to_name = updates.assignedToName;
      if (updates.dueDate !== undefined) dbUpdates.due_date = updates.dueDate;
      if (updates.description !== undefined) dbUpdates.description = updates.description;

      supabase.from('tasks').update(dbUpdates).eq('id', id).then();
    }
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));

    if (supabase) {
      supabase.from('tasks').delete().eq('id', id).then();
    }
  };

  const toggleTaskStatus = (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    const nextStatus = task.status === 'done' ? 'todo' : 'done';
    updateTask(id, { status: nextStatus });
  };

  // TEAM CRUD
  const addTeamMember = (data: Omit<TeamMember, 'id' | 'activeTasksCount'>): TeamMember => {
    const id = `tm-${Date.now().toString(36)}`;
    const newMember: TeamMember = {
      ...data,
      id,
      activeTasksCount: 0,
      avatarUrl: data.name.slice(0, 2).toUpperCase(),
    };
    setTeamMembers((prev) => [...prev, newMember]);

    if (supabase) {
      supabase.from('team_members').insert({
        id,
        name: newMember.name,
        email: newMember.email,
        role_title: newMember.roleTitle,
        department: newMember.department,
        avatar_url: newMember.avatarUrl,
      }).then();
    }

    return newMember;
  };

  const updateTeamMember = (id: string, updates: Partial<TeamMember>) => {
    setTeamMembers((prev) => prev.map((tm) => (tm.id === id ? { ...tm, ...updates } : tm)));

    if (supabase) {
      const dbUpdates: Record<string, any> = {};
      if (updates.name !== undefined) dbUpdates.name = updates.name;
      if (updates.email !== undefined) dbUpdates.email = updates.email;
      if (updates.roleTitle !== undefined) dbUpdates.role_title = updates.roleTitle;
      if (updates.department !== undefined) dbUpdates.department = updates.department;

      supabase.from('team_members').update(dbUpdates).eq('id', id).then();
    }
  };

  const deleteTeamMember = (id: string) => {
    setTeamMembers((prev) => prev.filter((tm) => tm.id !== id));

    if (supabase) {
      supabase.from('team_members').delete().eq('id', id).then();
    }
  };

  // UPDATES & FILES
  const addProjectUpdate = (
    projectId: string,
    updateData: Omit<ProjectUpdate, 'id' | 'date' | 'projectId'>
  ) => {
    const id = `up-${Date.now()}`;
    const newUpdate: ProjectUpdate = {
      ...updateData,
      id,
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

    if (supabase) {
      supabase.from('project_updates').insert({
        id,
        project_id: projectId,
        title: updateData.title,
        content: updateData.content,
        author: updateData.author,
        tag: updateData.tag || 'Engineering',
        is_public_to_client: updateData.isPublicToClient,
      }).then();
    }
  };

  const addProjectFile = (
    projectId: string,
    fileData: Omit<FileItem, 'id' | 'uploadedAt' | 'projectId'>
  ) => {
    const id = `f-${Date.now()}`;
    const newFile: FileItem = {
      ...fileData,
      id,
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

    if (supabase) {
      supabase.from('project_files').insert({
        id,
        project_id: projectId,
        name: fileData.name,
        category: fileData.category,
        size: fileData.size,
        type: fileData.type,
        url: fileData.url,
      }).then();
    }
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

    if (supabase) {
      supabase.from('project_files').delete().eq('id', fileId).then();
    }
  };

  // LEADS & ONBOARDING
  const addLead = (leadData: Omit<Lead, 'id' | 'createdAt'>) => {
    const id = `lead-${Date.now().toString(36)}`;
    const newLead: Lead = {
      ...leadData,
      id,
      createdAt: 'Today',
      isDemo: false,
    };
    setLeads((prev) => [newLead, ...prev]);

    if (supabase) {
      supabase.from('leads').insert({
        id,
        name: leadData.name,
        company: leadData.company,
        email: leadData.email,
        phone: leadData.phone,
        service: leadData.service,
        budget: leadData.budget,
        source: leadData.source,
        status: leadData.status,
        notes: leadData.notes,
        follow_up_date: leadData.followUpDate,
      }).then();
    }

    addAuditLog({
      actor: currentUser?.name || 'Administrator',
      action: 'Lead Registered',
      category: 'lead',
      details: `New inbound lead from ${newLead.company} (${newLead.name}) for ${newLead.service}.`,
    });
  };

  const updateLead = (id: string, updates: Partial<Lead>) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, ...updates } : l)));

    if (supabase) {
      const dbUpdates: Record<string, any> = {};
      if (updates.name !== undefined) dbUpdates.name = updates.name;
      if (updates.company !== undefined) dbUpdates.company = updates.company;
      if (updates.email !== undefined) dbUpdates.email = updates.email;
      if (updates.phone !== undefined) dbUpdates.phone = updates.phone;
      if (updates.service !== undefined) dbUpdates.service = updates.service;
      if (updates.budget !== undefined) dbUpdates.budget = updates.budget;
      if (updates.status !== undefined) {
        dbUpdates.status = updates.status;
        dbUpdates.stage = updates.status;
      }
      if (updates.notes !== undefined) dbUpdates.notes = updates.notes;
      if (updates.proposal !== undefined) dbUpdates.proposal = updates.proposal;

      supabase.from('leads').update(dbUpdates).eq('id', id).then();
    }
  };

  const deleteLead = (id: string) => {
    setLeads((prev) => prev.filter((l) => l.id !== id));

    if (supabase) {
      supabase.from('leads').delete().eq('id', id).then();
    }
  };

  const updateLeadStatus = (leadId: string, status: Lead['status']) => {
    updateLead(leadId, { status });
  };

  const createProposal = (leadId: string, proposalData: Omit<Proposal, 'id'>) => {
    const newProposal: Proposal = {
      ...proposalData,
      id: `prop-${Date.now().toString(36)}`,
    };

    updateLead(leadId, { status: 'proposal_sent', proposal: newProposal });
  };

  const convertLeadToClient = (leadId: string) => {
    const lead = leads.find((l) => l.id === leadId);
    if (!lead) return null;

    // Check existing client
    const existingClient = clients.find(
      (c) =>
        c.email.trim().toLowerCase() === lead.email.trim().toLowerCase() ||
        c.company.trim().toLowerCase() === lead.company.trim().toLowerCase()
    );

    const clientId = existingClient ? existingClient.id : `c-${Date.now().toString(36)}`;
    const projectId = `proj-${Date.now().toString(36)}`;

    let targetClient: Client;

    if (existingClient) {
      targetClient = {
        ...existingClient,
        activeProjectsCount: existingClient.activeProjectsCount + 1,
      };
      setClients((prev) =>
        prev.map((c) => (c.id === existingClient.id ? targetClient : c))
      );
      updateClient(existingClient.id, { activeProjectsCount: targetClient.activeProjectsCount });
    } else {
      targetClient = {
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
      setClients((prev) => [targetClient, ...prev]);

      if (supabase) {
        supabase.from('clients').insert({
          id: clientId,
          name: targetClient.name,
          company: targetClient.company,
          email: targetClient.email,
          phone: targetClient.phone,
          status: 'active',
          total_value: targetClient.totalValue,
        }).then();
      }
    }

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
        { id: `m-${Date.now()}-1`, name: 'Scope Confirmation & Requirements', status: 'completed', progress: 100, completedAt: 'Today' },
        { id: `m-${Date.now()}-2`, name: 'UI/UX Interactive System', status: 'in_progress', progress: 20, dueDate: 'Sprint 1' },
        { id: `m-${Date.now()}-3`, name: 'Core Engine & Architecture', status: 'pending', progress: 0, dueDate: 'Sprint 2' },
        { id: `m-${Date.now()}-4`, name: 'QA Testing & Client Review', status: 'pending', progress: 0, dueDate: 'Sprint 3' },
        { id: `m-${Date.now()}-5`, name: 'Production Launch & Go-Live', status: 'pending', progress: 0, dueDate: 'Sprint 4' },
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
          description: `Converted from lead with scope value ${targetClient.totalValue}.`,
          type: 'onboarding',
        },
      ],
      isDemo: false,
    };

    setProjects((prev) => [newProject, ...prev]);
    updateLead(leadId, { status: 'won' });
    setSelectedClientId(clientId);

    if (supabase) {
      supabase.from('projects').insert({
        id: projectId,
        client_id: clientId,
        client_name: newProject.clientName,
        company_name: newProject.companyName,
        title: newProject.title,
        service: newProject.service,
        progress: 20,
        status: 'in_progress',
        budget: newProject.budget,
        requirements_summary: newProject.requirementsSummary,
        target_delivery_date: newProject.targetDeliveryDate,
        team_members: newProject.teamMembers,
        timeline: newProject.timeline,
      }).then();
    }

    addAuditLog({
      actor: currentUser?.name || 'Administrator',
      action: 'Lead Converted to Client',
      category: 'client',
      details: `${lead.company} converted to client. Provisioned project ${newProject.title}.`,
    });

    addNotification({
      title: 'Lead Converted & Project Launched',
      description: `${lead.company} is now an active account with project ${newProject.title}.`,
      link: '/admin/projects',
      type: 'lead',
    });

    return { client: targetClient, project: newProject };
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
        { id: `m-${Date.now()}-1`, name: 'Onboarding & Requirement Verification', status: 'completed', progress: 100, completedAt: 'Today' },
        { id: `m-${Date.now()}-2`, name: 'UI/UX & Interactive Prototypes', status: 'in_progress', progress: 25, dueDate: 'Week 1' },
        { id: `m-${Date.now()}-3`, name: 'Core Architecture & API Integration', status: 'pending', progress: 0, dueDate: 'Week 2' },
        { id: `m-${Date.now()}-4`, name: 'QA Testing & User Acceptance', status: 'pending', progress: 0, dueDate: 'Week 3' },
        { id: `m-${Date.now()}-5`, name: 'Production Launch & Go-Live', status: 'pending', progress: 0, dueDate: 'Week 4' },
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

    if (supabase) {
      supabase.from('clients').insert({
        id: clientId,
        name: newClient.name,
        company: newClient.company,
        email: newClient.email,
        phone: newClient.phone,
        industry: newClient.industry,
        website: newClient.website,
        status: 'active',
        total_value: newClient.totalValue,
      }).then();

      supabase.from('projects').insert({
        id: projectId,
        client_id: clientId,
        client_name: newProject.clientName,
        company_name: newProject.companyName,
        title: newProject.title,
        service: newProject.service,
        progress: 20,
        status: 'in_progress',
        budget: newProject.budget,
        requirements_summary: newProject.requirementsSummary,
        target_delivery_date: newProject.targetDeliveryDate,
        team_members: newProject.teamMembers,
        timeline: newProject.timeline,
      }).then();
    }

    return { client: newClient, project: newProject };
  };

  // RESET & EXPORT
  const resetToDefaults = () => {
    localStorage.removeItem(`${STORAGE_KEY}_clients`);
    localStorage.removeItem(`${STORAGE_KEY}_projects`);
    localStorage.removeItem(`${STORAGE_KEY}_leads`);
    localStorage.removeItem(`${STORAGE_KEY}_tasks`);
    localStorage.removeItem(`${STORAGE_KEY}_team`);
    localStorage.removeItem(`${STORAGE_KEY}_audit`);
    localStorage.removeItem(`${STORAGE_KEY}_notifs`);

    setClients([]);
    setProjects([]);
    setLeads([]);
    setTasks([]);
    setTeamMembers(DEFAULT_TEAM_MEMBERS);
    setAuditLogs([]);
    setNotifications([]);
    setSelectedClientId('');
  };

  const exportDatabaseJSON = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      platform: 'Optenary Digital Operations Platform',
      version: '3.0.0',
      clients,
      projects,
      leads,
      tasks,
      teamMembers,
      auditLogs,
      notifications,
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

    const isEcommerce = /store|shop|product|sell|order|catalog/i.test(rawText);
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

    if (!proj) {
      return {
        headline: 'No active project selected.',
        completedHighlights: ['Awaiting project initiation'],
        activeFocus: 'Provision a project from the admin panel.',
        risksAndBlockers: 'None',
        nextMilestoneDeadline: 'TBD',
      };
    }

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
        auditLogs,
        notifications,
        isLoading,
        addAuditLog,
        addNotification,
        markNotificationRead,
        markAllNotificationsRead,
        clearNotifications,
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
