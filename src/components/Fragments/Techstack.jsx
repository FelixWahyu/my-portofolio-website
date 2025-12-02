import { Technologies } from "../data/TeckData";

export const TectStack = () => {
  return (
    <section id="tech-stack" className="mt-12 px-4 relative">
      <div className="container mx-auto max-w-6xl relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          <span className="text-blue-500">Tech Stack</span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {Technologies.map((tech, index) => (
            <div
              key={tech.name}
              className="bg-gray-900 p-6 text-gray-100 rounded-xl hover-scale group border border-blue-500 flex items-center shadow-[0_0_10px_rgba(59,130,246,0.4)] hover:shadow-[0_0_20px_rgba(59,130,246,0.8)] justify-center"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-center">
                <div className={`w-16 h-16 mx-auto mb-3 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <img src={tech.logo} alt={tech.name} className="w-full h-auto object-contain drop-shadow-md" />
                </div>
                <p className="text-sm font-semibold text-foreground">{tech.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
