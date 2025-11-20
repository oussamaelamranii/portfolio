import React, { createContext, useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Download, Terminal, ArrowDown, Command } from 'lucide-react';
import { useSound } from './SoundController';

export type AchievementId = 'RECRUITER' | 'HACKER' | 'SCROLLER' | 'COMMANDER';

interface Achievement {
  id: AchievementId;
  title: string;
  description: string;
  icon: React.ElementType;
  xp: number;
}

const ACHIEVEMENTS_LIST: Record<AchievementId, Achievement> = {
  RECRUITER: {
    id: 'RECRUITER',
    title: 'Recruiter Protocol',
    description: 'Downloaded the CV Manual',
    icon: Download,
    xp: 500
  },
  HACKER: {
    id: 'HACKER',
    title: 'White Hat',
    description: 'Accessed the Terminal Mainframe',
    icon: Terminal,
    xp: 300
  },
  SCROLLER: {
    id: 'SCROLLER',
    title: 'Deep Explorer',
    description: 'Reached the end of the system',
    icon: ArrowDown,
    xp: 200
  },
  COMMANDER: {
    id: 'COMMANDER',
    title: 'Power User',
    description: 'Opened the Command Palette',
    icon: Command,
    xp: 1000
  }
};

interface AchievementsContextType {
  unlockAchievement: (id: AchievementId) => void;
  unlockedIds: AchievementId[];
}

const AchievementsContext = createContext<AchievementsContextType>({
  unlockAchievement: () => {},
  unlockedIds: []
});

export const useAchievements = () => useContext(AchievementsContext);

export const AchievementsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [unlockedIds, setUnlockedIds] = useState<AchievementId[]>([]);
  const [currentNotification, setCurrentNotification] = useState<Achievement | null>(null);
  const { playAchievement } = useSound();

  const unlockAchievement = (id: AchievementId) => {
    if (!unlockedIds.includes(id)) {
      setUnlockedIds(prev => [...prev, id]);
      setCurrentNotification(ACHIEVEMENTS_LIST[id]);
      playAchievement();
      
      // Auto dismiss after 4 seconds
      setTimeout(() => {
        setCurrentNotification(null);
      }, 4000);
    }
  };

  return (
    <AchievementsContext.Provider value={{ unlockAchievement, unlockedIds }}>
      {children}
      
      {/* Notification Toast */}
      <AnimatePresence>
        {currentNotification && (
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            className="fixed top-24 right-6 z-50 w-80"
          >
            <div className="relative bg-slate-900/90 backdrop-blur-xl border border-yellow-500/50 p-4 rounded-lg shadow-[0_0_30px_rgba(234,179,8,0.2)] overflow-hidden group">
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500/10 to-transparent -translate-x-full animate-scan" />

              <div className="flex gap-4 relative z-10">
                <div className="flex-shrink-0 w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center border border-yellow-500/50">
                   <Trophy size={24} className="text-yellow-500" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-yellow-500 uppercase tracking-widest mb-1">
                    ACHIEVEMENT UNLOCKED
                  </div>
                  <h3 className="text-white font-bold leading-none mb-1">{currentNotification.title}</h3>
                  <p className="text-xs text-slate-400 font-mono">{currentNotification.description}</p>
                  <div className="mt-2 text-[10px] text-right text-yellow-500 font-mono">
                    +{currentNotification.xp} XP
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AchievementsContext.Provider>
  );
};