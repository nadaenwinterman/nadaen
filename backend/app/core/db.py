import os
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie

from app.services.auth_service.models.user import User
from app.services.application.models.application import Application
from app.services.job.models.job import Job
from app.services.resume.models.resume import Resume
from app.services.profile.models.profile import Profile

# Load .env variables
load_dotenv()

# ✅ Use the correct env key
MONGODB_URI = os.getenv("MONGODB_URL")  # Make sure your .env uses MONGODB_URL, not MONGODB_URI

# ✅ Connect to MongoDB
client = AsyncIOMotorClient(MONGODB_URI)
db = client["jobboard"]  # Will use the db name you added in URL, e.g. /jobboard

# ✅ Init Beanie with all models
async def init_db():
    await init_beanie(
        database=db,
        document_models=[
            User,
            Application,
            Job,
            Resume,
            Profile,
        ],
    )
