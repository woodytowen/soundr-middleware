import { TicketMasterGenreKeys } from '../../builder/requestBuilders/genreKeys';
import { SoundrEventRequest } from '../../models/soundr/eventRequest';
import { convertLatLongToGeoHash, formatArrayForUrl } from '../util/routesUtils';

export const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/';

//Currently sorted on date ascending - future will have a POC for filtering
export const TICKET_MASTER_GET_EVENTS = (soundrEventRequest: SoundrEventRequest): string => {
  const params = new URLSearchParams({
    apikey: process.env.TICKET_MASTER_API_KEY || '',
    sort: 'date,asc',
  });

  // Create a copy to avoid mutating the original
  const genres = [...(soundrEventRequest.genre || [])];

  // Check if Dance & Electronic is in the list
  const hasDanceElectronic = genres.includes(TicketMasterGenreKeys.DANCE_AND_ELECTRONIC);

  if (hasDanceElectronic) {
    // Remove Dance & Electronic from the list
    const remainingGenres = genres.filter((genre) => genre !== TicketMasterGenreKeys.DANCE_AND_ELECTRONIC);

    if (remainingGenres.length === 0) {
      // Only Dance & Electronic - use genreId
      params.append('genreId', TicketMasterGenreKeys.DANCE_AND_ELECTRONIC);
    } else {
      // Dance & Electronic + others - use both genreId and subGenreId
      params.append('genreId', TicketMasterGenreKeys.DANCE_AND_ELECTRONIC);
      params.append('subGenreId', formatArrayForUrl(remainingGenres));
    }
  } else if (genres.length > 0) {
    // No Dance & Electronic, but other genres exist - use subGenreId only
    params.append('subGenreId', formatArrayForUrl(genres));
  }

  // Add pagination if offset is provided
  if (soundrEventRequest.offset && soundrEventRequest.offset > 0) {
    params.append('page', String(soundrEventRequest.offset));
  }

  if (soundrEventRequest.location) {
    params.append(
      'geoPoint',
      String(convertLatLongToGeoHash(soundrEventRequest.location.latitude, soundrEventRequest.location.longitude))
    );
    params.append('radius', String(soundrEventRequest.location.radius));
    params.append('unit', 'miles');
  }

  return `${BASE_URL}events.json?${params.toString()}`;
};

/**
 * page - the offset value for pagination
 */
