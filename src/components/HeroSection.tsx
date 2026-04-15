import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Heart } from "lucide-react";
import heroImg from "@/assets/hero-3d.png";

const floatingShapes = [
  { size: 80, color: "bg-peach/20", top: "15%", left: "8%", delay: 0 },
  { size: 60, color: "bg-lavender/20", top: "25%", right: "12%", delay: -2 },
  { size: 40, color: "bg-sky/25", bottom: "30%", left: "15%", delay: -4 },
  { size: 50, color: "bg-rose/15", top: "60%", right: "8%", delay: -1 },
  { size: 35, color: "bg-mint/20", bottom: "20%", right: "25%", delay: -3 },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-screen gradient-hero overflow-hidden pt-24 pb-12 flex items-center">
      {floatingShapes.map((shape, i) => (
        <div
          key={i}
          className={`absolute rounded-full ${shape.color} float-gentle blur-xl`}
          style={{ width: shape.size, height: shape.size, top: shape.top, left: shape.left, right: shape.right, bottom: shape.bottom, animationDelay: `${shape.delay}s` }}
        />
      ))}

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6 lg:gap-8">
            <motion.div initial={{ opacity: 0, y: 20, filter: "blur(4px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 w-fit">
              <Heart className="h-4 w-4 text-peach" />
              <span className="text-sm font-medium text-muted-foreground">Crafting Beautiful Moments</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 24, filter: "blur(4px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.08] tracking-tight">
              We Turn Your{" "}<span className="text-gradient-warm">Moments</span>{" "}Into Memories
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 24, filter: "blur(4px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg text-muted-foreground max-w-lg leading-relaxed">
              From dream weddings to vibrant celebrations, we craft every detail with love and elegance. Let us make your special day truly unforgettable.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 24, filter: "blur(4px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }} className="flex flex-wrap gap-4 mt-2">
              <Link to="/booking" className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-200 hover:shadow-xl hover:shadow-primary/35 active:scale-[0.97]">
                Book Your Event <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <Link to="/events" className="inline-flex items-center gap-2 rounded-full glass px-7 py-3.5 text-base font-semibold text-foreground transition-all duration-200 hover:bg-muted active:scale-[0.97]">
                Explore Events
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }} className="flex gap-8 mt-4">
              {[
                { num: "2,847+", label: "Events Hosted" },
                { num: "98.4%", label: "Happy Clients" },
                { num: "12+", label: "Years Experience" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold text-foreground tabular-nums">{stat.num}</div>
                  <div className="text-xs font-medium text-muted-foreground mt-0.5">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.92, filter: "blur(8px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }} className="relative flex justify-center">
            <div className="relative float-gentle">
              <img src={heroImg} alt="Magical event celebration" className="w-full max-w-lg rounded-3xl" loading="eager" />
              <div className="absolute inset-0 -z-10 rounded-3xl bg-peach/10 blur-3xl scale-110" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
