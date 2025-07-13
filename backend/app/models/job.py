from pydantic import BaseModel, Field
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

class JobCreate(BaseModel):
    title: str
    company: str
    location: str
    salary: str
    description: str
    requirements: Optional[str] = None
    employment_type: EmploymentType = EmploymentType.FULL_TIME
    remote: bool = False
    skills_required: Optional[List[str]] = []
    benefits: Optional[str] = None
    application_deadline: Optional[datetime] = None

class JobUpdate(BaseModel):
    title: Optional[str] = None
    company: Optional[str] = None
    location: Optional[str] = None
    salary: Optional[str] = None
    description: Optional[str] = None
    requirements: Optional[str] = None
    employment_type: Optional[EmploymentType] = None
    remote: Optional[bool] = None
    status: Optional[JobStatus] = None
    skills_required: Optional[List[str]] = None
    benefits: Optional[str] = None
    application_deadline: Optional[datetime] = None

class JobResponse(BaseModel):
    id: str
    title: str
    company: str
    location: str
    salary: str
    description: str
    requirements: Optional[str] = None
    employment_type: EmploymentType
    remote: bool
    status: JobStatus
    employer_id: str
    skills_required: Optional[List[str]] = []
    benefits: Optional[str] = None
    application_deadline: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime

class JobSearchFilter(BaseModel):
    title: Optional[str] = None
    company: Optional[str] = None
    location: Optional[str] = None
    employment_type: Optional[EmploymentType] = None
    remote: Optional[bool] = None
    skills: Optional[List[str]] = None
    salary_min: Optional[int] = None
    salary_max: Optional[int] = None