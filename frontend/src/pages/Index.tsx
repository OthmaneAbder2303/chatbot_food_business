
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import MenuSection from "@/components/MenuSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import DialogflowMessenger from "@/components/DialogflowMessenger";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <AboutSection />
      <MenuSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
      <DialogflowMessenger />
    </div>
  );
};

export default Index;
