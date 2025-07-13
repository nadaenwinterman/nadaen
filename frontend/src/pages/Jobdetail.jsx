import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import GlassCard from "../components/ui/GlassCard";
import GlassButton from "../components/ui/GlassButton";
import { getJobById } from "../services/jobService";

const JobDetail = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const data = await getJobById(jobId);
        setJob(data);
      } catch (error) {
        console.error("Failed to fetch job:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] flex items-center justify-center">
        <p className="text-white text-xl">Loading...</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] flex items-center justify-center">
        <p className="text-white text-xl">Job not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <GlassCard className="p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-white mb-2">{job.title}</h1>
            <p className="text-xl text-gray-300 mb-4">{job.company}</p>
            <div className="flex flex-wrap gap-4 text-gray-400">
              <span>📍 {job.location}</span>
              <span>💰 {job.salary}</span>
              <span>💼 {job.employment_type}</span>
              {job.remote && <span>🏠 Remote</span>}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">
              Description
            </h3>
            <p className="text-gray-300 leading-relaxed">{job.description}</p>
          </div>

          {job.requirements && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-4">
                Requirements
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {job.requirements}
              </p>
            </div>
          )}

          <div className="flex gap-4">
            <GlassButton className="bg-blue-500 hover:bg-blue-600 text-white">
              Apply Now
            </GlassButton>
            <GlassButton className="border border-white/20 text-white hover:bg-white/10">
              Save Job
            </GlassButton>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
};

export default JobDetail;
