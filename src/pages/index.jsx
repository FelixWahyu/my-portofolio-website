import LayoutMain from "../components/Layouts/MainLayout";
import HeroSection from "../components/Fragments/Hero";
import AboutSection from "../components/Fragments/About";

function Index() {
  return (
    <>
      <LayoutMain>
        <HeroSection></HeroSection>
        <AboutSection></AboutSection>
      </LayoutMain>
    </>
  );
}

export default Index;
