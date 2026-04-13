import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mountain, TreePine, Droplets, Eye } from "lucide-react";
import hikingImg from "@/assets/hiking.jpg";
import heroImg from "@/assets/hero-tara.jpg";

const activities = [
  {
    icon: Mountain,
    title: "Planinarenje",
    desc: "Istražite prekrasne planinske staze kroz netaknute šume i livade sa spektakularnim pogledima na kanjon Tare.",
  },
  {
    icon: TreePine,
    title: "Šetnje prirodom",
    desc: "Kratke šetnje pogodne za sve uzraste — otkrijte bogatstvo flore i faune ovog UNESCO zaštićenog područja.",
  },
  {
    icon: Droplets,
    title: "Vodopadi",
    desc: "Posjetite skrivene vodopade u kanjonu — prirodna čuda do kojih vode slikovite staze kroz šumu.",
  },
  {
    icon: Eye,
    title: "Vidikovci",
    desc: "Uživajte u panoramskim pogledima sa vidikovaca iznad kanjona — savršena prilika za fotografije.",
  },
];

const attractions = [
  "Kanjon rijeke Tare — najdublji kanjon Evrope (1.300m)",
  "Most Đurđevića Tara — ikonični most iz 1940. godine",
  "Nacionalni park Durmitor (UNESCO)",
  "Crno jezero — „Oči Gore"",
  "Biogradska gora — jedna od posljednjih prašuma Evrope",
];

const Activities = () => {
  return (
    <div className="min-h-screen">
      <Header />

      <section className="relative flex h-[50vh] items-center justify-center overflow-hidden">
        <img src={hikingImg} alt="Aktivnosti" className="absolute inset-0 h-full w-full object-cover" width={1280} height={854} />
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl font-extrabold text-primary-foreground md:text-5xl">Aktivnosti</h1>
          <p className="mt-2 text-primary-foreground/80">Planinarenje, priroda i istraživanje</p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-10 text-center text-3xl font-bold text-foreground">Šta vas čeka</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {activities.map((a) => (
              <div key={a.title} className="rounded-lg border bg-card p-6 shadow-sm text-center">
                <a.icon className="mx-auto mb-4 h-10 w-10 text-accent" />
                <h3 className="mb-2 text-lg font-semibold text-foreground">{a.title}</h3>
                <p className="text-sm text-muted-foreground">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted py-16 lg:py-24">
        <div className="container mx-auto grid items-center gap-10 px-4 lg:grid-cols-2">
          <div>
            <h2 className="mb-6 text-3xl font-bold text-foreground">Okolne atrakcije</h2>
            <ul className="space-y-3">
              {attractions.map((a) => (
                <li key={a} className="flex items-start gap-3 text-muted-foreground">
                  <Mountain className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
                  {a}
                </li>
              ))}
            </ul>
          </div>
          <div className="overflow-hidden rounded-lg shadow-xl">
            <img src={heroImg} alt="Kanjon Tare" className="h-full w-full object-cover" loading="lazy" width={1920} height={1080} />
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-10 text-center text-3xl font-bold text-foreground">Galerija</h2>
          <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
            {[hikingImg, heroImg, hikingImg].map((img, i) => (
              <div key={i} className="overflow-hidden rounded-lg shadow-lg">
                <img src={img} alt={`Galerija ${i + 1}`} className="h-48 w-full object-cover md:h-64" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Activities;
