import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Camera, Utensils, Palette, Music, MapPin, Gift, Sparkles, Star } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  { icon: Palette, title: "Event Design & Décor", desc: "Bespoke themes, stunning setups, floral arrangements, and lighting designs that transform any venue into a magical space.", color: "text-peach bg-peach/10" },
  { icon: Camera, title: "Photography & Video", desc: "Professional cinematography capturing every precious moment — from candid shots to cinematic highlight reels.", color: "text-lavender bg-lavender/10" },
  { icon: Utensils, title: "Catering & Cuisine", desc: "Exquisite multi-cuisine menus crafted by top chefs. From traditional feasts to contemporary fusion dining.", color: "text-sky bg-sky/10" },
  { icon: Music, title: "Entertainment & Music", desc: "Live bands, DJs, cultural performances, and interactive activities that keep your guests entertained all night.", color: "text-rose bg-rose/10" },
  { icon: MapPin, title: "Venue Selection", desc: "Handpicked venues — from beachside resorts to heritage palaces — matching your dream vision and budget.", color: "text-mint bg-mint/10" },
  { icon: Gift, title: "Gift & Favour Curation", desc: "Thoughtful, personalized keepsakes and return gifts that your guests will treasure forever.", color: "text-peach bg-peach/10" },
];

const Services = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <PageLayout>
      <section className="gradient-hero py-20 lg:py-28">
        <div className="container mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight"
          >
            Our <span className="text-gradient-warm">Services</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-lg text-muted-foreground mt-4 max-w-xl mx-auto"
          >
            Everything you need for a perfect event, under one roof
          </motion.p>
        </div>
      </section>

      <section className="py-20 lg:py-28" ref={ref}>
        <div className="container mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                animate={isVisible ? { opacity: 1, y: 0, filter: "blur(0)" } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="glass rounded-2xl p-8 group cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-primary/8 hover:-translate-y-2 active:scale-[0.98]"
              >
                <div className={`inline-flex p-4 rounded-xl ${service.color} mb-5 transition-transform duration-300 group-hover:scale-110`}>
                  <service.icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-foreground">{service.title}</h3>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link
              to="/booking"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-200 hover:shadow-xl active:scale-[0.97]"
            >
              <Sparkles className="h-4 w-4" />
              Book Your Event Now
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Services;
