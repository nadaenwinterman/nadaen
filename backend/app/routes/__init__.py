# app/routes/__init__.py

from fastapi import FastAPI
from app.routes import auth, jobs, resume, dashboard
from app.services.job.routes import job_routes

def include_all_routers(app: FastAPI):
    app.include_router(auth.router, prefix="/api/auth", tags=["Auth"])
    app.include_router(jobs.router, prefix="/api/jobs", tags=["Jobs"])
    app.include_router(resume.router, prefix="/api/resume", tags=["Resume"])
    app.include_router(dashboard.router, prefix="/api/dashboard", tags=["Dashboard"])
    app.include_router(job_routes.router, prefix="/api/jobs", tags=["jobs"])
