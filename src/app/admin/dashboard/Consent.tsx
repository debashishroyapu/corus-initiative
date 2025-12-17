'use client';
import React, { useEffect, useState } from 'react';
import { fetchConsentStats } from '../../lib/api';
import { useAuth } from '../../contexts/AuthContext';

interface ConsentStats {
  total: number;
  accepted: number;
  declined: number;
  acceptanceRate: string;
}

export default function Consent() {
  const [stats, setStats] = useState<ConsentStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState('all');
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    (async () => {
      try {
        const res = await fetchConsentStats(timeRange);
        if (res.success) {
          setStats(res.data);
          setError(null);
        } else {
          setError('Failed to load consent statistics');
        }
      } catch (err: any) {
        console.error('Failed to load consent stats:', err);
        setError(err.message || 'Failed to load consent data');
      } finally {
        setLoading(false);
      }
    })();
  }, [timeRange, user]);

  if (!user) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold mb-4">Cookie Consent Analytics</h3>
        <div className="text-gray-500 text-center py-8">Please login to view consent analytics</div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold mb-4">Cookie Consent Analytics</h3>
      
      <div className="mb-4">
        <select 
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="all">All Time</option>
        </select>
      </div>

      {error && (
        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm">
          {error}
        </div>
      )}

      {loading && (
        <div className="text-gray-500 text-center py-8">Loading consent data...</div>
      )}
      
      {stats && !loading && (
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-100">
            <div className="text-2xl font-bold text-blue-600">{stats.total.toLocaleString()}</div>
            <div className="text-sm text-blue-800 font-medium">Total Responses</div>
          </div>
          
          <div className="text-center p-4 bg-green-50 rounded-lg border border-green-100">
            <div className="text-2xl font-bold text-green-600">{stats.accepted.toLocaleString()}</div>
            <div className="text-sm text-green-800 font-medium">Accepted</div>
            <div className="text-xs text-green-600 mt-1">
              {((stats.accepted / stats.total) * 100).toFixed(1)}% of total
            </div>
          </div>
          
          <div className="text-center p-4 bg-red-50 rounded-lg border border-red-100">
            <div className="text-2xl font-bold text-red-600">{stats.declined.toLocaleString()}</div>
            <div className="text-sm text-red-800 font-medium">Declined</div>
            <div className="text-xs text-red-600 mt-1">
              {((stats.declined / stats.total) * 100).toFixed(1)}% of total
            </div>
          </div>
          
          <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-100">
            <div className="text-2xl font-bold text-purple-600">{stats.acceptanceRate}%</div>
            <div className="text-sm text-purple-800 font-medium">Acceptance Rate</div>
          </div>
        </div>
      )}

      {!loading && !stats && !error && (
        <div className="text-gray-500 text-center py-8">No consent data available</div>
      )}
    </div>
  );
}