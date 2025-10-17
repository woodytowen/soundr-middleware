export interface SoundrEventRequest {
  // Location
  location?: Location;
  // List of Genre's from requested filter
  genre: string[];
  // the current page value
  offset: number;
}

/**
 * Future implementation - Location services not permitted, still allow user to pin point on map/ search
 * Then get GeoLocation to send to backend
 *
 * Or
 *
 * Pass City directly and get GeoLocation on Backend
 */
interface Location {
  latitude: number;
  longitude: number;
  radius: number;
}
