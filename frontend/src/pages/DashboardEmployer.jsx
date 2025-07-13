import React from "react";
import { motion } from "framer-motion";
import GlassCard from "../components/ui/GlassCard";
import GlassButton from "../components/ui/GlassButton";

const DashboardEmployer = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-3xl font-bold text-white mb-8">
          Employer Dashboard
        </h1>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <GlassCard className="p-6 text-center">
            <h3 className="text-2xl font-bold text-white mb-2">5</h3>
            <p className="text-gray-300">Active Jobs</p>
          </GlassCard>
          <GlassCard className="p-6 text-center">
            <h3 className="text-2xl font-bold text-white mb-2">28</h3>
            <p className="text-gray-300">Applications</p>
          </GlassCard>
          <GlassCard className="p-6 text-center">
            <h3 className="text-2xl font-bold text-white mb-2">12</h3>
            <p className="text-gray-300">Interviews</p>
          </GlassCard>
          <GlassCard className="p-6 text-center">
            <h3 className="text-2xl font-bold text-white mb-2">3</h3>
            <p className="text-gray-300">New Hires</p>
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
                  <p className="text-white font-medium">John Doe</p>
                  <p className="text-gray-400 text-sm">Frontend Developer</p>
                </div>
                <GlassButton className="text-sm">Review</GlassButton>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                <div>
                  <p className="text-white font-medium">Jane Smith</p>
                  <p className="text-gray-400 text-sm">Backend Engineer</p>
                </div>
                <GlassButton className="text-sm">Review</GlassButton>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <h3 className="text-xl font-semibold text-white mb-4">
              Job Performance
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-white/5 rounded-lg">
                <div className="flex justify-between items-center">
                  <p className="text-white font-medium">React Developer</p>
                  <span className="text-green-400 text-sm">
                    15 Applications
                  </span>
                </div>
                <p className="text-gray-400 text-sm">Posted 3 days ago</p>
              </div>
              <div className="p-3 bg-white/5 rounded-lg">
                <div className="flex justify-between items-center">
                  <p className="text-white font-medium">UI/UX Designer</p>
                  <span className="text-yellow-400 text-sm">
                    8 Applications
                  </span>
                </div>
                <p className="text-gray-400 text-sm">Posted 1 week ago</p>
              </div>
            </div>
          </GlassCard>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardEmployer;
