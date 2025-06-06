import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Save,
  Lock,
  Bell,
  BarChart,
  Eye,
  EyeOff,
  CheckCircle,
  Sliders,
  CreditCard,
  BanknoteIcon,
  PiggyBank,
} from 'lucide-react';

interface AccountInfo {
  name: string;
  type: string;
  balance: number;
  connected: boolean;
  icon: React.ReactNode;
}

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showBalance, setShowBalance] = useState(true);
  
  const accounts: AccountInfo[] = [
    { 
      name: "QuantumBank",
      type: "Checking",
      balance: 12567.89,
      connected: true,
      icon: <CreditCard size={20} />
    },
    { 
      name: "Hyperion Investments",
      type: "Investment",
      balance: 78923.45,
      connected: true,
      icon: <BanknoteIcon size={20} />
    },
    { 
      name: "NeoSavings",
      type: "Savings",
      balance: 45321.67,
      connected: true,
      icon: <PiggyBank size={20} />
    },
  ];
  
  const notifications = [
    { id: 1, label: "Low balance alerts", enabled: true },
    { id: 2, label: "Unusual spending notifications", enabled: true },
    { id: 3, label: "Bill payment reminders", enabled: true },
    { id: 4, label: "Investment opportunities", enabled: false },
    { id: 5, label: "Weekly financial summaries", enabled: true },
  ];
  
  const dataPermissions = [
    { id: 1, label: "Spending pattern analysis", enabled: true },
    { id: 2, label: "Investment recommendations", enabled: true },
    { id: 3, label: "Credit score monitoring", enabled: false },
    { id: 4, label: "Third-party integration", enabled: false },
  ];
  
  const tabs = [
    { id: 'profile', label: 'Profile', icon: <Sliders size={18} /> },
    { id: 'accounts', label: 'Accounts', icon: <CreditCard size={18} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
    { id: 'privacy', label: 'Privacy', icon: <Lock size={18} /> },
    { id: 'preferences', label: 'Preferences', icon: <BarChart size={18} /> },
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  return (
    <motion.div 
      className="container mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-display font-bold mb-2">Settings</h1>
        <p className="text-white/60 mb-8">Manage your account preferences</p>
      </motion.div>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Tabs */}
        <motion.div 
          className="md:w-64 mb-6 md:mb-0"
          variants={itemVariants}
        >
          <div className="card p-2 bg-card/60">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-primary/20 text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>
        
        {/* Content */}
        <motion.div 
          className="flex-1 card p-6"
          variants={itemVariants}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-xl font-display font-bold mb-6">Profile Settings</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-white/70 text-sm mb-2">Display Name</label>
                      <input 
                        type="text" 
                        defaultValue="Elon Visionary"
                        className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                    <div>
                      <label className="block text-white/70 text-sm mb-2">Email Address</label>
                      <input 
                        type="email" 
                        defaultValue="elon@example.com"
                        className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                    <div>
                      <label className="block text-white/70 text-sm mb-2">Time Zone</label>
                      <select className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50">
                        <option>Pacific Time (GMT-8)</option>
                        <option>Eastern Time (GMT-5)</option>
                        <option>Central European Time (GMT+1)</option>
                        <option>Japan Standard Time (GMT+9)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-white/70 text-sm mb-2">Currency</label>
                      <select className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50">
                        <option>USD ($)</option>
                        <option>EUR (€)</option>
                        <option>GBP (£)</option>
                        <option>JPY (¥)</option>
                      </select>
                    </div>
                    <button className="btn btn-primary">
                      <Save size={18} className="mr-2" />
                      Save Changes
                    </button>
                  </div>
                </div>
              )}
              
              {activeTab === 'accounts' && (
                <div>
                  <h2 className="text-xl font-display font-bold mb-6">Linked Accounts</h2>
                  <div className="space-y-4">
                    {accounts.map((account, index) => (
                      <div 
                        key={index}
                        className="p-4 border border-white/10 rounded-lg bg-white/5 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                            {account.icon}
                          </div>
                          <div>
                            <h3 className="font-medium">{account.name}</h3>
                            <p className="text-sm text-white/60">{account.type}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-2 mb-1">
                            {showBalance ? (
                              <span className="font-bold">${account.balance.toLocaleString()}</span>
                            ) : (
                              <span className="font-bold">••••••</span>
                            )}
                            <button 
                              onClick={() => setShowBalance(!showBalance)}
                              className="text-white/60 hover:text-white"
                            >
                              {showBalance ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-success">
                            <CheckCircle size={12} />
                            <span>Connected</span>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <button className="btn btn-outline w-full mt-4">
                      <CreditCard size={18} className="mr-2" />
                      Connect New Account
                    </button>
                  </div>
                </div>
              )}
              
              {activeTab === 'notifications' && (
                <div>
                  <h2 className="text-xl font-display font-bold mb-6">Notification Preferences</h2>
                  <div className="space-y-4">
                    {notifications.map((notification) => (
                      <div 
                        key={notification.id}
                        className="p-4 border border-white/10 rounded-lg bg-white/5 flex items-center justify-between"
                      >
                        <div>
                          <h3 className="font-medium">{notification.label}</h3>
                        </div>
                        <div>
                          <div className="relative inline-block w-12 h-6 rounded-full bg-white/10">
                            <input 
                              type="checkbox" 
                              id={`notification-${notification.id}`}
                              className="sr-only"
                              defaultChecked={notification.enabled}
                            />
                            <label 
                              htmlFor={`notification-${notification.id}`}
                              className={`absolute left-0 top-0 block w-12 h-6 rounded-full cursor-pointer transition-colors duration-300 ${
                                notification.enabled ? 'bg-primary' : 'bg-white/10'
                              }`}
                            >
                              <span 
                                className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
                                  notification.enabled ? 'translate-x-6' : ''
                                }`}
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {activeTab === 'privacy' && (
                <div>
                  <h2 className="text-xl font-display font-bold mb-6">Privacy & Data</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Data Permissions</h3>
                      <div className="space-y-4">
                        {dataPermissions.map((permission) => (
                          <div 
                            key={permission.id}
                            className="p-4 border border-white/10 rounded-lg bg-white/5 flex items-center justify-between"
                          >
                            <div>
                              <h3 className="font-medium">{permission.label}</h3>
                            </div>
                            <div>
                              <div className="relative inline-block w-12 h-6 rounded-full bg-white/10">
                                <input 
                                  type="checkbox" 
                                  id={`permission-${permission.id}`}
                                  className="sr-only"
                                  defaultChecked={permission.enabled}
                                />
                                <label 
                                  htmlFor={`permission-${permission.id}`}
                                  className={`absolute left-0 top-0 block w-12 h-6 rounded-full cursor-pointer transition-colors duration-300 ${
                                    permission.enabled ? 'bg-primary' : 'bg-white/10'
                                  }`}
                                >
                                  <span 
                                    className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
                                      permission.enabled ? 'translate-x-6' : ''
                                    }`}
                                  />
                                </label>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Data Management</h3>
                      <div className="space-y-4">
                        <button className="btn btn-outline w-full">
                          Download My Data
                        </button>
                        <button className="btn btn-outline border-error/30 text-error hover:bg-error/10 w-full">
                          Delete Account Data
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'preferences' && (
                <div>
                  <h2 className="text-xl font-display font-bold mb-6">Display Preferences</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-white/70 text-sm mb-2">Chart Style</label>
                      <select className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50">
                        <option>Futuristic</option>
                        <option>Minimal</option>
                        <option>Classic</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-white/70 text-sm mb-2">Default Dashboard View</label>
                      <select className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50">
                        <option>Monthly Overview</option>
                        <option>Investment Performance</option>
                        <option>Spending Analysis</option>
                        <option>Budget Tracking</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-white/70 text-sm mb-2">Color Theme</label>
                      <div className="grid grid-cols-4 gap-3 mt-2">
                        <button className="aspect-square rounded-lg bg-gradient-to-br from-[#5865F2] to-[#79DAE8] p-1 ring-2 ring-white ring-offset-2 ring-offset-background">
                          <span className="sr-only">Default</span>
                        </button>
                        <button className="aspect-square rounded-lg bg-gradient-to-br from-[#FF6BED] to-[#FFB92E] p-1">
                          <span className="sr-only">Sunset</span>
                        </button>
                        <button className="aspect-square rounded-lg bg-gradient-to-br from-[#38E54D] to-[#38B6FF] p-1">
                          <span className="sr-only">Nature</span>
                        </button>
                        <button className="aspect-square rounded-lg bg-gradient-to-br from-[#7D5FFF] to-[#FF5757] p-1">
                          <span className="sr-only">Vibrant</span>
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-white/70 text-sm">Enable Animations</label>
                        <div className="relative inline-block w-12 h-6 rounded-full bg-white/10">
                          <input 
                            type="checkbox" 
                            id="animations"
                            className="sr-only"
                            defaultChecked={true}
                          />
                          <label 
                            htmlFor="animations"
                            className="absolute left-0 top-0 block w-12 h-6 rounded-full cursor-pointer bg-primary"
                          >
                            <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full translate-x-6" />
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    <button className="btn btn-primary">
                      <Save size={18} className="mr-2" />
                      Save Preferences
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
};

const AnimatePresence: React.FC<{
  children: React.ReactNode;
  mode?: 'sync' | 'wait' | 'popLayout';
}> = ({ children }) => {
  return <>{children}</>;
};

export default Settings;