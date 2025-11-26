import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "safe" | "attention" | "danger";
  label?: string;
  className?: string;
}

export const StatusBadge = ({ status, label, className }: StatusBadgeProps) => {
  const statusConfig = {
    safe: {
      bg: "bg-safe",
      text: "text-safe-foreground",
      glow: "glow-safe",
      label: label || "Safe",
    },
    attention: {
      bg: "bg-warning",
      text: "text-warning-foreground",
      glow: "glow-warning",
      label: label || "Attention",
    },
    danger: {
      bg: "bg-destructive",
      text: "text-destructive-foreground",
      glow: "glow-danger pulse-glow",
      label: label || "Danger",
    },
  };

  const config = statusConfig[status];

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={cn(
        "inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm",
        config.bg,
        config.text,
        config.glow,
        className
      )}
    >
      <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
      {config.label}
    </motion.div>
  );
};
