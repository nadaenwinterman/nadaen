// // src/pages/Home.jsx
// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import GlassCard from "../components/ui/GlassCard";
// import GlassButton from "../components/ui/GlassButton";
// import { fetchJobs } from "../services/jobService";
// import JobCard from "../components/jobs/JobCard";

// const Home = () => {
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const getJobs = async () => {
//       try {
//         const data = await fetchJobs();
//         setJobs(data);
//       } catch (err) {
//         console.error("Failed to fetch jobs:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     getJobs();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] p-6">
//       <section className="text-center py-20">
//         <motion.h1
//           initial={{ opacity: 0, y: -40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-4xl md:text-5xl font-bold text-white mb-6"
//         >
//           Find Your Dream Job in Seconds
//         </motion.h1>
//         <motion.p
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2, duration: 0.6 }}
//           className="text-lg text-gray-300 max-w-2xl mx-auto"
//         >
//           Explore AI-powered job recommendations, immersive company VR tours,
//           and personalized career dashboards.
//         </motion.p>
//         <div className="mt-8">
//           <GlassButton className="text-lg px-6 py-3">
//             Start Exploring
//           </GlassButton>
//         </div>
//       </section>

//       <section className="py-12">
//         <h2 className="text-2xl font-semibold text-white mb-6 text-center">
//           Featured Jobs
//         </h2>

//         {loading ? (
//           <p className="text-gray-400 text-center">Loading jobs...</p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {jobs.slice(0, 6).map((job) => (
//               <JobCard key={job.id} job={job} />
//             ))}
//           </div>
//         )}
//       </section>

//       <section className="py-16">
//         <GlassCard className="p-8 max-w-4xl mx-auto text-center">
//           <h3 className="text-2xl font-bold text-white mb-4">
//             AI-Powered Career Matchmaking
//           </h3>
//           <p className="text-gray-300 mb-6">
//             Let our AI engine analyze your profile, experience, and goals to
//             suggest perfect job opportunities.
//           </p>
//           <GlassButton>Try AI Search</GlassButton>
//         </GlassCard>
//       </section>

//       <section className="py-16">
//         <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
//           <GlassCard className="p-6">
//             <h4 className="text-xl text-white font-semibold mb-2">
//               VR Company Tours
//             </h4>
//             <p className="text-gray-300">
//               Experience job environments before you apply using immersive 3D
//               virtual reality previews.
//             </p>
//           </GlassCard>

//           <GlassCard className="p-6">
//             <h4 className="text-xl text-white font-semibold mb-2">
//               Dashboard Insights
//             </h4>
//             <p className="text-gray-300">
//               Track applications, job views, analytics, and get personalized
//               feedback all in one place.
//             </p>
//           </GlassCard>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Home;
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import {
  Search,
  Briefcase,
  Users,
  TrendingUp,
  Building,
  MapPin,
  Clock,
  Star,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Search,
      title: "Smart Job Search",
      description:
        "Find opportunities that match your skills and preferences with our AI-powered search.",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Users,
      title: "Top Companies",
      description:
        "Connect with leading companies and startups looking for talented professionals.",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: TrendingUp,
      title: "Career Growth",
      description:
        "Access resources and opportunities to advance your career to the next level.",
      color: "from-green-500 to-green-600",
    },
    {
      icon: Building,
      title: "Remote Opportunities",
      description:
        "Discover flexible remote work options from companies worldwide.",
      color: "from-orange-500 to-orange-600",
    },
  ];

  const stats = [
    { number: "10K+", label: "Active Jobs" },
    { number: "5K+", label: "Companies" },
    { number: "50K+", label: "Job Seekers" },
    { number: "95%", label: "Success Rate" },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer",
      company: "TechCorp",
      content:
        "Found my dream job in just 2 weeks! The platform made the entire process seamless.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Product Manager",
      company: "InnovateCo",
      content:
        "Great platform with quality job listings. The application process is smooth and efficient.",
      rating: 5,
    },
    {
      name: "Emily Davis",
      role: "UX Designer",
      company: "DesignHub",
      content:
        "Excellent user experience and helpful features. Highly recommend for job seekers.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 dark:from-blue-900/20 dark:to-purple-900/20" />
        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Find Your{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Dream Job
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Connect with top companies and discover opportunities that align
              with your skills, interests, and career goals.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button
                size="lg"
                onClick={() => navigate("/jobs")}
                className="flex items-center space-x-2"
              >
                <Search className="w-5 h-5" />
                <span>Find Jobs</span>
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate("/post-job")}
                className="flex items-center space-x-2"
              >
                <Briefcase className="w-5 h-5" />
                <span>Post a Job</span>
              </Button>
            </div>

            {/* Quick Search */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-2xl mx-auto"
            >
              <Card className="p-6">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    const search = formData.get("search");
                    const location = formData.get("location");
                    const params = new URLSearchParams();
                    if (search) params.set("search", search);
                    if (location) params.set("location", location);
                    navigate(`/jobs?${params.toString()}`);
                  }}
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <input
                        type="text"
                        name="search"
                        placeholder="Job title, keywords, or company"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      />
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        name="location"
                        placeholder="Location"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      />
                    </div>
                    <Button type="submit" className="px-8">
                      <Search className="w-5 h-5" />
                    </Button>
                  </div>
                </form>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We provide the tools and resources you need to find the perfect
              job or hire the best talent.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full text-center p-6 hover:shadow-xl transition-all duration-300">
                    <div
                      className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center shadow-lg`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-400">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Join thousands of satisfied job seekers and employers who found
              success with our platform.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <CardContent className="p-0">
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {testimonial.role} at {testimonial.company}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Ready to Take the Next Step?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Join thousands of professionals who have found their perfect
              career match.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => navigate("/signup")}
                className="flex items-center space-x-2"
              >
                <span>Get Started Today</span>
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate("/jobs")}
              >
                Browse Jobs
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
