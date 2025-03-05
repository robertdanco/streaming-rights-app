/**
 * ScheduleService.js
 * Handles retrieval of game schedules and details
 */

import { get } from '../utils/api';

class ScheduleService {
  /**
   * Get games by date, league, and/or team
   * @param {Date|string} date - Game date (optional)
   * @param {string} league - League code (optional)
   * @param {string} teamId - Team ID (optional)
   * @returns {Promise<Array>} - List of games matching criteria
   */
  async getGames(date, league, teamId) {
    try {
      const params = {};
      
      if (date) {
        params.date = typeof date === 'string'
          ? date
          : date.toISOString().split('T')[0];
      }
      
      if (league) {
        params.league = league;
      }
      
      if (teamId) {
        params.team_id = teamId;
      }
      
      const response = await get('/games', params);
      return response.data;
    } catch (error) {
      console.error('Error getting games:', error);
      throw error;
    }
  }

  /**
   * Get detailed information for a specific game
   * @param {string} gameId - Game ID
   * @returns {Promise<Object>} - Game details
   */
  async getGameDetails(gameId) {
    try {
      const response = await get(`/games/${gameId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting game details:', error);
      throw error;
    }
  }

  /**
   * Get daily schedule for a specific league
   * @param {string} league - League code
   * @returns {Promise<Array>} - List of games for today in the specified league
   */
  async getDailySchedule(league) {
    try {
      const today = new Date().toISOString().split('T')[0];
      const response = await get('/games/daily', {
        league,
        date: today
      });
      return response.data;
    } catch (error) {
      console.error('Error getting daily schedule:', error);
      throw error;
    }
  }

  /**
   * Get upcoming games for specified teams
   * @param {Array} teamIds - List of team IDs
   * @param {number} days - Number of days to look ahead
   * @returns {Promise<Array>} - List of upcoming games for the teams
   */
  async getUpcomingGamesForTeams(teamIds, days = 7) {
    try {
      const response = await get('/games/upcoming', {
        team_ids: teamIds.join(','),
        days
      });
      return response.data;
    } catch (error) {
      console.error('Error getting upcoming games for teams:', error);
      throw error;
    }
  }

  /**
   * Get all available leagues
   * @returns {Promise<Array>} - List of available leagues
   */
  async getLeagues() {
    try {
      const response = await get('/leagues');
      return response.data;
    } catch (error) {
      console.error('Error getting leagues:', error);
      throw error;
    }
  }
}

export default new ScheduleService();