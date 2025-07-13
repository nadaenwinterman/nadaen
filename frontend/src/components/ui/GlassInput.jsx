import { Input } from "@/components/ui/Input";

const GlassInput = ({ className = "", ...props }) => {
  return (
    <Input
      {...props}
      className={`bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/60 rounded-lg px-4 py-2 ${className}`}
    />
  );
};

export default GlassInput;
