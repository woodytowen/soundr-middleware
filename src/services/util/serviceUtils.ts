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

export const sortByDate = (events: SoundrEvent[]): SoundrEvent[] => {
  const sorted = events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  // Filter out events before today (keep events from today onwards)
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to start of today
  return sorted.filter((a) => new Date(a.date) >= today);
};

/**
 * TODO need some logic here instead to check whether an entry has already been found throughout the list, and instead of removing it
 * Add to an existing list with another source url
 *
 * This is for future work - right now just get it working...
 */
