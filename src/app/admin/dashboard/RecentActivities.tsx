'use client';
import React from 'react';
import useAdminFetch from '../../admin/dashboard/useAdminFetch';
import { useAuth } from '../../contexts/AuthContext';

interface Activity {
  id: string;
  type: string;
  title: string;
  description: string;
  timestamp: string;
  icon: string;
  color: string;
  user?: string;
  priority: string;
  isRead: boolean;
}

interface ActivitiesResponse {
  success: boolean;
  data: Activity[];
}

export default function RecentActivities() {
  const { data, loading, error } = useAdminFetch<ActivitiesResponse>('/api/admin/activities/recent');
  const { user } = useAuth();

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user': return '👤';
      case 'project': return '📁';
      case 'client': return '💼';
      case 'blog': return '📝';
      case 'system': return '⚙️';
      default: return '📌';
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'user': return 'text-blue-600';
      case 'project': return 'text-green-600';
      case 'client': return 'text-purple-600';
      case 'blog': return 'text-orange-600';
      case 'system': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  if (!user) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
        <div className="text-gray-500 text-center py-8">Please login to view activities</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
        <div className="text-gray-500 text-center py-8">Loading activities...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
        <div className="text-red-600 text-center py-8">Error loading activities</div>
      </div>
    );
  }

  const activities = data?.data || [];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
      
      {activities.length === 0 ? (
        <div className="text-gray-500 text-center py-8">No recent activities</div>
      ) : (
        <div className="space-y-3">
          {activities.slice(0, 6).map((activity) => (
            <div 
              key={activity.id} 
              className="flex items-start gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <div className={`text-lg ${getActivityColor(activity.type)}`}>
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm text-gray-900 mb-1">
                  {activity.title}
                </div>
                <div className="text-xs text-gray-600 mb-1">
                  {activity.description}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">
                    {new Date(activity.timestamp).toLocaleDateString()} • {activity.user || 'System'}
                  </span>
                  {activity.priority === 'high' && (
                    <span className="px-1.5 py-0.5 bg-red-100 text-red-800 text-xs rounded">
                      High
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {activities.length > 6 && (
        <div className="mt-4 pt-3 border-t border-gray-100">
          <button className="w-full text-center text-sm text-indigo-600 hover:text-indigo-800 font-medium">
            View All Activities
          </button>
        </div>
      )}
    </div>
  );
}