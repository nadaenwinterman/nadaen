import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Layout } from "./components/layout/Layout";

import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import JobDetail from "./pages/Jobdetail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import PostJob from "./pages/PostJob";
import DashboardCandidate from "./pages/DashboardCandidate";
import DashboardEmployer from "./pages/DashboardEmployer";
import Companies from "./pages/Companies";

function App() {
  const location = useLocation();

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:jobId" element={<JobDetail />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/post-job" element={<PostJob />} />
          <Route path="/dashboard/candidate" element={<DashboardCandidate />} />
          <Route path="/dashboard/employer" element={<DashboardEmployer />} />
        </Routes>
      </AnimatePresence>
    </Layout>
  );
}

export default App;
