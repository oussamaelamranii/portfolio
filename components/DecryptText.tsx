
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface DecryptTextProps {
  text: string;
  speed?: number;
  className?: string;
}

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+-=[]{}|;:,.<>?";

const DecryptText: React.FC<DecryptTextProps> = ({ text, speed = 30, className }) => {
  const [displayText, setDisplayText] = useState(text.split('').map(() => ' '));
  const iterationRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const animate = () => {
      intervalRef.current = setInterval(() => {
        setDisplayText(prev => 
          text.split('').map((char, index) => {
            if (index < iterationRef.current) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
        );

        if (iterationRef.current >= text.length) {
            if(intervalRef.current) clearInterval(intervalRef.current);
        }

        iterationRef.current += 1; // Resolve 1 character every frame (Faster)
      }, speed);
    };

    // Trigger animation on mount
    animate();

    return () => {
      if(intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, speed]);

  return (
    <motion.span className={className}>
      {displayText.join('')}
    </motion.span>
  );
};

export default DecryptText;
