# Sports Viewing Backend API

Backend API server for the sports viewing application that provides game schedules and streaming rights based on user location.

## Features

- ZIP code lookup for local team assignments
- Game schedules with filtering by league, team, and date
- Streaming rights lookup with blackout information
- Real-time data integration with ESPN and league-specific sources

## Tech Stack

- FastAPI
- SQLAlchemy
- Pydantic
- Pandas
- Docker

## Setup

### Using Docker

1. Build and run using Docker Compose:
```bash
docker-compose up --build
```

### Manual Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
# or
venv\Scripts\activate  # Windows
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Initialize the database:
```bash
python init_data.py
```

4. Run the server:
```bash
uvicorn main:app --reload
```

## API Documentation

After starting the server, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

### Core Endpoints

#### Location Services
- `POST /api/location/zip-lookup`
  - Input: ZIP code
  - Returns: DMA information and local teams

#### Schedule Services
- `GET /api/schedule/games`
  - Parameters: league, team_id, start_date, end_date
  - Returns: List of games matching criteria

#### Rights Services
- `GET /api/rights/streaming-rights/{game_id}`
  - Parameters: zip_code
  - Returns: Available viewing options and blackout information

## Development

### Project Structure
```
backend/
├── api/
│   ├── location_api.py
│   ├── schedule_api.py
│   └── rights_api.py
├── models/
│   └── database.py
├── schemas.py
├── init_data.py
├── main.py
├── requirements.txt
├── Dockerfile
└── docker-compose.yml
```

### Data Sources

The application integrates with:
- ZIP to DMA mapping files
- Team assignment data
- ESPN game schedules
- League-specific viewing rights

## Testing

Run tests using pytest:
```bash
python -m pytest
```

## Deployment

1. Update CORS settings in main.py with production domains
2. Configure environment variables
3. Build and deploy Docker container

## License

MIT
