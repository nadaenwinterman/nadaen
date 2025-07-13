import React from "react";
import { motion } from "framer-motion";
import GlassCard from "../components/ui/GlassCard";
import GlassButton from "../components/ui/GlassButton";

const DashboardCandidate = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-3xl font-bold text-white mb-8">
          Candidate Dashboard
        </h1>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <GlassCard className="p-6 text-center">
            <h3 className="text-2xl font-bold text-white mb-2">12</h3>
            <p className="text-gray-300">Applications Sent</p>
          </GlassCard>
          <GlassCard className="p-6 text-center">
            <h3 className="text-2xl font-bold text-white mb-2">3</h3>
            <p className="text-gray-300">Interview Scheduled</p>
          </GlassCard>
          <GlassCard className="p-6 text-center">
            <h3 className="text-2xl font-bold text-white mb-2">45</h3>
            <p className="text-gray-300">Profile Views</p>
          </GlassCard>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <GlassCard className="p-6">
            <h3 className="text-xl font-semibold text-white mb-4">
              Recent Applications
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                <div>
                  <p className="text-white font-medium">Frontend Developer</p>
                  <p className="text-gray-400 text-sm">TechCorp</p>
                </div>
                <span className="text-yellow-400 text-sm">Pending</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                <div>
                  <p className="text-white font-medium">React Developer</p>
                  <p className="text-gray-400 text-sm">StartupX</p>
                </div>
                <span className="text-green-400 text-sm">Interview</span>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <h3 className="text-xl font-semibold text-white mb-4">
              Recommended Jobs
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-white/5 rounded-lg">
                <p className="text-white font-medium">Senior Developer</p>
                <p className="text-gray-400 text-sm">$120k - $150k</p>
                <GlassButton className="mt-2 text-sm">View Details</GlassButton>
              </div>
              <div className="p-3 bg-white/5 rounded-lg">
                <p className="text-white font-medium">Full Stack Engineer</p>
                <p className="text-gray-400 text-sm">$100k - $130k</p>
                <GlassButton className="mt-2 text-sm">View Details</GlassButton>
              </div>
            </div>
          </GlassCard>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardCandidate;
