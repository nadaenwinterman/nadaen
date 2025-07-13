#backend/app/routes/auth.py

from fastapi import APIRouter, Depends, HTTPException
from app.services.auth_service.services.auth_handlers import signup_user, login_user
from app.services.auth_service.services.jwt_handler import get_current_user
from app.models.auth import UserSignup, UserLogin, UserResponse


router = APIRouter()

@router.post("/signup", response_model=UserResponse)
async def signup(payload: UserSignup):
    return await signup_user(payload)

@router.post("/login", response_model=UserResponse)
async def login(payload: UserLogin):
    return await login_user(payload)

@router.get("/me", response_model=UserResponse)
async def me(user=Depends(get_current_user)):
    return user

@router.post("/logout")
async def logout():
    return {"detail": "Logged out"}
