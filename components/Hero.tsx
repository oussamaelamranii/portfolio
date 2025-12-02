import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { PROFILE } from '../constants';
import { ArrowDown, Github, Linkedin, Power, Download, Check, Loader2, Terminal, ArrowRight, Mail } from 'lucide-react';
import { useSound } from './SoundController';
import { useAchievements } from './Achievements';
import DecryptText from './DecryptText';


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
      // Slower boot sequence for better visibility
      const lineDelay = Math.random() * 100 + 50; // 50-150ms per line
      delay += lineDelay;
      setTimeout(() => {
        setLines(prev => [...prev, line]);
        playClick(); // Sound effect for typing
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
        if (index === bootText.length - 1) {
          setTimeout(onComplete, 1000); // 1 second delay before finishing
        }
      }, delay);
    });
  }, []);

  return (
    <div className="relative w-full max-w-2xl bg-black border border-green-500 p-4 md:p-6 rounded-xl shadow-[0_0_50px_rgba(34,197,94,0.4)] font-mono text-[10px] md:text-sm overflow-hidden h-[300px] flex flex-col z-50 mx-4">
      <div className="absolute top-0 left-0 w-full h-6 bg-green-500/10 border-b border-green-500/30 flex items-center px-2 gap-2">
        <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
        <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
        <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
        <span className="ml-auto text-[10px] text-green-500">SYSTEM_BOOT.EXE</span>
      </div>

      <div ref={scrollRef} className="mt-4 flex-1 overflow-y-auto font-mono text-green-500/80 leading-relaxed scrollbar-hide">
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
          className="inline-block w-2 h-4 bg-green-500 ml-1 align-middle"
        />
      </div>

      <div className="mt-4 border-t border-green-500/30 pt-2 flex justify-between items-center">
        <span className="text-green-500 animate-pulse">WAITING FOR SYSTEM...</span>
        <button onClick={onComplete} className="text-xs text-slate-500 hover:text-white underline p-2">
          [SKIP]
        </button>
      </div>
    </div>
  );
};



const Hero: React.FC = () => {
  const { t } = useTranslation();
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

    // Simulate "Processing" time
    setTimeout(() => {
      try {
        const link = document.createElement('a');
        link.href = '/resume-oussama-elamrani-PFE.pdf';
        link.download = 'Oussama_Elamrani_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setDownloadState('done');
        playSuccess();
        unlockAchievement('RECRUITER');
      } catch (error) {
        console.error("Download Error", error);
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
                className="text-4xl sm:text-5xl md:text-8xl font-heading font-bold text-white mb-4 md:mb-6 tracking-tighter leading-[0.9]"
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
                className="w-full p-6 border-l-2 border-primary/50 bg-surface/50 backdrop-blur-md mb-8 max-w-xl relative overflow-hidden group rounded-r-xl shadow-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent -translate-x-full group-hover:animate-scan" />
                <p className="text-slate-300 font-mono text-sm md:text-base leading-relaxed relative z-10">
                  <span className="text-primary font-bold">&gt; WHOAMI:</span> {t('hero.description')}
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
                  className="relative group overflow-hidden px-8 py-3.5 bg-primary text-white font-bold font-mono text-sm rounded-lg tracking-wider shadow-[0_0_30px_rgba(99,102,241,0.4)] hover:shadow-[0_0_50px_rgba(99,102,241,0.6)] active:scale-95 transition-all text-center flex items-center justify-center gap-2"
                >
                  <Terminal size={16} />
                  <span className="relative z-10">{t('hero.cta_projects')}</span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-200 ease-out" />
                </a>

                <button
                  onClick={handleDownloadCV}
                  onMouseEnter={playHover}
                  disabled={downloadState !== 'idle'}
                  className="px-8 py-3.5 bg-surface border border-slate-700 hover:border-primary/50 text-slate-300 hover:text-white font-mono text-sm rounded-lg transition-all tracking-wider flex items-center justify-center gap-2 relative overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-primary/20"
                >
                  {downloadState === 'idle' && (
                    <>
                      <span className="relative z-10 flex items-center gap-2">
                        <Download size={16} /> RESUME
                      </span>
                      <div className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-200" />
                    </>
                  )}
                  {downloadState === 'loading' && (
                    <>
                      <Loader2 size={16} className="animate-spin" /> PROCESSING...
                    </>
                  )}
                  {downloadState === 'done' && (
                    <>
                      <Check size={16} className="text-green-400" /> DOWNLOADED
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

                {/* Main Card - Cyber Terminal Edition */}
                <div className="absolute inset-0 bg-[#0c0c0c] border border-slate-800 rounded-xl p-1 shadow-2xl transform transition-transform duration-200 group-hover:rotate-y-6 group-hover:rotate-x-6 flex flex-col overflow-hidden font-mono">

                  {/* Terminal Header */}
                  <div className="bg-[#1a1a1a] px-4 py-2 flex items-center justify-between border-b border-slate-800 rounded-t-lg">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/80 border border-red-600/50"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80 border border-yellow-600/50"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500/80 border border-green-600/50"></div>
                    </div>
                    <div className="text-[10px] text-slate-500 flex items-center gap-2">
                      <Terminal size={10} />
                      <span>user_profile.json</span>
                    </div>
                  </div>

                  {/* Terminal Content */}
                  <div className="flex-1 p-6 relative overflow-hidden flex flex-col items-center">
                    {/* Background Grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] opacity-20 pointer-events-none bg-[length:100%_4px,6px_100%]" />

                    {/* Profile Image with Tech Borders */}
                    <div className="relative w-40 h-40 mb-6 group-hover:scale-105 transition-transform duration-300">
                      {/* Corner Brackets */}
                      <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-primary"></div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-primary"></div>
                      <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-primary"></div>
                      <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-primary"></div>

                      {/* Image */}
                      <div className="w-full h-full bg-slate-900 overflow-hidden grayscale hover:grayscale-0 transition-all duration-500">
                        <img
                          src={PROFILE.image}
                          alt={PROFILE.name}
                          className="w-full h-full object-cover opacity-80 hover:opacity-100"
                        />
                      </div>

                      {/* Scanline Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/20 to-transparent h-2 w-full animate-scan pointer-events-none"></div>
                    </div>

                    {/* Code Details */}
                    <div className="w-full text-xs md:text-sm space-y-2 font-mono relative z-10">
                      <div className="flex">
                        <span className="text-purple-400 mr-2">const</span>
                        <span className="text-yellow-200">developer</span>
                        <span className="text-slate-400 mr-2"> = </span>
                        <span className="text-slate-400">{`{`}</span>
                      </div>

                      <div className="pl-4 space-y-1">
                        <div className="flex">
                          <span className="text-blue-300 mr-2">name:</span>
                          <span className="text-green-400">"{PROFILE.name}"</span><span className="text-slate-500">,</span>
                        </div>
                        <div className="flex">
                          <span className="text-blue-300 mr-2">role:</span>
                          <span className="text-green-400">"Full Stack Engineer"</span><span className="text-slate-500">,</span>
                        </div>
                        <div className="flex">
                          <span className="text-blue-300 mr-2">level:</span>
                          <span className="text-orange-400">22</span><span className="text-slate-500">,</span>
                        </div>
                        <div className="flex">
                          <span className="text-blue-300 mr-2">status:</span>
                          <span className="text-green-400">"ONLINE"</span>
                          <span className="inline-block w-2 h-4 bg-green-400 animate-pulse ml-1"></span>
                        </div>
                      </div>

                      <div className="text-slate-400">{`};`}</div>
                    </div>

                    {/* Bottom Stats - JSON Array Style */}
                    <div className="mt-auto w-full pt-4 border-t border-slate-800/50">
                      <div className="text-[10px] text-slate-500 mb-1">// SYSTEM_STATS</div>
                      <div className="flex justify-between font-mono text-xs">
                        <div className="flex flex-col">
                          <span className="text-slate-400">PROJECTS</span>
                          <span className="text-blue-400">[ 12+ ]</span>
                        </div>
                        <div className="flex flex-col text-center">
                          <span className="text-slate-400">EXP</span>
                          <span className="text-purple-400">[ 3Y ]</span>
                        </div>
                        <div className="flex flex-col text-right">
                          <span className="text-slate-400">RANK</span>
                          <span className="text-green-400">[ A+ ]</span>
                        </div>
                      </div>
                    </div>

                  </div>
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
