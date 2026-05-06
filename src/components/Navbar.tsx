import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, UserPlus, LogOut, LayoutDashboard, Bot, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';
import Logo from './Logo';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, isAdmin } = useAuth();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.services'), path: '/services' },
    { name: t('nav.upazilas'), path: '/upazilas' },
    { name: t('nav.market'), path: '/market-monitor' },
    { name: t('nav.notices'), path: '/notices' },
    { name: t('nav.grievance'), path: '/grievance' },
    { name: t('nav.volunteers'), path: '/volunteers' },
    { name: t('nav.blood'), path: '/blood-bank' },
    { name: t('nav.governance'), path: '/governance' },
    { name: t('nav.transparency'), path: '/transparency' },
    { name: t('nav.privacy'), path: '/privacy' },
    { name: t('nav.ai'), path: '/nagorik-ai' },
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
          <button
            onClick={() => setLanguage(language === 'bn' ? 'en' : 'bn')}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-border/40 hover:bg-border transition-all text-sm font-bold text-heading mr-2"
            title={language === 'bn' ? 'Switch to English' : 'বাংলায় দেখুন'}
          >
            <Globe className="w-4 h-4 text-primary" />
            <span>{language === 'bn' ? 'EN' : 'বাংলা'}</span>
          </button>

          <Link to="/nagorik-ai" className="p-2.5 bg-primary/5 text-primary rounded-xl hover:bg-primary/10 transition-all border border-primary/10 group-hover:shadow-lg" title={t('nav.ai')}>
            <Bot className="w-5 h-5"/>
          </Link>
          {user ? (
            <>
              {isAdmin && (
                <Link to="/admin" className="text-primary font-bold flex items-center gap-2 text-sm"><LayoutDashboard className="w-4 h-4"/> {t('nav.dashboard')}</Link>
              )}
              <Link to="/profile" className="text-body font-bold flex items-center gap-2 text-sm hover:text-primary transition-colors"><User className="w-4 h-4"/> {t('nav.profile')}</Link>
              <button onClick={() => signOut(auth)} className="text-body font-bold flex items-center gap-2 text-sm hover:text-primary transition-colors"><LogOut className="w-4 h-4"/> {t('nav.logout')}</button>
            </>
          ) : (
            <>
              <Link to="/auth" className="text-body font-bold text-sm">{t('nav.login')}</Link>
              <Link to="/auth" className="bg-primary text-white text-[12px] uppercase tracking-widest py-2.5 px-6 rounded-full font-bold hover:shadow-lg transition-all">{t('nav.register')}</Link>
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
              <button
                onClick={() => {
                  setLanguage(language === 'bn' ? 'en' : 'bn');
                  setIsOpen(false);
                }}
                className="flex items-center justify-between px-4 py-3 rounded-xl bg-border/30 mb-2"
              >
                <div className="flex items-center gap-3 font-bold text-heading text-sm">
                  <Globe className="w-5 h-5 text-primary" />
                  {language === 'bn' ? 'English Language' : 'বাংলা ভাষা'}
                </div>
                <span className="text-xs font-bold text-primary px-2 py-1 bg-white rounded-md shadow-sm">
                  {language === 'bn' ? 'SWITCH' : 'পরিবর্তন'}
                </span>
              </button>
              {navLinks.map((link) => (
                <button
                  key={link.name} 
                  onClick={() => handleMobileNav(link.path)}
                  className="text-left text-xs font-semibold text-heading border-b border-border pb-2 block w-full"
                >
                  {link.name}
                </button>
              ))}
              <div className="grid grid-cols-1 gap-4 pt-6">
                {user ? (
                  <>
                     {isAdmin && <Link to="/admin" onClick={() => setIsOpen(false)} className="bg-primary text-white text-center py-2 rounded-full font-bold">{t('nav.dashboard')}</Link>}
                     <Link to="/profile" onClick={() => setIsOpen(false)} className="bg-slate-100 text-slate-800 text-center py-2 rounded-full font-bold border border-slate-200">{t('nav.profile')}</Link>
                     <button onClick={() => {signOut(auth); setIsOpen(false);}} className="bg-border text-heading text-center py-2 rounded-full font-bold">{t('nav.logout')}</button>
                  </>
                ) : (
                  <>
                    <Link to="/auth" onClick={() => setIsOpen(false)} className="bg-primary text-white text-center py-2 rounded-full font-bold">{t('nav.login')}</Link>
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
