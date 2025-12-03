import LayoutMain from "../components/Layouts/MainLayout";
import HeroSection from "../components/Fragments/Hero";
import AboutSection from "../components/Fragments/About";
import { Skills } from "../components/Fragments/Skills";
import { Projects } from "../components/Fragments/Project";
import { Footer } from "../components/Fragments/Footer";

function Index() {
  return (
    <>
      <LayoutMain>
        <HeroSection></HeroSection>
        <AboutSection></AboutSection>
        <Skills></Skills>
        <Projects></Projects>
        <Footer></Footer>
      </LayoutMain>
    </>
  );
}

export default Index;
