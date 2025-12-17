'use client';
import React, { useEffect, useState } from 'react';
import { safeGet, safePut, safeDelete } from '../../lib/api';
import { useAuth } from '../../contexts/AuthContext';

// Type definitions
interface Consultation {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  message: string;
  status: 'new' | 'contacted' | 'in-progress' | 'completed';
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export default function ConsultationTable() {
  const [items, setItems] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    (async () => {
      try {
        const res = await safeGet<ApiResponse<Consultation[]>>('/api/admin/consultations');
        if (res.success) {
          setItems(res.data || []);
          setError(null);
        } else {
          setError('Failed to load consultations');
        }
      } catch (err: any) {
        console.error('Failed to load consultations:', err);
        setError(err.message || 'Failed to load consultations');
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  const updateStatus = async (id: string, status: string) => {
    if (!user) return;
    
    try {
      const res = await safePut<ApiResponse<Consultation>>(`/api/admin/consultations/${id}`, { status });
      if (res.success) {
        setItems(s => s.map(it => it._id === res.data._id ? res.data : it));
        setError(null);
      } else {
        setError('Failed to update consultation status');
      }
    } catch (err: any) {
      console.error('Failed to update consultation:', err);
      setError(err.message || 'Failed to update consultation');
    }
  };

  const remove = async (id: string) => {
    if (!user) return;
    if (!confirm('Are you sure you want to delete this consultation?')) return;
    
    try {
      const res = await safeDelete<ApiResponse<{ message: string }>>(`/api/admin/consultations/${id}`);
      if (res.success) {
        setItems(s => s.filter(it => it._id !== id));
        setError(null);
      } else {
        setError('Failed to delete consultation');
      }
    } catch (err: any) {
      console.error('Failed to delete consultation:', err);
      setError(err.message || 'Failed to delete consultation');
    }
  };

  if (!user) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:col-span-2">
        <h3 className="text-lg font-semibold mb-4">Consultations</h3>
        <div className="text-gray-500 text-center py-8">Please login to manage consultations</div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:col-span-2">
      <h3 className="text-lg font-semibold mb-4">Consultations</h3>

      {error && (
        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {loading && (
        <div className="text-gray-500 text-center py-8">Loading consultations...</div>
      )}
      
      {!loading && items.length === 0 && (
        <div className="text-gray-500 text-center py-8">No consultations found</div>
      )}
      
      {items.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-gray-600 border-b bg-gray-50">
              <tr>
                <th className="py-3 text-left font-medium">Name</th>
                <th className="py-3 text-left font-medium">Topic</th>
                <th className="py-3 text-left font-medium">Status</th>
                <th className="py-3 text-left font-medium">Date</th>
                <th className="py-3 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map(consultation => (
                <tr key={consultation._id} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="py-3">
                    <div className="font-medium text-gray-900">{consultation.name}</div>
                    <div className="text-xs text-gray-500">{consultation.email}</div>
                  </td>
                  <td className="py-3">
                    <div className="font-medium text-gray-700">
                      {consultation.projectType || 'General Inquiry'}
                    </div>
                    <div className="text-xs text-gray-500 truncate max-w-xs">
                      {consultation.message?.substring(0, 60)}...
                    </div>
                  </td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      consultation.status === 'new' 
                        ? 'bg-blue-100 text-blue-800' 
                        : consultation.status === 'contacted' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : consultation.status === 'in-progress' 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {consultation.status}
                    </span>
                  </td>
                  <td className="py-3 text-gray-600">
                    {new Date(consultation.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3">
                    <div className="flex gap-2 items-center">
                      <select 
                        value={consultation.status} 
                        onChange={(e) => updateStatus(consultation._id, e.target.value)} 
                        className="text-sm p-2 border rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                      <button 
                        onClick={() => remove(consultation._id)} 
                        className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}