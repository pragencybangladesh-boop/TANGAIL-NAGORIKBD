import React from 'react';
import { useLanguage } from '../context/LanguageContext';

interface LogoProps {
  className?: string;
  showText?: boolean;
  showTagline?: boolean;
  size?: number;
  monochrome?: boolean;
}

export default function Logo({ 
  className = "", 
  showText = true, 
  showTagline = false,
  size = 40,
  monochrome = false
}: LogoProps) {
  const { language } = useLanguage();
  const primaryColor = monochrome ? 'currentColor' : '#00693E';
  const secondaryColor = monochrome ? 'currentColor' : '#047857';
  const head1Color = monochrome ? 'currentColor' : '#E8001C';
  const head2Color = monochrome ? 'currentColor' : '#dc2626';
  const head3Color = monochrome ? 'currentColor' : '#b91c1c';

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        {/* Figure 1 - Largest */}
        <path d="M30 65 L50 35 L70 65" stroke={primaryColor} strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="50" cy="25" r="10" fill={head1Color} />

        {/* Figure 2 - Medium Left */}
        <path d="M15 75 L25 55 L35 75" stroke={secondaryColor} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="25" cy="50" r="6" fill={head2Color} />

        {/* Figure 3 - Medium Right */}
        <path d="M65 75 L75 55 L85 75" stroke={secondaryColor} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="75" cy="50" r="6" fill={head3Color} />
        
        {/* Ground */}
        <path d="M20 85 Q50 95 80 85" stroke={secondaryColor} strokeWidth="4" strokeLinecap="round" fill="none" opacity={monochrome ? '0.5' : '0.3'} />
      </svg>
      
      {showText && (
        <div className="flex flex-col">
          <div className="flex font-serif text-lg leading-none">
            <span className="text-[#00693E] font-bold">Nagorik</span>
            <span className="text-[#E8001C] font-bold ml-1">BD</span>
          </div>
          {showTagline && (
            <span className="text-[10px] font-medium text-slate-500 mt-0.5 leading-tight">
              {language === 'bn' ? 'নাগরিক সমৃদ্ধি উন্নয়ন' : 'Citizen Growth & Development'}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
