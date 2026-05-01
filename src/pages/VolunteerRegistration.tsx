import React, { useState } from 'react';
import { motion } from 'motion/react';
import { addDoc, collection } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { CheckCircle2 } from 'lucide-react';

export default function VolunteerRegistration() {
  const [formData, setFormData] = useState({ 
    name: '', 
    phone: '', 
    district: '', 
    upazila: '', 
    union: '', 
    educationOrProfession: '',
    photo1: '',
    photo2: '',
    facebookLink: '',
    whatsappNumber: '',
    bloodGroup: '',
    about: '',
    dailyTimeCommitment: ''
  });
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
        <div className="bg-white p-12 rounded-2xl text-center space-y-6 shadow-lg max-w-md mx-6">
          <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
          <h2 className="text-2xl font-bold">ধন্যবাদ!</h2>
          <p className="text-slate-500 text-sm">আপনার ভলান্টিয়ার নিবন্ধন সফলভাবে সম্পন্ন হয়েছে।</p>
          <button onClick={() => setIsSubmitted(false)} className="btn-gold px-8 py-3 rounded-xl text-sm">আরও একটি নিবন্ধন</button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-40 pb-32 bg-bg-light min-h-screen">
      <div className="max-w-2xl mx-auto px-6 bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold mb-8 text-center tracking-tight">ভলান্টিয়ার নিবন্ধন</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 ml-3 uppercase tracking-widest">পূর্ণ নাম</label>
            <input type="text" placeholder="আপনার নাম" className="w-full p-3 border border-slate-100 bg-slate-50 rounded-xl outline-none focus:bg-white focus:shadow-sm transition-all font-bold text-sm" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 ml-3 uppercase tracking-widest">মোবাইল</label>
              <input type="tel" placeholder="০১৭XX-XXXXXX" className="w-full p-3 border border-slate-100 bg-slate-50 rounded-xl outline-none focus:bg-white focus:shadow-sm transition-all font-bold text-sm" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} required />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 ml-3 uppercase tracking-widest">জেলা</label>
              <input type="text" placeholder="জেলা" className="w-full p-3 border border-slate-100 bg-slate-50 rounded-xl outline-none focus:bg-white focus:shadow-sm transition-all font-bold text-sm" value={formData.district} onChange={e => setFormData({...formData, district: e.target.value})} required />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 ml-3 uppercase tracking-widest">উপজেলা</label>
              <input type="text" placeholder="উপজেলা" className="w-full p-3 border border-slate-100 bg-slate-50 rounded-xl outline-none focus:bg-white focus:shadow-sm transition-all font-bold text-sm" value={formData.upazila} onChange={e => setFormData({...formData, upazila: e.target.value})} required />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 ml-3 uppercase tracking-widest">ইউনিয়ন</label>
              <input type="text" placeholder="ইউনিয়ন" className="w-full p-3 border border-slate-100 bg-slate-50 rounded-xl outline-none focus:bg-white focus:shadow-sm transition-all font-bold text-sm" value={formData.union} onChange={e => setFormData({...formData, union: e.target.value})} required />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 ml-3 uppercase tracking-widest">স্কুল/কলেজ/প্রফেশনাল</label>
            <input type="text" placeholder="আপনার প্রতিষ্ঠান বা পেশা" className="w-full p-3 border border-slate-100 bg-slate-50 rounded-xl outline-none focus:bg-white focus:shadow-sm transition-all font-bold text-sm" value={formData.educationOrProfession} onChange={e => setFormData({...formData, educationOrProfession: e.target.value})} required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 ml-3 uppercase tracking-widest">ছবি ১</label>
              <input type="file" accept="image/*" className="w-full p-2 border border-slate-100 bg-slate-50 rounded-xl outline-none focus:bg-white focus:shadow-sm transition-all font-bold text-sm" onChange={e => setFormData({...formData, photo1: e.target.files?.[0]?.name || ''})} required />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 ml-3 uppercase tracking-widest">ছবি ২</label>
              <input type="file" accept="image/*" className="w-full p-2 border border-slate-100 bg-slate-50 rounded-xl outline-none focus:bg-white focus:shadow-sm transition-all font-bold text-sm" onChange={e => setFormData({...formData, photo2: e.target.files?.[0]?.name || ''})} required />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 ml-3 uppercase tracking-widest">ফেসবুক আইডি লিংক</label>
              <input type="text" placeholder="https://facebook.com/..." className="w-full p-3 border border-slate-100 bg-slate-50 rounded-xl outline-none focus:bg-white focus:shadow-sm transition-all font-bold text-sm" value={formData.facebookLink} onChange={e => setFormData({...formData, facebookLink: e.target.value})} required />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 ml-3 uppercase tracking-widest">হোয়াটসঅ্যাপ নাম্বার</label>
              <input type="tel" placeholder="০১৭XX-XXXXXX" className="w-full p-3 border border-slate-100 bg-slate-50 rounded-xl outline-none focus:bg-white focus:shadow-sm transition-all font-bold text-sm" value={formData.whatsappNumber} onChange={e => setFormData({...formData, whatsappNumber: e.target.value})} required />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 ml-3 uppercase tracking-widest">আপনার সম্পর্কে কিছু বলুন</label>
            <textarea placeholder="বিস্তারিত লিখুন..." className="w-full p-3 border border-slate-100 bg-slate-50 rounded-xl outline-none focus:bg-white focus:shadow-sm transition-all font-bold text-sm h-32" value={formData.about} onChange={e => setFormData({...formData, about: e.target.value})} required />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 ml-3 uppercase tracking-widest">প্রতিদিন কত সময় দিতে পারবেন?</label>
            <select className="w-full p-3 border border-slate-100 bg-slate-50 rounded-xl outline-none focus:bg-white focus:shadow-sm transition-all font-bold appearance-none text-sm" value={formData.dailyTimeCommitment} onChange={e => setFormData({...formData, dailyTimeCommitment: e.target.value})} required>
              <option value="">নির্বাচন করুন</option>
              <option value="30-min">৩০ মিনিট</option>
              <option value="1-hour">১ ঘণ্টা</option>
              <option value="2-hours">২ ঘণ্টা</option>
              <option value="3-hours-plus">৩ ঘণ্টার বেশি</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 ml-3 uppercase tracking-widest">রক্তের গ্রুপ</label>
            <select className="w-full p-3 border border-slate-100 bg-slate-50 rounded-xl outline-none focus:bg-white focus:shadow-sm transition-all font-bold appearance-none text-sm" value={formData.bloodGroup} onChange={e => setFormData({...formData, bloodGroup: e.target.value})} required>
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
          <button className="btn-gold w-full p-4 rounded-xl font-bold shadow-lg shadow-accent/20 hover:scale-105 active:scale-95 transition-all text-sm">নিবন্ধন সম্পন্ন করুন</button>
        </form>
      </div>
    </div>
  );
}
