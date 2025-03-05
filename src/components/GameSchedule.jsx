import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * Component to display a schedule of games
 */
const GameSchedule = ({ games, userZip }) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedLeague, setSelectedLeague] = useState('all');
  
  // Group games by date for easier display
  const gamesByDate = games.reduce((acc, game) => {
    const date = game.start_time.split('T')[0];
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(game);
    return acc;
  }, {});

  // Get unique dates and sort them
  const dates = Object.keys(gamesByDate).sort();

  // Get unique leagues from games
  const leagues = ['all', ...new Set(games.map(game => game.league))];
  
  // Filter games by selected date and league
  const filteredGames = games.filter(game => {
    const matchesDate = game.start_time.split('T')[0] === selectedDate;
    const matchesLeague = selectedLeague === 'all' || game.league === selectedLeague;
    return matchesDate && matchesLeague;
  });

  // Format time for display
  const formatTime = (timeString) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit', 
      hour12: true 
    });
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  // Get league display name
  const getLeagueName = (leagueCode) => {
    switch (leagueCode) {
      case 'mlb': return 'MLB';
      case 'nba': return 'NBA';
      case 'nhl': return 'NHL';
      default: return leagueCode.toUpperCase();
    }
  };
  
  // Determine availability status badge
  const getAvailabilityBadge = (game) => {
    if (!game.available) {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
          Unavailable
        </span>
      );
    }
    
    if (game.nationalBroadcast) {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
          National TV
        </span>
      );
    }
    
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
        Available
      </span>
    );
  };

  if (games.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900">No games scheduled</h3>
        <p className="mt-2 text-sm text-gray-500">Check back later or try a different date.</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow overflow-hidden rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between mb-6 space-y-4 sm:space-y-0">
          {/* Date selector */}
          <div>
            <label htmlFor="date-select" className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <select
              id="date-select"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              {dates.map(date => (
                <option key={date} value={date}>
                  {formatDate(date)}
                </option>
              ))}
            </select>
          </div>
          
          {/* League filter */}
          <div>
            <label htmlFor="league-select" className="block text-sm font-medium text-gray-700 mb-1">
              League
            </label>
            <select
              id="league-select"
              value={selectedLeague}
              onChange={(e) => setSelectedLeague(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              {leagues.map(league => (
                <option key={league} value={league}>
                  {league === 'all' ? 'All Leagues' : getLeagueName(league)}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Games list */}
        <ul className="divide-y divide-gray-200">
          {filteredGames.length === 0 ? (
            <li className="py-4 text-center text-gray-500">
              No games scheduled for this date and league
            </li>
          ) : (
            filteredGames.map(game => (
              <li key={game.id} className="py-4 flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {game.away_team.name} @ {game.home_team.name}
                      </p>
                      <p className="mt-1 flex items-center text-sm text-gray-500">
                        <span className="truncate">{getLeagueName(game.league)} • {formatTime(game.start_time)}</span>
                      </p>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      {getAvailabilityBadge(game)}
                    </div>
                  </div>
                </div>
                <div className="ml-4">
                  <Link
                    to={`/game/${game.id}?zip=${userZip}`}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Details
                  </Link>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default GameSchedule;