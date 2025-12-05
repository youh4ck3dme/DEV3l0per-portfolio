import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import CreditCard, { type CardData } from './CreditCard';

const cardData: CardData[] = [
  {
    id: 'excuse',
    name: 'The Excuse',
    logo: 'LOCALHOST_BANK',
    number: 'HTTP 200 404 500 418',
    holder: 'WORKS ON MY MACHINE',
    expiry: 'WHEN_DEPLOYED',
    gradient: 'linear-gradient(135deg, #1a365d 0%, #0a1628 100%)',
  },
  {
    id: 'git',
    name: 'Git Struggle',
    logo: 'GIT_COMMIT_LTD',
    number: 'a1b2 c3d4 e5f6 HEAD',
    holder: 'MERGE CONFLICT SURVIVOR',
    expiry: 'FORCE_PUSH',
    gradient: 'linear-gradient(135deg, #2d2d2d 0%, #0a0a0a 100%)',
  },
  {
    id: 'tech',
    name: 'Tech Stack',
    logo: 'REACT_NATIVE_UNION',
    number: 'USE EFFECT HOOK ARRAY',
    holder: 'COMPONENT ARCHITECT',
    expiry: 'V 18.2.0',
    gradient: 'linear-gradient(135deg, #6b21a8 0%, #0891b2 100%)',
  },
  {
    id: 'caffeine',
    name: 'Caffeine',
    logo: 'CAFFEINE_OS',
    number: 'C0FF EE00 DEAD BEEF',
    holder: 'CODE GENERATOR',
    expiry: '03:00 AM',
    gradient: 'linear-gradient(135deg, #b45309 0%, #422006 100%)',
  },
  {
    id: 'hire',
    name: 'Hire Me',
    logo: 'OPEN_TO_WORK',
    number: '+1 (DEV) 404-NOT-FOUND',
    holder: 'YOUR FUTURE SENIOR DEV',
    expiry: 'ASAP',
    gradient: 'linear-gradient(135deg, #166534 0%, #0a1f0a 100%)',
  },
];

export default function CardScanner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scannerX, setScannerX] = useState(50);
  const [scannedCards, setScannedCards] = useState<Set<string>>(new Set());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    let animationId: number;

    const drawScanner = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const beamWidth = 4;

      const gradient = ctx.createLinearGradient(centerX - 50, 0, centerX + 50, 0);
      gradient.addColorStop(0, 'rgba(0, 255, 255, 0)');
      gradient.addColorStop(0.3, 'rgba(0, 255, 255, 0.1)');
      gradient.addColorStop(0.5, 'rgba(0, 255, 255, 0.8)');
      gradient.addColorStop(0.7, 'rgba(0, 255, 255, 0.1)');
      gradient.addColorStop(1, 'rgba(0, 255, 255, 0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(centerX - 50, 0, 100, canvas.height);

      ctx.shadowBlur = 20;
      ctx.shadowColor = '#00FFFF';
      ctx.fillStyle = '#00FFFF';
      ctx.fillRect(centerX - beamWidth / 2, 0, beamWidth, canvas.height);

      ctx.shadowBlur = 0;

      animationId = requestAnimationFrame(drawScanner);
    };

    drawScanner();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  useEffect(() => {
    const checkScannedCards = () => {
      if (!containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const scannerPosition = containerRect.left + containerRect.width / 2;

      const cards = containerRef.current.querySelectorAll('[data-card-id]');
      const newScannedCards = new Set<string>();

      cards.forEach((card) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;

        if (Math.abs(cardCenter - scannerPosition) < 80) {
          newScannedCards.add(card.getAttribute('data-card-id') || '');
        }
      });

      setScannedCards(newScannedCards);
    };

    const interval = setInterval(checkScannedCards, 100);
    return () => clearInterval(interval);
  }, []);

  const duplicatedCards = [...cardData, ...cardData];

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden py-8"
      data-testid="card-scanner"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />

      <motion.div
        className="flex gap-8 px-4"
        animate={{ x: [0, -((cardData.length * 352))] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: 30,
            ease: 'linear',
          },
        }}
      >
        {duplicatedCards.map((card, index) => (
          <div key={`${card.id}-${index}`} data-card-id={card.id}>
            <CreditCard card={card} isScanned={scannedCards.has(card.id)} />
          </div>
        ))}
      </motion.div>

      <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-[#030303] to-transparent z-20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#030303] to-transparent z-20 pointer-events-none" />
    </div>
  );
}
