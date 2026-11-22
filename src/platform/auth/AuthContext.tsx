import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { AuthUser, UserRole } from '../types';

interface AuthContextType {
  currentUser: AuthUser | null;
  role: UserRole;
  isAuthenticated: boolean;
  login: (email: string, password?: string) => Promise<boolean>;
  loginAsDemo: (presetKey: 'admin' | 'team' | 'client_shree' | 'client_mehta') => void;
  logout: () => void;
  updateCurrentUser: (updates: Partial<AuthUser>) => void;
}

export const DEMO_USERS: Record<string, AuthUser> = {
  admin: {
    id: 'usr-admin-01',
    email: 'admin@optenary.in',
    name: 'Tirth Rathod',
    role: 'admin',
    companyName: 'Optenary HQ',
    avatar: 'TR',
  },
  team: {
    id: 'usr-team-01',
    email: 'team@optenary.in',
    name: 'Yudhisthir Rathod',
    role: 'team',
    companyName: 'Optenary Engineering',
    avatar: 'YR',
  },
  client_shree: {
    id: 'usr-client-shree',
    email: 'ramesh@shree-enterprise.com',
    name: 'Ramesh Patel',
    role: 'client',
    clientId: 'c-shree',
    companyName: 'Shree Enterprise',
    avatar: 'RP',
  },
  client_mehta: {
    id: 'usr-client-mehta',
    email: 'rajesh@mehtadairy.com',
    name: 'Rajesh Mehta',
    role: 'client',
    clientId: 'c-mehta',
    companyName: 'Mehta Dairy',
    avatar: 'RM',
  },
};

const AUTH_STORAGE_KEY = 'optenary_auth_session_v1';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    // Default to admin for seamless evaluation
    return DEMO_USERS.admin;
  });

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    } catch {}
  }, [currentUser]);

  const login = async (email: string): Promise<boolean> => {
    const cleanEmail = email.trim().toLowerCase();
    
    // Check against demo accounts
    const match = Object.values(DEMO_USERS).find((u) => u.email.toLowerCase() === cleanEmail);
    if (match) {
      setCurrentUser(match);
      return true;
    }

    // New or custom client login
    const newUser: AuthUser = {
      id: `usr-${Date.now().toString(36)}`,
      email: cleanEmail,
      name: cleanEmail.split('@')[0],
      role: 'client',
      companyName: 'Client Account',
      avatar: cleanEmail.slice(0, 2).toUpperCase(),
    };
    setCurrentUser(newUser);
    return true;
  };

  const loginAsDemo = (presetKey: 'admin' | 'team' | 'client_shree' | 'client_mehta') => {
    const user = DEMO_USERS[presetKey];
    if (user) {
      setCurrentUser(user);
    }
  };

  const logout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setCurrentUser(null);
  };

  const updateCurrentUser = (updates: Partial<AuthUser>) => {
    setCurrentUser((prev) => (prev ? { ...prev, ...updates } : prev));
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        role: currentUser?.role || 'admin',
        isAuthenticated: Boolean(currentUser),
        login,
        loginAsDemo,
        logout,
        updateCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

