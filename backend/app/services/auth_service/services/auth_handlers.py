# app/services/auth_service/services/auth_handlers.py

from app.services.auth_service.services.auth_utils import hash_password, verify_password
from app.services.auth_service.services.jwt_handler import create_access_token
from app.services.auth_service.models.user import User
from app.models.auth import UserSignup, UserLogin
from fastapi import HTTPException


async def signup_user(payload: UserSignup):
    existing_user = await User.find_one(User.email == payload.email)
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    user = User(
        email=payload.email,
        hashed_password=hash_password(payload.password),
        role=payload.role,
        full_name=payload.full_name
    )
    await user.insert()
    
    access_token = create_access_token(data={"sub": str(user.id)})
    
    user_dict = user.dict()
    user_dict["id"] = str(user.id)  # Convert ObjectId to string
    user_dict.pop("hashed_password", None)  # Remove password from response
    
    return {"access_token": access_token, **user_dict}


async def login_user(payload: UserLogin):
    user = await User.find_one(User.email == payload.email)
    if not user or not verify_password(payload.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token = create_access_token(data={"sub": str(user.id)})
    
    user_dict = user.dict()
    user_dict["id"] = str(user.id)  # Convert ObjectId to string
    user_dict.pop("hashed_password", None)  # Remove password from response
    
    return {"access_token": access_token, **user_dict}
