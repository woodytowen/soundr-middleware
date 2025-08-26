import { TICKET_MASTER_GET_EVENTS } from '../../routes/ticketMaster/constants/ticketMasterApiRoutes';
import { TicketMasterGenreKeys } from '../../routes/ticketMaster/constants/genreKeys';
import axios from 'axios';

export const getEventsTM = async () => {
  const apiUrl = TICKET_MASTER_GET_EVENTS([TicketMasterGenreKeys.DRUM_AND_BASS, TicketMasterGenreKeys.JUNGLE]);

  const response = await axios.get(apiUrl);

  if (!response.data) {
    throw new Error('User not found');
  }

  return response.data;
};

export const getEventDetailsTM = async () => {};
