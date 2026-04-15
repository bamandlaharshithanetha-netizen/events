import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { ArrowRight, Heart } from "lucide-react";

const CTASection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 gradient-hero opacity-60" />
      <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-peach/10 blur-3xl float-gentle" />
      <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-lavender/10 blur-3xl float-slow" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
          animate={isVisible ? { opacity: 1, y: 0, filter: "blur(0)" } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="glass-strong rounded-3xl p-12 sm:p-16 text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 bg-peach/10 text-peach rounded-full px-4 py-2 text-sm font-semibold mb-6">
            <Heart className="h-4 w-4" /> Start Your Journey
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
            Ready to Create <span className="text-gradient-warm">Something Magical?</span>
          </h2>

          <p className="text-muted-foreground mt-4 max-w-lg mx-auto text-lg">
            Let's bring your vision to life. Book a free consultation and let our team design the perfect event for you.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link to="/booking" className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-200 hover:shadow-xl hover:shadow-primary/35 active:scale-[0.97]">
              Book Free Consultation <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full glass px-8 py-4 text-base font-semibold text-foreground transition-all hover:bg-muted active:scale-[0.97]">
              Contact Us
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
