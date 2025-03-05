import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import ViewingMap from '../components/ViewingMap';
import ScheduleService from '../services/ScheduleService';

/**
 * Map page component displaying geographical game availability
 */
const MapPage = () => {
  const { gameId } = useParams();
  const [searchParams] = useSearchParams();
  const zipCode = searchParams.get('zip') || '';
  
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGameInfo = async () => {
      try {
        if (!gameId) {
          setError('No game selected.');
          setLoading(false);
          return;
        }
        
        setLoading(true);
        const gameData = await ScheduleService.getGameDetails(gameId);
        setGame(gameData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching game details:', err);
        setError('Unable to load game information.');
        setLoading(false);
      }
    };
    
    fetchGameInfo();
  }, [gameId]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-blue-800 mb-4 sm:mb-0">
          Viewing Availability Map
        </h1>
        
        <div className="flex space-x-4">
          <Link 
            to="/" 
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            Back to Home
          </Link>
          
          {gameId && (
            <Link 
              to={`/game/${gameId}${zipCode ? `?zip=${zipCode}` : ''}`} 
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50"
            >
              Game Details
            </Link>
          )}
        </div>
      </div>
      
      {loading ? (
        <div className="animate-pulse space-y-6 bg-white shadow overflow-hidden rounded-lg p-6">
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-80 bg-gray-200 rounded w-full"></div>
        </div>
      ) : error ? (
        <div className="bg-white shadow overflow-hidden rounded-lg p-6">
          <div className="text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">Error</h3>
            <p className="mt-1 text-sm text-gray-500">{error}</p>
            <div className="mt-6">
              <Link 
                to="/" 
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                Go back home
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <ViewingMap gameId={gameId} zipCode={zipCode} />
      )}
      
      <div className="mt-8 bg-blue-50 p-6 rounded-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-2">About This Map</h2>
        <p className="text-gray-600">
          This map shows where in the United States this game is available to watch and on which platforms.
          Regions in green have access to the selected platform, while regions in red are subject to blackout restrictions.
        </p>
        <p className="text-gray-600 mt-2">
          Blackout policies are determined by the leagues and their broadcasting partners.
          Typically, games are blacked out in the local market to protect attendance and local broadcast rights.
        </p>
      </div>
    </div>
  );
};

export default MapPage;