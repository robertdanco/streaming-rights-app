import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LocationProvider from './context/LocationContext';
import HomePage from './pages/HomePage';
import SchedulePage from './pages/SchedulePage';
import MapPage from './pages/MapPage';
import GameDetailWrapper from './components/GameDetailWrapper';
import { useParams, useLocation } from 'react-router-dom';

// Wrapper for MapPage component
const MapPageWrapper = () => {
  const { gameId } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const zipCode = searchParams.get('zip') || '';

  return <MapPage gameId={gameId} zipCode={zipCode} />;
};

function App() {
  return (
    <LocationProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <header className="bg-blue-700 text-white py-4 shadow-lg">
            <div className="container mx-auto px-4 flex justify-between items-center">
              <a href="/" className="text-xl font-bold">Sports Viewing Finder</a>
              <nav className="space-x-4">
                <a href="/" className="hover:text-blue-200">Home</a>
                <a href="/schedule" className="hover:text-blue-200">Schedule</a>
              </nav>
            </div>
          </header>
          
          <main className="py-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/schedule" element={<SchedulePage />} />
              <Route path="/game/:gameId" element={<GameDetailWrapper />} />
              <Route path="/map/:gameId" element={<MapPageWrapper />} />
            </Routes>
          </main>
          
          <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-lg font-bold mb-4">About</h3>
                  <p className="text-gray-300">
                    Sports Viewing Finder helps you discover where to watch your favorite games based on your location.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-4">Supported Leagues</h3>
                  <ul className="text-gray-300">
                    <li>MLB - Major League Baseball</li>
                    <li>NBA - National Basketball Association</li>
                    <li>NHL - National Hockey League</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-4">Legal</h3>
                  <ul className="text-gray-300">
                    <li>Terms of Service</li>
                    <li>Privacy Policy</li>
                    <li>Cookie Policy</li>
                  </ul>
                </div>
              </div>
              <div className="mt-8 pt-4 border-t border-gray-700 text-center text-gray-400">
                <p>&copy; {new Date().getFullYear()} Sports Viewing Finder. All rights reserved.</p>
                <p className="text-sm mt-2">This is a demonstration app and not affiliated with any sports league.</p>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </LocationProvider>
  );
}

export default App;