import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sparkles } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, isAdmin } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-strong py-3" : "py-5"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2 group">
          <Sparkles className="h-6 w-6 text-peach transition-transform duration-300 group-hover:rotate-12" />
          <span className="font-display text-xl font-semibold tracking-tight text-foreground">Momentra</span>
        </Link>

        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className={`text-sm font-medium transition-colors duration-200 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-peach after:transition-all after:duration-300 hover:after:w-full ${
                location.pathname === link.href ? "text-foreground after:w-full" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          {user ? (
            <div className="flex items-center gap-3">
              {isAdmin && (
                <Link to="/admin" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Admin</Link>
              )}
              <Link to="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Dashboard</Link>
              <Link to="/booking" className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:shadow-xl active:scale-[0.97]">
                Book Now
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/auth" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Login</Link>
              <Link to="/booking" className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:shadow-xl active:scale-[0.97]">
                Book Now
              </Link>
            </div>
          )}
        </div>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors active:scale-95">
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden glass-strong mx-4 mt-2 rounded-2xl overflow-hidden"
          >
            <div className="flex flex-col gap-1 p-4">
              {navLinks.map((link) => (
                <Link key={link.label} to={link.href}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    location.pathname === link.href ? "bg-muted text-foreground" : "text-foreground hover:bg-muted"
                  }`}>
                  {link.label}
                </Link>
              ))}
              {user ? (
                <>
                  {isAdmin && <Link to="/admin" className="px-4 py-3 rounded-xl text-sm font-medium text-foreground hover:bg-muted">Admin Panel</Link>}
                  <Link to="/dashboard" className="px-4 py-3 rounded-xl text-sm font-medium text-foreground hover:bg-muted">Dashboard</Link>
                </>
              ) : (
                <Link to="/auth" className="px-4 py-3 rounded-xl text-sm font-medium text-foreground hover:bg-muted">Login / Sign Up</Link>
              )}
              <Link to="/booking" className="mx-4 mt-2 rounded-full bg-primary px-5 py-2.5 text-center text-sm font-semibold text-primary-foreground">
                Book Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
