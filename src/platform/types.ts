// Optenary Operations Platform Data Types

export type UserRole = 'admin' | 'client';

export type ProjectStatus = 'onboarding' | 'active' | 'in_review' | 'completed' | 'delayed';
export type MilestoneStatus = 'completed' | 'in_progress' | 'pending';
export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'proposal_sent' | 'won' | 'lost';

export interface Milestone {
  id: string;
  name: string;
  status: MilestoneStatus;
  progress: number; // 0 - 100
  dueDate?: string;
  completedAt?: string;
  deliverables?: string[];
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
  name: string;
  category: 'requirements' | 'brand_assets' | 'designs' | 'documents' | 'deliverables';
  size: string;
  uploadedAt: string;
  url: string;
  type: string;
}

export interface ActivityEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  type: 'status' | 'milestone' | 'file' | 'note' | 'onboarding';
}

export interface Project {
  id: string;
  clientId: string;
  clientName: string;
  companyName: string;
  title: string;
  service: string;
  progress: number; // 0 - 100
  status: ProjectStatus;
  startDate: string;
  targetDeliveryDate: string;
  budget: string;
  teamMembers: Array<{ name: string; role: string; email?: string }>;
  milestones: Milestone[];
  updates: ProjectUpdate[];
  files: FileItem[];
  timeline: ActivityEvent[];
  requirementsSummary: string;
  liveUrl?: string;
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
  onboardingData?: OnboardingData;
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
  status: LeadStatus;
  notes: string;
  createdAt: string;
  proposal?: Proposal;
}
