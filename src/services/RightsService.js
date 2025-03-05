/**
 * RightsService.js
 * Handles determination of viewing options based on location and games
 */

import { get } from '../utils/api';

class RightsService {
  /**
   * Get viewing options for a game based on user location
   * @param {string} gameId - Game ID
   * @param {string} zipCode - User's zip code
   * @returns {Promise<Array>} - List of viewing options available for the user
   */
  async getViewingOptions(gameId, zipCode) {
    try {
      const response = await get(`/streaming-rights/options`, {
        game_id: gameId,
        zip_code: zipCode
      });
      return response.data;
    } catch (error) {
      console.error('Error getting viewing options:', error);
      throw error;
    }
  }

  /**
   * Get blackout map data for a game
   * @param {string} gameId - Game ID
   * @returns {Promise<Object>} - Geospatial data showing where game is viewable
   */
  async getBlackoutMap(gameId) {
    try {
      const response = await get(`/streaming-rights/blackout-map/${gameId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting blackout map:', error);
      throw error;
    }
  }

  /**
   * Get available platforms for a location
   * @param {string} zipCode - User's zip code
   * @returns {Promise<Array>} - List of viewing platforms available in the location
   */
  async getAvailablePlatforms(zipCode) {
    try {
      const response = await get(`/streaming-rights/platforms`, {
        zip_code: zipCode
      });
      return response.data;
    } catch (error) {
      console.error('Error getting available platforms:', error);
      throw error;
    }
  }

  /**
   * Check if a game is available to watch in a specific location
   * @param {string} gameId - Game ID
   * @param {string} zipCode - User's zip code
   * @returns {Promise<boolean>} - Whether the game is available to watch
   */
  async isGameAvailable(gameId, zipCode) {
    try {
      const response = await get(`/streaming-rights/availability`, {
        game_id: gameId,
        zip_code: zipCode
      });
      return response.data.available;
    } catch (error) {
      console.error('Error checking game availability:', error);
      return false;
    }
  }
}

export default new RightsService();