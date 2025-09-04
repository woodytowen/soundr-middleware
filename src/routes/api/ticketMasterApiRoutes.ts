import { SoundrEventRequest } from '../../models/soundr/eventRequest';
import { formatArrayForUrl } from '../util/utils';

export const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/';

export const TICKET_MASTER_GET_EVENTS = (soundrEventRequest: SoundrEventRequest) => {
  return `${BASE_URL}events.json?apikey=${process.env.TICKET_MASTER_API_KEY}&subGenreId=${formatArrayForUrl(soundrEventRequest.genre)}`;
};
