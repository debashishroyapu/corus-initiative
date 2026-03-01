'use client';
import React, { useEffect, useState } from 'react';
import { safeGet } from '../../lib/api';
import { useAuth } from '../../contexts/AuthContext';

interface FinancialSummary {
  totalRevenue: number;
  totalProfit: number;
  activeClients: number;
  newClients: number;
  avgProjectValue: number;
}

interface Financial {
  _id: string;
  period: string;
  summary: FinancialSummary;
  profitMargin: number;
  cashFlow: {
    inflow: number;
    outflow: number;
    netCashFlow: number;
  };
}

export default function FinancialAnalytics() {
  const [financial, setFinancial] = useState<Financial | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    (async () => {
      try {
        // Backend returns { financialData: Financial[] }
        const res = await safeGet<{ financialData: Financial[] }>('/admin/financial');
        if (res?.financialData && res.financialData.length > 0) {
          setFinancial(res.financialData[0]);
          setError(null);
        } else {
          setError('No financial data available');
        }
      } catch (err: any) {
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
        <div className="text-gray-500 text-center py-8">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold mb-4">
        Financial Summary
        {financial?.period && <span className="text-sm font-normal text-gray-500 ml-2">({financial.period})</span>}
      </h3>

      {financial ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <div className="text-sm text-green-800 font-medium mb-1">Total Revenue</div>
              <div className="text-xl font-bold text-green-600">
                ${financial.summary.totalRevenue?.toLocaleString() || 0}
              </div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <div className="text-sm text-blue-800 font-medium mb-1">Total Profit</div>
              <div className="text-xl font-bold text-blue-600">
                ${financial.summary.totalProfit?.toLocaleString() || 0}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
              <div className="text-sm text-purple-800 font-medium mb-1">Profit Margin</div>
              <div className="text-xl font-bold text-purple-600">
                {financial.profitMargin?.toFixed(1) || 0}%
              </div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
              <div className="text-sm text-orange-800 font-medium mb-1">Avg Project Value</div>
              <div className="text-xl font-bold text-orange-600">
                ${financial.summary.avgProjectValue?.toLocaleString() || 0}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-100">
            <div className="text-center">
              <div className="text-sm text-gray-600">Active Clients</div>
              <div className="text-lg font-semibold text-gray-800">{financial.summary.activeClients || 0}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600">New Clients</div>
              <div className="text-lg font-semibold text-gray-800">{financial.summary.newClients || 0}</div>
            </div>
          </div>

          {financial.cashFlow && (
            <div className="pt-2 border-t border-gray-100">
              <div className="text-sm font-medium text-gray-700 mb-2">Cash Flow</div>
              <div className="grid grid-cols-3 gap-2">
                <div className="text-center p-2 bg-green-50 rounded">
                  <div className="text-xs text-gray-500">Inflow</div>
                  <div className="text-sm font-semibold text-green-600">${financial.cashFlow.inflow?.toLocaleString() || 0}</div>
                </div>
                <div className="text-center p-2 bg-red-50 rounded">
                  <div className="text-xs text-gray-500">Outflow</div>
                  <div className="text-sm font-semibold text-red-600">${financial.cashFlow.outflow?.toLocaleString() || 0}</div>
                </div>
                <div className="text-center p-2 bg-blue-50 rounded">
                  <div className="text-xs text-gray-500">Net</div>
                  <div className="text-sm font-semibold text-blue-600">${financial.cashFlow.netCashFlow?.toLocaleString() || 0}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-gray-500 text-center py-8">No financial data available</div>
      )}
    </div>
  );
}