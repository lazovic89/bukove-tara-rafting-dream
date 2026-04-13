import Header from "@/components/Header";
import Footer from "@/components/Footer";
import campImg from "@/assets/camp.jpg";
import heroImg from "@/assets/hero-tara.jpg";
import { Shield, Heart, Users } from "lucide-react";

const reasons = [
  { icon: Shield, title: "Sigurnost na prvom mjestu", desc: "Svi naši vodiči su licencirani i sertifikovani sa višegodišnjim iskustvom." },
  { icon: Heart, title: "Strastveni tim", desc: "Ljubav prema prirodi i avanturi je ono što nas pokreće svaki dan." },
  { icon: Users, title: "Porodična atmosfera", desc: "Mali kamp, personalizovana usluga i osjećaj kao kod kuće." },
];

const About = () => {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative flex h-[50vh] items-center justify-center overflow-hidden">
        <img src={heroImg} alt="Tara kanjon" className="absolute inset-0 h-full w-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl font-extrabold text-primary-foreground md:text-5xl">O nama</h1>
          <p className="mt-2 text-primary-foreground/80">Upoznajte Bukovi Tare</p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto grid items-center gap-10 px-4 lg:grid-cols-2">
          <div>
            <h2 className="mb-4 text-3xl font-bold text-foreground">Naša priča</h2>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              Bukovi Tare je nastao iz ljubavi prema rijeci Tari i njenom veličanstvenom kanjonu.
              Već više od 15 godina dočekujemo goste iz cijelog regiona i svijeta, pružajući im
              nezaboravna iskustva na vodi i u prirodi.
            </p>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              Naš kamp se nalazi u srcu stoljetne bukove šume, na obali kristalno čiste rijeke Tare —
              UNESCO zaštićene rijeke i najdubljeg kanjona u Evropi (1.300 metara dubine).
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Sa malim, porodičnim pristupom i pažnjom prema svakom gostu, trudimo se da svaki
              boravak bude jedinstven. Naš tim čine iskusni rafting vodiči, planinarski vodiči i
              domaćini koji poznaju svaki kutak ovog prekrasnog kraja.
            </p>
          </div>
          <div className="overflow-hidden rounded-lg shadow-xl">
            <img src={campImg} alt="Kamp Bukovi Tare" className="h-full w-full object-cover" loading="lazy" width={1280} height={854} />
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-muted py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-10 text-center text-3xl font-bold text-foreground">Zašto Bukovi Tare?</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {reasons.map((r) => (
              <div key={r.title} className="rounded-lg border bg-card p-6 text-center shadow-sm">
                <r.icon className="mx-auto mb-4 h-10 w-10 text-accent" />
                <h3 className="mb-2 text-lg font-semibold text-foreground">{r.title}</h3>
                <p className="text-sm text-muted-foreground">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
