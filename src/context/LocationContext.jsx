import React, { createContext, useState, useEffect } from 'react';
import LocationService from '../services/LocationService';

// Create context for managing location and team data
export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [userLocation, setUserLocation] = useState('');
  const [locationData, setLocationData] = useState(null);
  const [teams, setTeams] = useState(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [isLoadingTeams, setIsLoadingTeams] = useState(false);
  const [error, setError] = useState('');

  // Effect to fetch location and team data when zip code changes
  useEffect(() => {
    if (!userLocation) return;

    const fetchLocationData = async () => {
      try {
        setIsLoadingLocation(true);
        setError('');
        
        // Validate the zip code first
        const isValid = await LocationService.validateZipCode(userLocation);
        if (!isValid) {
          setError('Invalid ZIP code. Please enter a valid US ZIP code.');
          setIsLoadingLocation(false);
          return;
        }
        
        // Get location data
        const data = await LocationService.getLocationByZip(userLocation);
        setLocationData(data);
        setIsLoadingLocation(false);
      } catch (err) {
        console.error('Error fetching location data:', err);
        setError('Error fetching location data. Please try again.');
        setIsLoadingLocation(false);
      }
    };

    const fetchTeamData = async () => {
      try {
        setIsLoadingTeams(true);
        
        // Get teams for the zip code
        const teamData = await LocationService.getTeamsByZip(userLocation);
        setTeams(teamData);
        setIsLoadingTeams(false);
      } catch (err) {
        console.error('Error fetching team data:', err);
        setError('Error fetching team data. Please try again.');
        setIsLoadingTeams(false);
      }
    };

    fetchLocationData();
    fetchTeamData();
  }, [userLocation]);

  return (
    <LocationContext.Provider value={{
      userLocation,
      setUserLocation,
      locationData,
      teams,
      isLoadingLocation,
      isLoadingTeams,
      error
    }}>
      {children}
    </LocationContext.Provider>
  );
};

export default LocationProvider;