import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";
import { Button } from "./ui/button";

interface RiskAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowInstructions?: () => void;
}

export const RiskAlertModal = ({
  isOpen,
  onClose,
  onShowInstructions,
}: RiskAlertModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="glass-card glow-danger pulse-glow rounded-[20px] p-8 max-w-md w-full mx-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex flex-col items-center text-center">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="mb-6 p-4 rounded-full bg-destructive/20"
              >
                <AlertTriangle className="w-16 h-16 text-destructive" />
              </motion.div>

              <h2 className="text-3xl font-bold mb-3 text-foreground">
                High Spoilage Risk Detected
              </h2>
              
              <p className="text-muted-foreground mb-8 text-lg">
                Immediate action required to prevent produce damage. Please review the current conditions and take corrective measures.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <Button
                  onClick={onClose}
                  variant="outline"
                  className="flex-1 rounded-xl h-12"
                >
                  Acknowledge
                </Button>
                {onShowInstructions && (
                  <Button
                    onClick={onShowInstructions}
                    className="flex-1 rounded-xl h-12 bg-destructive hover:bg-destructive/90"
                  >
                    Show Instructions
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
