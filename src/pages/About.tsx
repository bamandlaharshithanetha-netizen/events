import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Heart, Target, Eye, Users } from "lucide-react";

const team = [
  { name: "Ananya Sharma", role: "Founder & Creative Director", initials: "AS", color: "bg-peach/20 text-peach" },
  { name: "Vikram Patel", role: "Operations Manager", initials: "VP", color: "bg-sky/20 text-sky" },
  { name: "Divya Reddy", role: "Lead Designer", initials: "DR", color: "bg-lavender/20 text-lavender" },
  { name: "Karthik Nair", role: "Client Relations", initials: "KN", color: "bg-mint/20 text-mint" },
];

const About = () => {
  const { ref: storyRef, isVisible: storyVisible } = useScrollReveal();
  const { ref: teamRef, isVisible: teamVisible } = useScrollReveal();

  return (
    <PageLayout>
      {/* Hero */}
      <section className="gradient-hero py-20 lg:py-28">
        <div className="container mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight"
          >
            About <span className="text-gradient-warm">Momentra</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-lg text-muted-foreground mt-4 max-w-xl mx-auto"
          >
            Where passion meets perfection in every celebration
          </motion.p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 lg:py-28" ref={storyRef}>
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={storyVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-sm font-semibold uppercase tracking-widest text-peach">Our Story</span>
              <h2 className="text-3xl sm:text-4xl font-bold mt-3 tracking-tight">
                Born from a Love for <span className="text-gradient-warm">Beautiful Moments</span>
              </h2>
              <p className="text-muted-foreground mt-6 leading-relaxed">
                Founded in 2014, Momentra began with a simple dream — to transform ordinary events into
                extraordinary memories. What started as a small team of passionate event enthusiasts has
                grown into one of India's most trusted event management companies.
              </p>
              <p className="text-muted-foreground mt-4 leading-relaxed">
                Over 12 years and 2,847+ events later, we continue to pour our heart into every celebration,
                whether it's an intimate gathering or a grand spectacle.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={storyVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { icon: Heart, label: "Our Mission", text: "To craft unforgettable moments with love and creativity" },
                { icon: Target, label: "Our Vision", text: "To be India's most loved event experience company" },
                { icon: Eye, label: "Our Values", text: "Passion, attention to detail, and heartfelt service" },
                { icon: Users, label: "Our Promise", text: "Your vision, our expertise — together, magic happens" },
              ].map((item, i) => (
                <div key={item.label} className="glass rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <item.icon className="h-6 w-6 text-peach mb-3" />
                  <h3 className="font-bold text-foreground text-sm">{item.label}</h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 lg:py-28 gradient-section-alt" ref={teamRef}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={teamVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl sm:text-4xl font-bold tracking-tight"
            >
              Meet Our <span className="text-gradient-warm">Team</span>
            </motion.h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={teamVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
                className="glass rounded-2xl p-6 text-center group hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
              >
                <div className={`w-16 h-16 rounded-full ${member.color} flex items-center justify-center mx-auto text-lg font-bold transition-transform duration-300 group-hover:scale-110`}>
                  {member.initials}
                </div>
                <h3 className="font-bold text-foreground mt-4 text-sm">{member.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default About;
