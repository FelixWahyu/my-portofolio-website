import { Code2, Database } from "lucide-react";
import { TectStack } from "./Techstack";

const skills = [
  {
    name: "Frontend Development",
    level: 85,
    icon: Code2,
    description: "Expert in building responsive and interactive web interfaces using modern frameworks like React, TailwindCSS and Bootstrap. Proficient in HTML5, CSS3, and JavaScript ES6+.",
  },
  {
    name: "Backend Development",
    level: 80,
    icon: Database,
    description: "Strong experience in server-side development with Node.js, Laravel and PHP. Skilled in building RESTful APIs, Prisma, and scalable backend architectures.",
  },
];

export const Skills = () => {
  return (
    <section id="skills" className="py-20 px-4 relative">
      <div className="container mx-auto max-w-6xl relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          <span className="text-blue-500">Skills & Expertise</span>
        </h2>

        <div className="space-y-8">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <div
                key={skill.name}
                className="p-6 bg-gray-900 rounded-xl border border-blue-500/70 shadow-[0_0_10px_rgba(59,130,246,0.4)] hover:border-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.8)] hover:scale-102 transition-all duration-300 animate-fade-in"
                style={{
                  animationDelay: `${index * 150}ms`,
                }}
              >
                <div className="flex flex-col text-gray-100 md:flex-row gap-6">
                  <div className="flex items-center gap-4 md:w-1/3">
                    <div className="w-16 h-16 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0 transition-colors">
                      <Icon className="w-8 h-8 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-1">{skill.name}</h3>
                      <span className="text-sm text-blue-500 font-semibold">Proficiency: {skill.level}%</span>
                    </div>
                  </div>

                  <div className="flex-1 space-y-3">
                    <p className="text-muted-foreground leading-relaxed">{skill.description}</p>

                    <div className="w-full h-3 bg-gray-700/50 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-blue-500/70 transition-all duration-1000 ease-out rounded-full"
                        style={{
                          width: `${skill.level}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <TectStack></TectStack>
        </div>
      </div>
    </section>
  );
};
