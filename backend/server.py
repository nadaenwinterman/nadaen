"""
Main FastAPI server entry point for the Job Board Platform
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import uvicorn
import os
from dotenv import load_dotenv

# Import the main app
from app.main import app as main_app

# Load environment variables
load_dotenv()

# Create the FastAPI app
app = main_app

# Health check endpoint
@app.get("/health")
async def health_check():
    return {"status": "healthy", "message": "Job Board API is running!"}

# Root endpoint
@app.get("/")
async def root():
    return {
        "message": "Welcome to Job Board API",
        "version": "1.0.0",
        "docs": "/docs",
        "health": "/health"
    }

if __name__ == "__main__":
    # Run the server
    uvicorn.run(
        "server:app",
        host="0.0.0.0",
        port=8001,
        reload=True,
        log_level="info"
    )