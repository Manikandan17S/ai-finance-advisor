import React from 'react';
import { motion } from 'framer-motion';
import { Rocket } from 'lucide-react';


interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

interface SidebarProps {
  navItems: NavItem[];
  currentPath: string;
  onNavigate: (path: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ navItems, currentPath, onNavigate }) => {
  return (
    <div className="h-screen w-64 bg-card/40 backdrop-blur-lg border-r border-white/5 flex flex-col">
      {/* Logo area */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
          <Rocket size={24} className="text-white" />
        </div>
        <div>
          <h1 className="text-lg font-display font-bold tracking-wider bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
           TechVault AI
          </h1>
          <p className="text-xs text-white/60">Finance Assistant</p>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => onNavigate(item.path)}
            className="relative w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 group"
          >
            {currentPath === item.path && (
              <motion.div
                layoutId="activeNavHighlight"
                className="absolute inset-0 bg-primary/20 rounded-lg border border-primary/30"
                initial={false}
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            <span className={`relative z-10 ${
              currentPath === item.path 
                ? 'text-white' 
                : 'text-white/60 group-hover:text-white'
            }`}>
              {item.icon}
            </span>
            <span className={`relative z-10 ${
              currentPath === item.path 
                ? 'text-white' 
                : 'text-white/60 group-hover:text-white'
            }`}>
              {item.label}
            </span>
          </button>
        ))}
      </nav>
      
      {/* Footer */}
      <div className="p-4 border-t border-white/5">
        <div className="p-4 rounded-lg bg-card/60 border border-white/5">
          <p className="text-xs text-white/60 mb-2">AI System Status</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <p className="text-xs font-medium">Online</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;