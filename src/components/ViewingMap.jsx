import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import RightsService from '../services/RightsService';
import ScheduleService from '../services/ScheduleService';

/**
 * Component to display a geographical map showing viewing availability
 */
const ViewingMap = ({ gameId, zipCode }) => {
  const [game, setGame] = useState(null);
  const [mapData, setMapData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    const fetchMapData = async () => {
      try {
        setLoading(true);
        // Fetch game details
        const gameData = await ScheduleService.getGameDetails(gameId);
        setGame(gameData);
        
        // Fetch blackout map data
        const blackoutData = await RightsService.getBlackoutMap(gameId);
        setMapData(blackoutData);
        
        // Set initial selected platform
        if (blackoutData && blackoutData.platforms && blackoutData.platforms.length > 0) {
          setSelectedPlatform(blackoutData.platforms[0].platform);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching map data:', err);
        setError('Unable to load availability map. Please try again.');
        setLoading(false);
      }
    };

    if (gameId) {
      fetchMapData();
    }
  }, [gameId]);

  useEffect(() => {
    if (!loading && !error && mapData && mapData.platforms && mapData.platforms.length > 0 && selectedPlatform) {
      // In a real implementation, we would use a mapping library like MapLibre GL JS
      // to render the actual map with DMA regions based on the mapData
      // For this mock version, we'll simulate a map with colored regions
      renderMockMap();
    }
  }, [loading, error, mapData, selectedPlatform]);

  // Function to simulate rendering a map
  // In a real implementation, this would initialize and configure the mapping library
  const renderMockMap = () => {
    if (!mapContainerRef.current) return;
    
    // For demonstration purposes only
    // This would be replaced with actual map initialization code
    const container = mapContainerRef.current;
    container.innerHTML = '';
    
    const mockMap = document.createElement('div');
    mockMap.className = 'w-full h-full flex items-center justify-center bg-gray-100 rounded-lg';
    mockMap.innerHTML = `
      <div class="text-center p-6">
        <p class="text-lg font-medium">Interactive Map Visualization</p>
        <p class="text-sm text-gray-500 mt-2">
          In an actual implementation, this would display a color-coded map of the United States
          showing which regions can view the selected game on ${
            mapData.platforms.find(p => p.platform === selectedPlatform)?.provider || 'selected platform'
          }.
        </p>
      </div>
    `;
    
    container.appendChild(mockMap);
    mapInstanceRef.current = mockMap;
  };

  // Format time for display
  const formatDateTime = (timeString) => {
    const date = new Date(timeString);
    return date.toLocaleString('en-US', { 
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  // Get platform display name
  const getPlatformName = (platformCode) => {
    switch (platformCode) {
      case 'local_tv': return 'Local TV';
      case 'national_tv': return 'National TV';
      case 'streaming': return 'Streaming';
      case 'radio': return 'Radio';
      default: return platformCode;
    }
  };

  if (loading) {
    return (
      <div className="bg-white shadow overflow-hidden rounded-lg p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-60 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    );
  }

  if (error || !game || !mapData) {
    return (
      <div className="bg-white shadow overflow-hidden rounded-lg p-6 text-center">
        <p className="text-red-500">{error || 'Unable to display map data'}</p>
        <Link to="/" className="mt-4 inline-block text-blue-600 hover:underline">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white shadow overflow-hidden rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {game.away_team.name} @ {game.home_team.name}
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {formatDateTime(game.start_time)}
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link 
              to={`/game/${game.id}?zip=${zipCode}`} 
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Back to Game Details
            </Link>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
          Viewing Availability Map
        </h3>
        
        {/* Platform selector */}
        <div className="mb-6">
          <label htmlFor="platform-select" className="block text-sm font-medium text-gray-700 mb-1">
            Select Platform
          </label>
          <select
            id="platform-select"
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            {mapData.platforms.map(platform => (
              <option key={platform.platform} value={platform.platform}>
                {platform.provider} ({getPlatformName(platform.platform)})
              </option>
            ))}
          </select>
        </div>
        
        {/* Map container */}
        <div 
          ref={mapContainerRef}
          className="w-full h-96 border border-gray-300 rounded-lg overflow-hidden"
        >
          {/* Map will be rendered here by the mapping library */}
        </div>
        
        {/* Map legend */}
        <div className="mt-4 flex items-center space-x-6">
          <div className="flex items-center">
            <span className="inline-block w-4 h-4 bg-green-500 rounded mr-2"></span>
            <span className="text-sm text-gray-700">Available</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-4 h-4 bg-red-500 rounded mr-2"></span>
            <span className="text-sm text-gray-700">Blacked Out</span>
          </div>
          <div className="flex items-center">
            <span className="inline-block w-4 h-4 bg-gray-300 rounded mr-2"></span>
            <span className="text-sm text-gray-700">No Data</span>
          </div>
        </div>
        
        {/* Platform details */}
        <div className="mt-6 bg-gray-50 p-4 rounded-md">
          <h4 className="font-medium text-gray-900 mb-2">
            {mapData.platforms.find(p => p.platform === selectedPlatform)?.provider || 'Selected Platform'}
          </h4>
          <p className="text-sm text-gray-500">
            This platform is{' '}
            {mapData.platforms.find(p => p.platform === selectedPlatform)?.blackoutDmas.length > 0 ? 
              `unavailable in ${mapData.platforms.find(p => p.platform === selectedPlatform)?.blackoutDmas.length} DMAs.` : 
              'available nationwide.'
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewingMap;