// app/admin/layout.tsx - ENHANCED VERSION
"use client";

import { useAuth } from "../contexts/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import AdminSidebar from "./dashboard/Sidebar";
import AdminTopbar from "./dashboard/Topbar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { admin, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    console.log('🔄 Admin Layout Check:', { 
      loading, 
      admin: admin?.email, 
      isLoginPage,
      pathname 
    });

    // Wait for auth to load
    if (loading) return;

    // If on login page and admin exists, redirect to dashboard
    if (admin && isLoginPage) {
      console.log('✅ Admin found on login page, redirecting to dashboard');
      router.push('/admin');
      return;
    }

    // If not on login page and no admin, redirect to login
    if (!admin && !isLoginPage) {
      console.log('🚫 No admin, redirecting to login');
      router.push('/admin/login');
      return;
    }

    // All checks passed
    setIsChecking(false);
  }, [admin, loading, router, isLoginPage, pathname]);

  // Show loading during initial check
  if (loading || isChecking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  // Show login page without sidebar
  if (isLoginPage) {
    return <div className="min-h-screen bg-gray-50">{children}</div>;
  }

  // Show admin dashboard with sidebar
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminTopbar />
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}