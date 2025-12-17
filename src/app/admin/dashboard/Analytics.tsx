'use client';
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { safeGet } from '../../lib/api';
import { useAuth } from '../../contexts/AuthContext';

// Type definitions
interface RevenueData {
  month: string;
  revenue: number;
}

interface FinancialResponse {
  success: boolean;
  data: {
    revenueByMonth: RevenueData[];
  };
}

export default function Analytics() {
  const [data, setData] = useState<RevenueData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    (async () => {
      try {
        const res = await safeGet<FinancialResponse>('/api/admin/financial?dateRange=monthly');
        if (res.success) {
          setData(res.data.revenueByMonth);
        } else {
          setError('Failed to load analytics data');
        }
      } catch (err) {
        console.error('Analytics load failed', err);
        setError('Failed to load analytics');
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  if (!user) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold mb-4">Revenue (Monthly)</h3>
        <div className="text-gray-500 text-center py-8">Please login to view analytics</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold mb-4">Revenue (Monthly)</h3>
        <div className="flex items-center justify-center h-48">
          <div className="text-gray-500">Loading chart...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold mb-4">Revenue (Monthly)</h3>
        <div className="text-red-600 text-center py-8">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold mb-4">Revenue (Monthly)</h3>
      {data && data.length > 0 ? (
        <div style={{ height: 220 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip 
                formatter={(value) => [`$${value}`, 'Revenue']}
                labelFormatter={(label) => `Month: ${label}`}
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#4f46e5" 
                strokeWidth={2} 
                dot={{ fill: '#4f46e5', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: '#3730a3' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="flex items-center justify-center h-48">
          <div className="text-gray-500">No revenue data available</div>
        </div>
      )}
    </div>
  );
}