import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Users, GraduationCap, Trophy, Heart, Award, Star, Zap, Search } from 'lucide-react';

const TOP_VOLUNTEERS = [
  { name: 'আরিফ আহমেদ', institution: 'টাঙ্গাইল সরকারি কলেজ', points: 1250, rank: 1, image: 'https://i.pravatar.cc/150?u=1' },
  { name: 'সুমাইয়া তাসনিম', institution: 'কুমুদিনী সরকারি কলেজ', points: 1180, rank: 2, image: 'https://i.pravatar.cc/150?u=2' },
  { name: 'রাকিবুল ইসলাম', institution: 'সরকারি মাওলানা মোহাম্মদ আলী কলেজ', points: 1050, rank: 3, image: 'https://i.pravatar.cc/150?u=3' },
];

const INSTITUTIONS = [
  { name: 'টাঙ্গাইল সরকারি কলেজ', volunteers: 420, mission: 15 },
  { name: 'কুমুদিনী সরকারি কলেজ', volunteers: 350, mission: 12 },
  { name: 'সরকারি সা’দত কলেজ', volunteers: 450, mission: 18 },
  { name: 'মির্জাপুর ক্যাডেট কলেজ', volunteers: 120, mission: 5 },
];

export default function Volunteers() {
  return (
    <div className="pt-40 pb-32 bg-bg-light min-h-screen">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           className="flex flex-col items-center text-center space-y-10"
        >
          <div className="inline-flex items-center gap-3 bg-accent/10 px-6 py-2.5 rounded-full text-accent text-[11px] font-bold uppercase tracking-[0.4em]">Youth Empowement</div>
          <h1 className="text-5xl md:text-8xl font-bold text-slate-900 leading-none tracking-tight">
            ভলান্টিয়ার্স <span className="text-accent underline decoration-[12px] decoration-accent/20 underline-offset-[16px]">নেটওয়ার্ক</span>
          </h1>
          <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-3xl mx-auto">
            টাঙ্গাইলের তরুণ প্রজন্মকে ডিজিটাল বিপ্লবে সম্পৃক্ত করতে আমাদের এই উদ্যোগ। শিক্ষা প্রতিষ্ঠানভিত্তিক একদল প্রশিক্ষিত সেচ্ছাসেবক যারা জনগণের দোরগোড়ায় সেবা পৌঁছে দিতে কাজ করছে।
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 pt-6">
            <Link to="/volunteer-registration" className="btn-gold px-12 py-5 text-sm uppercase tracking-[0.2em] shadow-xl shadow-accent/20">ভলান্টিয়ার হিসেবে যুক্ত হোন</Link>
            <button className="px-12 py-5 bg-white text-slate-900 border border-slate-100 rounded-full text-sm font-bold uppercase tracking-[0.2em] hover:bg-slate-50 transition-all shadow-sm">গাইডলাইন দেখুন</button>
          </div>
        </motion.div>
      </section>

      {/* Leaderboard Section */}
      <section className="bg-primary pt-32 pb-48 mb-32 relative overflow-hidden rounded-[4rem] mx-4 md:mx-10 shadow-2xl">
        {/* Abstract background elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[150px] -mr-96 -mt-96 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[100px] -ml-64 -mb-64 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-24 space-y-6">
            <span className="text-accent text-[11px] font-bold uppercase tracking-[0.5em]">Hall of Fame</span>
            <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">সেরা সেচ্ছাসেবক</h2>
            <p className="text-white/40 text-lg max-w-xl mx-auto font-medium">চলতি মাসের পারফরম্যান্সের ভিত্তিতে শীর্ষ ৩ জন ভলান্টিয়ার যারা টাঙ্গাইল জেলার গর্ব।</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {TOP_VOLUNTEERS.map((v, i) => (
              <motion.div 
                key={v.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className={`relative bg-white/5 border border-white/10 p-12 rounded-[3.5rem] backdrop-blur-md group hover:bg-white/10 transition-all ${
                  i === 0 ? 'scale-110 -rotate-1 z-20 shadow-2xl ring-2 ring-accent' : ''
                }`}
              >
                <div className="absolute -top-8 -right-4 w-16 h-16 bg-accent text-primary rounded-2xl flex items-center justify-center font-bold text-2xl shadow-xl rotate-12">
                   #{v.rank}
                </div>
                <div className="flex flex-col items-center text-center space-y-8">
                  <div className="w-28 h-28 rounded-full border-4 border-accent/20 p-1 group-hover:border-accent transition-all ring-8 ring-white/5">
                    <img src={v.image} alt={v.name} className="w-full h-full rounded-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-white tracking-tight leading-none">{v.name}</h3>
                    <p className="text-accent/60 text-[10px] uppercase font-bold tracking-[0.2em]">{v.institution}</p>
                  </div>
                  <div className="pt-8 border-t border-white/5 w-full flex flex-col items-center gap-2">
                    <span className="text-[10px] font-bold uppercase text-white/30 tracking-[0.3em]">অর্জিত পয়েন্ট</span>
                    <span className="text-4xl font-bold text-accent">{v.points}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Development Card */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-slate-200 p-8 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm"
        >
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Volunteer Skill Development Program</h2>
            <p className="text-sm text-slate-600 font-medium">Equipping our volunteers with future-ready skills to serve the community better.</p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {[ 'AI Learning', 'Information OSINT Learning', 'Design & Communication Learning' ].map(skill => (
              <div key={skill} className="px-5 py-2.5 border border-slate-200 text-xs font-bold text-slate-700 bg-slate-50 hover:bg-primary hover:text-white transition-all cursor-pointer">
                {skill}
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* College Units Section */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-16 mb-24">
          <div className="space-y-6">
            <span className="text-accent text-[11px] font-bold uppercase tracking-[0.4em]">Campus Units</span>
            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 leading-none">ইউনিট ভিত্তিক তথ্য</h2>
            <p className="text-slate-500 font-medium text-xl leading-relaxed max-w-xl">টাঙ্গাইলের প্রতিটি প্রধান শিক্ষা প্রতিষ্ঠানে আমাদের সুসংগঠিত ভলান্টিয়ার ইউনিট রয়েছে।</p>
          </div>
          <div className="relative group w-full md:w-96">
            <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-300 w-6 h-6" />
            <input 
              type="text" 
              placeholder="প্রতিষ্ঠান খুঁজুন..." 
              className="w-full pl-18 pr-8 py-6 bg-white border border-slate-100 rounded-[50px] font-bold text-slate-900 shadow-sm focus:shadow-md transition-all outline-none" 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {INSTITUTIONS.map((inst, i) => (
            <motion.div 
              key={inst.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white p-2 border border-slate-200 hover:shadow-sm transition-all duration-300 flex flex-col md:flex-row justify-between items-center gap-2 group"
            >
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-slate-50 flex items-center justify-center shrink-0 group-hover:bg-primary transition-all duration-300">
                  <GraduationCap className="w-4 h-4 text-primary group-hover:text-white" />
                </div>
                <div className="space-y-0.5">
                  <h3 className="text-sm font-bold text-slate-900 leading-tight group-hover:text-primary transition-colors">{inst.name}</h3>
                  <div className="flex items-center gap-1 text-indigo-600">
                    <Zap className="w-3 h-3" />
                    <span className="text-[8px] font-bold uppercase tracking-[0.1em]">{inst.mission}টি সফল মিশন</span>
                  </div>
                </div>
              </div>
              <div className="text-center md:text-right shrink-0 bg-slate-50 px-2 py-1 group-hover:bg-accent/5 transition-colors">
                 <p className="text-sm font-bold text-primary group-hover:text-accent transition-all leading-none tracking-tighter">{inst.volunteers}</p>
                 <p className="text-[7px] font-bold uppercase text-slate-400 tracking-[0.2em] mt-1">সক্রিয় সদস্য</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-primary/5 py-32 rounded-[5rem] mx-4 md:mx-10 border border-primary/5 shadow-inner">
        <div className="max-w-7xl mx-auto px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-16 text-center">
            {[
              { label: 'মোট ভলান্টিয়ার', val: '২,৫০০+', icon: Users },
              { label: 'শিক্ষা প্রতিষ্ঠান', val: '৪৫+', icon: GraduationCap },
              { label: 'সম্পন্ন মিশন', val: '১২০+', icon: Zap },
              { label: 'নাগরিক সেবা', val: '৮,৫০০+', icon: Heart },
            ].map((s, i) => (
              <div key={s.label} className="space-y-6">
                <div className="flex justify-center">
                  <s.icon className="w-8 h-8 text-accent/40" />
                </div>
                 <p className="text-4xl md:text-6xl font-bold text-primary tracking-tighter">{s.val}</p>
                 <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
