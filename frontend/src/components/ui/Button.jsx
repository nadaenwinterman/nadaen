// import * as React from "react";
// import { Slot } from "@radix-ui/react-slot";
// import { cn } from "@/lib/utils";
// import buttonVariants from "@/components/ui/button-variants"; // adjust if needed

// function Button({ className, variant, size, asChild = false, ...props }) {
//   const Comp = asChild ? Slot : "button";

//   return (
//     <Comp
//       data-slot="button"
//       className={cn(buttonVariants({ variant, size }), className)}
//       {...props}
//     />
//   );
// }

// export { Button };
import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

const Button = React.forwardRef(
  (
    {
      className,
      variant = "default",
      size = "default",
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const variants = {
      default: cn(
        // Base styles
        "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg",
        // Hover effects
        "hover:from-blue-700 hover:to-blue-800 hover:shadow-xl hover:shadow-blue-500/25",
        // Dark mode
        "dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700",
        // Active state
        "active:scale-95"
      ),
      secondary: cn(
        "bg-gray-100 text-gray-900 border border-gray-200 shadow-sm",
        "hover:bg-gray-200 hover:shadow-md",
        "dark:bg-gray-800 dark:text-white dark:border-gray-700",
        "dark:hover:bg-gray-700"
      ),
      outline: cn(
        "border border-gray-300 bg-white/50 backdrop-blur-sm text-gray-700 shadow-sm",
        "hover:bg-gray-50 hover:border-gray-400 hover:shadow-md",
        "dark:border-gray-600 dark:bg-gray-900/50 dark:text-gray-300",
        "dark:hover:bg-gray-800/50 dark:hover:border-gray-500"
      ),
      ghost: cn(
        "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
        "dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
      ),
      link: "text-blue-600 underline-offset-4 hover:underline dark:text-blue-400",
      destructive: cn(
        "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg",
        "hover:from-red-600 hover:to-red-700 hover:shadow-xl hover:shadow-red-500/25"
      ),
    };

    const sizes = {
      default: "h-12 px-6 py-3",
      sm: "h-9 rounded-md px-4 text-sm",
      lg: "h-14 rounded-xl px-8 text-lg",
      icon: "h-12 w-12",
    };

    return (
      <motion.button
        ref={ref}
        className={cn(
          // Base styles
          "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
          "dark:focus:ring-offset-gray-900",
          // Disabled state
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
          // Variants and sizes
          variants[variant],
          sizes[size],
          className
        )}
        disabled={disabled}
        whileHover={!disabled ? { scale: 1.02 } : {}}
        whileTap={!disabled ? { scale: 0.98 } : {}}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export { Button };
