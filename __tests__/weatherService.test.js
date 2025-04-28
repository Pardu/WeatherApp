import axios from 'axios';
import { fetchWeatherByCity } from '../src/services/weatherService';

// Mock axios
jest.mock('axios');

describe('weatherService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches weather data successfully', async () => {
    const mockCity = 'London';
    const mockResponse = {
      data: {
        name: 'London',
        main: {
          temp: 280.15,
        },
        weather: [
          {
            description: 'scattered clouds',
            icon: '03d',
          },
        ],
      },
    };

    axios.get.mockResolvedValue(mockResponse);

    const result = await fetchWeatherByCity(mockCity);

    expect(axios.get).toHaveBeenCalledWith(
      'https://api.openweathermap.org/data/2.5/weather?q=London&APPID=856006d2f1b9bc87b294b2b84ec60a2a'
    );
    expect(result).toEqual(mockResponse.data);
  });

  it('handles API errors', async () => {
    const mockCity = 'InvalidCity';
    axios.get.mockRejectedValue({ 
      response: { 
        status: 404, 
        data: { message: 'City not found' } 
      } 
    });

    await expect(fetchWeatherByCity(mockCity)).rejects.toThrow('City not found');
    expect(axios.get).toHaveBeenCalledWith(
      'https://api.openweathermap.org/data/2.5/weather?q=InvalidCity&APPID=856006d2f1b9bc87b294b2b84ec60a2a'
    );
  });

  it('handles network errors', async () => {
    const mockCity = 'London';
    axios.get.mockRejectedValue(new Error('Network error'));

    await expect(fetchWeatherByCity(mockCity)).rejects.toThrow('Network error');
    expect(axios.get).toHaveBeenCalledWith(
      'https://api.openweathermap.org/data/2.5/weather?q=London&APPID=856006d2f1b9bc87b294b2b84ec60a2a'
    );
  });
}); 