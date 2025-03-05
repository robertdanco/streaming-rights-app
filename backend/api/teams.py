from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
import pandas as pd
from pathlib import Path

router = APIRouter()

class Team(BaseModel):
    team_id: str
    name: str
    league: str
    dma: str

ZIP_DATA_PATH = Path('/data/chats/5qtibd/workspace/uploads/zip_dma_team_mapping_20250129_162719_with_imputed_values.csv')

@router.get('/teams', response_model=List[Team])
async def get_teams(league: str = None):
    try:
        df = pd.read_csv(ZIP_DATA_PATH)
        teams = []
        
        # Process teams for each league
        leagues = [league] if league else ['MLB', 'NBA', 'NHL']
        
        for lg in leagues:
            team_ids = df[f'{lg}_team_id'].unique()
            for team_id in team_ids:
                if pd.notna(team_id):
                    team_data = df[df[f'{lg}_team_id'] == team_id].iloc[0]
                    teams.append(Team(
                        team_id=str(team_id),
                        name=team_data[f'{lg}_team_name'],
                        league=lg,
                        dma=team_data['dma']
                    ))
        
        return teams
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get('/teams/{team_id}', response_model=Team)
async def get_team(team_id: str):
    try:
        df = pd.read_csv(ZIP_DATA_PATH)
        
        # Search for team in all leagues
        for league in ['MLB', 'NBA', 'NHL']:
            team_data = df[df[f'{league}_team_id'] == team_id]
            if not team_data.empty:
                data = team_data.iloc[0]
                return Team(
                    team_id=team_id,
                    name=data[f'{league}_team_name'],
                    league=league,
                    dma=data['dma']
                )
                
        raise HTTPException(status_code=404, detail=f'Team {team_id} not found')
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))