import React from 'react';
import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string;
  icon?: LucideIcon;
  description?: string;
  className?: string;
}

export default function StatCard({ label, value, icon: Icon, description, className = '' }: StatCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all ${className}`}
    >
      {Icon && (
        <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary mb-4">
          <Icon className="w-6 h-6" />
        </div>
      )}
      <div className="space-y-1">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
        <p className="text-2xl font-bold text-slate-900 leading-tight">{value}</p>
        {description && <p className="text-xs text-slate-500 mt-2">{description}</p>}
      </div>
    </motion.div>
  );
}
