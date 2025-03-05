/**
 * LocationService.js
 * Handles zip code lookups and retrieval of team assignments based on location
 */

import { get, post } from '../utils/api';

class LocationService {
  /**
   * Get location information by zip code
   * @param {string} zipCode - User's zip code
   * @returns {Promise<Object>} - Location data including DMA info
   */
  async getLocationByZip(zipCode) {
    try {
      const response = await get(`/zip-lookup/${zipCode}`);
      return response.data;
    } catch (error) {
      console.error('Error getting location by zip:', error);
      throw error;
    }
  }

  /**
   * Get teams assigned to a specific zip code
   * @param {string} zipCode - User's zip code
   * @returns {Promise<Object>} - Teams assigned to the zip code by league
   */
  async getTeamsByZip(zipCode) {
    try {
      const response = await get(`/teams`, { zip_code: zipCode });
      return response.data;
    } catch (error) {
      console.error('Error getting teams by zip:', error);
      throw error;
    }
  }

  /**
   * Get DMAs by team
   * @param {string} teamId - Team ID
   * @returns {Promise<Array>} - List of DMAs where the team is assigned
   */
  async getDmasByTeam(teamId) {
    try {
      const response = await get(`/dmas`, { team_id: teamId });
      return response.data;
    } catch (error) {
      console.error('Error getting DMAs by team:', error);
      throw error;
    }
  }

  /**
   * Verify if a zip code exists in our database
   * @param {string} zipCode - User's zip code
   * @returns {Promise<boolean>} - Whether the zip code is valid
   */
  async validateZipCode(zipCode) {
    try {
      const response = await post('/zip-lookup/validate', { zip_code: zipCode });
      return response.data.valid;
    } catch (error) {
      console.error('Error validating zip code:', error);
      return false;
    }
  }
}

export default new LocationService();