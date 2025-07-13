<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/jobs" element={<Jobs />} />
    <Route path="/jobs/:jobId" element={<JobDetail />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/post-job" element={<PostJob />} />

    <Route path="/dashboard/candidate" element={<DashboardCandidate />} />
    <Route path="/dashboard/employer" element={<DashboardEmployer />} />
  </Routes>
</BrowserRouter>;
