
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
              whileHover={{ y: -8 }}
              className="group h-full"
            >
              <div className="relative h-full bg-surface border border-slate-800 rounded-xl overflow-hidden group hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(99,102,241,0.2)] flex flex-col">

                {/* Image Section */}
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent z-10" />
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Overlay Actions */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 z-20 backdrop-blur-sm">
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
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-heading font-bold text-white group-hover:text-primary transition-colors">{project.title}</h3>
                    <span className="text-xs font-mono text-slate-500 border border-slate-800 px-2 py-1 rounded bg-slate-900/50">
                      {project.year || '2024'}
                    </span>
                  </div>

                  <p className="text-slate-400 text-sm mb-6 leading-relaxed flex-1">
                    {project.description[0]}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.slice(0, 3).map((t, i) => (
                      <span key={i} className="text-[10px] font-mono text-primary bg-primary/10 px-2 py-1 rounded border border-primary/20">
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
