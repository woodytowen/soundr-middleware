import axios from 'axios';

export const getSampleData = async () => {
  const apiUrl = `https://fake-json-api.mock.beeceptor.com/users`;
  const response = await axios.get(apiUrl);

  if (!response.data) {
    throw new Error('User not found');
  }

  return response.data;
};
