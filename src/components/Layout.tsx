import React, { useEffect } from 'react';
import Navbar from './Navbar';
import NewsTicker from './NewsTicker';
import Footer from './Footer';
import Chatbot from './Chatbot';
import InstallPwaBanner from './InstallPwaBanner';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

interface LayoutProps {
  children: React.ReactNode;
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen selection:bg-primary selection:text-white overflow-x-hidden w-full relative">
      <ScrollToTop />
      <Navbar />
      <NewsTicker />
      <main className="flex-grow w-full relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="w-full relative"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <Chatbot />
      <InstallPwaBanner />
    </div>
  );
}
