import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X, Terminal } from "lucide-react";

/**
 * Interface extending the Event for PWA install prompt.
 * Represents the beforeinstallprompt event with additional methods.
 */
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

/**
 * InstallPrompt component that handles PWA installation prompts.
 * Displays a modal to install the app as a PWA after a delay.
 * Manages the beforeinstallprompt event and user interactions.
 *
 * @returns {JSX.Element | null} An animated install prompt modal or null if already installed
 */
export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
      return;
    }

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);

      setTimeout(() => setShowPrompt(true), 5000);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      setIsInstalled(true);
    }

    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
  };

  if (isInstalled) return null;

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50"
          data-testid="install-prompt"
        >
          <div className="p-4 bg-[#0A0A0A] border border-[rgba(255,255,255,0.08)]">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center border border-[#00FF00]/30 bg-[#00FF00]/10">
                  <Terminal className="w-5 h-5 text-[#00FF00]" />
                </div>
                <div>
                  <h4 className="font-mono text-sm font-bold text-[#EDEDED]">
                    INSTALL APP
                  </h4>
                  <p className="font-mono text-xs text-[#888888]">
                    cmd+i / ctrl+i
                  </p>
                </div>
              </div>
              <button
                onClick={handleDismiss}
                className="text-[#888888] hover:text-[#EDEDED] transition-colors"
                data-testid="button-dismiss-install"
                aria-label="Dismiss install prompt"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="font-mono text-xs text-[#888888] mb-4">
              Install ./d3v3l0p3r as an app for faster access and offline
              support.
            </p>

            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleInstall}
                className="flex-1 px-4 py-2 font-mono text-xs uppercase tracking-widest bg-[#00FF00] text-[#030303] border border-[#00FF00] flex items-center justify-center gap-2"
                data-testid="button-install-app"
              >
                <Download className="w-3 h-3" />
                INSTALL
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDismiss}
                className="px-4 py-2 font-mono text-xs uppercase tracking-widest bg-transparent text-[#888888] border border-[rgba(255,255,255,0.08)]"
                data-testid="button-later-install"
              >
                LATER
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
