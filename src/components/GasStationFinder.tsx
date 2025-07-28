'use client';

import { useState, useEffect, useCallback } from 'react';
import { MapPin, Fuel, Clock, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useGeolocation } from '@/hooks/useGeolocation';
import { getGasStations } from '@/services/gasStationService';
import { GasStation, PriorityType } from '@/types';
import { GasStationSkeleton, PrioritySelectorSkeleton } from '@/components/Skeleton';
import { GasStationCard } from '@/components/GasStationCard';

export function GasStationFinder() {
  const { location, error: locationError, loading: locationLoading, requestLocation } = useGeolocation();
  const [priority, setPriority] = useState<PriorityType>('price');
  const [gasStations, setGasStations] = useState<GasStation[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const fetchGasStations = useCallback(async () => {
    if (!location) return;

    setLoading(true);
    setSearchError(null);

    try {
      const stations = await getGasStations(location, priority, 15);
      setGasStations(stations);
    } catch (error) {
      setSearchError('Error al buscar gasolineras. Inténtalo de nuevo.');
      console.error('Error fetching gas stations:', error);
    } finally {
      setLoading(false);
    }
  }, [location, priority]);

  useEffect(() => {
    if (location) {
      fetchGasStations();
    }
  }, [location, fetchGasStations]);

  useEffect(() => {
    // Request location on component mount
    if (!location && !locationLoading && !locationError) {
      requestLocation();
    }
  }, [location, locationLoading, locationError, requestLocation]);

  const handlePriorityChange = (checked: boolean) => {
    setPriority(checked ? 'distance' : 'price');
  };

  if (locationLoading) {
    return (
      <div className="space-y-6">
        <PrioritySelectorSkeleton />
        <GasStationSkeleton />
      </div>
    );
  }

  if (locationError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="text-center space-y-2">
          <MapPin className="h-12 w-12 text-muted-foreground mx-auto" />
          <h3 className="text-lg font-semibold">Error de ubicación</h3>
          <p className="text-muted-foreground max-w-md">
            {locationError.message}
          </p>
        </div>
        <Button onClick={requestLocation} className="bg-primary-safe">
          Intentar de nuevo
        </Button>
      </div>
    );
  }

  if (!location) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="text-center space-y-2">
          <MapPin className="h-12 w-12 text-muted-foreground mx-auto" />
          <h3 className="text-lg font-semibold">Ubicación requerida</h3>
          <p className="text-muted-foreground max-w-md">
            Necesitamos tu ubicación para encontrar las gasolineras más cercanas.
          </p>
        </div>
        <Button onClick={requestLocation} className="bg-primary-safe">
          Permitir ubicación
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Control de prioridad */}
      <Card className="card-depth">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            ¿Qué priorizas?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Fuel className="h-4 w-4" />
                <span className={priority === 'price' ? 'font-semibold text-accent' : 'text-muted-foreground'}>
                  Precio más bajo
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Encuentra las gasolineras más baratas
              </p>
            </div>
            
            <Switch
              checked={priority === 'distance'}
              onCheckedChange={handlePriorityChange}
              className="data-[state=checked]:bg-accent"
            />
            
            <div className="space-y-1 text-right">
              <div className="flex items-center gap-2 justify-end">
                <span className={priority === 'distance' ? 'font-semibold text-accent' : 'text-muted-foreground'}>
                  Distancia más corta
                </span>
                <Clock className="h-4 w-4" />
              </div>
              <p className="text-sm text-muted-foreground">
                Encuentra las gasolineras más cercanas
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de gasolineras */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            Gasolineras {priority === 'price' ? 'más baratas' : 'más cercanas'}
          </h2>
          {gasStations.length > 0 && (
            <p className="text-sm text-muted-foreground">
              {gasStations.length} resultados encontrados
            </p>
          )}
        </div>

        {loading ? (
          <div className="space-y-6">
            <GasStationSkeleton />
          </div>
        ) : searchError ? (
          <Card className="card-depth">
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <p className="text-destructive">{searchError}</p>
                <Button onClick={fetchGasStations} variant="outline">
                  Reintentar
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : gasStations.length === 0 ? (
          <Card className="card-depth">
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <Fuel className="h-8 w-8 text-muted-foreground mx-auto" />
                <p className="text-muted-foreground">
                  No se encontraron gasolineras en tu área.
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {gasStations.map((station, index) => (
              <GasStationCard
                key={station.id}
                station={station}
                priority={priority}
                rank={index + 1}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}