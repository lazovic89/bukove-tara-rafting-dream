import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import heroImg from "@/assets/hero-tara.jpg";

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "", date: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Poruka poslata!",
      description: "Hvala vam na interesovanju. Odgovorićemo vam u najkraćem roku.",
    });
    setForm({ name: "", email: "", phone: "", message: "", date: "" });
  };

  return (
    <div className="min-h-screen">
      <Header />

      <section className="relative flex h-[40vh] items-center justify-center overflow-hidden">
        <img src={heroImg} alt="Kontakt" className="absolute inset-0 h-full w-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl font-extrabold text-primary-foreground md:text-5xl">Kontakt</h1>
          <p className="mt-2 text-primary-foreground/80">Javite nam se — tu smo za vas</p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-2">
          {/* Form */}
          <div>
            <h2 className="mb-6 text-2xl font-bold text-foreground">Pošaljite upit</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Ime i prezime</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  maxLength={100}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  maxLength={255}
                />
              </div>
              <div>
                <Label htmlFor="phone">Telefon</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  maxLength={20}
                />
              </div>
              <div>
                <Label htmlFor="date">Željeni datum dolaska</Label>
                <Input
                  id="date"
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="message">Poruka</Label>
                <Textarea
                  id="message"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                  maxLength={1000}
                  rows={5}
                />
              </div>
              <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
                Pošaljite poruku
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="mb-6 text-2xl font-bold text-foreground">Kontakt informacije</h2>
            <div className="space-y-4 mb-8">
              <a href="tel:+38765123456" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                <Phone className="h-5 w-5 text-accent" /> +387 65 123 456
              </a>
              <a href="mailto:info@bukovitare.com" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="h-5 w-5 text-accent" /> info@bukovitare.com
              </a>
              <div className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="h-5 w-5 shrink-0 text-accent mt-0.5" />
                <span>Kanjon rijeke Tare, Bosna i Hercegovina</span>
              </div>
              <a
                href="https://wa.me/38765123456"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <MessageCircle className="h-5 w-5 text-accent" /> WhatsApp / Viber
              </a>
            </div>

            <h3 className="mb-4 text-lg font-semibold text-foreground">Kako doći?</h3>
            <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
              Kamp Bukovi Tare se nalazi u kanjonu rijeke Tare. Pristup je moguć automobilom
              iz pravca Foče, Pljevlja ili Žabljaka. GPS koordinate i detaljne upute
              šaljemo vam nakon potvrde rezervacije.
            </p>

            {/* Map placeholder */}
            <div className="overflow-hidden rounded-lg border bg-muted h-64 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <MapPin className="mx-auto mb-2 h-8 w-8" />
                <p className="text-sm">Google Maps — lokacija kampa</p>
                <p className="text-xs">Kanjon rijeke Tare, BiH</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
