import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import PricingSection from "@/components/PricingSection";

const Pricing = () => (
  <PageLayout>
    <section className="gradient-hero py-20 lg:py-28">
      <div className="container mx-auto px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight"
        >
          Our <span className="text-gradient-warm">Pricing</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-muted-foreground mt-4 max-w-xl mx-auto"
        >
          Transparent pricing for every budget
        </motion.p>
      </div>
    </section>
    <PricingSection />
    <div className="text-center pb-20">
      <p className="text-muted-foreground mb-4">Want a custom quote for your specific event?</p>
      <Link
        to="/contact"
        className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl active:scale-[0.97]"
      >
        Get Custom Quote
      </Link>
    </div>
  </PageLayout>
);

export default Pricing;
