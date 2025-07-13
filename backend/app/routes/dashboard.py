# backend/app/routes/dashboard.py

from fastapi import APIRouter
from app.services.dashboard.services.candidate_widgets import get_candidate_summary
from app.services.dashboard.services.employer_widgets import get_employer_summary

router = APIRouter()

@router.get("/candidate")
async def stats_candidate():
    return await get_candidate_summary()

@router.get("/employer")
async def stats_employer():
    return await get_employer_summary()
@router.get("/employer/recent-applications")
async def recent_applications():
    return {
        "recent_applications": [
            {"candidate": "John Doe", "job_title": "UX Designer", "status": "Pending"},
            {"candidate": "Ayesha Khan", "job_title": "Backend Dev", "status": "Interview Scheduled"},
        ]
    }