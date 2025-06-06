import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { 
  BrainCircuit, 
  LayoutDashboard, 
  MessageSquareText, 
  Settings,
  Menu,
  X
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { path: '/', label: 'Home', icon: <BrainCircuit size={20} /> },
  { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
  { path: '/chat', label: 'AI Chat', icon: <MessageSquareText size={20} /> },
  { path: '/settings', label: 'Settings', icon: <Settings size={20} /> },
];

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <div className="h-screen flex flex-col md:flex-row overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar 
          navItems={navItems} 
          currentPath={location.pathname}
          onNavigate={handleNavigation}
        />
      </div>

      {/* Mobile Menu Button */}
      <button 
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-full bg-card/80 backdrop-blur-sm border border-white/10"
        onClick={toggleMobileMenu}
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          className="fixed inset-0 bg-background/95 z-40 flex items-center justify-center md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <nav className="flex flex-col items-center gap-8 p-8">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`flex items-center gap-3 text-lg font-medium px-6 py-3 rounded-lg transition-all duration-300 ${
                  location.pathname === item.path
                    ? 'bg-primary/20 text-white glow'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>
        </motion.div>
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Layout;