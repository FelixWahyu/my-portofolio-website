import React from 'react';
import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    // Redirect is handled naturally if the app re-renders or via ProtectedRoute
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6 text-2xl font-bold border-b border-slate-800">Admin Panel</div>
        <nav className="flex-1 p-4 space-y-2">
          <button className="w-full text-left p-3 bg-blue-600 rounded-lg font-medium">Dashboard</button>
          <button className="w-full text-left p-3 hover:bg-slate-800 rounded-lg transition-colors text-slate-400">Projects</button>
          <button className="w-full text-left p-3 hover:bg-slate-800 rounded-lg transition-colors text-slate-400">Skills</button>
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center px-8 h-16">
          <h1 className="text-lg font-semibold text-gray-800">Dashboard Overview</h1>
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
        
        <main className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider">Total Projects</h3>
              <p className="text-3xl font-bold text-gray-900 mt-2">12</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider">Total Skills</h3>
              <p className="text-3xl font-bold text-gray-900 mt-2">24</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider">Active Sessions</h3>
              <p className="text-3xl font-bold text-gray-900 mt-2">1</p>
            </div>
          </div>

          <div className="mt-8 bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Quick Actions</h2>
            <div className="flex gap-4">
              <button className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all shadow-md shadow-blue-500/20 active:scale-95">
                Add New Project
              </button>
              <button className="px-6 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-all active:scale-95 border border-gray-200">
                Edit About Me
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
