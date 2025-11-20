
import React from 'react';
import { motion } from 'framer-motion';
import { EXPERIENCE, EDUCATION, CERTIFICATIONS } from '../constants';
import { GitBranch, Terminal, Cpu, CheckCircle2 } from 'lucide-react';

const LogEntry = ({ children, title, subtitle, date, type, index }: any) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="relative pl-0 md:pl-0 mb-8 md:mb-16 group"
    >
      {/* Desktop Layout */}
      <div className={`hidden md:flex items-start justify-between gap-12 ${index % 2 !== 0 ? 'flex-row-reverse' : ''}`}>
        
        {/* Date/Meta Side */}
        <div className={`w-5/12 ${index % 2 !== 0 ? 'text-left' : 'text-right'}`}>
          <div className="inline-block px-3 py-1 rounded bg-slate-900 border border-slate-800 text-primary font-mono text-xs mb-2">
            {date}
          </div>
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <p className="text-slate-400 text-sm font-mono">{subtitle}</p>
        </div>

        {/* Center Line & Node */}
        <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center h-full">
          <div className={`w-4 h-4 rounded-full border-2 z-10 bg-dark transition-colors duration-300 ${type === 'work' ? 'border-secondary bg-secondary/20 shadow-[0_0_15px_rgba(99,102,241,0.5)]' : 'border-primary bg-primary/20 shadow-[0_0_15px_rgba(14,165,233,0.5)]'}`} />
          <div className="w-0.5 h-full bg-slate-800 group-hover:bg-slate-700 transition-colors -mt-1" />
        </div>

        {/* Content Side */}
        <div className={`w-5/12 ${index % 2 !== 0 ? 'text-right' : 'text-left'}`}>
           <div className={`p-5 rounded-lg border border-slate-800 bg-slate-900/50 backdrop-blur-sm hover:border-primary/30 transition-all relative overflow-hidden group-hover:shadow-[0_0_20px_rgba(0,0,0,0.4)]`}>
             {/* Terminal Bar */}
             <div className="absolute top-0 left-0 right-0 h-6 bg-slate-950 border-b border-slate-800 flex items-center px-3 gap-2">
               <div className="w-2 h-2 rounded-full bg-slate-700" />
               <div className="w-2 h-2 rounded-full bg-slate-700" />
               <span className="ml-auto text-[9px] text-slate-600 font-mono">LOG_ID_{index}84</span>
             </div>
             <div className="mt-4 text-sm text-slate-300 leading-relaxed">
               {children}
             </div>
           </div>
        </div>
      </div>

      {/* Mobile Layout - Cleaned Up */}
      <div className="md:hidden relative border-l-[2px] border-slate-800/50 ml-3 pl-8 pb-10">
        <div className={`absolute -left-[7px] top-1 w-3.5 h-3.5 rounded-full border-2 bg-dark z-10 ${type === 'work' ? 'border-secondary' : 'border-primary'}`} />
        
        <div className="mb-2">
            <span className="inline-block text-[10px] font-mono text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20 mb-1.5">{date}</span>
            <h3 className="text-lg font-bold text-white leading-tight">{title}</h3>
            <p className="text-sm text-slate-500 font-mono mt-0.5">{subtitle}</p>
        </div>
        
        <div className="p-4 bg-slate-900/40 border border-slate-800/60 rounded-lg text-sm text-slate-300 shadow-sm">
           {children}
        </div>
      </div>
    </motion.div>
  );
};

const Timeline: React.FC = () => {
  return (
    <section className="py-20 md:py-32 px-4 bg-dark relative overflow-hidden scroll-mt-10" id="experience">
      {/* Circuit Pattern Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ 
        backgroundImage: 'radial-gradient(#4f4f4f 1px, transparent 1px)', 
        backgroundSize: '20px 20px' 
      }}></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-24"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary border border-secondary/20 text-xs font-mono mb-4">
            <GitBranch size={14} />
            <span>SYSTEM VERSION HISTORY</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 md:mb-6">
            Evolution <span className="text-slate-700">Log</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto font-light text-sm md:text-base px-2">
            A chronological record of system upgrades, knowledge acquisition, and deployed professional experiences.
          </p>
        </motion.div>

        {/* Timeline Items */}
        <div className="relative">
           
           {/* Combine Education & Experience for a single timeline flow */}
           {/* 1. Internship (Most Recent) */}
           {EXPERIENCE.map((exp, index) => (
             <LogEntry 
               key={`exp-${index}`}
               title={exp.title}
               subtitle={exp.company}
               date={exp.period}
               type="work"
               index={0}
             >
                <ul className="space-y-2">
                  {exp.description.map((desc, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs md:text-sm">
                      <span className="text-secondary mt-1 text-[10px]">➜</span>
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-2">
                  {exp.tech.map(t => (
                    <span key={t} className="text-[10px] px-2 py-1 bg-secondary/10 text-secondary rounded border border-secondary/20">
                      {t}
                    </span>
                  ))}
                </div>
             </LogEntry>
           ))}

           {/* 2. Engineering Degree */}
           <LogEntry 
             title={EDUCATION[0].degree}
             subtitle={EDUCATION[0].school}
             date={EDUCATION[0].period}
             type="edu"
             index={1}
           >
             <p className="text-xs md:text-sm">Advanced system architecture studies. Focusing on Microservices, Cloud Computing, and Distributed Systems.</p>
             <div className="mt-3 flex items-center gap-2 text-xs text-primary font-bold">
                <CheckCircle2 size={12} /> <span>Status: IN_PROGRESS</span>
             </div>
           </LogEntry>

           {/* 3. Prep Cycle */}
           <LogEntry 
             title={EDUCATION[1].degree}
             subtitle={EDUCATION[1].school}
             date={EDUCATION[1].period}
             type="edu"
             index={2}
           >
             <p className="text-xs md:text-sm">Intensive foundational programming cycles. Core logic algorithms and data structures initialized.</p>
           </LogEntry>

           {/* 4. Certifications (Parallel Branch) */}
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="mt-12 md:mt-20 p-6 md:p-8 bg-gradient-to-r from-slate-900 to-slate-950 rounded-2xl border border-slate-800 relative overflow-hidden"
           >
             <div className="absolute top-0 right-0 p-4 opacity-20">
               <Cpu size={80} />
             </div>
             
             <h3 className="text-lg md:text-xl font-bold text-white mb-6 flex items-center gap-2">
               <Terminal size={20} className="text-green-500" />
               Additional Patches & Certificates
             </h3>
             
             <div className="flex flex-wrap gap-3 md:gap-4 relative z-10">
               {CERTIFICATIONS.map((cert, i) => (
                 <div key={i} className="px-3 py-2 bg-black/40 border border-slate-700 rounded-lg hover:border-green-500/50 hover:text-green-400 transition-colors cursor-default flex items-center gap-2 text-xs md:text-sm">
                   <div className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                   <span className="font-mono">{cert}</span>
                 </div>
               ))}
             </div>
           </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Timeline;
