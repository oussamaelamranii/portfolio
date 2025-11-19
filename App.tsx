import React, { useEffect, useState } from 'react';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Timeline from './components/Timeline';
import Projects from './components/Projects';
import AIChat from './components/AIChat';
import { PROFILE } from './constants';
import { Github, Linkedin, Mail, MapPin, Phone, ChevronUp, Terminal, Code2 } from 'lucide-react';

function App() {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-darker text-slate-200 font-sans selection:bg-primary/30 selection:text-white overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-40 px-6 py-4 bg-darker/80 backdrop-blur-md border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <a href="#" className="group flex items-center gap-2 text-xl font-bold font-mono tracking-tighter text-white transition-colors">
            <span className="text-primary">&lt;</span>
            <span className="group-hover:text-primary transition-colors">OE</span>
            <span className="text-primary">/&gt;</span>
          </a>
          <div className="hidden md:flex gap-8 text-xs font-mono text-slate-400 uppercase tracking-widest">
            <a href="#skills" className="hover:text-primary transition-colors flex items-center gap-1"><Code2 size={12}/> Stack</a>
            <a href="#experience" className="hover:text-primary transition-colors flex items-center gap-1"><Terminal size={12}/> Log</a>
            <a href="#projects" className="hover:text-primary transition-colors flex items-center gap-1"><Github size={12}/> Repos</a>
          </div>
        </div>
      </nav>

      <main className="relative">
        <Hero />
        <div className="relative z-10">
          <Skills />
          <Timeline />
          <Projects />
        </div>
      </main>

      {/* Footer */}
      <footer id="contact" className="bg-black border-t border-slate-800 py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-block mb-6 px-4 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-mono animate-pulse">
             System Status: OPEN TO WORK
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">
            Initialize <span className="text-primary">Collaboration</span>
          </h2>
          <p className="text-slate-400 mb-12 max-w-xl mx-auto font-light">
            Looking for a dedicated engineer to scale your architecture? Let's establish a connection.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mb-12">
             <a href={`mailto:${PROFILE.email}`} className="group flex items-center gap-3 px-6 py-4 bg-slate-900/50 rounded-xl border border-slate-800 hover:border-primary hover:bg-slate-900 transition-all duration-300">
                <div className="p-2 bg-slate-800 rounded-lg text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <Mail size={20} />
                </div>
                <div className="text-left">
                   <p className="text-[10px] uppercase tracking-wider text-slate-500">Send Packet</p>
                   <p className="text-sm font-mono text-white">{PROFILE.email}</p>
                </div>
             </a>

             <a href={`tel:${PROFILE.phone}`} className="group flex items-center gap-3 px-6 py-4 bg-slate-900/50 rounded-xl border border-slate-800 hover:border-primary hover:bg-slate-900 transition-all duration-300">
                <div className="p-2 bg-slate-800 rounded-lg text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <Phone size={20} />
                </div>
                <div className="text-left">
                   <p className="text-[10px] uppercase tracking-wider text-slate-500">Voice Link</p>
                   <p className="text-sm font-mono text-white">{PROFILE.phone}</p>
                </div>
             </a>
          </div>

          <div className="flex justify-center gap-8 text-slate-500 mb-12">
            <a href={PROFILE.github} className="hover:text-white hover:scale-110 transition-all"><Github size={24} /></a>
            <a href={PROFILE.linkedin} className="hover:text-white hover:scale-110 transition-all"><Linkedin size={24} /></a>
          </div>

          <div className="pt-8 border-t border-slate-900 text-slate-600 text-xs font-mono flex flex-col md:flex-row justify-between items-center gap-4">
            <p>© 2025 OUSSAMA ELAMRANI | SYSTEM VERSION 1.0.0</p>
            <p className="flex items-center gap-2"><MapPin size={12} /> {PROFILE.location.toUpperCase()}</p>
          </div>
        </div>
      </footer>

      {/* AI Chat Widget */}
      <AIChat />

      {/* Scroll to top button */}
      <button 
        onClick={scrollToTop}
        className={`fixed bottom-6 left-6 z-40 p-3 bg-primary/10 border border-primary/30 backdrop-blur rounded-lg text-primary hover:bg-primary hover:text-white transition-all ${showTopBtn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
      >
        <ChevronUp size={20} />
      </button>
    </div>
  );
}

export default App;