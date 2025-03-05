from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pathlib import Path
import sys

# Add the scripts directory to Python path
SCRIPTS_DIR = Path('/data/chats/5qtibd/workspace/uploads')
sys.path.append(str(SCRIPTS_DIR))

# Import data processing scripts
from zip_mapping_join import process_zip_mapping
from schedule_join import process_schedule
from all_local_rights_scraper import get_all_viewing_rights
from espn_game_scraper import get_game_details

app = FastAPI(
    title="Sports Viewing API",
    description="API for accessing sports games schedules and viewing rights based on location",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update with specific origins in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Exception handler for custom errors
@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail},
    )

# Health check endpoint
@app.get("/health")
async def health_check():
    return {"status": "healthy"}

# Import and include routers
from api.location import router as location_router
from api.schedule import router as schedule_router
from api.rights import router as rights_router
from api.teams import router as teams_router

app.include_router(location_router, prefix="/api", tags=["location"])
app.include_router(schedule_router, prefix="/api", tags=["schedule"])
app.include_router(rights_router, prefix="/api", tags=["rights"])
app.include_router(teams_router, prefix="/api", tags=["teams"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)