from beanie import Document
from pydantic import Field
from typing import Optional
from datetime import datetime

class Resume(Document):
    user_id: str
    filename: str
    file_url: str
    file_size: int
    content_type: str
    is_primary: bool = False
    uploaded_at: datetime = Field(default_factory=datetime.utcnow)

    class Settings:
        name = "resumes"

    model_config = {
        "json_schema_extra": {
            "example": {
                "user_id": "user_123",
                "filename": "john_doe_resume.pdf",
                "file_url": "/uploads/resumes/john_doe_resume.pdf",
                "file_size": 1024000,
                "content_type": "application/pdf"
            }
        }
    }