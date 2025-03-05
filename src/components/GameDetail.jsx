import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RightsService from '../services/RightsService';
import ScheduleService from '../services/ScheduleService';

/**
 * Component to display detailed information about a game and viewing options
 */
const GameDetail = ({ gameId, zipCode }) => {
  const [game, setGame] = useState(null);
  const [viewingOptions, setViewingOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        setLoading(true);
        // Fetch game details
        const gameData = await ScheduleService.getGameDetails(gameId);
        setGame(gameData);
        
        if (zipCode) {
          // Fetch viewing options based on user's location
          const options = await RightsService.getViewingOptions(gameId, zipCode);
          setViewingOptions(options);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching game details:', err);
        setError('Unable to load game details. Please try again.');
        setLoading(false);
      }
    };

    if (gameId) {
      fetchGameDetails();
    }
  }, [gameId, zipCode]);

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

  // Group viewing options by platform type
  const groupedOptions = viewingOptions.reduce((groups, option) => {
    const type = option.platformDetails?.type || 'unknown';
    if (!groups[type]) {
      groups[type] = [];
    }
    groups[type].push(option);
    return groups;
  }, {});

  if (loading) {
    return (
      <div className="bg-white shadow overflow-hidden rounded-lg p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-10 bg-gray-200 rounded w-full"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !game) {
    return (
      <div className="bg-white shadow overflow-hidden rounded-lg p-6 text-center">
        <p className="text-red-500">{error || 'Game not found'}</p>
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
              {formatDateTime(game.start_time)} • {game.venue || 'Venue TBD'}
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link to={`/map/${game.id}?zip=${zipCode}`} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              View Availability Map
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
          Viewing Options
        </h3>
        
        {viewingOptions.length === 0 ? (
          <div className="text-center py-6 bg-gray-50 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No viewing options available</h3>
            <p className="mt-1 text-sm text-gray-500">
              This game may be blacked out in your area or not currently scheduled for broadcast.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* TV Broadcast Options */}
            {groupedOptions.local_tv && (
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-2">Local TV</h4>
                <ul className="divide-y divide-gray-200 border-t border-b">
                  {groupedOptions.local_tv.map((option, index) => (
                    <li key={index} className="py-3">
                      <div className="flex items-center">
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900">{option.provider}</p>
                          {option.channel && (
                            <p className="text-sm text-gray-500">Channel: {option.channel}</p>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* National TV Options */}
            {groupedOptions.national_tv && (
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-2">National TV</h4>
                <ul className="divide-y divide-gray-200 border-t border-b">
                  {groupedOptions.national_tv.map((option, index) => (
                    <li key={index} className="py-3">
                      <div className="flex items-center">
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900">{option.provider}</p>
                          {option.channel && (
                            <p className="text-sm text-gray-500">Channel: {option.channel}</p>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Streaming Options */}
            {groupedOptions.streaming && (
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-2">Streaming</h4>
                <ul className="divide-y divide-gray-200 border-t border-b">
                  {groupedOptions.streaming.map((option, index) => (
                    <li key={index} className="py-3">
                      <div className="flex items-center justify-between">
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900">{option.provider}</p>
                        </div>
                        {option.url && (
                          <div className="ml-4">
                            <a
                              href={option.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                            >
                              Watch
                            </a>
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Radio Options */}
            {groupedOptions.radio && (
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-2">Radio</h4>
                <ul className="divide-y divide-gray-200 border-t border-b">
                  {groupedOptions.radio.map((option, index) => (
                    <li key={index} className="py-3">
                      <div className="flex items-center justify-between">
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900">{option.provider}</p>
                          {option.channel && (
                            <p className="text-sm text-gray-500">{option.channel}</p>
                          )}
                        </div>
                        {option.url && (
                          <div className="ml-4">
                            <a
                              href={option.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                            >
                              Listen
                            </a>
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="bg-gray-50 px-4 py-4 sm:px-6">
        <div className="text-sm">
          <Link to="/" className="font-medium text-blue-600 hover:text-blue-500">
            Back to schedule <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GameDetail;