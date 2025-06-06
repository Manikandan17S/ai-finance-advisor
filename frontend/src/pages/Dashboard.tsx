import { BrainCircuit } from "lucide-react";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer 
} from 'recharts';
import { 
  ArrowUpCircle, 
  ArrowDownCircle, 
  Wallet,
  TrendingUp,
  Calendar,
  CreditCard,
  ShoppingBag,
  Home as HomeIcon,
  Car,
  Utensils,
  Zap
} from 'lucide-react';

import { mockData } from '../utils/mockData';

const Dashboard: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'year'>('month');
  
  const { 
    balanceData, 
    incomeExpenseData, 
    spendingByCategory,
    savingsData,
    transactionHistory
  } = mockData;

  const timeframeData = {
    week: balanceData.slice(-7),
    month: balanceData,
    year: balanceData.flatMap(item => Array(3).fill(item))
  };

  const COLORS = ['#5865F2', '#FF6BED', '#79DAE8', '#38E54D', '#FFB92E', '#FC5454'];
  
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
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl font-display font-bold mb-2">Financial Dashboard</h1>
          <p className="text-white/60">Your financial overview and insights</p>
        </motion.div>
        
        <motion.div 
          className="flex gap-2 mt-4 md:mt-0 p-1 bg-card/40 backdrop-blur-sm rounded-lg border border-white/5"
          variants={itemVariants}
        >
          {(['week', 'month', 'year'] as const).map(period => (
            <button
              key={period}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                timeframe === period 
                  ? 'bg-primary text-white shadow-md shadow-primary/20' 
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
              onClick={() => setTimeframe(period)}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </motion.div>
      </div>
      
      {/* Stats Overview */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        variants={containerVariants}
      >
        <motion.div className="card p-6" variants={itemVariants}>
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-white/60 text-sm">Total Balance</p>
              <h3 className="text-2xl font-bold">$184,593.21</h3>
            </div>
            <div className="p-2 rounded-lg bg-primary/20 text-primary">
              <Wallet size={20} />
            </div>
          </div>
          <div className="flex items-center text-success text-sm">
            <ArrowUpCircle size={16} className="mr-1" />
            <span>+3.2% from last month</span>
          </div>
        </motion.div>
        
        <motion.div className="card p-6" variants={itemVariants}>
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-white/60 text-sm">Monthly Income</p>
              <h3 className="text-2xl font-bold">$42,567.89</h3>
            </div>
            <div className="p-2 rounded-lg bg-success/20 text-success">
              <ArrowUpCircle size={20} />
            </div>
          </div>
          <div className="flex items-center text-success text-sm">
            <ArrowUpCircle size={16} className="mr-1" />
            <span>+1.8% from last month</span>
          </div>
        </motion.div>
        
        <motion.div className="card p-6" variants={itemVariants}>
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-white/60 text-sm">Monthly Expenses</p>
              <h3 className="text-2xl font-bold">$18,453.32</h3>
            </div>
            <div className="p-2 rounded-lg bg-error/20 text-error">
              <ArrowDownCircle size={20} />
            </div>
          </div>
          <div className="flex items-center text-error text-sm">
            <ArrowUpCircle size={16} className="mr-1" />
            <span>+2.4% from last month</span>
          </div>
        </motion.div>
        
        <motion.div className="card p-6" variants={itemVariants}>
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-white/60 text-sm">Investments</p>
              <h3 className="text-2xl font-bold">$87,293.45</h3>
            </div>
            <div className="p-2 rounded-lg bg-secondary/20 text-secondary">
              <TrendingUp size={20} />
            </div>
          </div>
          <div className="flex items-center text-success text-sm">
            <ArrowUpCircle size={16} className="mr-1" />
            <span>+12.7% total return</span>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <motion.div className="card p-6" variants={itemVariants}>
          <h3 className="font-display text-lg font-medium mb-6">Balance Overview</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={timeframeData[timeframe]}
                margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="rgb(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="rgb(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
                  axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                />
                <YAxis 
                  tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
                  axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(22, 27, 34, 0.9)', 
                    borderColor: 'rgba(255,255,255,0.1)',
                    color: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
                  }} 
                  labelStyle={{ color: 'white' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="balance" 
                  stroke="rgb(var(--primary))" 
                  fillOpacity={1} 
                  fill="url(#colorBalance)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
        
        <motion.div className="card p-6" variants={itemVariants}>
          <h3 className="font-display text-lg font-medium mb-6">Income vs Expenses</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={incomeExpenseData}
                margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
                  axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                />
                <YAxis 
                  tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
                  axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(22, 27, 34, 0.9)', 
                    borderColor: 'rgba(255,255,255,0.1)',
                    color: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
                  }} 
                  labelStyle={{ color: 'white' }}
                />
                <Legend 
                  wrapperStyle={{ color: 'rgba(255,255,255,0.6)', fontSize: 12 }}
                />
                <Bar dataKey="income" fill="rgb(var(--success))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expenses" fill="rgb(var(--error))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
      
      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <motion.div className="card p-6 lg:col-span-2" variants={itemVariants}>
          <h3 className="font-display text-lg font-medium mb-6">Savings Forecast</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={savingsData}
                margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
                  axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                />
                <YAxis 
                  tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
                  axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(22, 27, 34, 0.9)', 
                    borderColor: 'rgba(255,255,255,0.1)',
                    color: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
                  }} 
                  labelStyle={{ color: 'white' }}
                />
                <Legend 
                  wrapperStyle={{ color: 'rgba(255,255,255,0.6)', fontSize: 12 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="rgb(var(--primary))" 
                  strokeWidth={2}
                  dot={{ r: 4, fill: 'rgb(var(--primary))' }}
                  activeDot={{ r: 6, fill: 'rgb(var(--primary))' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="projected" 
                  stroke="rgb(var(--secondary))" 
                  strokeDasharray="5 5" 
                  strokeWidth={2}
                  dot={{ r: 4, fill: 'rgb(var(--secondary))' }}
                  activeDot={{ r: 6, fill: 'rgb(var(--secondary))' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
        
        <motion.div className="card p-6" variants={itemVariants}>
          <h3 className="font-display text-lg font-medium mb-6">Spending by Category</h3>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={spendingByCategory}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {spendingByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(22, 27, 34, 0.9)', 
                    borderColor: 'rgba(255,255,255,0.1)',
                    color: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
                  }} 
                  formatter={(value, name) => [`$${value}`, name]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
      
      {/* Recent Transactions */}
      <motion.div className="card p-6 mb-8" variants={itemVariants}>
        <h3 className="font-display text-lg font-medium mb-6">Recent Transactions</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-white/60 font-medium">Date</th>
                <th className="text-left py-3 px-4 text-white/60 font-medium">Description</th>
                <th className="text-left py-3 px-4 text-white/60 font-medium">Category</th>
                <th className="text-right py-3 px-4 text-white/60 font-medium">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactionHistory.map((transaction, index) => {
                const iconMap: Record<string, React.ReactNode> = {
                  'Shopping': <ShoppingBag size={16} />,
                  'Food': <Utensils size={16} />,
                  'Housing': <HomeIcon size={16} />,
                  'Transportation': <Car size={16} />,
                  'Utilities': <Zap size={16} />,
                  'Income': <Wallet size={16} />,
                };
                
                const icon = iconMap[transaction.category] || <CreditCard size={16} />;
                
                return (
                  <tr key={index} className="border-b border-white/5 hover:bg-white/5">
                    <td className="py-3 px-4 text-sm">
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-2 text-white/40" />
                        {transaction.date}
                      </div>
                    </td>
                    <td className="py-3 px-4 font-medium">{transaction.description}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <span className="p-1 rounded-md mr-2 bg-white/10">
                          {icon}
                        </span>
                        <span className="text-sm">{transaction.category}</span>
                      </div>
                    </td>
                    <td className={`py-3 px-4 text-right font-medium ${
                      transaction.amount < 0 ? 'text-error' : 'text-success'
                    }`}>
                      {transaction.amount < 0 ? '-' : '+'}${Math.abs(transaction.amount).toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
      
      {/* AI Insights */}
      <motion.div 
        className="card p-6 border-primary/20 bg-gradient-to-r from-primary/10 to-transparent"
        variants={itemVariants}
      >
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-primary/20 text-primary">
            <BrainCircuit size={24} />
          </div>
          <div>
            <h3 className="font-display text-lg font-medium mb-2">AI Financial Insights</h3>
            <p className="text-white/70 mb-4">
              Based on your spending habits, you could save up to <span className="text-success font-medium">$432.19</span> next month by optimizing your dining expenses. Your investment portfolio is outperforming the market by <span className="text-success font-medium">8.3%</span>.
            </p>
            <button className="btn btn-primary text-sm py-2">
              View Detailed Analysis
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;