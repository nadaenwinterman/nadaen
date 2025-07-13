from beanie import Document
from pydantic import EmailStr, Field
from typing import Optional
from datetime import datetime


class User(Document):
    email: EmailStr
    hashed_password: str
    full_name: Optional[str] = None
    role: str = Field(default="candidate", description="candidate or employer")
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Settings:
        name = "users"  # MongoDB collection name

    model_config = {
        "json_schema_extra": {
            "example": {
                "email": "john@example.com",
                "hashed_password": "hashedpassword123",
                "full_name": "John Doe",
                "role": "candidate",
            }
        }
    }
