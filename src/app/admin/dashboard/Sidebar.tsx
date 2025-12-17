'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart3, Users, FileText, FolderOpen, Grid, Layers, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const links = [
  { href: '/admin', label: 'Dashboard', icon: BarChart3 },
  { href: '/admin/projects', label: 'Projects', icon: Layers },
  { href: '/admin/clients', label: 'Clients', icon: Users },
  { href: '/admin/team', label: 'Team', icon: Grid },
  { href: '/admin/consultations', label: 'Consultations', icon: FolderOpen },
  { href: '/admin/solutions', label: 'Solutions', icon: FileText },
  { href: '/admin/blogs', label: 'Blogs', icon: FileText },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { logout, admin } = useAuth();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 text-2xl font-bold">Admin Panel</div>
      <nav className="flex-1 px-3 space-y-1">
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100 ${
              pathname === href ? 'bg-gray-100 font-semibold' : ''
            }`}
          >
            <Icon className="w-5 h-5 mr-2" /> {label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t">
        <div className="text-xs text-gray-500">Signed in as</div>
        <div className="text-sm font-medium text-gray-900 truncate">{admin?.email}</div>
        <button
          onClick={() => logout()}
          className="mt-4 w-full text-left text-red-600 flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-50"
        >
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>
    </aside>
  );
}
