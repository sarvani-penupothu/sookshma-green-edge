import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Loader2, Apple, Carrot, Grape, Banana, Cherry, Citrus, Leaf, Package, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";
import { Thermometer, Droplets, Wind } from "lucide-react";
import { toast } from "sonner";

interface DetectionResult {
  crop: string;
  icon: typeof Apple;
  temperature: { value: number; status: "safe" | "attention" | "danger" };
  humidity: { value: number; status: "safe" | "attention" | "danger" };
  ethylene: { value: number; status: "safe" | "attention" | "danger" };
  quantity: number;
  confidence: number;
}

const cropDatabase = [
  { name: "Apples", icon: Apple, temp: [0, 4], humidity: [90, 95], ethylene: [0.4, 1.0] },
  { name: "Bananas", icon: Banana, temp: [13, 15], humidity: [90, 95], ethylene: [10, 100] },
  { name: "Grapes", icon: Grape, temp: [-1, 0], humidity: [90, 95], ethylene: [0.2, 0.5] },
  { name: "Carrots", icon: Carrot, temp: [0, 1], humidity: [95, 100], ethylene: [0.5, 1.5] },
  { name: "Cherries", icon: Cherry, temp: [-1, 0], humidity: [90, 95], ethylene: [0.5, 2.0] },
  { name: "Citrus", icon: Citrus, temp: [3, 8], humidity: [85, 90], ethylene: [0.1, 0.3] },
  { name: "Leafy Greens", icon: Leaf, temp: [0, 2], humidity: [95, 100], ethylene: [0.5, 1.0] },
];

const Dashboard = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [detectionResults, setDetectionResults] = useState<DetectionResult[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

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
    if (!file.type.startsWith('image/')) {
      toast.error("Please upload a valid image file");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image size should be less than 10MB");
      return;
    }

    // Create image preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    setIsProcessing(true);
    setDetectionResults([]);
    
    // Simulate realistic YOLO processing with variable time
    const processingTime = 1500 + Math.random() * 1500;
    
    setTimeout(() => {
      // Random number of crops detected (1-4)
      const numCrops = Math.floor(Math.random() * 3) + 1;
      const selectedCrops = [...cropDatabase]
        .sort(() => Math.random() - 0.5)
        .slice(0, numCrops);

      const results: DetectionResult[] = selectedCrops.map(crop => {
        const tempRange = crop.temp;
        const actualTemp = tempRange[0] + Math.random() * (tempRange[1] - tempRange[0]);
        const tempVariance = (Math.random() - 0.5) * 4;
        const measuredTemp = actualTemp + tempVariance;
        
        const humidityRange = crop.humidity;
        const actualHumidity = humidityRange[0] + Math.random() * (humidityRange[1] - humidityRange[0]);
        const humidityVariance = (Math.random() - 0.5) * 10;
        const measuredHumidity = Math.min(100, Math.max(0, actualHumidity + humidityVariance));

        const ethyleneRange = crop.ethylene;
        const actualEthylene = ethyleneRange[0] + Math.random() * (ethyleneRange[1] - ethyleneRange[0]);
        const ethyleneVariance = (Math.random() - 0.5) * 2;
        const measuredEthylene = Math.max(0, actualEthylene + ethyleneVariance);

        const getTempStatus = (temp: number): "safe" | "attention" | "danger" => {
          const deviation = Math.abs(temp - actualTemp);
          if (deviation < 2) return "safe";
          if (deviation < 4) return "attention";
          return "danger";
        };

        const getHumidityStatus = (humidity: number): "safe" | "attention" | "danger" => {
          const deviation = Math.abs(humidity - actualHumidity);
          if (deviation < 5) return "safe";
          if (deviation < 10) return "attention";
          return "danger";
        };

        const getEthyleneStatus = (ethylene: number): "safe" | "attention" | "danger" => {
          const deviation = Math.abs(ethylene - actualEthylene);
          if (deviation < 1) return "safe";
          if (deviation < 2) return "attention";
          return "danger";
        };

        return {
          crop: crop.name,
          icon: crop.icon,
          temperature: { 
            value: Math.round(measuredTemp * 10) / 10, 
            status: getTempStatus(measuredTemp) 
          },
          humidity: { 
            value: Math.round(measuredHumidity), 
            status: getHumidityStatus(measuredHumidity) 
          },
          ethylene: { 
            value: Math.round(measuredEthylene * 10) / 10, 
            status: getEthyleneStatus(measuredEthylene) 
          },
          quantity: Math.floor(Math.random() * 80) + 20,
          confidence: Math.round((0.85 + Math.random() * 0.14) * 100)
        };
      });
      
      setDetectionResults(results);
      setIsProcessing(false);
      toast.success(`Detected ${results.length} crop type${results.length > 1 ? 's' : ''} successfully!`);
    }, processingTime);
  };

  const handleClearResults = () => {
    setDetectionResults([]);
    setUploadedImage(null);
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
              className={`glass-card rounded-[20px] overflow-hidden border-2 border-dashed transition-all duration-300 ${
                dragActive ? "border-secondary glow-safe" : "border-border"
              }`}
            >
              <AnimatePresence mode="wait">
                {uploadedImage ? (
                  <motion.div
                    key="image-preview"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative"
                  >
                    <img 
                      src={uploadedImage} 
                      alt="Uploaded produce" 
                      className="w-full h-[400px] object-cover"
                    />
                    {isProcessing && (
                      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center">
                        <Loader2 className="w-16 h-16 text-secondary animate-spin mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Analyzing Image...</h3>
                        <p className="text-muted-foreground">Running YOLOv8 detection model</p>
                        <div className="mt-4 w-48 h-1 bg-secondary/20 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-secondary"
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                          />
                        </div>
                      </div>
                    )}
                    {!isProcessing && detectionResults.length > 0 && (
                      <div className="absolute top-4 right-4">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={handleClearResults}
                          className="rounded-xl"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Clear
                        </Button>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="upload-prompt"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center"
                  >
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Upload className="w-16 h-16 text-secondary mb-4" />
                    </motion.div>
                    <h3 className="text-xl font-semibold mb-2">
                      Upload Produce Image
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Drag and drop your image here, or click to browse
                    </p>
                    <p className="text-xs text-muted-foreground mb-6">
                      Supports: JPG, PNG, WEBP • Max size: 10MB
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
                  </motion.div>
                )}
              </AnimatePresence>
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
                          Quantity: {result.quantity} kg • Confidence: {result.confidence}%
                        </p>
                      </div>
                    </div>
                    <StatusBadge 
                      status={
                        result.temperature.status === "danger" || 
                        result.humidity.status === "danger" || 
                        result.ethylene.status === "danger" 
                          ? "danger" 
                          : result.temperature.status === "attention" || 
                            result.humidity.status === "attention" || 
                            result.ethylene.status === "attention"
                          ? "attention"
                          : "safe"
                      } 
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className={`bg-background/50 rounded-xl p-3 transition-all ${
                      result.temperature.status === "danger" ? "glow-danger" : 
                      result.temperature.status === "attention" ? "glow-warning" : ""
                    }`}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <Thermometer className="w-4 h-4 text-secondary" />
                          <span className="text-xs text-muted-foreground">Temperature</span>
                        </div>
                        <span className={`w-2 h-2 rounded-full ${
                          result.temperature.status === "safe" ? "bg-safe" :
                          result.temperature.status === "attention" ? "bg-warning" :
                          "bg-destructive animate-pulse"
                        }`} />
                      </div>
                      <p className="text-lg font-semibold">{result.temperature.value}°C</p>
                    </div>
                    <div className={`bg-background/50 rounded-xl p-3 transition-all ${
                      result.humidity.status === "danger" ? "glow-danger" : 
                      result.humidity.status === "attention" ? "glow-warning" : ""
                    }`}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <Droplets className="w-4 h-4 text-secondary" />
                          <span className="text-xs text-muted-foreground">Humidity</span>
                        </div>
                        <span className={`w-2 h-2 rounded-full ${
                          result.humidity.status === "safe" ? "bg-safe" :
                          result.humidity.status === "attention" ? "bg-warning" :
                          "bg-destructive animate-pulse"
                        }`} />
                      </div>
                      <p className="text-lg font-semibold">{result.humidity.value}%</p>
                    </div>
                    <div className={`bg-background/50 rounded-xl p-3 col-span-2 transition-all ${
                      result.ethylene.status === "danger" ? "glow-danger" : 
                      result.ethylene.status === "attention" ? "glow-warning" : ""
                    }`}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <Wind className="w-4 h-4 text-secondary" />
                          <span className="text-xs text-muted-foreground">Ethylene Level</span>
                        </div>
                        <span className={`w-2 h-2 rounded-full ${
                          result.ethylene.status === "safe" ? "bg-safe" :
                          result.ethylene.status === "attention" ? "bg-warning" :
                          "bg-destructive animate-pulse"
                        }`} />
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
