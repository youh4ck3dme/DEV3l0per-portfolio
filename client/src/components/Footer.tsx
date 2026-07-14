import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, Mail, Terminal } from "lucide-react";
import CardScanner from "./CardScanner";
import ParticleBackground from "./ParticleBackground";

/**
 * Footer component that renders the site footer with social links and branding.
 * Includes a card scanner animation, social media links, and legal information.
 * Features animated particle background and responsive design.
 *
 * @returns {JSX.Element} The footer section with branding and links
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, label: "GitHub", href: "#" },
    { icon: Twitter, label: "Twitter", href: "#" },
    { icon: Linkedin, label: "LinkedIn", href: "#" },
    { icon: Mail, label: "Email", href: "#" },
  ];

  return (
    <footer
      className="relative bg-[#030303] border-t border-[rgba(255,255,255,0.08)]"
      data-testid="footer"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <ParticleBackground className="opacity-10" />
      </div>

      <div className="relative z-10">
        <div className="py-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-8"
          >
            <span className="font-mono text-xs uppercase tracking-widest text-[#444444]">
              SCANNING CREDENTIALS
            </span>
          </motion.div>

          <CardScanner />
        </div>

        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-2"
            >
              <Terminal className="w-5 h-5 text-[#00FF00]" />
              <span className="font-mono text-lg font-bold text-[#EDEDED]">
                ./d3v3l0p3r
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.1,
              }}
              className="flex items-center gap-6"
            >
              {socialLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => console.log(`${link.label} clicked`)}
                  className="w-10 h-10 flex items-center justify-center border border-[rgba(255,255,255,0.08)] rounded-md text-[#888888] hover:text-[#00FFFF] hover:border-[#00FFFF]/30 transition-colors"
                  data-testid={`footer-social-${link.label.toLowerCase()}`}
                  aria-label={link.label}
                >
                  <link.icon className="w-4 h-4" />
                </button>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="mt-12 pt-8 border-t border-[rgba(255,255,255,0.08)]"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="font-mono text-xs text-[#444444]">
                &copy; {currentYear} ./d3v3l0p3r. All rights reserved.
              </p>
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs text-[#444444]">
                  BUILD: v1.0.0
                </span>
                <span className="font-mono text-xs text-[#444444]">|</span>
                <span className="font-mono text-xs text-[#444444]">
                  STATUS: <span className="text-[#00FF00]">ONLINE</span>
                </span>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              {["PRIVACY", "TERMS", "COOKIES", "SITEMAP"].map((item) => (
                <button
                  key={item}
                  onClick={() => console.log(`${item} clicked`)}
                  className="font-mono text-xs uppercase tracking-widest text-[#444444] hover:text-[#888888] transition-colors"
                  data-testid={`footer-link-${item.toLowerCase()}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
