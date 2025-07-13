# app/services/dashboard/services/candidate_widgets.py

async def get_candidate_summary():
    return {
        "applications_submitted": 12,
        "interviews_scheduled": 3,
        "saved_jobs": 5,
        "recommended_jobs": [
            {"title": "Frontend Developer", "company": "Meta", "location": "Remote"},
            {"title": "Data Scientist", "company": "Google", "location": "Bangalore"},
        ]
    }
