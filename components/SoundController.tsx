import React, { createContext, useContext, useRef, useEffect } from 'react';

interface SoundContextType {
  playHover: () => void;
  playClick: () => void;
  playSuccess: () => void;
  playAchievement: () => void;
}

const SoundContext = createContext<SoundContextType>({
  playHover: () => {},
  playClick: () => {},
  playSuccess: () => {},
  playAchievement: () => {},
});

export const useSound = () => useContext(SoundContext);

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const audioContextRef = useRef<AudioContext | null>(null);

  const initAudio = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
  };

  // Simple oscillator based synth to avoid loading external MP3s
  const playTone = (freq: number, type: OscillatorType, duration: number, vol: number = 0.1) => {
    initAudio();
    if (!audioContextRef.current) return;
    
    const ctx = audioContextRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    
    gain.gain.setValueAtTime(vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + duration);
  };

  const playHover = () => {
    // High pitched short blip
    playTone(800, 'sine', 0.05, 0.05);
  };

  const playClick = () => {
    // Mechanical click
    playTone(300, 'square', 0.05, 0.05);
  };

  const playSuccess = () => {
    // Rising triad
    setTimeout(() => playTone(440, 'sine', 0.1, 0.1), 0);
    setTimeout(() => playTone(554, 'sine', 0.1, 0.1), 100);
    setTimeout(() => playTone(659, 'sine', 0.2, 0.1), 200);
  };

  const playAchievement = () => {
    // Legendary unlock sound
    initAudio();
    if (!audioContextRef.current) return;
    const ctx = audioContextRef.current;
    const now = ctx.currentTime;

    // Bass thud
    playTone(110, 'square', 0.5, 0.2);
    
    // High shimmering arpeggio
    [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98].forEach((freq, i) => {
      setTimeout(() => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.05, now + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.3);
      }, i * 50);
    });
  };

  // Add global click listener to init audio context on first user interaction
  useEffect(() => {
    const handleInteraction = () => initAudio();
    window.addEventListener('click', handleInteraction, { once: true });
    window.addEventListener('keydown', handleInteraction, { once: true });
    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };
  }, []);

  return (
    <SoundContext.Provider value={{ playHover, playClick, playSuccess, playAchievement }}>
      {children}
    </SoundContext.Provider>
  );
};