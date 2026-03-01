"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { api } from "../lib/api";

// =============================================================================
// TYPES
// =============================================================================

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "super_admin" | "viewer";
}

interface AuthContextType {
  user: AdminUser | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

// =============================================================================
// CONTEXT
// =============================================================================

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};

// =============================================================================
// HELPER — MongoDB _id → id normalize
// =============================================================================

// MongoDB _id এবং toJSON() এর id দুটোই handle করে।
// Backend Mongoose toJSON() transform না থাকলে _id আসে, থাকলে id আসে।
const normalizeUser = (raw: any): AdminUser | null => {
  if (!raw) return null;
  const id = raw.id ?? raw._id?.toString?.() ?? raw._id;
  if (!id || !raw.email) return null;
  return {
    id,
    name: raw.name ?? "",
    email: raw.email,
    role: raw.role as AdminUser["role"],
  };
};

// =============================================================================
// PROVIDER
// =============================================================================

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ── Login ──────────────────────────────────────────────────────────────────
  // Flow: api.login() → POST /auth/login → backend sets refreshToken cookie
  // Response unwrapped by api.post(): { user: { _id/id, name, email, role } }
  const login = async (email: string, password: string): Promise<void> => {
    try {
      setError(null);
      const response = await api.login({ email, password });
      // response = AuthResponse = { user: {...} }
      const normalized = normalizeUser(response?.user);
      if (!normalized) throw new Error("Invalid response from server");
      setUser(normalized);
    } catch (err: any) {
      const message = err.message || "Login failed";
      setError(message);
      throw new Error(message);
    }
  };

  // ── Logout ─────────────────────────────────────────────────────────────────
  // Flow: POST /auth/logout → backend clears cookie (token দরকার নেই)
  const logout = async (): Promise<void> => {
    try {
      await api.logout();
    } catch {
      // Cookie already expired হলেও user logout করতে পারবে
    } finally {
      setUser(null);
      setError(null);
    }
  };

  // ── Check Auth on Load ─────────────────────────────────────────────────────
  // Flow: GET /auth/me → backend verifies refreshToken cookie → returns user
  // Response unwrapped by api.get(): User object directly (no { user: } wrapper)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await api.getCurrentUser();
        // userData = User = { _id/id, name, email, role, ... }
        setUser(normalizeUser(userData));
      } catch {
        // 401 = not logged in
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};