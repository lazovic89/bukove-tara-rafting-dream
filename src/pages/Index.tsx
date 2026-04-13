import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Waves, Mountain, Bed, Star, Phone, Mail, MapPin, ChevronRight, Users, Clock, Shield } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import heroImg from "@/assets/hero-tara.jpg";
import raftingImg from "@/assets/rafting-action.jpg";
import hikingImg from "@/assets/hiking.jpg";
import accommodationImg from "@/assets/accommodation.jpg";
import foodImg from "@/assets/food.jpg";
import campImg from "@/assets/camp.jpg";

const stats = [
  { icon: Waves, value: "82 km", label: "rijeke Tare" },
  { icon: Clock, value: "15+", label: "godina iskustva" },
  { icon: Users, value: "5000+", label: "zadovoljnih gostiju" },
  { icon: Shield, value: "100%", label: "sigurnost" },
];

const testimonials = [
  {
    name: "Marko P.",
    text: "Nezaboravno iskustvo! Rafting na Tari je bio vrhunac našeg ljeta. Ekipa iz Bukovi Tare je profesionalna i gostoprimljiva.",
    rating: 5,
  },
  {
    name: "Ana S.",
    text: "Smještaj je odličan, hrana domaća i ukusna, a priroda oko kampa je predivna. Vraćamo se svake godine!",
    rating: 5,
  },
  {
    name: "Stefan M.",
    text: "Savršeno organizovano — od dolaska do odlaska. Planinarenje i rafting su bili fantastični. Preporučujem svima!",
    rating: 5,
  },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <img
          src={heroImg}
          alt="Kanjon rijeke Tare"
          className="absolute inset-0 h-full w-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="relative z-10 px-4 text-center">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-primary-foreground md:text-6xl lg:text-7xl">
            Bukovi Tare
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-primary-foreground/90 md:text-xl">
            Avantura na rijeci Tari — rafting, planinarenje i uživanje u srcu najdubljeg kanjona Evrope
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              asChild
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 text-base font-semibold px-8"
            >
              <Link to="/kontakt">Rezervišite</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-base"
            >
              <Link to="/rafting">Saznajte više</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-primary py-8">
        <div className="container mx-auto grid grid-cols-2 gap-6 px-4 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center text-center">
              <stat.icon className="mb-2 h-8 w-8 text-accent" />
              <span className="text-2xl font-bold text-primary-foreground">{stat.value}</span>
              <span className="text-sm text-primary-foreground/70">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* About Snippet */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto grid items-center gap-10 px-4 lg:grid-cols-2">
          <div>
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              Dobrodošli u Bukovi Tare
            </h2>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              Smješteni u srcu kanjona rijeke Tare, naš kamp nudi savršen spoj avanture i odmora.
              Okruženi stoljetnim šumama bukve i kristalno čistom rijekom, Bukovi Tare je idealno
              mjesto za sve ljubitelje prirode i adrenalina.
            </p>
            <p className="mb-6 text-muted-foreground leading-relaxed">
              Sa više od 15 godina iskustva u organizaciji raftinga i planinarenja, naš tim
              profesionalnih vodiča garantuje sigurno i nezaboravno iskustvo za sve uzraste.
            </p>
            <Button asChild variant="outline" className="group">
              <Link to="/o-nama">
                Više o nama
                <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
          <div className="overflow-hidden rounded-lg shadow-xl">
            <img
              src={campImg}
              alt="Kamp Bukovi Tare"
              className="h-full w-full object-cover"
              loading="lazy"
              width={1280}
              height={854}
            />
          </div>
        </div>
      </section>

      {/* Activities Preview */}
      <section className="bg-muted py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-2 text-center text-3xl font-bold text-foreground md:text-4xl">
            Naše aktivnosti
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-center text-muted-foreground">
            Od uzbudljivog raftinga do mirnih planinskih staza — odaberite svoju avanturu
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Rafting Card */}
            <Link to="/rafting" className="group relative overflow-hidden rounded-lg shadow-lg">
              <img
                src={raftingImg}
                alt="Rafting na Tari"
                className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105 md:h-80"
                loading="lazy"
                width={1280}
                height={854}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
              <div className="absolute bottom-0 p-6">
                <div className="mb-2 flex items-center gap-2">
                  <Waves className="h-5 w-5 text-accent" />
                  <h3 className="text-xl font-bold text-primary-foreground">Rafting</h3>
                </div>
                <p className="text-sm text-primary-foreground/80">
                  Spuštanje niz 82 km rijeke Tare kroz najdublji kanjon Evrope
                </p>
              </div>
            </Link>

            {/* Hiking Card */}
            <Link to="/aktivnosti" className="group relative overflow-hidden rounded-lg shadow-lg">
              <img
                src={hikingImg}
                alt="Planinarenje"
                className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105 md:h-80"
                loading="lazy"
                width={1280}
                height={854}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
              <div className="absolute bottom-0 p-6">
                <div className="mb-2 flex items-center gap-2">
                  <Mountain className="h-5 w-5 text-accent" />
                  <h3 className="text-xl font-bold text-primary-foreground">Planinarenje</h3>
                </div>
                <p className="text-sm text-primary-foreground/80">
                  Istražite prekrasne planinske staze i vidikovce nad kanjonom
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Accommodation Preview */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto grid items-center gap-10 px-4 lg:grid-cols-2">
          <div className="order-2 lg:order-1 overflow-hidden rounded-lg shadow-xl">
            <img
              src={accommodationImg}
              alt="Smještaj"
              className="h-full w-full object-cover"
              loading="lazy"
              width={1280}
              height={854}
            />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              Udoban smještaj
            </h2>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              Naše sobe i apartmani pružaju udobnost i toplinu planinskog doma.
              Svaka jedinica je opremljena svim potrebnim sadržajima za ugodan boravak.
            </p>
            <ul className="mb-6 space-y-2 text-muted-foreground">
              <li className="flex items-center gap-2">
                <Bed className="h-4 w-4 text-accent" /> Udobne sobe sa kupatilom
              </li>
              <li className="flex items-center gap-2">
                <Bed className="h-4 w-4 text-accent" /> Apartmani za porodice
              </li>
              <li className="flex items-center gap-2">
                <Bed className="h-4 w-4 text-accent" /> Pogled na rijeku i šumu
              </li>
            </ul>
            <Button asChild variant="outline" className="group">
              <Link to="/smjestaj">
                Pogledajte smještaj
                <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Traditional Food Section */}
      <section className="bg-muted py-16 lg:py-24">
        <div className="container mx-auto grid items-center gap-10 px-4 lg:grid-cols-2">
          <div>
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              Domaća kuhinja
            </h2>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              Uživajte u autentičnim specijalitetima tradicionalne bosanske kuhinje.
              Svi obroci se pripremaju od svježih, lokalnih namirnica.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Od jutarnjeg doručka uz domaći kajmak i med, do večere sa roštiljem
              na otvorenoj terasi s pogledom na kanjon — svaki obrok je poseban doživljaj.
            </p>
          </div>
          <div className="overflow-hidden rounded-lg shadow-xl">
            <img
              src={foodImg}
              alt="Domaća hrana"
              className="h-full w-full object-cover"
              loading="lazy"
              width={1280}
              height={854}
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-2 text-center text-3xl font-bold text-foreground md:text-4xl">
            Šta kažu naši gosti
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-center text-muted-foreground">
            Iskustva naših zadovoljnih posjetilaca
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="rounded-lg border bg-card p-6 shadow-sm"
              >
                <div className="mb-3 flex gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="mb-4 text-sm text-muted-foreground italic">"{t.text}"</p>
                <p className="font-semibold text-foreground">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / CTA */}
      <section className="bg-primary py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold text-primary-foreground md:text-4xl">
            Rezervišite svoju avanturu
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-primary-foreground/80">
            Kontaktirajte nas za rezervaciju ili dodatne informacije. Dostupni smo putem telefona, emaila, Vibera ili WhatsAppa.
          </p>
          <div className="mb-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="tel:+38765123456"
              className="flex items-center gap-2 text-primary-foreground/80 hover:text-accent transition-colors"
            >
              <Phone className="h-5 w-5" /> +387 65 123 456
            </a>
            <a
              href="mailto:info@bukovitare.com"
              className="flex items-center gap-2 text-primary-foreground/80 hover:text-accent transition-colors"
            >
              <Mail className="h-5 w-5" /> info@bukovitare.com
            </a>
            <span className="flex items-center gap-2 text-primary-foreground/80">
              <MapPin className="h-5 w-5" /> Kanjon rijeke Tare
            </span>
          </div>
          <Button
            asChild
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-accent/90 text-base font-semibold px-10"
          >
            <Link to="/kontakt">Kontaktirajte nas</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
