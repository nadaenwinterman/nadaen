import { Card } from "@/components/ui/Card";
// import { motion } from "framer-motion";

const stats = [
  { label: "Applications", value: 12 },
  { label: "Shortlisted", value: 4 },
  { label: "Rejected", value: 5 },
];

export default function CandidateApplicationSummary() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-white/10 backdrop-blur p-6 rounded-2xl shadow-md space-y-4">
        <h2 className="text-lg font-semibold text-white">Your Applications</h2>
        <div className="grid grid-cols-3 gap-4 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-2xl font-bold text-white">{s.value}</p>
              <p className="text-sm text-gray-300">{s.label}</p>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
