from fastapi import APIRouter
from app.services.job.models.job import Job, EmploymentType, JobStatus
from app.services.auth_service.models.user import User
from app.services.auth_service.services.auth_utils import hash_password
from datetime import datetime, timedelta
import random

router = APIRouter()

@router.post("/create-sample-data")
async def create_sample_data():
    """Create sample data for testing"""
    
    # Create sample users
    sample_users = [
        {
            "email": "employer1@example.com",
            "full_name": "John Smith",
            "role": "employer",
            "password": "password123"
        },
        {
            "email": "employer2@example.com", 
            "full_name": "Sarah Johnson",
            "role": "employer",
            "password": "password123"
        },
        {
            "email": "candidate1@example.com",
            "full_name": "Alice Wilson",
            "role": "candidate", 
            "password": "password123"
        },
        {
            "email": "candidate2@example.com",
            "full_name": "Bob Davis",
            "role": "candidate",
            "password": "password123"
        }
    ]
    
    created_users = []
    for user_data in sample_users:
        existing = await User.find_one(User.email == user_data["email"])
        if not existing:
            user = User(
                email=user_data["email"],
                full_name=user_data["full_name"],
                role=user_data["role"],
                hashed_password=hash_password(user_data["password"])
            )
            await user.insert()
            created_users.append(str(user.id))
    
    # Get employers for job creation
    employers = await User.find(User.role == "employer").to_list()
    
    # Create sample jobs
    sample_jobs = [
        {
            "title": "Senior Frontend Developer",
            "company": "TechCorp Solutions",
            "location": "San Francisco, CA",
            "salary": "$120,000 - $150,000",
            "description": "We are seeking an experienced frontend developer to join our dynamic team. You'll work on cutting-edge web applications using React, TypeScript, and modern development tools.",
            "requirements": "5+ years React experience, TypeScript proficiency, knowledge of state management libraries",
            "employment_type": EmploymentType.FULL_TIME,
            "remote": True,
            "skills_required": ["React", "TypeScript", "JavaScript", "CSS", "HTML"],
            "benefits": "Health insurance, 401k matching, flexible work hours, remote work options"
        },
        {
            "title": "Backend Engineer",
            "company": "DataFlow Inc",
            "location": "New York, NY", 
            "salary": "$110,000 - $140,000",
            "description": "Join our backend team to build scalable APIs and microservices. Experience with Python, FastAPI, and cloud technologies required.",
            "requirements": "3+ years Python experience, FastAPI/Django knowledge, cloud platform experience",
            "employment_type": EmploymentType.FULL_TIME,
            "remote": False,
            "skills_required": ["Python", "FastAPI", "PostgreSQL", "AWS", "Docker"],
            "benefits": "Comprehensive healthcare, stock options, professional development budget"
        },
        {
            "title": "UX/UI Designer",
            "company": "Creative Studio", 
            "location": "Los Angeles, CA",
            "salary": "$85,000 - $110,000",
            "description": "Design beautiful and intuitive user experiences for web and mobile applications. Collaborate with product and engineering teams.",
            "requirements": "3+ years UX/UI design experience, proficiency in Figma/Sketch, portfolio required",
            "employment_type": EmploymentType.FULL_TIME,
            "remote": True,
            "skills_required": ["Figma", "Sketch", "Adobe Creative Suite", "Prototyping", "User Research"],
            "benefits": "Creative environment, latest design tools, flexible schedule"
        },
        {
            "title": "Full Stack Developer",
            "company": "Startup Innovations",
            "location": "Austin, TX",
            "salary": "$90,000 - $120,000", 
            "description": "Work on our full-stack web application using modern technologies. Great opportunity to grow with a fast-paced startup.",
            "requirements": "2+ years full-stack experience, React and Node.js knowledge",
            "employment_type": EmploymentType.FULL_TIME,
            "remote": True,
            "skills_required": ["React", "Node.js", "MongoDB", "Express.js", "JavaScript"],
            "benefits": "Equity package, unlimited PTO, modern office space"
        },
        {
            "title": "DevOps Engineer",
            "company": "CloudTech Systems",
            "location": "Seattle, WA",
            "salary": "$130,000 - $160,000",
            "description": "Manage and optimize our cloud infrastructure. Implement CI/CD pipelines and ensure system reliability.",
            "requirements": "4+ years DevOps experience, Kubernetes and AWS expertise, automation mindset",
            "employment_type": EmploymentType.FULL_TIME,
            "remote": False,
            "skills_required": ["Kubernetes", "AWS", "Docker", "Jenkins", "Terraform"],
            "benefits": "Top-tier compensation, learning opportunities, cutting-edge technology"
        },
        {
            "title": "Product Manager", 
            "company": "Innovation Labs",
            "location": "Boston, MA",
            "salary": "$115,000 - $145,000",
            "description": "Lead product strategy and roadmap for our SaaS platform. Work cross-functionally with engineering, design, and sales teams.",
            "requirements": "3+ years product management experience, technical background preferred, strong analytical skills",
            "employment_type": EmploymentType.FULL_TIME,
            "remote": True,
            "skills_required": ["Product Strategy", "Analytics", "Agile", "User Research", "SQL"],
            "benefits": "Stock options, professional development, collaborative culture"
        }
    ]
    
    created_jobs = []
    for i, job_data in enumerate(sample_jobs):
        employer = employers[i % len(employers)] if employers else None
        if employer:
            # Add some random variation to posting dates
            days_ago = random.randint(1, 30)
            created_date = datetime.utcnow() - timedelta(days=days_ago)
            
            job = Job(
                **job_data,
                employer_id=str(employer.id),
                created_at=created_date,
                updated_at=created_date
            )
            await job.insert()
            created_jobs.append(str(job.id))
    
    return {
        "message": "Sample data created successfully",
        "users_created": len(created_users),
        "jobs_created": len(created_jobs),
        "sample_accounts": {
            "employer": "employer1@example.com / password123",
            "candidate": "candidate1@example.com / password123"
        }
    }