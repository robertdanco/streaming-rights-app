from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel
from typing import List
import sys
from pathlib import Path

# Import rights scrapers
sys.path.append(str(Path('/data/chats/5qtibd/workspace/uploads')))
from all_local_rights_scraper import get_all_viewing_rights
from nhl_rights_scraper import get_nhl_rights
from nba_rights_scraper import get_nba_rights
from mlb_rights_scraper import get_mlb_rights

router = APIRouter()

class StreamingRights(BaseModel):
    game_id: str
    provider: str
    url: str
    blackout: bool
    requires_auth: bool
    notes: str = ''

class StreamingRightsResponse(BaseModel):
    game_id: str
    zip_code: str
    available_streams: List[StreamingRights]
    blackout_info: str = ''

@router.get('/streaming-rights/{game_id}', response_model=StreamingRightsResponse)
async def get_streaming_rights(
    game_id: str,
    zip_code: str = Query(..., description='ZIP code for local blackout check')
):
    try:
        # Get viewing rights based on league
        league = game_id.split('_')[0]  # Assuming game_id format: {league}_{id}
        
        if league == 'MLB':
            rights = await get_mlb_rights(game_id, zip_code)
        elif league == 'NBA':
            rights = await get_nba_rights(game_id, zip_code)
        elif league == 'NHL':
            rights = await get_nhl_rights(game_id, zip_code)
        else:
            raise HTTPException(status_code=400, detail=f'Invalid league: {league}')
            
        return StreamingRightsResponse(
            game_id=game_id,
            zip_code=zip_code,
            available_streams=rights['streams'],
            blackout_info=rights.get('blackout_info', '')
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))