'use client';
import React, { useEffect, useState } from 'react';
import { safeGet, safePost, safePut, safeDelete } from '../../lib/api';
import { useAuth } from '../../contexts/AuthContext';
import type { TeamMember, MessageResponse } from '../../lib/api';

interface TeamMemberForm {
  name: string;
  email: string;
  role: string;
  department?: string;
  position?: string;
  phone?: string;
}

export default function TeamTable() {
  const { user } = useAuth();
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [mutating, setMutating] = useState(false);
  const [form, setForm] = useState<TeamMemberForm>({
    name: '', email: '', role: '', department: '', position: '', phone: '',
  });
  const [editing, setEditing] = useState<TeamMember | null>(null);
  const [error, setError] = useState<string | null>(null);

  const resetForm = () =>
    setForm({ name: '', email: '', role: '', department: '', position: '', phone: '' });

  const loadMembers = async () => {
    try {
      setError(null);
      // Backend returns { teamMembers, pagination }
      const res = await safeGet<{ teamMembers: TeamMember[]; pagination: any }>('/admin/team');
      setMembers(res?.teamMembers || []);
    } catch (err: any) {
      console.error('Failed to load team members:', err);
      setError(err.message || 'Failed to load team members');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) loadMembers();
  }, [user]);

  const create = async () => {
    if (!form.name || !form.email || !form.role) {
      alert('Please fill in required fields: Name, Email, and Role');
      return;
    }
    if (!user) return;

    setMutating(true);
    try {
      // Backend returns { teamMember }
      const res = await safePost<{ teamMember: TeamMember }>('/admin/team', form);
      if (res?.teamMember) {
        await loadMembers();
        resetForm();
      } else {
        alert('Failed to create team member. Please try again.');
      }
    } catch (err: any) {
      console.error('Failed to create team member:', err);
      alert(err.message || 'Failed to create team member.');
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
      phone: member.phone || '',
    });
  };

  const save = async () => {
    if (!editing) return;

    setMutating(true);
    try {
      // Backend returns { teamMember }
      const res = await safePut<{ teamMember: TeamMember }>(`/admin/team/${editing._id}`, form);
      if (res?.teamMember) {
        await loadMembers();
        setEditing(null);
        resetForm();
      } else {
        alert('Failed to update team member. Please try again.');
      }
    } catch (err: any) {
      console.error('Failed to update team member:', err);
      alert(err.message || 'Failed to update team member.');
    } finally {
      setMutating(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm('Are you sure you want to delete this team member?') || !user) return;

    setMutating(true);
    try {
      await safeDelete<MessageResponse>(`/admin/team/${id}`);
      await loadMembers();
    } catch (err: any) {
      console.error('Failed to delete team member:', err);
      alert(err.message || 'Failed to delete team member.');
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
      case 'active':   return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'on-leave': return 'bg-yellow-100 text-yellow-800';
      default:         return 'bg-gray-100 text-gray-800';
    }
  };

  if (!user) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold mb-4">Team Members</h3>
        <div className="text-gray-500 text-center py-8">Please login to manage team</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="text-red-600 text-center py-8">
          Error: {error}
          <button onClick={loadMembers} className="ml-4 px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold mb-4">Team Members</h3>

      {/* Form */}
      <div className="mb-4 grid grid-cols-1 md:grid-cols-4 gap-2">
        <input
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          placeholder="Full Name *"
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          disabled={mutating}
        />
        <input
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          placeholder="Email *"
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          disabled={mutating}
        />
        <input
          value={form.role}
          onChange={e => setForm({ ...form, role: e.target.value })}
          placeholder="Role *"
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          disabled={mutating}
        />
        <div className="flex gap-2">
          {editing ? (
            <>
              <button
                onClick={save}
                disabled={mutating}
                className="flex-1 px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
              >
                {mutating ? 'Saving...' : 'Save'}
              </button>
              <button
                onClick={cancelEdit}
                disabled={mutating}
                className="flex-1 px-3 py-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={create}
              disabled={mutating}
              className="flex-1 px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
            >
              {mutating ? 'Adding...' : 'Add Member'}
            </button>
          )}
        </div>
      </div>

      {loading && <div className="text-gray-500 text-center py-8">Loading team members...</div>}
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
                  {member.position  && ` • ${member.position}`}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {member.email}
                  {member.phone && ` • ${member.phone}`}
                </div>
                {member.skills && member.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {member.skills.slice(0, 3).map((skill, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
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
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => startEdit(member)}
                  disabled={mutating}
                  className="text-indigo-600 hover:text-indigo-800 text-sm font-medium disabled:opacity-50"
                >
                  Edit
                </button>
                <button
                  onClick={() => remove(member._id)}
                  disabled={mutating}
                  className="text-red-600 hover:text-red-800 text-sm font-medium disabled:opacity-50"
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