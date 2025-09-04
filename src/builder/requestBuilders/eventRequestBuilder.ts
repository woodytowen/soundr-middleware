import { skiddleGenreMap, ticketMasterGenreMap } from './genreKeys';

export function getSkiddleGenreIds(genres: string[]): string[] {
  const ids = genres.map((name) => skiddleGenreMap[name]).filter(Boolean);
  return ids.length > 0 ? ids : []; // undefined means "no filter"
}

export function getTicketmasterGenreIds(genres: string[]): string[] {
  const ids = genres.map((name) => ticketMasterGenreMap[name]).filter(Boolean);
  return ids.length > 0 ? ids : []; // undefined means "no filter"
}
