import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya Menon",
    role: "Bride, Kerala Wedding",
    text: "Momentra turned our wedding into a fairy tale. Every flower, every light, every detail was beyond what we imagined. Our guests still talk about it!",
    rating: 5,
    initials: "PM",
    color: "bg-peach/20 text-peach",
  },
  {
    name: "Arjun Kapoor",
    role: "Corporate Head, TechVista",
    text: "The corporate gala they organised was flawless. Professional, creative, and they managed 400+ guests seamlessly. Highly recommend for business events.",
    rating: 5,
    initials: "AK",
    color: "bg-sky/20 text-sky",
  },
  {
    name: "Meera Shankar",
    role: "Mother, 7th Birthday Party",
    text: "My daughter's unicorn-themed party was magical! The decorations, the cake, the games — everything was perfect. She said it was the best day of her life.",
    rating: 5,
    initials: "MS",
    color: "bg-lavender/20 text-lavender",
  },
  {
    name: "Rakesh Gupta",
    role: "Anniversary Celebration",
    text: "They planned our 25th anniversary with such warmth and elegance. The surprise video montage made us cry happy tears. Truly heartfelt service.",
    rating: 5,
    initials: "RG",
    color: "bg-mint/20 text-mint",
  },
];

const TestimonialsSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  const t = testimonials[current];

  return (
    <section id="testimonials" className="py-24 lg:py-32 gradient-section-alt" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            className="text-sm font-semibold uppercase tracking-widest text-sky"
          >
            Testimonials
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 tracking-tight"
          >
            What Our <span className="text-gradient-warm">Clients</span> Say
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-2xl mx-auto glass-strong rounded-3xl p-8 sm:p-12 relative"
        >
          <Quote className="absolute top-6 right-8 h-10 w-10 text-peach/20" />

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex gap-1 mb-6">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-peach text-peach" />
                ))}
              </div>

              <p className="text-lg text-foreground leading-relaxed italic">
                "{t.text}"
              </p>

              <div className="flex items-center gap-4 mt-8">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full text-sm font-bold ${t.color}`}>
                  {t.initials}
                </div>
                <div>
                  <div className="font-bold text-foreground">{t.name}</div>
                  <div className="text-sm text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-3 mt-8">
            <button
              onClick={prev}
              className="p-2 rounded-full glass hover:bg-muted transition-colors active:scale-95"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current ? "w-6 bg-peach" : "w-2 bg-border"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="p-2 rounded-full glass hover:bg-muted transition-colors active:scale-95"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
