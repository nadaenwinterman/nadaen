import API from "./api";

export const fetchSampleJobs = async () => {
  const res = await API.get("/jobs/");
  return res.data;
};

export const fetchJobs = async (filters = {}) => {
  const res = await API.get("/jobs/", { params: filters });
  return res.data;
};

export const getJobById = async (id) => {
  const res = await API.get(`/jobs/${id}`);
  return res.data;
};

export const postJob = async (jobData) => {
  const res = await API.post("/jobs/", jobData);
  return res.data;
};

export const applyToJob = async (jobId, applicationData) => {
  const res = await API.post(`/jobs/${jobId}/apply`, applicationData);
  return res.data;
};
