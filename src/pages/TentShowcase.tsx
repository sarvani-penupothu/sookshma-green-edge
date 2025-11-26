import { motion } from "framer-motion";
import { Wind, Thermometer, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import tentShowcase from "@/assets/tent-showcase.jpg";

const TentShowcase = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Thermometer,
      title: "Advanced Cooling",
      description: "Maintains optimal temperature range for all produce types",
    },
    {
      icon: Wind,
      title: "Smart Airflow",
      description: "Intelligent ventilation system for uniform cooling",
    },
    {
      icon: Shield,
      title: "Insulation Layer",
      description: "Multi-layer insulation for maximum energy efficiency",
    },
    {
      icon: Zap,
      title: "IoT Integrated",
      description: "Real-time monitoring with Smart Edge AI brain",
    },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Cold Storage Tent
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Portable micro cold storage solution designed for rural farmers
          </p>
        </motion.div>

        {/* 3D Product Showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <div className="glass-card rounded-[20px] p-8 glow-safe floating">
            <motion.img
              src={tentShowcase}
              alt="Cold Storage Tent"
              className="w-full max-w-3xl mx-auto rounded-xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="glass-card rounded-[20px] p-6 hover:scale-105 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-secondary/20 flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="glass-card rounded-[20px] p-8 text-center mb-8"
        >
          <h2 className="text-3xl font-bold mb-4">
            How Smart Edge & Tent Work Together
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            The <span className="text-secondary font-semibold">Smart Edge AI brain</span> continuously monitors conditions inside the{" "}
            <span className="text-secondary font-semibold">Cold Storage Tent</span>, automatically adjusting temperature and humidity while alerting you to any risks. This intelligent system ensures your produce stays fresh longer with minimal manual intervention.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => navigate("/dashboard")}
              className="rounded-xl px-8"
            >
              View Dashboard
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/")}
              className="rounded-xl px-8"
            >
              Back to Home
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TentShowcase;
