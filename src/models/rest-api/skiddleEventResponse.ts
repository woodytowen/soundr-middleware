export interface SkiddleEventResponse {
  data: SkiddleEvent;
  status: number;
}

export interface SkiddleEvent {
  error: number;
  totalcount: string;
  pagecount: number;
  results: Result[];
  elastic: Elastic;
  requestId: string;
}

export interface Result {
  id: string;
  listingid: string;
  isSBT: boolean;
  uniquelistingidentifier: string;
  hascollapsedresults: boolean;
  countcollapsedresults: number;
  EventCode: string;
  eventname: string;
  cancelled: string;
  cancellationDate: string;
  cancellationType: string;
  cancellationReason: string;
  rescheduledDate: string;
  venue: Venue;
  imageurl: string;
  largeimageurl: string;
  xlargeimageurl: string;
  xlargeimageurlWebP: any;
  link: string;
  date: string;
  startdate: string;
  enddate: string;
  description: string;
  openingtimes: Openingtimes;
  minage: string;
  imgoing: any;
  goingtos: number;
  goingtocount: string;
  tickets: boolean;
  ticketpricing: Ticketpricing;
  entryprice: string;
  eventvisibility: string;
  ticketUrl: string;
  hotSeller: boolean;
  rep: Rep;
  headerHex: string;
  currency: string;
  artists: Artist[];
  genres: Genre[];
  healthAndSafety: any[];
}

export interface Venue {
  id: number;
  name: string;
  address: string;
  town: string;
  postcode_lookup: string;
  postcode: string;
  region: string;
  country: string;
  phone: string;
  latitude: number;
  longitude: number;
  type: string;
  rating: number;
  reviewCount: number;
}

export interface Openingtimes {
  doorsopen: string;
  doorsclose: string;
  lastentry: string;
}

export interface Ticketpricing {
  minPrice: number;
  maxPrice: number;
}

export interface Rep {
  enabled: boolean;
  eligible?: boolean;
  minCommission?: number;
  maxCommission?: number;
}

export interface Artist {
  artistid: string;
  name: string;
  image: string;
  spotifyartisturl?: string;
}

export interface Genre {
  genreid: string;
  name: string;
}

export interface Elastic {
  timing: number;
}
