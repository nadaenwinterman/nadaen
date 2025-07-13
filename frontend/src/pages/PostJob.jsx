// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import GlassCard from "../components/ui/GlassCard";
// import GlassButton from "../components/ui/GlassButton";
// import GlassInput from "../components/ui/GlassInput";
// import { postJob } from "../services/jobService";

// const PostJob = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     title: "",
//     company: "",
//     location: "",
//     salary: "",
//     description: "",
//     requirements: "",
//     employment_type: "Full-time",
//     remote: false,
//     skills_required: [],
//     benefits: "",
//     application_deadline: ""
//   });

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       // Process skills_required into array
//       const processedData = {
//         ...formData,
//         skills_required: formData.skills_required
//           ? formData.skills_required.split(',').map(skill => skill.trim()).filter(Boolean)
//           : [],
//         application_deadline: formData.application_deadline || null
//       };

//       await postJob(processedData);
//       alert("Job posted successfully!");
//       navigate("/dashboard/employer");
//     } catch (error) {
//       console.error("Failed to post job:", error);
//       alert("Failed to post job. Please check your login status and try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] p-6">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="max-w-4xl mx-auto"
//       >
//         <GlassCard className="p-8">
//           <h1 className="text-3xl font-bold text-white mb-8">Post a Job</h1>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="grid md:grid-cols-2 gap-6">
//               <div>
//                 <h3 className="text-xl font-semibold text-white mb-4">
//                   Job Details
//                 </h3>
//                 <div className="space-y-4">
//                   <GlassInput
//                     type="text"
//                     name="title"
//                     placeholder="Job Title"
//                     value={formData.title}
//                     onChange={handleInputChange}
//                     className="w-full"
//                     required
//                   />
//                   <GlassInput
//                     type="text"
//                     name="company"
//                     placeholder="Company Name"
//                     value={formData.company}
//                     onChange={handleInputChange}
//                     className="w-full"
//                     required
//                   />
//                   <GlassInput
//                     type="text"
//                     name="location"
//                     placeholder="Location"
//                     value={formData.location}
//                     onChange={handleInputChange}
//                     className="w-full"
//                     required
//                   />
//                   <GlassInput
//                     type="text"
//                     name="salary"
//                     placeholder="Salary Range"
//                     value={formData.salary}
//                     onChange={handleInputChange}
//                     className="w-full"
//                     required
//                   />
//                 </div>
//               </div>

//               <div>
//                 <h3 className="text-xl font-semibold text-white mb-4">
//                   Job Type
//                 </h3>
//                 <div className="space-y-4">
//                   <select
//                     name="employment_type"
//                     value={formData.employment_type}
//                     onChange={handleInputChange}
//                     className="w-full p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   >
//                     <option value="Full-time">Full-time</option>
//                     <option value="Part-time">Part-time</option>
//                     <option value="Contract">Contract</option>
//                     <option value="Freelance">Freelance</option>
//                     <option value="Internship">Internship</option>
//                   </select>
//                   <div className="flex items-center space-x-2">
//                     <input
//                       type="checkbox"
//                       id="remote"
//                       name="remote"
//                       checked={formData.remote}
//                       onChange={handleInputChange}
//                       className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
//                     />
//                     <label htmlFor="remote" className="text-white">
//                       Remote Work Available
//                     </label>
//                   </div>
//                   <GlassInput
//                     type="text"
//                     name="skills_required"
//                     placeholder="Required Skills (comma-separated)"
//                     value={formData.skills_required}
//                     onChange={handleInputChange}
//                     className="w-full"
//                   />
//                   <GlassInput
//                     type="date"
//                     name="application_deadline"
//                     placeholder="Application Deadline"
//                     value={formData.application_deadline}
//                     onChange={handleInputChange}
//                     className="w-full"
//                   />
//                 </div>
//               </div>
//             </div>

//             <div>
//               <h3 className="text-xl font-semibold text-white mb-4">
//                 Description
//               </h3>
//               <textarea
//                 name="description"
//                 placeholder="Job Description"
//                 value={formData.description}
//                 onChange={handleInputChange}
//                 className="w-full h-32 p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//               />
//             </div>

//             <div>
//               <h3 className="text-xl font-semibold text-white mb-4">
//                 Requirements
//               </h3>
//               <textarea
//                 name="requirements"
//                 placeholder="Job Requirements"
//                 value={formData.requirements}
//                 onChange={handleInputChange}
//                 className="w-full h-32 p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div>
//               <h3 className="text-xl font-semibold text-white mb-4">
//                 Benefits
//               </h3>
//               <textarea
//                 name="benefits"
//                 placeholder="Benefits and Perks"
//                 value={formData.benefits}
//                 onChange={handleInputChange}
//                 className="w-full h-24 p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div className="flex gap-4">
//               <GlassButton
//                 type="submit"
//                 disabled={loading}
//                 className="bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-50"
//               >
//                 {loading ? "Posting..." : "Post Job"}
//               </GlassButton>
//               <GlassButton
//                 type="button"
//                 onClick={() => navigate("/dashboard/employer")}
//                 className="border border-white/20 text-white hover:bg-white/10"
//               >
//                 Cancel
//               </GlassButton>
//             </div>
//           </form>
//         </GlassCard>
//       </motion.div>
//     </div>
//   );
// };

// export default PostJob;
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { postJob } from "../services/jobService";
import {
  Building,
  MapPin,
  DollarSign,
  Clock,
  FileText,
  Users,
  CheckCircle,
  AlertCircle,
  Save,
  Send,
} from "lucide-react";

const PostJob = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
    requirements: "",
    employment_type: "Full-time",
    remote: false,
    skills_required: "",
    benefits: "",
    application_deadline: "",
  });

  const [errors, setErrors] = useState({});

  const steps = [
    { id: 1, title: "Job Details", icon: Building },
    { id: 2, title: "Description", icon: FileText },
    { id: 3, title: "Requirements", icon: Users },
    { id: 4, title: "Review", icon: CheckCircle },
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.title) newErrors.title = "Job title is required";
        if (!formData.company) newErrors.company = "Company name is required";
        if (!formData.location) newErrors.location = "Location is required";
        if (!formData.salary) newErrors.salary = "Salary range is required";
        break;
      case 2:
        if (!formData.description)
          newErrors.description = "Job description is required";
        if (formData.description.length < 50)
          newErrors.description =
            "Description should be at least 50 characters";
        break;
      case 3:
        if (!formData.requirements)
          newErrors.requirements = "Job requirements are required";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    setLoading(true);

    try {
      const processedData = {
        ...formData,
        skills_required: formData.skills_required
          ? formData.skills_required
              .split(",")
              .map((skill) => skill.trim())
              .filter(Boolean)
          : [],
        application_deadline: formData.application_deadline || null,
      };

      await postJob(processedData);

      // Show success message
      setCurrentStep(4);
      setTimeout(() => {
        navigate("/dashboard/employer");
      }, 2000);
    } catch (error) {
      console.error("Failed to post job:", error);
      alert(
        "Failed to post job. Please check your login status and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Job Title"
                name="title"
                placeholder="e.g. Senior Software Engineer"
                value={formData.title}
                onChange={handleInputChange}
                error={errors.title}
                icon={Building}
              />
              <Input
                label="Company Name"
                name="company"
                placeholder="e.g. TechCorp Inc."
                value={formData.company}
                onChange={handleInputChange}
                error={errors.company}
                icon={Building}
              />
              <Input
                label="Location"
                name="location"
                placeholder="e.g. San Francisco, CA"
                value={formData.location}
                onChange={handleInputChange}
                error={errors.location}
                icon={MapPin}
              />
              <Input
                label="Salary Range"
                name="salary"
                placeholder="e.g. $120,000 - $150,000"
                value={formData.salary}
                onChange={handleInputChange}
                error={errors.salary}
                icon={DollarSign}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Employment Type
                </label>
                <select
                  name="employment_type"
                  value={formData.employment_type}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Application Deadline
                </label>
                <Input
                  type="date"
                  name="application_deadline"
                  value={formData.application_deadline}
                  onChange={handleInputChange}
                  icon={Clock}
                />
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="remote"
                name="remote"
                checked={formData.remote}
                onChange={handleInputChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="remote"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Remote work available
              </label>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Job Description
              </label>
              <textarea
                name="description"
                placeholder="Describe the role, responsibilities, and what makes this opportunity exciting..."
                value={formData.description}
                onChange={handleInputChange}
                rows="8"
                className="w-full p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              {errors.description && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                  {errors.description}
                </p>
              )}
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {formData.description.length}/500 characters
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Benefits & Perks
              </label>
              <textarea
                name="benefits"
                placeholder="List the benefits, perks, and what makes your company a great place to work..."
                value={formData.benefits}
                onChange={handleInputChange}
                rows="4"
                className="w-full p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Job Requirements
              </label>
              <textarea
                name="requirements"
                placeholder="List the qualifications, experience, and skills required for this position..."
                value={formData.requirements}
                onChange={handleInputChange}
                rows="6"
                className="w-full p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              {errors.requirements && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                  {errors.requirements}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Required Skills
              </label>
              <Input
                name="skills_required"
                placeholder="e.g. React, Node.js, Python, AWS (comma-separated)"
                value={formData.skills_required}
                onChange={handleInputChange}
              />
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Enter skills separated by commas
              </p>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="text-center py-8"
          >
            <div className="w-20 h-20 mx-auto mb-6 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Job Posted Successfully!
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Your job posting is now live and candidates can start applying.
            </p>
            <Button onClick={() => navigate("/dashboard/employer")}>
              View Your Jobs
            </Button>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Post a New Job
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Find the perfect candidate for your open position
          </p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;

              return (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                      isCompleted
                        ? "bg-green-500 border-green-500 text-white"
                        : isActive
                        ? "bg-blue-500 border-blue-500 text-white"
                        : "border-gray-300 text-gray-500 dark:border-gray-600 dark:text-gray-400"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </div>
                  <span
                    className={`ml-2 text-sm font-medium ${
                      isActive
                        ? "text-blue-600 dark:text-blue-400"
                        : isCompleted
                        ? "text-green-600 dark:text-green-400"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {step.title}
                  </span>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-16 h-0.5 mx-4 ${
                        isCompleted
                          ? "bg-green-500"
                          : "bg-gray-300 dark:bg-gray-600"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="p-8">
            <form onSubmit={handleSubmit}>
              {renderStep()}

              {/* Navigation Buttons */}
              {currentStep < 4 && (
                <div className="flex justify-between items-center mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrev}
                    disabled={currentStep === 1}
                  >
                    Previous
                  </Button>

                  <div className="flex space-x-4">
                    {currentStep === 3 ? (
                      <Button
                        type="submit"
                        disabled={loading}
                        className="flex items-center space-x-2"
                      >
                        {loading ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                          />
                        ) : (
                          <Send className="w-4 h-4" />
                        )}
                        <span>{loading ? "Posting..." : "Post Job"}</span>
                      </Button>
                    ) : (
                      <Button type="button" onClick={handleNext}>
                        Next
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default PostJob;
