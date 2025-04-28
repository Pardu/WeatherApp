import React from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { getThemeColors } from '../theme/theme';
import { styles } from '../styles/SearchInputStyles';

const SearchInput = ({ city, setCity, onSearch }) => {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const themeColors = getThemeColors(darkMode);

  console.log("SearchInput calling....... ")
  
  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input, 
          { 
            borderColor: themeColors.secondary,
            color: themeColors.text,
            backgroundColor: darkMode ? '#333' : '#fff',
          }
        ]}
        placeholder="Enter city"
        placeholderTextColor={themeColors.secondaryText}
        value={city}
        onChangeText={setCity}
      />
      <TouchableOpacity 
        style={[
          styles.searchButton,
          { backgroundColor: themeColors.primary }
        ]} 
        onPress={onSearch}
      >
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
