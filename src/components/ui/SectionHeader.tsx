import React from 'react';
import { motion } from 'motion/react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  badge?: string;
  align?: 'left' | 'center';
  className?: string;
}

export default function SectionHeader({ title, subtitle, description, badge, align = 'center', className = '' }: SectionHeaderProps) {
  const isCenter = align === 'center';
  
  return (
    <div className={`flex flex-col ${isCenter ? 'items-center text-center' : 'items-start text-left'} space-y-4 ${className} mb-12`}>
      {badge && (
        <span className="text-primary bg-primary/5 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
          {badge}
        </span>
      )}
      <div className="space-y-2">
        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
          {title} {subtitle && <span className="text-accent underline decoration-[12px] decoration-accent/20 underline-offset-[16px]">{subtitle}</span>}
        </h2>
      </div>
      {description && (
        <p className="text-slate-500 max-w-2xl text-lg font-medium leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
