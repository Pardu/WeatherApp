import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import HomeScreen from './src/screens/HomeScreen';

const queryClient = new QueryClient();

const App = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <HomeScreen />
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
