'use client';
import React from 'react';

interface Blog {
  _id: string;
  title: string;
  slug: string;
  publishedAt?: string;
  views?: number;
}

interface CaseStudy {
  _id: string;
  title: string;
  slug: string;
  industry?: string;
  client?: string;
  createdAt?: string;
}

interface Project {
  _id: string;
  name: string;
  client: string;
  status: string;
  progress?: number;
}

interface Consultation {
  _id: string;
  name: string;
  email: string;
  status: string;
  createdAt?: string;
}

interface RecentActivitiesData {
  blogs?: Blog[];
  caseStudies?: CaseStudy[];
  projects?: Project[];
  consultations?: Consultation[];
}

interface Props {
  activities?: RecentActivitiesData;
}

export default function RecentActivities({ activities }: Props) {
  if (!activities) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
        <div className="text-gray-500 text-center py-8">No recent activities</div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':      return 'bg-green-100 text-green-800';
      case 'completed':   return 'bg-blue-100 text-blue-800';
      case 'planning':    return 'bg-yellow-100 text-yellow-800';
      case 'pending':     return 'bg-orange-100 text-orange-800';
      case 'on-hold':     return 'bg-gray-100 text-gray-800';
      default:            return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>

      <div className="space-y-5">

        {/* Recent Consultations */}
        {activities.consultations && activities.consultations.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Consultations
            </h4>
            <div className="space-y-2">
              {activities.consultations.slice(0, 3).map(c => (
                <div key={c._id} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{c.name}</div>
                    <div className="text-xs text-gray-500">{c.email}</div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(c.status)}`}>
                    {c.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Projects */}
        {activities.projects && activities.projects.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Projects
            </h4>
            <div className="space-y-2">
              {activities.projects.slice(0, 3).map(p => (
                <div key={p._id} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{p.name}</div>
                    <div className="text-xs text-gray-500">{p.client}</div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(p.status)}`}>
                    {p.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Blogs */}
        {activities.blogs && activities.blogs.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Blog Posts
            </h4>
            <div className="space-y-2">
              {activities.blogs.slice(0, 3).map(b => (
                <div key={b._id} className="p-2 rounded-lg hover:bg-gray-50">
                  <div className="text-sm font-medium text-gray-900 truncate">{b.title}</div>
                  {b.publishedAt && (
                    <div className="text-xs text-gray-500">
                      {new Date(b.publishedAt).toLocaleDateString()}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Case Studies */}
        {activities.caseStudies && activities.caseStudies.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Case Studies
            </h4>
            <div className="space-y-2">
              {activities.caseStudies.slice(0, 3).map(cs => (
                <div key={cs._id} className="p-2 rounded-lg hover:bg-gray-50">
                  <div className="text-sm font-medium text-gray-900 truncate">{cs.title}</div>
                  {cs.industry && (
                    <div className="text-xs text-gray-500">{cs.industry}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* সব empty হলে */}
        {!activities.consultations?.length && !activities.projects?.length &&
         !activities.blogs?.length && !activities.caseStudies?.length && (
          <div className="text-gray-500 text-center py-4">No recent activities</div>
        )}
      </div>
    </div> 
  );
}