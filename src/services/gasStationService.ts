import { GasStation, UserLocation, PriorityType } from '@/types';

const API_BASE_URL = 'https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/';

// Interfaces para la respuesta de la API del Ministerio
interface ApiGasStation {
  'IDEESS': string; // ID de la estación
  'Rótulo': string; // Marca/nombre
  'Dirección': string; // Dirección
  'Localidad': string; // Localidad
  'Provincia': string; // Provincia
  'Latitud': string; // Latitud
  'Longitud (WGS84)': string; // Longitud
  'Precio Gasolina 95 E5': string; // Precio gasolina 95
  'Precio Gasoleo A': string; // Precio diésel
  'Horario': string; // Horario
}

interface ApiResponse {
  'Fecha': string;
  'ListaEESSPrecio': ApiGasStation[];
  'Nota': string;
  'ResultadoConsulta': string;
}

// Función para obtener datos de gasolineras desde la API oficial del Ministerio
async function fetchGasStationsFromAPI(): Promise<Omit<GasStation, 'distance'>[]> {
  try {
    const response = await fetch(API_BASE_URL);
    
    if (!response.ok) {
      throw new Error('Error al obtener datos de la API del Ministerio');
    }
    
    const data: ApiResponse = await response.json();
    
    // Procesar datos reales de la API oficial
    const gasStations: Omit<GasStation, 'distance'>[] = [];
    
    if (data.ListaEESSPrecio && data.ListaEESSPrecio.length > 0) {
      data.ListaEESSPrecio.forEach((station) => {
        // Parsear coordenadas
        const latitude = parseFloat(station.Latitud.replace(',', '.'));
        const longitude = parseFloat(station['Longitud (WGS84)'].replace(',', '.'));
        
        // Validar coordenadas
        if (isNaN(latitude) || isNaN(longitude)) {
          return; // Saltar estaciones sin coordenadas válidas
        }
        
        // Obtener precio (priorizar gasolina 95, luego diésel)
        let price = 0;
        const gasolina95 = station['Precio Gasolina 95 E5'];
        const diesel = station['Precio Gasoleo A'];
        
        if (gasolina95 && gasolina95 !== '' && gasolina95 !== '0,000') {
          price = parseFloat(gasolina95.replace(',', '.'));
        } else if (diesel && diesel !== '' && diesel !== '0,000') {
          price = parseFloat(diesel.replace(',', '.'));
        }
        
        // Solo incluir estaciones con precios válidos
        if (price <= 0) {
          return;
        }
        
        // Extraer marca/rótulo
        const brand = station.Rótulo || 'Genérica';
        
        // Construir dirección completa
        const address = `${station.Dirección}, ${station.Localidad}, ${station.Provincia}`;
        
        // Servicios básicos (se podrían expandir con más datos de la API)
        const services = ['Combustible'];
        if (station.Horario && station.Horario.includes('24')) {
          services.push('24 horas');
        }
        
        gasStations.push({
          id: station.IDEESS,
          name: `${brand} - ${station.Localidad}`,
          address: address,
          latitude,
          longitude,
          price,
          brand,
          services
        });
      });
    }
    
    // Si no hay datos suficientes, lanzar error
    if (gasStations.length === 0) {
      throw new Error('No se encontraron gasolineras con datos válidos en la API');
    }
    
    return gasStations;
  } catch (error) {
    console.error('Error fetching gas stations from API:', error);
    throw error;
  }
}

// Función para calcular la distancia entre dos puntos usando la fórmula de Haversine
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Radio de la Tierra en kilómetros
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return Math.round(distance * 100) / 100; // Redondear a 2 decimales
}

// Función principal para obtener gasolineras ordenadas por prioridad
export async function getGasStations(
  userLocation: UserLocation,
  priority: PriorityType,
  maxDistance: number = 10
): Promise<GasStation[]> {
  // Obtener datos desde la API real
  const gasStationsData = await fetchGasStationsFromAPI();

  // Calcular distancias y filtrar por distancia máxima
  const stationsWithDistance: GasStation[] = gasStationsData
    .map((station: Omit<GasStation, 'distance'>) => ({
      ...station,
      distance: calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        station.latitude,
        station.longitude
      )
    }))
    .filter((station: GasStation) => station.distance! <= maxDistance);

  // Ordenar según la prioridad
  if (priority === 'price') {
    return stationsWithDistance.sort((a, b) => a.price - b.price);
  } else {
    return stationsWithDistance.sort((a, b) => a.distance! - b.distance!);
  }
}

// Función para obtener detalles de una gasolinera específica
export async function getGasStationDetails(id: string): Promise<GasStation | null> {
  const gasStationsData = await fetchGasStationsFromAPI();
  
  const station = gasStationsData.find((s: Omit<GasStation, 'distance'>) => s.id === id);
  return station ? { ...station, distance: 0 } : null;
}