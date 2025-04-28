# Weather App

A React Native weather application that provides real-time weather information for cities worldwide.

## Features

- Search for weather by city name
- Display current weather conditions
- Show temperature, weather description, and weather icon
- Dark/Light theme support with automatic system preference detection
- Theme persistence across app restarts
- Offline support with local storage
- Error handling for network and API issues
- Efficient data fetching and caching with React Query

## Environment Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   OPENWEATHER_API_KEY=your_api_key_here
   OPENWEATHER_BASE_URL=https://api.openweathermap.org/data/2.5/weather
   ```
   Note: Replace `your_api_key_here` with your actual OpenWeather API key.

4. Create a `.env.example` file (for reference):
   ```
   OPENWEATHER_API_KEY=your_api_key_here
   OPENWEATHER_BASE_URL=https://api.openweathermap.org/data/2.5/weather
   ```

### Android Setup

1. Install Android Studio from [https://developer.android.com/studio](https://developer.android.com/studio)

2. During Android Studio installation, make sure to install:
   - Android SDK
   - Android SDK Platform
   - Android Virtual Device (AVD)

3. Set up environment variables in your shell profile (~/.zshrc for zsh or ~/.bash_profile for bash):
   ```bash
   export ANDROID_HOME=$HOME/Library/Android/sdk
   export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
   ```

4. Create or update `android/local.properties` file with:
   ```
   sdk.dir=/Users/YOUR_USERNAME/Library/Android/sdk
   ```
   Replace `YOUR_USERNAME` with your actual username.

5. Accept Android SDK licenses:
   ```bash
   yes | sdkmanager --licenses
   ```

6. Create an Android Virtual Device (AVD):
   - Open Android Studio
   - Go to Tools > Device Manager
   - Click "Create Virtual Device"
   - Select a device definition (e.g., Pixel 4)
   - Select a system image (e.g., API 33)
   - Complete the AVD creation

7. Start the Android emulator:
   ```bash
   emulator -avd YOUR_AVD_NAME
   ```
   Replace `YOUR_AVD_NAME` with the name of your created AVD.

### iOS Setup

1. Install Xcode from the Mac App Store or [https://developer.apple.com/xcode/](https://developer.apple.com/xcode/)

2. Install Xcode Command Line Tools:
   ```bash
   xcode-select --install
   ```

3. Install CocoaPods (required for iOS dependencies):
   ```bash
   sudo gem install cocoapods
   ```

4. Install iOS dependencies:
   ```bash
   cd ios && pod install && cd ..
   ```

5. Open the iOS project in Xcode:
   ```bash
   open ios/WeatherApp.xcworkspace
   ```
   Note: Always open the `.xcworkspace` file, not the `.xcodeproj` file.

6. Configure signing in Xcode:
   - Open Xcode
   - Select the project in the navigator
   - Select the target
   - Go to the "Signing & Capabilities" tab
   - Select your team or create a new Apple ID
   - Update the Bundle Identifier if needed

7. Run the app on a simulator:
   - Select a simulator from the device dropdown in Xcode
   - Click the Run button or press Cmd+R

## Running the App

### iOS
```bash
cd ios && pod install && cd ..
npm run ios
```

### Android
```bash
npm run android
```

## Data Management

The app uses React Query for efficient data fetching and state management, which provides several advantages:

### React Query Benefits
- Automatic caching and background updates
- Built-in loading and error states
- Reduced boilerplate code compared to traditional Redux thunks
- Automatic retry on failure
- Request deduplication
- Optimistic updates
- Infinite scrolling support
- Prefetching capabilities

### Code Reduction Example
Traditional Redux Thunk approach:
```javascript
// Action Types
const FETCH_WEATHER_REQUEST = 'FETCH_WEATHER_REQUEST';
const FETCH_WEATHER_SUCCESS = 'FETCH_WEATHER_SUCCESS';
const FETCH_WEATHER_FAILURE = 'FETCH_WEATHER_FAILURE';

// Action Creators
const fetchWeather = (city) => async (dispatch) => {
  dispatch({ type: FETCH_WEATHER_REQUEST });
  try {
    const response = await weatherService.fetchWeatherByCity(city);
    dispatch({ type: FETCH_WEATHER_SUCCESS, payload: response });
  } catch (error) {
    dispatch({ type: FETCH_WEATHER_FAILURE, payload: error.message });
  }
};

// Reducer
const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WEATHER_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_WEATHER_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case FETCH_WEATHER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
```

React Query approach:
```javascript
const useWeather = (city) => {
  return useQuery({
    queryKey: ['weather', city],
    queryFn: () => weatherService.fetchWeatherByCity(city)
  });
};
```

## Theme System

The app supports both light and dark themes with the following features:

- Automatic theme switching based on system preferences
- Manual theme toggle option
- Theme persistence using AsyncStorage
- Consistent color palette across the app
- Smooth theme transitions
- Theme-aware components that adapt to the current theme

### Theme Colors

The app uses a carefully selected color palette for both themes:

**Light Theme:**
- Primary: #007AFF
- Background: #FFFFFF
- Surface: #F2F2F7
- Text: #000000
- Secondary Text: #6B6B6B

**Dark Theme:**
- Primary: #0A84FF
- Background: #000000
- Surface: #1C1C1E
- Text: #FFFFFF
- Secondary Text: #8E8E93

## Testing

The app includes comprehensive test coverage using Jest and React Native Testing Library.

To run tests:
```bash
npm test
```

Test files are located in the `__tests__` directory and cover:
- Weather service API calls
- Redux state management
- Component rendering and interactions
- Custom hooks
- Error handling
- Theme switching functionality

## Project Structure

```
src/
  ├── components/     # Reusable UI components
  ├── screens/        # Screen components
  ├── services/       # API and other services
  ├── store/          # Redux store configuration
  ├── theme/          # Theme configuration and colors
  └── utils/          # Utility functions
```

## Dependencies

- React Native
- Redux Toolkit (for global state management)
- React Query (for data fetching and caching)
- Axios (for HTTP requests)
- React Native Testing Library
- Jest
- React Native Dotenv
- @react-native-async-storage/async-storage (for theme persistence)

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgments

- Weather data provided by [OpenWeather API](https://openweathermap.org/)
- Icons from [OpenWeather](https://openweathermap.org/weather-conditions)
