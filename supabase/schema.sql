-- ==============================================================================
-- OPTENARY DIGITAL OPERATIONS & CLIENT MANAGEMENT PLATFORM
-- PRODUCTION SUPABASE / POSTGRESQL DATABASE SCHEMA & RLS POLICIES
-- ==============================================================================

-- 1. EXTENSIONS & ENUMS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- User Roles
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('admin', 'team', 'client');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Lead Stages
DO $$ BEGIN
    CREATE TYPE lead_stage AS ENUM ('new', 'contacted', 'qualified', 'proposal_sent', 'negotiation', 'won', 'lost');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Project Statuses
DO $$ BEGIN
    CREATE TYPE project_status AS ENUM ('planning', 'in_progress', 'on_hold', 'review', 'completed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Milestone Statuses
DO $$ BEGIN
    CREATE TYPE milestone_status AS ENUM ('pending', 'in_progress', 'completed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Task Statuses & Priorities
DO $$ BEGIN
    CREATE TYPE task_status AS ENUM ('todo', 'in_progress', 'review', 'done');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE task_priority AS ENUM ('low', 'medium', 'high', 'urgent');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- File Categories
DO $$ BEGIN
    CREATE TYPE file_category AS ENUM ('requirements', 'designs', 'deliverables', 'brand_assets', 'contract');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- ==============================================================================
-- 2. CORE TABLES
-- ==============================================================================

-- PROFILES / USERS
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    role user_role NOT NULL DEFAULT 'client',
    company_name TEXT,
    phone TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- CLIENTS
CREATE TABLE IF NOT EXISTS public.clients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    company TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    industry TEXT,
    website TEXT,
    status TEXT NOT NULL DEFAULT 'active',
    total_value TEXT NOT NULL DEFAULT '₹0',
    notes TEXT,
    is_demo BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- PROJECTS
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    service TEXT NOT NULL,
    description TEXT,
    status project_status NOT NULL DEFAULT 'planning',
    progress INTEGER NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
    start_date DATE NOT NULL DEFAULT CURRENT_DATE,
    target_delivery_date TEXT NOT NULL,
    budget TEXT NOT NULL DEFAULT '₹0',
    live_url TEXT,
    repository_url TEXT,
    is_demo BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- TEAM MEMBERS
CREATE TABLE IF NOT EXISTS public.team_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    role_title TEXT NOT NULL,
    department TEXT NOT NULL,
    active_tasks_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- PROJECT MEMBERS ASSIGNMENTS (MANY-TO-MANY)
CREATE TABLE IF NOT EXISTS public.project_members (
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    team_member_id UUID NOT NULL REFERENCES public.team_members(id) ON DELETE CASCADE,
    role TEXT NOT NULL DEFAULT 'Engineer',
    assigned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (project_id, team_member_id)
);

-- MILESTONES
CREATE TABLE IF NOT EXISTS public.milestones (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    status milestone_status NOT NULL DEFAULT 'pending',
    progress INTEGER NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
    due_date TEXT,
    completed_at TIMESTAMPTZ,
    order_index INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- TASKS
CREATE TABLE IF NOT EXISTS public.tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    milestone_id UUID REFERENCES public.milestones(id) ON DELETE SET NULL,
    assigned_to UUID REFERENCES public.team_members(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    description TEXT,
    status task_status NOT NULL DEFAULT 'todo',
    priority task_priority NOT NULL DEFAULT 'medium',
    due_date DATE,
    estimated_hours NUMERIC(5,2),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- LEADS / CRM
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    company TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    service TEXT NOT NULL,
    budget TEXT NOT NULL DEFAULT '₹35,000',
    source TEXT NOT NULL DEFAULT 'Website Inbound',
    stage lead_stage NOT NULL DEFAULT 'new',
    notes TEXT,
    follow_up_date DATE,
    converted_client_id UUID REFERENCES public.clients(id) ON DELETE SET NULL,
    is_demo BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- PROJECT UPDATES / MESSAGES (Public to Client or Internal Note)
CREATE TABLE IF NOT EXISTS public.project_updates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    author_name TEXT NOT NULL,
    tag TEXT DEFAULT 'Engineering',
    is_public_to_client BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- FILES & DELIVERABLES
CREATE TABLE IF NOT EXISTS public.project_files (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    category file_category NOT NULL DEFAULT 'deliverables',
    size TEXT NOT NULL DEFAULT '1.0 MB',
    file_type TEXT NOT NULL DEFAULT 'document',
    file_url TEXT NOT NULL,
    uploaded_by TEXT NOT NULL DEFAULT 'Optenary Team',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ACTIVITY LOGS / AUDIT TRAIL
CREATE TABLE IF NOT EXISTS public.activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
    client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    log_type TEXT NOT NULL DEFAULT 'system',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 3. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- Helper function: Is user admin or team member?
CREATE OR REPLACE FUNCTION public.is_admin_or_team()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role IN ('admin', 'team')
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function: Get client_id bound to current authenticated profile
CREATE OR REPLACE FUNCTION public.get_auth_client_id()
RETURNS UUID AS $$
DECLARE
    cid UUID;
BEGIN
    SELECT id INTO cid FROM public.clients WHERE user_id = auth.uid() LIMIT 1;
    RETURN cid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 1. Profiles Policies
CREATE POLICY "Admins full access to profiles" ON public.profiles
    FOR ALL TO authenticated USING (public.is_admin_or_team());

CREATE POLICY "Users read their own profile" ON public.profiles
    FOR SELECT TO authenticated USING (id = auth.uid());

CREATE POLICY "Users update their own profile" ON public.profiles
    FOR UPDATE TO authenticated USING (id = auth.uid());

-- 2. Clients Policies
CREATE POLICY "Admins full access to clients" ON public.clients
    FOR ALL TO authenticated USING (public.is_admin_or_team());

CREATE POLICY "Clients read only their own client record" ON public.clients
    FOR SELECT TO authenticated USING (user_id = auth.uid());

-- 3. Projects Policies
CREATE POLICY "Admins full access to projects" ON public.projects
    FOR ALL TO authenticated USING (public.is_admin_or_team());

CREATE POLICY "Clients read only their own assigned projects" ON public.projects
    FOR SELECT TO authenticated USING (client_id = public.get_auth_client_id());

-- 4. Milestones Policies
CREATE POLICY "Admins full access to milestones" ON public.milestones
    FOR ALL TO authenticated USING (public.is_admin_or_team());

CREATE POLICY "Clients read milestones of their projects" ON public.milestones
    FOR SELECT TO authenticated USING (
        EXISTS (
            SELECT 1 FROM public.projects
            WHERE projects.id = milestones.project_id
            AND projects.client_id = public.get_auth_client_id()
        )
    );

-- 5. Tasks Policies (Internal to Admin & Team)
CREATE POLICY "Admins and team full access to tasks" ON public.tasks
    FOR ALL TO authenticated USING (public.is_admin_or_team());

-- 6. Leads / CRM Policies (Admin & Team Only)
CREATE POLICY "Admins and team full access to leads" ON public.leads
    FOR ALL TO authenticated USING (public.is_admin_or_team());

-- 7. Project Updates Policies (Data Isolation: Clients only see is_public_to_client)
CREATE POLICY "Admins full access to project updates" ON public.project_updates
    FOR ALL TO authenticated USING (public.is_admin_or_team());

CREATE POLICY "Clients read public project updates for their project" ON public.project_updates
    FOR SELECT TO authenticated USING (
        is_public_to_client = TRUE AND
        EXISTS (
            SELECT 1 FROM public.projects
            WHERE projects.id = project_updates.project_id
            AND projects.client_id = public.get_auth_client_id()
        )
    );

-- 8. Project Files Policies
CREATE POLICY "Admins full access to project files" ON public.project_files
    FOR ALL TO authenticated USING (public.is_admin_or_team());

CREATE POLICY "Clients read files for their project" ON public.project_files
    FOR SELECT TO authenticated USING (
        EXISTS (
            SELECT 1 FROM public.projects
            WHERE projects.id = project_files.project_id
            AND projects.client_id = public.get_auth_client_id()
        )
    );

-- 9. Activity Logs Policies
CREATE POLICY "Admins read all activity logs" ON public.activity_logs
    FOR SELECT TO authenticated USING (public.is_admin_or_team());

CREATE POLICY "Clients read activity logs for their project" ON public.activity_logs
    FOR SELECT TO authenticated USING (
        client_id = public.get_auth_client_id()
    );

-- ==============================================================================
-- 4. AUTOMATIC PROGRESS CALCULATION TRIGGER
-- Updates project.progress automatically when milestone progresses change
-- ==============================================================================

CREATE OR REPLACE FUNCTION public.calculate_project_progress()
RETURNS TRIGGER AS $$
DECLARE
    target_project_id UUID;
    avg_progress INTEGER;
BEGIN
    target_project_id := COALESCE(NEW.project_id, OLD.project_id);

    SELECT COALESCE(ROUND(AVG(progress)), 0)
    INTO avg_progress
    FROM public.milestones
    WHERE project_id = target_project_id;

    UPDATE public.projects
    SET progress = avg_progress,
        status = CASE 
            WHEN avg_progress = 100 THEN 'completed'::project_status
            WHEN avg_progress > 0 AND status = 'planning' THEN 'in_progress'::project_status
            ELSE status
        END,
        updated_at = NOW()
    WHERE id = target_project_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_recalc_project_progress ON public.milestones;
CREATE TRIGGER trg_recalc_project_progress
AFTER INSERT OR UPDATE OR DELETE ON public.milestones
FOR EACH ROW EXECUTE FUNCTION public.calculate_project_progress();
