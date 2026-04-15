import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import EventCategories from "@/components/EventCategories";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PricingSection from "@/components/PricingSection";
import CTASection from "@/components/CTASection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <EventCategories />
      <ServicesSection />
      <TestimonialsSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
