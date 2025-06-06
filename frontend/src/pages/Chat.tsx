import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, CircleSlash, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const Chat: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI financial assistant. How can I help you today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const mockResponses: Record<string, string> = {
    'budget': "Based on your spending patterns, I recommend allocating 50% of your income to essentials, 30% to discretionary spending, and 20% to savings and investments. This would optimize your financial health while maintaining your lifestyle preferences.",
    'invest': "Looking at your risk profile and financial goals, I'd recommend a diversified ETF portfolio with 60% in broad market index funds, 20% in international markets, 15% in bonds, and 5% in emerging technologies. This balances growth potential with stability.",
    'spend': "Your highest spending categories last month were dining ($840), transportation ($560), and entertainment ($420). This represents a 15% increase in dining expenses compared to your 6-month average.",
    'save': "To increase your savings rate by 10%, consider: 1) Optimizing your subscription services to save $45/month, 2) Implementing meal planning to reduce food costs by $120/month, and 3) Refinancing your loans to save $85/month on interest payments.",
    'help': "I can help with budget planning, spending analysis, investment recommendations, savings strategies, and answering your financial questions. Just ask me anything related to your finances!"
  };

  const aiThinking = [
    "Analyzing financial patterns...",
    "Calculating optimal strategies...",
    "Processing market data...",
    "Evaluating investment options...",
    "Reviewing spending patterns..."
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (input.trim() === '') return;
    
    const newUserMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setInput('');
    setIsThinking(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      const lowerInput = input.toLowerCase();
      let responseText = "I'm not sure how to respond to that. Could you try asking about your budget, investments, spending, or savings?";
      
      Object.entries(mockResponses).forEach(([keyword, response]) => {
        if (lowerInput.includes(keyword)) {
          responseText = response;
        }
      });
      
      const newAiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, newAiMessage]);
      setIsThinking(false);
    }, 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const suggestedQuestions = [
    "How can I optimize my budget?",
    "What are good investment strategies for me?",
    "Where am I spending the most money?",
    "How can I save more effectively?"
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-white/5 bg-card/40 backdrop-blur-sm">
        <h1 className="text-xl font-display font-bold">AI Financial Assistant</h1>
        <p className="text-sm text-white/60">Ask me anything about your finances</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-3 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  message.sender === 'user' 
                    ? 'bg-secondary/20 text-secondary' 
                    : 'bg-primary/20 text-primary'
                }`}>
                  {message.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div className={`card p-4 ${
                  message.sender === 'user' 
                    ? 'bg-secondary/10 border-secondary/20' 
                    : 'bg-primary/10 border-primary/20'
                }`}>
                  <p className="text-white/90">{message.text}</p>
                  <p className="text-right text-xs text-white/40 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
          
          {isThinking && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex justify-start"
            >
              <div className="flex gap-3 max-w-[80%]">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                  <Bot size={16} />
                </div>
                <div className="card p-4 bg-primary/10 border-primary/20">
                  <p className="text-white/90">
                    {aiThinking[Math.floor(Math.random() * aiThinking.length)]}
                    <span className="inline-flex">
                      <span className="animate-[pulse_1s_infinite]">.</span>
                      <span className="animate-[pulse_1s_infinite_0.2s]">.</span>
                      <span className="animate-[pulse_1s_infinite_0.4s]">.</span>
                    </span>
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>
      
      {/* Suggested questions */}
      {messages.length < 3 && (
        <div className="px-4 py-3 border-t border-white/5 bg-card/20">
          <p className="text-sm text-white/60 mb-2">Suggested questions:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((question, index) => (
              <button
                key={index}
                className="px-3 py-2 text-sm bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                onClick={() => {
                  setInput(question);
                }}
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Input area */}
      <div className="p-4 border-t border-white/5 bg-card/40 backdrop-blur-sm">
        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a question about your finances..."
            className="w-full bg-card/60 backdrop-blur-sm border border-white/10 rounded-lg py-3 px-4 pr-12 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 resize-none"
            rows={3}
            disabled={isThinking}
          />
          <button
            onClick={handleSendMessage}
            disabled={input.trim() === '' || isThinking}
            className={`absolute right-3 bottom-3 p-2 rounded-lg transition-colors ${
              input.trim() === '' || isThinking
                ? 'bg-white/5 text-white/40 cursor-not-allowed'
                : 'bg-primary text-white hover:bg-primary-dark'
            }`}
          >
            <Send size={18} />
          </button>
        </div>
        <div className="flex items-center justify-between mt-2 text-xs text-white/40">
          <div className="flex items-center">
            <Sparkles size={14} className="mr-1" />
            <span>Powered by BoldAI</span>
          </div>
          <div className="flex items-center">
            <CircleSlash size={14} className="mr-1" />
            <span>Not financial advice</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;