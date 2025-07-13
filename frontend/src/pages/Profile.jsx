import React from "react";
import { motion } from "framer-motion";
import GlassCard from "../components/ui/GlassCard";
import GlassButton from "../components/ui/GlassButton";
import GlassInput from "../components/ui/GlassInput";

const Profile = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <GlassCard className="p-8">
          <h1 className="text-3xl font-bold text-white mb-8">Profile</h1>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Personal Information
              </h3>
              <div className="space-y-4">
                <GlassInput
                  type="text"
                  placeholder="Full Name"
                  className="w-full"
                />
                <GlassInput
                  type="email"
                  placeholder="Email"
                  className="w-full"
                />
                <GlassInput type="tel" placeholder="Phone" className="w-full" />
                <GlassInput
                  type="text"
                  placeholder="Location"
                  className="w-full"
                />
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Professional Details
              </h3>
              <div className="space-y-4">
                <GlassInput
                  type="text"
                  placeholder="Job Title"
                  className="w-full"
                />
                <GlassInput
                  type="text"
                  placeholder="Company"
                  className="w-full"
                />
                <GlassInput
                  type="text"
                  placeholder="Experience Level"
                  className="w-full"
                />
                <GlassInput
                  type="text"
                  placeholder="Skills"
                  className="w-full"
                />
              </div>
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <GlassButton className="bg-blue-500 hover:bg-blue-600 text-white">
              Save Changes
            </GlassButton>
            <GlassButton className="border border-white/20 text-white hover:bg-white/10">
              Cancel
            </GlassButton>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
};

export default Profile;
