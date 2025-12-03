import { useState, useEffect } from "react";
import { Menu, X, Globe } from "lucide-react";

document.documentElement.style.scrollBehavior = "smooth";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState("ID");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      const sections = ["hero", "about", "skills", "projects"];
      const scrollY = window.scrollY + 200;

      sections.forEach((sec) => {
        const element = document.getElementById(sec);
        if (element && scrollY >= element.offsetTop && scrollY < element.offsetTop + element.offsetHeight) {
          setActiveSection(sec);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLanguage = () => setLang(lang === "ID" ? "EN" : "ID");

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (!element) {
      return;
    }

    window.scrollTo({
      top: element.offsetTop - 70,
      behavior: "smooth",
    });

    setIsOpen(false);
  };

  const menuItems = [
    { id: "hero", label: lang === "ID" ? "Beranda" : "Home" },
    { id: "about", label: lang === "ID" ? "Tentang" : "About" },
    { id: "skills", label: lang === "ID" ? "Keahlian" : "Skills" },
    { id: "projects", label: lang === "ID" ? "Proyek" : "Projects" },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? "backdrop-blur-lg bg-gray-300/50 border-b border-white/10 shadow-lg" : "bg-transparent"}`}>
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <button onClick={() => scrollToSection("hero")} className="text-2xl font-extrabold text-blue-500">
          My<span className="text-gray-800">Portfolio</span>
        </button>

        <div className="hidden md:flex items-center gap-8">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`relative text-gray-800 font-medium cursor-pointer transition-colors
                ${activeSection === item.id ? "text-blue-400" : "hover:text-blue-400"}
              `}
            >
              {item.label}

              {activeSection === item.id && <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-blue-500 rounded-full animate-pulse"></span>}
            </button>
          ))}

          <button onClick={toggleLanguage} className="px-3 py-1 cursor-pointer flex gap-1 items-center rounded-full border border-blue-500/70 font-medium text-blue-400 hover:bg-blue-500 hover:text-white transition-all">
            <Globe className="w-4 h-4"></Globe>
            <span>{lang === "ID" ? "EN" : "ID"}</span>
          </button>
        </div>

        <button className="md:hidden text-gray-800" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-gray-300/50 backdrop-blur-xl px-6 py-4 space-y-4 border-t border-white/10">
          {menuItems.map((item) => (
            <button key={item.id} onClick={() => scrollToSection(item.id)} className={`block font-medium text-lg transition-colors cursor-pointer ${activeSection === item.id ? "text-blue-400" : "text-gray-800 hover:text-blue-400"}`}>
              {item.label}
            </button>
          ))}

          <button onClick={toggleLanguage} className="px-3 py-1 mt-3 flex gap-1 items-center cursor-pointer rounded-full font-medium border border-blue-500/70 text-blue-400 hover:bg-blue-500 hover:text-white transition-all">
            <Globe className="w-4 h-4"></Globe>
            <span>{lang === "ID" ? "EN" : "ID"}</span>
          </button>
        </div>
      )}
    </nav>
  );
}
