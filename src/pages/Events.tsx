import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import weddingImg from "@/assets/wedding-3d.png";
import birthdayImg from "@/assets/birthday-3d.png";
import memorialImg from "@/assets/memorial-3d.png";
import corporateImg from "@/assets/corporate-3d.png";
import privateImg from "@/assets/private-3d.png";

const events = [
  { title: "Weddings", slug: "wedding", desc: "Royal ceremonies with elegant décor and heartfelt moments", image: weddingImg, color: "from-rose/10 to-peach/10", accent: "bg-rose/20 text-rose" },
  { title: "Birthday Parties", slug: "birthday", desc: "Colorful celebrations filled with joy and surprise", image: birthdayImg, color: "from-peach/10 to-sky/10", accent: "bg-peach/20 text-peach" },
  { title: "Memorial Services", slug: "funeral", desc: "Peaceful gatherings with grace and compassion", image: memorialImg, color: "from-lavender/10 to-muted/50", accent: "bg-lavender/20 text-lavender" },
  { title: "Corporate Events", slug: "corporate", desc: "Professional gatherings that leave lasting impressions", image: corporateImg, color: "from-sky/10 to-lavender/10", accent: "bg-sky/20 text-sky" },
  { title: "Private Functions", slug: "private-function", desc: "Intimate affairs crafted to perfection", image: privateImg, color: "from-mint/10 to-peach/10", accent: "bg-mint/20 text-mint" },
];

const Events = () => {
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
            Event <span className="text-gradient-warm">Categories</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-lg text-muted-foreground mt-4 max-w-xl mx-auto"
          >
            Every event tells a story. Click to explore each one.
          </motion.p>
        </div>
      </section>

      <section className="py-20 lg:py-28" ref={ref}>
        <div className="container mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, i) => (
              <motion.div
                key={event.slug}
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                animate={isVisible ? { opacity: 1, y: 0, filter: "blur(0)" } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
              >
                <Link
                  to={`/events/${event.slug}`}
                  className={`group glass rounded-2xl overflow-hidden block transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2 active:scale-[0.98]`}
                >
                  <div className={`relative bg-gradient-to-br ${event.color} p-6 flex justify-center`}>
                    <img src={event.image} alt={event.title} className="h-40 object-contain transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-foreground">{event.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{event.desc}</p>
                    <div className="mt-4">
                      <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${event.accent}`}>
                        Explore →
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Events;
