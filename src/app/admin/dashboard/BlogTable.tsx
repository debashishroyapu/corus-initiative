'use client';
import React, { useEffect, useState } from 'react';
import { safeGet, safePost, safePut, safeDelete } from '../../lib/api';
import Editor from './Editor';
import { useAuth } from '../../contexts/AuthContext';

// Type definitions
interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author?: string;
  category?: string;
  status?: 'draft' | 'published';
  tags?: string[];
  readTime?: number;
  createdAt?: string;
  updatedAt?: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export default function BlogsTable() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Blog | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    (async () => {
      try {
        const res = await safeGet<ApiResponse<Blog[]>>('/api/admin/blogs');
        if (res.success) {
          setBlogs(res.data || []);
        } else {
          setError('Failed to load blogs');
        }
      } catch (err: any) { 
        console.error('Failed to fetch blogs:', err);
        setError(err.message || 'Failed to load blogs');
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  const create = async (payload: any) => {
    if (!user) return;
    
    try {
      const res = await safePost<ApiResponse<Blog>>('/api/admin/blogs', payload);
      if (res.success) {
        setBlogs(s => [res.data, ...s]);
        setError(null);
      } else {
        setError('Failed to create blog');
      }
    } catch (err: any) { 
      console.error('Failed to create blog:', err);
      setError(err.message || 'Failed to create blog');
    }
  };

  const update = async (id: string, payload: any) => {
    if (!user) return;
    
    try {
      const res = await safePut<ApiResponse<Blog>>(`/api/admin/blogs/${id}`, payload);
      if (res.success) {
        setBlogs(s => s.map(b => b._id === res.data._id ? res.data : b));
        setEditing(null);
        setError(null);
      } else {
        setError('Failed to update blog');
      }
    } catch (err: any) { 
      console.error('Failed to update blog:', err);
      setError(err.message || 'Failed to update blog');
    }
  };

  const remove = async (id: string) => {
    if (!user) return;
    if (!confirm('Are you sure you want to delete this blog?')) return;
    
    try {
      const res = await safeDelete<ApiResponse<{ message: string }>>(`/api/admin/blogs/${id}`);
      if (res.success) {
        setBlogs(s => s.filter(b => b._id !== id));
        setError(null);
      } else {
        setError('Failed to delete blog');
      }
    } catch (err: any) { 
      console.error('Failed to delete blog:', err);
      setError(err.message || 'Failed to delete blog');
    }
  };

  if (!user) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold mb-4">Blogs</h3>
        <div className="text-gray-500 text-center py-8">Please login to manage blogs</div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold mb-4">Blogs</h3>

      {error && (
        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="mb-4">
        <Editor onSave={(payload) => create(payload)} />
      </div>

      {loading && (
        <div className="text-gray-500 text-center py-8">Loading blogs...</div>
      )}
      
      {!loading && blogs.length === 0 && (
        <div className="text-gray-500 text-center py-8">No blogs found</div>
      )}
      
      {blogs.length > 0 && (
        <div className="space-y-3">
          {blogs.map(blog => (
            <div 
              key={blog._id} 
              className="border border-gray-200 p-4 rounded-lg flex justify-between items-center hover:bg-gray-50"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-gray-900">{blog.title}</h4>
                  {blog.status && (
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      blog.status === 'published' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {blog.status}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-2">{blog.excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  {blog.category && (
                    <span>Category: {blog.category}</span>
                  )}
                  {blog.readTime && (
                    <span>Read time: {blog.readTime} min</span>
                  )}
                  {blog.createdAt && (
                    <span>Created: {new Date(blog.createdAt).toLocaleDateString()}</span>
                  )}
                </div>
              </div>
              <div className="flex gap-2 ml-4">
                <button 
                  onClick={() => setEditing(blog)} 
                  className="px-3 py-1 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700 transition-colors"
                >
                  Edit
                </button>
                <button 
                  onClick={() => remove(blog._id)} 
                  className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <div className="mt-6 p-4 border border-gray-200 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-semibold text-lg">Edit Blog</h4>
            <button 
              onClick={() => setEditing(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          <Editor 
            initial={editing} 
            onSave={(payload) => update(editing._id, payload)} 
          />
        </div>
      )}
    </div>
  );
}