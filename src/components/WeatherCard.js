import React from 'react';
import { View, Text, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { getThemeColors } from '../theme/theme';
import { styles } from '../styles/WeatherCardStyles';

const WeatherCard = ({ data }) => {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const themeColors = getThemeColors(darkMode);

  console.log("WeatherCard calling....... ")

  if (!data) return null;

  const { name, main, weather } = data;
  const iconUrl = `https://openweathermap.org/img/wn/${weather[0]?.icon}@2x.png`;

  return (
    <View style={[styles.card, { backgroundColor: themeColors.card }]}>
      <Text style={[styles.city, { color: themeColors.text }]}>{name}</Text>
      <Image source={{ uri: iconUrl }} style={styles.icon} />
      <Text style={[styles.temp, { color: themeColors.text }]}>
        {Math.round(main.temp - 273.15)}°C
      </Text>
      <Text style={[styles.condition, { color: themeColors.secondaryText }]}>
        {weather[0]?.description}
      </Text>
    </View>
  );
};

export default WeatherCard;
