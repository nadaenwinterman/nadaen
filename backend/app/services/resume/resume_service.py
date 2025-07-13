from typing import List, Dict, Any
from fastapi import HTTPException
from app.services.resume.models.resume import Resume
import os
import uuid
from datetime import datetime

async def upload_resume(file_data: Dict[str, Any], user_id: str = None) -> Dict[str, Any]:
    """Upload a resume file"""
    try:
        # Create upload directory if it doesn't exist
        upload_dir = "uploads/resumes"
        os.makedirs(upload_dir, exist_ok=True)
        
        # Generate unique filename
        file_extension = os.path.splitext(file_data["filename"])[1]
        unique_filename = f"{uuid.uuid4()}{file_extension}"
        file_path = os.path.join(upload_dir, unique_filename)
        
        # Save file (in production, this would be saved to cloud storage)
        with open(file_path, "wb") as f:
            f.write(file_data["content"])
        
        # Create resume record
        resume = Resume(
            user_id=user_id or "anonymous",
            filename=file_data["filename"],
            file_url=f"/{file_path}",
            file_size=len(file_data["content"]),
            content_type=file_data["content_type"]
        )
        
        await resume.insert()
        
        return {
            "id": str(resume.id),
            "filename": resume.filename,
            "file_url": resume.file_url,
            "uploaded_at": resume.uploaded_at,
            "message": "Resume uploaded successfully"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to upload resume: {str(e)}")

async def list_resumes(user_id: str) -> List[Dict[str, Any]]:
    """List all resumes for a user"""
    resumes = await Resume.find(Resume.user_id == user_id).to_list()
    
    return [
        {
            "id": str(resume.id),
            "filename": resume.filename,
            "file_url": resume.file_url,
            "file_size": resume.file_size,
            "content_type": resume.content_type,
            "is_primary": resume.is_primary,
            "uploaded_at": resume.uploaded_at
        } for resume in resumes
    ]

async def get_resume(resume_id: str) -> Dict[str, Any]:
    """Get a specific resume"""
    resume = await Resume.get(resume_id)
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")
    
    return {
        "id": str(resume.id),
        "filename": resume.filename,
        "file_url": resume.file_url,
        "file_size": resume.file_size,
        "content_type": resume.content_type,
        "is_primary": resume.is_primary,
        "uploaded_at": resume.uploaded_at
    }

async def delete_resume(resume_id: str, user_id: str) -> Dict[str, str]:
    """Delete a resume"""
    resume = await Resume.get(resume_id)
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")
    
    if resume.user_id != user_id:
        raise HTTPException(status_code=403, detail="Not authorized to delete this resume")
    
    # Delete file from storage
    try:
        if os.path.exists(resume.file_url.lstrip('/')):
            os.remove(resume.file_url.lstrip('/'))
    except Exception:
        pass  # File might already be deleted
    
    await resume.delete()
    
    return {"message": "Resume deleted successfully"}