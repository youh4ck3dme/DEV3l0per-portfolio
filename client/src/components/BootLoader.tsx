import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface BootLoaderProps {
  onComplete: () => void;
  duration?: number;
}

export default function BootLoader({ onComplete, duration = 3000 }: BootLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [currentLine, setCurrentLine] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const bootLines = [
    '> INITIALIZING SYSTEM...',
    '> LOADING CORE MODULES...',
    '> CONNECTING TO ./d3v3l0p3r...',
    '> DECRYPTING PORTFOLIO DATA...',
    '> BOOT SEQUENCE COMPLETE',
  ];

  useEffect(() => {
    const startTime = Date.now();
    const endTime = startTime + duration;

    const updateProgress = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      
      setProgress(Math.floor(newProgress));

      const lineIndex = Math.floor((newProgress / 100) * bootLines.length);
      setCurrentLine(Math.min(lineIndex, bootLines.length - 1));

      if (now < endTime) {
        intervalRef.current = setTimeout(updateProgress, 50);
      } else {
        setTimeout(onComplete, 500);
      }
    };

    updateProgress();

    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    };
  }, [duration, onComplete]);

  useEffect(() => {
    const text = bootLines[currentLine];
    let charIndex = 0;
    setDisplayText('');

    const typeInterval = setInterval(() => {
      if (charIndex <= text.length) {
        setDisplayText(text.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typeInterval);
      }
    }, 30);

    return () => clearInterval(typeInterval);
  }, [currentLine]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030303]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      data-testid="boot-loader"
    >
      <div className="w-full max-w-md px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <h1 className="font-mono text-4xl md:text-6xl font-bold tracking-tighter text-[#EDEDED]">
            ./dev
          </h1>
          <div className="mt-2 font-mono text-xs uppercase tracking-widest text-[#444444]">
            SYSTEM v1.0.0
          </div>
        </motion.div>

        <div className="space-y-4">
          <div className="font-mono text-sm text-[#888888] h-6">
            {displayText}
            <span className="terminal-cursor" />
          </div>

          <div className="relative h-1 w-full bg-[#0A0A0A] border border-[rgba(255,255,255,0.08)] rounded-sm overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 h-full bg-[#00FF00]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          <div className="flex justify-between font-mono text-xs text-[#444444] uppercase tracking-widest">
            <span>LOADING</span>
            <span>{progress}%</span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 space-y-1"
        >
          {bootLines.slice(0, currentLine + 1).map((line, index) => (
            <div
              key={index}
              className={`font-mono text-xs ${
                index === currentLine ? 'text-[#00FF00]' : 'text-[#444444]'
              }`}
            >
              {line}
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
