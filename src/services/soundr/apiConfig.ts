import { SoundrEventRequest } from '../../models/soundr/eventRequest';
import { getEventsSkiddle } from '../skiddle/skiddleService';
import { getEventsTicketMaster } from '../ticketMaster/ticketService';

export const API_CONFIGS = [
  {
    name: 'skiddle',
    service: getEventsSkiddle,
    hasGenres: (req: SoundrEventRequest) => req.genre && req.genre.length > 0,
  },
  {
    name: 'ticketmaster',
    service: getEventsTicketMaster,
    hasGenres: (req: SoundrEventRequest) => req.genre && req.genre.length > 0,
  },
];
