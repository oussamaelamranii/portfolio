
import React from 'react';
import { motion } from 'framer-motion';
import { SKILLS } from '../constants';
import { Cpu, Database, Layout, Server, Cloud, Code2, Activity } from 'lucide-react';

const Skills: React.FC = () => {
  return (
    <section className="py-20 md:py-32 px-4 bg-darker relative overflow-hidden scroll-mt-10" id="skills">
      {/* Dynamic Background Grid */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-end mb-10 md:mb-16 border-b border-slate-800 pb-6"
        >
          <div>
            <div className="flex items-center gap-2 text-primary mb-2">
              <Activity size={16} className="animate-pulse" />
              <span className="font-mono text-xs tracking-wider">SYSTEM DIAGNOSTICS</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Modules</span>
            </h2>
          </div>
          <div className="hidden md:block text-right font-mono text-xs text-slate-500">
            <p>MEMORY_USAGE: OPTIMIZED</p>
            <p>DRIVERS: UP_TO_DATE</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {SKILLS.map((category, index) => {
            const Icon = category.icon as React.ComponentType<{ size: number; className?: string }>;
            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="h-full"
              >
                <div className="h-full bg-[#0c0c0c] rounded-lg border border-slate-800 shadow-xl overflow-hidden flex flex-col hover:border-primary/50 transition-colors group relative">
                  {/* Terminal Header */}
                  <div className="bg-slate-900/90 px-3 py-2 border-b border-slate-800 flex items-center justify-between backdrop-blur-sm">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.6)]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                    </div>
                    <div className="text-slate-400 text-[10px] font-mono flex items-center gap-2 opacity-80">
                      <span className="hidden sm:inline">oussama@portfolio:~</span>
                      <span className="text-slate-600">|</span>
                      <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>

                  {/* Terminal Content */}
                  <div className="p-4 md:p-5 flex-1 font-mono text-sm relative bg-black/40">
                    {/* Scanline Effect */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] z-10 pointer-events-none bg-[length:100%_2px,3px_100%] opacity-20" />

                    <div className="flex items-center gap-2 text-primary mb-4 border-b border-slate-800/50 pb-2 relative z-20">
                      <Icon size={16} className="text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]" />
                      <span className="font-bold text-slate-100 tracking-wide">{category.name}</span>
                    </div>

                    <div className="space-y-3 relative z-20">
                      {/* Shell Commands */}
                      <div className="text-xs mb-4 font-mono leading-relaxed">
                        <div className="flex flex-wrap gap-2 items-center">
                          <span className="text-emerald-400 font-bold">oussama@portfolio:~$</span>
                          <span className="text-slate-100">cd</span>
                          <span className="text-blue-400 font-semibold">{category.name.toLowerCase().replace(/\s+/g, '-')}</span>
                        </div>
                        <div className="flex flex-wrap gap-2 items-center">
                          <span className="text-emerald-400 font-bold">oussama@portfolio:~/<span className="text-blue-400">{category.name.toLowerCase().replace(/\s+/g, '-')}</span>$</span>
                          <span className="text-slate-100">ls -la</span>
                        </div>
                      </div>

                      {/* Skills List */}
                      <div className="pl-1 space-y-1.5">
                        {category.skills.map((skill, i) => (
                          <div key={skill} className="flex items-center gap-3 text-slate-300 hover:text-cyan-300 transition-colors group/item">
                            <span className="text-slate-600 text-[10px] font-light group-hover/item:text-slate-500 transition-colors">-rwxr-xr-x</span>
                            <span className="text-slate-600 text-[10px] font-light group-hover/item:text-slate-500 transition-colors">root</span>
                            <span className="text-slate-200 font-medium tracking-wide group-hover/item:translate-x-1 transition-transform duration-300 group-hover/item:text-cyan-300 group-hover/item:drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">{skill}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-3 flex items-center gap-2">
                        <span className="text-emerald-400 text-xs font-bold">oussama@portfolio:~/<span className="text-blue-400">{category.name.toLowerCase().replace(/\s+/g, '-')}</span>$</span>
                        <span className="animate-pulse text-emerald-400 w-2.5 h-5 bg-emerald-400/80 block shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
