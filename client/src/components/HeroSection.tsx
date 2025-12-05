import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import ParticleBackground from "./ParticleBackground";

/**
 * HeroSection component that renders the main hero section of the portfolio.
 * Features interactive mouse tracking, animated text, call-to-action buttons,
 * and statistics display with particle background.
 *
 * @returns {JSX.Element} The hero section with animations and interactive elements
 */
export default function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    }
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      data-testid="hero-section"
      style={{
        background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(255,255,255,0.02) 0%, transparent 50%)`,
      }}
    >
      <ParticleBackground className="opacity-30" />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.08)] to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.08)] to-transparent" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-4 max-w-6xl mx-auto"
      >
        <motion.div variants={itemVariants} className="mb-4">
          <span className="font-mono text-xs uppercase tracking-widest text-[#444444]">
            PORTFOLIO / v1.0.0 / 2024
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="font-mono text-[12vw] md:text-[10vw] lg:text-[8vw] font-bold tracking-tighter leading-none text-[#EDEDED] glitch-effect"
          data-text="./d3v3l0p3r"
        >
          ./d3v3l0p3r
        </motion.h1>

        <motion.div variants={itemVariants} className="mt-8 mb-12">
          <p className="font-mono text-lg md:text-xl text-[#888888] max-w-2xl mx-auto">
            Digital Brutalism meets Code.
            <br />
            <span className="text-[#00FF00]">Raw. Fast. Uncompromising.</span>
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => console.log("View Projects clicked")}
            className="px-8 py-3 font-mono text-sm uppercase tracking-widest bg-[#EDEDED] text-[#030303] border border-[#EDEDED] hover-elevate"
            data-testid="button-view-projects"
          >
            VIEW PROJECTS
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => console.log("Contact clicked")}
            className="px-8 py-3 font-mono text-sm uppercase tracking-widest bg-transparent text-[#EDEDED] border border-[rgba(255,255,255,0.08)] hover-elevate"
            data-testid="button-contact-hero"
          >
            CONTACT
          </motion.button>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-24 grid grid-cols-3 gap-8 max-w-md mx-auto"
        >
          <div className="text-center">
            <div className="font-mono text-3xl font-bold text-[#EDEDED]">
              5+
            </div>
            <div className="font-mono text-xs uppercase tracking-widest text-[#444444] mt-1">
              YEARS EXP
            </div>
          </div>
          <div className="text-center">
            <div className="font-mono text-3xl font-bold text-[#EDEDED]">
              50+
            </div>
            <div className="font-mono text-xs uppercase tracking-widest text-[#444444] mt-1">
              PROJECTS
            </div>
          </div>
          <div className="text-center">
            <div className="font-mono text-3xl font-bold text-[#00FF00]">
              99%
            </div>
            <div className="font-mono text-xs uppercase tracking-widest text-[#444444] mt-1">
              ON TIME
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-xs uppercase tracking-widest text-[#444444]">
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-[#00FF00] to-transparent"
        />
      </motion.div>
    </section>
  );
}
