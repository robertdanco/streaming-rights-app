/**
 * mockData.js
 * Mock data for development and testing
 */

// Sample data for the application
const mockData = {
  // Leagues
  leagues: [
    { code: 'mlb', name: 'Major League Baseball' },
    { code: 'nba', name: 'National Basketball Association' },
    { code: 'nhl', name: 'National Hockey League' }
  ],
  
  // Teams
  teams: [
    // MLB Teams
    { id: 'mlb-nyy', name: 'New York Yankees', abbreviation: 'NYY', league: 'mlb', logo_url: 'https://content.sportslogos.net/logos/54/68/thumbs/1256.gif' },
    { id: 'mlb-bos', name: 'Boston Red Sox', abbreviation: 'BOS', league: 'mlb', logo_url: 'https://content.sportslogos.net/logos/54/53/thumbs/c0yjir7l5hroiqrjyg79etjei.gif' },
    { id: 'mlb-lad', name: 'Los Angeles Dodgers', abbreviation: 'LAD', league: 'mlb', logo_url: 'https://content.sportslogos.net/logos/54/63/thumbs/efvfv5b5g1slh069ihvvws4m0.gif' },
    { id: 'mlb-chc', name: 'Chicago Cubs', abbreviation: 'CHC', league: 'mlb', logo_url: 'https://content.sportslogos.net/logos/54/54/thumbs/q9gvs07u72gc61vg12hfa0hos.gif' },
    
    // NBA Teams
    { id: 'nba-lal', name: 'Los Angeles Lakers', abbreviation: 'LAL', league: 'nba', logo_url: 'https://content.sportslogos.net/logos/6/17/thumbs/ygei37qvbi2zn7ftqe3y3rd7o.gif' },
    { id: 'nba-bos', name: 'Boston Celtics', abbreviation: 'BOS', league: 'nba', logo_url: 'https://content.sportslogos.net/logos/6/213/thumbs/slhg02hbef3j1ov4lsnwyol5o.gif' },
    { id: 'nba-gsw', name: 'Golden State Warriors', abbreviation: 'GSW', league: 'nba', logo_url: 'https://content.sportslogos.net/logos/6/235/thumbs/23531522020_golden-state-warriors-logo.gif' },
    { id: 'nba-nyk', name: 'New York Knicks', abbreviation: 'NYK', league: 'nba', logo_url: 'https://content.sportslogos.net/logos/6/216/thumbs/2nn48xofg0hms8k326cqdmuis.gif' },
    
    // NHL Teams
    { id: 'nhl-nyr', name: 'New York Rangers', abbreviation: 'NYR', league: 'nhl', logo_url: 'https://content.sportslogos.net/logos/1/20/thumbs/144.gif' },
    { id: 'nhl-bos', name: 'Boston Bruins', abbreviation: 'BOS', league: 'nhl', logo_url: 'https://content.sportslogos.net/logos/1/3/thumbs/venf9fmhgnsawnxxvehf.gif' },
    { id: 'nhl-tor', name: 'Toronto Maple Leafs', abbreviation: 'TOR', league: 'nhl', logo_url: 'https://content.sportslogos.net/logos/1/28/thumbs/xuu32v3pgd30vkjbqvcyw6mve.gif' },
    { id: 'nhl-lak', name: 'Los Angeles Kings', abbreviation: 'LAK', league: 'nhl', logo_url: 'https://content.sportslogos.net/logos/1/14/thumbs/14.gif' }
  ],
  
  // Zip codes
  zipCodes: [
    { code: '10001', dma_code: '501', dma_description: 'New York', latitude: 40.7501, longitude: -73.9970 },
    { code: '90210', dma_code: '803', dma_description: 'Los Angeles', latitude: 34.0901, longitude: -118.4065 },
    { code: '02108', dma_code: '506', dma_description: 'Boston', latitude: 42.3600, longitude: -71.0589 },
    { code: '60601', dma_code: '602', dma_description: 'Chicago', latitude: 41.8850, longitude: -87.6240 }
  ],
  
  // DMAs (Designated Market Areas)
  dmas: [
    { code: '501', description: 'New York', geojson: { type: 'MultiPolygon', coordinates: [] } },
    { code: '803', description: 'Los Angeles', geojson: { type: 'MultiPolygon', coordinates: [] } },
    { code: '506', description: 'Boston', geojson: { type: 'MultiPolygon', coordinates: [] } },
    { code: '602', description: 'Chicago', geojson: { type: 'MultiPolygon', coordinates: [] } }
  ],
  
  // Team assignments by zip code
  teamAssignments: [
    { 
      zip_code: '10001', 
      dma_code: '501', 
      mlb_teams: ['mlb-nyy'], 
      nba_teams: ['nba-nyk'], 
      nhl_teams: ['nhl-nyr'] 
    },
    { 
      zip_code: '90210', 
      dma_code: '803', 
      mlb_teams: ['mlb-lad'], 
      nba_teams: ['nba-lal'], 
      nhl_teams: ['nhl-lak'] 
    },
    { 
      zip_code: '02108', 
      dma_code: '506', 
      mlb_teams: ['mlb-bos'], 
      nba_teams: ['nba-bos'], 
      nhl_teams: ['nhl-bos'] 
    },
    { 
      zip_code: '60601', 
      dma_code: '602', 
      mlb_teams: ['mlb-chc'], 
      nba_teams: ['nba-nyk'], 
      nhl_teams: ['nhl-tor'] 
    }
  ],
  
  // Games
  games: [
    // MLB Games
    {
      id: 'mlb-game-1',
      league: 'mlb',
      home_team: { id: 'mlb-nyy', name: 'New York Yankees', abbreviation: 'NYY', league: 'mlb' },
      away_team: { id: 'mlb-bos', name: 'Boston Red Sox', abbreviation: 'BOS', league: 'mlb' },
      start_time: '2023-07-15T18:00:00Z',
      venue: 'Yankee Stadium',
      status: 'scheduled'
    },
    {
      id: 'mlb-game-2',
      league: 'mlb',
      home_team: { id: 'mlb-lad', name: 'Los Angeles Dodgers', abbreviation: 'LAD', league: 'mlb' },
      away_team: { id: 'mlb-chc', name: 'Chicago Cubs', abbreviation: 'CHC', league: 'mlb' },
      start_time: '2023-07-15T20:00:00Z',
      venue: 'Dodger Stadium',
      status: 'scheduled'
    },
    
    // NBA Games
    {
      id: 'nba-game-1',
      league: 'nba',
      home_team: { id: 'nba-lal', name: 'Los Angeles Lakers', abbreviation: 'LAL', league: 'nba' },
      away_team: { id: 'nba-bos', name: 'Boston Celtics', abbreviation: 'BOS', league: 'nba' },
      start_time: '2023-07-16T19:30:00Z',
      venue: 'Staples Center',
      status: 'scheduled'
    },
    {
      id: 'nba-game-2',
      league: 'nba',
      home_team: { id: 'nba-gsw', name: 'Golden State Warriors', abbreviation: 'GSW', league: 'nba' },
      away_team: { id: 'nba-nyk', name: 'New York Knicks', abbreviation: 'NYK', league: 'nba' },
      start_time: '2023-07-16T22:00:00Z',
      venue: 'Chase Center',
      status: 'scheduled'
    },
    
    // NHL Games
    {
      id: 'nhl-game-1',
      league: 'nhl',
      home_team: { id: 'nhl-nyr', name: 'New York Rangers', abbreviation: 'NYR', league: 'nhl' },
      away_team: { id: 'nhl-bos', name: 'Boston Bruins', abbreviation: 'BOS', league: 'nhl' },
      start_time: '2023-07-17T19:00:00Z',
      venue: 'Madison Square Garden',
      status: 'scheduled'
    },
    {
      id: 'nhl-game-2',
      league: 'nhl',
      home_team: { id: 'nhl-lak', name: 'Los Angeles Kings', abbreviation: 'LAK', league: 'nhl' },
      away_team: { id: 'nhl-tor', name: 'Toronto Maple Leafs', abbreviation: 'TOR', league: 'nhl' },
      start_time: '2023-07-17T22:00:00Z',
      venue: 'Crypto.com Arena',
      status: 'scheduled'
    }
  ],
  
  // Viewing platforms
  platforms: [
    { code: 'local_tv', name: 'Local Television', type: 'local_tv' },
    { code: 'national_tv', name: 'National Television', type: 'national_tv' },
    { code: 'espn_plus', name: 'ESPN+', type: 'streaming' },
    { code: 'nba_league_pass', name: 'NBA League Pass', type: 'streaming' },
    { code: 'nhl_center_ice', name: 'NHL Center Ice', type: 'streaming' },
    { code: 'mlb_tv', name: 'MLB.TV', type: 'streaming' },
    { code: 'radio', name: 'Radio Broadcast', type: 'radio' }
  ],
  
  // Viewing options
  viewingOptions: [
    // MLB Game 1 viewing options
    {
      game_id: 'mlb-game-1',
      platform: 'local_tv',
      provider: 'YES Network',
      channel: '70',
      blackout_regions: ['506'] // Blacked out in Boston
    },
    {
      game_id: 'mlb-game-1',
      platform: 'national_tv',
      provider: 'ESPN',
      channel: '206',
      blackout_regions: []
    },
    {
      game_id: 'mlb-game-1',
      platform: 'mlb_tv',
      provider: 'MLB.TV',
      url: 'https://www.mlb.com/tv',
      blackout_regions: ['501', '506'] // Blacked out in NY and Boston
    },
    
    // MLB Game 2 viewing options
    {
      game_id: 'mlb-game-2',
      platform: 'local_tv',
      provider: 'SportsNet LA',
      channel: '70',
      blackout_regions: ['602'] // Blacked out in Chicago
    },
    {
      game_id: 'mlb-game-2',
      platform: 'mlb_tv',
      provider: 'MLB.TV',
      url: 'https://www.mlb.com/tv',
      blackout_regions: ['803', '602'] // Blacked out in LA and Chicago
    },
    
    // NBA Game 1 viewing options
    {
      game_id: 'nba-game-1',
      platform: 'national_tv',
      provider: 'TNT',
      channel: '245',
      blackout_regions: []
    },
    {
      game_id: 'nba-game-1',
      platform: 'local_tv',
      provider: 'Spectrum SportsNet',
      channel: '30',
      blackout_regions: ['506'] // Blacked out in Boston
    },
    {
      game_id: 'nba-game-1',
      platform: 'nba_league_pass',
      provider: 'NBA League Pass',
      url: 'https://www.nba.com/leaguepass',
      blackout_regions: ['803', '506'] // Blacked out in LA and Boston
    },
    
    // NBA Game 2 viewing options
    {
      game_id: 'nba-game-2',
      platform: 'local_tv',
      provider: 'NBC Sports Bay Area',
      channel: '40',
      blackout_regions: ['501'] // Blacked out in NY
    },
    {
      game_id: 'nba-game-2',
      platform: 'nba_league_pass',
      provider: 'NBA League Pass',
      url: 'https://www.nba.com/leaguepass',
      blackout_regions: ['803', '501'] // Blacked out in SF and NY
    },
    
    // NHL Game 1 viewing options
    {
      game_id: 'nhl-game-1',
      platform: 'local_tv',
      provider: 'MSG Network',
      channel: '72',
      blackout_regions: ['506'] // Blacked out in Boston
    },
    {
      game_id: 'nhl-game-1',
      platform: 'nhl_center_ice',
      provider: 'NHL Center Ice',
      url: 'https://www.nhl.com/subscribe',
      blackout_regions: ['501', '506'] // Blacked out in NY and Boston
    },
    
    // NHL Game 2 viewing options
    {
      game_id: 'nhl-game-2',
      platform: 'local_tv',
      provider: 'Bally Sports West',
      channel: '50',
      blackout_regions: ['506'] // Blacked out in Toronto area
    },
    {
      game_id: 'nhl-game-2',
      platform: 'espn_plus',
      provider: 'ESPN+',
      url: 'https://plus.espn.com/',
      blackout_regions: ['803'] // Blacked out in LA
    }
  ]
};

export default mockData;