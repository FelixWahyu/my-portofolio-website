import Button from "../Elements/Button";
import Link from "../Elements/NavLink/Link";
import { Github, Linkedin, Instagram, Youtube, ArrowDown } from "lucide-react";

function HeroSection(props) {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <>
      <section className="py-20 px-4 mt-8 lg:px-6 relative min-h-screen text-left lg:text-center">
        <h2 className="text-4xl font-bold">Felix Wahyu Sejati, S.Kom.</h2>
        <p className="text-2xl md:text-3xl my-2 text-foreground/90 text-blue-500">Web Development Enthusiast</p>
        <p className="text-lg md:text-xl font-light text-muted-foreground mb-12">Crafting digital experiences with cutting-edge technology</p>
        <div className="mb-6 flex items-center justify-start lg:justify-center gap-3">
          <Link links="https://github.com/FelixWahyu" targets="_blank">
            <Github className="w-5 h-5"></Github>
          </Link>
          <Link links="https://linkedin.com/in/felix-wahyu-sejati" targets="_blank">
            <Linkedin className="w-5 h-5"></Linkedin>
          </Link>
          <Link links="https://instagram.com/felixwebdev" targets="_blank">
            <Instagram className="w-5 h-5"></Instagram>
          </Link>
          <Link links="https://youtube.com/@feliks7074" targets="_blank">
            <Youtube className="w-5 h-5"></Youtube>
          </Link>
        </div>
        <div className="flex items-center justify-start lg:justify-center gap-3 mb-24">
          <Button type="button" rounded="rounded-lg px-4 py-2">
            Views Project
          </Button>
          <Button type="button" rounded="rounded-lg px-4 py-2">
            Get in Touch
          </Button>
        </div>
        <Button event={() => scrollToSection("about")} type="button" rounded="absolute left-1/2 right-1/2 lg:right-1 lg:left-1 rounded-full p-2 animate-bounce">
          <ArrowDown className="w-8 h-8"></ArrowDown>
        </Button>
      </section>
    </>
  );
}

export default HeroSection;
