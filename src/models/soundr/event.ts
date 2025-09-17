export type SoundrEvent = {
  name: string;
  date: string;
  venue: string;
  artist: SoundrArtist[];
  source: string;
  skiddleDeeplink?: string;
  ticketMasterDeeplink?: string;
  venueDetails?: SoundrEventVenue;
  eventImageUrl?: string; //TODO Temporary solution until we have artists implemented
};

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
  spotifyArtistUrl?: string; //TicketMaster: externalLinks (for spotifyUrl)
  //More room to also add insta links, facebook etc.
};
