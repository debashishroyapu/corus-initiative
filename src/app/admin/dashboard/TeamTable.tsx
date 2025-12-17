'use client';
import React, { useEffect, useState } from 'react';
import { safeGet, safePost, safePut, safeDelete } from '../../lib/api';
import { useAuth } from '../../contexts/AuthContext';

// Type definitions
interface TeamMember {
  _id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  position: string;
  phone?: string;
  avatar?: string;
  status: 'active' | 'inactive' | 'on-leave';
  joinDate: string;
  skills: string[];
  projects: string[];
  performance: number;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

interface TeamMemberForm {
  name: string;
  email: string;
  role: string;
  department?: string;
  position?: string;
  phone?: string;
}

export default function TeamTable() {
  const { admin } = useAuth();
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [mutating, setMutating] = useState(false);
  const [form, setForm] = useState<TeamMemberForm>({ 
    name: '', email: '', role: '', department: '', position: '', phone: ''
  });
  const [editing, setEditing] = useState<TeamMember | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Extract repeated form reset logic
  const resetForm = () => setForm({ 
    name: '', email: '', role: '', department: '', position: '', phone: ''
  });

  const loadMembers = async () => {
    try {
      setError(null);
      const res = await safeGet<ApiResponse<TeamMember[]>>('/api/admin/team');
      if (res.success) {
        setMembers(res.data || []);
      }
    } catch (err: any) {
      console.error('Failed to load team members:', err);
      setError(err.message || 'Failed to load team members');
    } finally { 
      setLoading(false); 
    }
  };

  useEffect(() => {
    loadMembers();
  }, []);

  const create = async () => {
    if (!form.name || !form.email || !form.role) {
      alert('Please fill in required fields: Name, Email, and Role');
      return;
    }

    // Check if user is admin
    if (!admin) {
      alert('Unauthorized access');
      return;
    }

    setMutating(true);
    try {
      const res = await safePost<ApiResponse<TeamMember>>('/api/admin/team', form);
      if (res.success) {
        // Refresh the data
        await loadMembers();
        resetForm();
      }
    } catch (err: any) { 
      console.error('Failed to create team member:', err);
      alert('Failed to create team member. Please try again.');
    } finally {
      setMutating(false);
    }
  };

  const startEdit = (member: TeamMember) => { 
    setEditing(member); 
    setForm({ 
      name: member.name, 
      email: member.email, 
      role: member.role,
      department: member.department,
      position: member.position,
      phone: member.phone || ''
    }); 
  };

  const save = async () => {
    if (!editing) return;
    
    setMutating(true);
    try {
      const res = await safePut<ApiResponse<TeamMember>>(`/api/admin/team/${editing._id}`, form);
      if (res.success) {
        // Refresh the data
        await loadMembers();
        setEditing(null);
        resetForm();
      }
    } catch (err: any) { 
      console.error('Failed to update team member:', err);
      alert('Failed to update team member. Please try again.');
    } finally {
      setMutating(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm('Are you sure you want to delete this team member?') || !admin) return;
    
    setMutating(true);
    try {
      const res = await safeDelete<ApiResponse<{ message: string }>>(`/api/admin/team/${id}`);
      if (res.success) {
        // Refresh the data
        await loadMembers();
      }
    } catch (err: any) { 
      console.error('Failed to delete team member:', err);
      alert('Failed to delete team member. Please try again.');
    } finally {
      setMutating(false);
    }
  };

  const cancelEdit = () => {
    setEditing(null);
    resetForm();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'on-leave': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Show error state if fetch failed
  if (error) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="text-red-600 text-center py-8">
          Error loading team members: {error}
          <button 
            onClick={loadMembers}
            className="ml-4 px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Team Members</h3>
        {admin && (
          <div className="text-sm text-gray-600">
            Logged in as: {admin.name} ({admin.role})
          </div>
        )}
      </div>

      <div className="mb-4 grid grid-cols-1 md:grid-cols-4 gap-2">
        <input 
          value={form.name} 
          onChange={e => setForm({...form, name: e.target.value})} 
          placeholder="Full Name *" 
          className="p-2 border rounded" 
          disabled={mutating}
        />
        <input 
          value={form.email} 
          onChange={e => setForm({...form, email: e.target.value})} 
          placeholder="Email *" 
          className="p-2 border rounded" 
          disabled={mutating}
        />
        <input 
          value={form.role} 
          onChange={e => setForm({...form, role: e.target.value})} 
          placeholder="Role *" 
          className="p-2 border rounded" 
          disabled={mutating}
        />
        <div className="flex gap-2">
          {editing ? (
            <>
              <button 
                onClick={save} 
                disabled={mutating || !admin}
                className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed"
              >
                {mutating ? 'Saving...' : 'Save'}
              </button>
              <button 
                onClick={cancelEdit} 
                disabled={mutating}
                className="px-3 py-2 border rounded hover:bg-gray-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            </>
          ) : (
            <button 
              onClick={create} 
              disabled={mutating || !admin}
              className="px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed"
            >
              {mutating ? 'Adding...' : 'Add Member'}
            </button>
          )}
        </div>
      </div>

      {loading && <div className="text-gray-500">Loading team members...</div>}
      {!loading && members.length === 0 && (
        <div className="text-gray-500 text-center py-8">No team members found</div>
      )}
      
      {members.length > 0 && (
        <div className="space-y-3">
          {members.map(member => (
            <div 
              key={member._id} 
              className="border border-gray-200 p-4 rounded-lg flex justify-between items-center hover:bg-gray-50"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h4 className="font-medium text-gray-900">{member.name}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(member.status)}`}>
                    {member.status}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">{member.role}</span>
                  {member.department && ` • ${member.department}`}
                  {member.position && ` • ${member.position}`}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {member.email} {member.phone && ` • ${member.phone}`}
                </div>
                {member.skills && member.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {member.skills.slice(0, 3).map((skill: string, index: number) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                      >
                        {skill}
                      </span>
                    ))}
                    {member.skills.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        +{member.skills.length - 3} more
                      </span>
                    )}
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => startEdit(member)} 
                  disabled={mutating || !admin}
                  className="text-indigo-600 hover:text-indigo-800 text-sm font-medium disabled:text-indigo-400 disabled:cursor-not-allowed"
                >
                  Edit
                </button>
                <button 
                  onClick={() => remove(member._id)} 
                  disabled={mutating || !admin}
                  className="text-red-600 hover:text-red-800 text-sm font-medium disabled:text-red-400 disabled:cursor-not-allowed"
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