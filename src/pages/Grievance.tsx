import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Upload, ShieldCheck, CheckCircle2, ChevronRight, ChevronLeft, MapPin, User, FileText, AlertCircle, Phone, Search } from 'lucide-react';
import { UPAZILAS } from '../data/upazilas';
import { useAuth } from '../lib/AuthContext';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';

export default function Grievance() {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isTracking, setIsTracking] = useState(false);
  const [trackingInput, setTrackingInput] = useState('');
  const [trackingResult, setTrackingResult] = useState<any>(null);
  const [trackingError, setTrackingError] = useState('');
  const [trackingIdState, setTrackingIdState] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    upazila: '',
    category: '',
    description: '',
    attachments: null as File | null,
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const generatedId = `TGL-${Math.floor(100000 + Math.random() * 900000)}`;
      setTrackingIdState(generatedId);
      
      await setDoc(doc(db, 'complaints', generatedId), {
        name: formData.name,
        email: user?.email || 'anonymous',
        phone: formData.phone,
        upazila: formData.upazila,
        category: formData.category,
        message: formData.description,
        createdAt: new Date().toLocaleString('bn-BD'),
        trackingId: generatedId,
        status: 'অপেক্ষমান'
      });
      setIsSubmitted(true);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'complaints');
    }
  };

  const handleTrackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTrackingError('');
    setTrackingResult(null);
    try {
      const docRef = doc(db, 'complaints', trackingInput.trim());
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setTrackingResult(docSnap.data());
      } else {
        setTrackingError('কোনো অভিযোগ পাওয়া যায়নি।');
      }
    } catch (error) {
       handleFirestoreError(error, OperationType.GET, 'complaints');
       setTrackingError('একটি সমস্যা হয়েছে।');
    }
  };

  if (isSubmitted) {
    return (
      <div className="pt-32 pb-20 min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-10 border border-slate-200 shadow-sm text-center max-w-md mx-6 space-y-6"
        >
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">অভিযোগ সফলভাবে জমা হয়েছে</h2>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">
              ট্র্যাকিং আইডি: <span className="text-primary font-bold border border-primary/20 bg-primary/5 px-2 py-0.5">{trackingIdState}</span>
            </p>
          </div>
          <button 
            onClick={() => { setIsSubmitted(false); setStep(1); }}
            className="w-full bg-primary text-white py-3 text-sm font-bold hover:bg-primary/90 transition-all border border-primary/10 shadow-sm"
          >
            নতুন অভিযোগ জমা দিন
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 bg-[#f8fafc] min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header Section */}
        <div className="mb-12 border-b border-slate-200 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary border-l-4 border-primary pl-3">District Grievance Management</span>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">অভিযোগ ও তথ্য অনুসন্ধান</h1>
            <p className="text-sm text-slate-500 font-medium max-w-lg">আপনার অভিযোগ বা সমস্যার কথা আমাদের জানান। আমরা দ্রুত ব্যবস্থা গ্রহণে প্রতিশ্রুতিবদ্ধ।</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setIsTracking(false)}
              className={`px-6 py-2.5 text-xs font-bold transition-all border ${!isTracking ? 'bg-primary text-white border-primary' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
            >
              অভিযোগ জমা দিন
            </button>
            <button 
              onClick={() => setIsTracking(true)}
              className={`px-6 py-2.5 text-xs font-bold transition-all border ${isTracking ? 'bg-primary text-white border-primary' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
            >
              স্ট্যাটাস চেক করুন
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Action Area */}
          <div className="lg:col-span-8">
            <div className="bg-white border border-slate-200 shadow-sm overflow-hidden">
              {isTracking ? (
                <div className="p-8 space-y-8">
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-slate-900">অভিযোগের বর্তমান অবস্থা জানুন</h3>
                    <p className="text-xs text-slate-400">আপনার মোবাইলে প্রাপ্ত ট্র্যাকিং আইডিটি এখানে প্রদান করুন।</p>
                  </div>
                  <form onSubmit={handleTrackSubmit} className="space-y-4">
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                      <input 
                        type="text" 
                        required
                        placeholder="ট্র্যাকিং আইডি (যেমন: TGL-XXXXXX)"
                        className="w-full bg-slate-50 border border-slate-200 py-3 pl-11 pr-4 font-bold text-slate-900 focus:bg-white focus:border-primary/50 focus:ring-4 focus:ring-primary/5 outline-none transition-all text-sm"
                        value={trackingInput}
                        onChange={(e) => setTrackingInput(e.target.value)}
                      />
                    </div>
                    <button type="submit" className="w-full bg-primary text-white py-3 text-sm font-bold uppercase tracking-widest hover:bg-primary/90 transition-all">
                      অনুসন্ধান করুন
                    </button>
                    {trackingError && <p className="text-red-500 text-xs font-bold text-center">{trackingError}</p>}
                  </form>

                  {trackingResult && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="pt-8 border-t border-slate-100 space-y-4"
                    >
                      <h4 className="text-sm font-bold text-slate-900">সার্চ রেজাল্ট:</h4>
                      <div className="bg-slate-50 border border-slate-200 p-6 space-y-3">
                        <div className="grid grid-cols-2 gap-4 text-xs">
                          <div className="space-y-1">
                            <span className="text-slate-500 font-bold uppercase tracking-tighter opacity-70">নাম</span>
                            <p className="text-slate-900 font-bold">{trackingResult.name}</p>
                          </div>
                          <div className="space-y-1 text-right">
                            <span className="text-slate-500 font-bold uppercase tracking-tighter opacity-70">বিভাগ</span>
                            <p className="text-slate-900 font-bold">{trackingResult.category}</p>
                          </div>
                        </div>
                        <div className="border-t border-slate-200 my-2 pt-2 grid grid-cols-2 gap-4 text-xs">
                          <div className="space-y-1">
                            <span className="text-slate-500 font-bold uppercase tracking-tighter opacity-70">তারিখ</span>
                            <p className="text-slate-900 font-bold">{trackingResult.createdAt}</p>
                          </div>
                          <div className="space-y-1 text-right">
                            <span className="text-slate-500 font-bold uppercase tracking-tighter opacity-70">বর্তমান অবস্থা</span>
                            <div>
                              <span className={`inline-block font-bold px-2 py-0.5 border ${
                                trackingResult.status === 'অপেক্ষমান' ? 'bg-amber-50 text-amber-600 border-amber-200' :
                                trackingResult.status === 'সমাধান করা হয়েছে' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' :
                                'bg-slate-50 text-slate-600 border-slate-200'
                              }`}>
                                {trackingResult.status}
                              </span>
                            </div>
                          </div>
                        </div>
                        {trackingResult.message && (
                          <div className="border-t border-slate-200 mt-2 pt-3 space-y-1">
                            <span className="text-[10px] text-slate-400 font-bold uppercase">অভিযোগের সারসংক্ষেপ</span>
                            <p className="text-xs text-slate-600 leading-relaxed italic">"{trackingResult.message}"</p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col md:flex-row min-h-[500px]">
                  {/* Stepper Sidebar */}
                  <div className="w-full md:w-64 bg-slate-900 p-8 text-white space-y-8">
                    <div className="space-y-1">
                      <p className="text-[10px] opacity-60 font-bold uppercase tracking-widest">Process Steps</p>
                      <h4 className="text-sm font-bold">অভিযোগ প্রক্রিয়া</h4>
                    </div>
                    <div className="space-y-6">
                      {[
                        { step: 1, label: 'আপনার পরিচয়', icon: User },
                        { step: 2, label: 'বিভাগ ও স্থান', icon: MapPin },
                        { step: 3, label: 'বিস্তারিত তথ্য', icon: FileText },
                      ].map((s) => (
                        <div key={s.step} className="flex items-center gap-4 group">
                          <div className={`w-8 h-8 flex items-center justify-center font-bold text-xs border transition-all ${
                            step >= s.step ? 'bg-primary border-primary text-white' : 'bg-transparent border-white/20 text-white/40'
                          }`}>
                            {s.step}
                          </div>
                          <span className={`text-[12px] font-bold ${step >= s.step ? 'text-white' : 'text-white/30'}`}>{s.label}</span>
                        </div>
                      ))}
                    </div>
                    <div className="pt-10 border-t border-white/10 space-y-4">
                      <div className="flex items-center gap-3 text-emerald-400 group">
                        <ShieldCheck className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity" />
                        <span className="text-[10px] font-medium leading-tight">আপনার সকল তথ্য সম্পূর্ণ নিরাপদ রাখা হবে।</span>
                      </div>
                    </div>
                  </div>

                  {/* Form Content Area */}
                  <form onSubmit={handleSubmit} className="flex-1 p-8 md:p-12 space-y-8 flex flex-col justify-between">
                    <AnimatePresence mode="wait">
                      {step === 1 && (
                        <motion.div
                          key="step1"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="space-y-6"
                        >
                          <div className="space-y-1">
                            <h3 className="text-lg font-bold text-slate-900">প্রাথমিক পরিচয়</h3>
                            <p className="text-xs text-slate-400 font-medium">দয়া করে আপনার সঠিক তথ্য প্রদান করুন।</p>
                          </div>
                          <div className="space-y-4">
                            <div className="space-y-1.5">
                              <label className="text-[11px] font-bold uppercase text-slate-500">আবেদনকারীর নাম</label>
                              <input 
                                type="text" 
                                required
                                placeholder="এখানে লিখুন"
                                className="w-full bg-slate-50 border border-slate-200 py-3 px-4 font-semibold text-slate-900 focus:bg-white focus:border-primary outline-none transition-all text-sm"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                              />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-[11px] font-bold uppercase text-slate-500">মোবাইল নম্বর (ভেরিফিকেশনের জন্য)</label>
                              <input 
                                type="tel" 
                                required
                                placeholder="০১৭XX XXXXXX"
                                className="w-full bg-slate-50 border border-slate-200 py-3 px-4 font-semibold text-slate-900 focus:bg-white focus:border-primary outline-none transition-all text-sm"
                                value={formData.phone}
                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {step === 2 && (
                        <motion.div
                          key="step2"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="space-y-6"
                        >
                          <div className="space-y-1">
                            <h3 className="text-lg font-bold text-slate-900">স্থান ও ক্যাটাগরি</h3>
                            <p className="text-xs text-slate-400 font-medium">অভিযোগটি কিসের সাথে সম্পর্কিত এবং কোথায় ঘটেছে?</p>
                          </div>
                          <div className="space-y-4">
                            <div className="space-y-1.5">
                              <label className="text-[11px] font-bold uppercase text-slate-500">উপজেলা</label>
                              <select 
                                required
                                className="w-full bg-slate-50 border border-slate-200 py-3 px-4 font-semibold text-slate-900 focus:bg-white focus:border-primary outline-none transition-all text-sm appearance-none cursor-pointer"
                                value={formData.upazila}
                                onChange={(e) => setFormData({...formData, upazila: e.target.value})}
                              >
                                <option value="">নির্বাচন করুন</option>
                                {UPAZILAS.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                              </select>
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-[11px] font-bold uppercase text-slate-500">বিভাগ</label>
                              <select 
                                required
                                className="w-full bg-slate-50 border border-slate-200 py-3 px-4 font-semibold text-slate-900 focus:bg-white focus:border-primary outline-none transition-all text-sm appearance-none cursor-pointer"
                                value={formData.category}
                                onChange={(e) => setFormData({...formData, category: e.target.value})}
                              >
                                <option value="">অভিযোগের ধরন নির্বাচন করুন</option>
                                <option value="Admin">প্রশাসনিক সমস্যা</option>
                                <option value="Roads">রাস্তা ও অবকাঠামো</option>
                                <option value="Corruption">দুর্নীতি সংক্রান্ত</option>
                                <option value="Personal">ব্যক্তিগত সমস্যা</option>
                                <option value="Other">অন্যান্য</option>
                              </select>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {step === 3 && (
                        <motion.div
                          key="step3"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="space-y-6"
                        >
                          <div className="space-y-1">
                            <h3 className="text-lg font-bold text-slate-900">বিস্তারিত বিবরণ</h3>
                            <p className="text-xs text-slate-400 font-medium">আপনার অভিযোগের বিস্তারিত তথ্য এখানে লিখুন।</p>
                          </div>
                          <div className="space-y-4">
                            <textarea 
                              required
                              placeholder="আপনার অভিযোগ এখানে লিখুন..."
                              className="w-full h-40 bg-slate-50 border border-slate-200 p-4 font-medium text-slate-700 focus:bg-white focus:border-primary outline-none transition-all text-sm leading-relaxed"
                              value={formData.description}
                              onChange={(e) => setFormData({...formData, description: e.target.value})}
                            />
                            <div className="relative">
                              <input 
                                type="file" 
                                id="file-upload"
                                className="hidden"
                                onChange={(e) => setFormData({...formData, attachments: e.target.files?.[0] || null})}
                              />
                              <label 
                                htmlFor="file-upload"
                                className="flex items-center gap-3 bg-slate-50 border border-slate-200 p-4 cursor-pointer hover:bg-slate-100 transition-all border-dashed"
                              >
                                <div className="w-10 h-10 bg-white border border-slate-200 flex items-center justify-center">
                                  <Upload className="w-5 h-5 text-slate-400" />
                                </div>
                                <span className="text-xs font-bold text-slate-500">{formData.attachments?.name || 'ফটো বা ডকুমেন্ট যুক্ত করুন (ঐচ্ছিক)'}</span>
                              </label>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="flex gap-2 pt-6 border-t border-slate-100">
                      {step > 1 && (
                        <button 
                          type="button"
                          onClick={prevStep}
                          className="px-6 py-2.5 border border-slate-200 text-slate-500 font-bold text-[11px] uppercase tracking-wide hover:bg-slate-50 flex items-center gap-2"
                        >
                          <ChevronLeft className="w-4 h-4" /> পিছনে
                        </button>
                      )}
                      {step < 3 ? (
                        <button 
                          type="button"
                          onClick={nextStep}
                          className="flex-1 bg-primary text-white py-2.5 font-bold text-[11px] uppercase tracking-widest hover:bg-primary/90 flex items-center justify-center gap-2"
                        >
                          পরবর্তী ধাপ <ChevronRight className="w-4 h-4" />
                        </button>
                      ) : (
                        <button 
                          type="submit"
                          className="flex-1 bg-primary text-white py-2.5 font-bold text-[11px] uppercase tracking-widest hover:bg-primary/90 flex items-center justify-center gap-2"
                        >
                          জমা দিন <Send className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>

          {/* Guidelines Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#1e293b] p-8 text-white space-y-4">
              <h4 className="text-sm font-bold tracking-tight">সাধারণ নির্দেশনাবলী</h4>
              <ul className="space-y-4">
                {[
                  { title: 'সঠিক তথ্য', desc: 'আপনার অভিযোগ ত্বরান্বিত করতে সঠিক তথ্য প্রদান করুন।' },
                  { title: 'সাবধানতা', desc: 'ব্যক্তিগত বা স্পর্শকাতর তথ্যের নিরাপত্তার ব্যাপারে সতর্ক থাকুন।' },
                  { title: 'ট্র্যাকিং', desc: 'অভিযোগ জমা দেওয়ার পর প্রাপ্ত আইডিটি ভবিষ্যতের কাজ বা অনুসন্ধানের জন্য সংগ্রহে রাখুন।' },
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-3 items-start">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center border border-primary/40 mt-0.5 shrink-0">
                      <span className="text-[10px] font-bold text-primary">{idx + 1}</span>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[12px] font-bold leading-none">{item.title}</p>
                      <p className="text-[11px] text-white/50 leading-relaxed font-medium">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white border border-slate-200 p-6 flex items-center gap-4 group cursor-pointer hover:border-primary transition-all shadow-sm">
              <div className="w-10 h-10 bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-primary/5 group-hover:border-primary/20">
                <Phone className="w-5 h-5 text-slate-400 group-hover:text-primary" />
              </div>
              <div className="space-y-0.5">
                <p className="text-[10px] font-bold uppercase text-slate-400">জরুরি যোগাযোগ</p>
                <p className="text-sm font-bold text-slate-900 group-hover:text-primary tracking-tight">৩৩৩ (জাতীয় হেল্পলাইন)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
