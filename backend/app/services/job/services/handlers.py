# app/services/job/services/handlers.py

from typing import List
from fastapi import HTTPException
import uuid

from app.models.jobs.JobCreate import JobCreate
from app.models.jobs.JobResponse import JobResponse

JOB_DB: List[JobResponse] = []

async def list_jobs() -> List[JobResponse]:
    return JOB_DB

async def get_job(job_id: str) -> JobResponse:
    for job in JOB_DB:
        if job.id == job_id:
            return job
    raise HTTPException(status_code=404, detail="Job not found")

async def create_job(payload: JobCreate) -> JobResponse:
    job = JobResponse(id=str(uuid.uuid4()), **payload.dict())
    JOB_DB.append(job)
    return job

async def apply_to_job(job_id: str, application_data: dict):
    job = await get_job(job_id)
    return {"job_id": job_id, "status": "Application submitted", "data": application_data}
