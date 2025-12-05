import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Palette, Zap, Globe, Terminal, Layers } from 'lucide-react';

interface BentoCardProps {
  icon: typeof Code;
  title: string;
  description: string;
  size?: 'sm' | 'md' | 'lg';
  accent?: string;
}

function BentoCard({ icon: Icon, title, description, size = 'md', accent = '#00FFFF' }: BentoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      setTilt({ x: y * 5, y: -x * 5 });
    };

    const handleMouseLeave = () => {
      setTilt({ x: 0, y: 0 });
    };

    const card = cardRef.current;
    if (card) {
      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (card) {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  const sizeClasses = {
    sm: 'col-span-1 row-span-1',
    md: 'col-span-1 row-span-2 md:col-span-1',
    lg: 'col-span-1 row-span-1 md:col-span-2',
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative p-6 bg-[#0A0A0A] border border-[rgba(255,255,255,0.08)] ${sizeClasses[size]} hover-elevate overflow-visible`}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.1s ease-out',
      }}
      whileHover={{ scale: 1.01 }}
      data-testid={`bento-card-${title.toLowerCase().replace(/\s/g, '-')}`}
    >
      <div
        className="absolute top-0 left-0 w-full h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${accent}40, transparent)`,
        }}
      />

      <div className="relative z-10 h-full flex flex-col">
        <div
          className="w-10 h-10 flex items-center justify-center border border-[rgba(255,255,255,0.08)] mb-4"
          style={{ color: accent }}
        >
          <Icon className="w-5 h-5" />
        </div>

        <h3 className="font-mono text-lg font-bold tracking-tight text-[#EDEDED] mb-2">
          {title}
        </h3>

        <p className="font-mono text-sm text-[#888888] leading-relaxed flex-1">
          {description}
        </p>

        <div className="mt-4 flex items-center gap-2">
          <div className="w-2 h-2" style={{ backgroundColor: accent }} />
          <span className="font-mono text-xs uppercase tracking-widest text-[#444444]">
            ACTIVE
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function BentoGrid() {
  const cards = [
    {
      icon: Code,
      title: 'Full-Stack Development',
      description: 'Building scalable applications from database to deployment. React, Node, TypeScript, and everything in between.',
      size: 'lg' as const,
      accent: '#00FFFF',
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      description: 'Crafting brutalist interfaces that challenge conventions while maintaining usability.',
      size: 'md' as const,
      accent: '#FF00FF',
    },
    {
      icon: Zap,
      title: 'Performance',
      description: 'Obsessed with speed. Every millisecond counts.',
      size: 'sm' as const,
      accent: '#00FF00',
    },
    {
      icon: Globe,
      title: 'Cloud Architecture',
      description: 'Designing resilient, scalable infrastructure on AWS, GCP, and Azure.',
      size: 'sm' as const,
      accent: '#FFFF00',
    },
    {
      icon: Terminal,
      title: 'DevOps',
      description: 'CI/CD pipelines, containerization, and infrastructure as code. Automation is not optional.',
      size: 'md' as const,
      accent: '#FF6600',
    },
    {
      icon: Layers,
      title: 'System Design',
      description: 'Architecting distributed systems that handle millions of requests without breaking a sweat.',
      size: 'lg' as const,
      accent: '#00FF00',
    },
  ];

  return (
    <section id="about" className="py-24 px-4" data-testid="bento-grid-section">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-[#444444]">
            CAPABILITIES
          </span>
          <h2 className="font-mono text-4xl md:text-5xl font-bold tracking-tighter text-[#EDEDED] mt-2">
            What I Do
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1],
                delay: index * 0.1,
              }}
            >
              <BentoCard {...card} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
