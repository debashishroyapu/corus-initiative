'use client';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { safeGet } from '../../lib/api';

interface DashboardCounts {
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
}

interface DashboardPerformance {
  activeProjects: number;
  completedProjects: number;
  activeClients: number;
  pendingSchedules: number;
  pendingConsultations: number;
  projectCompletionRate: number;
}

interface DashboardStats {
  counts: DashboardCounts;
  performance: DashboardPerformance;
}

export default function StatsManagement() {
  const { user, loading: authLoading } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await safeGet<DashboardStats>('/stats/dashboard');
      if (result) {
        setStats(result);
      } else {
        setError('Failed to load stats');
      }
    } catch (err: any) {
      console.error('Failed to fetch stats:', err);
      setError(err.message || 'Failed to fetch stats');
    } finally {
      setLoading(false);
    }
  };

  // ✅ authLoading শেষ হওয়ার পর user থাকলেই fetch করো
  useEffect(() => {
    if (!authLoading && user) fetchStats();
  }, [user, authLoading]);

  if (authLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Checking auth...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="text-red-600 text-center py-8">Unauthorized access</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading statistics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="text-red-600 text-center py-8">
          {error}
          <button onClick={fetchStats} className="ml-4 px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Content Counts */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold mb-4">Content Overview</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-2xl font-bold text-blue-600">{stats?.counts.clients ?? 0}</p>
            <p className="text-sm text-blue-600">Clients</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-2xl font-bold text-green-600">{stats?.counts.projects ?? 0}</p>
            <p className="text-sm text-green-600">Projects</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
            <p className="text-2xl font-bold text-purple-600">{stats?.counts.teamMembers ?? 0}</p>
            <p className="text-sm text-purple-600">Team Members</p>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
            <p className="text-2xl font-bold text-orange-600">{stats?.counts.blogs ?? 0}</p>
            <p className="text-sm text-orange-600">Blogs</p>
          </div>
          <div className="text-center p-4 bg-pink-50 rounded-lg border border-pink-200">
            <p className="text-2xl font-bold text-pink-600">{stats?.counts.subscribers ?? 0}</p>
            <p className="text-sm text-pink-600">Subscribers</p>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold mb-4">Performance</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-2xl font-bold text-green-600">{stats?.performance.activeProjects ?? 0}</p>
            <p className="text-sm text-green-600">Active Projects</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-2xl font-bold text-gray-600">{stats?.performance.completedProjects ?? 0}</p>
            <p className="text-sm text-gray-600">Completed Projects</p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-2xl font-bold text-blue-600">{stats?.performance.activeClients ?? 0}</p>
            <p className="text-sm text-blue-600">Active Clients</p>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-2xl font-bold text-yellow-600">{stats?.performance.pendingSchedules ?? 0}</p>
            <p className="text-sm text-yellow-600">Pending Schedules</p>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-2xl font-bold text-yellow-600">{stats?.performance.pendingConsultations ?? 0}</p>
            <p className="text-sm text-yellow-600">Pending Consultations</p>
          </div>
          <div className="text-center p-4 bg-indigo-50 rounded-lg border border-indigo-200">
            <p className="text-2xl font-bold text-indigo-600">
              {stats?.performance.projectCompletionRate?.toFixed(1) ?? 0}%
            </p>
            <p className="text-sm text-indigo-600">Completion Rate</p>
          </div>
        </div>
      </div>

      {/* All Counts */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold mb-4">All Data Counts</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {stats?.counts && Object.entries(stats.counts).map(([key, value]) => (
            <div key={key} className="text-center p-3 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-xl font-bold text-gray-700">{value}</p>
              <p className="text-xs text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 text-right">
          <button
            onClick={fetchStats}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm transition duration-200"
          >
            Refresh Stats
          </button>
        </div>
      </div>
    </div>
  );
}