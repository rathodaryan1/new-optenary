import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import type { ReactNode } from 'react';

/**
 * Protects admin/team routes. If a client attempts to access /admin,
 * they are strictly redirected to their isolated /portal.
 */
export function RequireAdminOrTeam({ children }: { children: ReactNode }) {
  const { currentUser, role } = useAuth();
  const location = useLocation();

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role === 'client') {
    return <Navigate to="/portal" replace />;
  }

  return <>{children}</>;
}

/**
 * Protects client portal routes. If user is unauthenticated, redirects to /login.
 */
export function RequireClient({ children }: { children: ReactNode }) {
  const { currentUser } = useAuth();
  const location = useLocation();

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

