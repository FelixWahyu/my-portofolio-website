import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/Admin/AdminLayout';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <AdminLayout title="Dashboard Overview">
      <div className="p-8">
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
            <Link to="/admin/abouts" className="px-6 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-all active:scale-95 border border-gray-200 text-center">
              Edit About Me
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
