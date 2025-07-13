#!/usr/bin/env python3
"""
Comprehensive Backend API Test Suite
Tests the FastAPI authentication and job endpoints for the job platform
"""

import requests
import json
import sys
import time
from typing import Dict, Any
import uuid

# Backend URL from frontend .env
BACKEND_URL = "http://localhost:8001"
API_BASE = f"{BACKEND_URL}/api"

class BackendTester:
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
    
    def test_invalid_credentials(self):
        """Test login with invalid credentials"""
        test_name = "Invalid Credentials Test"
        
        payload = {
            "email": "nonexistent@example.com",
            "password": "wrongpassword"
        }
        
        try:
            response = self.session.post(
                f"{API_BASE}/auth/login",
                json=payload,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code == 401:
                data = response.json()
                self.log_test(test_name, True, "Invalid credentials properly rejected")
                return True, data
            else:
                try:
                    data = response.json()
                except:
                    data = {"raw_response": response.text}
                self.log_test(test_name, False, f"Expected 401 but got {response.status_code}", {"response": data})
                return False, data
                
        except requests.exceptions.RequestException as e:
            self.log_test(test_name, False, f"Network error during invalid credentials test: {str(e)}")
            return False, {"error": str(e)}
    
    def test_missing_token(self):
        """Test /api/auth/me without token"""
        test_name = "Missing Token Test"
        
        try:
            response = self.session.get(
                f"{API_BASE}/auth/me",
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code == 401:
                data = response.json()
                self.log_test(test_name, True, "Missing token properly rejected")
                return True, data
            else:
                try:
                    data = response.json()
                except:
                    data = {"raw_response": response.text}
                self.log_test(test_name, False, f"Expected 401 but got {response.status_code}", {"response": data})
                return False, data
                
        except requests.exceptions.RequestException as e:
            self.log_test(test_name, False, f"Network error during missing token test: {str(e)}")
            return False, {"error": str(e)}
    
    def test_list_jobs(self):
        """Test GET /api/jobs endpoint"""
        test_name = "List Jobs"
        
        try:
            response = self.session.get(
                f"{API_BASE}/jobs/",
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_test(test_name, True, f"Successfully retrieved {len(data)} jobs")
                    return True, data
                else:
                    self.log_test(test_name, False, "Response is not a list", {"response": data})
                    return False, data
            else:
                try:
                    data = response.json()
                except:
                    data = {"raw_response": response.text}
                self.log_test(test_name, False, f"Failed with status {response.status_code}", {"response": data})
                return False, data
                
        except requests.exceptions.RequestException as e:
            self.log_test(test_name, False, f"Network error during job listing: {str(e)}")
            return False, {"error": str(e)}
    
    def test_create_job(self, employer_email: str):
        """Test POST /api/jobs endpoint with employer authentication"""
        test_name = "Create Job (Employer)"
        
        if employer_email not in self.tokens:
            self.log_test(test_name, False, f"No token available for employer {employer_email}")
            return False, {}
        
        # Generate unique job data
        unique_id = str(uuid.uuid4())[:8]
        payload = {
            "title": f"Senior Software Engineer - {unique_id}",
            "company": f"TechCorp {unique_id}",
            "location": "San Francisco, CA",
            "salary": "$120,000 - $150,000",
            "description": f"We are looking for a senior software engineer to join our team. Job ID: {unique_id}",
            "employment_type": "full_time",
            "requirements": ["5+ years experience", "Python", "FastAPI", "React"]
        }
        
        headers = {
            "Authorization": f"Bearer {self.tokens[employer_email]}",
            "Content-Type": "application/json"
        }
        
        try:
            response = self.session.post(
                f"{API_BASE}/jobs/",
                json=payload,
                headers=headers,
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                if "id" in data and "title" in data:
                    self.created_jobs.append(data["id"])
                    self.log_test(test_name, True, f"Job '{data['title']}' created successfully")
                    return True, data
                else:
                    self.log_test(test_name, False, "Missing id or title in response", {"response": data})
                    return False, data
            else:
                try:
                    data = response.json()
                except:
                    data = {"raw_response": response.text}
                self.log_test(test_name, False, f"Job creation failed with status {response.status_code}", {"response": data})
                return False, data
                
        except requests.exceptions.RequestException as e:
            self.log_test(test_name, False, f"Network error during job creation: {str(e)}")
            return False, {"error": str(e)}
    
    def test_get_specific_job(self, job_id: str):
        """Test GET /api/jobs/{job_id} endpoint"""
        test_name = f"Get Specific Job ({job_id[:8]}...)"
        
        try:
            response = self.session.get(
                f"{API_BASE}/jobs/{job_id}",
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                if "id" in data and data["id"] == job_id:
                    self.log_test(test_name, True, f"Successfully retrieved job details")
                    return True, data
                else:
                    self.log_test(test_name, False, "Job ID mismatch or missing", {"response": data})
                    return False, data
            elif response.status_code == 404:
                self.log_test(test_name, False, f"Job {job_id} not found")
                return False, {"error": "Job not found"}
            else:
                try:
                    data = response.json()
                except:
                    data = {"raw_response": response.text}
                self.log_test(test_name, False, f"Failed with status {response.status_code}", {"response": data})
                return False, data
                
        except requests.exceptions.RequestException as e:
            self.log_test(test_name, False, f"Network error during job retrieval: {str(e)}")
            return False, {"error": str(e)}
    
    def test_candidate_job_creation_restriction(self, candidate_email: str):
        """Test that candidates cannot create jobs"""
        test_name = "Candidate Job Creation Restriction"
        
        if candidate_email not in self.tokens:
            self.log_test(test_name, False, f"No token available for candidate {candidate_email}")
            return False, {}
        
        payload = {
            "title": "Unauthorized Job Post",
            "company": "Should Not Work Corp",
            "location": "Nowhere",
            "salary": "$0",
            "description": "This job should not be created by a candidate",
            "employment_type": "full_time",
            "requirements": ["Should fail"]
        }
        
        headers = {
            "Authorization": f"Bearer {self.tokens[candidate_email]}",
            "Content-Type": "application/json"
        }
        
        try:
            response = self.session.post(
                f"{API_BASE}/jobs/",
                json=payload,
                headers=headers,
                timeout=10
            )
            
            if response.status_code == 403:
                data = response.json()
                self.log_test(test_name, True, "Candidate properly forbidden from creating jobs")
                return True, data
            else:
                try:
                    data = response.json()
                except:
                    data = {"raw_response": response.text}
                self.log_test(test_name, False, f"Expected 403 but got {response.status_code}", {"response": data})
                return False, data
                
        except requests.exceptions.RequestException as e:
            self.log_test(test_name, False, f"Network error during candidate restriction test: {str(e)}")
            return False, {"error": str(e)}
    
    def test_integration_flow(self):
        """Test complete integration flow: employer signup → login → job posting → verification"""
        test_name = "Integration Test - Complete Job Board Flow"
        
        # Generate unique employer for this test
        unique_id = str(uuid.uuid4())[:8]
        employer_email = f"integration_employer_{unique_id}@example.com"
        candidate_email = f"integration_candidate_{unique_id}@example.com"
        
        print(f"\n🔄 Running integration test with employer: {employer_email}")
        
        # Step 1: Create employer account
        signup_success, _ = self.test_user_signup(
            employer_email, "password123", f"Integration Employer {unique_id}", "employer"
        )
        if not signup_success:
            self.log_test(test_name, False, "Integration test failed at employer signup")
            return False
        
        # Step 2: Create candidate account
        signup_success, _ = self.test_user_signup(
            candidate_email, "password123", f"Integration Candidate {unique_id}", "candidate"
        )
        if not signup_success:
            self.log_test(test_name, False, "Integration test failed at candidate signup")
            return False
        
        # Step 3: Login employer
        login_success, _ = self.test_user_login(employer_email, "password123")
        if not login_success:
            self.log_test(test_name, False, "Integration test failed at employer login")
            return False
        
        # Step 4: Login candidate
        login_success, _ = self.test_user_login(candidate_email, "password123")
        if not login_success:
            self.log_test(test_name, False, "Integration test failed at candidate login")
            return False
        
        # Step 5: Create job as employer
        job_success, job_data = self.test_create_job(employer_email)
        if not job_success:
            self.log_test(test_name, False, "Integration test failed at job creation")
            return False
        
        # Step 6: Verify job appears in job list
        list_success, jobs_data = self.test_list_jobs()
        if not list_success:
            self.log_test(test_name, False, "Integration test failed at job listing")
            return False
        
        # Step 7: Verify specific job retrieval
        if job_data and "id" in job_data:
            get_success, _ = self.test_get_specific_job(job_data["id"])
            if not get_success:
                self.log_test(test_name, False, "Integration test failed at specific job retrieval")
                return False
        
        # Step 8: Test candidate restriction
        restriction_success, _ = self.test_candidate_job_creation_restriction(candidate_email)
        if not restriction_success:
            self.log_test(test_name, False, "Integration test failed at candidate restriction")
            return False
        
        self.log_test(test_name, True, "Complete integration flow successful")
        return True
    
    def run_all_tests(self):
        """Run the complete backend test suite"""
        print("🚀 Starting Comprehensive Backend API Tests")
        print("=" * 60)
        
        # Test backend health first
        if not self.test_backend_health():
            print("\n❌ Backend is not accessible. Stopping tests.")
            return False
        
        print("\n📝 Testing Authentication System...")
        # Test user signup for candidate
        self.test_user_signup(
            "sarah.johnson@example.com", 
            "securePass123", 
            "Sarah Johnson", 
            "candidate"
        )
        
        # Test user signup for employer
        self.test_user_signup(
            "hiring@techcorp.com", 
            "employerPass456", 
            "Tech Corp Recruiter", 
            "employer"
        )
        
        print("\n🔐 Testing User Login...")
        # Test login for both users
        self.test_user_login("sarah.johnson@example.com", "securePass123")
        self.test_user_login("hiring@techcorp.com", "employerPass456")
        
        print("\n🎫 Testing Token Verification...")
        # Test token verification
        self.test_token_verification("sarah.johnson@example.com")
        self.test_token_verification("hiring@techcorp.com")
        
        print("\n🚫 Testing Authentication Error Handling...")
        # Test error scenarios
        self.test_invalid_credentials()
        self.test_missing_token()
        
        print("\n💼 Testing Job Endpoints...")
        # Test job listing
        self.test_list_jobs()
        
        # Test job creation (employer only)
        job_success, job_data = self.test_create_job("hiring@techcorp.com")
        
        # Test specific job retrieval
        if job_success and job_data and "id" in job_data:
            self.test_get_specific_job(job_data["id"])
        
        print("\n🔒 Testing Role-based Access Control...")
        # Test candidate restriction
        self.test_candidate_job_creation_restriction("sarah.johnson@example.com")
        
        print("\n🔄 Testing Integration Flow...")
        # Test complete integration
        self.test_integration_flow()
        
        # Summary
        print("\n" + "=" * 60)
        print("📊 COMPREHENSIVE TEST SUMMARY")
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
            print("\n🎉 All tests passed! Backend API is fully functional.")
        
        return failed_tests == 0

def main():
    """Main test execution"""
    tester = BackendTester()
    success = tester.run_all_tests()
    
    if success:
        print("\n🎉 All backend API tests passed!")
        sys.exit(0)
    else:
        print("\n💥 Some backend API tests failed!")
        sys.exit(1)

if __name__ == "__main__":
    main()