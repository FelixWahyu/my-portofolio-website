import Button from "../Elements/Button";
import Link from "../Elements/NavLink/Link";
import { Github, Linkedin, Instagram, Youtube } from "lucide-react";

function HeroSection(props) {
  return (
    <>
      <h2 className="text-4xl font-semibold">Felix Wahyu Sejati, S.Kom.</h2>
      <p className="text-2xl md:text-3xl my-1 text-foreground/90 text-blue-500">Web Developer</p>
      <p className="text-xl md:text-2xl font-light text-muted-foreground mb-12 max-w-2xl">Crafting digital experiences with cutting-edge technology</p>
      <div className="mb-6 flex items-center gap-3">
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
      <div className="flex items-center gap-3">
        <Button type="button">Views Project</Button>
        <Button type="button">Get in Touch</Button>
      </div>
    </>
  );
}

export default HeroSection;
