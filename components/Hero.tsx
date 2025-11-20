
import React, { useState, useEffect, useRef } from 'react';
import { motion, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { PROFILE } from '../constants';
import { ArrowDown, Github, Linkedin, Power, Download, Check, Loader2, Terminal } from 'lucide-react';
import { useSound } from './SoundController';
import { useAchievements } from './Achievements';
import DecryptText from './DecryptText';
import { generateResumePDF } from '../services/pdfGenerator';

const BootSequence = ({ onComplete }: { onComplete: () => void }) => {
  const [lines, setLines] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { playClick } = useSound();
  
  const bootText = [
    "BIOS DATE 06/15/26 14:22:51 VER: 1.0.0",
    "CPU: OUSSAMA-CORE-i9 @ 5.2GHZ",
    "Memory Test: 32768K OK",
    "Initializing Boot Agent...",
    "> Loading Kernel: ENGINEERING_DEGREE_2026...",
    "> Mounting Volumes: /skills, /projects, /experience...",
    "> Checking Dependencies: JAVA, ANGULAR, SPRING...",
    "> Dependency 'COFFEE' not found. Warning ignored.",
    "> Establishing Secure Connection to USER...",
    "> ACCESS GRANTED."
  ];

  useEffect(() => {
    let delay = 0;
    bootText.forEach((line, index) => {
      // Much faster boot sequence
      const lineDelay = Math.random() * 30 + 10; 
      delay += lineDelay;
      setTimeout(() => {
        setLines(prev => [...prev, line]);
        playClick(); // Sound effect for typing
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
        if (index === bootText.length - 1) {
          setTimeout(onComplete, 200); // Reduced completion delay
        }
      }, delay);
    });
  }, []);

  return (
    <div className="relative w-full max-w-2xl bg-black border border-secondary/50 p-4 md:p-6 rounded-lg shadow-[0_0_50px_rgba(0,136,255,0.1)] font-mono text-[10px] md:text-sm overflow-hidden h-[300px] flex flex-col z-50 mx-4">
      <div className="absolute top-0 left-0 w-full h-6 bg-primary/20 border-b border-secondary/30 flex items-center px-2 gap-2">
        <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
        <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
        <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
        <span className="ml-auto text-[10px] text-secondary">SYSTEM_BOOT.EXE</span>
      </div>
      
      <div ref={scrollRef} className="mt-4 flex-1 overflow-y-auto font-mono text-secondary/80 leading-relaxed scrollbar-hide">
        {lines.map((line, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-1 break-words"
          >
            <span className="opacity-50 mr-2">[{new Date().toLocaleTimeString()}]</span>
            {line}
          </motion.div>
        ))}
        <motion.span 
          animate={{ opacity: [1, 0] }} 
          transition={{ repeat: Infinity, duration: 0.5 }}
          className="inline-block w-2 h-4 bg-secondary ml-1 align-middle"
        />
      </div>
      
      <div className="mt-4 border-t border-secondary/30 pt-2 flex justify-between items-center">
        <span className="text-secondary animate-pulse">WAITING FOR SYSTEM...</span>
        <button onClick={onComplete} className="text-xs text-slate-500 hover:text-white underline p-2">
          [SKIP]
        </button>
      </div>
    </div>
  );
};

const Hero: React.FC = () => {
  const [bootComplete, setBootComplete] = useState(false);
  const [downloadState, setDownloadState] = useState<'idle' | 'loading' | 'done'>('idle');
  const ref = useRef<HTMLDivElement>(null);
  
  // Hooks
  const { playHover, playClick, playSuccess } = useSound();
  const { unlockAchievement } = useAchievements();
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    x.set((clientX / innerWidth - 0.5) * 2);
    y.set((clientY / innerHeight - 0.5) * 2);
  };

  const rotateX = useSpring(useTransform(y, [-1, 1], [5, -5]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-1, 1], [-5, 5]), { stiffness: 200, damping: 20 });

  const handleDownloadCV = async () => {
    if (downloadState !== 'idle') return;
    playClick();
    setDownloadState('loading');
    
    // Simulate "Processing" time - faster now
    setTimeout(() => {
      try {
        generateResumePDF();
        setDownloadState('done');
        playSuccess();
        unlockAchievement('RECRUITER');
      } catch (error) {
        console.error("PDF Gen Error", error);
        setDownloadState('idle');
      }
      
      setTimeout(() => setDownloadState('idle'), 2000);
    }, 600);
  };

  return (
    <div 
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center perspective-1000 pt-24 md:pt-20 pb-10"
      onMouseMove={handleMouseMove}
      ref={ref}
    >
      <div className="z-20 w-full max-w-7xl px-4 md:px-6">
        {!bootComplete ? (
          <div className="h-full flex items-center justify-center">
             <BootSequence onComplete={() => setBootComplete(true)} />
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "circOut" }}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
          >
            {/* Left: Main Identity */}
            <div className="lg:col-span-7 transform translate-z-10 flex flex-col items-start">
              
              <motion.div 
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="inline-flex items-center gap-2 mb-4 md:mb-6 overflow-hidden whitespace-nowrap border-r-2 border-primary/50 pr-2 bg-primary/5 px-2 py-1 rounded-r-md"
              >
                <Power size={14} className="text-secondary" />
                <span className="font-mono text-[10px] md:text-sm text-secondary">SYSTEM_ONLINE</span>
                <span className="text-slate-600 font-mono mx-1 md:mx-2">||</span>
                <span className="font-mono text-[10px] md:text-sm text-primary">TARGET: FULL_STACK_DEV</span>
              </motion.div>

              {/* Mobile Only Profile Avatar */}
              <motion.div 
                className="lg:hidden w-full flex justify-center mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="relative w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-primary via-transparent to-secondary">
                  <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-spin-slow" />
                  <div className="absolute inset-0 rounded-full border border-secondary/20 animate-spin-reverse-slow" />
                  <img 
                    src={PROFILE.image} 
                    alt={PROFILE.name} 
                    className="w-full h-full rounded-full object-cover border-2 border-black bg-black"
                  />
                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-secondary rounded-full border-2 border-black" />
                </div>
              </motion.div>

              <motion.h1 
                className="text-4xl sm:text-5xl md:text-8xl font-bold text-white mb-4 md:mb-6 tracking-tighter leading-[0.9]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <DecryptText text="OUSSAMA" speed={30} />
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-secondary text-glow">
                  <DecryptText text="ELAMRANI" speed={30} />
                </span>
              </motion.h1>
              
              <motion.div
                className="w-full p-4 border-l-2 border-primary/50 bg-primary/5 backdrop-blur-sm mb-8 max-w-xl relative overflow-hidden group rounded-r-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent -translate-x-full group-hover:animate-scan" />
                <p className="text-slate-300 font-mono text-sm md:text-base leading-relaxed relative z-10">
                  <span className="text-primary font-bold">&gt; WHOAMI:</span> {PROFILE.about}
                </p>
              </motion.div>

              <motion.div 
                className="flex flex-col sm:flex-row flex-wrap gap-4 w-full sm:w-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                <a 
                  href="#projects" 
                  onMouseEnter={playHover}
                  onClick={playClick}
                  className="relative group overflow-hidden px-8 py-3.5 bg-primary text-white font-bold font-mono text-sm rounded-sm tracking-wider shadow-[0_0_20px_rgba(0,136,255,0.3)] active:scale-95 transition-all text-center flex items-center justify-center gap-2"
                >
                  <Terminal size={16} />
                  <span className="relative z-10">EXECUTE_PROJECTS</span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-200 ease-out" />
                </a>
                
                <button 
                  onClick={handleDownloadCV}
                  onMouseEnter={playHover}
                  disabled={downloadState !== 'idle'}
                  className="px-8 py-3.5 bg-transparent border border-slate-700 active:bg-slate-800 text-slate-400 hover:text-white font-mono text-sm rounded-sm transition-all tracking-wider flex items-center justify-center gap-2 relative overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {downloadState === 'idle' && (
                    <>
                      <span className="relative z-10 flex items-center gap-2">
                         <Download size={16} /> DOWNLOAD_CV
                      </span>
                      <div className="absolute inset-0 bg-slate-800 translate-y-full group-hover:translate-y-0 transition-transform duration-200" />
                    </>
                  )}
                  {downloadState === 'loading' && (
                    <>
                      <Loader2 size={16} className="animate-spin" /> PROCESSING...
                    </>
                  )}
                  {downloadState === 'done' && (
                    <>
                      <Check size={16} className="text-secondary" /> INSTALLED
                    </>
                  )}
                </button>
              </motion.div>

              {/* Social Uplinks */}
              <motion.div 
                className="mt-8 md:mt-12 flex gap-4 md:gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                {[
                  { icon: Github, label: "GITHUB", href: PROFILE.github },
                  { icon: Linkedin, label: "LINKEDIN", href: PROFILE.linkedin }
                ].map((social, idx) => (
                  <a 
                    key={idx}
                    href={social.href} 
                    onMouseEnter={playHover}
                    className="group flex items-center gap-3 px-4 py-2 bg-slate-900/50 rounded border border-slate-800 hover:border-primary/50 transition-all active:scale-95"
                  >
                    <social.icon size={18} className="text-slate-400 group-hover:text-white transition-colors" />
                    <span className="text-[10px] md:text-xs font-mono text-slate-500 group-hover:text-primary transition-colors">{social.label}</span>
                  </a>
                ))}
              </motion.div>
            </div>

            {/* Right: 3D Character Card / Hologram (Desktop Only) */}
            <div className="hidden lg:block lg:col-span-5 relative perspective-2000">
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-full aspect-[4/5] max-w-md mx-auto transform-style-3d group"
              >
                {/* Back glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary via-secondary to-blue-600 rounded-2xl blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity duration-300 animate-pulse-slow" />
                
                {/* Main Card */}
                <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 shadow-2xl transform transition-transform duration-200 group-hover:rotate-y-6 group-hover:rotate-x-6 flex flex-col overflow-hidden cyber-card">
                  
                  {/* Header Status Bar */}
                  <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-secondary animate-pulse"></div>
                      <span className="text-[10px] font-mono text-secondary">NET_ONLINE</span>
                    </div>
                    <div className="flex gap-1">
                        <div className="w-3 h-1 bg-slate-600 rounded-full"></div>
                        <div className="w-3 h-1 bg-slate-600 rounded-full"></div>
                        <div className="w-3 h-1 bg-slate-400 rounded-full"></div>
                    </div>
                  </div>

                  {/* Profile Photo Section */}
                  <div className="flex-1 flex flex-col items-center justify-center mb-6 relative">
                    {/* Scanning Effect Overlay */}
                    <div className="absolute w-full h-[2px] bg-primary/50 top-0 left-0 animate-scan shadow-[0_0_10px_#0088ff]"></div>
                    
                    <div className="relative w-40 h-40 mb-6 group-hover:scale-105 transition-transform duration-300">
                        {/* Spinning Rings */}
                        <div className="absolute inset-0 border border-primary/30 rounded-full animate-spin-slow"></div>
                        <div className="absolute inset-[-10px] border border-secondary/20 rounded-full animate-spin-reverse-slow"></div>
                        
                        {/* Image Container */}
                        <div className="absolute inset-1 rounded-full overflow-hidden border-2 border-primary/50 shadow-[0_0_30px_rgba(0,136,255,0.3)] bg-black">
                            <img 
                              src={PROFILE.image} 
                              alt={PROFILE.name} 
                              className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
                            />
                            {/* Glitch Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-transparent translate-y-[-100%] animate-scan pointer-events-none"></div>
                        </div>
                    </div>
                    
                    <h2 className="text-xl font-bold text-white mb-1">{PROFILE.name}</h2>
                    <div className="text-xs font-mono text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                      LEVEL 22 ENGINEER
                    </div>
                  </div>

                  {/* Footer Stats Grid */}
                  <div className="grid grid-cols-3 gap-2 mt-auto">
                    <div className="bg-slate-950/50 p-2 rounded border border-slate-800 text-center">
                        <div className="text-[10px] text-slate-500 font-mono">PROJECTS</div>
                        <div className="text-white font-bold">12+</div>
                    </div>
                    <div className="bg-slate-950/50 p-2 rounded border border-slate-800 text-center">
                        <div className="text-[10px] text-slate-500 font-mono">EXP</div>
                        <div className="text-white font-bold">3 YRS</div>
                    </div>
                    <div className="bg-slate-950/50 p-2 rounded border border-slate-800 text-center">
                        <div className="text-[10px] text-slate-500 font-mono">RANK</div>
                        <div className="text-secondary font-bold">A+</div>
                    </div>
                  </div>

                  {/* Decorative Hologram Scanlines */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20 pointer-events-none opacity-30 bg-[length:100%_4px,6px_100%]"></div>
                  
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>

      {bootComplete && (
        <motion.div 
          className="absolute bottom-24 md:bottom-8 left-1/2 -translate-x-1/2 text-slate-500 flex flex-col items-center gap-2 font-mono text-[10px] tracking-widest uppercase cursor-pointer hover:text-primary transition-colors z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <span>Initiate Scroll</span>
          <ArrowDown size={14} className="animate-bounce" />
        </motion.div>
      )}
    </div>
  );
};

export default Hero;
