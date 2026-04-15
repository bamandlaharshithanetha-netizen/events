import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Camera, Utensils, Palette, Music, MapPin, Gift } from "lucide-react";

const services = [
  { icon: Palette, title: "Event Design & Décor", desc: "Bespoke themes and stunning visual setups", color: "text-peach bg-peach/10" },
  { icon: Camera, title: "Photography & Video", desc: "Capturing every precious moment beautifully", color: "text-lavender bg-lavender/10" },
  { icon: Utensils, title: "Catering & Cuisine", desc: "Exquisite menus for every taste and occasion", color: "text-sky bg-sky/10" },
  { icon: Music, title: "Entertainment & Music", desc: "Live bands, DJs, and unforgettable performances", color: "text-rose bg-rose/10" },
  { icon: MapPin, title: "Venue Selection", desc: "Handpicked venues matching your dream vision", color: "text-mint bg-mint/10" },
  { icon: Gift, title: "Gift & Favour Curation", desc: "Thoughtful keepsakes your guests will adore", color: "text-peach bg-peach/10" },
];

const ServicesSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="services" className="py-24 lg:py-32" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            className="text-sm font-semibold uppercase tracking-widest text-lavender"
          >
            What We Offer
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 tracking-tight"
          >
            Our <span className="text-gradient-warm">Services</span>
          </motion.h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              animate={isVisible ? { opacity: 1, y: 0, filter: "blur(0)" } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="glass rounded-2xl p-8 group cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-primary/8 hover:-translate-y-1 active:scale-[0.98]"
            >
              <div className={`inline-flex p-3 rounded-xl ${service.color} mb-5 transition-transform duration-300 group-hover:scale-110`}>
                <service.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-foreground">{service.title}</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
