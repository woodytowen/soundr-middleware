import { SoundrEvent } from '../../models/soundr/event';

export function buildSoundrEvent(partial: Partial<SoundrEvent>, source: 'skiddle' | 'ticketmaster'): SoundrEvent {
  return {
    name: partial.name ?? '',
    date: partial.date ?? '',
    venue: partial.venue ?? '',
    source,
    skiddleDeeplink: partial.skiddleDeeplink ?? '',
    ticketMasterDeeplink: partial.ticketMasterDeeplink ?? '',
    venueDetails: partial.venueDetails ?? {
      name: '',
      address: '',
      postcode: '',
      eventType: '',
    },
    eventImageUrl: partial.eventImageUrl ?? '',
    artist: partial.artist ?? [],
  };
}
