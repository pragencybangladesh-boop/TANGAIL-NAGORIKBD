import { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, Search, MapPin, Shield, Ambulance, Flame, Landmark, Siren, PhoneCall } from 'lucide-react';
import { UPAZILAS } from '../data/upazilas';

interface Contact {
  name: string;
  role: string;
  phone: string;
  category: 'Administration' | 'Police' | 'Fire' | 'Health';
  upazila: string;
}

const CONTACTS: Contact[] = [
  // Tangail Sadar
  { name: 'উপজেলা নির্বাহী অফিসার', role: 'প্রশাসনিক প্রধান', phone: '০১৭৩৩-৩৩৬৮০০', category: 'Administration', upazila: 'tangail-sadar' },
  { name: 'ওসি, সদর থানা', role: 'আইনশৃঙ্খলা', phone: '০১৩২০-১১০৯০০', category: 'Police', upazila: 'tangail-sadar' },
  { name: 'ফায়ার সার্ভিস স্টেশন', role: 'জরুরি সেবা', phone: '০৯৯১-৬৩১৩৩', category: 'Fire', upazila: 'tangail-sadar' },
  { name: 'সিভিল সার্জন অফিস', role: 'স্বাস্থ্য সেবা', phone: '০৯৯১-৬২৪২৪', category: 'Health', upazila: 'tangail-sadar' },
  
  // Madhupur
  { name: 'ইউএনও, মধুপুর', role: 'প্রশাসনিক প্রধান', phone: '০১৭৩৩-৩৩৬৮০৭', category: 'Administration', upazila: 'madhupur' },
  { name: 'ওসি, মধুপুর থানা', role: 'আইনশৃঙ্খলা', phone: '০১৩২০-১১০৯২৫', category: 'Police', upazila: 'madhupur' },
  
  // Mirzapur
  { name: 'ইউএনও, মির্জাপুর', role: 'প্রশাসনিক প্রধান', phone: '০১৭৩৩-৩৩৬৮০৮', category: 'Administration', upazila: 'mirzapur' },
  { name: 'ফায়ার সার্ভিস, মির্জাপুর', role: 'জরুরি সেবা', phone: '০১৭৩৩-৩৩৬৮০৮', category: 'Fire', upazila: 'mirzapur' },
];

export default function Contacts() {
  const [search, setSearch] = useState('');
  const [selectedUpazila, setSelectedUpazila] = useState('all');

  const filteredContacts = CONTACTS.filter(c => 
    (selectedUpazila === 'all' || c.upazila === selectedUpazila) &&
    (c.name.includes(search) || c.role.includes(search) || c.phone.includes(search))
  );

  return (
    <div className="pt-40 pb-32 bg-bg-light min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Modern Header */}
        <div className="text-center space-y-10 mb-24">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-4 bg-accent/10 px-6 py-2.5 rounded-full text-accent shadow-sm"
          >
            <Siren className="w-5 h-5 animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-[0.4em]">Emergency Directory</span>
          </motion.div>
          <div className="space-y-6">
            <h1 className="text-5xl md:text-8xl font-bold text-slate-900 tracking-tight leading-none uppercase">জরুরি <span className="text-accent underline decoration-[12px] decoration-accent/20 underline-offset-[16px]">যোগাযোগ</span></h1>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">টাঙ্গail জেলার প্রতিটি উপজেলা ও পৌরসভার প্রশাসনিক এবং জরুরি সেবা প্রদানকারী কর্মকর্তাদের সাথে যোগাযোগের সরাসরি ডিরেক্টরি।</p>
          </div>
        </div>

        {/* Dynamic Controls Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20 items-center">
          <div className="lg:col-span-5 relative group">
            <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-300 w-6 h-6 group-focus-within:text-primary transition-all" />
            <input
              type="text"
              placeholder="নাম বা পদবী দিয়ে খুঁজুন..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-slate-100 rounded-[50px] py-6 pl-18 pr-8 font-bold text-slate-900 outline-none shadow-[0_10px_30px_rgba(0,0,0,0.02)] focus:shadow-md transition-all text-lg"
            />
          </div>
          <div className="lg:col-span-3 relative">
            <select
              value={selectedUpazila}
              onChange={(e) => setSelectedUpazila(e.target.value)}
              className="w-full bg-white border border-slate-100 rounded-[50px] py-6 px-10 font-bold text-slate-700 outline-none shadow-[0_10px_30px_rgba(0,0,0,0.02)] focus:shadow-md transition-all appearance-none cursor-pointer text-lg"
            >
              <option value="all">সকল উপজেলা</option>
              {UPAZILAS.map(u => (
                <option key={u.id} value={u.id}>{u.name}</option>
              ))}
            </select>
            <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none text-slate-300">
               <MapPin className="w-5 h-5" />
            </div>
          </div>
          <div className="lg:col-span-4 bg-primary text-white flex items-center justify-between gap-10 rounded-[50px] py-4 px-10 shadow-2xl shadow-primary/20">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">National Helpline</span>
              <span className="text-4xl font-bold tracking-tighter">৩৩৩</span>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">Police Emergency</span>
              <span className="text-4xl font-bold tracking-tighter text-accent">৯৯৯</span>
            </div>
          </div>
        </div>

        {/* Refined Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredContacts.map((contact, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group bg-white p-12 rounded-[4rem] border border-slate-50 shadow-[0_20px_50px_rgba(0,0,0,0.02)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.06)] transition-all duration-700 flex flex-col gap-10 relative overflow-hidden"
            >
              <div className="flex justify-between items-start relative z-10">
                <div className={`w-20 h-20 rounded-3xl flex items-center justify-center p-4 shadow-inner transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 ${
                  contact.category === 'Administration' ? 'bg-indigo-50/50 text-indigo-600' :
                  contact.category === 'Police' ? 'bg-blue-50/50 text-blue-600' :
                  contact.category === 'Fire' ? 'bg-rose-50/50 text-rose-600' :
                  'bg-emerald-50/50 text-emerald-600'
                }`}>
                  {contact.category === 'Administration' && <Landmark className="w-full h-full" />}
                  {contact.category === 'Police' && <Shield className="w-full h-full" />}
                  {contact.category === 'Fire' && <Flame className="w-full h-full" />}
                  {contact.category === 'Health' && <Ambulance className="w-full h-full" />}
                </div>
                <div className="text-right">
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-300 mb-2">{UPAZILAS.find(u => u.id === contact.upazila)?.nameEn}</p>
                  <div className="inline-flex items-center gap-2 text-slate-400 font-bold text-xs bg-slate-50 px-4 py-1.5 rounded-full">
                    <MapPin className="w-4 h-4" /> {UPAZILAS.find(u => u.id === contact.upazila)?.name}
                  </div>
                </div>
              </div>

              <div className="relative z-10 space-y-3">
                <h3 className="text-3xl font-bold text-slate-900 group-hover:text-primary transition-colors tracking-tight">{contact.name}</h3>
                <p className="text-accent font-bold uppercase text-[11px] tracking-[0.3em]">{contact.role}</p>
              </div>

              <div className="mt-auto relative z-10">
                <a 
                  href={`tel:${contact.phone}`}
                  className="flex items-center justify-between bg-bg-light hover:bg-primary p-8 rounded-[2.5rem] transition-all duration-500 group/link"
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-white/30 transition-colors">Direct Number</span>
                    <span className="text-2xl font-bold text-slate-900 group-hover:text-white transition-colors tracking-tighter">{contact.phone}</span>
                  </div>
                  <div className="w-14 h-14 bg-white rounded-2xl shadow-xl flex items-center justify-center text-primary group-hover:bg-accent group-hover:text-primary transition-all duration-500 transform group-hover:rotate-12">
                    <PhoneCall className="w-7 h-7" />
                  </div>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
