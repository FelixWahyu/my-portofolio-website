import LayoutMain from "../components/Layouts/MainLayout";
import HeroSection from "../components/Fragments/Hero";
import AboutSection from "../components/Fragments/About";
import { Skills } from "../components/Fragments/Skills";

function Index() {
  return (
    <>
      <LayoutMain>
        <HeroSection></HeroSection>
        <AboutSection></AboutSection>
        <Skills></Skills>
      </LayoutMain>
    </>
  );
}

export default Index;
