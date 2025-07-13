# app/services/application/services/apply_handler.py

from app.services.application.db import application_crud
from datetime import datetime

async def submit_application(user_id: str, form):
    application_data = {
        "candidate_id": user_id,
        "job_id": form.job_id,
        "resume_url": form.resume_url,
        "cover_letter": form.cover_letter,
        "status": "pending",
        "applied_at": datetime.utcnow(),
    }

    return await application_crud.create_application(application_data)
