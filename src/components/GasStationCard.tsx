import { Fuel, MapPin, Navigation, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { GasStation, PriorityType } from '@/types';

interface GasStationCardProps {
  station: GasStation;
  priority: PriorityType;
  rank: number;
}

export function GasStationCard({
  station,
  priority,
  rank,
}: GasStationCardProps) {
  const handleDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${station.latitude},${station.longitude}`;
    window.open(url, '_blank');
  };

  const getBrandColor = (brand: string) => {
    const colors: Record<string, string> = {
      REPSOL: 'bg-black',
      CEPSA: 'bg-red-500',
      BP: 'bg-green-500',
      SHELL: 'bg-yellow-500',
      GALP: 'bg-orange-500',
      PETRONOR: 'bg-purple-500',
      MOEVE: 'bg-blue-500',
      PLENERGY: 'bg-orange-500',
      PETROPRIX: 'bg-red-500',
      BALLENOIL: 'bg-blue-500',
      SUPECO: 'bg-yellow-500'
    };
    return colors[brand] || 'bg-gray-500';
  };

  return (
    <Card
      className={cn(
        'card-depth border-border',
        rank <= 3 && 'ring-2 ring-accent/20'
      )}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          {/* Información principal */}
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              {rank <= 3 && (
                <div
                  className={cn(
                    'flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold',
                    rank === 1
                      ? 'bg-yellow-500 text-yellow-900'
                      : rank === 2
                        ? 'bg-gray-400 text-gray-900'
                        : 'bg-orange-500 text-orange-900'
                  )}
                >
                  {rank}
                </div>
              )}
              <h3 className="font-semibold text-foreground">{station.name}</h3>
              <div
                className={cn(
                  'px-2 py-1 rounded-full text-xs font-medium text-white',
                  getBrandColor(station.brand)
                )}
              >
                {station.brand}
              </div>
            </div>

            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{station.address}</span>
            </div>

            {station.services.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {station.services.slice(0, 3).map((service) => (
                  <span
                    key={service}
                    className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded"
                  >
                    {service}
                  </span>
                ))}
                {station.services.length > 3 && (
                  <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">
                    +{station.services.length - 3} más
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Métricas principales */}
          <div className="text-right space-y-2">
            <div className="space-y-1">
              <div
                className={cn(
                  'flex items-center gap-1 text-lg font-bold',
                  priority === 'price' ? 'text-accent' : 'text-foreground'
                )}
              >
                <Fuel className="h-4 w-4" />
                <span>{station.price.toFixed(2)}€/L</span>
              </div>

              {station.distance !== undefined && (
                <div
                  className={cn(
                    'flex items-center gap-1 text-sm justify-end',
                    priority === 'distance'
                      ? 'text-accent font-semibold'
                      : 'text-muted-foreground'
                  )}
                >
                  <Navigation className="h-3 w-3" />
                  <span>{station.distance.toFixed(1)} km</span>
                </div>
              )}
            </div>

            <Button
              onClick={handleDirections}
              size="sm"
              className="bg-primary-safe hover:bg-primary/90"
            >
              <Navigation className="h-3 w-3 mr-1" />
              Ir
            </Button>
          </div>
        </div>

        {/* Indicador de mejor opción */}
        {rank === 1 && (
          <div className="mt-3 pt-3 border-t border-border">
            <div className="flex items-center gap-2 text-sm text-accent">
              <Star className="h-4 w-4 fill-current" />
              <span className="font-medium">
                {priority === 'price' ? 'Precio más bajo' : 'Más cercana'} en tu
                área
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
