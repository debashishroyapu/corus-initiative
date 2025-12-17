'use client';
import React, { useEffect, useState } from 'react';
import { safeGet, safePost, safePut, safeDelete } from '../../lib/api';
import { useAuth } from '../../contexts/AuthContext';

// Type definitions
interface Project {
  _id: string;
  name: string;
  client: string;
  status: 'planning' | 'active' | 'on-hold' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'critical';
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  progress: number;
  team: string[];
  description: string;
  technologies: string[];
  deliverables: string[];
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

interface ProjectForm {
  name: string;
  client: string;
  status: string;
  budget: number;
  description?: string;
  technologies?: string[];
}

export default function ProjectsTable() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Project | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<ProjectForm>({ 
    name: '', 
    client: '', 
    status: 'planning', 
    budget: 0 
  });
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    (async () => {
      try {
        const res = await safeGet<ApiResponse<Project[]>>('/api/admin/projects');
        if (res.success) {
          setProjects(res.data || []);
          setError(null);
        } else {
          setError('Failed to load projects');
        }
      } catch (err: any) {
        console.error('Load projects failed:', err);
        setError(err.message || 'Failed to load projects');
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  const startEdit = (project: Project) => { 
    setEditing(project); 
    setForm({ 
      name: project.name, 
      client: project.client, 
      status: project.status, 
      budget: project.budget 
    }); 
  };

  const create = async () => {
    if (!user) return;
    
    try {
      const res = await safePost<ApiResponse<Project>>('/api/admin/projects', form);
      if (res.success) {
        setProjects((s) => [res.data, ...s]);
        setForm({ name: '', client: '', status: 'planning', budget: 0 });
        setError(null);
      } else {
        setError('Failed to create project');
      }
    } catch (err: any) { 
      console.error('Create project failed:', err);
      setError(err.message || 'Failed to create project');
    }
  };

  const save = async () => {
    if (!user || !editing) return;
    
    try {
      const res = await safePut<ApiResponse<Project>>(`/api/admin/projects/${editing._id}`, form);
      if (res.success) {
        setProjects((s) => s.map(p => p._id === res.data._id ? res.data : p));
        setEditing(null);
        setForm({ name: '', client: '', status: 'planning', budget: 0 });
        setError(null);
      } else {
        setError('Failed to update project');
      }
    } catch (err: any) { 
      console.error('Update project failed:', err);
      setError(err.message || 'Failed to update project');
    }
  };

  const remove = async (id: string) => {
    if (!user) return;
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    try {
      const res = await safeDelete<ApiResponse<{ message: string }>>(`/api/admin/projects/${id}`);
      if (res.success) {
        setProjects((s) => s.filter(p => p._id !== id));
        setError(null);
      } else {
        setError('Failed to delete project');
      }
    } catch (err: any) { 
      console.error('Delete project failed:', err);
      setError(err.message || 'Failed to delete project');
    }
  };

  const cancelEdit = () => {
    setEditing(null);
    setForm({ name: '', client: '', status: 'planning', budget: 0 });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning': return 'bg-blue-100 text-blue-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'on-hold': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!user) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold mb-4">Projects</h3>
        <div className="text-gray-500 text-center py-8">Please login to manage projects</div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold mb-4">Projects</h3>

      {error && (
        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="mb-4 grid grid-cols-1 md:grid-cols-4 gap-2">
        <input 
          value={form.name} 
          onChange={e => setForm({...form, name: e.target.value})} 
          placeholder="Project Name" 
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input 
          value={form.client} 
          onChange={e => setForm({...form, client: e.target.value})} 
          placeholder="Client" 
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input 
          type="number" 
          value={form.budget} 
          onChange={e => setForm({...form, budget: Number(e.target.value)})} 
          placeholder="Budget" 
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <div className="flex gap-2">
          {editing ? (
            <>
              <button 
                onClick={save} 
                className="flex-1 px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                Save
              </button>
              <button 
                onClick={cancelEdit} 
                className="flex-1 px-3 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </>
          ) : (
            <button 
              onClick={create} 
              className="flex-1 px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
            >
              Create
            </button>
          )}
        </div>
      </div>

      {loading && (
        <div className="text-gray-500 text-center py-8">Loading projects...</div>
      )}
      
      {!loading && projects.length === 0 && (
        <div className="text-gray-500 text-center py-8">No projects found</div>
      )}
      
      {projects.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-gray-600 border-b bg-gray-50">
              <tr>
                <th className="py-3 text-left font-medium">Name</th>
                <th className="py-3 text-left font-medium">Client</th>
                <th className="py-3 text-left font-medium">Status</th>
                <th className="py-3 text-left font-medium">Budget</th>
                <th className="py-3 text-left font-medium">Progress</th>
                <th className="py-3 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map(project => (
                <tr key={project._id} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="py-3 font-medium text-gray-900">{project.name}</td>
                  <td className="py-3 text-gray-700">{project.client}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="py-3 font-semibold text-gray-900">
                    ${project.budget.toLocaleString()}
                  </td>
                  <td className="py-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500 mt-1">{project.progress}%</span>
                  </td>
                  <td className="py-3">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => startEdit(project)} 
                        className="px-3 py-1 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700 transition-colors"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => remove(project._id)} 
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