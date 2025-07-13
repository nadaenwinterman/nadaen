from beanie import Document
from pydantic import Field
from typing import Optional, List
from datetime import datetime
from enum import Enum

class EmploymentType(str, Enum):
    FULL_TIME = "Full-time"
    PART_TIME = "Part-time"
    CONTRACT = "Contract"
    FREELANCE = "Freelance"
    INTERNSHIP = "Internship"

class JobStatus(str, Enum):
    ACTIVE = "active"
    CLOSED = "closed"
    DRAFT = "draft"

class Job(Document):
    title: str
    company: str
    location: str
    salary: str
    description: str
    requirements: Optional[str] = None
    employment_type: EmploymentType = EmploymentType.FULL_TIME
    remote: bool = False
    status: JobStatus = JobStatus.ACTIVE
    employer_id: str  # ID of the user who posted the job
    skills_required: Optional[List[str]] = []
    benefits: Optional[str] = None
    application_deadline: Optional[datetime] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Settings:
        name = "jobs"

    model_config = {
        "json_schema_extra": {
            "example": {
                "title": "Senior Frontend Developer",
                "company": "TechCorp",
                "location": "San Francisco, CA",
                "salary": "$120,000 - $150,000",
                "description": "We are seeking a skilled frontend developer...",
                "requirements": "5+ years React experience",
                "employment_type": "Full-time",
                "remote": True,
                "skills_required": ["React", "TypeScript", "CSS"],
                "benefits": "Health insurance, 401k, flexible hours"
            }
        }
    }
