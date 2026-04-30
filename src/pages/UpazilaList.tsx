import React from 'react';
import { motion } from 'motion/react';
import { UPAZILAS } from '../data/upazilas';
import UpazilaCard from '../components/UpazilaCard';
import { MapPin, Search } from 'lucide-react';

export default function UpazilaList() {
  return (
    <div className="pt-40 pb-32 bg-bg-light min-h-screen">
      <section className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-16 mb-24">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 bg-accent/10 px-6 py-2.5 rounded-full text-accent text-[11px] font-bold uppercase tracking-[0.4em]">Administrative Units</div>
            <h1 className="text-5xl md:text-8xl font-bold text-slate-900 leading-none tracking-tight">উপজেলা <span className="text-accent underline decoration-[12px] decoration-accent/20 underline-offset-[16px]">সমূহ</span></h1>
            <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl">
              টাঙ্গাইল জেলার ১২টি উপজেলা। প্রতিটি উপজেলার নিজস্ব ঐতিহ্য এবং প্রশাসনিক তথ্যাবলী এখান থেকে সংগ্রহ করতে পারবেন।
            </p>
          </div>

          <div className="relative group w-full md:w-96">
            <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-300 w-6 h-6 group-focus-within:text-primary transition-all" />
            <input 
              type="text" 
              placeholder="উপজেলা খুঁজুন..."
              className="w-full pl-18 pr-8 py-6 bg-white border border-slate-100 rounded-[50px] shadow-[0_10px_30px_rgba(0,0,0,0.02)] focus:shadow-md focus:border-primary/20 outline-none transition-all font-bold text-slate-900 text-lg"
            />
          </div>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {UPAZILAS.map((upazila, index) => (
            <UpazilaCard key={upazila.id} upazila={upazila} index={index} />
          ))}
        </div>
      </section>

      {/* Decorative Footer Accent */}
      <div className="max-w-7xl mx-auto px-6 mt-32">
         <div className="h-[2px] bg-gradient-to-r from-transparent via-slate-100 to-transparent" />
      </div>
    </div>
  );
}
