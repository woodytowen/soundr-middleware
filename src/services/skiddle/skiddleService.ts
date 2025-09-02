import axios from 'axios';
import { SKIDDLE_ARTIST_SEARCH, SKIDDLE_EVENTS_SEARCH } from '../../routes/api/skiddleApiRoutes';
import { SoundrEventRequest } from '../../models/soundr/eventRequest';
import { Result, SkiddleEventResponse } from '../../models/rest-api/skiddleEventResponse';

export const getEventsSkiddle = async (skiddleEvent: SoundrEventRequest): Promise<Result[]> => {
  //if using an array for genres -> need to unpacking here and cracking string for API

  //Need to unpackRequest here with GenreKeyMapping

  const apiUrl = SKIDDLE_EVENTS_SEARCH(skiddleEvent);

  const response: SkiddleEventResponse = await axios.get(apiUrl);

  if (!response.data || response.status !== 200) {
    throw new Error('Requested Skiddle Events Not Found');
  }

  //Todo do we need a response builder here or send everything?
  return response.data.results;
};

export const getArtist = async (artist: string) => {
  const apiUrl = SKIDDLE_ARTIST_SEARCH(artist);

  const response = await axios.get(apiUrl);

  if (!response.data) {
    throw new Error('User not found');
  }

  return response.data;
};
