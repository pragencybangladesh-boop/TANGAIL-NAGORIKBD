import React from 'react';
import { Link } from 'react-router-dom';
import { Upazila } from '../types';
import { ChevronRight, MapPin, Users } from 'lucide-react';
import { motion } from 'motion/react';

interface UpazilaCardProps {
  upazila: Upazila;
  index: number;
  key?: React.Key;
}

export default function UpazilaCard({ upazila, index }: UpazilaCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
    >
      <Link 
        to={`/upazila/${upazila.id}`}
        className="group block bg-card rounded-2xl p-6 border border-border shadow-sm hover:shadow-lg transition-all duration-500"
      >
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2 text-primary">
            <MapPin className="w-5 h-5" />
            <span className="text-sm font-bold text-heading">উপজেলা</span>
          </div>
          <span className="text-4xl font-bold text-slate-200 leading-none">{(index + 1).toString().padStart(2, '0')}</span>
        </div>
        
        <div className="space-y-1 mb-6">
          <h3 className="text-2xl font-bold text-primary leading-none group-hover:text-primary transition-colors">{upazila.name}</h3>
          <p className="text-sm text-body">{upazila.nameEn}</p>
          <p className="text-sm italic text-body mt-2">"{upazila.description}"</p>
        </div>

        <div className="pt-4 border-t border-border flex items-center justify-between text-body">
            <div className="flex items-center gap-2">
                <span className="text-xs">□ {upazila.area}</span>
            </div>
            <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span className="text-xs">{upazila.population}</span>
            </div>
        </div>
      </Link>
    </motion.div>
  );
}
