import { useState, useEffect } from 'react';
import { X, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Logo from './Logo';

export default function InstallPwaBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show banner after 3 seconds
    const timer = setTimeout(() => {
      const isDismissed = localStorage.getItem('pwa_banner_dismissed');
      if (!isDismissed) {
        setIsVisible(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('pwa_banner_dismissed', 'true');
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 100, opacity: 0, scale: 0.9 }}
        className="fixed bottom-24 left-4 right-4 z-[60] flex justify-center pointer-events-none"
      >
        <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-100 p-3 flex items-center gap-4 max-w-sm w-full relative pointer-events-auto group">
          {/* Close Button */}
          <button 
            onClick={handleDismiss}
            className="absolute -top-2 -right-2 w-7 h-7 bg-white border border-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 shadow-md transition-transform hover:scale-110"
          >
            <X size={14} />
          </button>

          {/* Icon Box */}
          <div className="w-14 h-14 bg-white border border-slate-100 rounded-xl flex items-center justify-center shrink-0 shadow-sm group-hover:rotate-3 transition-transform duration-500 overflow-hidden p-2">
            <Logo showText={false} size={40} />
          </div>

          {/* Content */}
          <div className="flex-1 space-y-0 text-left">
            <h4 className="text-sm font-bold text-slate-400 tracking-tight leading-none italic">
              Install Now
            </h4>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-emerald-600 tracking-tighter leading-none">
                Nagorik BD
              </span>
            </div>
            <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest mt-1">
              Get the best experience
            </p>
          </div>

          {/* Decoration */}
          <div className="absolute top-0 right-10 w-16 h-16 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
