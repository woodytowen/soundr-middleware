import { SoundrEvent } from '../../models/soundr/event';

export const normalizeString = (str: string | null): string => {
  return str ? str.toLowerCase().replace(/[\s\W]+/g, '') : '';
};

export const normalizeDate = (date: string | null): string => {
  return date ? new Date(date).toISOString().split('T')[0] : '';
};

//TODO might have to change this to DATETIME and VENUE check - venue name can be duplicated
export function deduplicateEvents(events: SoundrEvent[]): SoundrEvent[] {
  const seen = new Set<string>();
  const deduped: SoundrEvent[] = [];
  for (const event of events) {
    const key = `${normalizeString(event.name)}|${normalizeDate(event.date)}|${normalizeString(event.venue)}`;
    if (!seen.has(key)) {
      seen.add(key);
      deduped.push(event);
    }
  }
  return deduped;
}
