# app/services/resume/handlers.py

async def upload_resume(file_data: dict):
    # mock logic for now
    return {"status": "uploaded", "file_data": file_data}

async def list_resumes(user_id: str):
    # mock response
    return [
        {"filename": "resume1.pdf", "uploaded_at": "2025-07-11"},
        {"filename": "resume2.pdf", "uploaded_at": "2025-07-10"}
    ]