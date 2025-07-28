import { Fuel } from 'lucide-react';
import { GasStationFinder } from '@/components/GasStationFinder';
import { Hero } from '@/components/Hero';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Hero Component */}
          <Hero />

          {/* Gas Station Finder Component */}
          <GasStationFinder />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <Fuel className="h-5 w-5 text-primary" />
              <span className="font-semibold text-foreground">Gas Cheap</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Encuentra las mejores opciones de combustible cerca de ti
            </p>
            <div className="flex justify-center gap-6 text-xs text-muted-foreground">
              <span>© 2025 Gas Cheap</span>
              <span>•</span>
              <span>Hecho con ❤️ by AlbertoNRom</span>
              <span>•</span>
              <span>Datos en tiempo real</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
