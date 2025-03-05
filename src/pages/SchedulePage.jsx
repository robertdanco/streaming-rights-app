import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import GameSchedule from '../components/GameSchedule';
import ScheduleService from '../services/ScheduleService';
import { LocationContext } from '../context/LocationContext';

/**
 * Schedule page component displaying games with filtering options
 */
const SchedulePage = () => {
  const [searchParams] = useSearchParams();
  const zipCode = searchParams.get('zip') || '';
  const { userLocation } = useContext(LocationContext);
  
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dateRange, setDateRange] = useState('week');
  const [leagues, setLeagues] = useState([]);
  const [selectedLeague, setSelectedLeague] = useState('all');

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        
        // Get start and end dates based on selected range
        const startDate = new Date();
        const endDate = new Date();
        
        if (dateRange === 'today') {
          // Just today
        } else if (dateRange === 'week') {
          endDate.setDate(endDate.getDate() + 7);
        } else if (dateRange === 'month') {
          endDate.setDate(endDate.getDate() + 30);
        }
        
        // Generate array of dates in range
        const dates = [];
        let currentDate = new Date(startDate);
        
        while (currentDate <= endDate) {
          dates.push(new Date(currentDate).toISOString().split('T')[0]);
          currentDate.setDate(currentDate.getDate() + 1);
        }
        
        // Fetch games for each date
        const allGames = [];
        
        for (const date of dates) {
          const gamesForDate = await ScheduleService.getGames(date, 
            selectedLeague !== 'all' ? selectedLeague : null);
          
          // Add availability flag for display
          const gamesWithAvailability = gamesForDate.map(game => ({
            ...game,
            available: true, // In a real app, this would be determined by checking rights service
            nationalBroadcast: Math.random() > 0.5 // Mock random national broadcast for demo
          }));
          
          allGames.push(...gamesWithAvailability);
        }
        
        setGames(allGames);
        
        // Get available leagues
        const leaguesList = await ScheduleService.getLeagues();
        setLeagues(leaguesList);
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching games schedule:', err);
        setError('Unable to load games. Please try again.');
        setLoading(false);
      }
    };
    
    fetchGames();
  }, [dateRange, selectedLeague]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-blue-800 mb-4 sm:mb-0">
          Games Schedule
        </h1>
        
        <div className="flex space-x-4">
          <Link 
            to="/" 
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            Back to Home
          </Link>
          
          {zipCode && (
            <Link 
              to={`/?zip=${zipCode}`} 
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50"
            >
              Your Teams
            </Link>
          )}
        </div>
      </div>
      
      {zipCode && (
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <p className="text-center">
            <span className="font-medium">Viewing options for location:</span> {zipCode}
          </p>
        </div>
      )}
      
      <div className="bg-white shadow overflow-hidden rounded-lg mb-8">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Filter Games</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Date range filter */}
            <div>
              <label htmlFor="date-range" className="block text-sm font-medium text-gray-700 mb-1">
                Date Range
              </label>
              <select
                id="date-range"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="today">Today Only</option>
                <option value="week">Next 7 Days</option>
                <option value="month">Next 30 Days</option>
              </select>
            </div>
            
            {/* League filter */}
            <div>
              <label htmlFor="league-filter" className="block text-sm font-medium text-gray-700 mb-1">
                League
              </label>
              <select
                id="league-filter"
                value={selectedLeague}
                onChange={(e) => setSelectedLeague(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="all">All Leagues</option>
                {leagues.map(league => (
                  <option key={league.code} value={league.code}>
                    {league.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      
      {/* Games schedule */}
      {loading ? (
        <div className="animate-pulse space-y-6">
          <div className="h-20 bg-gray-200 rounded"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 p-4 rounded-lg">
          <p className="text-center text-red-800">{error}</p>
        </div>
      ) : (
        <GameSchedule 
          games={games} 
          userZip={zipCode || userLocation || ''} 
        />
      )}
    </div>
  );
};

export default SchedulePage;