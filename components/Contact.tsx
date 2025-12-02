
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { PROFILE } from '../constants';
import { Send, Mail, MapPin, CheckCircle, Terminal, AlertCircle, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';

// EmailJS Configuration
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const [formState, setFormState] = useState({
    name: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      console.error("EmailJS Error: Missing Environment Variables");
      alert("EmailJS Configuration Error: Please check your .env file for Service ID, Template ID, and Public Key.");
      setStatus('idle');
      return;
    }

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formState.name,
          subject: formState.subject,
          message: formState.message,
          reply_to: PROFILE.email, // Assuming user wants replies to go to them, or we can add an email field to the form
        },
        EMAILJS_PUBLIC_KEY
      );

      setStatus('sent');
      setFormState({ name: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus('idle');
      alert("Failed to send message. Please check console or try again later.");
    }
  };

  return (
    <footer id="contact" className="relative pt-20 md:pt-32 pb-32 md:pb-10 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md border-t border-slate-800" />

      <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Left: Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            COMMUNICATION_LINK_OPEN
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t('contact.title')}
          </h2>

          <p className="text-slate-400 mb-8 leading-relaxed font-light">
            {t('contact.subtitle')}
          </p>

          <div className="space-y-4 md:space-y-6">
            <a href={`mailto:${PROFILE.email}`} className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-primary/50 hover:bg-slate-900 transition-all group">
              <div className="p-3 bg-slate-950 rounded-lg text-primary group-hover:scale-110 transition-transform">
                <Mail size={24} />
              </div>
              <div className="overflow-hidden">
                <div className="text-xs text-slate-500 font-mono uppercase tracking-wider">Electronic Mail</div>
                <div className="text-white font-mono group-hover:text-primary transition-colors truncate">{PROFILE.email}</div>
              </div>
            </a>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="p-3 bg-slate-950 rounded-lg text-secondary">
                <MapPin size={24} />
              </div>
              <div>
                <div className="text-xs text-slate-500 font-mono uppercase tracking-wider">Base Location</div>
                <div className="text-white font-mono">{PROFILE.location}</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right: Terminal Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="relative"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-xl opacity-20 blur-lg" />
          <form onSubmit={handleSubmit} className="relative bg-slate-950 border border-slate-800 rounded-xl p-5 md:p-8 shadow-2xl">
            {/* Terminal Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Terminal size={16} className="text-primary" />
                <span className="text-xs font-mono text-slate-400">TRANSMISSION_CONSOLE.EXE</span>
              </div>
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-red-500/50" />
                <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                <div className="w-2 h-2 rounded-full bg-green-500/50" />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-primary mb-1">{t('contact.name_label')}</label>
                <input
                  type="text"
                  required
                  value={formState.name}
                  onChange={e => setFormState({ ...formState, name: e.target.value })}
                  className="w-full bg-slate-900/50 border border-slate-800 rounded p-3 text-sm md:text-base text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-mono"
                  placeholder="Enter your identification..."
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-primary mb-1">{t('contact.subject_label')}</label>
                <input
                  type="text"
                  required
                  value={formState.subject}
                  onChange={e => setFormState({ ...formState, subject: e.target.value })}
                  className="w-full bg-slate-900/50 border border-slate-800 rounded p-3 text-sm md:text-base text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-mono"
                  placeholder="Purpose of transmission..."
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-primary mb-1">{t('contact.message_label')}</label>
                <textarea
                  rows={4}
                  required
                  value={formState.message}
                  onChange={e => setFormState({ ...formState, message: e.target.value })}
                  className="w-full bg-slate-900/50 border border-slate-800 rounded p-3 text-sm md:text-base text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-mono resize-none"
                  placeholder="Input message data..."
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={status === 'sending' || status === 'sent'}
              className={`mt-6 w-full py-3.5 px-4 rounded flex items-center justify-center gap-2 font-mono text-sm font-bold transition-all overflow-hidden relative ${status === 'sent' ? 'bg-green-500 text-black' : 'bg-primary text-black hover:bg-white'}`}
            >
              {status === 'idle' && (
                <>
                  <Send size={16} /> {t('contact.send_btn')}
                </>
              )}
              {status === 'sending' && (
                <>
                  <span className="animate-spin mr-2">⟳</span> {t('contact.sending')}
                </>
              )}
              {status === 'sent' && (
                <>
                  <CheckCircle size={16} /> {t('contact.sent')}
                </>
              )}

              {/* Scanning Line Effect */}
              {status === 'sending' && (
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ repeat: Infinity, duration: 0.5 }} // Faster scan
                />
              )}
            </button>
          </form>
        </motion.div>
      </div>

      <div className="mt-16 border-t border-slate-900 pt-8 text-center pb-16 md:pb-0">
        <p className="text-slate-600 text-xs font-mono">
          © 2025 OUSSAMA ELAMRANI | SYSTEM INTEGRITY VERIFIED
        </p>
      </div>
    </footer>
  );
};

export default Contact;
