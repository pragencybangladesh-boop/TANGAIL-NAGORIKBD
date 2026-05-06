import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'bn' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const translations: Record<Language, Record<string, string>> = {
  bn: {
    'nav.home': 'হোম',
    'nav.about': 'পরিচিতি',
    'nav.services': 'সেবাসমূহ',
    'nav.upazilas': 'উপজেলা',
    'nav.market': 'বাজার সর্দার',
    'nav.notices': 'নোটিশ',
    'nav.grievance': 'অভিযোগ',
    'nav.volunteers': 'লিডারবোর্ড',
    'nav.blood': 'জেলার ব্লাড ব্যাংক',
    'nav.governance': 'সত্য জানুন',
    'nav.transparency': 'স্বচ্ছতা ও সুশাসন',
    'nav.privacy': 'গোপনীয়তা নীতি',
    'nav.ai': 'নাগরিক AI',
    'nav.login': 'প্রবেশ',
    'nav.register': 'নিবন্ধন',
    'nav.profile': 'প্রোফাইল',
    'nav.logout': 'লগআউট',
    'nav.dashboard': 'ড্যাশবোর্ড',
  },
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.upazilas': 'Upazilas',
    'nav.market': 'Market Monitor',
    'nav.notices': 'Notices',
    'nav.grievance': 'Grievance',
    'nav.volunteers': 'Leaderboard',
    'nav.blood': 'Blood Bank',
    'nav.governance': 'Governance',
    'nav.transparency': 'Transparency',
    'nav.privacy': 'Privacy Policy',
    'nav.ai': 'Citizen AI',
    'nav.login': 'Login',
    'nav.register': 'Register',
    'nav.profile': 'Profile',
    'nav.logout': 'Logout',
    'nav.dashboard': 'Dashboard',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'bn';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    
    // Google Translate Trigger
    const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    if (select) {
      select.value = lang;
      select.dispatchEvent(new Event('change'));
    }
  };

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
