import { SoundrArtist, SoundrEvent, SourceType } from '../../models/soundr/event';
import {
  Attraction2,
  Event,
  Image as EventImage,
  Image2 as ArtistImage,
} from '../../models/rest-api/ticketMasterEventResponse';

export const buildTicketMasterEvent = (event: Event): Partial<SoundrEvent> => {
  return {
    name: event?.name ?? null,
    date: event?.dates?.start?.dateTime ?? null,
    venue: event?._embedded?.venues?.[0]?.name ?? null,
    venueDetails: {
      name: event?._embedded?.venues?.[0]?.name ?? null,
      address: event?._embedded?.venues?.[0]?.address.line1 ?? '',
      postcode: event?._embedded?.venues?.[0]?.postalCode ?? '',
      eventType: event?._embedded?.venues?.[0]?.type ?? '',
    },
    eventImageUrl: findTicketMasterImage(event.images),
    artist: buildArtist(event._embedded?.attractions ?? []),
    sources: [
      {
        name: SourceType.TicketMaster,
        deepLinkUrl: event?.url ?? '',
      },
    ],
  };
};

//TODO need to attempt to get the best fallback image too
const findTicketMasterImage = (images: EventImage[] | ArtistImage[]): string => {
  if (!images || images.length === 0) return '';

  // Attempt to find Artist Poster Image
  // Find all non-fallback 16:9 images
  const preferredImages = images.filter((img) => img.fallback === false && img.ratio === '16_9');
  // Select the image with the largest width * height
  const preferred = findPreferredImageSize(preferredImages);

  if (preferred) return preferred.url;

  // Fallback to fallback 16:9 images (Generic TicketMaster Picture)
  const fallbackImages = images.filter((img) => img.fallback === true && img.ratio === '16_9');

  const preferredFallback = findPreferredImageSize(fallbackImages);

  if (preferredFallback) return preferredFallback.url;

  // Otherwise, return the first available image
  return images[0]?.url ?? '';
};

export const findPreferredImageSize = (preferredImages: (EventImage | ArtistImage)[]) => {
  return preferredImages.reduce((maxImg, img) => {
    const imgSize = (img.width ?? 0) * (img.height ?? 0);
    const maxSize = (maxImg?.width ?? 0) * (maxImg?.height ?? 0);
    return imgSize > maxSize ? img : maxImg;
  }, preferredImages[0]);
};

const buildArtist = (artists: Attraction2[]): SoundrArtist[] => {
  if (artists.length === 0) return [];
  return artists.map((artist) => ({
    artistName: artist.name ?? '',
    artistImage: findTicketMasterImage(artist.images) ?? '',
    spotifyArtistUrl: artist.externalLinks?.spotify?.[0]?.url ?? '',
  }));
};
