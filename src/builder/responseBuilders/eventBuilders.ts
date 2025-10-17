import { SoundrEvent } from '../../models/soundr/event';

export const buildSoundrEvent = (partial: Partial<SoundrEvent>): SoundrEvent => {
  return {
    name: partial.name ?? '',
    date: partial.date ?? '',
    venue: partial.venue ?? '',
    venueDetails: partial.venueDetails ?? {
      name: '',
      address: '',
      postcode: '',
      eventType: '',
      rating: 0,
      reviewCount: 0,
    },
    eventImageUrl: partial.eventImageUrl ?? '',
    artist: partial.artist ?? [],
    sources: partial.sources ?? [],
  };
};
