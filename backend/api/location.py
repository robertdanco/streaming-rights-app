from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import pandas as pd
from pathlib import Path

router = APIRouter()

class ZipCodeRequest(BaseModel):
    zip_code: str

class TeamInfo(BaseModel):
    team_id: str
    name: str
    league: str

class ZipCodeResponse(BaseModel):
    zip_code: str
    dma: str
    teams: list[TeamInfo]

ZIP_DATA_PATH = Path('/data/chats/5qtibd/workspace/uploads/zip_dma_team_mapping_20250129_162719_with_imputed_values.csv')

@router.post('/zip-lookup', response_model=ZipCodeResponse)
async def lookup_zip_code(request: ZipCodeRequest):
    try:
        # Load and process ZIP code data
        df = pd.read_csv(ZIP_DATA_PATH)
        zip_info = df[df['zip_code'] == request.zip_code].iloc[0]
        
        teams = []
        for league in ['MLB', 'NBA', 'NHL']:
            team_id = zip_info.get(f'{league}_team_id')
            if pd.notna(team_id):
                teams.append(TeamInfo(
                    team_id=str(team_id),
                    name=zip_info.get(f'{league}_team_name', ''),
                    league=league
                ))
        
        return ZipCodeResponse(
            zip_code=request.zip_code,
            dma=zip_info['dma'],
            teams=teams
        )
    except IndexError:
        raise HTTPException(status_code=404, detail=f'ZIP code {request.zip_code} not found')
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))