import { motion } from "framer-motion";
import { Home, LayoutDashboard, Users, Tent } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "./ui/button";

export const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/farmer-dashboard", icon: Users, label: "Farmer View" },
    { path: "/tent", icon: Tent, label: "Tent" },
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/50"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center">
              <span className="text-2xl">🌱</span>
            </div>
            <span className="text-xl font-bold">Sookshma</span>
          </motion.div>

          <div className="flex items-center gap-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Button
                  key={item.path}
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  onClick={() => navigate(item.path)}
                  className={`rounded-xl ${isActive ? "glow-safe" : ""}`}
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};
