import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WifiOff, Wifi } from 'lucide-react';

export default function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(true);
  const [showIndicator, setShowIndicator] = useState(false);

  useEffect(() => {
    setIsOnline(navigator.onLine);

    const handleOnline = () => {
      setIsOnline(true);
      setShowIndicator(true);
      setTimeout(() => setShowIndicator(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowIndicator(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <AnimatePresence>
      {showIndicator && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className={`fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 border ${
            isOnline
              ? 'bg-[#00FF00]/10 border-[#00FF00]/30'
              : 'bg-[#FF0000]/10 border-[#FF0000]/30'
          }`}
          data-testid="offline-indicator"
        >
          <div className="flex items-center gap-3">
            {isOnline ? (
              <Wifi className="w-4 h-4 text-[#00FF00]" />
            ) : (
              <WifiOff className="w-4 h-4 text-[#FF0000]" />
            )}
            <span className={`font-mono text-xs uppercase tracking-widest ${
              isOnline ? 'text-[#00FF00]' : 'text-[#FF0000]'
            }`}>
              {isOnline ? 'SYSTEM ONLINE' : 'SYSTEM OFFLINE / LOCAL MODE ACTIVE'}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
