from fastapi import APIRouter

router = APIRouter()

# Example route
@router.get("/auth/test")
async def test_auth():
    return {"message": "Auth service is active"}
