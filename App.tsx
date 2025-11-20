
import React, { useEffect, useState } from 'react';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Timeline from './components/Timeline';
import Projects from './components/Projects';
import AIChat from './components/AIChat';
import Background from './components/Background';
import Contact from './components/Contact';
import CommandPalette from './components/CommandPalette';
import CustomCursor from './components/CustomCursor';
import { SoundProvider, useSound } from './components/SoundController';
import { AchievementsProvider, useAchievements } from './components/Achievements';
import { Code2, Terminal, Github, ChevronUp, Home, Briefcase, User, Search, Menu } from 'lucide-react';

// Inner App Component to use hooks
const AppContent = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const { unlockAchievement } = useAchievements();
  const { playClick } = useSound();
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      
      // Show top button
      if (scrolled > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }

      // Achievement: Scroll Master (Reach near bottom)
      if (scrolled > maxScroll - 100) {
        unlockAchievement('SCROLLER');
      }

      // Update active section for mobile nav
      const sections = ['home', 'skills', 'experience', 'projects', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top >= -100 && rect.top < window.innerHeight / 2) {
            setActiveSection(section);
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [unlockAchievement]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    playClick();
  };

  const handleNavClick = (id: string) => {
    playClick();
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveSection(id);
  };

  return (
    <div className="min-h-screen bg-darker text-slate-200 font-sans selection:bg-primary/30 selection:text-white overflow-x-hidden relative cursor-none pb-20 md:pb-0">
      <CustomCursor />
      
      {/* Global 3D Background */}
      <Background />
      
      {/* Command Palette */}
      <CommandPalette />

      {/* Top Navbar (Desktop: Full, Mobile: Minimal) */}
      <nav className="fixed top-0 w-full z-40 px-4 md:px-6 py-3 md:py-4 bg-darker/80 backdrop-blur-md border-b border-slate-800/50 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div onClick={() => handleNavClick('home')} className="group flex items-center gap-2 text-xl font-bold font-mono tracking-tighter text-white transition-colors cursor-pointer">
            <span className="text-primary">&lt;</span>
            <span className="group-hover:text-primary transition-colors">OE</span>
            <span className="text-primary">/&gt;</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8 text-xs font-mono text-slate-400 uppercase tracking-widest">
            <button onClick={() => handleNavClick('skills')} className="hover:text-primary transition-colors flex items-center gap-1"><Code2 size={12}/> Stack</button>
            <button onClick={() => handleNavClick('experience')} className="hover:text-primary transition-colors flex items-center gap-1"><Terminal size={12}/> Log</button>
            <button onClick={() => handleNavClick('projects')} className="hover:text-primary transition-colors flex items-center gap-1"><Github size={12}/> Repos</button>
          </div>
          
          {/* Command Hint / Search Button */}
          <div className="flex items-center gap-2">
             <button 
               className="md:hidden p-2 text-slate-400 hover:text-white"
               onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
             >
               <Search size={20} />
             </button>
             <div className="hidden lg:flex items-center gap-2 text-[10px] font-mono text-slate-600 bg-slate-900 px-2 py-1 rounded border border-slate-800 cursor-pointer hover:border-primary/50 transition-colors" onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}>
               <span>CMD + K</span>
             </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Dock Navigation */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-sm bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl shadow-primary/10 flex justify-around items-center py-3 px-2">
        {[
          { id: 'home', icon: Home, label: 'Home' },
          { id: 'skills', icon: Code2, label: 'Skills' },
          { id: 'experience', icon: Briefcase, label: 'Exp' },
          { id: 'projects', icon: Terminal, label: 'Work' },
          { id: 'contact', icon: User, label: 'Contact' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            className={`relative flex flex-col items-center gap-1 p-2 transition-all duration-300 ${activeSection === item.id ? 'text-primary -translate-y-2' : 'text-slate-500 hover:text-slate-300'}`}
          >
             <div className={`absolute inset-0 bg-primary/20 blur-lg rounded-full opacity-0 transition-opacity ${activeSection === item.id ? 'opacity-100' : ''}`} />
             <item.icon size={20} className="relative z-10" strokeWidth={activeSection === item.id ? 2.5 : 2} />
             {activeSection === item.id && (
               <span className="text-[9px] font-bold font-mono relative z-10">{item.label}</span>
             )}
          </button>
        ))}
      </div>

      <main className="relative z-10" id="home">
        <Hero />
        <Skills />
        <Timeline />
        <Projects />
      </main>

      {/* New Contact & Footer Section */}
      <div className="relative z-10">
        <Contact />
      </div>

      {/* AI Chat Widget */}
      <AIChat />

      {/* Scroll to top button (Desktop Only, mobile has nav) */}
      <button 
        onClick={scrollToTop}
        className={`hidden md:block fixed bottom-6 left-6 z-40 p-3 bg-primary/10 border border-primary/30 backdrop-blur rounded-lg text-primary hover:bg-primary hover:text-white transition-all ${showTopBtn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
      >
        <ChevronUp size={20} />
      </button>
    </div>
  );
}

function App() {
  return (
    <SoundProvider>
      <AchievementsProvider>
        <AppContent />
      </AchievementsProvider>
    </SoundProvider>
  );
}

export default App;
