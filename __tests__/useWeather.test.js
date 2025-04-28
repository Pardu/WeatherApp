import { renderHook } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useWeather } from '../src/hooks/useWeather';
// import * as weatherService from '../src/services/weatherService';
import { fetchWeatherByCity } from '../src/services/weatherService'

jest.mock('../src/services/weatherService', () => ({
    fetchWeatherByCity: jest.fn(),  // mock it properly
}));

const createWrapper = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
                cacheTime: 0,
                staleTime: 0,
            },
        },
    });
    return ({ children }) => (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};

describe('useWeather', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('fetches weather successfully', async () => {
        const mockCity = 'London';
        const mockWeatherData = { name: 'London', main: { temp: 280 } };

        fetchWeatherByCity.mockResolvedValueOnce(mockWeatherData);

        const { result } = renderHook(() => useWeather(mockCity), {
            wrapper: createWrapper(),
        });

        // Wait for the query to complete
        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true);
        }, { timeout: 3000 });

        expect(fetchWeatherByCity).toHaveBeenCalledWith(mockCity);
        expect(result.current.data).toEqual(mockWeatherData);
    });

    it('handles error correctly', async () => {
        const mockCity = 'InvalidCity';
        const mockError = new Error('City not found');
        
        fetchWeatherByCity.mockRejectedValueOnce(mockError);

        const { result } = renderHook(() => useWeather(mockCity), {
            wrapper: createWrapper(),
        });

        // Wait for the query to complete with error
        await waitFor(() => {
            expect(result.current.isError).toBe(true);
        }, { timeout: 3000 });

        expect(fetchWeatherByCity).toHaveBeenCalledWith(mockCity);
        expect(result.current.error).toBeTruthy();
    });
});
