import { SoundrEventRequest } from '../../models/soundr/eventRequest';
import { SkiddleGenreKeys, skiddleGenreMap, TicketMasterGenreKeys, ticketMasterGenreMap } from './genreKeys';

export const buildApiRequests = (soundrEventRequest: SoundrEventRequest): Record<string, SoundrEventRequest> => {
  return {
    skiddle: {
      genre: getSkiddleGenreIds(soundrEventRequest.genre),
      offset: soundrEventRequest.offset,
      location: soundrEventRequest.location,
    },
    ticketmaster: {
      genre: getTicketmasterGenreIds(soundrEventRequest.genre),
      offset: soundrEventRequest.offset,
      location: soundrEventRequest.location,
    },
  };
};

const getSkiddleGenreIds = (genres: string[]): string[] => {
  const ids = genres.map((name) => skiddleGenreMap[name]).filter(Boolean);
  return ids.length > 0 ? ids : Object.values(SkiddleGenreKeys); // undefined means "no filter"
};

const getTicketmasterGenreIds = (genres: string[]): string[] => {
  const ids = genres.map((name) => ticketMasterGenreMap[name]).filter(Boolean);
  return ids.length > 0 ? ids : [TicketMasterGenreKeys.DANCE_AND_ELECTRONIC]; // undefined means "no filter"
};
