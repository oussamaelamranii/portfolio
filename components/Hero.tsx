import React, { useState, useEffect, useRef } from 'react';
import { motion, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { PROFILE } from '../constants';
import { ArrowDown, Github, Linkedin, Cpu, ShieldCheck, Terminal, Power } from 'lucide-react';

const BootSequence = ({ onComplete }: { onComplete: () => void }) => {
  const [lines, setLines] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  
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
      const lineDelay = Math.random() * 200 + 50;
      delay += lineDelay;
      setTimeout(() => {
        setLines(prev => [...prev, line]);
        // Auto scroll
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
        if (index === bootText.length - 1) {
          setTimeout(onComplete, 600);
        }
      }, delay);
    });
  }, []);

  return (
    <div className="relative w-full max-w-2xl bg-black border border-green-900/50 p-6 rounded-lg shadow-[0_0_50px_rgba(0,255,0,0.1)] font-mono text-xs md:text-sm overflow-hidden h-[300px] flex flex-col">
      <div className="absolute top-0 left-0 w-full h-6 bg-green-900/20 border-b border-green-900/50 flex items-center px-2 gap-2">
        <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
        <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
        <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
        <span className="ml-auto text-[10px] text-green-600">SYSTEM_BOOT.EXE</span>
      </div>
      
      <div ref={scrollRef} className="mt-4 flex-1 overflow-y-auto font-mono text-green-500 leading-relaxed scrollbar-hide">
        {lines.map((line, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-1"
          >
            <span className="opacity-50 mr-2">[{new Date().toLocaleTimeString()}]</span>
            {line}
          </motion.div>
        ))}
        <motion.span 
          animate={{ opacity: [1, 0] }} 
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="inline-block w-2 h-4 bg-green-500 ml-1 align-middle"
        />
      </div>
      
      <div className="mt-4 border-t border-green-900/50 pt-2 flex justify-between items-center">
        <span className="text-green-700 animate-pulse">WAITING FOR SYSTEM...</span>
        <button onClick={onComplete} className="text-xs text-slate-500 hover:text-white underline">
          [SKIP_BOOT_SEQUENCE]
        </button>
      </div>
    </div>
  );
};

const Hero: React.FC = () => {
  const [bootComplete, setBootComplete] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    x.set((clientX / innerWidth - 0.5) * 2);
    y.set((clientY / innerHeight - 0.5) * 2);
  };

  const rotateX = useSpring(useTransform(y, [-1, 1], [5, -5]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-1, 1], [-5, 5]), { stiffness: 100, damping: 30 });

  return (
    <div 
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-darker perspective-1000 pt-20"
      onMouseMove={handleMouseMove}
      ref={ref}
    >
      {/* Matrix Grid */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_60%,transparent_100%)]" />
      </div>

      <div className="z-20 w-full max-w-7xl px-4">
        {!bootComplete ? (
          <div className="h-full flex items-center justify-center">
             <BootSequence onComplete={() => setBootComplete(true)} />
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "circOut" }}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
          >
            {/* Left: Main Identity */}
            <div className="lg:col-span-7 transform translate-z-10">
              <motion.div 
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="inline-flex items-center gap-2 mb-6 overflow-hidden whitespace-nowrap border-r-2 border-primary/50 pr-2"
              >
                <Power size={16} className="text-green-500" />
                <span className="font-mono text-sm text-green-500">SYSTEM_ONLINE</span>
                <span className="text-slate-600 font-mono mx-2">||</span>
                <span className="font-mono text-sm text-primary">TARGET: FULL_STACK_DEV</span>
              </motion.div>

              <motion.h1 
                className="text-5xl md:text-8xl font-bold text-white mb-6 tracking-tighter leading-none"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                OUSSAMA
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-secondary">ELAMRANI</span>
              </motion.h1>
              
              <motion.div
                className="p-4 border-l-2 border-primary/50 bg-primary/5 backdrop-blur-sm mb-8 max-w-xl"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-slate-300 font-mono text-sm md:text-base leading-relaxed">
                  <span className="text-primary font-bold">&gt; WHOAMI:</span> {PROFILE.about}
                </p>
              </motion.div>

              <motion.div 
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <a href="#projects" className="relative group overflow-hidden px-8 py-3 bg-primary text-white font-bold font-mono text-sm rounded-sm tracking-wider">
                  <span className="relative z-10 flex items-center gap-2">
                     <Terminal size={16} />
                     EXECUTE_PROJECTS
                  </span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                </a>
                
                <a href="#contact" className="px-8 py-3 bg-transparent border border-slate-700 hover:border-primary text-slate-400 hover:text-white font-mono text-sm rounded-sm transition-all tracking-wider flex items-center gap-2">
                  ESTABLISH_UPLINK
                </a>
              </motion.div>

              {/* Social Uplinks */}
              <motion.div 
                className="mt-12 flex gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                {[
                  { icon: Github, label: "GITHUB", href: PROFILE.github },
                  { icon: Linkedin, label: "LINKEDIN", href: PROFILE.linkedin }
                ].map((social, idx) => (
                  <a 
                    key={idx}
                    href={social.href} 
                    className="group flex items-center gap-3 px-4 py-2 bg-slate-900/50 rounded border border-slate-800 hover:border-primary/50 transition-all"
                  >
                    <social.icon size={18} className="text-slate-400 group-hover:text-white transition-colors" />
                    <span className="text-xs font-mono text-slate-500 group-hover:text-primary transition-colors">{social.label}</span>
                  </a>
                ))}
              </motion.div>
            </div>

            {/* Right: 3D Character Card / Hologram */}
            <div className="hidden lg:block lg:col-span-5 relative perspective-2000">
              <div className="relative w-full aspect-[4/5] max-w-md mx-auto transform-style-3d group">
                
                {/* Back glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary via-secondary to-purple-600 rounded-2xl blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity duration-700 animate-pulse-slow" />
                
                {/* Main Card */}
                <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 shadow-2xl transform transition-transform duration-500 group-hover:rotate-y-6 group-hover:rotate-x-6">
                  
                  {/* Header */}
                  <div className="flex justify-between items-start mb-8 border-b border-slate-800 pb-4">
                    <div>
                      <div className="text-xs text-slate-500 font-mono">ID_CARD_8492</div>
                      <div className="text-lg font-bold text-white">ENGINEER_LEVEL_3</div>
                    </div>
                    <Cpu className="text-primary animate-spin-slow" size={24} />
                  </div>

                  {/* Visual Representation - Code Blocks */}
                  <div className="space-y-2 mb-8 opacity-80">
                    <div className="h-2 w-3/4 bg-slate-700 rounded animate-pulse" />
                    <div className="h-2 w-1/2 bg-slate-700 rounded animate-pulse delay-75" />
                    <div className="h-2 w-5/6 bg-slate-700 rounded animate-pulse delay-150" />
                    <div className="h-2 w-full bg-slate-700 rounded animate-pulse delay-200" />
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mt-auto pt-8 border-t border-slate-800">
                    <div className="text-center p-2 bg-black/30 rounded">
                       <div className="text-2xl font-bold text-white">100%</div>
                       <div className="text-[10px] text-slate-500 font-mono uppercase">Commitment</div>
                    </div>
                    <div className="text-center p-2 bg-black/30 rounded">
                       <div className="text-2xl font-bold text-white">24/7</div>
                       <div className="text-[10px] text-slate-500 font-mono uppercase">Uptime</div>
                    </div>
                  </div>

                  {/* Decorative Hologram Lines */}
                  <div className="absolute -inset-1 border border-primary/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <div className="absolute top-1/2 left-0 w-full h-[1px] bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <div className="absolute left-1/2 top-0 w-[1px] h-full bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {bootComplete && (
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500 flex flex-col items-center gap-2 font-mono text-[10px] tracking-widest uppercase cursor-pointer hover:text-primary transition-colors"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
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
