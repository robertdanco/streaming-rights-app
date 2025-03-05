import React, { useContext, useState, useEffect } from 'react';
import ZipCodeEntry from '../components/ZipCodeEntry';
import TeamSelector from '../components/TeamSelector';
import GameSchedule from '../components/GameSchedule';
import { LocationContext } from '../context/LocationContext';
import ScheduleService from '../services/ScheduleService';

/**
 * Home page component with zip code entry, team selection, and today's games
 */
const HomePage = () => {
  const { userLocation, teams } = useContext(LocationContext);
  const [todayGames, setTodayGames] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [teamGames, setTeamGames] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch today's games when the component mounts
  useEffect(() => {
    const fetchTodayGames = async () => {
      try {
        setLoading(true);
        const today = new Date().toISOString().split('T')[0];
        const games = await ScheduleService.getGames(today);
        
        // Add availability flag for display
        const gamesWithAvailability = games.map(game => ({
          ...game,
          available: true, // In a real app, this would be determined by checking rights service
          nationalBroadcast: Math.random() > 0.5 // Mock random national broadcast for demo
        }));
        
        setTodayGames(gamesWithAvailability);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching today\'s games:', error);
        setLoading(false);
      }
    };
    
    fetchTodayGames();
  }, []);

  // Fetch team games when a team is selected
  useEffect(() => {
    if (!selectedTeam) return;
    
    const fetchTeamGames = async () => {
      try {
        setLoading(true);
        const games = await ScheduleService.getGames(null, null, selectedTeam.id);
        
        // Add availability flag for display
        const gamesWithAvailability = games.map(game => ({
          ...game,
          available: true, // In a real app, this would be determined by checking rights service
          nationalBroadcast: Math.random() > 0.5 // Mock random national broadcast for demo
        }));
        
        setTeamGames(gamesWithAvailability);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching team games:', error);
        setLoading(false);
      }
    };
    
    fetchTeamGames();
  }, [selectedTeam]);

  const handleTeamSelect = (team) => {
    setSelectedTeam(team);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">
        Sports Viewing Finder
      </h1>
      
      {/* Zip code entry form */}
      {!userLocation && (
        <div className="mb-8">
          <ZipCodeEntry />
        </div>
      )}
      
      {/* Location and teams info */}
      {userLocation && (
        <div className="mb-8">
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <p className="text-center">
              <span className="font-medium">Your location:</span> {userLocation} 
              <button 
                onClick={() => window.location.reload()}
                className="ml-2 text-blue-600 hover:text-blue-800 underline text-sm"
              >
                Change
              </button>
            </p>
          </div>
          
          {/* Team selector */}
          {teams && !selectedTeam && (
            <TeamSelector onTeamSelect={handleTeamSelect} />
          )}
          
          {/* Selected team header */}
          {selectedTeam && (
            <div className="flex justify-between items-center bg-white shadow rounded-lg p-4 mb-6">
              <div className="flex items-center">
                {selectedTeam.logo_url && (
                  <img 
                    src={selectedTeam.logo_url} 
                    alt={`${selectedTeam.name} logo`} 
                    className="h-12 w-12 object-contain mr-4"
                  />
                )}
                <div>
                  <h2 className="text-xl font-bold">{selectedTeam.name}</h2>
                  <p className="text-gray-600">{selectedTeam.league.toUpperCase()}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedTeam(null)}
                className="text-blue-600 hover:text-blue-800"
              >
                Change Team
              </button>
            </div>
          )}
        </div>
      )}
      
      {/* Game schedules */}
      <div className="space-y-8">
        {userLocation && selectedTeam ? (
          <>
            <h2 className="text-2xl font-bold mb-4">{selectedTeam.name} Schedule</h2>
            <GameSchedule games={teamGames} userZip={userLocation} />
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4">Today's Games</h2>
            {loading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-20 bg-gray-200 rounded"></div>
                <div className="h-20 bg-gray-200 rounded"></div>
                <div className="h-20 bg-gray-200 rounded"></div>
              </div>
            ) : (
              <GameSchedule games={todayGames} userZip={userLocation || ''} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;