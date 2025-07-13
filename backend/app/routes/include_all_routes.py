# app/routes/include_all_routers.py
from fastapi import FastAPI
from app.routes import auth, dashboard, jobs, resume, sample_data

def include_all_routers(app: FastAPI):
    app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
    app.include_router(dashboard.router, prefix="/api/dashboard", tags=["dashboard"])
    app.include_router(jobs.router, prefix="/api/jobs", tags=["jobs"])
    app.include_router(resume.router, prefix="/api/resume", tags=["resume"])
    app.include_router(sample_data.router, prefix="/api/sample", tags=["sample-data"])