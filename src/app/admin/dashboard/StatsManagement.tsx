'use client';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getStats, updateStats, simulateNewOrder } from '../../lib/api';

interface StatsData {
  _id: string;
  happyClients: number;
  projectsDone: number;
  clientSatisfaction: number;
  totalRevenue: number;
  lastUpdated: string;
}

export default function StatsManagement() {
  const { admin } = useAuth();
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [manualUpdate, setManualUpdate] = useState({
    happyClients: 0,
    projectsDone: 0,
    clientSatisfaction: 0,
    totalRevenue: 0
  });

  const fetchStats = async () => {
    try {
      setLoading(true);
      const result = await getStats();
      
      if (result.success && result.data) {
        setStats(result.data);
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStats = async (incrementData: any) => {
    try {
      setUpdating(true);
      const result = await updateStats(incrementData);
      
      if (result.success) {
        await fetchStats(); // Refresh stats
        setManualUpdate({ happyClients: 0, projectsDone: 0, clientSatisfaction: 0, totalRevenue: 0 });
        alert('Stats updated successfully!');
      } else {
        alert(result.message || 'Failed to update stats');
      }
    } catch (error) {
      console.error('Failed to update stats:', error);
      alert('Failed to update stats');
    } finally {
      setUpdating(false);
    }
  };

  const handleSimulateNewOrder = async () => {
    try {
      setUpdating(true);
      const result = await simulateNewOrder();
      
      if (result.success) {
        await fetchStats(); // Refresh stats
        alert('New order simulated successfully!');
      } else {
        alert(result.message || 'Failed to simulate order');
      }
    } catch (error) {
      console.error('Failed to simulate order:', error);
      alert('Failed to simulate order');
    } finally {
      setUpdating(false);
    }
  };

  const handleManualUpdate = () => {
    if (manualUpdate.happyClients > 0 || manualUpdate.projectsDone > 0 || 
        manualUpdate.clientSatisfaction > 0 || manualUpdate.totalRevenue > 0) {
      handleUpdateStats(manualUpdate);
    } else {
      alert('Please enter at least one value to update');
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (!admin) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="text-red-600 text-center py-8">
          Unauthorized access
        </div>
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

  return (
    <div className="space-y-6">
      {/* Current Stats Display */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold mb-4">Current Statistics</h3>
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-2xl font-bold text-blue-600">{stats.happyClients}</p>
              <p className="text-sm text-blue-600">Happy Clients</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-2xl font-bold text-green-600">{stats.projectsDone}</p>
              <p className="text-sm text-green-600">Projects Done</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
              <p className="text-2xl font-bold text-purple-600">{stats.clientSatisfaction}%</p>
              <p className="text-sm text-purple-600">Satisfaction</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
              <p className="text-2xl font-bold text-orange-600">${(stats.totalRevenue / 1000).toFixed(0)}K</p>
              <p className="text-sm text-orange-600">Total Revenue</p>
            </div>
          </div>
        )}
        <p className="text-xs text-gray-500 mt-4">
          Last updated: {stats ? new Date(stats.lastUpdated).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }) : 'N/A'}
        </p>
      </div>

      {/* Manual Update Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold mb-4">Manual Update</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Happy Clients
            </label>
            <input
              type="number"
              min="0"
              value={manualUpdate.happyClients}
              onChange={(e) => setManualUpdate(prev => ({
                ...prev,
                happyClients: parseInt(e.target.value) || 0
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Projects
            </label>
            <input
              type="number"
              min="0"
              value={manualUpdate.projectsDone}
              onChange={(e) => setManualUpdate(prev => ({
                ...prev,
                projectsDone: parseInt(e.target.value) || 0
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Satisfaction (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={manualUpdate.clientSatisfaction}
              onChange={(e) => setManualUpdate(prev => ({
                ...prev,
                clientSatisfaction: parseInt(e.target.value) || 0
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Revenue ($)
            </label>
            <input
              type="number"
              min="0"
              value={manualUpdate.totalRevenue}
              onChange={(e) => setManualUpdate(prev => ({
                ...prev,
                totalRevenue: parseInt(e.target.value) || 0
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="0"
            />
          </div>
        </div>
        <button
          onClick={handleManualUpdate}
          disabled={updating}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200"
        >
          {updating ? 'Updating...' : 'Update Stats'}
        </button>
      </div>

      {/* Simulate New Order */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold mb-4">Simulate New Order</h3>
        <p className="text-gray-600 mb-4">
          Click below to simulate a new order completion. This will automatically increment all stats with random values.
        </p>
        <button
          onClick={handleSimulateNewOrder}
          disabled={updating}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-200"
        >
          {updating ? 'Processing...' : 'Simulate New Order'}
        </button>
      </div>
    </div>
  );
}