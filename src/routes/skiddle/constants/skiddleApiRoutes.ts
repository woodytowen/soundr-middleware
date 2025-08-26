import { SkiddleEventRequest } from '../../../models/skiddle/eventRequest';
import { formatArrayForUrl } from '../../util/utils';

export const SKIDDLE_BASE_URL = 'https://www.skiddle.com/api/v1/';

/**
 *
 * TODO Note: On mobile application, if location services are not permitted,
 * need to make sure this API call for long, lat, radius are optional fields in the future
 *
 *
 */
export const SKIDDLE_EVENTS_SEARCH = (skiddleEvent: SkiddleEventRequest): string => {
  const params: Record<string, string> = {
    api_key: process.env.SKIDDLE_API_KEY || '',
  };

  if (skiddleEvent.latitude !== undefined) params.latitude = String(skiddleEvent.latitude);
  if (skiddleEvent.longitude !== undefined) params.longitude = String(skiddleEvent.longitude);
  if (skiddleEvent.radius !== undefined) params.radius = String(skiddleEvent.radius);
  if (skiddleEvent.genre && skiddleEvent.genre.length > 0) params.g = formatArrayForUrl(skiddleEvent.genre);

  const queryString = new URLSearchParams(params).toString();
  return `${SKIDDLE_BASE_URL}events/search/?${queryString}`;
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

export const SKIDDLE_GENRES = (() => {
  const params: Record<string, string> = {
    api_key: process.env.SKIDDLE_API_KEY || '',
  };
  const queryString = new URLSearchParams(params).toString();
  return `${SKIDDLE_BASE_URL}genres?${queryString}`;
})();

/* export const SKIDDLE_ARTIST_SEARCH = (artistName: string) => {
  return `${SKIDDLE_BASE_URL}/artists/?api_key=${process.env.SKIDDLE_API_KEY}&name=${artistName}`;
};

//TODO needs testing again API
export const SKIDDLE_ARTIST_EVENTS = (artistId: string) => {
  return `${SKIDDLE_BASE_URL}/artists/${artistId}/events?api_key=${process.env.SKIDDLE_API_KEY}`;
};

export const SKIDDLE_GENRES = `${SKIDDLE_BASE_URL}genres?api_key=${process.env.SKIDDLE_API_KEY}`; */
