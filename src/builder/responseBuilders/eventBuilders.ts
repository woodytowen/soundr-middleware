import { SoundrEvent } from '../../models/soundr/event';

export function buildSkiddleEvent(event: any): Partial<SoundrEvent> {
  return {
    name: event?.name ?? event?.eventname ?? null,
    date: event?.date ?? null,
    venue: event?.venue?.name ?? null,
    // ...other Skiddle-specific mappings
  };
}

// filepath: src/utils/responseBuilders/ticketmasterNormalizer.ts
export function buildTicketMasterEvent(event: any): Partial<SoundrEvent> {
  return {
    name: event?.name ?? null,
    date: event?.dates?.start?.dateTime ?? null,
    venue: event?._embedded?.venues?.[0]?.name ?? null,
    // ...other Ticketmaster-specific mappings
  };
}

export function buildSoundrEvent(partial: Partial<SoundrEvent>, source: 'skiddle' | 'ticketmaster'): SoundrEvent {
  return {
    name: partial.name ?? '',
    date: partial.date ?? '',
    venue: partial.venue ?? '',
    source,
    // fill in defaults for missing fields if needed
  };
}
