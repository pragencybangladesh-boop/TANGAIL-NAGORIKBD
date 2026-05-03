import React from 'react';
import { motion } from 'motion/react';
import { 
  Trophy, Medal, Star, User, ShieldCheck, 
  Building2, Briefcase, GraduationCap, MapPin, 
  Crown, Award, CheckCircle2, TrendingUp
} from 'lucide-react';

const TOP_CATEGORIES = [
  {
    id: 'uno',
    title: 'সেরা ৩ উপজেলা নির্বাহী কর্মকর্তা (UNO)',
    items: [
      { name: 'মোঃ আব্দুল্লাহ আল মামুন', designation: 'ইউএনও, ত্রিশাল', rank: 1, image: 'https://i.pravatar.cc/150?u=uno1' },
      { name: 'জান্নাতুল ফেরদৌস', designation: 'ইউএনও, ফুলপুর', rank: 2, image: 'https://i.pravatar.cc/150?u=uno2' },
      { name: 'রফিকুল ইসলাম', designation: 'ইউএনও, গফরগাঁও', rank: 3, image: 'https://i.pravatar.cc/150?u=uno3' },
    ]
  },
  {
    id: 'oc',
    title: 'সেরা ৩ অফিসার ইনচার্জ (OC)',
    items: [
      { name: 'মোঃ শাহ্‌ কামাল আকন্দ', designation: 'ওসি, সদর', rank: 1, image: 'https://i.pravatar.cc/150?u=oc1' },
      { name: 'রফিকুল ইসলাম', designation: 'ওসি, ফুলপুর', rank: 2, image: 'https://i.pravatar.cc/150?u=oc2' },
      { name: 'ফিরোজ তালুকদার', designation: 'ওসি, ভালুকা', rank: 3, image: 'https://i.pravatar.cc/150?u=oc3' },
    ]
  },
  {
    id: 'upazila',
    title: 'সেরা ৩ উপজেলা',
    items: [
      { name: 'ত্রিশাল উপজেলা', designation: 'সাফল্য সূচক: ৯৮%', rank: 1, image: 'https://images.unsplash.com/photo-1541467658290-75bc49195d24?w=400&h=400&fit=crop' },
      { name: 'মুক্তাগাছা উপজেলা', designation: 'সাফল্য সূচক: ৯৫%', rank: 2, image: 'https://images.unsplash.com/photo-1541467658290-75bc49195d24?w=400&h=400&fit=crop' },
      { name: 'ঈশ্বরগঞ্জ উপজেলা', designation: 'সাফল্য সূচক: ৯২%', rank: 3, image: 'https://images.unsplash.com/photo-1541467658290-75bc49195d24?w=400&h=400&fit=crop' },
    ]
  },
  {
    id: 'offices',
    title: 'সেরা ৩ সরকারি অফিস',
    items: [
      { name: 'উপজেলা ভূমি অফিস, ত্রিশাল', designation: 'ডিজিটাল সেবা ক্যাটাগরি', rank: 1, image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=400&fit=crop' },
      { name: 'উপজেলা স্বাস্থ্য কমপ্লেক্স, ফুলপুর', designation: 'জনস্বাস্থ্য সেবা ক্যাটাগরি', rank: 2, image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=400&fit=crop' },
      { name: 'উপজেলা কৃষি অফিস, গফরগাঁও', designation: 'কৃষক সহায়তা ক্যাটাগরি', rank: 3, image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=400&fit=crop' },
    ]
  },
  {
    id: 'officers',
    title: 'সেরা ৩ সরকারি কর্মকর্তা',
    items: [
      { name: 'আরিফুর রহমান', designation: 'এসিল্যান্ড, ত্রিশাল', rank: 1, image: 'https://i.pravatar.cc/150?u=off1' },
      { name: 'শারমিন আক্তার', designation: 'উপজেলা শিক্ষা অফিসার, মুক্তাগাছা', rank: 2, image: 'https://i.pravatar.cc/150?u=off2' },
      { name: 'কামাল হোসেন', designation: 'উপজেলা কৃষি অফিসার, ঈশ্বরগঞ্জ', rank: 3, image: 'https://i.pravatar.cc/150?u=off3' },
    ]
  },
  {
    id: 'volunteers',
    title: 'সেরা ৩ ভলান্টিয়ার',
    items: [
      { name: 'আরিফ আহমেদ', designation: 'Top 1 - ভলান্টিয়ার সার্ভিস', rank: 1, image: 'https://i.pravatar.cc/150?u=v1' },
      { name: 'সুমাইয়া তাসনিম', designation: 'Top 2 - ভলান্টিয়ার সার্ভিস', rank: 2, image: 'https://i.pravatar.cc/150?u=v2' },
      { name: 'রাকিবুল ইসলাম', designation: 'Top 3 - ভলান্টিয়ার সার্ভিস', rank: 3, image: 'https://i.pravatar.cc/150?u=v3' },
    ]
  }
];

const CITIZENS = [
  { name: 'আব্দুল কাদের', upazila: 'ত্রিশাল' },
  { name: 'ফারহানা ইয়াসমিন', upazila: 'ফুলপুর' },
  { name: 'নজরুল ইসলাম', upazila: 'গফরগাঁও' },
  { name: 'আয়েশা সিদ্দিকা', upazila: 'মুক্তাগাছা' },
  { name: 'এমদাদুল হক', upazila: 'ঈশ্বরগঞ্জ' },
  { name: 'রেহানা বেগম', upazila: 'ভালুকা' },
  { name: 'জহিরুল আলম', upazila: 'নান্দাইল' },
  { name: 'সায়মা আক্তার', upazila: 'গৌরীপুর' },
  { name: 'মাহবুব রহমান', upazila: 'ফুলবাড়িয়া' },
  { name: 'লিপি আক্তার', upazila: 'হালুয়াঘাট' },
  { name: 'শফিকুল ইসলাম', upazila: 'ধোবাউড়া' },
  { name: 'কামরুন নাহার', upazila: 'তারাকান্দা' },
  { name: 'রফিক আহমেদ', upazila: 'সদর' },
];

export default function Leaderboard() {
  return (
    <div className="pt-24 md:pt-40 pb-32 bg-white min-h-screen">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 mb-20 text-center">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-50 rounded-full border border-amber-100 mb-4">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-600">Performance Leaderboard</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black text-slate-900 tracking-tight leading-none">
            সেরা অর্জনকারী <span className="text-primary italic">লিডারবোর্ড</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 font-medium max-w-3xl mx-auto leading-relaxed">
            ময়মনসিংহ জেলার মেধা, কর্মদক্ষতা ও সেবার ভিত্তিতে নির্বাচিত মাসিক শ্রেষ্ঠ ব্যক্তিত্ব ও প্রতিষ্ঠানসমূহ।
          </p>
          <p className="text-[11px] font-bold text-red-500 mt-2">
            নিচের ডাটাগুলা ডেমু ডাটা আগামী মাস থেকে এটা আপডেট করা হবে।
          </p>
        </motion.div>
      </section>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-6 space-y-32">
        {TOP_CATEGORIES.map((category) => (
          <section key={category.id} className="space-y-12">
            <div className="flex items-center gap-4">
              <div className="h-0.5 w-12 bg-primary" />
              <h2 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight">{category.title}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {category.items.map((item, idx) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={`relative p-8 rounded-[2.5rem] border transition-all duration-500 overflow-hidden ${
                    item.rank === 1 
                      ? 'bg-slate-900 border-slate-900 text-white shadow-2xl scale-105 z-10' 
                      : 'bg-white border-slate-100 hover:border-primary/20 shadow-sm'
                  }`}
                >
                  {/* Rank Badge */}
                  <div className={`absolute top-6 right-6 w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl shadow-lg rotate-12 ${
                    item.rank === 1 ? 'bg-amber-400 text-slate-900' :
                    item.rank === 2 ? 'bg-slate-200 text-slate-600' :
                    'bg-amber-100 text-amber-700'
                  }`}>
                    #{item.rank}
                  </div>

                  <div className="flex flex-col items-center text-center space-y-6">
                    <div className={`w-28 h-28 rounded-full p-1.5 border-2 ${item.rank === 1 ? 'border-amber-400/30' : 'border-slate-100'}`}>
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full rounded-full object-cover grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-500" 
                      />
                    </div>
                    
                    <div className="space-y-1">
                      <h3 className={`text-xl font-black tracking-tight ${item.rank === 1 ? 'text-white' : 'text-slate-900'}`}>{item.name}</h3>
                      <p className={`text-xs font-bold uppercase tracking-widest ${item.rank === 1 ? 'text-amber-400/80' : 'text-primary'}`}>
                        {item.designation}
                      </p>
                    </div>

                    <div className={`pt-6 border-t w-full flex items-center justify-center gap-2 ${item.rank === 1 ? 'border-white/10' : 'border-slate-50'}`}>
                      <Award className={`w-4 h-4 ${item.rank === 1 ? 'text-amber-400' : 'text-primary'}`} />
                      <span className="text-[10px] font-black uppercase tracking-widest leading-none">
                        Best Performance
                      </span>
                    </div>
                  </div>

                  {/* Abstract décor */}
                  {item.rank === 1 && (
                    <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/5 rounded-full blur-3xl pointer-events-none" />
                  )}
                </motion.div>
              ))}
            </div>
          </section>
        ))}

        {/* Global Citizen Awards */}
        <section className="bg-slate-900 rounded-[3rem] p-12 md:p-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-400/5 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="relative z-10 space-y-16">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-none">সেরা সচেতন নাগরিক</h2>
              <p className="text-slate-400 font-medium text-lg max-w-2xl mx-auto">প্রতিটি উপজেলা থেকে নির্বাচিত একজন সেরা সচেতন নাগরিক যারা জেলার উন্নয়নে ভূমিকা রাখছেন।</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {CITIZENS.map((c, idx) => (
                <motion.div
                  key={c.name}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-center gap-4 hover:bg-white/10 transition-all group"
                >
                  <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm tracking-tight">{c.name}</h4>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{c.upazila} উপজেলা</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="pt-10 flex justify-center">
              <p className="text-[11px] font-black text-amber-400/40 uppercase tracking-[0.5em] italic">
                {/* Footer note removed */}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
