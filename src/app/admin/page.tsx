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
import safeGet from '../lib/api';
import ScheduleTable from "../admin/dashboard/ScheduleTable";
import Consent from "../admin/dashboard/Consent";

type DashboardSummary = {
  totalRevenue: number;
  totalClients: number;
  activeProjects: number;
  pendingConsultations: number;
  upcomingMeetings: number;
};

export default function AdminPage() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await safeGet<{ success: boolean; data: DashboardSummary }>('/api/admin/dashboard/summary');
        if (res.data.success) {
          setSummary(res.data.data);
        }
      } catch (err) {
        console.error('Failed to load summary', err);
      }
    })();
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <StatCard title="Revenue" value={`$${summary?.totalRevenue?.toLocaleString() ?? 0}`} />
        <StatCard title="Clients" value={summary?.totalClients ?? 0} />
        <StatCard title="Projects" value={summary?.activeProjects ?? 0} />
        <StatCard title="Consultations" value={summary?.pendingConsultations ?? 0} />
        <StatCard title="Meetings" value={summary?.upcomingMeetings ?? 0} />
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
          <RecentActivities />
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
