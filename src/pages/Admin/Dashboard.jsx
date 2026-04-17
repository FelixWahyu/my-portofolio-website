import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { 
  Projector, 
  Cpu, 
  Users, 
  ArrowUpRight, 
  PlusCircle, 
  UserPen 
} from 'lucide-react';
import AdminLayout from '../../components/Admin/AdminLayout';

const Dashboard = () => {
  const { user } = useAuth();

  const stats = [
    { 
      label: 'Total Projects', 
      value: '12', 
      icon: <Projector className="text-blue-600" size={24} />, 
      color: 'bg-blue-50',
      trend: '+2 this month'
    },
    { 
      label: 'Total Skills', 
      value: '24', 
      icon: <Cpu className="text-indigo-600" size={24} />, 
      color: 'bg-indigo-50',
      trend: 'Expert level'
    },
    { 
      label: 'Active Sessions', 
      value: '1', 
      icon: <Users className="text-emerald-600" size={24} />, 
      color: 'bg-emerald-50',
      trend: 'Current user'
    },
  ];

  return (
    <AdminLayout title="Dashboard Overview">
      <div className="p-6 lg:p-10 space-y-10">
        {/* Welcome Section - Light Theme */}
        <section className="relative overflow-hidden bg-white rounded-[2.5rem] p-8 lg:p-14 border border-slate-200 shadow-sm transition-all duration-500 hover:shadow-xl hover:shadow-slate-200/50">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-xs font-black uppercase tracking-widest mb-6 border border-blue-100/50">
              <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
              System Online
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-6">
              Welcome back, <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                {user?.name || 'Administrator'}
              </span>
            </h2>
            <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-xl">
              Your professional portfolio is performing at its peak. You have 2 new insights to review and your latest project sync was successful.
            </p>
          </div>
          {/* Decorative Elements - Subtle & Light */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-blue-100/40 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-0 translate-y-1/4 w-80 h-80 bg-indigo-100/30 rounded-full blur-[80px]" />
        </section>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-slate-200/60 hover:-translate-y-1 transition-all duration-500 group relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                  <div className={`p-4 ${stat.color} rounded-2xl transition-all duration-500 group-hover:bg-blue-600 group-hover:text-white group-hover:rotate-6 group-hover:shadow-lg group-hover:shadow-blue-500/20`}>
                    {stat.icon}
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-blue-50 group-hover:text-blue-500 transition-all">
                    <ArrowUpRight size={20} />
                  </div>
                </div>
                <h3 className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">{stat.label}</h3>
                <div className="flex items-baseline gap-3 mt-2">
                  <span className="text-4xl font-black text-slate-900 tracking-tight">{stat.value}</span>
                  <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-tighter border border-emerald-100">{stat.trend}</span>
                </div>
              </div>
              {/* Subtle accent line */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>

        {/* Quick Actions & Recent Activity */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
          <div className="bg-white p-8 lg:p-12 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h2 className="text-2xl font-black text-slate-900 mb-10 flex items-center gap-3">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <button className="flex items-center justify-center gap-3 px-8 py-6 bg-slate-900 text-white font-black rounded-3xl hover:bg-black transition-all shadow-xl shadow-slate-200 active:scale-95 group">
                <PlusCircle size={24} className="transition-transform group-hover:rotate-90" />
                New Project
              </button>
              <Link to="/admin/abouts" className="flex items-center justify-center gap-3 px-8 py-6 bg-white text-slate-900 font-black rounded-3xl hover:bg-slate-50 transition-all active:scale-95 border border-slate-200 shadow-sm hover:border-slate-300">
                <UserPen size={24} className="text-blue-600" />
                Manage Bio
              </Link>
            </div>
          </div>

          <div className="bg-white p-8 lg:p-12 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-2xl font-black text-slate-900">Recent Insights</h2>
              <button className="text-xs font-black text-blue-600 hover:tracking-widest transition-all uppercase tracking-tight">View Journal</button>
            </div>
            <div className="space-y-6">
              {[1, 2].map((_, i) => (
                <div key={i} className="flex gap-5 p-5 rounded-3xl hover:bg-slate-50 transition-all cursor-pointer border border-transparent hover:border-slate-100 group">
                  <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:shadow-md transition-all">
                    <ArrowUpRight size={22} />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-base">Security audit passed</h4>
                    <p className="text-sm text-slate-500 font-medium">Your account session was verified successfully across 2 devices.</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>

  );
};

export default Dashboard;

