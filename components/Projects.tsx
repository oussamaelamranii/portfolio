import React from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from '../constants';
import { ExternalLink, Zap, Globe, Server, FolderGit2 } from 'lucide-react';

const Projects: React.FC = () => {
  return (
    <section className="py-32 px-4 bg-darker relative scroll-mt-20" id="projects">
      {/* Background Dot Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center mb-20"
        >
          <div className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono mb-4 flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            ACTIVE MISSIONS
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Deployed <span className="text-white">Operations</span>
          </h2>
          <p className="text-slate-400 font-mono text-sm">
            // ACCESSING SECURE PROJECT REPOSITORIES...
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group h-full"
            >
              <div className="h-full flex flex-col bg-slate-900 border border-slate-800 rounded-xl overflow-hidden group-hover:border-primary/50 group-hover:shadow-[0_0_30px_rgba(14,165,233,0.15)] transition-all duration-300">
                
                {/* Card Header - Code Editor Tab */}
                <div className="bg-slate-950 border-b border-slate-800 p-3 flex items-center justify-between">
                   <div className="flex items-center gap-2">
                      <FolderGit2 size={14} className="text-slate-500" />
                      <span className="text-xs font-mono text-slate-400 truncate max-w-[150px]">~/{project.title.toLowerCase().replace(/\s+/g, '-')}</span>
                   </div>
                   <div className="flex gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-slate-800 group-hover:bg-red-500/50 transition-colors" />
                      <div className="w-2 h-2 rounded-full bg-slate-800 group-hover:bg-yellow-500/50 transition-colors" />
                   </div>
                </div>

                {/* Body */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                       <span className="text-[10px] font-mono text-primary mb-1 block uppercase tracking-wider">{project.category} MODULE</span>
                       <h3 className="text-xl font-bold text-white leading-tight group-hover:text-primary transition-colors">{project.title}</h3>
                    </div>
                    {project.status === 'In Progress' ? (
                       <div className="px-2 py-1 rounded bg-yellow-500/10 text-yellow-500 text-[10px] font-bold border border-yellow-500/20 flex items-center gap-1">
                         <Zap size={10} /> BUILDING
                       </div>
                    ) : (
                       <div className="px-2 py-1 rounded bg-green-500/10 text-green-500 text-[10px] font-bold border border-green-500/20 flex items-center gap-1">
                         <Globe size={10} /> LIVE
                       </div>
                    )}
                  </div>

                  <div className="space-y-3 mb-6 flex-1">
                     {project.description.map((desc, i) => (
                       <p key={i} className="text-sm text-slate-400 leading-relaxed border-l border-slate-800 pl-3">
                         {desc}
                       </p>
                     ))}
                  </div>

                  {/* Tech Footer */}
                  <div className="pt-4 border-t border-slate-800 flex flex-wrap gap-2">
                     {project.tech.slice(0, 4).map((t) => (
                        <span key={t} className="text-[10px] font-mono text-slate-500 bg-slate-950 px-2 py-1 rounded border border-slate-800 group-hover:text-white group-hover:border-slate-600 transition-colors">
                           {t}
                        </span>
                     ))}
                     {project.tech.length > 4 && (
                        <span className="text-[10px] font-mono text-slate-600 px-1 py-1">+{project.tech.length - 4}</span>
                     )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
