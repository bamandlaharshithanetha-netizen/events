import { Link } from "react-router-dom";
import { Sparkles, Heart } from "lucide-react";

const footerLinks = {
  Events: [
    { label: "Weddings", href: "/events/wedding" },
    { label: "Birthdays", href: "/events/birthday" },
    { label: "Corporate", href: "/events/corporate" },
    { label: "Memorial", href: "/events/funeral" },
    { label: "Private", href: "/events/private-function" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Gallery", href: "/gallery" },
    { label: "Pricing", href: "/pricing" },
  ],
  Support: [
    { label: "Contact", href: "/contact" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "Book Event", href: "/booking" },
    { label: "Dashboard", href: "/dashboard" },
  ],
};

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card py-16">
      <div className="container mx-auto px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-peach" />
              <span className="font-display text-lg font-semibold">Momentra</span>
            </Link>
            <p className="text-sm text-muted-foreground mt-4 leading-relaxed max-w-xs">
              Crafting unforgettable moments with love, creativity, and meticulous attention to every detail.
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-bold text-foreground mb-4">{title}</h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">© 2026 Momentra. All rights reserved.</p>
          <p className="text-sm text-muted-foreground inline-flex items-center gap-1">
            Made with <Heart className="h-3.5 w-3.5 text-peach fill-peach" /> in India
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
