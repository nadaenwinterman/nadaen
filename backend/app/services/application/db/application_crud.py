# app/services/application/db/application_crud.py

from app.services.application.models.application import Application
from beanie import PydanticObjectId

async def get_applications_by_candidate(candidate_id: str):
    return await Application.find(Application.candidate_id == candidate_id).to_list()

async def get_applications_by_employer(employer_id: str):
    return await Application.find(Application.employer_id == employer_id).to_list()
async def create_application(application_data: dict):
    application = Application(**application_data)
    await application.insert()
    return application
