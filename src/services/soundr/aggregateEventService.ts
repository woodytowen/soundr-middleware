import { SoundrEvent } from '../../models/soundr/event';
import { getEventsSkiddle } from '../skiddle/skiddleService';
import { getEventsTicketMaster } from '../ticketMaster/ticketService';

//TODO return SoundrEvent
//This will be in a seperate file as a responseBuilder
const normalizeToSoundrEvent = (event: any, source: 'skiddle' | 'ticketmaster'): SoundrEvent => {
  // Map fields from each API to your SoundrEvent model
  return {
    name: event?.name ?? event?.eventname ?? null,
    date: event?.date ?? event?.dates?.start?.dateTime ?? null,
    venue: event?.venue?.name ?? event?._embedded?.venues?.[0]?.name ?? null,
    // ...other fields
    source: source,
  };
};

//TODO pass in required parameters - currently hardcoded in
export const aggregateSoundrEvents = async () => {
  // Call both APIs in parallel
  const [skiddleEvents, ticketmasterEvents] = await Promise.all([
    getEventsSkiddle({ genre: ['8', '80'] }),
    getEventsTicketMaster(),
  ]);

  // Normalize both sets of events
  const normalizedSkiddle = skiddleEvents.map((e) => normalizeToSoundrEvent(e, 'skiddle'));
  const normalizedTicketmaster = ticketmasterEvents.map((e) => normalizeToSoundrEvent(e, 'ticketmaster'));

  // Combine and deduplicate
  const allEvents = [...normalizedSkiddle, ...normalizedTicketmaster];
  const seen = new Set<string>();
  const deduped: SoundrEvent[] = [];

  for (const event of allEvents) {
    const key = `${event.name.toLowerCase()}|${event.date}|${event.venue.toLowerCase()}`;
    if (!seen.has(key)) {
      seen.add(key);
      deduped.push(event);
    }
  }

  return deduped;
};
