from beanie import Document
from pydantic import Field
from typing import Optional, List
from datetime import datetime

class Experience(Document):
    company: str
    position: str
    start_date: datetime
    end_date: Optional[datetime] = None
    description: Optional[str] = None
    is_current: bool = False

class Education(Document):
    institution: str
    degree: str
    field_of_study: str
    start_date: datetime
    end_date: Optional[datetime] = None
    gpa: Optional[str] = None
    is_current: bool = False

class Profile(Document):
    user_id: str
    bio: Optional[str] = None
    phone: Optional[str] = None
    location: Optional[str] = None
    website: Optional[str] = None
    linkedin: Optional[str] = None
    github: Optional[str] = None
    skills: Optional[List[str]] = []
    experience: Optional[List[Experience]] = []
    education: Optional[List[Education]] = []
    resume_url: Optional[str] = None
    profile_picture_url: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Settings:
        name = "profiles"

    model_config = {
        "json_schema_extra": {
            "example": {
                "user_id": "user_123",
                "bio": "Experienced software developer...",
                "phone": "+1234567890",
                "location": "San Francisco, CA",
                "skills": ["Python", "React", "MongoDB"]
            }
        }
    }