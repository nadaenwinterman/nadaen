from fastapi import APIRouter, UploadFile, File
from app.services.resume import upload_resume, list_resumes

router = APIRouter()

@router.post("/upload")
async def upload(file: UploadFile = File(...)):
    file_data = {
        "filename": file.filename,
        "content_type": file.content_type,
        "content": await file.read()
    }
    return await upload_resume(file_data)

@router.get("/")
async def get_uploaded(user_id: int):
    return await list_resumes(str(user_id))
