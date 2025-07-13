import { Card } from "@/components/ui/Card";
// import { motion } from "framer-motion";

const savedJobs = [
  { title: "Frontend Developer", company: "DevCo" },
  { title: "Backend Engineer", company: "Techie Ltd" },
];

export default function SavedJobsWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <Card className="bg-white/10 backdrop-blur p-6 rounded-2xl shadow-md space-y-3">
        <h2 className="text-lg font-semibold text-white">Saved Jobs</h2>
        <ul className="space-y-2">
          {savedJobs.map((job, idx) => (
            <li key={idx} className="text-sm text-gray-200">
              <strong>{job.title}</strong> @ {job.company}
            </li>
          ))}
        </ul>
      </Card>
    </motion.div>
  );
}
