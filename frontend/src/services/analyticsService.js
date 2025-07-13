import API from "./api";

export const getCandidateDashboardStats = async () => {
  const res = await API.get("/dashboard/candidate");
  return res.data;
};

export const getEmployerDashboardStats = async () => {
  const res = await API.get("/dashboard/employer");
  return res.data;
};
