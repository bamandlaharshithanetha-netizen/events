import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import weddingImg from "@/assets/wedding-3d.png";
import birthdayImg from "@/assets/birthday-3d.png";
import memorialImg from "@/assets/memorial-3d.png";
import corporateImg from "@/assets/corporate-3d.png";
import privateImg from "@/assets/private-3d.png";

const eventData: Record<string, {
  title: string;
  tagline: string;
  description: string;
  image: string;
  themes: string[];
  color: string;
  packages: { name: string; price: string; features: string[]; popular?: boolean }[];
}> = {
  wedding: {
    title: "Weddings",
    tagline: "Your Fairytale Begins Here",
    description: "From traditional ceremonies to modern celebrations, we create weddings that are as unique as your love story. Every flower, every light, every detail is crafted with care.",
    image: weddingImg,
    color: "rose",
    themes: ["Royal Palace", "Garden Romance", "Beach Bliss", "Traditional Heritage", "Modern Minimalist"],
    packages: [
      { name: "Classic", price: "₹2,49,999", features: ["Up to 150 guests", "Basic décor", "Photography", "Venue coordination", "1 event manager"] },
      { name: "Premium", price: "₹5,99,999", features: ["Up to 500 guests", "Custom theme", "Photo + Video", "Catering", "2 event managers", "Entertainment", "Floral design"], popular: true },
      { name: "Royal", price: "₹12,99,999", features: ["Unlimited guests", "Luxury décor", "Cinematic video", "Multi-day", "Celebrity entertainment", "Destination planning", "Full concierge"] },
    ],
  },
  birthday: {
    title: "Birthday Parties",
    tagline: "Celebrate Another Year of Amazing",
    description: "From kids' wonderlands to elegant adult celebrations, we turn every birthday into a vibrant, joyous occasion filled with surprises and delight.",
    image: birthdayImg,
    color: "peach",
    themes: ["Unicorn Fantasy", "Superhero Adventure", "Elegant Soirée", "Bollywood Night", "Garden Party"],
    packages: [
      { name: "Fun", price: "₹29,999", features: ["Up to 30 guests", "Theme décor", "Cake arrangement", "Games & activities", "2 hours"] },
      { name: "Super", price: "₹74,999", features: ["Up to 100 guests", "Custom theme", "Photography", "Catering", "Entertainment", "4 hours", "Return gifts"], popular: true },
      { name: "Grand", price: "₹1,99,999", features: ["Unlimited guests", "Premium venue", "Full catering", "Live entertainment", "Cinematic video", "Full day", "VIP arrangements"] },
    ],
  },
  funeral: {
    title: "Memorial Services",
    tagline: "Honoring Lives with Grace",
    description: "We provide compassionate, dignified memorial services that celebrate the life and legacy of your loved ones, with sensitivity and care.",
    image: memorialImg,
    color: "lavender",
    themes: ["Traditional Ceremony", "Celebration of Life", "Peaceful Garden", "Candlelight Tribute"],
    packages: [
      { name: "Simple", price: "₹19,999", features: ["Venue arrangement", "Floral tributes", "Basic setup", "Coordination"] },
      { name: "Graceful", price: "₹49,999", features: ["Premium venue", "Custom florals", "Photo memorial", "Catering", "Music arrangement", "Dedicated coordinator"], popular: true },
      { name: "Legacy", price: "₹99,999", features: ["Luxury venue", "Full service", "Video tribute", "Custom memorials", "Multi-day support", "Complete coordination"] },
    ],
  },
  corporate: {
    title: "Corporate Events",
    tagline: "Where Business Meets Brilliance",
    description: "Professional events that reflect your brand's excellence. From conferences and product launches to team-building retreats and award ceremonies.",
    image: corporateImg,
    color: "sky",
    themes: ["Tech Conference", "Product Launch", "Award Ceremony", "Team Retreat", "Networking Gala"],
    packages: [
      { name: "Professional", price: "₹99,999", features: ["Up to 100 attendees", "AV setup", "Stage design", "Registration desk", "Basic catering"] },
      { name: "Executive", price: "₹2,99,999", features: ["Up to 500 attendees", "Custom branding", "Full AV", "Premium catering", "Photography", "Entertainment", "Event app"], popular: true },
      { name: "Enterprise", price: "₹7,99,999", features: ["Unlimited attendees", "Multi-day", "Celebrity speakers", "Full production", "Live streaming", "VIP hospitality", "Complete branding"] },
    ],
  },
  "private-function": {
    title: "Private Functions",
    tagline: "Intimate Affairs, Perfectly Crafted",
    description: "From anniversary dinners to housewarming parties and baby showers, we create intimate, personal celebrations that feel just right.",
    image: privateImg,
    color: "mint",
    themes: ["Elegant Dinner", "Garden Soirée", "Rooftop Party", "Traditional Gathering", "Modern Chic"],
    packages: [
      { name: "Cozy", price: "₹24,999", features: ["Up to 25 guests", "Simple décor", "Venue coordination", "2 hours"] },
      { name: "Lovely", price: "₹64,999", features: ["Up to 75 guests", "Theme design", "Photography", "Catering", "Entertainment", "4 hours"], popular: true },
      { name: "Exquisite", price: "₹1,49,999", features: ["Up to 200 guests", "Luxury setup", "Full catering", "Live music", "Video coverage", "Full day", "Complete planning"] },
    ],
  },
};

const EventCategory = () => {
  const { slug } = useParams();
  const event = eventData[slug || ""];
  const { ref: pkgRef, isVisible: pkgVisible } = useScrollReveal();

  if (!event) {
    return (
      <PageLayout>
        <div className="py-32 text-center">
          <h1 className="text-3xl font-bold">Event not found</h1>
          <Link to="/events" className="text-primary mt-4 inline-block">← Back to Events</Link>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      {/* Hero */}
      <section className="gradient-hero py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-peach/10 blur-3xl float-gentle" />
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight"
              >
                {event.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.7 }}
                className="text-xl text-muted-foreground mt-4 font-display italic"
              >
                {event.tagline}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.7 }}
                className="text-muted-foreground mt-6 leading-relaxed max-w-lg"
              >
                {event.description}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="mt-8"
              >
                <Link
                  to="/booking"
                  className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl active:scale-[0.97]"
                >
                  Book Now <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="flex justify-center"
            >
              <img src={event.image} alt={event.title} className="w-full max-w-md float-gentle" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Themes */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Popular <span className="text-gradient-warm">Themes</span></h2>
          <div className="flex flex-wrap justify-center gap-4">
            {event.themes.map((theme, i) => (
              <motion.div
                key={theme}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                className="glass rounded-full px-6 py-3 text-sm font-medium text-foreground hover:bg-muted transition-colors cursor-pointer active:scale-[0.97]"
              >
                {theme}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 lg:py-28 gradient-section-alt" ref={pkgRef}>
        <div className="container mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
            Choose Your <span className="text-gradient-warm">Package</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {event.packages.map((pkg, i) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 24 }}
                animate={pkgVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.12 }}
                className={`glass rounded-2xl p-8 border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative ${
                  pkg.popular ? "border-peach shadow-lg shadow-peach/10" : "border-transparent"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-1 text-xs font-bold text-primary-foreground">
                    <Sparkles className="h-3 w-3" /> Most Popular
                  </div>
                )}
                <h3 className="text-lg font-bold">{pkg.name}</h3>
                <div className="mt-4">
                  <span className="text-3xl font-bold tabular-nums">{pkg.price}</span>
                  <span className="text-sm text-muted-foreground ml-2">starting from</span>
                </div>
                <ul className="mt-6 flex flex-col gap-3">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <Check className="h-4 w-4 text-peach mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/booking"
                  className={`mt-8 block text-center rounded-full py-3 text-sm font-semibold transition-all active:scale-[0.97] ${
                    pkg.popular
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-xl"
                      : "glass hover:bg-muted text-foreground"
                  }`}
                >
                  Select Package
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default EventCategory;
