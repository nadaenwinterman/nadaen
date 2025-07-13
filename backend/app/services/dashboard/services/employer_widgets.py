# app/services/dashboard/services/employer_widgets.py

async def get_employer_summary():
    return {
        "total_job_posts": 8,
        "applications_received": 42,
        "recent_applications": [
            {"candidate": "John Doe", "job_title": "UX Designer", "status": "Pending"},
            {"candidate": "Ayesha Khan", "job_title": "Backend Dev", "status": "Interview Scheduled"},
        ],
        "analytics": {
            "job_views": 240,
            "profile_visits": 98
        }
    }
