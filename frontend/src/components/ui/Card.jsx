  import React from "react";
  import { motion } from "framer-motion";
  import { cn } from "../../lib/utils";

  const Card = React.forwardRef(
    ({ className, children, hover = true, ...props }, ref) => (
      <motion.div
        ref={ref}
        className={cn(
          // Base styles
          "relative overflow-hidden rounded-2xl border transition-all duration-300",
          // Light mode
          "bg-white/80 backdrop-blur-xl border-gray-200/50 shadow-lg shadow-gray-900/5",
          // Dark mode
          "dark:bg-gray-900/80 dark:backdrop-blur-xl dark:border-gray-700/50 dark:shadow-2xl dark:shadow-black/20",
          // Neumorphism effect - with pointer-events-none to allow input interaction
          "before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-r before:from-white/20 before:to-transparent before:opacity-40 before:pointer-events-none",
          "dark:before:from-white/5 dark:before:to-transparent",
          // Hover effect
          hover &&
            "hover:shadow-xl hover:shadow-gray-900/10 hover:scale-[1.02] dark:hover:shadow-black/30",
          // Inner glow - with pointer-events-none to allow input interaction
          "after:absolute after:inset-0 after:rounded-2xl after:bg-gradient-to-t after:from-transparent after:to-white/10 after:opacity-30 after:pointer-events-none",
          "dark:after:from-transparent dark:after:to-white/5",
          className
        )}
        whileHover={hover ? { y: -2 } : {}}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        {...props}
      >
        {children}
      </motion.div>
    )
  );

  Card.displayName = "Card";

  const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 p-6 pb-4 relative z-10", className)}
      {...props}
    />
  ));
  CardHeader.displayName = "CardHeader";

  const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        "text-2xl font-semibold leading-none tracking-tight",
        "text-gray-900 dark:text-white",
        className
      )}
      {...props}
    />
  ));
  CardTitle.displayName = "CardTitle";

  const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-gray-600 dark:text-gray-400", className)}
      {...props}
    />
  ));
  CardDescription.displayName = "CardDescription";

  const CardContent = React.forwardRef(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-4 relative z-10", className)} {...props} />
  ));
  CardContent.displayName = "CardContent";

  const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center p-6 pt-4 relative z-10", className)}
      {...props}
    />
  ));
  CardFooter.displayName = "CardFooter";

  export {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardDescription,
    CardContent,
  };
