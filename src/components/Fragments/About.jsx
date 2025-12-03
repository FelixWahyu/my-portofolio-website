import { User } from "lucide-react";
import GitHubStats from "./Githubstat";

function AboutSection() {
  return (
    <>
      <section id="about" className="py-16 relative px-4 lg:px-6 text-center bg-gray-50">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-blue-500">Tentang Saya</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="flex justify-center">
            <div className="relative bg-gray-900 hover:scale-105 transition-all duration-300 rounded-2xl">
              <div className="w-80 h-80 rounded-2xl overflow-hidden border border-blue-600 shadow-[0_0_10px_rgba(59,130,246,0.8)]">
                <div className="w-full h-full bg-gradient-to-br from-blue-600/40 to-blue-600/10 flex items-center justify-center">
                  <User className="w-32 h-32 text-blue-600" />
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-600/20 rounded-full blur-xl animate-pulse-glow" />
            </div>
          </div>
          <div className="space-y-6 text-left">
            <p className="text-lg">Lulusan S1 Sistem Informasi dengan IPK 3.73 pada Sekolah Tinggi Ilmu Komputer Yos Sudarso Purwokerto.</p>
            <p className="text-lg">
              Saya memiliki pengalaman dibidang Programmer Web Developer dan membangun beberapa project salah satunya membuat Sistem Website Penjualan Toko Roti Mruyung di Kecamatan Banyumas. Sistem yang dibuat dapat membantu meningkatkan
              efisiensi operasional kerja pada toko hingga 20%.
            </p>
            <p className="text-lg">
              Memiliki kemampuan analisis, problem solving dan semangat untuk terus mengembangkan diri. Hard Skill yang saya kuasai yaitu mampu memahami bahasa pemrograman yaitu PHP, JavaScript, Framework Laravel dan ReactJs.
            </p>
            <div className="flex gap-4 pt-4">
              <div className="glass px-6 py-4 rounded-xl border border-blue-500/70">
                <p className="text-3xl font-bold text-blue-600">1</p>
                <p className="text-sm text-muted-foreground">Tahun Pengalaman</p>
              </div>
              <div className="glass px-6 py-4 rounded-xl border border-blue-500/70">
                <p className="text-3xl font-bold text-blue-600">2+</p>
                <p className="text-sm text-muted-foreground">Proyek Selesai</p>
              </div>
            </div>
          </div>
        </div>
        <GitHubStats></GitHubStats>
      </section>
    </>
  );
}

export default AboutSection;
