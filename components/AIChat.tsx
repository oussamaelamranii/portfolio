import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Send, X, Minus, Maximize2, ChevronRight } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { useSound } from './SoundController';
import { useAchievements } from './Achievements';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
}

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'bot', text: "> SYSTEM ONLINE.\n> I am Oussama's virtual assistant.\n> Query me regarding skills, experience, or projects." }
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { playClick, playHover } = useSound();
  const { unlockAchievement } = useAchievements();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleChat = () => {
    playClick();
    const newState = !isOpen;
    setIsOpen(newState);
    if (newState) {
        unlockAchievement('HACKER');
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    playClick(); // Typing sound for send
    const userMessage: Message = { id: Date.now().toString(), sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsThinking(true);

    const responseText = await sendMessageToGemini(input);
    
    setIsThinking(false);
    // Clean formatting slightly for terminal look
    setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), sender: 'bot', text: `> ${responseText}` }]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Trigger Button - Retro Terminal Icon */}
      <motion.button
        onClick={toggleChat}
        onMouseEnter={playHover}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-lg shadow-[0_0_20px_rgba(16,185,129,0.3)] bg-black border border-green-500/50 text-green-500 ${isOpen ? 'hidden' : 'flex'} items-center gap-2 group hover:bg-green-900/20 transition-colors`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Terminal size={20} />
        <span className="font-mono text-sm hidden md:inline font-bold animate-pulse">_TERMINAL_ACCESS</span>
      </motion.button>

      {/* Chat Window - Terminal Style */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-6 right-4 md:right-6 z-50 w-[95vw] md:w-[450px] h-[600px] bg-black/95 border border-green-500/30 rounded-lg shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl font-mono"
          >
            {/* Terminal Header */}
            <div className="bg-slate-900/80 p-2 border-b border-green-500/30 flex justify-between items-center cursor-move">
              <div className="flex items-center gap-2 px-2">
                <Terminal size={14} className="text-green-500" />
                <span className="text-xs text-green-500/80 font-bold">root@oussama-portfolio:~</span>
              </div>
              <div className="flex items-center gap-2">
                 <button className="hover:text-green-400 text-slate-500 transition-colors"><Minus size={14} /></button>
                 <button className="hover:text-green-400 text-slate-500 transition-colors"><Maximize2 size={12} /></button>
                 <button onClick={toggleChat} className="hover:text-red-500 text-slate-500 transition-colors"><X size={14} /></button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/50 scrollbar-thin scrollbar-thumb-green-900 scrollbar-track-black">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-center gap-2 mb-1">
                     <span className="text-[10px] text-slate-500 uppercase">{msg.sender === 'user' ? 'GUEST' : 'SYSTEM'}</span>
                     <span className="text-[10px] text-slate-600">{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                  </div>
                  <div
                    className={`max-w-[90%] p-3 text-sm rounded border ${
                      msg.sender === 'user'
                        ? 'bg-slate-900 border-slate-700 text-slate-300'
                        : 'bg-green-900/10 border-green-500/20 text-green-400'
                    }`}
                  >
                     {msg.text.split('\n').map((line, i) => (
                        <React.Fragment key={i}>
                            {line}
                            {i !== msg.text.split('\n').length - 1 && <br />}
                        </React.Fragment>
                    ))}
                  </div>
                </div>
              ))}
              
              {isThinking && (
                <div className="flex items-center gap-2 text-green-500/50 text-xs animate-pulse">
                   <ChevronRight size={12} />
                   <span>PROCESSING_REQUEST...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 bg-black border-t border-green-500/30">
              <div className="flex items-center gap-2 bg-slate-900/50 border border-green-500/20 rounded px-3 py-2 focus-within:border-green-500/50 transition-colors">
                <span className="text-green-500 animate-pulse">➜</span>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter command..."
                  className="flex-1 bg-transparent border-none outline-none text-green-400 placeholder-green-500/20 text-sm font-mono"
                  autoFocus
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isThinking}
                  className="text-green-500 hover:text-green-400 disabled:opacity-30 transition-colors"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChat;