// Theme colors
export const colors = {
  // Primary colors
  primary: {
    light: '#81b0ff',
    dark: '#4a90e2',
  },
  
  // Secondary colors
  secondary: {
    light: '#767577',
    dark: '#555555',
  },
  
  // Background colors
  background: {
    light: '#ffffff',
    dark: '#000000',
  },
  
  // Card colors
  card: {
    light: '#bcbcbc',
    dark: '#333333',
  },
  
  // Text colors
  text: {
    light: '#000000',
    dark: '#ffffff',
  },
  
  // Secondary text colors
  secondaryText: {
    light: '#555555',
    dark: '#cccccc',
  },
  
  // Error color
  error: '#ff0000',
  
  // Switch colors
  switch: {
    thumb: {
      light: '#000000',
      dark: '#ffffff',
    },
    track: {
      light: '#767577',
      dark: '#81b0ff',
    },
  },
  
  // Activity indicator color
  activityIndicator: '#0000ff',
};

// Helper function to get theme-aware colors
export const getThemeColors = (isDarkMode) => {
  return {
    primary: isDarkMode ? colors.primary.dark : colors.primary.light,
    secondary: isDarkMode ? colors.secondary.dark : colors.secondary.light,
    background: isDarkMode ? colors.background.dark : colors.background.light,
    card: isDarkMode ? colors.card.dark : colors.card.light,
    text: isDarkMode ? colors.text.dark : colors.text.light,
    secondaryText: isDarkMode ? colors.secondaryText.dark : colors.secondaryText.light,
    error: colors.error,
    switch: {
      thumb: isDarkMode ? colors.switch.thumb.dark : colors.switch.thumb.light,
      track: isDarkMode ? colors.switch.track.dark : colors.switch.track.light,
    },
    activityIndicator: colors.activityIndicator,
  };
}; 