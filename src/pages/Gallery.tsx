import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const galleryImages = [
  { url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600", title: "Elegant Wedding Setup", category: "Wedding" },
  { url: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600", title: "Colorful Birthday Party", category: "Birthday" },
  { url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600", title: "Corporate Gala Night", category: "Corporate" },
  { url: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600", title: "Garden Reception", category: "Wedding" },
  { url: "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=600", title: "DJ Night", category: "Birthday" },
  { url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600", title: "Conference Setup", category: "Corporate" },
  { url: "https://images.unsplash.com/photo-1478146059778-26028b07395a?w=600", title: "Floral Arrangement", category: "Wedding" },
  { url: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=600", title: "Kids Party", category: "Birthday" },
  { url: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=600", title: "Evening Celebration", category: "Private" },
];

const Gallery = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <PageLayout>
      <section className="gradient-hero py-20 lg:py-28">
        <div className="container mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight"
          >
            Our <span className="text-gradient-warm">Gallery</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground mt-4 max-w-xl mx-auto"
          >
            A glimpse into the magic we create
          </motion.p>
        </div>
      </section>

      <section className="py-20 lg:py-28" ref={ref}>
        <div className="container mx-auto px-6">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {galleryImages.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.05 + i * 0.06 }}
                className="break-inside-avoid group relative overflow-hidden rounded-2xl cursor-pointer"
              >
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors duration-300 flex items-end">
                  <div className="p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white font-bold text-sm">{img.title}</p>
                    <p className="text-white/70 text-xs">{img.category}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Gallery;
