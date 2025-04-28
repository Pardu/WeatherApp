import { useQuery } from '@tanstack/react-query';
import { fetchWeatherByCity } from '../services/weatherService';

export const useWeather = (city) => {
    return useQuery({
      queryKey: ['weather', city],
      queryFn: () => fetchWeatherByCity(city),
      enabled: !!city,
      retry: 1
    });
};