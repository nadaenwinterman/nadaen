from typing import List
from app.models.jobs import JobCreate, JobResponse
from app.services.job.models.job import Job
from datetime import datetime
from fastapi import HTTPException

async def list_jobs() -> List[JobResponse]:
    """Get all active jobs"""
    jobs = await Job.find(Job.status == "active").to_list()
    return [
        JobResponse(
            id=str(job.id),
            title=job.title,
            company=job.company,
            location=job.location,
            salary=job.salary,
            description=job.description,
            requirements=job.requirements,
            employment_type=job.employment_type,
            remote=job.remote,
            status=job.status,
            employer_id=job.employer_id,
            skills_required=job.skills_required,
            benefits=job.benefits,
            application_deadline=job.application_deadline,
            created_at=job.created_at,
            updated_at=job.updated_at
        ) for job in jobs
    ]

async def get_job(job_id: str) -> JobResponse:
    """Get a specific job by ID"""
    job = await Job.get(job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    
    return JobResponse(
        id=str(job.id),
        title=job.title,
        company=job.company,
        location=job.location,
        salary=job.salary,
        description=job.description,
        requirements=job.requirements,
        employment_type=job.employment_type,
        remote=job.remote,
        status=job.status,
        employer_id=job.employer_id,
        skills_required=job.skills_required,
        benefits=job.benefits,
        application_deadline=job.application_deadline,
        created_at=job.created_at,
        updated_at=job.updated_at
    )

async def create_job(job_create: JobCreate, employer_id: str) -> JobResponse:
    """Create a new job"""
    job = Job(
        title=job_create.title,
        company=job_create.company,
        location=job_create.location,
        salary=job_create.salary,
        description=job_create.description,
        requirements=job_create.requirements,
        employment_type=job_create.employment_type,
        remote=job_create.remote,
        employer_id=employer_id,
        skills_required=job_create.skills_required or [],
        benefits=job_create.benefits,
        application_deadline=job_create.application_deadline
    )
    
    await job.insert()
    
    return JobResponse(
        id=str(job.id),
        title=job.title,
        company=job.company,
        location=job.location,
        salary=job.salary,
        description=job.description,
        requirements=job.requirements,
        employment_type=job.employment_type,
        remote=job.remote,
        status=job.status,
        employer_id=job.employer_id,
        skills_required=job.skills_required,
        benefits=job.benefits,
        application_deadline=job.application_deadline,
        created_at=job.created_at,
        updated_at=job.updated_at
    )

async def get_employer_jobs(employer_id: str) -> List[JobResponse]:
    """Get all jobs posted by a specific employer"""
    jobs = await Job.find(Job.employer_id == employer_id).to_list()
    return [
        JobResponse(
            id=str(job.id),
            title=job.title,
            company=job.company,
            location=job.location,
            salary=job.salary,
            description=job.description,
            requirements=job.requirements,
            employment_type=job.employment_type,
            remote=job.remote,
            status=job.status,
            employer_id=job.employer_id,
            skills_required=job.skills_required,
            benefits=job.benefits,
            application_deadline=job.application_deadline,
            created_at=job.created_at,
            updated_at=job.updated_at
        ) for job in jobs
    ]

async def apply_to_job(job_id: str, application_data: dict) -> dict:
    """Apply to a specific job"""
    job = await Job.get(job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    
    # In a real implementation, you'd save the application to database
    # For now, just return a success response
    return {
        "message": "Application submitted successfully",
        "job_id": job_id,
        "application_id": f"app_{job_id}_{datetime.now().timestamp()}"
    }