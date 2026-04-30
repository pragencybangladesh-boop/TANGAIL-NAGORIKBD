import React, { useState } from 'react';
import { motion } from 'motion/react';
import { addDoc, collection } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { CheckCircle2 } from 'lucide-react';

export default function VolunteerRegistration() {
  const [formData, setFormData] = useState({ name: '', phone: '', area: '', bloodGroup: '', skills: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'volunteers'), formData);
      setIsSubmitted(true);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'volunteers');
    }
  };

  if (isSubmitted) {
    return (
      <div className="pt-40 pb-32 bg-bg-light min-h-screen flex items-center justify-center">
        <div className="bg-white p-12 rounded-[3rem] text-center space-y-6 shadow-xl max-w-md mx-6">
          <CheckCircle2 className="w-20 h-20 text-emerald-500 mx-auto" />
          <h2 className="text-3xl font-bold">ধন্যবাদ!</h2>
          <p className="text-slate-500">আপনার ভলান্টিয়ার নিবন্ধন সফলভাবে সম্পন্ন হয়েছে।</p>
          <button onClick={() => setIsSubmitted(false)} className="btn-gold px-10 py-4 rounded-xl">আরও একটি নিবন্ধন</button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-40 pb-32 bg-bg-light min-h-screen">
      <div className="max-w-3xl mx-auto px-6 bg-white p-12 rounded-[3rem] shadow-xl">
        <h1 className="text-4xl font-bold mb-10 text-center tracking-tight">ভলান্টিয়ার নিবন্ধন</h1>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-400 ml-4 uppercase tracking-widest">পূর্ণ নাম</label>
            <input type="text" placeholder="আপনার নাম" className="w-full p-6 border border-slate-100 bg-slate-50 rounded-2xl outline-none focus:bg-white focus:shadow-md transition-all font-bold" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-400 ml-4 uppercase tracking-widest">মোবাইল</label>
              <input type="tel" placeholder="০১৭XX-XXXXXX" className="w-full p-6 border border-slate-100 bg-slate-50 rounded-2xl outline-none focus:bg-white focus:shadow-md transition-all font-bold" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-400 ml-4 uppercase tracking-widest">এলাকা</label>
              <input type="text" placeholder="উপজেলা / এলাকা" className="w-full p-6 border border-slate-100 bg-slate-50 rounded-2xl outline-none focus:bg-white focus:shadow-md transition-all font-bold" value={formData.area} onChange={e => setFormData({...formData, area: e.target.value})} required />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-400 ml-4 uppercase tracking-widest">রক্তের গ্রুপ</label>
            <select className="w-full p-6 border border-slate-100 bg-slate-50 rounded-2xl outline-none focus:bg-white focus:shadow-md transition-all font-bold appearance-none" value={formData.bloodGroup} onChange={e => setFormData({...formData, bloodGroup: e.target.value})} required>
              <option value="">নির্বাচন করুন</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-400 ml-4 uppercase tracking-widest">দক্ষতা বা কেন যুক্ত হতে চান?</label>
            <textarea placeholder="বিস্তারিত লিখুন..." className="w-full p-6 border border-slate-100 bg-slate-50 rounded-2xl h-32 outline-none focus:bg-white focus:shadow-md transition-all font-medium" value={formData.skills} onChange={e => setFormData({...formData, skills: e.target.value})} />
          </div>
          <button className="btn-gold w-full p-6 rounded-2xl font-bold shadow-xl shadow-accent/20 hover:scale-105 active:scale-95 transition-all">নিবন্ধন সম্পন্ন করুন</button>
        </form>
      </div>
    </div>
  );
}
