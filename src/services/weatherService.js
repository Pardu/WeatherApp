import axios from 'axios';
import { OPENWEATHER_API_KEY, OPENWEATHER_BASE_URL } from '@env';

console.log('Environment Variables:', {
  OPENWEATHER_API_KEY,
  OPENWEATHER_BASE_URL
});

export const fetchWeatherByCity = async (city) => {
  try {
    const response = await axios.get(`${OPENWEATHER_BASE_URL}?q=${city}&APPID=${OPENWEATHER_API_KEY}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw new Error(error.response.data.message || 'API Error');
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error('Network error');
    } else {
      // Something happened in setting up the request that triggered an Error
      throw error;
    }
  }
};
