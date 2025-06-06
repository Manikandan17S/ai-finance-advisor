import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronRight, 
  TrendingUp, 
  LineChart, 
  BrainCircuit, 
  Sparkles
} from 'lucide-react';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <BrainCircuit size={24} className="text-primary" />,
      title: "AI Financial Advisor",
      description: "Our AI analyzes your spending habits and suggests optimizations to help you save more."
    },
    {
      icon: <LineChart size={24} className="text-secondary" />,
      title: "Advanced Analytics",
      description: "Interactive visualizations of your financial data with predictive insights."
    },
    {
      icon: <TrendingUp size={24} className="text-accent" />,
      title: "Investment Trends",
      description: "Get real-time market analysis and personalized investment recommendations."
    },
    {
      icon: <Sparkles size={24} className="text-warning" />,
      title: "Smart Budgeting",
      description: "Automated budget creation based on your financial goals and spending patterns."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
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
    <div className="min-h-full container mx-auto">
      {/* Hero Section */}
      <motion.div 
        className="mb-12 relative overflow-hidden rounded-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12">
          <div className="max-w-3xl">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              The Future of Finance is Here
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Experience the next generation of financial management with AI-powered insights, predictive analytics, and personalized recommendations.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <button 
                onClick={() => navigate('/dashboard')}
                className="btn btn-primary"
              >
                Get Started <ChevronRight size={18} />
              </button>
              <button 
                onClick={() => navigate('/chat')}
                className="btn btn-outline"
              >
                Ask AI Assistant
              </button>
            </motion.div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/30 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-secondary/30 rounded-full blur-3xl opacity-30"></div>
      </motion.div>

      {/* Features Section */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {features.map((feature, index) => (
          <motion.div 
            key={index}
            className="card p-6"
            variants={itemVariants}
          >
            <div className="mb-4 p-3 w-fit rounded-lg bg-white/5">
              {feature.icon}
            </div>
            <h3 className="text-xl font-display font-medium mb-2">{feature.title}</h3>
            <p className="text-white/70">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA Section */}
      <motion.div 
        className="card p-8 text-center bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <h2 className="text-2xl font-display font-bold mb-4">Ready to Transform Your Financial Future?</h2>
        <p className="text-white/70 mb-6 max-w-2xl mx-auto">
          Join thousands of forward-thinking individuals who are already experiencing the benefits of AI-powered financial management.
        </p>
        <button 
          onClick={() => navigate('/dashboard')}
          className="btn btn-primary mx-auto"
        >
          Explore Dashboard
        </button>
      </motion.div>
    </div>
  );
};

export default Home;