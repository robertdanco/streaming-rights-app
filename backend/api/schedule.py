from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel
from datetime import date
from typing import List, Optional
import sys
from pathlib import Path

# Import ESPN scraper
sys.path.append(str(Path('/data/chats/5qtibd/workspace/uploads')))
from espn_game_scraper import get_game_details
from espn_bulk_scraper import get_league_schedule

router = APIRouter()

class Game(BaseModel):
    game_id: str
    league: str
    home_team: str
    away_team: str
    date: date
    time: str
    venue: str
    status: str

@router.get('/games', response_model=List[Game])
async def get_games(
    league: str = Query(..., description='League code (MLB/NBA/NHL)'),
    team_id: Optional[str] = Query(None, description='Filter by team ID'),
    start_date: Optional[date] = Query(None, description='Start date for games'),
    end_date: Optional[date] = Query(None, description='End date for games')
):
    try:
        # Get schedule from ESPN
        games = await get_league_schedule(league)
        
        # Apply filters
        if team_id:
            games = [g for g in games if team_id in (g.get('home_team_id'), g.get('away_team_id'))]
        if start_date:
            games = [g for g in games if g.get('date') >= start_date]
        if end_date:
            games = [g for g in games if g.get('date') <= end_date]
            
        return games
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get('/games/{game_id}', response_model=Game)
async def get_game(game_id: str):
    try:
        game_details = await get_game_details(game_id)
        if not game_details:
            raise HTTPException(status_code=404, detail=f'Game {game_id} not found')
        return game_details
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))