# Sports Viewing Finder Application

[![Production Deployment](https://img.shields.io/badge/deployment-live-green)](https://sports-viewing-app-8nu5yl-v1.mgx.world)
[![React](https://img.shields.io/badge/React-18%2B-blue)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.68%2B-green)](https://fastapi.tiangolo.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.x-blue)](https://tailwindcss.com/)

## Overview

The Sports Viewing Finder is a web application designed to help sports fans locate games they can watch based on their ZIP code. It simplifies the process of finding available games across major sports leagues (MLB, NBA, and NHL) and provides streaming options based on geographical location.

### Key Features

- ZIP code-based game viewing rights lookup
- Interactive game schedules for multiple sports leagues
- Team selection and filtering capabilities
- Detailed game information and streaming options
- Geographic viewing rights visualization
- Real-time data integration with sports APIs

## Module Description

### 1. User Input Module
- **ZipCodeEntry**: Handles user location input for viewing rights determination
- Validates ZIP codes and triggers location-based data fetching

### 2. Team Selection Module
- **TeamSelector**: Displays teams based on user location
- Enables favorite team selection and filtering
- Updates game schedule based on selected teams

### 3. Game Schedule Module
- **GameSchedule**: Shows upcoming games across leagues
- Provides filtering by date, league, and team
- Integrates with viewing rights data

### 4. Game Detail Module
- **GameDetail**: Comprehensive game information display
- Shows teams, dates, times, and venue details
- Lists available streaming platforms

### 5. Geographical Viewing Module
- **ViewingMap**: Interactive map visualization
- Shows blackout regions and available areas
- Indicates streaming platform availability by region

### 6. Rights Determination Module
- **RightsService**: Backend service for viewing rights logic
- Integrates with multiple data sources
- Handles regional restrictions and blackouts

## Technology Stack

### Frontend
- React 18+
- Vite
- Tailwind CSS
- React Router

### Backend
- FastAPI
- Python 3.9+
- SQLite/PostgreSQL

### Data Processing
- Pandas for data manipulation
- Integration with sports league APIs

## Installation

1. Clone the repository:
```bash
git clone https://github.com/robertdanco/streaming-rights-app.git
cd streaming-rights-app
```

2. Install frontend dependencies:
```bash
pnpm install
```

3. Install backend dependencies:
```bash
cd backend
pip install -r requirements.txt
```

## Development Setup

1. Start the frontend development server:
```bash
pnpm run dev
```

2. Start the backend server:
```bash
cd backend
uvicorn main:app --reload
```

## API Documentation

### Location Endpoints

`GET /api/location/{zip_code}`
- Returns location information for given ZIP code
- Includes local teams and regional sports networks

### Game Schedule Endpoints

`GET /api/schedule`
- Returns upcoming games across all leagues
- Query parameters:
  - `date`: Filter by date (YYYY-MM-DD)
  - `league`: Filter by league (MLB/NBA/NHL)
  - `team`: Filter by team ID

### Viewing Rights Endpoints

`GET /api/rights/{game_id}`
- Returns viewing rights information for specific game
- Includes:
  - Available streaming platforms
  - Blackout regions
  - Required subscriptions

## Deployment

The application is deployed and accessible at:
https://sports-viewing-app-8nu5yl-v1.mgx.world

### Deployment Stack
- NGINX for reverse proxy and static file serving
- Docker for containerization
- Automated deployment via GitHub Actions

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please open an issue in the GitHub repository or contact the development team.
