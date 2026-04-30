import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ChevronRight, X, Info, FileCheck, Clock, ShieldAlert, BookOpen } from 'lucide-react';

interface Service {
  id: string;
  title: string;
  category: 'Emergency' | 'Legal' | 'Educational' | 'General' | 'Digital' | 'Land' | 'Administrative' | 'Agriculture' | 'Social';
  description: string;
  steps: string[];
  docNeeded: string[];
  fee: string;
  duration: string;
  link: string;
}

const SERVICES: Service[] = [
  {
    id: 'birth-reg',
    title: 'অনলাইন জন্ম নিবন্ধন',
    category: 'Digital',
    description: 'নতুন জন্ম নিবন্ধনের আবেদন বা সংশোধনের অনলাইন প্রক্রিয়া।',
    steps: [
      'bdris.gov.bd পোর্টালে যান।',
      'প্রয়োজনীয় তথ্য দিয়ে ফরম পূরণ করুন।',
      'আবেদনের কপি প্রিন্ট করে সংশ্লিষ্ট কার্যালয়ে জমা দিন।'
    ],
    docNeeded: ['পিতা-মাতার এনআইডি', 'টিকাদান কার্ড (শিশুর ক্ষেত্রে)'],
    fee: '৫০ - ১০০ টাকা (বয়স অনুযায়ী)',
    duration: '৭-১৫ কার্যদিবস',
    link: 'https://bdris.gov.bd/'
  },
  {
    id: 'land-mutation',
    title: 'ই-নামজারি ও জোত খোলা',
    category: 'Land',
    description: 'জমির মালিকানা পরিবর্তনের জন্য অনলাইন নামজারি আবেদন।',
    steps: [
      'mutation.land.gov.bd এ আবেদন করুন।',
      'তফসিল অনুযায়ী প্রয়োজনীয় ফি জমা দিন।',
      'শুনানির তারিখ অনুযায়ী এসি ল্যান্ড অফিসে উপস্থিত হোন।'
    ],
    docNeeded: ['দলিলের কপি', 'খতিয়ানের কপি', 'এনআইডি'],
    fee: '১১৫০ টাকা (সরকারি ফি)',
    duration: '২৮ কার্যদিবস',
    link: 'https://mutation.land.gov.bd/'
  },
  {
    id: 'nid-service',
    title: 'NID সেবা',
    category: 'Digital',
    description: 'নতুন ভোটার নিবন্ধন, তথ্য সংশোধন, বা স্মার্ট কার্ড স্ট্যাটাস চেক।',
    steps: [
      'NID পোর্টালে অ্যাকাউন্ট তৈরি করুন।',
      'প্রয়োজনীয় তথ্য দিয়ে আবেদন করুন।',
      'নির্দেশনা অনুযায়ী কেন্দ্রে উপস্থিত হোন।'
    ],
    docNeeded: ['জন্ম সনদ', 'পিতা-মাতার এনআইডি', 'বাসস্থান প্রমাণ'],
    fee: 'বিনা মূল্যে/সংশোধন ফি প্রযোজ্য',
    duration: '১৫-৩০ কার্যদিবস',
    link: 'https://services.nidw.gov.bd/nid-pub/'
  },
  {
    id: 'eksheba',
    title: 'একসেবা (এক ঠিকানায় সকল সেবা)',
    category: 'General',
    description: 'সরকারি সকল নাগরিক সেবা এক জায়গা থেকে উপভোগ করুন।',
    steps: [
      'একসেবা পোর্টালে ভিজিট করুন।',
      'আপনার প্রয়োজনীয় সেবাটি খুঁজুন।',
      'সংশ্লিষ্ট পোর্টালে নির্দেশিকা অনুসরণ করুন।'
    ],
    docNeeded: ['সেবা অনুযায়ী নির্ভরশীল'],
    fee: 'সেবা অনুযায়ী নির্ভরশীল',
    duration: 'সেবা অনুযায়ী নির্ভরশীল',
    link: 'https://www.eksheba.gov.bd/'
  },
  {
    id: 'waris',
    title: 'ওয়ারিশ উত্তরাধিকার সনদ',
    category: 'Administrative',
    description: 'মৃত ব্যক্তির উত্তরাধিকারী নির্ধারণের জন্য প্রশংসাপত্র।',
    steps: [
      'ইউনিয়ন পরিষদ বা পৌরসভায় আবেদন করুন।',
      'সংশ্লিষ্ট মেম্বার বা কাউন্সিলরের যাচাইকরণ।',
      'উপজেলা কার্যালয় থেকে সনদ সংগ্রহ।'
    ],
    docNeeded: ['মৃত্যু সনদ', 'পরিবারের সদস্যদের এনআইডি'],
    fee: '৫০ - ২০০ টাকা',
    duration: '৩-৫ কার্যদিবস',
    link: 'https://www.eksheba.gov.bd/'
  },
  {
    id: 'emergency-ambulance',
    title: 'জরুরি সেবা (৯৯৯)',
    category: 'Emergency',
    description: 'পুলিশ, ফায়ার সার্ভিস ও এম্বুলেন্স সেবা পেতে জরুরি কল।',
    steps: [
      'হটলাইন ৯৯৯ নাম্বারে কল করুন।',
      'আপনার সমস্যা ও লোকেশন জানান।',
      'জরুরি টিমের জন্য অপেক্ষা করুন।'
    ],
    docNeeded: ['প্রযোজ্য নয়'],
    fee: 'বিনা মূল্যে',
    duration: 'তাত্ক্ষণিক',
    link: 'tel:999'
  },
  {
    id: 'agri-support',
    title: 'কৃষি উপকরণ সহায়তা',
    category: 'Agriculture',
    description: 'চাষীদের জন্য উন্নত মানের বীজ ও সার সহায়তা কার্যক্রম।',
    steps: [
      'উপজেলা কৃষি অফিসে নিবন্ধন করুন।',
      'কৃষি কার্ড যাচাইকরণ।',
      'নির্ধারিত ডিলার থেকে সংগ্রহ।'
    ],
    docNeeded: ['কৃষি কার্ড', 'এনআইডি'],
    fee: 'বিনা মূল্যে/ভর্তুকি মূল্য',
    duration: 'মৌসুম অনুযায়ী',
    link: 'http://www.dae.gov.bd/'
  },
  {
    id: 'social-pension',
    title: 'বয়স্ক ও বিধবা ভাতা',
    category: 'Social',
    description: 'সামাজিক নিরাপত্তা কর্মসূচির আওতায় মাসিক আর্থিক সহায়তা।',
    steps: [
      'সমাজসেবা অফিসে আবেদন করুন।',
      'বাছাই কমিটির মাধ্যমে অনুমোদন।',
      'ব্যাংক অ্যাকাউন্টে টাকা গ্রহণ।'
    ],
    docNeeded: ['এনআইডি', 'নাগরিকত্ব সনদ'],
    fee: 'বিনা মূল্যে',
    duration: 'স্থায়ী তালিকাভুক্তকরণ',
    link: 'http://www.dss.gov.bd/'
  },
  {
    id: 'passport-service',
    title: 'ই-পাসপোর্ট আবেদন',
    category: 'Administrative',
    description: 'নতুন ই-পাসপোর্টের জন্য আবেদন এবং নবায়ন।',
    steps: [
      'epassport.gov.bd পোর্টালে একাউন্ট করুন।',
      'আবেদন ফরম পূরণ করে ফি জমা দিন।',
      'নির্ধারিত তারিখে ছবি ও আঙ্গুলের ছাপ দিতে উপস্থিত হোন।'
    ],
    docNeeded: ['এনআইডি/জন্ম সনদ', 'পিতা-মাতার এনআইডি'],
    fee: '৪,০২৫ - ৮,০৫০ টাকা (পৃষ্ঠা ও মেয়াদভেদে)',
    duration: '১৫-২১ কার্যদিবস',
    link: 'https://www.epassport.gov.bd/'
  },
  {
    id: 'brta-service',
    title: 'ড্রাইভিং লাইসেন্স (BRTA)',
    category: 'Administrative',
    description: 'লার্নার ও স্মার্ট ড্রাইভিং লাইসেন্স আবেদন।',
    steps: [
      'BSP পোর্টালে (bsp.brta.gov.bd) প্রোফাইল তৈরি করুন।',
      'মেডিকেল সার্টিফিকেটসহ লার্নারের আবেদন করুন।',
      'পরীক্ষায় উত্তীর্ণ হলে স্মার্ট কার্ডের জন্য ফি জমা দিন।'
    ],
    docNeeded: ['এনআইডি', 'মেডিকেল সার্টিফিকেট', 'ছবি'],
    fee: '৫১৮ - ৩,৪৫০ টাকা',
    duration: 'পরীক্ষা সাপেক্ষে',
    link: 'https://bsp.brta.gov.bd/'
  },
  {
    id: 'police-clearance',
    title: 'পুলিশ ক্লিয়ারেন্স সার্টিফিকেট',
    category: 'Legal',
    description: 'বিদেশে যাওয়া বা চাকরির জন্য অনলাইন পুলিশ ক্লিয়ারেন্স।',
    steps: [
      'pcc.police.gov.bd পোর্টালে নিবন্ধন করুন।',
      'পাসপোর্ট ও ঠিকানার প্রমাণ দিয়ে আবেদন করুন।',
      'সরকার নির্ধারিত ফি সোনালী ব্যাংক/চালানে জমা দিন।'
    ],
    docNeeded: ['পাসপোর্টের কপি', 'চেয়ারম্যান/ওয়ার্ড কাউন্সিলর সনদ'],
    fee: '৫০০ টাকা',
    duration: '৭-১০ কার্যদিবস',
    link: 'https://pcc.police.gov.bd/'
  }
];

export default function Services() {
  const [filter, setFilter] = useState<'All' | 'Emergency' | 'Digital' | 'Land' | 'Administrative' | 'Agriculture' | 'Social'>('All');
  const [search, setSearch] = useState('');
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const filteredServices = SERVICES.filter(s => 
    (filter === 'All' || s.category === filter) &&
    (s.title.toLowerCase().includes(search.toLowerCase()) || s.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="pt-40 pb-32 bg-bg-light min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <span className="text-accent text-[11px] font-bold uppercase tracking-[0.4em]">Service Directory</span>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">সেবা ডিরেক্টরি</h1>
          <p className="text-slate-500 max-w-2xl text-base">আপনার প্রয়োজনীয় সরকারি সেবাটি দ্রুত খুঁজে নিন এবং অনলাইন মাধ্যমে আবেদন করুন।</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-8 mb-16">
          <div className="relative max-w-3xl mx-auto w-full">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="আপনার প্রয়োজনীয় সেবার নাম লিখুন..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-lg py-4 pl-14 pr-6 font-medium text-slate-900 shadow-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-base"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {['All', 'Emergency', 'Digital', 'Land', 'Administrative', 'Agriculture', 'Social'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f as any)}
                className={`px-6 py-2.5 rounded-md text-[11px] font-bold uppercase tracking-[0.15em] transition-all whitespace-nowrap shadow-sm border ${
                  filter === f ? 'bg-primary text-white border-primary' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:text-primary'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredServices.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 flex flex-col items-start gap-4 hover:shadow-md transition-all duration-300"
            >
              <div className="flex justify-between items-center w-full">
                <div className={`px-3 py-1 rounded bg-slate-50 text-[10px] font-bold uppercase tracking-widest ${
                  service.category === 'Emergency' ? 'text-rose-700' :
                  service.category === 'Land' ? 'text-indigo-700' :
                  service.category === 'Digital' ? 'text-emerald-700' :
                  'text-slate-600'
                }`}>
                  {service.category}
                </div>
                <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-bold uppercase">
                   <Clock className="w-3 h-3" /> {service.duration}
                </div>
              </div>

              <div className="space-y-2 flex-grow">
                <h3 className="text-lg font-bold text-slate-900 leading-tight">{service.title}</h3>
                <p className="text-slate-500 text-sm font-medium leading-relaxed line-clamp-2">{service.description}</p>
              </div>
              
              <div className="w-full pt-4 mt-2 border-t border-slate-100 flex flex-col gap-4">
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase">
                  <ShieldAlert className="w-3 h-3" /> ফি: {service.fee}
                </div>
                <button 
                  onClick={() => setSelectedService(service)}
                  className="w-full bg-slate-100 text-slate-700 py-3 rounded font-bold text-[11px] hover:bg-[#1f6343] hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  প্রক্রিয়া দেখুন <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-primary/40 backdrop-blur-md"
              onClick={() => setSelectedService(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="bg-white rounded-xl w-full max-w-5xl max-h-[90vh] overflow-hidden relative shadow-2xl flex flex-col border border-white/20"
            >
              <button 
                onClick={() => setSelectedService(null)}
                className="absolute top-6 right-6 w-10 h-10 bg-slate-50 rounded flex items-center justify-center text-slate-400 hover:text-primary hover:bg-slate-100 transition-all z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-6 md:p-10 overflow-y-auto w-full">
                <div className="flex flex-col md:flex-row gap-8 mt-6">
                  <div className="space-y-8 flex-grow">
                    <div className="space-y-3">
                      <span className="text-accent font-bold uppercase text-[10px] tracking-[0.4em]">{selectedService.category} Support</span>
                      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">{selectedService.title}</h2>
                      <p className="text-base text-slate-500 font-medium leading-relaxed">{selectedService.description}</p>
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-center gap-3 text-slate-900 border-b border-slate-50 pb-3">
                        <BookOpen className="w-6 h-6 text-primary" />
                        <h4 className="text-xl font-bold">আবেদন প্রক্রিয়া</h4>
                      </div>
                      <div className="space-y-4">
                        {selectedService.steps.map((step, i) => (
                          <div key={i} className="flex gap-4 group items-start">
                            <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center shrink-0 font-bold text-slate-400 group-hover:bg-primary group-hover:text-white transition-all text-base">
                              {i + 1}
                            </div>
                            <p className="text-slate-700 text-base font-medium leading-relaxed pt-2">{step}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="md:w-[22rem] shrink-0">
                    <div className="bg-slate-50 p-6 rounded-xl space-y-8 shadow-inner border border-white/40">
                      <div className="space-y-6">
                        <div className="flex items-center gap-2 text-slate-900 mb-4">
                          <Info className="w-5 h-5 text-primary" />
                          <h4 className="font-bold uppercase text-[11px] tracking-widest">প্রয়োজনীয় কাগজপত্র</h4>
                        </div>
                        <ul className="space-y-3">
                          {selectedService.docNeeded.map((doc, i) => (
                            <li key={i} className="flex gap-3 text-[13px] font-bold text-slate-600 leading-tight items-start">
                              <div className="w-4 h-4 rounded bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                                <FileCheck className="w-3 h-3 text-emerald-600" />
                              </div> 
                              {doc}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-4 pt-6 border-t border-slate-200">
                        <div className="flex justify-between items-center text-[12px] font-bold">
                          <span className="text-slate-400 tracking-widest uppercase">সরকারি ফি</span>
                          <span className="text-primary text-right">{selectedService.fee}</span>
                        </div>
                        <div className="flex justify-between items-center text-[12px] font-bold">
                          <span className="text-slate-400 tracking-widest uppercase">সময়কাল</span>
                          <span className="text-primary text-right">{selectedService.duration}</span>
                        </div>
                      </div>

                      <a 
                        href={selectedService.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="block w-full bg-[#1f6343] text-white py-3 rounded text-center font-bold text-sm uppercase tracking-widest hover:bg-[#1a5035] active:scale-95 transition-all shadow-md mt-6"
                      >
                        আবেদন করুন
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
