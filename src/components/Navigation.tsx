import { motion } from "framer-motion";
import { Home, LayoutDashboard, Users, Tent } from "lucide-react";
import { NavLink } from "@/components/NavLink";

export const Navigation = () => {
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
          <NavLink to="/" className="flex items-center gap-2 cursor-pointer" activeClassName="">
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center">
                <span className="text-2xl">🌱</span>
              </div>
              <span className="text-xl font-bold">Sookshma</span>
            </motion.div>
          </NavLink>

          <div className="flex items-center gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end
                className="rounded-xl px-3 py-2 text-sm flex items-center gap-2 hover:bg-secondary/10 transition-colors"
                activeClassName="bg-secondary text-secondary-foreground glow-safe"
              >
                <item.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{item.label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};
