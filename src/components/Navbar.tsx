import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, UserPlus, LogOut, LayoutDashboard, Bot } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';
import Logo from './Logo';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'হোম', path: '/' },
    { name: 'পরিচিতি', path: '/about' },
    { name: 'সেবাসমূহ', path: '/services' },
    { name: 'উপজেলা', path: '/upazilas' },
    { name: 'নোটিশ', path: '/notices' },
    { name: 'অভিযোগ', path: '/grievance' },
    { name: 'লিডারবোর্ড', path: '/volunteers' },
    { name: 'জেলার ব্লাড ব্যাংক', path: '/blood-bank' },
    { name: 'Good Governance', path: '/governance' },
    { name: 'নাগরিক AI', path: '/nagorik-ai' },
  ];

  const navigate = useNavigate();

  const handleMobileNav = (path: string) => {
    setIsOpen(false);
    navigate(path);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-[20px] border-b border-border/50 shadow-sm py-4 px-4 sm:px-6 md:px-12">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group" onClick={() => setIsOpen(false)}>
          <Logo size={36} showTagline={true} />
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-bold text-heading">
          {navLinks.slice(1, 6).map((link) => (
            <Link key={link.name} to={link.path} className="hover:text-primary transition-colors">
              {link.name}
            </Link>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-4">
          <Link to="/nagorik-ai" className="p-2.5 bg-primary/5 text-primary rounded-xl hover:bg-primary/10 transition-all border border-primary/10 group-hover:shadow-lg" title="নাগরিক AI">
            <Bot className="w-5 h-5"/>
          </Link>
          {user ? (
            <>
              {isAdmin && (
                <Link to="/admin" className="text-primary font-bold flex items-center gap-2 text-sm"><LayoutDashboard className="w-4 h-4"/> ড্যাশবোর্ড</Link>
              )}
              <button onClick={() => signOut(auth)} className="text-body font-bold flex items-center gap-2 text-sm"><LogOut className="w-4 h-4"/> লগআউট</button>
            </>
          ) : (
            <>
              <Link to="/auth" className="text-body font-bold text-sm">প্রবেশ</Link>
              <Link to="/auth" className="bg-primary text-white text-[12px] uppercase tracking-widest py-2.5 px-6 rounded-full font-bold hover:shadow-lg transition-all">নিবন্ধন</Link>
            </>
          )}
        </div>

        <button 
          className="p-2 rounded-xl text-body bg-border/50 hover:bg-border transition-all md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-[76px] z-[999] bg-background p-8 overflow-y-auto min-h-screen md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.name} 
                  onClick={() => handleMobileNav(link.path)}
                  className="text-left text-xs font-semibold text-heading border-b border-border pb-2 block w-full"
                >
                  {link.name}
                </button>
              ))}
              <button
                onClick={() => handleMobileNav('/auth')}
                className="text-left text-xs font-semibold text-heading border-b border-border pb-2 block w-full"
              >
                নিবন্ধন করুন
              </button>
              <div className="grid grid-cols-1 gap-4 pt-6">
                {user ? (
                  <>
                     {isAdmin && <Link to="/admin" onClick={() => setIsOpen(false)} className="bg-primary text-white text-center py-2 rounded-full font-bold">ড্যাশবোর্ড</Link>}
                     <button onClick={() => {signOut(auth); setIsOpen(false);}} className="bg-border text-heading text-center py-2 rounded-full font-bold">লগআউট</button>
                  </>
                ) : (
                  <>
                    <Link to="/auth" onClick={() => setIsOpen(false)} className="bg-primary text-white text-center py-2 rounded-full font-bold">প্রবেশ করুন</Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
