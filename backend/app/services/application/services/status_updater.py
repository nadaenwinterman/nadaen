# app/services/application/services/status_updater.py

from app.services.application.models.application import Application
from beanie import PydanticObjectId
from datetime import datetime

async def update_status(employer_id: str, application_id: str, new_status: str):
    app = await Application.get(PydanticObjectId(application_id))

    if not app:
        raise ValueError("Application not found.")

    # Optional: enforce only the employer who owns the job can update
    if app.employer_id != employer_id:
        raise PermissionError("Unauthorized to update this application.")

    app.status = new_status
    app.updated_at = datetime.utcnow()

    await app.save()
    return {"message": "Application status updated.", "application_id": application_id}
