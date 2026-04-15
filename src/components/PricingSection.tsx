import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Check, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Essentials", price: "₹49,999", period: "starting from",
    desc: "Perfect for intimate gatherings",
    features: ["Up to 50 guests", "Basic décor setup", "Photography (4 hours)", "Venue coordination", "Event day manager"],
    accent: "border-sky/30", popular: false,
  },
  {
    name: "Premium", price: "₹1,49,999", period: "starting from",
    desc: "Our most loved package",
    features: ["Up to 200 guests", "Custom theme design", "Photo + Video (full day)", "Catering coordination", "Dedicated planner", "Entertainment setup", "Guest management"],
    accent: "border-peach", popular: true,
  },
  {
    name: "Royal", price: "₹3,99,999", period: "starting from",
    desc: "The ultimate grand experience",
    features: ["Unlimited guests", "Luxury décor & florals", "Cinematic videography", "Multi-day coordination", "Celebrity entertainment", "Destination planning", "Full concierge service", "Post-event video album"],
    accent: "border-lavender/30", popular: false,
  },
];

const PricingSection = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-24 lg:py-32" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.span initial={{ opacity: 0 }} animate={isVisible ? { opacity: 1 } : {}}
            className="text-sm font-semibold uppercase tracking-widest text-mint">Pricing</motion.span>
          <motion.h2 initial={{ opacity: 0, y: 16 }} animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 tracking-tight">
            Choose Your <span className="text-gradient-warm">Package</span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div key={plan.name} initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
              animate={isVisible ? { opacity: 1, y: 0, filter: "blur(0)" } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className={`glass rounded-2xl p-8 border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative ${plan.accent} ${
                plan.popular ? "shadow-lg shadow-peach/10" : ""
              }`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-1 text-xs font-bold text-primary-foreground">
                  <Sparkles className="h-3 w-3" /> Most Popular
                </div>
              )}
              <h3 className="text-lg font-bold text-foreground">{plan.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{plan.desc}</p>
              <div className="mt-5">
                <span className="text-3xl font-bold text-foreground tabular-nums">{plan.price}</span>
                <span className="text-sm text-muted-foreground ml-2">{plan.period}</span>
              </div>
              <ul className="mt-6 flex flex-col gap-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-foreground">
                    <Check className="h-4 w-4 text-peach mt-0.5 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <Link to="/booking"
                className={`mt-8 block text-center rounded-full py-3 text-sm font-semibold transition-all duration-200 active:scale-[0.97] ${
                  plan.popular ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-xl" : "glass hover:bg-muted text-foreground"
                }`}>
                Get Started
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
