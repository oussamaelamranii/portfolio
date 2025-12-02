
import React from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from '../constants';
import { ExternalLink, Zap, Globe, Server, FolderGit2, Github } from 'lucide-react';

const Projects: React.FC = () => {
  return (
    <section className="py-20 md:py-32 px-4 bg-darker relative scroll-mt-10" id="projects">
      {/* Background Dot Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center text-center mb-12 md:mb-20"
        >
          <div className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono mb-4 flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            ACTIVE MISSIONS
          </div>
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mb-4">
            Deployed <span className="text-white">Operations</span>
          </h2>
          <p className="text-slate-400 font-mono text-sm">
            // ACCESSING SECURE PROJECT REPOSITORIES...
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group h-full"
            >
              <div className="relative h-full bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden group hover:border-primary/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] flex flex-col">

                {/* Glass Reflection */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-50 pointer-events-none" />

                {/* System Status Indicator */}
                <div className="absolute top-3 right-3 z-30 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2 py-1 rounded-full border border-white/10">
                  <div className={`w-1.5 h-1.5 rounded-full ${project.status === 'In Progress' ? 'bg-yellow-500 animate-pulse' : 'bg-emerald-400 shadow-[0_0_8px_#34d399]'}`} />
                  <span className="text-[10px] font-mono text-slate-300 uppercase tracking-wider">{project.status || 'ONLINE'}</span>
                </div>

                {/* Image Section */}
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10" />

                  {/* Scanning Overlay */}
                  <div className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-700 z-20 pointer-events-none" />
                  <div className="absolute w-full h-[2px] bg-primary/50 top-0 left-0 group-hover:animate-scan z-20 shadow-[0_0_10px_#0088ff] hidden group-hover:block" />

                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Overlay Actions */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 z-30 backdrop-blur-sm">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform"
                      title="View Code"
                    >
                      <Github size={20} />
                    </a>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-primary text-white rounded-full hover:scale-110 transition-transform shadow-lg shadow-primary/50"
                      title="Live Demo"
                    >
                      <ExternalLink size={20} />
                    </a>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex-1 flex flex-col relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-heading font-bold text-white group-hover:text-primary transition-colors">{project.title}</h3>
                    <span className="text-xs font-mono text-slate-400 border border-white/10 px-2 py-1 rounded-full bg-slate-800/50">
                      {project.year || '2024'}
                    </span>
                  </div>

                  <p className="text-slate-400 text-sm mb-6 leading-relaxed flex-1">
                    {project.description[0]}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.slice(0, 3).map((t, i) => (
                      <span key={i} className="text-[10px] font-mono text-primary bg-primary/10 px-2 py-1 rounded-md border border-primary/20 group-hover:border-primary/40 transition-colors">
                        {t}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="text-[10px] font-mono text-slate-500 px-2 py-1">
                        +{project.tech.length - 3}
                      </span>
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
