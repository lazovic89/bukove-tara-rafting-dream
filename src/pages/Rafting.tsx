import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check, Shield, Clock, Users } from "lucide-react";
import raftingImg from "@/assets/rafting-action.jpg";
import heroImg from "@/assets/hero-tara.jpg";

const routes = [
  {
    name: "Jednodnevni rafting",
    duration: "4-5 sati na vodi",
    distance: "18 km (Brštanovica — Šćepan Polje)",
    price: "Od 50 KM / osobi",
    description: "Najpopularnija dionica — uzbudljivi brzaci, kristalno čista voda i spektakularni kanjon.",
  },
  {
    name: "Dvodnevni rafting",
    duration: "2 dana, 1 noć",
    distance: "58 km (Splavište — Šćepan Polje)",
    price: "Od 120 KM / osobi",
    description: "Kompletno iskustvo rijeke Tare — uključuje noćenje u kampu na obali rijeke.",
  },
  {
    name: "Trodnevni rafting",
    duration: "3 dana, 2 noći",
    distance: "82 km (cijela Tara)",
    price: "Od 200 KM / osobi",
    description: "Ultimativna avantura — provedite tri dana na najljepšoj rijeci Balkana.",
  },
];

const included = [
  "Kompletna rafting oprema (čamac, veslo, prsluk, kaciga, neopren)",
  "Licencirani rafting vodič",
  "Transport do startne tačke",
  "Obrok (ručak s roštiljem)",
  "Osiguranje",
];

const Rafting = () => {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative flex h-[50vh] items-center justify-center overflow-hidden">
        <img src={raftingImg} alt="Rafting na Tari" className="absolute inset-0 h-full w-full object-cover" width={1280} height={854} />
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl font-extrabold text-primary-foreground md:text-5xl">Rafting</h1>
          <p className="mt-2 text-primary-foreground/80">Spuštanje niz najdublji kanjon Evrope</p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground">Rijeka Tara — „Suza Evrope"</h2>
            <p className="text-muted-foreground leading-relaxed">
              Sa kanjonom dubokim 1.300 metara, rijeka Tara je pravo čudo prirode. Njene tirkizne vode,
              okružene netaknutim šumama i strmim liticama, pružaju rafting iskustvo koje ne možete
              doživjeti nigdje drugdje u Evropi. Bez obzira na to da li ste početnik ili iskusni
              avanturista, imamo savršenu turu za vas.
            </p>
          </div>
        </div>
      </section>

      {/* Routes / Pricing */}
      <section className="bg-muted py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-10 text-center text-3xl font-bold text-foreground">Naše ture</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {routes.map((route, i) => (
              <div
                key={route.name}
                className={`rounded-lg border bg-card p-6 shadow-sm flex flex-col ${
                  i === 1 ? "ring-2 ring-accent" : ""
                }`}
              >
                {i === 1 && (
                  <span className="mb-3 inline-block self-start rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                    Najpopularnije
                  </span>
                )}
                <h3 className="mb-2 text-xl font-bold text-foreground">{route.name}</h3>
                <p className="mb-4 text-sm text-muted-foreground">{route.description}</p>
                <div className="mt-auto space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4 text-accent" /> {route.duration}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-4 w-4 text-accent" /> {route.distance}
                  </div>
                  <p className="mt-4 text-lg font-bold text-foreground">{route.price}</p>
                </div>
                <Button asChild className="mt-4 bg-accent text-accent-foreground hover:bg-accent/90">
                  <Link to="/kontakt">Rezervišite</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto grid items-center gap-10 px-4 lg:grid-cols-2">
          <div>
            <h2 className="mb-6 text-3xl font-bold text-foreground">Šta je uključeno?</h2>
            <ul className="space-y-3">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-3 text-muted-foreground">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-3xl font-bold text-foreground">Sigurnost</h2>
            <div className="flex items-start gap-3">
              <Shield className="mt-1 h-6 w-6 shrink-0 text-accent" />
              <p className="text-muted-foreground leading-relaxed">
                Sigurnost naših gostiju je na prvom mjestu. Svi vodiči su licencirani i imaju
                višegodišnje iskustvo. Koristimo kvalitetnu opremu koja se redovno provjerava
                i održava. Prije svake ture, gosti prolaze kratku obuku o sigurnosti na vodi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-muted py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-10 text-center text-3xl font-bold text-foreground">Galerija</h2>
          <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
            {[raftingImg, heroImg, raftingImg].map((img, i) => (
              <div key={i} className="overflow-hidden rounded-lg shadow-lg">
                <img src={img} alt={`Rafting galerija ${i + 1}`} className="h-48 w-full object-cover md:h-64" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Rafting;
