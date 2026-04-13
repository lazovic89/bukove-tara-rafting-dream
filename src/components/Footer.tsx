import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <h3 className="mb-4 text-lg font-bold">BUKOVI TARE</h3>
            <p className="text-sm text-primary-foreground/70">
              Rafting kamp na rijeci Tari — nezaboravna avantura u srcu kanjona.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 font-semibold">Brzi linkovi</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link to="/" className="hover:text-accent transition-colors">Početna</Link></li>
              <li><Link to="/o-nama" className="hover:text-accent transition-colors">O nama</Link></li>
              <li><Link to="/rafting" className="hover:text-accent transition-colors">Rafting</Link></li>
              <li><Link to="/smjestaj" className="hover:text-accent transition-colors">Smještaj</Link></li>
              <li><Link to="/aktivnosti" className="hover:text-accent transition-colors">Aktivnosti</Link></li>
              <li><Link to="/kontakt" className="hover:text-accent transition-colors">Kontakt</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 font-semibold">Kontakt</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" />
                <a href="tel:+38765123456" className="hover:text-accent transition-colors">+387 65 123 456</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" />
                <a href="mailto:info@bukovitare.com" className="hover:text-accent transition-colors">info@bukovitare.com</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                <span>Kanjon rijeke Tare, Bosna i Hercegovina</span>
              </li>
            </ul>
          </div>

          {/* Social / Viber / WhatsApp */}
          <div>
            <h4 className="mb-4 font-semibold">Pratite nas</h4>
            <div className="flex flex-col gap-2 text-sm text-primary-foreground/70">
              <a
                href="https://wa.me/38765123456"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
              >
                WhatsApp
              </a>
              <a
                href="viber://chat?number=%2B38765123456"
                className="hover:text-accent transition-colors"
              >
                Viber
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
              >
                Facebook
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-primary-foreground/10 pt-6 text-center text-sm text-primary-foreground/50">
          © {new Date().getFullYear()} Bukovi Tare. Sva prava zadržana.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
