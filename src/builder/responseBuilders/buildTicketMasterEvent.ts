import { SoundrArtist, SoundrEvent } from '../../models/soundr/event';
import {
  Attraction2,
  Event,
  Image as EventImage,
  Image2 as ArtistImage,
} from '../../models/rest-api/ticketMasterEventResponse';

// filepath: src/utils/responseBuilders/ticketmasterNormalizer.ts
export const buildTicketMasterEvent = (event: Event): Partial<SoundrEvent> => {
  return {
    name: event?.name ?? null,
    date: event?.dates?.start?.dateTime ?? null,
    venue: event?._embedded?.venues?.[0]?.name ?? null,
    ticketMasterDeeplink: event?.url ?? null,
    venueDetails: {
      name: event?._embedded?.venues?.[0]?.name ?? null,
      address: event?._embedded?.venues?.[0]?.address.line1 ?? '',
      postcode: event?._embedded?.venues?.[0]?.postalCode ?? '',
      eventType: event?._embedded?.venues?.[0]?.type ?? '',
    },
    eventImageUrl: findTicketMasterImage(event.images),
    artist: buildArtist(event._embedded?.attractions ?? []),
    // ...other Ticketmaster-specific mappings
  };
};

const findTicketMasterImage = (images: EventImage[] | ArtistImage[]): string => {
  if (!images || images.length === 0) return '';

  // Attempt to find Artist Poster Image
  const preferred = images.find((img) => img.fallback === false && img.ratio === '16_9');

  //TODO make an adjustment here whereby if we get multiple back - look for the biggest Width/ Height version

  if (preferred) return preferred.url;

  // Fallback to fallback 16:9 images (Generic TicketMaster Picture)
  const fallback = images.find((img) => img.fallback === true && img.ratio === '16_9');
  if (fallback) return fallback.url;

  // Otherwise, return the first available image
  return images[0]?.url ?? '';
};

const buildArtist = (artists: Attraction2[]): SoundrArtist[] => {
  if (artists.length === 0) return [];
  return artists.map((artist) => ({
    artistName: artist.name ?? '',
    artistImage: findTicketMasterImage(artist.images) ?? '',
    spotifyArtistUrl: artist.externalLinks?.spotify?.[0]?.url ?? '',
  }));
};
