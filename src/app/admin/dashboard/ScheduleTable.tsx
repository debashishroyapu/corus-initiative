'use client';
import React, { useEffect, useState } from 'react';
import { safeGet, safePut, safeDelete } from '../../lib/api';
import { useAuth } from '../../contexts/AuthContext';

interface Schedule {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  meetingType: 'consultation' | 'demo' | 'technical' | 'sales' | 'other';
  preferredDate: string;
  preferredTime: string;
  timezone: string;
  message?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  meetingLink?: string;
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export default function ScheduleTable() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    (async () => {
      try {
        const res = await safeGet<ApiResponse<Schedule[]>>('/api/admin/schedules');
        if (res.success) {
          setSchedules(res.data || []);
          setError(null);
        } else {
          setError('Failed to load schedules');
        }
      } catch (err: any) {
        console.error('Failed to load schedules:', err);
        setError(err.message || 'Failed to load schedules');
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  const updateStatus = async (id: string, status: string, meetingLink?: string) => {
    if (!user) return;
    
    try {
      const res = await safePut<ApiResponse<Schedule>>(`/api/admin/schedules/${id}`, { 
        status, 
        meetingLink 
      });
      if (res.success) {
        setSchedules(s => s.map(sched => sched._id === res.data._id ? res.data : sched));
        setError(null);
      } else {
        setError('Failed to update schedule');
      }
    } catch (err: any) {
      console.error('Failed to update schedule:', err);
      setError(err.message || 'Failed to update schedule');
    }
  };

  const remove = async (id: string) => {
    if (!user) return;
    if (!confirm('Are you sure you want to delete this schedule?')) return;
    
    try {
      const res = await safeDelete<ApiResponse<{ message: string }>>(`/api/admin/schedules/${id}`);
      if (res.success) {
        setSchedules(s => s.filter(sched => sched._id !== id));
        setError(null);
      } else {
        setError('Failed to delete schedule');
      }
    } catch (err: any) {
      console.error('Failed to delete schedule:', err);
      setError(err.message || 'Failed to delete schedule');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      case 'completed': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getMeetingTypeIcon = (type: string) => {
    switch (type) {
      case 'consultation': return '💬';
      case 'demo': return '🎯';
      case 'technical': return '⚙️';
      case 'sales': return '💰';
      default: return '📅';
    }
  };

  if (!user) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold mb-4">Scheduled Meetings</h3>
        <div className="text-gray-500 text-center py-8">Please login to manage schedules</div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold mb-4">Scheduled Meetings</h3>

      {error && (
        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      
      {loading && (
        <div className="text-gray-500 text-center py-8">Loading schedules...</div>
      )}
      
      {!loading && schedules.length === 0 && (
        <div className="text-gray-500 text-center py-8">No scheduled meetings</div>
      )}
      
      {schedules.length > 0 && (
        <div className="space-y-4">
          {schedules.map(schedule => (
            <div key={schedule._id} className="border border-gray-200 p-4 rounded-lg hover:shadow-sm transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-start gap-3">
                  <div className="text-2xl mt-1">
                    {getMeetingTypeIcon(schedule.meetingType)}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{schedule.name}</h4>
                    <p className="text-sm text-gray-600">{schedule.email}</p>
                    {schedule.company && (
                      <p className="text-sm text-gray-500">{schedule.company}</p>
                    )}
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(schedule.status)}`}>
                  {schedule.status}
                </span>
              </div>
              
              <div className="text-sm text-gray-600 mb-3 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Type:</span>
                  <span className="capitalize">{schedule.meetingType}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Date:</span>
                  <span>{new Date(schedule.preferredDate).toLocaleDateString()} at {schedule.preferredTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Timezone:</span>
                  <span>{schedule.timezone}</span>
                </div>
              </div>

              {schedule.message && (
                <div className="mb-3 p-2 bg-gray-50 rounded text-sm text-gray-600">
                  {schedule.message}
                </div>
              )}

              <div className="flex gap-2 pt-2 border-t border-gray-100">
                <select 
                  value={schedule.status} 
                  onChange={(e) => updateStatus(schedule._id, e.target.value)}
                  className="flex-1 text-sm p-2 border rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="completed">Completed</option>
                </select>
                
                <button 
                  onClick={() => remove(schedule._id)}
                  className="px-3 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}