import React, { useState, useEffect } from "react";
import { ExternalLink, Github, Loader2, AlertCircle, Code2 } from "lucide-react";
import api from "../../utils/axios";
import { getImageUrl } from "../../utils/image";
import Button from "../Elements/Button";

export const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await api.get("/api/projects");
        setProjects(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("Gagal memuat proyek. Silakan coba lagi nanti.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section id="projects" className="py-24 px-4 relative bg-[#F8FAFC]">
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 right-[10%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-40 left-[10%] w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px] animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-2xl text-xs font-black uppercase tracking-[0.2em] border border-blue-100 mb-2">
            <Code2 size={16} />
            <span>Portfolio</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight">
            Proyek <span className="text-blue-600">Unggulan</span>
          </h2>
          <div className="w-24 h-2 bg-blue-600 mx-auto rounded-full mt-6" />
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 text-slate-400">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-blue-100 rounded-full animate-ping absolute" />
              <Loader2 className="animate-spin text-blue-600 relative z-10" size={64} strokeWidth={1.5} />
            </div>
            <p className="font-black text-xs uppercase tracking-[0.4em] mt-12 animate-pulse">Menghubungkan ke Database...</p>
          </div>
        ) : error ? (
          <div className="max-w-md mx-auto bg-red-50 border-2 border-red-100 p-12 rounded-[2.5rem] text-center space-y-6">
            <div className="w-20 h-20 bg-white rounded-[2rem] flex items-center justify-center text-red-500 mx-auto shadow-xl shadow-red-500/10">
              <AlertCircle size={40} />
            </div>
            <h3 className="font-black text-slate-900 text-xl tracking-tight">{error}</h3>
            <button 
              onClick={() => window.location.reload()}
              className="px-8 py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-black transition-all active:scale-95 shadow-2xl shadow-slate-200 text-sm"
            >
              Coba Lagi
            </button>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[3rem] border border-slate-100 shadow-sm p-10">
            <p className="text-slate-400 font-bold text-xl">Belum ada proyek yang ditampilkan.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-10">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-xl hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 flex flex-col"
                style={{
                  animationDelay: `${index * 150}ms`,
                }}
              >
                {/* Image Container */}
                <div className="h-64 sm:h-80 relative overflow-hidden bg-slate-50">
                  {project.image ? (
                    <img 
                      src={getImageUrl(project.image)} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-200">
                      <Code2 size={80} strokeWidth={1} />
                    </div>
                  )}
                  
                  {/* Overlay Actions */}
                  <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-4">
                    {project.link && (
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-5 bg-white text-slate-900 rounded-2xl hover:bg-blue-600 hover:text-white transition-all transform translate-y-8 group-hover:translate-y-0 duration-500 delay-75 shadow-2xl"
                      >
                        <ExternalLink size={24} strokeWidth={2.5} />
                      </a>
                    )}
                    <a 
                      href={project.link || "#"} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-5 bg-white text-slate-900 rounded-2xl hover:bg-slate-900 hover:text-white transition-all transform translate-y-8 group-hover:translate-y-0 duration-500 delay-150 shadow-2xl"
                    >
                      <Github size={24} strokeWidth={2.5} />
                    </a>
                  </div>
                </div>

                {/* Content Container */}
                <div className="p-10 flex-1 flex flex-col">
                  <div className="flex-1 space-y-6">
                    <h3 className="text-3xl font-black text-slate-900 leading-tight tracking-tight uppercase group-hover:text-blue-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-500 text-lg font-medium leading-relaxed italic line-clamp-3">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.tech.split(",").map((tech, i) => (
                        <span 
                          key={i} 
                          className="px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-xl bg-blue-50 text-blue-600 border border-blue-100/50"
                        >
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  </div>

                  {project.link && (
                    <div className="mt-10 pt-8 border-t border-slate-50">
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 text-blue-600 font-black text-sm uppercase tracking-widest hover:gap-5 transition-all"
                      >
                        <span>Lihat Detail Proyek</span>
                        <ExternalLink size={18} />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
