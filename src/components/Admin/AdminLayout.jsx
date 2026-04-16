import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, Cpu, User } from 'lucide-react';

const AdminLayout = ({ children, title = 'Admin Panel' }) => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white flex flex-col fixed inset-y-0 z-50">
        <div className="p-6 text-2xl font-bold border-b border-slate-800">Admin Panel</div>
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/admin/dashboard" className="flex items-center gap-3 w-full p-3 hover:bg-slate-800 rounded-lg transition-colors text-slate-400">
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>
          <Link to="/admin/projects" className="flex items-center gap-3 w-full p-3 hover:bg-slate-800 rounded-lg transition-colors text-slate-400">
            <FolderKanban size={20} />
            <span>Projects</span>
          </Link>
          <Link to="/admin/abouts" className="flex items-center gap-3 w-full p-3 hover:bg-slate-800 rounded-lg transition-colors text-slate-400">
            <User size={20} />
            <span>About</span>
          </Link>
          <Link to="/admin/skills" className="flex items-center gap-3 w-full p-3 hover:bg-slate-800 rounded-lg transition-colors text-slate-400">
            <Cpu size={20} />
            <span>Skills</span>
          </Link>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={handleLogout}
            className="w-full p-3 bg-red-600/10 text-red-500 hover:bg-red-600 hover:text-white rounded-lg transition-all font-semibold border border-red-500/20"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col ml-64">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center px-8 h-16 sticky top-0 z-40">
          <h1 className="text-lg font-semibold text-gray-800">{title}</h1>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-sm font-bold text-gray-900">{user?.name || 'Admin'}</div>
              <div className="text-xs text-gray-500">{user?.email || 'admin@example.com'}</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
            </div>
          </div>
        </header>
        
        {/* Page Content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
