import React, { useContext } from 'react';
import { LocationContext } from '../context/LocationContext';

/**
 * Component to display and select teams based on user's location
 */
const TeamSelector = ({ onTeamSelect }) => {
  const { teams, isLoadingTeams, error } = useContext(LocationContext);

  if (isLoadingTeams) {
    return (
      <div className="bg-white shadow overflow-hidden rounded-lg p-6 text-center">
        <div className="animate-pulse flex justify-center items-center">
          <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        <p className="mt-2 text-sm text-gray-500">Loading your local teams...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white shadow overflow-hidden rounded-lg p-6 text-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!teams || (!teams.mlbTeams.length && !teams.nbaTeams.length && !teams.nhlTeams.length)) {
    return (
      <div className="bg-white shadow overflow-hidden rounded-lg p-6 text-center">
        <p>No teams found for this location. Please try another zip code.</p>
      </div>
    );
  }

  const renderTeamList = (teams, league) => {
    if (!teams.length) return null;
    
    return (
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-3">{league}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {teams.map(team => (
            <div 
              key={team.id} 
              onClick={() => onTeamSelect(team)}
              className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-blue-50 transition-colors"
            >
              {team.logo_url && (
                <div className="flex-shrink-0 h-10 w-10 mr-3">
                  <img 
                    src={team.logo_url} 
                    alt={`${team.name} logo`}
                    className="h-full w-full object-contain"
                  />
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-gray-900">{team.name}</p>
                <p className="text-xs text-gray-500">{team.abbreviation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white shadow overflow-hidden rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Your Local Teams</h2>
        <p className="text-sm text-gray-600 mb-6">
          Based on your location, here are the teams in your area. Select a team to see their schedule.
        </p>
        
        {teams.mlbTeams.length > 0 && renderTeamList(teams.mlbTeams, 'MLB')}
        {teams.nbaTeams.length > 0 && renderTeamList(teams.nbaTeams, 'NBA')}
        {teams.nhlTeams.length > 0 && renderTeamList(teams.nhlTeams, 'NHL')}
      </div>
    </div>
  );
};

export default TeamSelector;