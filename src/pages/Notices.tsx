import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Bell, FileText, Download, Calendar, ArrowRight } from 'lucide-react';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { UPAZILAS } from '../data/mymensingh';

export default function Notices() {
  const [notices, setNotices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const q = query(collection(db, 'notices'), orderBy('date', 'desc'));
        const snapshot = await getDocs(q);
        setNotices(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching notices:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotices();
  }, []);

  return (
    <div className="pt-40 pb-32 bg-bg-light min-h-screen">
      <section className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-red-50 px-4 py-1.5 rounded text-red-600 text-[10px] font-bold uppercase tracking-wider border border-red-100">
              <Bell className="w-3.5 h-3.5 animate-pulse" /> {notices.length}টি নোটিশ
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight tracking-tight">নোটিশ <span className="text-accent underline decoration-[6px] decoration-accent/20 underline-offset-[8px]">বোর্ড</span></h1>
            <p className="text-base text-slate-500 font-medium leading-relaxed max-w-xl">
              ময়মনসিংহ জেলা প্রশাসনের সর্বশেষ ঘোষণা, বিজ্ঞপ্তি এবং গুরুত্বপূর্ণ তথ্যাবলী। নাগরিক সেবার সকল আপডেট এখন এক জায়গায়।
            </p>
          </div>

          <button className="px-6 py-3 bg-accent text-primary font-bold rounded-lg flex items-center gap-2 text-sm border border-primary/10 hover:bg-primary hover:text-white transition-colors shadow-sm">
            সব নোটিশ ডাউনলোড <Download className="w-4 h-4" />
          </button>
        </div>

        {/* Notices list */}
        <div className="space-y-6">
          {loading ? (
             <div className="text-center py-20 text-slate-400 font-bold uppercase tracking-widest text-xs">লোড হচ্ছে...</div>
          ) : notices.length === 0 ? (
             <div className="text-center py-20 text-slate-400 font-bold uppercase tracking-widest text-xs">কোনো নোটিশ পাওয়া যায়নি।</div>
          ) : (
            notices.map((notice, i) => (
              <motion.div 
                key={notice.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`group bg-white p-5 md:p-6 rounded-md border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col md:flex-row md:items-start justify-between gap-5 ${
                  notice.urgent ? 'border-red-200 bg-red-50/20' : ''
                }`}
              >
                <div className="flex gap-4 items-start flex-grow">
                  <div className={`w-10 h-10 rounded mr-1 flex items-center justify-center shrink-0 ${
                    notice.urgent ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors'
                  }`}>
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-primary">{notice.category}</span>
                      <div className="flex items-center gap-1.5 text-slate-500 text-[10px] font-medium uppercase tracking-wider">
                        <Calendar className="w-3 h-3" /> {notice.date}
                      </div>
                      {notice.urgent && <span className="px-2 py-0.5 bg-red-500 text-white text-[9px] font-bold uppercase rounded tracking-wider shadow-sm">Urgent</span>}
                      {notice.upazila && notice.upazila !== 'সকল উপজেলা' && <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[9px] font-bold uppercase rounded tracking-wider">{UPAZILAS.find(u => u.id === notice.upazila)?.name || notice.upazila}</span>}
                    </div>
                    <h3 className="text-sm md:text-base font-bold text-slate-800 group-hover:text-primary transition-colors leading-tight">
                      {notice.title}
                    </h3>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 shrink-0 md:mt-0 mt-4 md:ml-0 ml-[3.25rem]">
                  <button className="px-4 py-2 bg-slate-50 text-slate-700 hover:bg-primary hover:text-white rounded text-[10px] font-bold uppercase tracking-wider transition-all border border-slate-200 shadow-sm">পিডিএফ দেখুন</button>
                  <button className="w-8 h-8 bg-accent text-primary rounded flex items-center justify-center hover:bg-primary hover:text-white border border-accent/20 transition-all shadow-sm">
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Archive CTA */}
        <div className="mt-24 text-center">
           <button className="text-slate-400 font-bold uppercase text-[11px] tracking-[0.4em] hover:text-primary transition-all inline-flex items-center gap-4 group">
             পুরানো নোটিশ আর্কাইভ দেখুন <ArrowRight className="w-5 h-5 group-hover:translate-x-3 transition-transform" />
           </button>
        </div>
      </section>
    </div>
  );
}
