import React, { memo, useMemo } from "react";
import { motion } from "framer-motion";

export interface CardData {
  id: string;
  name: string;
  logo: string;
  number: string;
  holder: string;
  expiry: string;
  gradient: string;
}

interface CreditCardProps {
  card: CardData;
  isScanned?: boolean;
}

const CreditCard = memo(function CreditCard({
  card,
  isScanned = false,
}: CreditCardProps) {
  const asciiChars = useMemo(() => "01@#$%&*!?<>[]{}|/\\", []);

  const generateAsciiMatrix = useMemo(
    () => (text: string) => {
      return text
        .split("")
        .map(() => asciiChars[Math.floor(Math.random() * asciiChars.length)])
        .join("");
    },
    [asciiChars]
  );

  return (
    <motion.div
      className="relative w-[320px] h-[200px] flex-shrink-0 rounded-lg overflow-hidden"
      whileHover={{ scale: 1.02 }}
      data-testid={`credit-card-${card.id}`}
    >
      <div
        className={`absolute inset-0 p-6 border border-[rgba(255,255,255,0.08)] rounded-lg transition-opacity duration-300 ${
          isScanned ? "opacity-0" : "opacity-100"
        }`}
        style={{ background: card.gradient }}
      >
        <div className="flex justify-between items-start mb-8">
          <div className="font-mono text-xs uppercase tracking-widest text-white/80">
            {card.logo}
          </div>
          <div className="w-10 h-6 bg-gradient-to-r from-yellow-400 to-yellow-200 opacity-80 rounded-sm" />
        </div>

        <div className="font-mono text-lg tracking-widest text-white mb-6">
          {card.number}
        </div>

        <div className="flex justify-between items-end">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-white/60 mb-1">
              CARD HOLDER
            </div>
            <div className="font-mono text-sm uppercase tracking-wider text-white">
              {card.holder}
            </div>
          </div>
          <div className="text-right">
            <div className="font-mono text-[10px] uppercase tracking-widest text-white/60 mb-1">
              EXPIRES
            </div>
            <div className="font-mono text-sm uppercase tracking-wider text-white">
              {card.expiry}
            </div>
          </div>
        </div>
      </div>

      <div
        className={`absolute inset-0 p-6 bg-[#0A0A0A] border border-[#00FFFF] rounded-lg transition-opacity duration-300 overflow-hidden ${
          isScanned ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="font-mono text-[10px] text-[#00FFFF] whitespace-nowrap overflow-hidden"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {generateAsciiMatrix(card.number.repeat(5))}
            </div>
          ))}
        </div>

        <div className="relative z-10">
          <div className="flex justify-between items-start mb-8">
            <div className="font-mono text-xs uppercase tracking-widest text-[#00FFFF]">
              {isScanned ? generateAsciiMatrix(card.logo) : card.logo}
            </div>
            <div className="font-mono text-xs text-[#00FF00]">DECRYPTED</div>
          </div>

          <div className="font-mono text-lg tracking-widest text-[#00FFFF] mb-6">
            {isScanned ? generateAsciiMatrix(card.number) : card.number}
          </div>

          <div className="flex justify-between items-end">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-[#00FFFF]/60 mb-1">
                IDENTITY
              </div>
              <div className="font-mono text-sm uppercase tracking-wider text-[#00FFFF]">
                {isScanned ? generateAsciiMatrix(card.holder) : card.holder}
              </div>
            </div>
            <div className="text-right">
              <div className="font-mono text-[10px] uppercase tracking-widest text-[#00FFFF]/60 mb-1">
                TIMEOUT
              </div>
              <div className="font-mono text-sm uppercase tracking-wider text-[#00FFFF]">
                {isScanned ? generateAsciiMatrix(card.expiry) : card.expiry}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

export default CreditCard;
