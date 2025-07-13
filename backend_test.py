#!/usr/bin/env python3
"""
Backend Authentication System Test Suite
Tests the FastAPI authentication endpoints for the job platform
"""

import requests
import json
import sys
import time
from typing import Dict, Any

# Backend URL from frontend .env
BACKEND_URL = "http://localhost:8001"
API_BASE = f"{BACKEND_URL}/api"

class AuthenticationTester:
    def __init__(self):
        self.session = requests.Session()
        self.test_results = []
        self.tokens = {}
        
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
    
    def test_bcrypt_compatibility(self):
        """Test bcrypt password hashing compatibility"""
        test_name = "Bcrypt Compatibility Test"
        
        # Test with a specific user to check if bcrypt is working
        test_email = "bcrypt_test@example.com"
        test_password = "test_bcrypt_password_123"
        
        # First try to signup
        signup_success, signup_data = self.test_user_signup(
            test_email, test_password, "Bcrypt Test User", "candidate"
        )
        
        if not signup_success and "already registered" not in str(signup_data):
            self.log_test(test_name, False, "Bcrypt test failed during signup", {"signup_data": signup_data})
            return False
        
        # Then try to login to verify password verification works
        login_success, login_data = self.test_user_login(test_email, test_password)
        
        if login_success:
            self.log_test(test_name, True, "Bcrypt password hashing and verification working correctly")
            return True
        else:
            self.log_test(test_name, False, "Bcrypt password verification failed", {"login_data": login_data})
            return False
    
    def run_all_tests(self):
        """Run the complete authentication test suite"""
        print("🚀 Starting Authentication System Tests")
        print("=" * 50)
        
        # Test backend health first
        if not self.test_backend_health():
            print("\n❌ Backend is not accessible. Stopping tests.")
            return False
        
        print("\n📝 Testing User Registration...")
        # Test user signup for candidate
        self.test_user_signup(
            "test@example.com", 
            "password123", 
            "Test Candidate", 
            "candidate"
        )
        
        # Test user signup for employer
        self.test_user_signup(
            "employer@example.com", 
            "password123", 
            "Test Employer", 
            "employer"
        )
        
        print("\n🔐 Testing User Login...")
        # Test login for both users
        self.test_user_login("test@example.com", "password123")
        self.test_user_login("employer@example.com", "password123")
        
        print("\n🎫 Testing Token Verification...")
        # Test token verification
        self.test_token_verification("test@example.com")
        self.test_token_verification("employer@example.com")
        
        print("\n🚫 Testing Error Handling...")
        # Test error scenarios
        self.test_invalid_credentials()
        self.test_missing_token()
        
        print("\n🔒 Testing Bcrypt Compatibility...")
        # Test bcrypt specifically
        self.test_bcrypt_compatibility()
        
        # Summary
        print("\n" + "=" * 50)
        print("📊 TEST SUMMARY")
        print("=" * 50)
        
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
        
        return failed_tests == 0

def main():
    """Main test execution"""
    tester = AuthenticationTester()
    success = tester.run_all_tests()
    
    if success:
        print("\n🎉 All authentication tests passed!")
        sys.exit(0)
    else:
        print("\n💥 Some authentication tests failed!")
        sys.exit(1)

if __name__ == "__main__":
    main()