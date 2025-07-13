import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

const Input = React.forwardRef(
  ({ className, type = "text", icon: Icon, error, label, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {Icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon className="h-5 w-5 text-gray-400 dark:text-gray-500" />
            </div>
          )}
          <motion.input
            type={type}
            className={cn(
              // Base styles
              "flex h-12 w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm px-3 py-2 text-sm",
              // Placeholder styles
              "placeholder:text-gray-500 dark:placeholder:text-gray-400",
              // Focus styles
              "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
              // Disabled styles
              "disabled:cursor-not-allowed disabled:opacity-50",
              // Icon padding
              Icon && "pl-10",
              // Error styles
              error && "border-red-500 focus:ring-red-500",
              // Glassmorphism enhancement
              "shadow-lg shadow-gray-900/5 dark:shadow-black/20",
              "hover:shadow-xl hover:shadow-gray-900/10 dark:hover:shadow-black/30",
              "transition-all duration-200",
              // Text color
              "text-gray-900 dark:text-white",
              className
            )}
            ref={ref}
            whileFocus={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            {...props}
          />
        </div>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1 text-sm text-red-600 dark:text-red-400"
          >
            {error}
          </motion.p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
