import { Button } from "@/components/ui/Button";

const GlassButton = ({ children, className = "", ...props }) => {
  return (
    <Button
      {...props}
      className={`bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300 rounded-xl shadow-lg ${className}`}
    >
      {children}
    </Button>
  );
};

export default GlassButton;
