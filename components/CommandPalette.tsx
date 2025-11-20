
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, ArrowRight, Home, FolderGit2, Terminal, Mail, Download } from 'lucide-react';
import { useSound } from './SoundController';
import { useAchievements } from './Achievements';
import { generateResumePDF } from '../services/pdfGenerator';

const CommandPalette: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { playClick, playHover, unlockAchievement } = useSound() as any; // Use loose typing to avoid context conflicts if context not updated
  const achievements = useAchievements();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
        if (!isOpen && achievements?.unlockAchievement) achievements.unlockAchievement('COMMANDER');
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, achievements]);

  const commands = [
    { 
      id: 'home', 
      label: 'Go to Home', 
      icon: Home, 
      action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) 
    },
    { 
      id: 'projects', 
      label: 'Browse Projects', 
      icon: FolderGit2, 
      action: () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) 
    },
    { 
      id: 'contact', 
      label: 'Send Signal', 
      icon: Mail, 
      action: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) 
    },
    { 
      id: 'terminal', 
      label: 'Open Terminal', 
      icon: Terminal, 
      action: () => {
        const btn = document.querySelector('button[class*="fixed bottom-6"]') as HTMLButtonElement;
        if (btn) btn.click();
      } 
    },
    {
        id: 'cv',
        label: 'Download CV Manual',
        icon: Download,
        action: () => {
             generateResumePDF();
             if(achievements?.unlockAchievement) achievements.unlockAchievement('RECRUITER');
        }
    }
  ];

  const filteredCommands = commands.filter(cmd => 
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );

  const executeCommand = (cmd: typeof commands[0]) => {
    if(playClick) playClick();
    cmd.action();
    setIsOpen(false);
    setQuery('');
  };

  // Keyboard navigation
  useEffect(() => {
    const handleNav = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(i => (i + 1) % filteredCommands.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(i => (i - 1 + filteredCommands.length) % filteredCommands.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          executeCommand(filteredCommands[selectedIndex]);
        }
      }
    };
    window.addEventListener('keydown', handleNav);
    return () => window.removeEventListener('keydown', handleNav);
  }, [isOpen, filteredCommands, selectedIndex]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-[20vh] px-4"
          onClick={(e) => {
              if (e.target === e.currentTarget) setIsOpen(false);
          }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden"
          >
            <div className="p-4 border-b border-slate-800 flex items-center gap-3">
              <Search className="text-slate-400" size={20} />
              <input
                type="text"
                className="flex-1 bg-transparent outline-none text-white placeholder-slate-500 font-mono"
                placeholder="Type a command..."
                autoFocus
                value={query}
                onChange={e => {
                    setQuery(e.target.value);
                    setSelectedIndex(0);
                }}
              />
              <div className="px-2 py-1 rounded bg-slate-800 text-[10px] text-slate-400 font-mono border border-slate-700">
                ESC
              </div>
            </div>
            
            <div className="max-h-[300px] overflow-y-auto p-2">
              {filteredCommands.length === 0 ? (
                <div className="p-4 text-center text-slate-500 font-mono text-sm">
                    No commands found.
                </div>
              ) : (
                filteredCommands.map((cmd, idx) => (
                  <button
                    key={cmd.id}
                    onClick={() => executeCommand(cmd)}
                    onMouseEnter={() => {
                        setSelectedIndex(idx);
                        if(playHover) playHover();
                    }}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors text-left group ${
                        idx === selectedIndex ? 'bg-primary/10 text-primary' : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                        <cmd.icon size={18} className={idx === selectedIndex ? 'text-primary' : 'text-slate-500'} />
                        <span className="font-mono text-sm">{cmd.label}</span>
                    </div>
                    {idx === selectedIndex && (
                        <ArrowRight size={14} className="text-primary" />
                    )}
                  </button>
                ))
              )}
            </div>
            
            <div className="p-2 bg-slate-950 border-t border-slate-800 flex justify-between text-[10px] text-slate-500 font-mono px-4">
                <span>Total Operations: {commands.length}</span>
                <div className="flex gap-2">
                    <span className="flex items-center gap-1"><span className="bg-slate-800 px-1 rounded">↑↓</span> Navigate</span>
                    <span className="flex items-center gap-1"><span className="bg-slate-800 px-1 rounded">↵</span> Select</span>
                </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
