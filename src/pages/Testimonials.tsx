import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import TestimonialsSection from "@/components/TestimonialsSection";

const Testimonials = () => (
  <PageLayout>
    <section className="gradient-hero py-20 lg:py-28">
      <div className="container mx-auto px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight"
        >
          Client <span className="text-gradient-warm">Testimonials</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-muted-foreground mt-4 max-w-xl mx-auto"
        >
          Hear from the families and businesses we've served
        </motion.p>
      </div>
    </section>
    <TestimonialsSection />
  </PageLayout>
);

export default Testimonials;
