import { TICKET_MASTER_GET_EVENTS } from '../../routes/api/ticketMasterApiRoutes';
import { TicketMasterGenreKeys } from '../../models/soundr/genreKeys';
import axios from 'axios';
import { Event } from '../../models/rest-api/ticketMasterEventResponse';

export const getEventsTicketMaster = async (): Promise<Event[]> => {
  const apiUrl = TICKET_MASTER_GET_EVENTS([TicketMasterGenreKeys.DRUM_AND_BASS, TicketMasterGenreKeys.JUNGLE]);

  const response = await axios.get(apiUrl);

  if (!response.data._embedded.events) {
    throw new Error('User not found');
  }

  return response.data._embedded.events;
};

export const getEventDetailsTM = async () => {};
