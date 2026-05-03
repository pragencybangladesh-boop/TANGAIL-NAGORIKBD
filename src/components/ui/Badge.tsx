import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'danger' | 'success' | 'outline' | 'slate';
  className?: string;
}

export default function Badge({ children, variant = 'primary', className = '' }: BadgeProps) {
  const variants = {
    primary: 'bg-primary/10 text-primary border-primary/20',
    secondary: 'bg-slate-100 text-slate-600 border-slate-200',
    accent: 'bg-accent/10 text-accent border-accent/20',
    danger: 'bg-rose-50 text-rose-600 border-rose-100',
    success: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    outline: 'bg-transparent border border-slate-200 text-slate-600',
    slate: 'bg-slate-100 text-slate-500 border-slate-200',
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
