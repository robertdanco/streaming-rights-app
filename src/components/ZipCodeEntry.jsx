import React, { useState, useContext } from 'react';
import { LocationContext } from '../context/LocationContext';

/**
 * Component for users to enter their zip code
 */
const ZipCodeEntry = () => {
  const { setUserLocation, isLoadingLocation } = useContext(LocationContext);
  const [zipCode, setZipCode] = useState('');
  const [error, setError] = useState('');

  const handleZipChange = (e) => {
    const input = e.target.value;
    setZipCode(input);
    
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!zipCode || zipCode.length < 5) {
      setError('Please enter a valid 5-digit ZIP code');
      return;
    }
    
    try {
      // This will trigger the location context to fetch data
      setUserLocation(zipCode);
    } catch (error) {
      setError('Error processing ZIP code. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Find Sports Games In Your Area</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
            Enter your ZIP code:
          </label>
          <input
            type="text"
            id="zipCode"
            value={zipCode}
            onChange={handleZipChange}
            placeholder="e.g. 90210"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            maxLength={5}
            pattern="[0-9]{5}"
          />
          {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
        
        <button
          type="submit"
          disabled={isLoadingLocation || zipCode.length < 5}
          className={`w-full py-2 px-4 rounded-md font-medium text-white
            ${isLoadingLocation || zipCode.length < 5 
              ? 'bg-blue-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {isLoadingLocation ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Loading...
            </span>
          ) : (
            'Find Games'
          )}
        </button>
      </form>
      
      <div className="mt-4 text-center text-sm text-gray-600">
        <p>We'll show you available games and where to watch them based on your location.</p>
      </div>
    </div>
  );
};

export default ZipCodeEntry;