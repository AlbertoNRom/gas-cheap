export interface GasStation {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  price: number;
  distance?: number;
  brand: string;
  services: string[];
}

export interface UserLocation {
  latitude: number;
  longitude: number;
}

export type PriorityType = 'price' | 'distance';

export interface SearchFilters {
  priority: PriorityType;
  maxDistance: number;
  fuelType: 'gasoline' | 'diesel' | 'premium';
}

export interface GeolocationError {
  code: number;
  message: string;
}