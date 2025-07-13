from fastapi import APIRouter

router = APIRouter()

@router.get("/jobs")
async def get_job_analytics():
    """Get job analytics data"""
    return {
        "total_jobs": 150,
        "active_jobs": 120,
        "jobs_this_month": 25,
        "top_categories": [
            {"category": "Technology", "count": 45},
            {"category": "Finance", "count": 32},
            {"category": "Healthcare", "count": 28},
            {"category": "Marketing", "count": 22},
            {"category": "Education", "count": 18}
        ],
        "employment_types": [
            {"type": "Full-time", "count": 85},
            {"type": "Part-time", "count": 25},
            {"type": "Contract", "count": 30},
            {"type": "Freelance", "count": 10}
        ]
    }

@router.get("/applications")
async def get_application_analytics():
    """Get application analytics data"""
    return {
        "total_applications": 1250,
        "applications_this_month": 180,
        "conversion_rate": 12.5,
        "average_time_to_hire": 18,
        "status_breakdown": [
            {"status": "Submitted", "count": 450},
            {"status": "Under Review", "count": 320},
            {"status": "Interview Scheduled", "count": 180},
            {"status": "Interviewed", "count": 120},
            {"status": "Accepted", "count": 80},
            {"status": "Rejected", "count": 100}
        ]
    }

@router.get("/users")
async def get_user_analytics():
    """Get user analytics data"""
    return {
        "total_users": 2500,
        "active_users": 1800,
        "new_users_this_month": 250,
        "user_types": [
            {"type": "Candidates", "count": 2000},
            {"type": "Employers", "count": 500}
        ],
        "user_activity": [
            {"metric": "Daily Active Users", "value": 650},
            {"metric": "Weekly Active Users", "value": 1200},
            {"metric": "Monthly Active Users", "value": 1800}
        ]
    }