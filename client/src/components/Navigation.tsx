import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Menu, X, Terminal } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "HOME", href: "#home" },
  { label: "PROJECTS", href: "#projects" },
  { label: "ABOUT", href: "#about" },
  { label: "CLOUD", href: "#cloud" },
  { label: "DEVELOPERS", href: "#developers" },
  { label: "CONTACT", href: "#contact" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const handleNavClick = useCallback((href: string) => {
    setIsOpen(false);
    setActiveSection(href.replace("#", ""));
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-40 transition-all duration-300 ${
          isScrolled ? "top-2" : "top-4"
        }`}
        data-testid="navigation"
      >
        <div
          className={`flex items-center gap-2 px-2 py-2 border border-[rgba(255,255,255,0.08)] rounded-lg bg-[#0A0A0A]/90 backdrop-blur-sm transition-all duration-300 ${
            isScrolled ? "scale-95" : "scale-100"
          }`}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleNavClick("#home")}
            className="flex items-center gap-2 px-3 py-2 font-mono text-sm text-[#00FF00] hover-elevate"
            data-testid="nav-logo"
          >
            <Terminal className="w-4 h-4" />
            <span className="hidden sm:inline">./dev</span>
          </motion.button>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <motion.button
                key={item.label}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleNavClick(item.href)}
                className={`px-3 py-2 font-mono text-xs uppercase tracking-widest transition-colors hover-elevate ${
                  activeSection === item.href.replace("#", "")
                    ? "text-[#00FF00] bg-[rgba(0,255,0,0.1)]"
                    : "text-[#888888] hover:text-[#EDEDED]"
                }`}
                data-testid={`nav-item-${item.label.toLowerCase()}`}
              >
                {item.label}
              </motion.button>
            ))}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-[#EDEDED] hover-elevate"
            data-testid="nav-mobile-toggle"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      <motion.div
        initial={false}
        animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -20 }}
        className={`fixed inset-0 z-30 bg-[#030303]/95 backdrop-blur-sm flex flex-col items-center justify-center gap-4 md:hidden ${
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        data-testid="nav-mobile-menu"
      >
        {navItems.map((item, index) => (
          <motion.button
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isOpen ? 1 : 0,
              y: isOpen ? 0 : 20,
            }}
            transition={{ delay: index * 0.1 }}
            onClick={() => handleNavClick(item.href)}
            className={`font-mono text-2xl uppercase tracking-widest ${
              activeSection === item.href.replace("#", "")
                ? "text-[#00FF00]"
                : "text-[#888888]"
            }`}
            data-testid={`nav-mobile-item-${item.label.toLowerCase()}`}
          >
            {item.label}
          </motion.button>
        ))}
      </motion.div>
    </>
  );
}
