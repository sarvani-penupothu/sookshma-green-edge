import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { StatusBadge } from "./StatusBadge";

interface MetricCardProps {
  icon: LucideIcon;
  title: string;
  value: string | number;
  unit?: string;
  status?: "safe" | "attention" | "danger";
  delay?: number;
  large?: boolean;
  className?: string;
}

export const MetricCard = ({
  icon: Icon,
  title,
  value,
  unit,
  status,
  delay = 0,
  large = false,
  className,
}: MetricCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className={cn(
        "glass-card rounded-[20px] p-6 hover:scale-105 transition-all duration-300",
        status && `glow-${status}`,
        className
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 rounded-xl bg-secondary/20">
          <Icon className={cn("text-secondary", large ? "w-8 h-8" : "w-6 h-6")} />
        </div>
        {status && <StatusBadge status={status} />}
      </div>
      
      <h3 className={cn(
        "text-muted-foreground mb-2",
        large ? "text-xl" : "text-sm"
      )}>
        {title}
      </h3>
      
      <div className="flex items-baseline gap-2">
        <span className={cn(
          "font-bold text-foreground",
          large ? "text-5xl" : "text-3xl"
        )}>
          {value}
        </span>
        {unit && (
          <span className={cn(
            "text-muted-foreground",
            large ? "text-2xl" : "text-xl"
          )}>
            {unit}
          </span>
        )}
      </div>
    </motion.div>
  );
};
