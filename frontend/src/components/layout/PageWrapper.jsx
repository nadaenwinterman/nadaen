import { motion } from "framer-motion";
import Navbar from "./Navigation"; // Adjust if needed

const pageVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function PageWrapper({ children }) {
  return (
    <motion.div
      className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-[#ffffff33] to-[#ffffff0f] backdrop-blur-lg rounded-2xl shadow-xl"
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.4, ease: "easeInOut" }}
      variants={pageVariants}
    >
      {<Navbar />}
      {children}
    </motion.div>
  );
}
