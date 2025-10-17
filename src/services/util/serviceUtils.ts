import { SoundrEvent } from '../../models/soundr/event';

export const normalizeString = (str: string | null): string => {
  return str ? str.toLowerCase().replace(/[\s\W]+/g, '') : '';
};

export const normalizeDate = (date: string | null): string => {
  return date ? new Date(date).toISOString().split('T')[0] : '';
};

//Maybe extend it to use artist name instead + specfic time in the future
// Also need to remove the backwards compability stuff -> just have a pure array for eventSources
export const deduplicateAndMergeEvents = (events: SoundrEvent[]): SoundrEvent[] => {
  const eventMap = new Map<string, SoundrEvent>();

  for (const event of events) {
    //Create unique key based on name, date, venue
    const key = `${normalizeString(event.name)}|${normalizeDate(event.date)}|${normalizeString(event.venue)}`;

    // If we've seen this event before, merge sources
    if (eventMap.has(key)) {
      const existingEvent = eventMap.get(key)!;

      // Merge sources arrays, filtering out duplicates
      const existingSourceNames = (existingEvent.sources || []).map((s) => s.name);
      // Add only new sources
      const newSources = (event.sources || []).filter((source) => !existingSourceNames.includes(source.name));
      // Merge the sources (deep copy to avoid mutation issues)
      existingEvent.sources = [...(existingEvent.sources || []), ...newSources];
    } else {
      // First time seeing this event
      eventMap.set(key, {
        ...event,
        sources: event.sources || [],
      });
    }
  }
  // Return merged events as an array
  return Array.from(eventMap.values());
};

/**
 * Primarily used to sort events by date and filter out past events
 *
 * @param events - Array of SoundrEvent
 * @returns - Sorted array of SoundrEvent with past events filtered out
 */
export const sortByDate = (events: SoundrEvent[]): SoundrEvent[] => {
  const sorted = events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to start of today
  return sorted.filter((a) => new Date(a.date) >= today);
};
