export type SoundrEvent = {
  name: string;
  date: string;
  venue: string;
  //artist: SoundrArtist;
  source: string;
};

export type SoundrArtist = {
  name: string;
  image: string;
  spotifyartisturl?: string;
};
