import { getSkiddleGenreIds, getTicketmasterGenreIds } from '../../builder/requestBuilders/eventRequestBuilder';
import { SkiddleGenreKeys, TicketMasterGenreKeys } from '../../builder/requestBuilders/genreKeys';
import { buildSkiddleEvent } from '../../builder/responseBuilders/buildSkiddleEvent';
import { buildTicketMasterEvent } from '../../builder/responseBuilders/buildTicketMasterEvent';
import { buildSoundrEvent } from '../../builder/responseBuilders/eventBuilders';
import { Result } from '../../models/rest-api/skiddleEventResponse';
import { Event as TicketMasterEvent } from '../../models/rest-api/ticketMasterEventResponse';
import { getEventsSkiddle } from '../skiddle/skiddleService';
import { getEventsTicketMaster } from '../ticketMaster/ticketService';
import { deduplicateEvents, sortByDate } from '../utils/serviceUtils';

export const aggregateSoundrEvents = async (req: any) => {
  const genreNames = Array.isArray(req.body.genres) ? req.body.genres : [req.body.genres].filter(Boolean);

  const skiddleGenreIds = getSkiddleGenreIds(genreNames);
  const ticketmasterGenreIds = getTicketmasterGenreIds(genreNames);

  const [skiddleEvents, ticketmasterEvents] = await fetchEvents(skiddleGenreIds, ticketmasterGenreIds);

  // Normalize
  const normalizedSkiddle = (skiddleEvents as Result[]).map((e) => buildSoundrEvent(buildSkiddleEvent(e), 'skiddle'));
  const normalizedTicketmaster = (ticketmasterEvents as TicketMasterEvent[]).map((e) =>
    buildSoundrEvent(buildTicketMasterEvent(e), 'ticketmaster')
  );

  // Deduplicate - TODO needs remaining
  const deDuped = deduplicateEvents([...normalizedSkiddle, ...normalizedTicketmaster]);
  return sortByDate(deDuped);
};

// Helper to fetch events based on genre IDs
const fetchEvents = async (skiddleGenreIds: string[], ticketmasterGenreIds: string[]) => {
  if (
    (!skiddleGenreIds || skiddleGenreIds.length === 0) &&
    (!ticketmasterGenreIds || ticketmasterGenreIds.length === 0)
  ) {
    // If no genres are specified
    return Promise.all([
      getEventsSkiddle({ genre: Object.values(SkiddleGenreKeys) }),
      getEventsTicketMaster({ genre: Object.values(TicketMasterGenreKeys) }),
    ]);
  }
  // If only Skiddle genres are found and specified
  if (skiddleGenreIds && skiddleGenreIds.length > 0 && (!ticketmasterGenreIds || ticketmasterGenreIds.length === 0)) {
    return [await getEventsSkiddle({ genre: skiddleGenreIds }), []];
  }
  //If only TicketMaster genres are found and specified
  if ((!skiddleGenreIds || skiddleGenreIds.length === 0) && ticketmasterGenreIds && ticketmasterGenreIds.length > 0) {
    return [[], await getEventsTicketMaster({ genre: ticketmasterGenreIds })];
  }
  // Both have genres
  return Promise.all([
    getEventsSkiddle({ genre: skiddleGenreIds }),
    getEventsTicketMaster({ genre: ticketmasterGenreIds }),
  ]);
};
