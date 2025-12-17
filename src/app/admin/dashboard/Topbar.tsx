'use client';
import { Bell, Search } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function Topbar() {
  const { admin } = useAuth();
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
      <div className="flex items-center gap-4">
        <div className="text-lg font-semibold">Dashboard</div>
        <div className="relative">
          <input placeholder="Search..." className="px-3 py-2 rounded-md border border-gray-200" />
          <Search className="absolute right-2 top-2 w-4 h-4 text-gray-400" />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-gray-100"><Bell className="w-5 h-5 text-gray-600" /></button>
        <div className="text-sm text-gray-700">{admin?.name}</div>
      </div>
    </header>
  );
}
