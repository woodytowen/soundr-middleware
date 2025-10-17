import { SoundrEventRequest } from '../../models/soundr/eventRequest';
import { formatArrayForUrl } from '../util/routesUtils';

export const SKIDDLE_BASE_URL = 'https://www.skiddle.com/api/v1/';

//TODO Note API is only limited to 20 results currently - Can add filter for Date and Time too - calendar stuff for FE
//Currently filtering all descending date also

export const SKIDDLE_EVENTS_SEARCH = (skiddleEvent: SoundrEventRequest): string => {
  const params: Record<string, string> = {
    api_key: process.env.SKIDDLE_API_KEY || '',
  };

  if (skiddleEvent.location) {
    params.latitude = String(skiddleEvent.location.latitude);
    params.longitude = String(skiddleEvent.location.longitude);
    params.radius = String(skiddleEvent.location.radius);
  }

  if (skiddleEvent.genre && skiddleEvent.genre.length > 0) params.g = formatArrayForUrl(skiddleEvent.genre);

  const queryString = new URLSearchParams(params).toString();
  return `${SKIDDLE_BASE_URL}events/search/?${queryString}&description=1&order=date&offset=${skiddleEvent.offset}`;
};

export const SKIDDLE_ARTIST_SEARCH = (artistName: string): string => {
  const params: Record<string, string> = {
    api_key: process.env.SKIDDLE_API_KEY || '',
    name: artistName,
  };
  const queryString = new URLSearchParams(params).toString();
  return `${SKIDDLE_BASE_URL}artists/?${queryString}`;
};

export const SKIDDLE_ARTIST_EVENTS = (artistId: string): string => {
  const params: Record<string, string> = {
    api_key: process.env.SKIDDLE_API_KEY || '',
  };
  const queryString = new URLSearchParams(params).toString();
  return `${SKIDDLE_BASE_URL}artists/${artistId}/events?${queryString}`;
};

/* export const SKIDDLE_ARTIST_SEARCH = (artistName: string) => {
  return `${SKIDDLE_BASE_URL}/artists/?api_key=${process.env.SKIDDLE_API_KEY}&name=${artistName}`;
};

//TODO needs testing again API
export const SKIDDLE_ARTIST_EVENTS = (artistId: string) => {
  return `${SKIDDLE_BASE_URL}/artists/${artistId}/events?api_key=${process.env.SKIDDLE_API_KEY}`;
};

export const SKIDDLE_GENRES = `${SKIDDLE_BASE_URL}genres?api_key=${process.env.SKIDDLE_API_KEY}`; */
