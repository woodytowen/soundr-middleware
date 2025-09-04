import { TICKET_MASTER_GET_EVENTS } from '../../routes/api/ticketMasterApiRoutes';
import axios from 'axios';
import { Event } from '../../models/rest-api/ticketMasterEventResponse';
import { SoundrEventRequest } from '../../models/soundr/eventRequest';

export const getEventsTicketMaster = async (soundrEventRequest: SoundrEventRequest): Promise<Event[]> => {
  const apiUrl = TICKET_MASTER_GET_EVENTS(soundrEventRequest);

  const response = await axios.get(apiUrl);

  if (!response.data?._embedded?.events) {
    return [];
  }

  return response.data._embedded.events;
};

export const getEventDetailsTM = async () => {};
