import React, { useState, useEffect } from "react";
import { User, Loader2 } from "lucide-react";
import GitHubStats from "./Githubstat";
import api from "../../utils/axios";
import { getImageUrl } from "../../utils/image";



// Data default/placeholder as fallback
const defaultData = {
  description: "Lulusan S1 Sistem Informasi dengan IPK 3.73 pada Sekolah Tinggi Ilmu Komputer Yos Sudarso Purwokerto.\n\nSaya memiliki pengalaman dibidang Programmer Web Developer dan membangun beberapa project salah satunya membuat Sistem Website Penjualan Toko Roti Mruyung di Kecamatan Banyumas. Sistem yang dibuat dapat membantu meningkatkan efisiensi operasional kerja pada toko hingga 20%.\n\nMemiliki kemampuan analisis, problem solving dan semangat untuk terus mengembangkan diri. Hard Skill yang saya kuasai yaitu mampu memahami bahasa pemrograman yaitu PHP, JavaScript, Framework Laravel dan ReactJs.",
  yearExp: 1,
  totalProj: 2,
  image: null
};

function AboutSection() {
  const [about, setAbout] = useState(defaultData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await api.get("/api/abouts");
        // Only override if data exists in DB
        if (response.data && response.data.id) {
          setAbout(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch about data, using defaults:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, []);

  if (loading) {
    return (
      <section id="about" className="py-24 bg-gray-50 flex flex-col items-center justify-center min-h-[500px]">
        <div className="w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center mb-4">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
        </div>
        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Syncing Portfolio...</p>
      </section>
    );
  }

  return (
    <>
      <section id="about" className="py-24 relative px-4 lg:px-12 text-center bg-gray-50 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-100/30 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-4">
              Tentang <span className="text-blue-600 bg-clip-text">Saya</span>
            </h2>
            <div className="w-20 h-2 bg-blue-600 mx-auto rounded-full" />
          </div>
          
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-center text-left">
            {/* Image Column - Premium Framing */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group w-full max-w-md">
                <div className="aspect-[4/5] rounded-[3.5rem] overflow-hidden border-8 border-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] relative z-10 transition-all duration-700 group-hover:shadow-[0_48px_80px_-16px_rgba(59,130,246,0.15)] group-hover:-translate-y-2">
                  {about.image ? (
                    <img 
                      src={getImageUrl(about.image)} 
                      alt="Professional Portrait" 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                      <User className="w-40 h-40 text-slate-300" strokeWidth={1} />
                    </div>
                  )}
                  {/* Subtle Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>
                
                {/* Floating Badge */}
                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-2xl z-20 border border-slate-50 animate-bounce-slow">
                   <div className="bg-blue-600 w-12 h-12 rounded-2xl flex items-center justify-center mb-2 shadow-lg shadow-blue-500/30">
                      <User className="text-white w-6 h-6" />
                   </div>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Availability</p>
                   <p className="text-sm font-black text-slate-900">Open to Work</p>
                </div>

                {/* Decorative Shapes */}
                <div className="absolute -inset-6 bg-blue-600/5 rounded-[4.5rem] blur-2xl -z-10" />
                <div className="absolute top-1/2 -right-12 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl" />
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-7 space-y-10">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-xs font-black uppercase tracking-widest border border-blue-100">
                Professional Journey
              </div>
              
              <div className="space-y-6">
                <p className="text-xl md:text-2xl text-slate-600 font-medium leading-[1.8] whitespace-pre-line">
                  {about.description}
                </p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 gap-8 pt-6">
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 hover:border-blue-200 transition-all duration-300 group">
                  <p className="text-5xl md:text-6xl font-black text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{about.yearExp || 0}</p>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Tahun Pengalaman</p>
                </div>
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 hover:border-indigo-200 transition-all duration-300 group">
                  <p className="text-5xl md:text-6xl font-black text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">{about.totalProj || 0}+</p>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Proyek Selesai</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-24 pt-20 border-t border-slate-200/60">
            <GitHubStats />
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutSection;


