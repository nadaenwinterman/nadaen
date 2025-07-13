# app/services/auth_service/services/auth_utils.py

from passlib.context import CryptContext
from app.services.auth_service.models.user import User
from app.core.db import db
from beanie import PydanticObjectId
from fastapi import HTTPException
from datetime import datetime

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)
