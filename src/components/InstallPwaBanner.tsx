import { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function InstallPwaBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show banner after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-50 p-4"
        >
            <div className="bg-white rounded-2xl shadow-2xl border border-border p-4 flex items-center justify-between gap-4 max-w-md mx-auto">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white">
                        <Download size={20} />
                    </div>
                    <div>
                        <h4 className="font-bold text-heading text-sm">Install Nagorik BD</h4>
                        <p className="text-body text-xs">আমাদের সেবাগুলো দ্রুত পেতে অ্যাপটি ইন্সটল করুন।</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button 
                        onClick={() => setIsVisible(false)}
                        className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                        <X size={18} />
                    </button>
                    <button className="bg-primary text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-primary/90 transition-all">
                        ইন্সটল করুন
                    </button>
                </div>
            </div>
        </motion.div>
    </AnimatePresence>
  );
}
