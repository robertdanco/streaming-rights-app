# Sports Viewing Finder Application

## Overview
The Sports Viewing Finder is a web application that helps users discover which sports games they can watch based on their location. By entering their ZIP code, users can view available games across major sports leagues (MLB, NBA, NHL) and find streaming options in their area.

### Key Features
- ZIP code-based game availability lookup
- Interactive map showing streaming availability across regions
- Comprehensive game schedule view
- Real-time streaming rights information
- Cross-league game coverage (MLB, NBA, NHL)

## Technology Stack

### Frontend
- React 18+
- Vite for build tooling
- TailwindCSS for styling
- React Router for navigation

### Backend
- FastAPI
- Python 3.9+
- SQLite/PostgreSQL for data storage
- Pandas for data processing

## Installation

### Prerequisites
- Node.js 16+
- Python 3.9+
- pnpm (recommended) or npm
- Docker (optional)

### Frontend Setup
```bash
# Navigate to project directory
cd sports-viewing-app

# Install dependencies
pnpm install

# Start development server
pnpm run dev
```

### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start FastAPI server
uvicorn main:app --reload
```

## API Documentation

### ZIP Code Lookup
```
POST /api/zip-lookup
Request:
{
    "zip_code": "string"
}
Response:
{
    "teams": [
        {
            "id": "string",
            "name": "string",
            "league": "string"
        }
    ],
    "dma_code": "string"
}
```

### Game Schedule
```
GET /api/games
Query Parameters:
- date (optional): YYYY-MM-DD
- league (optional): MLB|NBA|NHL
- team_id (optional): string

Response:
{
    "games": [
        {
            "id": "string",
            "home_team": {...},
            "away_team": {...},
            "start_time": "string",
            "venue": "string"
        }
    ]
}
```

### Streaming Rights
```
GET /api/streaming-rights
Query Parameters:
- game_id: string
- zip_code: string

Response:
{
    "platforms": [
        {
            "name": "string",
            "url": "string",
            "blackout": boolean
        }
    ]
}
```

### Teams Information
```
GET /api/teams
Query Parameters:
- league (optional): MLB|NBA|NHL

Response:
{
    "teams": [
        {
            "id": "string",
            "name": "string",
            "league": "string",
            "location": "string"
        }
    ]
}
```

## Development Guidelines

### Code Style
- Frontend: ESLint + Prettier configuration
- Backend: Black formatter + isort
- Follow React best practices and hooks guidelines

### Testing
```bash
# Frontend tests
pnpm test

# Backend tests
python -m pytest
```

### Adding New Features
1. Create feature branch from main
2. Implement changes
3. Add tests
4. Submit pull request

## Deployment

### Frontend Deployment
```bash
# Build production assets
pnpm run build

# Preview production build
pnpm run preview
```

### Backend Deployment
Using Docker:
```bash
# Build container
docker build -t sports-viewing-backend .

# Run container
docker run -p 8000:8000 sports-viewing-backend
```

## License

MIT License

Copyright (c) 2025

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
