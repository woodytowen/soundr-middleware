import { SourceType } from '../../models/soundr/event';
import { SoundrEventRequest } from '../../models/soundr/eventRequest';
import { getEventsSkiddle } from '../skiddle/skiddleService';
import { getEventsTicketMaster } from '../ticketMaster/ticketService';

export const API_CONFIGS = [
  {
    name: SourceType.Skiddle,
    service: getEventsSkiddle,
    hasGenres: (req: SoundrEventRequest) => req.genre && req.genre.length > 0,
  },
  {
    name: SourceType.TicketMaster,
    service: getEventsTicketMaster,
    hasGenres: (req: SoundrEventRequest) => req.genre && req.genre.length > 0,
  },
];
