import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, SafeAreaView, Switch } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setLastCity, loadLastCity } from '../redux/citySlice';
import { toggleTheme, loadTheme } from '../redux/themeSlice';
import { useWeather } from '../hooks/useWeather';
import SearchInput from '../components/SearchInput';
import WeatherCard from '../components/WeatherCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getThemeColors } from '../theme/theme';
import { styles } from '../styles/HomeScreenStyles';

const HomeScreen = () => {
    const dispatch = useDispatch();
    const darkMode = useSelector(state => state.theme.darkMode);
    const lastCity = useSelector(state => state.city.lastCity);
    const [city, setCity] = useState('');
    const { data, error, isLoading, refetch } = useWeather(lastCity);
    
    // Get theme colors based on darkMode
    const themeColors = getThemeColors(darkMode);

    useEffect(() => {
        // Load last city
        AsyncStorage.getItem('lastCity').then(value => {
            if (value) {
                dispatch(loadLastCity(value));
            }
        });
        
        // Load theme preference
        AsyncStorage.getItem('darkMode').then(value => {
            if (value !== null) {
                dispatch(loadTheme(JSON.parse(value)));
            }
        });
    }, [dispatch]);

    const handleSearch = () => {
        if (city.trim()) {
            dispatch(setLastCity(city.trim())); 
            refetch(); 
            setCity('');
        }
    };

    const handleThemeToggle = () => {
        dispatch(toggleTheme(!darkMode));
    };

    const handleClear = () => {
        setCity('');
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
            <View style={styles.header}>
                <Text style={[styles.title, { color: themeColors.text }]}>Weather App</Text>
                <View style={styles.themeContainer}>
                    <Text style={[styles.themeLabel, { color: themeColors.secondaryText }]}>
                        {darkMode ? 'Dark' : 'Light'}
                    </Text>
                    <Switch
                        testID="theme-switch"
                        value={darkMode}
                        onValueChange={handleThemeToggle}
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        thumbColor={darkMode ? '#ffffff' : '#000000'}
                    />
                </View>
            </View>

            <View style={styles.body}>
                <SearchInput city={city} setCity={setCity} onSearch={handleSearch} />

                {isLoading && (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator testID="loading-indicator" size="large" color={themeColors.activityIndicator} />
                    </View>
                )}
                
                {error && (
                    <View style={styles.errorContainer}>
                        <Text style={[styles.error, { color: themeColors.error }]}>City not found!</Text>
                    </View>
                )}
                
                {data && <WeatherCard data={data} />}

                {city ? (
                    <TouchableOpacity 
                        style={[styles.clearButton, { backgroundColor: themeColors.secondary }]} 
                        onPress={handleClear}
                    >
                        <Text style={styles.clearButtonText}>Clear</Text>
                    </TouchableOpacity>
                ) : null}
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;
