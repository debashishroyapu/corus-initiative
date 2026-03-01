'use client';
import React, { useEffect, useState } from 'react';
import StatCard from '../admin/dashboard/Stats';
import Analytics from '../admin/dashboard/Analytics';
import FinancialAnalytics from '../admin/dashboard/FinancialAnalytics';
import ProjectsTable from '../admin/dashboard/ProjectTable';
import ClientsTable from '../admin/dashboard/ClientTable';
import TeamTable from '../admin/dashboard/TeamTable';
import BlogsTable from '../admin/dashboard/BlogTable';
import ConsultationTable from '../admin/dashboard/ConsultationTable';
import RecentActivities from '../admin/dashboard/RecentActivities';
import ScheduleTable from "../admin/dashboard/ScheduleTable";
import Consent from "../admin/dashboard/Consent";
import { safeGet } from '../lib/api';

// ✅ /api/stats/dashboard এর actual response structure
interface DashboardData {
  counts: {
    blogs: number;
    caseStudies: number;
    solutions: number;
    industries: number;
    projects: number;
    clients: number;
    teamMembers: number;
    schedules: number;
    consultations: number;
    subscribers: number;
  };
  performance: {
    activeProjects: number;
    completedProjects: number;
    activeClients: number;
    pendingSchedules: number;
    pendingConsultations: number;
    projectCompletionRate: number;
  };
  recentActivities: {
    blogs: any[];
    caseStudies: any[];
    projects: any[];
    consultations: any[];
  };
}

export default function AdminPage() {
  const [summary, setSummary] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        // ✅ /stats/dashboard → API_BASE_URL already includes /api
        const data = await safeGet<DashboardData>('/stats/dashboard');
        if (data) {
          setSummary(data);
        }
      } catch (err) {
        console.error('Failed to load dashboard summary', err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="bg-gray-800/50 rounded-xl p-6 animate-pulse">
              <div className="h-4 bg-gray-700 rounded w-1/2 mb-2"></div>
              <div className="h-8 bg-gray-700 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ✅ summary?.counts ও summary?.performance থেকে data নাও */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <StatCard title="Clients" value={summary?.counts?.clients ?? 0} />
        <StatCard title="Projects" value={summary?.counts?.projects ?? 0} />
        <StatCard title="Active Projects" value={summary?.performance?.activeProjects ?? 0} />
        <StatCard title="Pending Consultations" value={summary?.performance?.pendingConsultations ?? 0} />
        <StatCard title="Pending Meetings" value={summary?.performance?.pendingSchedules ?? 0} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Analytics />
          <ProjectsTable />
          <ClientsTable />
        </div>
        <div className="space-y-6">
          <FinancialAnalytics />
          <TeamTable />
          <RecentActivities activities={summary?.recentActivities} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        <ConsultationTable />
        <BlogsTable />
        <ScheduleTable />
        <Consent />
      </div>
    </div>
  );
}