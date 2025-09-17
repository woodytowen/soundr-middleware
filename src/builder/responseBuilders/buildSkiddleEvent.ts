import { Artist, Result } from '../../models/rest-api/skiddleEventResponse';
import { SoundrArtist, SoundrEvent } from '../../models/soundr/event';

export const buildSkiddleEvent = (event: Result): Partial<SoundrEvent> => {
  return {
    name: event?.eventname ?? null,
    date: event?.date ?? null,
    venue: event?.venue?.name ?? null,
    skiddleDeeplink: event.link ?? null,
    // ...other Skiddle-specific mappings
    venueDetails: {
      name: event?.venue?.name ?? null,
      address: event?.venue?.address ?? '',
      postcode: event?.venue?.postcode ?? '',
      eventType: event?.venue?.type ?? '',
      rating: event?.venue?.rating ?? '',
      reviewCount: event?.venue?.reviewCount ?? 0,
    },
    eventImageUrl: event?.xlargeimageurl ?? '',
    artist: event.artists ? buildArtist(event.artists) : [],
  };
};

//Todo Currently broken
const buildArtist = (artists: Artist[]): SoundrArtist[] => {
  if (artists.length === 0) return [];
  return artists.map((artist) => ({
    artistName: artist.name ?? '',
    artistImage: artist.image ?? '',
    spotifyArtistUrl: artist.spotifyartisturl ?? '',
  }));
};
