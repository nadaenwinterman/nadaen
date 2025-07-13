import API from "./api";

export const uploadResume = async (formData) => {
  const res = await API.post("/resume/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const getUploadedResumes = async () => {
  const res = await API.get("/resume");
  return res.data;
};
