// Optenary Operations Platform Data Types & Interfaces

export type UserRole = 'admin' | 'team' | 'client';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  clientId?: string; // Set when role === 'client'
  companyName?: string;
  avatar?: string;
}

export type ProjectStatus = 'planning' | 'in_progress' | 'on_hold' | 'review' | 'completed';
export type MilestoneStatus = 'completed' | 'in_progress' | 'pending';
export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'proposal_sent' | 'negotiation' | 'won' | 'lost';
export type TaskStatus = 'todo' | 'in_progress' | 'review' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Milestone {
  id: string;
  name: string;
  status: MilestoneStatus;
  progress: number; // 0 - 100
  dueDate?: string;
  completedAt?: string;
  deliverables?: string[];
}

export interface Task {
  id: string;
  projectId: string;
  milestoneId?: string;
  assignedTo?: string; // TeamMember id
  assignedToName?: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string;
  estimatedHours?: number;
  isCompleted: boolean;
  createdAt: string;
  isDemo?: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  roleTitle: string;
  department: string;
  activeTasksCount: number;
  avatarUrl?: string;
}

export interface ProjectUpdate {
  id: string;
  projectId: string;
  date: string;
  title: string;
  content: string;
  author: string;
  isPublicToClient: boolean;
  tag?: string;
}

export interface FileItem {
  id: string;
  projectId: string;
  name: string;
  category: 'requirements' | 'brand_assets' | 'designs' | 'documents' | 'deliverables';
  size: string;
  uploadedAt: string;
  url: string;
  type: string;
  uploadedBy?: string;
}

export interface ActivityEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  type: 'status' | 'milestone' | 'file' | 'note' | 'onboarding' | 'task';
}

export interface Project {
  id: string;
  clientId: string;
  clientName: string;
  companyName: string;
  title: string;
  service: string;
  description?: string;
  progress: number; // 0 - 100 (automatically computed from milestones/tasks)
  status: ProjectStatus;
  startDate: string;
  targetDeliveryDate: string;
  budget: string;
  teamMembers: Array<{ id?: string; name: string; role: string; email?: string }>;
  milestones: Milestone[];
  updates: ProjectUpdate[];
  files: FileItem[];
  timeline: ActivityEvent[];
  requirementsSummary: string;
  liveUrl?: string;
  repositoryUrl?: string;
  isDemo?: boolean;
}

export interface OnboardingData {
  clientName: string;
  companyName: string;
  email: string;
  phone: string;
  industry: string;
  website?: string;
  projectTitle: string;
  service: string;
  budget: string;
  requirements: string;
  objectives: string;
  deliverables: string[];
  referenceLinks?: string;
  brandAssetsLink?: string;
  additionalNotes?: string;
  submittedAt: string;
}

export interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  joinedDate: string;
  activeProjectsCount: number;
  totalValue: string;
  status: 'active' | 'onboarding' | 'completed';
  industry?: string;
  website?: string;
  notes?: string;
  onboardingData?: OnboardingData;
  isDemo?: boolean;
}

export interface Proposal {
  id: string;
  title: string;
  totalAmount: string;
  scopeItems: string[];
  timelineWeeks: number;
  status: 'draft' | 'sent' | 'accepted' | 'declined';
  validUntil: string;
}

export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  source: string;
  status: LeadStatus;
  notes: string;
  followUpDate?: string;
  createdAt: string;
  proposal?: Proposal;
  isDemo?: boolean;
}
