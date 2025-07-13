from fastapi import FastAPI
from app.core.db import init_db
from fastapi.middleware.cors import CORSMiddleware
from app.routes import include_all_routers
from contextlib import asynccontextmanager
import uvicorn

# ✅ Lifespan function to initialize DB
@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield
    # Optional: cleanup logic can go here

# ✅ Create the FastAPI app with lifespan
app = FastAPI(lifespan=lifespan)

# ✅ CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Register all routers
include_all_routers(app)

# ✅ Uvicorn entry point
if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8001, reload=True)
