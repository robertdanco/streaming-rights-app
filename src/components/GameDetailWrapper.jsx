import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import GameDetail from './GameDetail';

/**
 * Wrapper component for GameDetail that extracts URL parameters
 */
const GameDetailWrapper = () => {
  const { gameId } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const zipCode = searchParams.get('zip') || '';

  return <GameDetail gameId={gameId} zipCode={zipCode} />;
};

export default GameDetailWrapper;