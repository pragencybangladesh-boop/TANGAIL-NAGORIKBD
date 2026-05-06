import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TrendingUp, TrendingDown, Store, MapPin, Send, X, AlertCircle } from 'lucide-react';
import { addDoc, collection } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { toast } from 'react-hot-toast';

// Dummy data for Government prices
const marketItems = [
  { id: 1, name: 'চাল (মিনিকেট)', govPrice: '৬৫ ৳', unit: 'কেজি', trend: 'stable' },
  { id: 2, name: 'চাল (নাজিরশাইল)', govPrice: '৭৫ ৳', unit: 'কেজি', trend: 'stable' },
  { id: 3, name: 'মসুর ডাল (মোটা)', govPrice: '১০০ ৳', unit: 'কেজি', trend: 'down' },
  { id: 4, name: 'মসুর ডাল (চিকন)', govPrice: '১৩৫ ৳', unit: 'কেজি', trend: 'stable' },
  { id: 5, name: 'সয়াবিন তেল (লুজ)', govPrice: '১৫০ ৳', unit: 'লিটার', trend: 'up' },
  { id: 6, name: 'সয়াবিন তেল (বোতল)', govPrice: '১৬৩ ৳', unit: 'লিটার', trend: 'stable' },
  { id: 7, name: 'আলু (ডায়মন্ড)', govPrice: '৪৫ ৳', unit: 'কেজি', trend: 'stable' },
  { id: 8, name: 'পেঁয়াজ (দেশি)', govPrice: '১২০ ৳', unit: 'কেজি', trend: 'up' },
  { id: 9, name: 'পেঁয়াজ (আমদানি)', govPrice: '১০০ ৳', unit: 'কেজি', trend: 'down' },
  { id: 10, name: 'রসুন (দেশি)', govPrice: '১৪০ ৳', unit: 'কেজি', trend: 'stable' },
  { id: 11, name: 'রসুন (আমদানি)', govPrice: '২২০ ৳', unit: 'কেজি', trend: 'up' },
  { id: 12, name: 'আদা (আমদানি)', govPrice: '২৪০ ৳', unit: 'কেজি', trend: 'up' },
  { id: 13, name: 'চিনি (খোলা)', govPrice: '১৪০ ৳', unit: 'কেজি', trend: 'stable' },
  { id: 14, name: 'কাঁচা মরিচ', govPrice: '৮০ ৳', unit: 'কেজি', trend: 'down' },
  { id: 15, name: 'ডিম (ফার্ম)', govPrice: '৪৫ ৳', unit: 'হালি', trend: 'up' },
  { id: 16, name: 'ব্রয়লার মুরগি', govPrice: '১৯০ ৳', unit: 'কেজি', trend: 'down' },
  { id: 17, name: 'সোনালী মুরগি', govPrice: '৩২০ ৳', unit: 'কেজি', trend: 'stable' },
  { id: 18, name: 'গরুর মাংস', govPrice: '৭৫০ ৳', unit: 'কেজি', trend: 'stable' },
  { id: 19, name: 'খাসির মাংস', govPrice: '১১০০ ৳', unit: 'কেজি', trend: 'stable' },
  { id: 20, name: 'রুই মাছ', govPrice: '৩৫০ ৳', unit: 'কেজি', trend: 'up' },
];

const forecastIncrease = ['সয়াবিন তেল (লুজ)', 'পেঁয়াজ (দেশি)', 'ডিম (ফার্ম)', 'রসুন (আমদানি)'];
const forecastDecrease = ['কাঁচা মরিচ', 'মসুর ডাল (মোটা)', 'ব্রয়লার মুরগি', 'বেগুন'];

export default function MarketMonitor() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [reportData, setReportData] = useState({ price: '', area: '' });

  const handleOpenModal = (itemName: string) => {
    setSelectedItem(itemName);
    setReportData({ price: '', area: '' });
    setIsModalOpen(true);
  };

  const handleSubmitReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportData.price.trim() || !reportData.area.trim()) {
      return toast.error('দয়া করে দাম এবং এলাকার নাম লিখুন');
    }

    setSubmitting(true);
    try {
      await addDoc(collection(db, 'market_reports'), {
        itemName: selectedItem,
        price: reportData.price,
        area: reportData.area,
        createdAt: new Date().toISOString()
      });
      toast.success('আপনার এলাকার দাম সফলভাবে জমা হয়েছে। ধন্যবাদ!');
      setIsModalOpen(false);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'market_reports');
      toast.error('দুঃখিত, তথ্য জমা দেওয়া সম্ভব হয়নি।');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Header Section */}
      <section className="relative pt-24 pb-12 px-6 bg-gradient-to-br from-emerald-900 to-slate-900 overflow-hidden text-center">
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '48px 48px' }} />
        <div className="relative z-10 max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold tracking-widest uppercase">
            <Store className="w-3 h-3 text-emerald-400" /> বাজার মনিটরিং
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">বাজার সর্দার</h1>
          <p className="text-xs md:text-sm text-white/80 max-w-2xl mx-auto font-medium leading-relaxed">
            নিত্যপ্রয়োজনীয় পণ্যের আজকের সরকারি মূল্য তালিকা এবং ভবিষ্যৎ বাজার দর পূর্বাভাস একসাথে। 
            আপনার এলাকার বর্তমান দাম জানিয়ে বাজার মনিটরিং এ সহায়তা করুন।
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 -mt-10 relative z-20">
        
        {/* Forecast Box */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-5 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-4 h-4 text-primary" />
            <h2 className="text-lg font-bold text-slate-800">এই সপ্তাহের বাজার দরের পূর্বাভাস</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-orange-50/50 rounded-xl p-4 border border-orange-100">
              <div className="flex items-center gap-2 mb-3 text-orange-600 font-bold text-sm">
                <TrendingUp className="w-4 h-4" />
                <h3>যেসব পণ্যের দাম বাড়তে পারে</h3>
              </div>
              <ul className="space-y-1.5">
                {forecastIncrease.map((item, idx) => (
                   <li key={idx} className="flex items-center gap-2 text-slate-700 font-medium text-xs before:content-[''] before:w-1 before:h-1 before:rounded-full before:bg-orange-400">
                     {item}
                   </li>
                ))}
              </ul>
            </div>

            <div className="bg-emerald-50/50 rounded-xl p-4 border border-emerald-100">
              <div className="flex items-center gap-2 mb-3 text-emerald-600 font-bold text-sm">
                <TrendingDown className="w-4 h-4" />
                <h3>যেসব পণ্যের দাম কমতে পারে</h3>
              </div>
              <ul className="space-y-1.5">
                {forecastDecrease.map((item, idx) => (
                   <li key={idx} className="flex items-center gap-2 text-slate-700 font-medium text-xs before:content-[''] before:w-1 before:h-1 before:rounded-full before:bg-emerald-400">
                     {item}
                   </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Price List */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-slate-800 mb-4">আজকের সরকারি মূল্য তালিকা</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {marketItems.map(item => (
              <div key={item.id} className="bg-white rounded-xl py-3 px-4 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2 gap-2">
                  <h3 className="text-[13px] font-bold text-slate-800 leading-tight">{item.name}</h3>
                  <div className="text-right shrink-0">
                    <span className="text-sm font-black text-primary block leading-none mb-1">{item.govPrice}</span>
                    <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider block">প্রতি {item.unit}</span>
                  </div>
                </div>
                
                <button 
                  onClick={() => handleOpenModal(item.name)}
                  className="w-full mt-2 py-1.5 bg-slate-50 hover:bg-primary hover:text-white text-slate-600 font-bold rounded-lg transition-colors border border-slate-200 hover:border-primary flex items-center justify-center gap-1.5 text-[10px]"
                >
                  <MapPin className="w-3 h-3" /> আপনার এলাকায় দাম?
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Report Submission Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
             <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6">
                <h3 className="text-2xl font-black text-slate-800 mb-1">দাম আপডেট করুন</h3>
                <p className="text-slate-500 text-sm font-medium">পণ্য: <span className="font-bold text-primary">{selectedItem}</span></p>
              </div>

              <form onSubmit={handleSubmitReport} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">প্রতি ইউনিটের দাম (৳)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">৳</span>
                    <input 
                      type="text"
                      required
                      value={reportData.price}
                      onChange={(e) => setReportData({...reportData, price: e.target.value})}
                      placeholder="যেমন: ১৫৫"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-bold transition-all"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">আপনার এলাকা / বাজার</label>
                  <input 
                    type="text"
                    required
                    value={reportData.area}
                    onChange={(e) => setReportData({...reportData, area: e.target.value})}
                    placeholder="যেমন: মিরপুর ১১ বাজার, ঢাকা"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-bold transition-all"
                  />
                </div>

                <button 
                  disabled={submitting}
                  className="w-full py-4 mt-2 bg-primary text-white font-black rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {submitting ? 'সংরক্ষণ করা হচ্ছে...' : 'সংরক্ষণ করুন'} <Send className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
