'use client';
import React, { useEffect, useState } from 'react';
import { safeGet } from '../../lib/api';
import { useAuth } from '../../contexts/AuthContext';

interface FinancialSummary {
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
  profitMargin: number;
  totalClients?: number;
  activeProjects?: number;
}

interface FinancialResponse {
  success: boolean;
  data: {
    summary: FinancialSummary;
  };
}

export default function FinancialAnalytics() {
  const [financialData, setFinancialData] = useState<FinancialSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    (async () => {
      try {
        const res = await safeGet<FinancialResponse>('/api/admin/financial?dateRange=monthly');
        if (res.success) {
          setFinancialData(res.data.summary);
          setError(null);
        } else {
          setError('Failed to load financial data');
        }
      } catch (err: any) {
        console.error('Financial fetch failed:', err);
        setError(err.message || 'Failed to load financial data');
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  if (!user) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold mb-4">Financial Summary</h3>
        <div className="text-gray-500 text-center py-8">Please login to view financial data</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold mb-4">Financial Summary</h3>
        <div className="text-gray-500 text-center py-8">Loading financial data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold mb-4">Financial Summary</h3>
        <div className="text-red-600 text-center py-8">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold mb-4">Financial Summary</h3>
      
      {financialData ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <div className="text-sm text-green-800 font-medium mb-1">Total Revenue</div>
              <div className="text-xl font-bold text-green-600">
                ${financialData.totalRevenue?.toLocaleString() || 0}
              </div>
            </div>
            
            <div className="bg-red-50 p-4 rounded-lg border border-red-100">
              <div className="text-sm text-red-800 font-medium mb-1">Total Expenses</div>
              <div className="text-xl font-bold text-red-600">
                ${financialData.totalExpenses?.toLocaleString() || 0}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <div className="text-sm text-blue-800 font-medium mb-1">Net Profit</div>
              <div className="text-xl font-bold text-blue-600">
                ${financialData.netProfit?.toLocaleString() || 0}
              </div>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
              <div className="text-sm text-purple-800 font-medium mb-1">Profit Margin</div>
              <div className="text-xl font-bold text-purple-600">
                {financialData.profitMargin?.toFixed(1) || 0}%
              </div>
            </div>
          </div>
          
          {(financialData.totalClients !== undefined || financialData.activeProjects !== undefined) && (
            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-100">
              {financialData.totalClients !== undefined && (
                <div className="text-center">
                  <div className="text-sm text-gray-600">Total Clients</div>
                  <div className="text-lg font-semibold text-gray-800">{financialData.totalClients}</div>
                </div>
              )}
              
              {financialData.activeProjects !== undefined && (
                <div className="text-center">
                  <div className="text-sm text-gray-600">Active Projects</div>
                  <div className="text-lg font-semibold text-gray-800">{financialData.activeProjects}</div>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="text-gray-500 text-center py-8">No financial data available</div>
      )}
    </div>
  );
}