import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { to: "/", label: "Početna" },
  { to: "/o-nama", label: "O nama" },
  { to: "/rafting", label: "Rafting" },
  { to: "/smjestaj", label: "Smještaj" },
  { to: "/aktivnosti", label: "Aktivnosti" },
  { to: "/kontakt", label: "Kontakt" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="text-xl font-bold text-primary-foreground tracking-wide">
          BUKOVI TARE
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-colors hover:text-accent ${
                location.pathname === link.to
                  ? "text-accent"
                  : "text-primary-foreground/80"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="tel:+38765123456"
            className="flex items-center gap-2 text-sm text-primary-foreground/80"
          >
            <Phone className="h-4 w-4" />
            +387 65 123 456
          </a>
          <Button
            asChild
            className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold"
          >
            <Link to="/kontakt">Rezervišite</Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-primary-foreground lg:hidden"
          aria-label="Menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="border-t border-primary-foreground/10 bg-primary px-4 pb-4 lg:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className={`block py-3 text-sm font-medium transition-colors ${
                location.pathname === link.to
                  ? "text-accent"
                  : "text-primary-foreground/80"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="tel:+38765123456"
            className="flex items-center gap-2 py-3 text-sm text-primary-foreground/80"
          >
            <Phone className="h-4 w-4" />
            +387 65 123 456
          </a>
          <Button
            asChild
            className="mt-2 w-full bg-accent text-accent-foreground hover:bg-accent/90"
          >
            <Link to="/kontakt" onClick={() => setIsOpen(false)}>
              Rezervišite
            </Link>
          </Button>
        </nav>
      )}
    </header>
  );
};

export default Header;
