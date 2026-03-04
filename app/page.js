import HomeSearch from "@/components/home-search";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { featuredCars } from "@/lib/data";
import CarCard from "@/components/car-card";

export default function Home() {
  return (
    <div className="pt-20 flex flex-col">
      <section className="relative py-16 md:py-28 bg-gradient-to-br from-slate-900 via-slate-900 to-orange-800">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-8xl mb-4 gradient-title">
              Find Your Dream Car With Vehiql AI
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Advanced AI Car Search and Test Drive from Thousands of Vehicles
            </p>
          </div>
          <HomeSearch />
        </div>
      </section>

      <section>
        <div>
          <h2>Featured Cars</h2>
          <Button>
            View All <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </section>

      <div>
        {featuredCars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
}
