# app/services/application/routes/application_routes.py

from fastapi import APIRouter, Depends, HTTPException, status
from app.services.application.services import apply_handler, status_updater
from app.services.application.db import application_crud
from app.services.auth_service.services.jwt_handler import get_current_user
from pydantic import BaseModel
from typing import List
from fastapi import Depends
router = APIRouter()

# Pydantic models
class ApplyForm(BaseModel):
    job_id: str
    resume_url: str
    cover_letter: str

class UpdateStatusForm(BaseModel):
    application_id: str
    new_status: str  # e.g., "interview", "rejected", "hired"



# POST /api/applications/apply
@router.post("/apply", status_code=status.HTTP_201_CREATED)
async def apply_to_job(form: ApplyForm, user=Depends(get_current_user)):
    if not user or user["role"] != "candidate":
        raise HTTPException(status_code=403, detail="Only candidates can apply.")
    return await apply_handler.submit_application(user["id"], form)


# GET /api/applications/candidate
@router.get("/candidate", response_model=List[dict])
async def get_candidate_applications(user=Depends(get_current_user)):
    if not user or user["role"] != "candidate":
        raise HTTPException(status_code=403, detail="Unauthorized")
    return await application_crud.get_applications_by_candidate(user["id"])


# GET /api/applications/employer
@router.get("/employer", response_model=List[dict])
async def get_employer_applications(user=Depends(get_current_user)):
    if not user or user["role"] != "employer":
        raise HTTPException(status_code=403, detail="Unauthorized")
    return await application_crud.get_applications_by_employer(user["id"])


# PUT /api/applications/update-status
@router.put("/update-status")
async def update_application_status(data: UpdateStatusForm, user=Depends(get_current_user)):
    if not user or user["role"] != "employer":
        raise HTTPException(status_code=403, detail="Only employers can update application status.")
    return await status_updater.update_status(user["id"], data.application_id, data.new_status)
