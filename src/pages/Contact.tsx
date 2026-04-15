import { useState } from "react";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Send, MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const Contact = () => {
  const { ref, isVisible } = useScrollReveal();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", event_type: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from("contact_submissions").insert(form);
    setLoading(false);
    if (error) {
      toast({ title: "Error", description: "Failed to send message. Please try again.", variant: "destructive" });
    } else {
      toast({ title: "✨ Message Sent!", description: "We'll get back to you soon." });
      setForm({ name: "", email: "", event_type: "", message: "" });
    }
  };

  return (
    <PageLayout>
      <section className="gradient-hero py-20 lg:py-28">
        <div className="container mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight"
          >
            Contact <span className="text-gradient-warm">Us</span>
          </motion.h1>
        </div>
      </section>

      <section className="py-20 lg:py-28" ref={ref}>
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid md:grid-cols-5 gap-8 max-w-4xl mx-auto"
          >
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

              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-green-500 px-5 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl active:scale-[0.97] w-fit"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp Us
              </a>
            </div>

            <form onSubmit={handleSubmit} className="md:col-span-3 glass-strong rounded-2xl p-8 flex flex-col gap-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <input type="text" placeholder="Your name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="rounded-xl border border-border bg-background/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-peach/40 transition-shadow" />
                <input type="email" placeholder="Email address" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="rounded-xl border border-border bg-background/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-peach/40 transition-shadow" />
              </div>
              <select value={form.event_type} onChange={(e) => setForm({ ...form, event_type: e.target.value })}
                className="rounded-xl border border-border bg-background/50 px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-peach/40 transition-shadow">
                <option value="">Select event type</option>
                <option>Wedding</option>
                <option>Birthday Party</option>
                <option>Corporate Event</option>
                <option>Memorial Service</option>
                <option>Private Function</option>
              </select>
              <textarea placeholder="Tell us about your dream event..." rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="rounded-xl border border-border bg-background/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-peach/40 transition-shadow resize-none" />
              <button type="submit" disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:shadow-xl active:scale-[0.97] disabled:opacity-50">
                {loading ? "Sending..." : <><Send className="h-4 w-4" /> Send Message</>}
              </button>
            </form>
          </motion.div>

          {/* Map */}
          <div className="mt-16 max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.1160984!2d72.7411!3d19.0823!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1"
              width="100%" height="350" style={{ border: 0 }} allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade" title="Momentra Location"
            />
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Contact;
