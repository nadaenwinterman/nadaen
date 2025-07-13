import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Briefcase,
  User,
  ClipboardList,
  LogOut,
  BarChart2,
} from "lucide-react"; // Optional: Icon pack

const sidebarLinks = [
  {
    section: "Candidate",
    base: "/dashboard/candidate",
    items: [
      {
        label: "Overview",
        path: "/dashboard/candidate",
        icon: <User size={18} />,
      },
      {
        label: "Applications",
        path: "/dashboard/candidate/applications",
        icon: <ClipboardList size={18} />,
      },
      {
        label: "Saved Jobs",
        path: "/dashboard/candidate/saved",
        icon: <Briefcase size={18} />,
      },
      {
        label: "Analytics",
        path: "/dashboard/candidate/analytics",
        icon: <BarChart2 size={18} />,
      },
    ],
  },
  {
    section: "Employer",
    base: "/dashboard/employer",
    items: [
      {
        label: "Overview",
        path: "/dashboard/employer",
        icon: <User size={18} />,
      },
      {
        label: "Applications",
        path: "/dashboard/employer/applications",
        icon: <ClipboardList size={18} />,
      },
      { label: "Post Job", path: "/post-job", icon: <Briefcase size={18} /> },
      {
        label: "Analytics",
        path: "/dashboard/employer/analytics",
        icon: <BarChart2 size={18} />,
      },
    ],
  },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <motion.aside
      initial={{ x: -40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="h-screen w-64 hidden md:flex flex-col bg-white/10 backdrop-blur-md shadow-xl border border-white/20 rounded-r-3xl p-5 space-y-8"
    >
      <h2 className="text-white text-2xl font-bold">Dashboard</h2>

      {sidebarLinks.map(({ section, items }) => (
        <div key={section}>
          <h3 className="text-gray-300 text-sm mb-2 uppercase tracking-widest">
            {section}
          </h3>
          <div className="space-y-2">
            {items.map(({ label, path, icon }) => {
              const isActive = location.pathname === path;

              return (
                <Link
                  key={label}
                  to={path}
                  className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-all ${
                    isActive
                      ? "bg-blue-500/30 text-white font-semibold"
                      : "text-gray-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {icon}
                  <span>{label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      ))}

      <div className="mt-auto">
        <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg bg-red-500/30 hover:bg-red-600/50 text-white transition">
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </motion.aside>
  );
}
