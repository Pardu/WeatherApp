// API configuration
export const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getWeatherUrl = (city) => `${BASE_URL}/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=metric`; 