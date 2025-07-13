import { Card, CardContent } from "@/components/ui/Card.jsx";

const GlassCard = ({ children, className = "", ...props }) => {
  return (
    <Card
      {...props}
      className={`bg-white/10 backdrop-blur-lg border border-white/10 shadow-xl rounded-2xl p-4 ${className}`}
    >
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default GlassCard;
