import { getSkiddleGenreIds, getTicketmasterGenreIds } from '../../builder/requestBuilders/eventRequestBuilder';
import { buildSkiddleEvent } from '../../builder/responseBuilders/buildSkiddleEvent';
import { buildTicketMasterEvent } from '../../builder/responseBuilders/buildTicketMasterEvent';
import { buildSoundrEvent } from '../../builder/responseBuilders/eventBuilders';
import { Result } from '../../models/rest-api/skiddleEventResponse';
import { Event as TicketMasterEvent } from '../../models/rest-api/ticketMasterEventResponse';
import { SoundrEventRequest } from '../../models/soundr/eventRequest';
import { deduplicateEvents, sortByDate } from '../utils/serviceUtils';
import { API_CONFIGS } from './apiConfig';

export const aggregateSoundrEvents = async (soundrEventRequest: SoundrEventRequest) => {
  // Build Events for configured APIs
  const requests = buildApiRequests(soundrEventRequest);

  // Fetch Requests from both API's
  const [skiddleEvents, ticketmasterEvents] = await fetchEvents(requests);

  // Normalize the results (building custom response)
  const normalizedSkiddle = (skiddleEvents as Result[]).map((e) => buildSoundrEvent(buildSkiddleEvent(e), 'skiddle'));
  const normalizedTicketmaster = (ticketmasterEvents as TicketMasterEvent[]).map((e) =>
    buildSoundrEvent(buildTicketMasterEvent(e), 'ticketmaster')
  );

  // Removing Duplicate Events
  const deDuped = deduplicateEvents([...normalizedSkiddle, ...normalizedTicketmaster]);

  //Return Results sorted by date - We sort again to merge Rest API responses so they're not out of order
  return sortByDate(deDuped);
};

const fetchEvents = async (requests: Record<string, SoundrEventRequest>) => {
  // Check which APIs have genre filters
  const apisWithGenres = API_CONFIGS.filter((api) => requests[api.name] && api.hasGenres(requests[api.name]));

  // If no APIs have genres, fetch all from all APIs
  if (apisWithGenres.length === 0) {
    return Promise.all(API_CONFIGS.map((api) => api.service(requests[api.name] || {})));
  }

  // Fetch only from APIs that have genre filters
  const results = await Promise.all(
    API_CONFIGS.map((api) =>
      apisWithGenres.some((filteredApi) => filteredApi.name === api.name)
        ? api.service(requests[api.name])
        : Promise.resolve([])
    )
  );

  return results;
};

const buildApiRequests = (soundrEventRequest: SoundrEventRequest): Record<string, SoundrEventRequest> => {
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
