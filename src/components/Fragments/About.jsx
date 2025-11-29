import { User } from "lucide-react";
import GitHubStats from "./Githubstat";

function AboutSection() {
  return (
    <>
      <section id="about" className="py-16 bg-gray-900 relative px-4 lg:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-blue-500">Tentang Saya</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-80 h-80 rounded-2xl overflow-hidden border border-blue-600 shadow-[0_0_10px_rgba(59,130,246,0.8)]">
                <div className="w-full h-full bg-gradient-to-br from-blue-600/20 to-blue-600/5 flex items-center justify-center">
                  <User className="w-32 h-32 text-blue-600" />
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-600/20 rounded-full blur-xl animate-pulse-glow" />
            </div>
          </div>
          <div className="space-y-6 text-left text-gray-100">
            <p className="text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem totam corporis, amet pariatur molestiae obcaecati cum, porro tempora ea harum doloribus iste in deleniti sapiente, neque dolore incidunt nemo alias.
            </p>
            <p className="text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem totam corporis, amet pariatur molestiae obcaecati cum, porro tempora ea harum doloribus iste in deleniti sapiente, neque dolore incidunt nemo alias.
            </p>
            <p className="text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem totam corporis, amet pariatur molestiae obcaecati cum, porro tempora ea harum doloribus iste in deleniti sapiente, neque dolore incidunt nemo alias.
            </p>
            <div className="flex gap-4 pt-4">
              <div className="glass px-6 py-4 rounded-xl border border-blue-500/30">
                <p className="text-3xl font-bold text-blue-600">1</p>
                <p className="text-sm text-muted-foreground">Years Experience</p>
              </div>
              <div className="glass px-6 py-4 rounded-xl border border-blue-500/30">
                <p className="text-3xl font-bold text-blue-600">2+</p>
                <p className="text-sm text-muted-foreground">Projects Completed</p>
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
