-- ==============================================================================
-- OPTENARY DIGITAL OPERATIONS & CLIENT MANAGEMENT PLATFORM
-- PRODUCTION SUPABASE / POSTGRESQL DATABASE SCHEMA & RLS POLICIES
-- Execute directly in Supabase -> SQL Editor -> New query -> Run
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================================================================
-- 2. CORE PRODUCTION TABLES
-- Using TEXT PRIMARY KEY with gen_random_uuid() fallback ensures full compatibility
-- with both client-generated IDs and Supabase auto-generated UUIDs.
-- ==============================================================================

-- CLIENTS
CREATE TABLE IF NOT EXISTS public.clients (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name TEXT NOT NULL,
    company TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    industry TEXT,
    website TEXT,
    status TEXT NOT NULL DEFAULT 'active',
    total_value TEXT NOT NULL DEFAULT '₹0',
    notes TEXT,
    joined_date TEXT DEFAULT to_char(NOW(), 'Mon DD, YYYY'),
    active_projects_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- PROJECTS
CREATE TABLE IF NOT EXISTS public.projects (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    client_id TEXT NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
    client_name TEXT NOT NULL,
    company_name TEXT NOT NULL,
    title TEXT NOT NULL,
    service TEXT NOT NULL,
    description TEXT,
    requirements_summary TEXT,
    status TEXT NOT NULL DEFAULT 'planning',
    progress INTEGER NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
    start_date TEXT DEFAULT to_char(NOW(), 'Mon DD, YYYY'),
    target_delivery_date TEXT NOT NULL DEFAULT 'TBD',
    budget TEXT NOT NULL DEFAULT '₹0',
    live_url TEXT,
    repository_url TEXT,
    team_members JSONB DEFAULT '[]'::jsonb,
    timeline JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- MILESTONES
CREATE TABLE IF NOT EXISTS public.milestones (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    project_id TEXT NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    status TEXT NOT NULL DEFAULT 'pending',
    progress INTEGER NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
    due_date TEXT,
    completed_at TEXT,
    deliverables TEXT[] DEFAULT '{}',
    order_index INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- TASKS
CREATE TABLE IF NOT EXISTS public.tasks (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    project_id TEXT NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    milestone_id TEXT REFERENCES public.milestones(id) ON DELETE SET NULL,
    assigned_to TEXT,
    assigned_to_name TEXT,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT NOT NULL DEFAULT 'todo',
    priority TEXT NOT NULL DEFAULT 'medium',
    due_date TEXT,
    estimated_hours NUMERIC(5,2) DEFAULT 0,
    is_completed BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- LEADS / CRM PIPELINE
CREATE TABLE IF NOT EXISTS public.leads (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name TEXT NOT NULL,
    company TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    service TEXT NOT NULL,
    budget TEXT NOT NULL DEFAULT '₹35,000',
    source TEXT NOT NULL DEFAULT 'Website Inbound',
    status TEXT NOT NULL DEFAULT 'new',
    stage TEXT NOT NULL DEFAULT 'new',
    notes TEXT,
    follow_up_date TEXT,
    proposal JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- PROJECT UPDATES / CLIENT MESSAGES
CREATE TABLE IF NOT EXISTS public.project_updates (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    project_id TEXT NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    date TEXT DEFAULT to_char(NOW(), 'Mon DD, YYYY, HH12:MI AM'),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    author TEXT NOT NULL,
    author_name TEXT,
    tag TEXT DEFAULT 'Engineering',
    is_public_to_client BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- PROJECT FILES & DELIVERABLES
CREATE TABLE IF NOT EXISTS public.project_files (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    project_id TEXT NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'deliverables',
    size TEXT NOT NULL DEFAULT '1.0 MB',
    type TEXT NOT NULL DEFAULT 'document',
    url TEXT NOT NULL DEFAULT '#',
    uploaded_by TEXT DEFAULT 'Optenary Team',
    uploaded_at TEXT DEFAULT to_char(NOW(), 'Mon DD, YYYY'),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- TEAM MEMBERS (Optenary Core Studio Team)
CREATE TABLE IF NOT EXISTS public.team_members (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    role_title TEXT NOT NULL,
    department TEXT NOT NULL,
    active_tasks_count INTEGER NOT NULL DEFAULT 0,
    avatar_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ACTIVITY LOGS / AUDIT TRAIL
CREATE TABLE IF NOT EXISTS public.activity_logs (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    timestamp TEXT DEFAULT to_char(NOW(), 'Mon DD, YYYY, HH12:MI AM'),
    actor TEXT NOT NULL,
    action TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'system',
    details TEXT NOT NULL,
    project_id TEXT,
    client_id TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 3. SEED REAL OPTENARY TEAM (No fake clients or mock data)
-- ==============================================================================

INSERT INTO public.team_members (id, name, email, role_title, department, active_tasks_count, avatar_url)
VALUES
    ('tm-1', 'Tirth Rathod', 'tirth@optenary.in', 'Founder & Lead Architect', 'Engineering & Architecture', 0, 'TR'),
    ('tm-2', 'Yudhisthir Rathod', 'yudhisthir@optenary.in', 'Cloud Architect & Database Lead', 'Infrastructure', 0, 'YR'),
    ('tm-3', 'Gaurav', 'gaurav@optenary.in', 'Full-Stack & Mobile Engineer', 'Frontend & Mobile', 0, 'GV'),
    ('tm-4', 'Bhavik', 'bhavik@optenary.in', 'UI/UX Design Systems Engineer', 'Design', 0, 'BH')
ON CONFLICT (email) DO NOTHING;

-- ==============================================================================
-- 4. ROW LEVEL SECURITY (RLS) POLICIES
-- Configured for both 'anon' (publishable key from .env) and 'authenticated' roles
-- to guarantee immediate read/write access from the dashboard.
-- ==============================================================================

ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- Clients Policies
DROP POLICY IF EXISTS "Public & authenticated clients read" ON public.clients;
CREATE POLICY "Public & authenticated clients read" ON public.clients FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "Public & authenticated clients write" ON public.clients;
CREATE POLICY "Public & authenticated clients write" ON public.clients FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

-- Projects Policies
DROP POLICY IF EXISTS "Public & authenticated projects read" ON public.projects;
CREATE POLICY "Public & authenticated projects read" ON public.projects FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "Public & authenticated projects write" ON public.projects;
CREATE POLICY "Public & authenticated projects write" ON public.projects FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

-- Milestones Policies
DROP POLICY IF EXISTS "Public & authenticated milestones read" ON public.milestones;
CREATE POLICY "Public & authenticated milestones read" ON public.milestones FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "Public & authenticated milestones write" ON public.milestones;
CREATE POLICY "Public & authenticated milestones write" ON public.milestones FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

-- Tasks Policies
DROP POLICY IF EXISTS "Public & authenticated tasks read" ON public.tasks;
CREATE POLICY "Public & authenticated tasks read" ON public.tasks FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "Public & authenticated tasks write" ON public.tasks;
CREATE POLICY "Public & authenticated tasks write" ON public.tasks FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

-- Leads Policies
DROP POLICY IF EXISTS "Public & authenticated leads read" ON public.leads;
CREATE POLICY "Public & authenticated leads read" ON public.leads FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "Public & authenticated leads write" ON public.leads;
CREATE POLICY "Public & authenticated leads write" ON public.leads FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

-- Project Updates Policies
DROP POLICY IF EXISTS "Public & authenticated project updates read" ON public.project_updates;
CREATE POLICY "Public & authenticated project updates read" ON public.project_updates FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "Public & authenticated project updates write" ON public.project_updates;
CREATE POLICY "Public & authenticated project updates write" ON public.project_updates FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

-- Project Files Policies
DROP POLICY IF EXISTS "Public & authenticated project files read" ON public.project_files;
CREATE POLICY "Public & authenticated project files read" ON public.project_files FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "Public & authenticated project files write" ON public.project_files;
CREATE POLICY "Public & authenticated project files write" ON public.project_files FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

-- Team Members Policies
DROP POLICY IF EXISTS "Public & authenticated team members read" ON public.team_members;
CREATE POLICY "Public & authenticated team members read" ON public.team_members FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "Public & authenticated team members write" ON public.team_members;
CREATE POLICY "Public & authenticated team members write" ON public.team_members FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

-- Activity Logs Policies
DROP POLICY IF EXISTS "Public & authenticated activity logs read" ON public.activity_logs;
CREATE POLICY "Public & authenticated activity logs read" ON public.activity_logs FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "Public & authenticated activity logs write" ON public.activity_logs;
CREATE POLICY "Public & authenticated activity logs write" ON public.activity_logs FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

-- ==============================================================================
-- 5. AUTOMATIC PROGRESS RECALCULATION TRIGGER
-- Recalculates project.progress when milestones are updated
-- ==============================================================================

CREATE OR REPLACE FUNCTION public.calculate_project_progress()
RETURNS TRIGGER AS $$
DECLARE
    target_project_id TEXT;
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
            WHEN avg_progress = 100 THEN 'completed'
            WHEN avg_progress > 0 AND status = 'planning' THEN 'in_progress'
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
