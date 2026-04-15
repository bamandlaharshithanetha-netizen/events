import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Check, ArrowRight, ArrowLeft, Sparkles, Calendar, MapPin, Users, DollarSign, User, FileText } from "lucide-react";

const steps = [
  { title: "Event Type", icon: Sparkles },
  { title: "Date & Venue", icon: Calendar },
  { title: "Details", icon: Users },
  { title: "Contact", icon: User },
  { title: "Review", icon: FileText },
];

const eventTypes = ["Wedding", "Birthday Party", "Corporate Event", "Memorial Service", "Private Function"];

const Booking = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    event_type: "", event_date: "", event_time: "", location: "",
    budget: "", guest_count: "", contact_name: "", contact_email: "",
    contact_phone: "", special_requirements: "",
  });

  const update = (key: string, value: string) => setForm({ ...form, [key]: value });

  const handleSubmit = async () => {
    if (!user) {
      toast({ title: "Please sign in", description: "You need an account to book an event.", variant: "destructive" });
      navigate("/auth");
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("bookings").insert({
      ...form,
      user_id: user.id,
      budget: form.budget ? Number(form.budget) : null,
      guest_count: form.guest_count ? Number(form.guest_count) : null,
    });
    setLoading(false);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setSuccess(true);
    }
  };

  if (success) {
    return (
      <PageLayout>
        <div className="py-32 text-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 15, stiffness: 200 }}
            className="mx-auto w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6"
          >
            <Check className="h-10 w-10 text-green-600" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold"
          >
            Booking Confirmed! 🎉
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-muted-foreground mt-4"
          >
            We'll reach out to you within 24 hours to finalize details.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-8 flex gap-4 justify-center"
          >
            <button onClick={() => navigate("/dashboard")} className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg active:scale-[0.97]">
              View My Bookings
            </button>
            <button onClick={() => navigate("/")} className="rounded-full glass px-6 py-3 text-sm font-semibold active:scale-[0.97]">
              Back to Home
            </button>
          </motion.div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <section className="gradient-hero py-12">
        <div className="container mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight"
          >
            Book Your <span className="text-gradient-warm">Event</span>
          </motion.h1>
        </div>
      </section>

      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-6 max-w-2xl">
          {/* Progress bar */}
          <div className="flex items-center justify-between mb-12">
            {steps.map((s, i) => (
              <div key={s.title} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                  i <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}>
                  {i < step ? <Check className="h-4 w-4" /> : i + 1}
                </div>
                {i < steps.length - 1 && (
                  <div className={`h-1 w-8 sm:w-16 mx-1 rounded transition-colors ${i < step ? "bg-primary" : "bg-muted"}`} />
                )}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="glass-strong rounded-2xl p-8"
            >
              <h2 className="text-xl font-bold mb-6">{steps[step].title}</h2>

              {step === 0 && (
                <div className="grid grid-cols-1 gap-3">
                  {eventTypes.map((type) => (
                    <button key={type} onClick={() => update("event_type", type)}
                      className={`text-left rounded-xl px-5 py-4 text-sm font-medium transition-all active:scale-[0.98] ${
                        form.event_type === type ? "bg-primary text-primary-foreground shadow-lg" : "glass hover:bg-muted"
                      }`}>
                      {type}
                    </button>
                  ))}
                </div>
              )}

              {step === 1 && (
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Event Date</label>
                    <input type="date" value={form.event_date} onChange={(e) => update("event_date", e.target.value)}
                      className="mt-1 w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm focus:ring-2 focus:ring-peach/40 focus:outline-none" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Event Time</label>
                    <input type="time" value={form.event_time} onChange={(e) => update("event_time", e.target.value)}
                      className="mt-1 w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm focus:ring-2 focus:ring-peach/40 focus:outline-none" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Location / Venue</label>
                    <input type="text" value={form.location} onChange={(e) => update("location", e.target.value)} placeholder="City or venue name"
                      className="mt-1 w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm focus:ring-2 focus:ring-peach/40 focus:outline-none" />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Budget (₹)</label>
                    <input type="number" value={form.budget} onChange={(e) => update("budget", e.target.value)} placeholder="e.g. 200000"
                      className="mt-1 w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm focus:ring-2 focus:ring-peach/40 focus:outline-none" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Number of Guests</label>
                    <input type="number" value={form.guest_count} onChange={(e) => update("guest_count", e.target.value)} placeholder="e.g. 150"
                      className="mt-1 w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm focus:ring-2 focus:ring-peach/40 focus:outline-none" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Special Requirements</label>
                    <textarea value={form.special_requirements} onChange={(e) => update("special_requirements", e.target.value)} rows={3} placeholder="Any special requests..."
                      className="mt-1 w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm focus:ring-2 focus:ring-peach/40 focus:outline-none resize-none" />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Full Name</label>
                    <input type="text" value={form.contact_name} onChange={(e) => update("contact_name", e.target.value)} placeholder="Your full name"
                      className="mt-1 w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm focus:ring-2 focus:ring-peach/40 focus:outline-none" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Email</label>
                    <input type="email" value={form.contact_email} onChange={(e) => update("contact_email", e.target.value)} placeholder="you@example.com"
                      className="mt-1 w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm focus:ring-2 focus:ring-peach/40 focus:outline-none" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Phone</label>
                    <input type="tel" value={form.contact_phone} onChange={(e) => update("contact_phone", e.target.value)} placeholder="+91 98765 43210"
                      className="mt-1 w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm focus:ring-2 focus:ring-peach/40 focus:outline-none" />
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="flex flex-col gap-3">
                  {[
                    { label: "Event Type", value: form.event_type },
                    { label: "Date", value: form.event_date },
                    { label: "Time", value: form.event_time || "Not specified" },
                    { label: "Location", value: form.location || "Not specified" },
                    { label: "Budget", value: form.budget ? `₹${Number(form.budget).toLocaleString()}` : "Not specified" },
                    { label: "Guests", value: form.guest_count || "Not specified" },
                    { label: "Name", value: form.contact_name },
                    { label: "Email", value: form.contact_email },
                    { label: "Phone", value: form.contact_phone || "Not specified" },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between py-2 border-b border-border last:border-0">
                      <span className="text-sm text-muted-foreground">{item.label}</span>
                      <span className="text-sm font-medium">{item.value}</span>
                    </div>
                  ))}
                  {form.special_requirements && (
                    <div className="mt-2">
                      <span className="text-sm text-muted-foreground">Special Requirements:</span>
                      <p className="text-sm mt-1">{form.special_requirements}</p>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}
              className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-semibold transition-all active:scale-[0.97] disabled:opacity-30">
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            {step < 4 ? (
              <button onClick={() => setStep(step + 1)} disabled={step === 0 && !form.event_type}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg active:scale-[0.97] disabled:opacity-50">
                Next <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button onClick={handleSubmit} disabled={loading || !form.contact_name || !form.contact_email || !form.event_date}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg active:scale-[0.97] disabled:opacity-50">
                {loading ? "Submitting..." : "Confirm Booking"} <Sparkles className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Booking;
