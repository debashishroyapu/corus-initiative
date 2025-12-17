'use client';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

type EditorProps = {
  initial?: any;
  onSave?: (payload: any) => void;
  onCancel?: () => void;
};

export default function Editor({ initial, onSave, onCancel }: EditorProps) {
  const [title, setTitle] = useState(initial?.title ?? '');
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? '');
  const [content, setContent] = useState(initial?.content ?? '');
  const [category, setCategory] = useState(initial?.category ?? '');
  const [status, setStatus] = useState(initial?.status ?? 'draft');
  const { user } = useAuth();

  useEffect(() => {
    if (initial) {
      setTitle(initial.title || '');
      setExcerpt(initial.excerpt || '');
      setContent(initial.content || '');
      setCategory(initial.category || '');
      setStatus(initial.status || 'draft');
    }
  }, [initial]);

  const handleSave = () => {
    if (!user) {
      alert('Please login to save content');
      return;
    }

    const payload = { 
      title, 
      excerpt, 
      content, 
      contentHtml: content,
      category,
      status
    };
    
    if (onSave) {
      onSave(payload);
    } else {
      console.log('Editor payload:', payload);
      alert('No onSave handler provided');
    }
    
    // Clear form if not in edit mode
    if (!initial) {
      setTitle('');
      setExcerpt('');
      setContent('');
      setCategory('');
      setStatus('draft');
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      setTitle('');
      setExcerpt('');
      setContent('');
      setCategory('');
      setStatus('draft');
    }
  };

  if (!user) {
    return (
      <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
        <div className="text-gray-500 text-center py-4">
          Please login to use the editor
        </div>
      </div>
    );
  }

  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white">
      <h4 className="font-semibold mb-3 text-gray-800">
        {initial ? 'Edit Blog Post' : 'Create New Blog Post'}
      </h4>
      
      <div className="space-y-3">
        <input 
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500" 
          placeholder="Title" 
          value={title} 
          onChange={e => setTitle(e.target.value)} 
        />
        
        <input 
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500" 
          placeholder="Excerpt" 
          value={excerpt} 
          onChange={e => setExcerpt(e.target.value)} 
        />
        
        <div className="grid grid-cols-2 gap-3">
          <input 
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500" 
            placeholder="Category" 
            value={category} 
            onChange={e => setCategory(e.target.value)} 
          />
          
          <select 
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={status}
            onChange={e => setStatus(e.target.value)}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
        
        <textarea 
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[120px]" 
          placeholder="Content" 
          value={content} 
          onChange={e => setContent(e.target.value)} 
        />
        
        <div className="flex gap-2 pt-2">
          <button 
            onClick={handleSave} 
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors font-medium"
          >
            {initial ? 'Update' : 'Create'}
          </button>
          
          <button 
            onClick={handleCancel} 
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
          >
            {initial ? 'Cancel' : 'Clear'}
          </button>
        </div>
      </div>
    </div>
  );
}