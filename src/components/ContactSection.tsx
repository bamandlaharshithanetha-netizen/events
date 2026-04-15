import { useState } from "react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Send, MapPin, Phone, Mail } from "lucide-react";

const ContactSection = () => {
  const { ref, isVisible } = useScrollReveal();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="py-24 lg:py-32 gradient-section-alt" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            className="text-sm font-semibold uppercase tracking-widest text-rose"
          >
            Get In Touch
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 tracking-tight"
          >
            Let's <span className="text-gradient-warm">Talk</span>
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid md:grid-cols-5 gap-8 max-w-4xl mx-auto"
        >
          {/* Info */}
          <div className="md:col-span-2 flex flex-col gap-6">
            {[
              { icon: MapPin, label: "Visit us", value: "123 Event Avenue, Mumbai 400001" },
              { icon: Phone, label: "Call us", value: "+91 98765 43210" },
              { icon: Mail, label: "Email us", value: "hello@momentra.in" },
            ].map((info) => (
              <div key={info.label} className="flex gap-4">
                <div className="shrink-0 p-3 rounded-xl bg-peach/10 text-peach">
                  <info.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{info.label}</div>
                  <div className="text-sm font-medium text-foreground mt-1">{info.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="md:col-span-3 glass-strong rounded-2xl p-8 flex flex-col gap-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your name"
                required
                className="rounded-xl border border-border bg-background/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-peach/40 transition-shadow"
              />
              <input
                type="email"
                placeholder="Email address"
                required
                className="rounded-xl border border-border bg-background/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-peach/40 transition-shadow"
              />
            </div>
            <select
              className="rounded-xl border border-border bg-background/50 px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-peach/40 transition-shadow"
              defaultValue=""
            >
              <option value="" disabled>Select event type</option>
              <option>Wedding</option>
              <option>Birthday Party</option>
              <option>Corporate Event</option>
              <option>Memorial Service</option>
              <option>Private Function</option>
            </select>
            <textarea
              placeholder="Tell us about your dream event..."
              rows={4}
              className="rounded-xl border border-border bg-background/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-peach/40 transition-shadow resize-none"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:shadow-xl active:scale-[0.97]"
            >
              {submitted ? "✨ Sent!" : (
                <>
                  Send Message
                  <Send className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
