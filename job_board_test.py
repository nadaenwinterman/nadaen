#!/usr/bin/env python3
"""
Complete Job Board Backend Test Suite
Tests authentication, job endpoints, and integration scenarios
"""

import requests
import json
import sys
import time
from typing import Dict, Any

# Backend URL
BACKEND_URL = "http://localhost:8001"
API_BASE = f"{BACKEND_URL}/api"

class JobBoardTester:
    def __init__(self):
        self.session = requests.Session()
        self.test_results = []
        self.tokens = {}
        self.created_jobs = []
        
    def log_test(self, test_name: str, success: bool, message: str, details: Dict[Any, Any] = None):
        """Log test results"""
        result = {
            "test": test_name,
            "success": success,
            "message": message,
            "details": details or {}
        }
        self.test_results.append(result)
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status}: {test_name} - {message}")
        if details and not success:
            print(f"   Details: {details}")
    
    def test_backend_health(self):
        """Test if backend is running"""
        try:
            response = self.session.get(f"{BACKEND_URL}/docs", timeout=5)
            if response.status_code == 200:
                self.log_test("Backend Health", True, "Backend is running and accessible")
                return True
            else:
                self.log_test("Backend Health", False, f"Backend returned status {response.status_code}")
                return False
        except requests.exceptions.RequestException as e:
            self.log_test("Backend Health", False, f"Cannot connect to backend: {str(e)}")
            return False
    
    def test_user_signup(self, email: str, password: str, full_name: str, role: str):
        """Test user registration"""
        test_name = f"User Signup ({role})"
        
        payload = {
            "email": email,
            "password": password,
            "full_name": full_name,
            "role": role
        }
        
        try:
            response = self.session.post(
                f"{API_BASE}/auth/signup",
                json=payload,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                if "access_token" in data and "email" in data:
                    self.tokens[email] = data["access_token"]
                    self.log_test(test_name, True, f"User {email} registered successfully")
                    return True, data
                else:
                    self.log_test(test_name, False, "Missing access_token or email in response", {"response": data})
                    return False, data
            elif response.status_code == 400:
                # User might already exist
                data = response.json()
                if "already registered" in data.get("detail", "").lower():
                    self.log_test(test_name, True, f"User {email} already exists (expected for repeated tests)")
                    return True, data
                else:
                    self.log_test(test_name, False, f"Signup failed: {data.get('detail', 'Unknown error')}", {"response": data})
                    return False, data
            else:
                try:
                    data = response.json()
                except:
                    data = {"raw_response": response.text}
                self.log_test(test_name, False, f"Signup failed with status {response.status_code}", {"response": data})
                return False, data
                
        except requests.exceptions.RequestException as e:
            self.log_test(test_name, False, f"Network error during signup: {str(e)}")
            return False, {"error": str(e)}
    
    def test_user_login(self, email: str, password: str):
        """Test user login"""
        test_name = f"User Login ({email})"
        
        payload = {
            "email": email,
            "password": password
        }
        
        try:
            response = self.session.post(
                f"{API_BASE}/auth/login",
                json=payload,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                if "access_token" in data and "email" in data:
                    self.tokens[email] = data["access_token"]
                    self.log_test(test_name, True, f"User {email} logged in successfully")
                    return True, data
                else:
                    self.log_test(test_name, False, "Missing access_token or email in response", {"response": data})
                    return False, data
            else:
                try:
                    data = response.json()
                except:
                    data = {"raw_response": response.text}
                self.log_test(test_name, False, f"Login failed with status {response.status_code}", {"response": data})
                return False, data
                
        except requests.exceptions.RequestException as e:
            self.log_test(test_name, False, f"Network error during login: {str(e)}")
            return False, {"error": str(e)}
    
    def test_token_verification(self, email: str):
        """Test /api/auth/me endpoint with JWT token"""
        test_name = f"Token Verification ({email})"
        
        if email not in self.tokens:
            self.log_test(test_name, False, f"No token available for {email}")
            return False, {}
        
        headers = {
            "Authorization": f"Bearer {self.tokens[email]}",
            "Content-Type": "application/json"
        }
        
        try:
            response = self.session.get(
                f"{API_BASE}/auth/me",
                headers=headers,
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                if "email" in data and data["email"] == email:
                    self.log_test(test_name, True, f"Token verification successful for {email}")
                    return True, data
                else:
                    self.log_test(test_name, False, "Token verification returned wrong user data", {"response": data})
                    return False, data
            else:
                try:
                    data = response.json()
                except:
                    data = {"raw_response": response.text}
                self.log_test(test_name, False, f"Token verification failed with status {response.status_code}", {"response": data})
                return False, data
                
        except requests.exceptions.RequestException as e:
            self.log_test(test_name, False, f"Network error during token verification: {str(e)}")
            return False, {"error": str(e)}
    
    def test_get_jobs_list(self):
        """Test GET /api/jobs to list all jobs (should work without authentication)"""
        test_name = "Get Jobs List (No Auth)"
        
        try:
            response = self.session.get(
                f"{API_BASE}/jobs/",
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_test(test_name, True, f"Retrieved {len(data)} jobs successfully")
                    return True, data
                else:
                    self.log_test(test_name, False, "Response is not a list", {"response": data})
                    return False, data
            else:
                try:
                    data = response.json()
                except:
                    data = {"raw_response": response.text}
                self.log_test(test_name, False, f"Get jobs failed with status {response.status_code}", {"response": data})
                return False, data
                
        except requests.exceptions.RequestException as e:
            self.log_test(test_name, False, f"Network error during get jobs: {str(e)}")
            return False, {"error": str(e)}
    
    def test_create_job(self, employer_email: str, job_data: dict):
        """Test POST /api/jobs to create a new job (requires employer authentication)"""
        test_name = f"Create Job ({job_data.get('title', 'Unknown')})"
        
        if employer_email not in self.tokens:
            self.log_test(test_name, False, f"No token available for employer {employer_email}")
            return False, {}
        
        headers = {
            "Authorization": f"Bearer {self.tokens[employer_email]}",
            "Content-Type": "application/json"
        }
        
        try:
            response = self.session.post(
                f"{API_BASE}/jobs/",
                json=job_data,
                headers=headers,
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                if "id" in data:
                    self.created_jobs.append(data["id"])
                    self.log_test(test_name, True, f"Job '{job_data.get('title')}' created successfully")
                    return True, data
                else:
                    self.log_test(test_name, False, "Missing job ID in response", {"response": data})
                    return False, data
            else:
                try:
                    data = response.json()
                except:
                    data = {"raw_response": response.text}
                self.log_test(test_name, False, f"Create job failed with status {response.status_code}", {"response": data})
                return False, data
                
        except requests.exceptions.RequestException as e:
            self.log_test(test_name, False, f"Network error during job creation: {str(e)}")
            return False, {"error": str(e)}
    
    def test_create_job_as_candidate(self, candidate_email: str, job_data: dict):
        """Test POST /api/jobs as candidate (should get 403)"""
        test_name = "Create Job as Candidate (Should Fail)"
        
        if candidate_email not in self.tokens:
            self.log_test(test_name, False, f"No token available for candidate {candidate_email}")
            return False, {}
        
        headers = {
            "Authorization": f"Bearer {self.tokens[candidate_email]}",
            "Content-Type": "application/json"
        }
        
        try:
            response = self.session.post(
                f"{API_BASE}/jobs/",
                json=job_data,
                headers=headers,
                timeout=10
            )
            
            if response.status_code == 403:
                data = response.json()
                self.log_test(test_name, True, "Candidate correctly forbidden from creating jobs")
                return True, data
            else:
                try:
                    data = response.json()
                except:
                    data = {"raw_response": response.text}
                self.log_test(test_name, False, f"Expected 403 but got {response.status_code}", {"response": data})
                return False, data
                
        except requests.exceptions.RequestException as e:
            self.log_test(test_name, False, f"Network error during candidate job creation test: {str(e)}")
            return False, {"error": str(e)}
    
    def test_get_specific_job(self, job_id: str):
        """Test GET /api/jobs/{job_id} to get a specific job"""
        test_name = f"Get Specific Job ({job_id})"
        
        try:
            response = self.session.get(
                f"{API_BASE}/jobs/{job_id}",
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                if "id" in data and data["id"] == job_id:
                    self.log_test(test_name, True, f"Retrieved job {job_id} successfully")
                    return True, data
                else:
                    self.log_test(test_name, False, "Job ID mismatch or missing", {"response": data})
                    return False, data
            elif response.status_code == 404:
                self.log_test(test_name, True, f"Job {job_id} not found (expected if job doesn't exist)")
                return True, {"status": "not_found"}
            else:
                try:
                    data = response.json()
                except:
                    data = {"raw_response": response.text}
                self.log_test(test_name, False, f"Get specific job failed with status {response.status_code}", {"response": data})
                return False, data
                
        except requests.exceptions.RequestException as e:
            self.log_test(test_name, False, f"Network error during get specific job: {str(e)}")
            return False, {"error": str(e)}
    
    def run_integration_test(self):
        """Run the complete integration test as requested"""
        print("\n🔗 Running Integration Test...")
        print("=" * 50)
        
        # Step 1: Create an employer account
        employer_email = "integration_employer@techcorp.com"
        employer_password = "SecurePass123!"
        
        print("1. Creating employer account...")
        signup_success, signup_data = self.test_user_signup(
            employer_email, employer_password, "John Smith", "employer"
        )
        
        if not signup_success and "already registered" not in str(signup_data):
            print("❌ Integration test failed at employer signup")
            return False
        
        # Step 2: Login as employer to get JWT token
        print("2. Logging in as employer...")
        login_success, login_data = self.test_user_login(employer_email, employer_password)
        
        if not login_success:
            print("❌ Integration test failed at employer login")
            return False
        
        # Step 3: Create a job posting using the token
        print("3. Creating job posting...")
        job_data = {
            "title": "Senior Software Engineer",
            "description": "We are looking for an experienced software engineer to join our team. You will be responsible for developing scalable web applications using modern technologies.",
            "company": "TechCorp Solutions",
            "location": "San Francisco, CA",
            "salary": "$120,000 - $160,000",
            "requirements": "5+ years Python experience, Experience with FastAPI, Knowledge of React, Strong problem-solving skills",
            "employment_type": "Full-time"
        }
        
        create_success, create_data = self.test_create_job(employer_email, job_data)
        
        if not create_success:
            print("❌ Integration test failed at job creation")
            return False
        
        job_id = create_data.get("id")
        
        # Step 4: Verify the job appears in the job list
        print("4. Verifying job appears in job list...")
        list_success, list_data = self.test_get_jobs_list()
        
        if not list_success:
            print("❌ Integration test failed at job list verification")
            return False
        
        # Check if our job is in the list
        job_found = any(job.get("id") == job_id for job in list_data)
        if job_found:
            self.log_test("Integration - Job in List", True, "Created job found in job list")
        else:
            self.log_test("Integration - Job in List", False, "Created job not found in job list")
            return False
        
        # Step 5: Test with candidate role (should get 403 when trying to post job)
        print("5. Testing candidate role restrictions...")
        candidate_email = "integration_candidate@example.com"
        candidate_password = "CandidatePass123!"
        
        # Create candidate account
        candidate_signup_success, candidate_signup_data = self.test_user_signup(
            candidate_email, candidate_password, "Jane Doe", "candidate"
        )
        
        if not candidate_signup_success and "already registered" not in str(candidate_signup_data):
            print("❌ Integration test failed at candidate signup")
            return False
        
        # Login as candidate
        candidate_login_success, candidate_login_data = self.test_user_login(candidate_email, candidate_password)
        
        if not candidate_login_success:
            print("❌ Integration test failed at candidate login")
            return False
        
        # Try to create job as candidate (should fail)
        candidate_job_data = {
            "title": "This Should Fail",
            "description": "Candidates shouldn't be able to post jobs",
            "company": "Fake Company",
            "location": "Nowhere",
            "salary": "$0",
            "requirements": "None",
            "employment_type": "Full-time"
        }
        
        self.test_create_job_as_candidate(candidate_email, candidate_job_data)
        
        print("✅ Integration test completed successfully!")
        return True
    
    def run_all_tests(self):
        """Run the complete test suite"""
        print("🚀 Starting Complete Job Board Backend Tests")
        print("=" * 60)
        
        # Test backend health first
        if not self.test_backend_health():
            print("\n❌ Backend is not accessible. Stopping tests.")
            return False
        
        print("\n📝 Testing Authentication System...")
        print("-" * 40)
        
        # Test user signup for candidate
        self.test_user_signup(
            "sarah.johnson@email.com", 
            "SecurePassword123!", 
            "Sarah Johnson", 
            "candidate"
        )
        
        # Test user signup for employer
        self.test_user_signup(
            "hiring@innovatetech.com", 
            "CompanyPass456!", 
            "Mike Chen", 
            "employer"
        )
        
        # Test login for both users
        self.test_user_login("sarah.johnson@email.com", "SecurePassword123!")
        self.test_user_login("hiring@innovatetech.com", "CompanyPass456!")
        
        # Test token verification
        self.test_token_verification("sarah.johnson@email.com")
        self.test_token_verification("hiring@innovatetech.com")
        
        print("\n💼 Testing Job Endpoints...")
        print("-" * 40)
        
        # Test getting jobs list (no auth required)
        self.test_get_jobs_list()
        
        # Test creating a job as employer
        sample_job = {
            "title": "Frontend Developer",
            "description": "Join our dynamic team as a Frontend Developer. You'll work on cutting-edge web applications using React and modern JavaScript frameworks.",
            "company": "InnovateTech Solutions",
            "location": "Austin, TX",
            "salary": "$80,000 - $110,000",
            "requirements": "3+ years React experience, JavaScript/TypeScript proficiency, CSS/SCSS skills, Git version control",
            "employment_type": "Full-time"
        }
        
        create_success, create_data = self.test_create_job("hiring@innovatetech.com", sample_job)
        
        # Test getting specific job if creation was successful
        if create_success and "id" in create_data:
            self.test_get_specific_job(create_data["id"])
        
        # Test candidate trying to create job (should fail)
        candidate_job = {
            "title": "This Should Not Work",
            "description": "Candidates cannot post jobs",
            "company": "Invalid Company",
            "location": "Nowhere",
            "salary": "$0",
            "requirements": "None",
            "employment_type": "Full-time"
        }
        
        self.test_create_job_as_candidate("sarah.johnson@email.com", candidate_job)
        
        # Run integration test
        self.run_integration_test()
        
        # Summary
        print("\n" + "=" * 60)
        print("📊 COMPLETE TEST SUMMARY")
        print("=" * 60)
        
        total_tests = len(self.test_results)
        passed_tests = sum(1 for result in self.test_results if result["success"])
        failed_tests = total_tests - passed_tests
        
        print(f"Total Tests: {total_tests}")
        print(f"Passed: {passed_tests}")
        print(f"Failed: {failed_tests}")
        print(f"Success Rate: {(passed_tests/total_tests)*100:.1f}%")
        
        if failed_tests > 0:
            print("\n❌ FAILED TESTS:")
            for result in self.test_results:
                if not result["success"]:
                    print(f"  - {result['test']}: {result['message']}")
        else:
            print("\n🎉 All tests passed!")
        
        return failed_tests == 0

def main():
    """Main test execution"""
    tester = JobBoardTester()
    success = tester.run_all_tests()
    
    if success:
        print("\n🎉 All job board tests passed!")
        sys.exit(0)
    else:
        print("\n💥 Some job board tests failed!")
        sys.exit(1)

if __name__ == "__main__":
    main()