import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Brain, Tent, Sparkles, Shield, Zap, TrendingUp } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Brain,
      title: "Smart Edge AI",
      description: "YOLOv8-powered crop detection with real-time intelligence",
    },
    {
      icon: Tent,
      title: "Cold Storage Tent",
      description: "Portable micro cold storage optimized for rural farmers",
    },
    {
      icon: Shield,
      title: "Risk Prevention",
      description: "24/7 monitoring with instant spoilage alerts",
    },
    {
      icon: Zap,
      title: "IoT Sensors",
      description: "Temperature, humidity, and ethylene tracking",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-background">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${heroBackground})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background" />
        </div>

        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-secondary rounded-full opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-8">
              <Sparkles className="w-4 h-4 text-secondary" />
              <span className="text-sm text-secondary font-medium">AI-Powered Cold Storage Intelligence</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-secondary to-accent bg-clip-text text-transparent"
          >
            Sookshma Smart Edge
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto"
          >
            Micro cold storage intelligence for Bharat farmers. Preserve freshness, prevent waste, empower communities.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              onClick={() => navigate("/dashboard")}
              className="rounded-xl text-lg px-8 py-6 bg-secondary hover:bg-secondary/90 glow-safe"
            >
              Try Dashboard
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/tent")}
              className="rounded-xl text-lg px-8 py-6"
            >
              View Tent Model
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Two Components, One Solution
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Combining intelligent monitoring with portable cold storage
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card rounded-[20px] p-6 hover:scale-105 transition-all duration-300 floating"
                style={{ animationDelay: `${index * 0.5}s` }}
              >
                <div className="p-3 rounded-xl bg-secondary/20 w-fit mb-4">
                  <feature.icon className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-card rounded-[20px] p-12 text-center glow-safe"
          >
            <TrendingUp className="w-16 h-16 text-secondary mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-4">
              Ready to Transform Your Storage?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of farmers already using Sookshma Smart Edge to reduce waste and increase profits.
            </p>
            <Button
              size="lg"
              onClick={() => navigate("/farmer-dashboard")}
              className="rounded-xl text-lg px-8 py-6 bg-secondary hover:bg-secondary/90"
            >
              Get Started Today
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
