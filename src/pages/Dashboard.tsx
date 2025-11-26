import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, Loader2, Apple, Carrot, Grape } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MetricCard } from "@/components/MetricCard";
import { StatusBadge } from "@/components/StatusBadge";
import { Thermometer, Droplets, Wind, Package } from "lucide-react";
import { toast } from "sonner";

interface DetectionResult {
  crop: string;
  icon: typeof Apple;
  temperature: { value: number; status: "safe" | "attention" | "danger" };
  humidity: { value: number; status: "safe" | "attention" | "danger" };
  ethylene: { value: number; status: "safe" | "attention" | "danger" };
  quantity: number;
}

const Dashboard = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [detectionResults, setDetectionResults] = useState<DetectionResult[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileUpload = async (file: File) => {
    setIsProcessing(true);
    
    // Simulate YOLO processing
    setTimeout(() => {
      const mockResults: DetectionResult[] = [
        {
          crop: "Apples",
          icon: Apple,
          temperature: { value: 2, status: "safe" },
          humidity: { value: 90, status: "safe" },
          ethylene: { value: 0.5, status: "safe" },
          quantity: 45,
        },
        {
          crop: "Carrots",
          icon: Carrot,
          temperature: { value: 5, status: "attention" },
          humidity: { value: 85, status: "safe" },
          ethylene: { value: 1.2, status: "attention" },
          quantity: 32,
        },
      ];
      
      setDetectionResults(mockResults);
      setIsProcessing(false);
      toast.success("Image processed successfully!");
    }, 2000);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">Produce Intelligence Dashboard</h1>
          <p className="text-muted-foreground text-lg">
            Upload images for AI-powered crop detection and storage recommendations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`glass-card rounded-[20px] p-8 border-2 border-dashed transition-all duration-300 ${
                dragActive ? "border-secondary glow-safe" : "border-border"
              }`}
            >
              <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
                {isProcessing ? (
                  <>
                    <Loader2 className="w-16 h-16 text-secondary animate-spin mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Processing Image...</h3>
                    <p className="text-muted-foreground">
                      Running YOLOv8 detection model
                    </p>
                  </>
                ) : (
                  <>
                    <Upload className="w-16 h-16 text-secondary mb-4" />
                    <h3 className="text-xl font-semibold mb-2">
                      Upload Produce Image
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Drag and drop your image here, or click to browse
                    </p>
                    <input
                      type="file"
                      id="file-upload"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          handleFileUpload(e.target.files[0]);
                        }
                      }}
                    />
                    <Button
                      onClick={() => document.getElementById("file-upload")?.click()}
                      className="rounded-xl px-8"
                    >
                      Select Image
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {detectionResults.length === 0 ? (
              <div className="glass-card rounded-[20px] p-8 min-h-[400px] flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <Package className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">No results yet. Upload an image to begin.</p>
                </div>
              </div>
            ) : (
              detectionResults.map((result, index) => (
                <motion.div
                  key={result.crop}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card rounded-[20px] p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-xl bg-secondary/20">
                        <result.icon className="w-6 h-6 text-secondary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{result.crop}</h3>
                        <p className="text-sm text-muted-foreground">
                          Quantity: {result.quantity} kg
                        </p>
                      </div>
                    </div>
                    <StatusBadge status={result.temperature.status} />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-background/50 rounded-xl p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Thermometer className="w-4 h-4 text-secondary" />
                        <span className="text-xs text-muted-foreground">Temp</span>
                      </div>
                      <p className="text-lg font-semibold">{result.temperature.value}°C</p>
                    </div>
                    <div className="bg-background/50 rounded-xl p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Droplets className="w-4 h-4 text-secondary" />
                        <span className="text-xs text-muted-foreground">Humidity</span>
                      </div>
                      <p className="text-lg font-semibold">{result.humidity.value}%</p>
                    </div>
                    <div className="bg-background/50 rounded-xl p-3 col-span-2">
                      <div className="flex items-center gap-2 mb-1">
                        <Wind className="w-4 h-4 text-secondary" />
                        <span className="text-xs text-muted-foreground">Ethylene</span>
                      </div>
                      <p className="text-lg font-semibold">{result.ethylene.value} ppm</p>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
