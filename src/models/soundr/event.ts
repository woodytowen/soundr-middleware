export type SoundrEvent = {
  name: string;
  date: string;
  venue: string;
  artist: SoundrArtist[];
  sources?: EventSource[];
  venueDetails?: SoundrEventVenue;
  eventImageUrl?: string;
};

export interface EventSource {
  name: string;
  deepLinkUrl?: string;
}

export type SoundrEventVenue = {
  name: string;
  address: string;
  postcode: string;
  capacity?: number;
  //NightClub, Rave, Festival etc...
  eventType: string;
  rating?: number; //TicketMaster Doesn't have this functionality
  reviewCount?: number; //TicketMaster Doesn't have this functionality
};

export type SoundrArtist = {
  artistName: string;
  artistImage: string;
  spotifyArtistUrl?: string;
  //More room to also add insta links, facebook etc.
};

//SourceType
export enum SourceType {
  Skiddle = 'skiddle',
  TicketMaster = 'ticketmaster',
}
