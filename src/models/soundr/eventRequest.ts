export interface SoundrEventRequest {
  // Location
  location?: Location;
  // List of Genre's from requested filter
  genre: string[];
  // the current page value
  offset: number;
}

interface Location {
  latitude: number;
  longitude: number;
  radius: number;
}
