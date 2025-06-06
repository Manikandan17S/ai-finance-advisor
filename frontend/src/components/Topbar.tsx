import React from 'react';
import { motion } from 'framer-motion';
import { Bell, User } from 'lucide-react';

const Topbar: React.FC = () => {
  const notifications = 3;

  return (
    <div className="h-16 border-b border-white/5 flex items-center justify-end px-6 bg-card/30 backdrop-blur-sm">
      <div className="flex items-center gap-6">
        {/* Notification bell */}
        <div className="relative">
          <button className="p-2 rounded-full hover:bg-white/5 transition-colors">
            <Bell size={20} className="text-white/70" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-error rounded-full text-[10px] font-medium">
                {notifications}
              </span>
            )}
          </button>
        </div>
        
        {/* User profile */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <p className="text-sm font-medium">Scottlang</p>
            <p className="text-xs text-white/60">Premium Member</p>
          </div>
          
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center cursor-pointer"
          >
            <User size={18} className="text-white" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;