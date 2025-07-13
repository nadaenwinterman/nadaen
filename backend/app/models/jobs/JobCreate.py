from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class JobCreate(BaseModel):
    title: str
    company: str
    location: str
    salary: str
    description: str
    requirements: Optional[str] = None
    employment_type: Optional[str] = "Full-time"
    remote: Optional[bool] = False
    skills_required: Optional[List[str]] = []
    benefits: Optional[str] = None
    application_deadline: Optional[datetime] = None