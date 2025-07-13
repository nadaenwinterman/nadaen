// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { cn } from "@/lib/utils"; // for conditional class merging
// import { useAuth } from "../../contexts/AuthContext";
// import GlassButton from "../ui/GlassButton";

// const navItems = [
//   { label: "Home", path: "/" },
//   { label: "Jobs", path: "/jobs" },
//   { label: "Dashboard", path: "/dashboard/candidate" },
//   { label: "Post a Job", path: "/post-job" },
// ];

// export default function Navbar() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { user, logout, isAuthenticated } = useAuth();

//   const handleLogout = () => {
//     logout();
//     navigate("/");
//   };

//   const getDashboardPath = () => {
//     if (user?.role === "employer") {
//       return "/dashboard/employer";
//     }
//     return "/dashboard/candidate";
//   };

//   return (
//     <motion.nav
//       initial={{ y: -50, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ duration: 0.5, ease: "easeOut" }}
//       className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] md:w-[90%] bg-white/10 backdrop-blur-xl rounded-2xl shadow-md border border-white/20 px-6 py-3 flex justify-between items-center"
//     >
//       <Link to="/" className="text-xl font-extrabold text-white tracking-wide">
//         JobBoard+
//       </Link>

//       <div className="hidden md:flex space-x-4">
//         {navItems.map((item) => {
//           // Update dashboard link based on user role
//           const path = item.path === "/dashboard/candidate" && isAuthenticated
//             ? getDashboardPath()
//             : item.path;

//           return (
//             <Link
//               key={item.path}
//               to={path}
//               className={cn(
//                 "text-white px-3 py-1 rounded-md transition hover:text-blue-300",
//                 location.pathname === path && "font-bold text-blue-300"
//               )}
//             >
//               {item.label}
//             </Link>
//           );
//         })}
//       </div>

//       <div className="flex space-x-2 items-center">
//         {isAuthenticated ? (
//           <>
//             <span className="text-white text-sm mr-2">
//               Welcome, {user?.full_name}
//             </span>
//             <GlassButton
//               onClick={handleLogout}
//               className="text-sm px-4 py-1.5"
//             >
//               Logout
//             </GlassButton>
//           </>
//         ) : (
//           <>
//             <Link to="/login">
//               <GlassButton className="text-sm px-4 py-1.5">Login</GlassButton>
//             </Link>
//             <Link to="/signup">
//               <GlassButton className="text-sm px-4 py-1.5 bg-blue-500 hover:bg-blue-600 text-white">
//                 Sign Up
//               </GlassButton>
//             </Link>
//           </>
//         )}
//       </div>
//     </motion.nav>
//   );
// }
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../ui/ThemeProvider";
import { ThemeToggle } from "../ui/ThemeToggle";
import { Button } from "../ui/Button";
import {
  Briefcase,
  Search,
  Plus,
  User,
  Menu,
  X,
  Home,
  Building,
  LogOut,
} from "lucide-react";

const Navigation = () => {
  const { theme } = useTheme();
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Jobs", href: "/jobs", icon: Search },
    { name: "Companies", href: "/companies", icon: Building },
  ];

  const userMenuItems = [
    { name: "Profile", href: "/profile", icon: User },
    {
      name: "Dashboard",
      href:
        user?.role === "employer"
          ? "/dashboard/employer"
          : "/dashboard/candidate",
      icon: Briefcase,
    },
    ...(user?.role === "employer"
      ? [{ name: "Post Job", href: "/post-job", icon: Plus }]
      : []),
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
          >
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                JobBoard
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <motion.div
                  key={item.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={item.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400"
                        : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />

            {isAuthenticated ? (
              <div className="relative">
                <motion.button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {user?.full_name}
                  </span>
                </motion.button>

                <AnimatePresence>
                  {isMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 py-2"
                    >
                      {userMenuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.name}
                            to={item.href}
                            className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <Icon className="w-4 h-4" />
                            <span>{item.name}</span>
                          </Link>
                        );
                      })}
                      <hr className="my-2 border-gray-200 dark:border-gray-700" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors w-full text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Button variant="ghost" onClick={() => navigate("/login")}>
                  Sign In
                </Button>
                <Button onClick={() => navigate("/signup")}>Sign Up</Button>
              </div>
            )}

            {/* Mobile menu button */}
            <motion.button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-200 dark:border-gray-700 py-4"
            >
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400"
                        : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export { Navigation };
