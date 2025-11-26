import { useState } from "react";
import { motion } from "framer-motion";
import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MetricCard } from "@/components/MetricCard";
import { Thermometer, Droplets, Wind, Package } from "lucide-react";
import { RiskAlertModal } from "@/components/RiskAlertModal";

const FarmerDashboard = () => {
  const [language, setLanguage] = useState<"en" | "te">("en");
  const [showAlert, setShowAlert] = useState(false);

  const translations = {
    en: {
      title: "Farmer Dashboard",
      subtitle: "Monitor your cold storage conditions",
      temperature: "Temperature",
      humidity: "Humidity",
      ethylene: "Ethylene",
      quantity: "Quantity",
      switchLanguage: "Switch to Telugu",
    },
    te: {
      title: "రైతు డాష్‌బోర్డ్",
      subtitle: "మీ చల్లని నిల్వ పరిస్థితులను పర్యవేక్షించండి",
      temperature: "ఉష్ణోగ్రత",
      humidity: "తేమ",
      ethylene: "ఇథిలీన్",
      quantity: "పరిమాణం",
      switchLanguage: "ఇంగ్లీష్‌కు మారండి",
    },
  };

  const t = translations[language];

  // Mock sensor data
  const metrics = [
    {
      icon: Thermometer,
      title: t.temperature,
      value: 4,
      unit: "°C",
      status: "safe" as const,
    },
    {
      icon: Droplets,
      title: t.humidity,
      value: 88,
      unit: "%",
      status: "safe" as const,
    },
    {
      icon: Wind,
      title: t.ethylene,
      value: 1.8,
      unit: "ppm",
      status: "attention" as const,
    },
    {
      icon: Package,
      title: t.quantity,
      value: 77,
      unit: "kg",
      status: "safe" as const,
    },
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-3">{t.title}</h1>
          <p className="text-muted-foreground text-lg mb-6">{t.subtitle}</p>
          
          <Button
            onClick={() => setLanguage(language === "en" ? "te" : "en")}
            variant="outline"
            className="rounded-xl"
          >
            <Languages className="w-4 h-4 mr-2" />
            {t.switchLanguage}
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {metrics.map((metric, index) => (
            <MetricCard
              key={metric.title}
              icon={metric.icon}
              title={metric.title}
              value={metric.value}
              unit={metric.unit}
              status={metric.status}
              delay={index * 0.1}
              large
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <Button
            onClick={() => setShowAlert(true)}
            variant="outline"
            className="rounded-xl"
          >
            Test Alert
          </Button>
        </motion.div>
      </div>

      <RiskAlertModal
        isOpen={showAlert}
        onClose={() => setShowAlert(false)}
        onShowInstructions={() => {
          setShowAlert(false);
          alert("Instructions would be shown here");
        }}
      />
    </div>
  );
};

export default FarmerDashboard;
