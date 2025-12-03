import { ExternalLink, Github } from "lucide-react";
import { ProjectsData } from "../data/ProjectData";
import Button from "../Elements/Button";
import Link from "../Elements/NavLink/Link";

export const Projects = () => {
  return (
    <section id="projects" className="py-20 px-4 relative bg-gray-50">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          <span className="text-blue-500">Proyek Unggulan</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {ProjectsData.map((project, index) => (
            <div
              key={project.title}
              className="bg-gray-900 rounded-xl overflow-hidden border border-blue-500/70 cursor-pointer shadow-[0_0_10px_rgba(59,130,246,0.4)] group hover:border-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.8)] hover:scale-103 transition-all duration-300"
              style={{
                animationDelay: `${index * 150}ms`,
              }}
            >
              <div className="h-48 relative overflow-hidden">
                <img src={project.image} alt={project.title} className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-300" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button rounded="px-4 py-2 rounded-lg">
                    <ExternalLink className="w-5 h-5 mr-2" />
                    Demo
                  </Button>
                  <a href={project.link} target="_blank">
                    <Button rounded="px-4 py-2 rounded-lg">
                      <Github className="w-5 h-5 mr-2" />
                      Kode
                    </Button>
                  </a>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-bold text-foreground text-gray-100 group-hover:text-blue-500 transition-colors">{project.title}</h3>
                <p className="text-muted-foreground text-gray-100 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 text-gray-100">
                  {project.tech.map((tech) => (
                    <span key={tech} className="px-3 py-1 text-sm rounded-full bg-blue-500/20 text-blue-500 border border-blue-500/30">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
