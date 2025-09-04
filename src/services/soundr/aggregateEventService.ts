import { getSkiddleGenreIds, getTicketmasterGenreIds } from '../../builder/requestBuilders/eventRequestBuilder';
import { SkiddleGenreKeys, TicketMasterGenreKeys } from '../../builder/requestBuilders/genreKeys';
import {
  buildSkiddleEvent,
  buildSoundrEvent,
  buildTicketMasterEvent,
} from '../../builder/responseBuilders/eventBuilders';
import { getEventsSkiddle } from '../skiddle/skiddleService';
import { getEventsTicketMaster } from '../ticketMaster/ticketService';
import { deduplicateEvents } from '../utils/serviceUtils';

export const aggregateSoundrEvents = async (req: any) => {
  const genreNames = Array.isArray(req.body.genres) ? req.body.genres : [req.body.genres].filter(Boolean);

  const skiddleGenreIds = getSkiddleGenreIds(genreNames);
  const ticketmasterGenreIds = getTicketmasterGenreIds(genreNames);

  const [skiddleEvents, ticketmasterEvents] = await fetchEvents(skiddleGenreIds, ticketmasterGenreIds);

  // Normalize
  const normalizedSkiddle = skiddleEvents.map((e) => buildSoundrEvent(buildSkiddleEvent(e), 'skiddle'));
  const normalizedTicketmaster = ticketmasterEvents.map((e) =>
    buildSoundrEvent(buildTicketMasterEvent(e), 'ticketmaster')
  );

  // Deduplicate (moved to utility)
  return deduplicateEvents([...normalizedSkiddle, ...normalizedTicketmaster]);
};

// Helper to fetch events based on genre IDs
const fetchEvents = async (skiddleGenreIds: string[], ticketmasterGenreIds: string[]) => {
  if (
    (!skiddleGenreIds || skiddleGenreIds.length === 0) &&
    (!ticketmasterGenreIds || ticketmasterGenreIds.length === 0)
  ) {
    return Promise.all([
      getEventsSkiddle({ genre: Object.values(SkiddleGenreKeys) }),
      getEventsTicketMaster({ genre: Object.values(TicketMasterGenreKeys) }),
    ]);
  }
  if (skiddleGenreIds && skiddleGenreIds.length > 0 && (!ticketmasterGenreIds || ticketmasterGenreIds.length === 0)) {
    return [await getEventsSkiddle({ genre: skiddleGenreIds }), []];
  }
  if ((!skiddleGenreIds || skiddleGenreIds.length === 0) && ticketmasterGenreIds && ticketmasterGenreIds.length > 0) {
    return [[], await getEventsTicketMaster({ genre: ticketmasterGenreIds })];
  }
  // Both have genres
  return Promise.all([
    getEventsSkiddle({ genre: skiddleGenreIds }),
    getEventsTicketMaster({ genre: ticketmasterGenreIds }),
  ]);
};
