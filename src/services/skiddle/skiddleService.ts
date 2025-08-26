import axios from 'axios';
import { SKIDDLE_ARTIST_SEARCH, SKIDDLE_EVENTS_SEARCH } from '../../routes/skiddle/constants/skiddleApiRoutes';
import { SkiddleEventRequest } from '../../models/skiddle/eventRequest';

export const getEventsSkiddle = async (skiddleEvent: SkiddleEventRequest) => {
  //if using an array for genres -> need to unpacking here and cracking string for API
  const apiUrl = SKIDDLE_EVENTS_SEARCH(skiddleEvent);

  const response = await axios.get(apiUrl);

  if (!response.data) {
    throw new Error('User not found');
  }

  return response.data;
};

export const getArtist = async (artist: string) => {
  const apiUrl = SKIDDLE_ARTIST_SEARCH(artist);

  const response = await axios.get(apiUrl);

  if (!response.data) {
    throw new Error('User not found');
  }

  return response.data;
};
