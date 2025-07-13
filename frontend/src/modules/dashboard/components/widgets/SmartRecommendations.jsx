import { Card } from "@/components/ui/Card";
// import { motion } from "framer-motion";

const recommended = [
  { title: "UI Designer", company: "PixelPerfect" },
  { title: "DevOps Engineer", company: "InfraTech" },
];

export default function SmartRecommendations() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.3 }}
    >
      <Card className="bg-white/10 backdrop-blur p-6 rounded-2xl shadow-md space-y-3">
        <h2 className="text-lg font-semibold text-white">
          Smart Recommendations
        </h2>
        <ul className="space-y-2">
          {recommended.map((job, idx) => (
            <li key={idx} className="text-sm text-gray-200">
              <strong>{job.title}</strong> at {job.company}
            </li>
          ))}
        </ul>
      </Card>
    </motion.div>
  );
}
