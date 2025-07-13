import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { Button } from "../ui/Button";
import {
  MapPin,
  DollarSign,
  Clock,
  Building,
  Calendar,
  Tag,
  Wifi,
  Users,
} from "lucide-react";

const JobCard = ({ job, index = 0 }) => {
  const navigate = useNavigate();

  const handleApply = (e) => {
    e.stopPropagation();
    navigate(`/jobs/${job.id}`);
  };

  const handleViewDetails = () => {
    navigate(`/jobs/${job.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="cursor-pointer"
      onClick={handleViewDetails}
    >
      <Card className="h-full">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-lg leading-tight mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {job.title}
              </CardTitle>
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                <Building className="w-4 h-4" />
                <span className="font-medium">{job.company}</span>
              </div>
            </div>
            <div className="flex flex-col items-end space-y-1">
              {job.remote && (
                <div className="flex items-center space-x-1 px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-full text-xs">
                  <Wifi className="w-3 h-3" />
                  <span>Remote</span>
                </div>
              )}
              <div className="flex items-center space-x-1 px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-xs">
                <Tag className="w-3 h-3" />
                <span>{job.employment_type}</span>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Location and Salary */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{job.location}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
              <DollarSign className="w-4 h-4" />
              <span className="text-sm font-medium">{job.salary}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-3">
            {job.description}
          </p>

          {/* Skills */}
          {job.skills_required && job.skills_required.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {job.skills_required.slice(0, 3).map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md text-xs"
                >
                  {skill}
                </span>
              ))}
              {job.skills_required.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-md text-xs">
                  +{job.skills_required.length - 3} more
                </span>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 text-xs">
              <Calendar className="w-3 h-3" />
              <span>
                {new Date(job.created_at).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
            <Button
              size="sm"
              onClick={handleApply}
              className="text-xs px-4 py-2"
            >
              Apply Now
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default JobCard;
