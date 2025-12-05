import { useState, useEffect } from 'react';
import { Switch, Route } from 'wouter';
import { queryClient } from './lib/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';

import BootLoader from './components/BootLoader';
import NoiseOverlay from './components/NoiseOverlay';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import ProjectsSection from './components/ProjectsSection';
import BentoGrid from './components/BentoGrid';
import CloudSection from './components/CloudSection';
import DevelopersSection from './components/DevelopersSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import InstallPrompt from './components/InstallPrompt';
import OfflineIndicator from './components/OfflineIndicator';

function HomePage() {
  return (
    <div className="min-h-screen bg-[#030303]">
      <Navigation />
      <main>
        <HeroSection />
        <ProjectsSection />
        <BentoGrid />
        <CloudSection />
        <DevelopersSection />
        <ContactSection />
      </main>
      <Footer />
      <InstallPrompt />
      <OfflineIndicator />
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route>
        <div className="min-h-screen bg-[#030303] flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-mono text-6xl font-bold text-[#EDEDED] mb-4">404</h1>
            <p className="font-mono text-sm text-[#888888] uppercase tracking-widest">
              PAGE NOT FOUND
            </p>
            <a
              href="/"
              className="inline-block mt-8 px-6 py-3 font-mono text-xs uppercase tracking-widest bg-[#EDEDED] text-[#030303] border border-[#EDEDED]"
            >
              RETURN HOME
            </a>
          </div>
        </div>
      </Route>
    </Switch>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {isLoading ? (
          <BootLoader
            key="bootloader"
            onComplete={() => setIsLoading(false)}
            duration={3000}
          />
        ) : (
          <>
            <NoiseOverlay />
            <Router />
          </>
        )}
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
