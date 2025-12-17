// contexts/AuthContext.tsx - FIXED VERSION
"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { 
  User, 
  onAuthStateChanged, 
  signOut,
  signInWithEmailAndPassword 
} from "firebase/auth";
import { auth } from "../lib/firebase";

interface AdminUser {
  uid: string;
  email: string | null;
  name: string | null;
  role: "admin" | "super_admin";
}

interface AuthContextType {
  user: User | null;
  admin: AdminUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  error?: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Firebase login function
  const login = async (email: string, password: string) => {
    try {
      setError(null);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();
      
      // Call backend to verify admin and set cookie
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken }),
      });

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.message || 'Admin access denied');
      }

      // Set admin data from backend response
      if (result.admin) {
        setAdmin(result.admin);
      }
      
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Login failed');
      throw err;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await signOut(auth);
      await fetch('/api/admin/logout', { method: 'POST' });
      setAdmin(null);
      setUser(null);
    } catch (err) {
      console.error('Logout failed:', err);
      setError('Logout failed');
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        try {
          const idToken = await currentUser.getIdToken();
          const tokenResult = await currentUser.getIdTokenResult();
          const role = tokenResult.claims.role;

          if (role === "admin" || role === "super_admin") {
            setAdmin({
              uid: currentUser.uid,
              email: currentUser.email,
              name: currentUser.displayName || currentUser.email,
              role: role as "admin" | "super_admin",
            });
          } else {
            setAdmin(null);
          }
        } catch (err) {
          console.error('Role verification failed:', err);
          setAdmin(null);
        }
      } else {
        setAdmin(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    admin,
    loading,
    login,
    logout,
    error,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};