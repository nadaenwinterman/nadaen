import { Card } from "@/components/ui/Card";
// import { motion } from "framer-motion";

const interviews = [
  { company: "Acme Corp", date: "July 15", time: "10:00 AM" },
  { company: "Globex Inc", date: "July 18", time: "2:00 PM" },
];

export default function CandidateInterviewWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <Card className="bg-white/10 backdrop-blur p-6 rounded-2xl shadow-md space-y-4">
        <h2 className="text-lg font-semibold text-white">
          Upcoming Interviews
        </h2>
        <ul className="space-y-2">
          {interviews.map((int, idx) => (
            <li key={idx} className="text-sm text-gray-200">
              <strong>{int.company}</strong>: {int.date} at {int.time}
            </li>
          ))}
        </ul>
      </Card>
    </motion.div>
  );
}
