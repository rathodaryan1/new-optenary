/**
 * Optenary Supabase Client Wrapper
 * Inspects Vite environment variables for Supabase connection.
 * If credentials are not present, graceful fallback enables local persistent database engine.
 */

export const isSupabaseConfigured = Boolean(
  import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
