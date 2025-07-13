# app/services/application/models/application.py

from beanie import Document
from pydantic import Field
from datetime import datetime, timezone

class Application(Document):
    candidate_id: str
    job_id: str
    resume_url: str
    cover_letter: str
    status: str = Field(default="pending")
    employer_id: str
    applied_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    class Settings:
        name = "applications"  # MongoDB collection name
