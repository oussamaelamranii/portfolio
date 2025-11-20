
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
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group relative"
              >
                {/* Card Container */}
                <div className="h-full bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-xl p-5 md:p-6 transition-all duration-200 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(0,136,255,0.1)]">
                  
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-5 pb-4 border-b border-slate-800 group-hover:border-primary/30 transition-colors">
                    <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 group-hover:border-primary/50 group-hover:text-primary transition-all">
                      <Icon size={24} className="text-slate-400 group-hover:text-primary transition-colors" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base md:text-lg font-bold text-slate-200 font-mono leading-tight">{category.name}</h3>
                      <div className="w-full h-1 bg-slate-800 mt-2 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: "100%" }}
                          transition={{ delay: 0.2 + index * 0.05, duration: 0.6 }}
                          className="h-full bg-gradient-to-r from-primary to-secondary"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Skills List */}
                  <div className="space-y-3">
                    {category.skills.map((skill, i) => (
                      <div key={skill} className="flex items-center justify-between group/skill">
                        <span className="text-sm text-slate-400 font-mono group-hover/skill:text-white transition-colors">
                          {skill}
                        </span>
                        <span className="h-[1px] flex-1 mx-3 bg-slate-800 group-hover/skill:bg-primary/30 transition-colors" />
                        <span className="text-[10px] text-slate-600 group-hover/skill:text-primary transition-colors">
                          OK
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Corner Decor */}
                  <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-slate-600 rounded-tr opacity-50 group-hover:border-primary group-hover:opacity-100 transition-all" />
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-slate-600 rounded-bl opacity-50 group-hover:border-primary group-hover:opacity-100 transition-all" />
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
