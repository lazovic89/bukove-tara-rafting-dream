import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Bed, Wifi, ShowerHead, UtensilsCrossed, Mountain, TreePine } from "lucide-react";
import accommodationImg from "@/assets/accommodation.jpg";
import foodImg from "@/assets/food.jpg";

const rooms = [
  {
    name: "Dvokrevetna soba",
    desc: "Udobna soba sa bračnim krevetom ili dva odvojena ležaja, privatnim kupatilom i pogledom na šumu.",
    amenities: ["Privatno kupatilo", "Wi-Fi", "Grijanje", "Terasa"],
    price: "Od 40 KM / noć",
  },
  {
    name: "Trokrevetna soba",
    desc: "Prostranija soba idealna za manje grupe ili porodice sa djecom. Privatno kupatilo i balkon.",
    amenities: ["Privatno kupatilo", "Wi-Fi", "Grijanje", "Balkon"],
    price: "Od 55 KM / noć",
  },
  {
    name: "Apartman",
    desc: "Kompletno opremljen apartman sa dnevnim boravkom, kuhinjom i odvojenom spavaćom sobom. Idealno za porodice.",
    amenities: ["Kuhinja", "Dnevni boravak", "Wi-Fi", "Terasa sa pogledom"],
    price: "Od 80 KM / noć",
  },
];

const amenityIcons: Record<string, React.ElementType> = {
  "Privatno kupatilo": ShowerHead,
  "Wi-Fi": Wifi,
  "Grijanje": Mountain,
  "Terasa": TreePine,
  "Balkon": TreePine,
  "Kuhinja": UtensilsCrossed,
  "Dnevni boravak": Bed,
  "Terasa sa pogledom": TreePine,
};

const Accommodation = () => {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative flex h-[50vh] items-center justify-center overflow-hidden">
        <img src={accommodationImg} alt="Smještaj" className="absolute inset-0 h-full w-full object-cover" width={1280} height={854} />
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl font-extrabold text-primary-foreground md:text-5xl">Smještaj</h1>
          <p className="mt-2 text-primary-foreground/80">Udobnost u srcu prirode</p>
        </div>
      </section>

      {/* Rooms */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-10 text-center text-3xl font-bold text-foreground">Sobe i apartmani</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {rooms.map((room) => (
              <div key={room.name} className="rounded-lg border bg-card p-6 shadow-sm flex flex-col">
                <div className="mb-4 h-48 overflow-hidden rounded-lg bg-muted">
                  <img src={accommodationImg} alt={room.name} className="h-full w-full object-cover" loading="lazy" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-foreground">{room.name}</h3>
                <p className="mb-4 text-sm text-muted-foreground">{room.desc}</p>
                <div className="mb-4 flex flex-wrap gap-2">
                  {room.amenities.map((a) => {
                    const Icon = amenityIcons[a] || Bed;
                    return (
                      <span key={a} className="flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                        <Icon className="h-3 w-3" /> {a}
                      </span>
                    );
                  })}
                </div>
                <p className="mt-auto text-lg font-bold text-foreground">{room.price}</p>
                <Button asChild className="mt-4 bg-accent text-accent-foreground hover:bg-accent/90">
                  <Link to="/kontakt">Rezervišite</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Food */}
      <section className="bg-muted py-16 lg:py-24">
        <div className="container mx-auto grid items-center gap-10 px-4 lg:grid-cols-2">
          <div>
            <h2 className="mb-4 text-3xl font-bold text-foreground">Domaća kuhinja</h2>
            <p className="mb-4 text-muted-foreground leading-relaxed">
              U našem restoranu uživajte u autentičnim specijalitetima bosanske kuhinje.
              Sva jela se pripremaju od svježih, lokalnih namirnica — od domaćeg kajmaka i sira,
              do roštilja na drvenom ugljenu i tradicionalnih pita.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Doručak, ručak i večera su dostupni za sve goste. Posebni jelovnici za vegetarijance
              i djecu su dostupni na zahtjev.
            </p>
          </div>
          <div className="overflow-hidden rounded-lg shadow-xl">
            <img src={foodImg} alt="Domaća kuhinja" className="h-full w-full object-cover" loading="lazy" width={1280} height={854} />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Accommodation;
