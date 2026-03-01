'use client';
import React, { useEffect, useState } from 'react';
import { safeGet, safePost, safePut, safeDelete } from '../../lib/api';
import { useAuth } from '../../contexts/AuthContext';

interface Client {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  company: string;
  industry?: string;
  status?: 'active' | 'inactive' | 'lead';
  totalProjects?: number;
  totalRevenue?: number;
  lastContact?: string;
  joinDate?: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface ClientForm {
  name: string;
  email: string;
  company: string;
  phone?: string;
  industry?: string;
}

// ✅ Controller returns { clients: [], pagination: {} }
interface ClientListResponse {
  clients: Client[];
  pagination: { page: number; limit: number; total: number; pages: number };
}

// ✅ Controller returns { client: {} }
interface ClientSingleResponse {
  client: Client;
}

export default function ClientsTable() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<ClientForm>({ name: '', email: '', company: '' });
  const [editing, setEditing] = useState<Client | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    (async () => {
      try {
        const data = await safeGet<ClientListResponse>('/admin/clients');
        if (data?.clients) {
          setClients(data.clients);
        } else {
          setError('Failed to load clients');
        }
      } catch (err) {
        setError('Failed to load clients');
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  const create = async () => {
    if (!user) return;
    try {
      const data = await safePost<ClientSingleResponse>('/admin/clients', form);
      if (data?.client) {
        setClients(s => [data.client, ...s]);
        setForm({ name: '', email: '', company: '' });
        setError(null);
      } else {
        setError('Failed to create client');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to create client');
    }
  };

  const startEdit = (client: Client) => {
    setEditing(client);
    setForm({
      name: client.name,
      email: client.email,
      company: client.company,
      phone: client.phone || '',
      industry: client.industry || '',
    });
  };

  const save = async () => {
    if (!user || !editing) return;
    try {
      const data = await safePut<ClientSingleResponse>(`/admin/clients/${editing._id}`, form);
      if (data?.client) {
        setClients(s => s.map(c => c._id === data.client._id ? data.client : c));
        setEditing(null);
        setForm({ name: '', email: '', company: '' });
        setError(null);
      } else {
        setError('Failed to update client');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to update client');
    }
  };

  const remove = async (id: string) => {
    if (!user) return;
    if (!confirm('Are you sure you want to delete this client?')) return;
    try {
      const result = await safeDelete<{}>(`/admin/clients/${id}`);
      if (result !== null) {
        setClients(s => s.filter(c => c._id !== id));
        setError(null);
      } else {
        setError('Failed to delete client');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to delete client');
    }
  };

  const cancelEdit = () => {
    setEditing(null);
    setForm({ name: '', email: '', company: '' });
  };

  if (!user) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold mb-4">Clients</h3>
        <div className="text-gray-500 text-center py-8">Please login to manage clients</div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold mb-4">Clients</h3>

      {error && (
        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>
      )}

      <div className="mb-4 grid grid-cols-1 md:grid-cols-4 gap-2">
        <input
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          placeholder="Name"
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          placeholder="Email"
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          value={form.company}
          onChange={e => setForm({ ...form, company: e.target.value })}
          placeholder="Company"
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <div className="flex gap-2">
          {editing ? (
            <>
              <button onClick={save} className="flex-1 px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">Save</button>
              <button onClick={cancelEdit} className="flex-1 px-3 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors">Cancel</button>
            </>
          ) : (
            <button onClick={create} className="flex-1 px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors">Create</button>
          )}
        </div>
      </div>

      {loading && <div className="text-gray-500 text-center py-8">Loading clients...</div>}
      {!loading && clients.length === 0 && <div className="text-gray-500 text-center py-8">No clients found</div>}

      {clients.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-gray-600 border-b">
              <tr>
                <th className="py-2 text-left">Name</th>
                <th className="py-2 text-left">Email</th>
                <th className="py-2 text-left">Company</th>
                <th className="py-2 text-left">Status</th>
                <th className="py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients.map(client => (
                <tr key={client._id} className="border-b hover:bg-gray-50">
                  <td className="py-2">{client.name}</td>
                  <td className="py-2">{client.email}</td>
                  <td className="py-2">{client.company}</td>
                  <td className="py-2">
                    {client.status && (
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        client.status === 'active' ? 'bg-green-100 text-green-800'
                        : client.status === 'inactive' ? 'bg-gray-100 text-gray-800'
                        : 'bg-blue-100 text-blue-800'
                      }`}>
                        {client.status}
                      </span>
                    )}
                  </td>
                  <td className="py-2">
                    <div className="flex gap-2">
                      <button onClick={() => startEdit(client)} className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">Edit</button>
                      <button onClick={() => remove(client._id)} className="text-red-600 hover:text-red-800 text-sm font-medium">Delete</button>
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