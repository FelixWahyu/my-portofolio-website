import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, Cpu, User, Menu, X, LogOut } from 'lucide-react';
import Swal from 'sweetalert2';
import { cn } from '../../utils/cn';

const AdminLayout = ({ children, title = 'Admin Panel' }) => {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: 'Sign Out?',
      text: "Are you sure you want to end your session?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#0f172a',
      cancelButtonColor: '#f1f5f9',
      confirmButtonText: 'Yes, Sign Out',
      cancelButtonText: 'Cancel',
      customClass: {
        confirmButton: 'px-6 py-2.5 rounded-xl font-bold',
        cancelButton: 'px-6 py-2.5 rounded-xl font-bold text-slate-600 border border-slate-200'
      },
      buttonsStyling: false
    });

    if (result.isConfirmed) {
      await logout();
    }
  };

  const navItems = [
    { to: '/admin/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { to: '/admin/projects', icon: <FolderKanban size={20} />, label: 'Projects' },
    { to: '/admin/abouts', icon: <User size={20} />, label: 'About' },
    { to: '/admin/skills', icon: <Cpu size={20} />, label: 'Skills' },
  ];


  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans text-slate-900">
      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - White Theme */}
      <aside className={cn(
        "w-72 bg-white border-r border-slate-200 flex flex-col fixed inset-y-0 z-50 transition-transform duration-300 ease-in-out lg:translate-x-0 shadow-sm",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-8 flex items-center justify-between border-b border-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20">
              A
            </div>
            <span className="text-xl font-black tracking-tight text-slate-900">Admin<span className="text-blue-600">Panel</span></span>
          </div>
          <button 
            className="lg:hidden p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-400"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 p-6 space-y-1.5 overflow-y-auto">
          <div className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 ml-3">Main Menu</div>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {({ isActive }) => (
                <div className={cn(
                  "flex items-center gap-3.5 w-full p-3.5 rounded-2xl transition-all duration-300 group relative",
                  isActive 
                    ? "bg-blue-50 text-blue-600 font-bold" 
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                )}>
                  <div className={cn(
                    "p-2 rounded-xl transition-all duration-300 group-hover:scale-110",
                    isActive ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30" : ""
                  )}>
                    {item.icon}
                  </div>
                  <span className="tracking-tight">{item.label}</span>
                  <span className={cn(
                    "absolute right-4 w-1.5 h-1.5 rounded-full bg-blue-600 scale-0 transition-transform duration-300",
                    isActive && "scale-100"
                  )} />
                </div>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-50">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 p-4 bg-white text-red-500 hover:bg-red-50 hover:border-red-100 rounded-2xl transition-all duration-300 font-bold border border-slate-100 group shadow-sm active:scale-[0.98]"
          >
            <LogOut size={18} className="transition-transform group-hover:-translate-x-1" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:ml-72 transition-all duration-300">
        {/* Header - Transparent/White */}
        <header className="bg-white/70 backdrop-blur-xl border-b border-slate-200 p-4 flex justify-between items-center px-6 lg:px-10 h-20 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-3 bg-white border border-slate-100 text-slate-600 rounded-2xl hover:bg-slate-50 transition-all active:scale-95 shadow-sm"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
            <div>
              <h1 className="text-xl font-black text-slate-900 tracking-tight">{title}</h1>
              <p className="hidden sm:block text-[11px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Control Center</p>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <div className="hidden sm:block text-right">
              <div className="text-sm font-black text-slate-900 leading-tight">{user?.name || 'Admin'}</div>
              <div className="text-[11px] text-slate-400 font-bold tracking-tight">{user?.email || 'admin@example.com'}</div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-white border-2 border-slate-100 p-1 shadow-sm hover:border-blue-200 transition-colors group cursor-pointer">
              <div className="w-full h-full rounded-[10px] bg-slate-50 flex items-center justify-center text-slate-600 font-black text-lg group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
              </div>
            </div>
          </div>
        </header>
        
        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>

  );
};

export default AdminLayout;

