import React from 'react';
import { motion } from 'motion/react';
import { Target, History, Users, Award, ShieldCheck, Globe } from 'lucide-react';

export default function About() {
  const values = [
    { title: 'স্বচ্ছতা', icon: ShieldCheck, desc: 'প্রশাসনের প্রতিটি কাজে শতভাগ স্বচ্ছতা ও জবাবদিহিতা বজায় রাখা।' },
    { title: 'উদ্ভাবন', icon: Globe, desc: 'সর্বাধুনিক প্রযুক্তির ব্যবহারের মাধ্যমে সেবা প্রদান সহজতর করা।' },
    { title: 'জনসেবা', icon: Users, desc: 'নাগরিকদের জন্য দ্রুত ও সহজলভ্য ডিজিটাল সেবা নিশ্চিত করা।' },
  ];

  return (
    <div className="pt-40 pb-32 bg-bg-light min-h-screen">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 mb-32 bg-green-50/50 p-12 rounded-[3rem]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-10"
          >
            <div className="inline-flex items-center gap-3 bg-accent/10 px-6 py-2.5 rounded-full text-accent text-[11px] font-bold uppercase tracking-[0.4em]">District Profile</div>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-[1.1] tracking-tight">
              সিলেট জেলা <span className="text-accent underline decoration-[12px] decoration-accent/20 underline-offset-[16px]">পরিচিতি</span>
            </h1>
            <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-xl">
              সিলেট জেলা বাংলাদেশের সিলেট বিভাগের অন্তর্গত একটি ঐতিহাসিক এবং আধ্যাত্মিক রাজধানী। প্রাকৃতিক সৌন্দর্যে ঘেরা এই জেলা সুরমা নদীর তীরে অবস্থিত। হযরত শাহজালাল (রহ.) ও হযরত শাহপরাণ (রহ.)-এর মাজার, চা বাগান, হাওর এবং পাহাড়ী প্রকৃতির জন্য সিলেট বিশ্বজুড়ে সমাদৃত।
            </p>
            <div className="pt-6">
              <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 w-full max-w-[340px] aspect-square flex flex-col justify-center">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">প্রতিষ্ঠাকাল</p>
                    <p className="text-xl font-bold text-primary">১৭৮২ সাল</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">মোট এলাকা</p>
                    <p className="text-xl font-bold text-primary">৩,৪৯০ কি.মি²</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">উপজেলা</p>
                    <p className="text-xl font-bold text-primary">১৩টি</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">জনসংখ্যা</p>
                    <p className="text-xl font-bold text-primary">৩৫ লক্ষ+</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">সাক্ষরতার হার</p>
                    <p className="text-xl font-bold text-primary">৫০%+</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="absolute -inset-10 bg-accent/5 rounded-[5rem] blur-[100px] pointer-events-none" />
            <div className="relative aspect-[4/5] bg-slate-100 rounded-[4rem] overflow-hidden shadow-2xl skew-y-1 hover:skew-y-0 transition-all duration-1000 group">
               <img src="https://images.unsplash.com/photo-1590059536067-1601264b97f1?q=80&w=2000" alt="Sylhet History" loading="lazy" className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-all duration-[2000ms] grayscale brightness-110" />
               <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-40" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Heritage Showcase */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="relative p-12 md:p-32 bg-primary rounded-[5rem] text-white shadow-2xl overflow-hidden group">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white opacity-[0.03] rounded-full blur-[100px] -mr-64 -mt-64 group-hover:scale-110 transition-transform duration-1000" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent opacity-[0.05] rounded-full blur-[80px] -ml-40 -mb-40 group-hover:scale-110 transition-transform duration-1000" />

          <div className="relative z-10 space-y-12">
            <div className="space-y-6">
              <span className="text-accent text-[11px] font-bold uppercase tracking-[0.6em]">Heritage & Legacy</span>
              <h2 className="text-4xl md:text-7xl font-bold leading-[1.1] tracking-tight">আমাদের গর্বিত ইতিহাস <br/>ও অম্লান ঐতিহ্য</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 text-white/70 text-xl font-medium leading-relaxed">
              <p>
                সিলেট জেলা অতি প্রাচীনকাল থেকেই বাংলার এক গুরুত্বপূর্ণ অঞ্চল। হযরত শাহজালাল (রহ.) ও হযরত শাহপরাণ (রহ.)-এর আগমনের পর থেকে এটি আধ্যাত্মিক রাজধানী হিসেবে পরিচিতি পায়। সুরমা ও কুশিয়ারা নদীর তীরে গড়ে ওঠা এই জনপদ ঐতিহ্যে ও সংস্কৃতির ধারক।
              </p>
              <p>
                সিলেটের চা বাগান, জাফলং, রাতারগুল সোয়াম্প ফরেস্ট এবং ভোলাগঞ্জের সাদা পাথর পর্যটকদের জন্য এক অনন্য আকর্ষণ। ১৯৭১ সালের মুক্তিযুদ্ধে সিলেটের অবদান আমাদের জন্য চিরকাল গর্বের বিষয়।
              </p>
            </div>
            <div className="pt-10 flex gap-12 border-t border-white/5">
               <div className="flex flex-col gap-2">
                 <span className="text-white text-3xl font-bold tracking-tighter">১৭৮২</span>
                 <span className="text-white/40 text-[11px] font-bold uppercase tracking-widest">প্রতিষ্ঠাকাল</span>
               </div>
               <div className="flex flex-col gap-2">
                 <span className="text-white text-3xl font-bold tracking-tighter">১৩টি</span>
                 <span className="text-white/40 text-[11px] font-bold uppercase tracking-widest">উপজেলা</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-white py-32 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24 space-y-4">
             <span className="text-accent text-[11px] font-bold uppercase tracking-[0.5em]">Our Values</span>
             <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">আমাদের অঙ্গীকার</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {values.map((v, i) => (
              <motion.div 
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="space-y-8 flex flex-col items-center text-center group"
              >
                <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center shadow-inner group-hover:bg-primary group-hover:text-white transition-all duration-500 transform group-hover:rotate-6">
                  <v.icon className="w-10 h-10" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight group-hover:text-primary transition-colors">{v.title}</h3>
                  <p className="text-slate-500 font-medium leading-relaxed">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
