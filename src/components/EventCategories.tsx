import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import weddingImg from "@/assets/wedding-3d.png";
import birthdayImg from "@/assets/birthday-3d.png";
import memorialImg from "@/assets/memorial-3d.png";
import corporateImg from "@/assets/corporate-3d.png";
import privateImg from "@/assets/private-3d.png";

const events = [
  { title: "Weddings", slug: "wedding", description: "Royal ceremonies with elegant décor and heartfelt moments", image: weddingImg, color: "from-rose/10 to-peach/10", accent: "bg-rose/20 text-rose" },
  { title: "Birthday Parties", slug: "birthday", description: "Colorful celebrations filled with joy and surprise", image: birthdayImg, color: "from-peach/10 to-sky/10", accent: "bg-peach/20 text-peach" },
  { title: "Memorial Services", slug: "funeral", description: "Peaceful gatherings with grace and compassion", image: memorialImg, color: "from-lavender/10 to-muted/50", accent: "bg-lavender/20 text-lavender" },
  { title: "Corporate Events", slug: "corporate", description: "Professional gatherings that leave lasting impressions", image: corporateImg, color: "from-sky/10 to-lavender/10", accent: "bg-sky/20 text-sky" },
  { title: "Private Functions", slug: "private-function", description: "Intimate affairs crafted to perfection", image: privateImg, color: "from-mint/10 to-peach/10", accent: "bg-mint/20 text-mint" },
];

const EventCategories = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-24 lg:py-32 gradient-section-alt relative overflow-hidden" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.span initial={{ opacity: 0 }} animate={isVisible ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}
            className="text-sm font-semibold uppercase tracking-widest text-peach">Our Specialties</motion.span>
          <motion.h2 initial={{ opacity: 0, y: 16 }} animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 tracking-tight">
            Events We <span className="text-gradient-warm">Love</span> Creating
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Every event tells a story. We make sure yours is extraordinary.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, i) => (
            <motion.div key={event.title} initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              animate={isVisible ? { opacity: 1, y: 0, filter: "blur(0)" } : {}}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}>
              <Link to={`/events/${event.slug}`}
                className="group glass rounded-2xl overflow-hidden block cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2 active:scale-[0.98]">
                <div className={`relative bg-gradient-to-br ${event.color} p-6 flex justify-center`}>
                  <img src={event.image} alt={event.title} className="h-40 object-contain transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-foreground">{event.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{event.description}</p>
                  <div className="mt-4">
                    <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${event.accent}`}>Explore →</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventCategories;
