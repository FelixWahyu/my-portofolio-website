import Link from "../Elements/NavLink/Link";
import { Github, Linkedin, Instagram, Youtube } from "lucide-react";

export const Footer = () => {
  return (
    <div id="footer" className="bg-gray-900 px-12 py-16 align-middle">
      <div className="flex-col flex lg:flex-row gap-4 lg:gap-0 justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-100">MyPortfolio</h2>
          <h3 className="mt-1 text-lg text-gray-100">Felix Wahyu Sejati,S.Kom.</h3>
          <p className="mt-1 font-light text-gray-100">Web Development Enthusiast</p>
        </div>
        <div>
          <h3 className="mb-2 text-lg font-medium text-gray-100">Menu</h3>
          <div className="flex flex-col gap-1">
            <Link links="#hero" classname="text-gray-100 hover:underline">
              Beranda
            </Link>
            <Link links="#about" classname="text-gray-100 hover:underline">
              Tentang
            </Link>
            <Link links="#skills" classname="text-gray-100 hover:underline">
              Keahlian
            </Link>
            <Link links="#projects" classname="text-gray-100 hover:underline">
              Proyek
            </Link>
          </div>
        </div>
        <div className="max-w-md">
          <h3 className="mb-2 text-lg font-medium text-gray-100">Kontak</h3>
          <ul className="flex flex-col gap-2 text-gray-100">
            <li>Jl.Sumardi No.16,Dukuhwaluh,Kecamatan Kembaran,Purwokerto</li>
            <li>felixwahyusejati89@gmail.com</li>
            <li>+62858-6990-6592</li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 text-lg font-medium text-gray-100">Sosial Media</h3>
          <div className="flex items-center gap-3">
            <Link
              links="https://github.com/FelixWahyu"
              classname="w-12 h-12 rounded-full items-center justify-center border border-blue-500 bg-gray-900 text-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)] hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.8)] active:scale-95 transition-all duration-300"
              targets="_blank"
            >
              <Github className="w-5 h-5"></Github>
            </Link>
            <Link
              links="https://linkedin.com/in/felix-wahyu-sejati"
              classname="w-12 h-12 rounded-full items-center justify-center border border-blue-500 bg-gray-900 text-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)] hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.8)] active:scale-95 transition-all duration-300"
              targets="_blank"
            >
              <Linkedin className="w-5 h-5"></Linkedin>
            </Link>
            <Link
              links="https://instagram.com/felixwebdev"
              classname="w-12 h-12 rounded-full items-center justify-center border border-blue-500 bg-gray-900 text-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)] hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.8)] active:scale-95 transition-all duration-300"
              targets="_blank"
            >
              <Instagram className="w-5 h-5"></Instagram>
            </Link>
            <Link
              links="https://youtube.com/@feliks7074"
              classname="w-12 h-12 rounded-full items-center justify-center border border-blue-500 bg-gray-900 text-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)] hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.8)] active:scale-95 transition-all duration-300"
              targets="_blank"
            >
              <Youtube className="w-5 h-5"></Youtube>
            </Link>
          </div>
        </div>
      </div>
      <div className="py-4 border-t border-gray-100 text-center">
        <p className="text-gray-100">Created by @2025 Felix Wahyu Sejati. All Rights Reserved</p>
      </div>
    </div>
  );
};
