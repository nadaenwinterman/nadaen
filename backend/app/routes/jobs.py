# /backend/app/routes/jobs.py
from fastapi import APIRouter, Depends, HTTPException
from app.models.jobs import JobCreate, JobResponse
from app.services.auth_service.services.jwt_handler import get_current_user

from app.services.job import list_jobs, get_job, create_job, apply_to_job
from app.services.job.routes import job_routes as job_service_router

router = APIRouter()

# Mount the actual job service router
router.include_router(job_service_router.router, prefix="/sample", tags=["Jobs"])
@router.get("/", response_model=list[JobResponse])
async def get_jobs():
    return await list_jobs()

@router.get("/{job_id}", response_model=JobResponse)
async def get_single_job(job_id: str):
    return await get_job(job_id)

@router.post("/", response_model=JobResponse)
async def post_job(payload: JobCreate, current_user=Depends(get_current_user)):
    # Check if user is an employer
    if current_user.get("role") != "employer":
        raise HTTPException(status_code=403, detail="Only employers can post jobs")
    
    return await create_job(payload, current_user["id"])

@router.post("/{job_id}/apply")
async def apply_job(job_id: str, application_data: dict):
    return await apply_to_job(job_id, application_data)
# app/routes/jobs.py

# from fastapi import APIRouter
# from app.services.job.routes import job_routes as job_service_router  # ✅ real routes

# router = APIRouter()

# # Mount the actual job service router
# router.include_router(job_service_router.router, prefix="/sample", tags=["Jobs"])
