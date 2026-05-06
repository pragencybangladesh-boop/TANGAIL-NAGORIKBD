import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Upload, ShieldCheck, CheckCircle2, ChevronRight, ChevronLeft, MapPin, User, FileText, AlertCircle, Phone, Search } from 'lucide-react';
import toast from 'react-hot-toast';
import { UPAZILAS } from '../data/sylhet';
import { useAuth } from '../context/AuthContext';
import { doc, setDoc, getDoc, serverTimestamp, onSnapshot } from 'firebase/firestore';
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
  const [activeTrackingId, setActiveTrackingId] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    district: '',
    upazila: '',
    category: '',
    description: '',
    attachments: null as File | null,
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const loadingToast = toast.loading('অভিযোগ জমা দেওয়া হচ্ছে...');
    try {
      const generatedId = `SYL-${Math.floor(100000 + Math.random() * 900000)}`;
      setTrackingIdState(generatedId);
      
      await setDoc(doc(db, 'complaints', generatedId), {
        name: formData.name,
        email: user?.email || 'anonymous',
        phone: formData.phone,
        district: formData.district || 'Sylhet',
        upazila: formData.upazila,
        upazilaId: formData.upazila,
        category: formData.category,
        message: formData.description,
        createdAt: serverTimestamp(),
        trackingId: generatedId,
        status: 'Pending'
      });
      toast.dismiss(loadingToast);
      toast.success('আপনার অভিযোগটি সফলভাবে দাখিল করা হয়েছে');
      setIsSubmitted(true);
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error('অভিযোগ দাখিল করতে সমস্যা হয়েছে, অনুগ্রহ করে আবার চেষ্টা করুন');
      handleFirestoreError(error, OperationType.CREATE, 'complaints');
    }
  };

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingInput.trim()) return;
    setActiveTrackingId(trackingInput.trim());
  };

  React.useEffect(() => {
    if (!activeTrackingId) return;

    setTrackingError('');
    setTrackingResult(null);

    const docRef = doc(db, 'complaints', activeTrackingId);
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setTrackingResult(docSnap.data());
        setTrackingError('');
      } else {
        setTrackingResult(null);
        setTrackingError('কোনো অভিযোগ পাওয়া যায়নি।');
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'complaints');
      setTrackingError('একটি সমস্যা হয়েছে।');
    });

    return () => unsubscribe();
  }, [activeTrackingId]);

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'Pending':
      case 'অপেক্ষমান':
        return { step: 1, label: 'অপেক্ষমান', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', bar: 'bg-amber-500' };
      case 'Processing':
      case 'প্রক্রিয়াধীন':
        return { step: 2, label: 'প্রক্রিয়াধীন', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', bar: 'bg-blue-500' };
      case 'Resolved':
      case 'Completed':
      case 'সমাধান করা হয়েছে':
        return { step: 3, label: 'সমাধান করা হয়েছে', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', bar: 'bg-emerald-500' };
      case 'Rejected':
      case 'বাতিল':
        return { step: -1, label: 'বাতিল', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', bar: 'bg-red-500' };
      default:
        return { step: 1, label: status, color: 'text-slate-600', bg: 'bg-slate-50', border: 'border-slate-200', bar: 'bg-slate-400' };
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
    <div className="bg-[#f8fafc] min-h-screen">
      {/* New Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-[#064e3b] via-[#065f46] to-[#0d9488] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white opacity-[0.03] rounded-full blur-[100px] -mr-64 -mt-64" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent opacity-[0.05] rounded-full blur-[80px] -ml-40 -mb-40" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="bg-white/10 p-5 rounded-3xl backdrop-blur-md border border-white/20 shadow-2xl">
              <FileText size={32} className="text-white" />
            </div>
            <div className="space-y-3 text-center md:text-left">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.1]">
                অভিযোগ ও মনিটর
              </h1>
              <p className="text-base md:text-xl font-medium text-white/80 max-w-2xl leading-relaxed">
                প্রশাসনিক সমস্যা? এখানে দাখিল করুন। ট্র্যাকিং ID দিয়ে স্ট্যাটাস দেখুন।
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 -mt-8 pb-32">
        {/* Toggle Section */}
        <div className="bg-slate-100/40 backdrop-blur-md p-1.5 rounded-2xl flex items-center mb-10 shadow-xl max-w-sm mx-auto border border-white/50">
          <button 
            type="button"
            onClick={() => setIsTracking(false)}
            className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 ${!isTracking ? 'bg-white text-primary shadow-lg ring-1 ring-slate-200' : 'text-slate-500 hover:text-primary'}`}
          >
            অভিযোগ দাখিল
          </button>
          <button 
            type="button"
            onClick={() => setIsTracking(true)}
            className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 ${isTracking ? 'bg-white text-primary shadow-lg ring-1 ring-slate-200' : 'text-slate-500 hover:text-primary'}`}
          >
            ট্র্যাক করুন
          </button>
        </div>

        <div className="bg-white rounded-3xl shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] border border-slate-100 overflow-hidden">
          {isTracking ? (
            <div className="p-8 md:p-12 space-y-8">
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">আপনার অভিযোগ ট্র্যাক করুন</h3>
                <p className="text-sm text-slate-400 font-medium">ট্র্যাকিং আইডি দিয়ে ড্রাফট বা সমাধানকৃত অবস্থা জানুন।</p>
              </div>
              <form onSubmit={handleTrackSubmit} className="space-y-6 max-w-md mx-auto">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-600 ml-2">ট্র্যাকিং আইডি টাইপ করুন *</label>
                  <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-primary transition-colors" />
                    <input 
                      type="text" 
                      required
                      placeholder="যেমন: JMP-123456"
                      className="w-full bg-slate-50 border-2 border-slate-100 py-3.5 pl-12 pr-6 rounded-2xl font-bold text-slate-900 focus:bg-white focus:border-primary/50 outline-none transition-all text-base"
                      value={trackingInput}
                      onChange={(e) => setTrackingInput(e.target.value)}
                    />
                  </div>
                </div>
                <button type="submit" className="w-full bg-primary text-white py-4 rounded-2xl text-base font-bold shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all hover:scale-[1.01] active:scale-[0.99]">
                  অনুসন্ধান করুন
                </button>
                {trackingError && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-xs font-bold text-center bg-red-50 py-3 rounded-xl border border-red-100"
                  >
                    {trackingError}
                  </motion.p>
                )}
              </form>

              {trackingResult && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="pt-8 border-t border-slate-100 space-y-6"
                >
                  <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-8 space-y-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="space-y-1">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">আবেদনকারীর নাম</span>
                        <p className="text-xl font-bold text-slate-900">{trackingResult.name}</p>
                      </div>
                      <div className="text-right">
                        <span className={`inline-block font-bold px-4 py-1.5 rounded-xl text-xs border ${getStatusInfo(trackingResult.status).bg} ${getStatusInfo(trackingResult.status).color} ${getStatusInfo(trackingResult.status).border}`}>
                          {getStatusInfo(trackingResult.status).label}
                        </span>
                      </div>
                    </div>
                    
                    {/* Visual Progress Indicator */}
                    <div className="py-4">
                      <div className="flex items-start justify-between relative mb-2">
                        {['Pending', 'Processing', 'Resolved'].map((s, i) => {
                          const statusInfo = getStatusInfo(s);
                          const currentStep = getStatusInfo(trackingResult.status).step;
                          const isActive = currentStep >= i + 1;
                          const isCurrent = currentStep === i + 1;
                          
                          return (
                            <div key={s} className="flex flex-col items-center relative z-10 w-1/3">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300 bg-white ${isActive ? `${statusInfo.border} ${statusInfo.color}` : 'border-slate-200 text-slate-300'}`}>
                                {isActive ? <CheckCircle2 className={`w-5 h-5 ${statusInfo.color}`} /> : i + 1}
                              </div>
                              <span className={`text-[10px] uppercase tracking-wider font-bold mt-2 text-center transition-colors ${isCurrent ? statusInfo.color : isActive ? 'text-slate-600' : 'text-slate-400'}`}>
                                {statusInfo.label}
                              </span>
                            </div>
                          );
                        })}
                        {/* Connecting Line */}
                        <div className="absolute left-[16.66%] right-[16.66%] h-[2px] bg-slate-200 top-[15px] z-0">
                          <div 
                            className={`h-full transition-all duration-500 ease-out bg-primary`}
                            style={{ width: `${(Math.max(1, getStatusInfo(trackingResult.status).step) - 1) * 50}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8 pt-6 border-t border-slate-200">
                      <div className="space-y-1">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">ক্যাটাগরি</span>
                        <p className="text-lg font-bold text-slate-800">{trackingResult.category}</p>
                      </div>
                      <div className="space-y-1 text-right">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">দাখিলের তারিখ</span>
                        <p className="text-lg font-bold text-slate-800">
                          {trackingResult.createdAt?.toDate ? trackingResult.createdAt.toDate().toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}
                        </p>
                      </div>
                    </div>

                    {trackingResult.message && (
                      <div className="pt-6 border-t border-slate-200">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">অভিযোগের বিষয়</span>
                        <p className="text-base text-slate-600 leading-relaxed font-medium mt-2 italic bg-white p-4 rounded-xl border border-slate-100">
                          "{trackingResult.message}"
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          ) : (
            <div className="flex flex-col">
              {/* Stepper Header */}
              <div className="bg-slate-900 px-8 py-5 text-white flex justify-between items-center border-b border-white/5">
                <div className="flex items-center gap-8">
                  {[
                    { step: 1, label: 'পরিচয়' },
                    { step: 2, label: 'বিভাগ' },
                    { step: 3, label: 'বিস্তারিত' },
                  ].map((s) => (
                    <div key={s.step} className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm transition-all duration-500 shadow-xl ${
                        step === s.step ? 'bg-primary text-white scale-110' : step > s.step ? 'bg-emerald-500 text-white' : 'bg-white/10 text-white/40'
                      }`}>
                        {step > s.step ? <CheckCircle2 size={18} /> : s.step}
                      </div>
                      <span className={`text-sm font-bold hidden md:inline tracking-tight ${step >= s.step ? 'text-white' : 'text-white/30'}`}>{s.label}</span>
                    </div>
                  ))}
                </div>
                <div className="hidden md:flex items-center gap-3 text-emerald-400 bg-emerald-400/5 px-4 py-2 rounded-xl border border-emerald-400/20">
                  <ShieldCheck size={16} className="animate-pulse" />
                  <span className="text-[9px] font-bold uppercase tracking-[0.3em]">নিরাপদ ডাটাবেজ</span>
                </div>
              </div>

              {/* Form Content */}
              <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-10">
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                      <div className="space-y-1">
                        <h3 className="text-xl font-bold text-slate-900">প্রাথমিক তথ্য</h3>
                        <p className="text-sm text-slate-400 font-medium">সঠিক সমাধানের জন্য আপনার বিস্তারিত তথ্য দিন।</p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-700 ml-2">আবেদনকারীর নাম *</label>
                          <div className="relative group">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-primary transition-colors" />
                            <input 
                              type="text" 
                              required
                              placeholder="আপনার পূর্ণ নাম"
                              className="w-full bg-slate-50 border-2 border-slate-100 py-3.5 pl-12 pr-6 rounded-2xl font-bold text-slate-900 focus:bg-white focus:border-primary outline-none transition-all text-base"
                              value={formData.name}
                              onChange={(e) => setFormData({...formData, name: e.target.value})}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-700 ml-2">মোবাইল নম্বর *</label>
                          <div className="relative group">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-primary transition-colors" />
                            <input 
                              type="tel" 
                              required
                              placeholder="০১৮XXXXXXXX"
                              className="w-full bg-slate-50 border-2 border-slate-100 py-3.5 pl-12 pr-6 rounded-2xl font-bold text-slate-900 focus:bg-white focus:border-primary outline-none transition-all text-base"
                              value={formData.phone}
                              onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                      <div className="space-y-1">
                        <h3 className="text-xl font-bold text-slate-900">অবস্থান ও ক্যাটাগরি</h3>
                        <p className="text-sm text-slate-400 font-medium">অভিযোগটি কোন এলাকা এবং কোন বিষয়ের সাথে সম্পর্কিত?</p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-700 ml-2">উপজেলা *</label>
                          <select 
                            required
                            className="w-full bg-slate-50 border-2 border-slate-100 py-3.5 px-6 rounded-2xl font-bold text-slate-900 focus:bg-white focus:border-primary outline-none transition-all text-base appearance-none cursor-pointer"
                            value={formData.upazila}
                            onChange={(e) => setFormData({...formData, upazila: e.target.value})}
                          >
                            <option value="">নির্বাচন করুন</option>
                            {UPAZILAS.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-700 ml-2">অভিযোগের বিভাগ *</label>
                          <select 
                            required
                            className="w-full bg-slate-50 border-2 border-slate-100 py-3.5 px-6 rounded-2xl font-bold text-slate-900 focus:bg-white focus:border-primary outline-none transition-all text-base appearance-none cursor-pointer"
                            value={formData.category}
                            onChange={(e) => setFormData({...formData, category: e.target.value})}
                          >
                            <option value="">ক্যাটাগরি নির্বাচন করুন</option>
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
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                      <div className="space-y-1">
                        <h3 className="text-xl font-bold text-slate-900">অভিযোগের বিবরণ</h3>
                        <p className="text-sm text-slate-400 font-medium">আপনার সমস্যার বিষয়ে বিস্তারিত তথ্য এখানে দিন।</p>
                      </div>
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-700 ml-2">বিস্তারিত বর্ণনা *</label>
                          <textarea 
                            required
                            placeholder="এখানে সব কিছু বিস্তারিত লিখুন..."
                            className="w-full h-40 bg-slate-50 border-2 border-slate-100 p-6 rounded-2xl font-medium text-slate-800 focus:bg-white focus:border-primary outline-none transition-all text-base leading-relaxed placeholder:text-slate-300"
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                          />
                        </div>
                        <div className="group">
                          <input 
                            type="file" 
                            id="file-upload"
                            className="hidden"
                            onChange={(e) => setFormData({...formData, attachments: e.target.files?.[0] || null})}
                          />
                          <label 
                            htmlFor="file-upload"
                            className="flex items-center gap-4 bg-slate-50/50 border-2 border-slate-100 border-dashed p-6 rounded-2xl cursor-pointer hover:bg-slate-50 transition-all"
                          >
                            <div className="w-12 h-12 bg-white shadow-lg border border-slate-100 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105">
                              <Upload className="w-6 h-6 text-primary" />
                            </div>
                            <div className="space-y-0.5">
                              <p className="text-base font-bold text-slate-800 tracking-tight">{formData.attachments?.name || 'ফাইল বা ছবি সংযুক্ত করুন'}</p>
                              <p className="text-xs font-semibold text-slate-400">পিডিএফ, জেপিজি বা ডকুমেন্ট (সর্বোচ্চ ৫ মেগাবাইট)</p>
                            </div>
                          </label>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex gap-4 pt-8 border-t border-slate-100">
                  {step > 1 && (
                    <button 
                      type="button"
                      onClick={prevStep}
                      className="px-6 py-3.5 border-2 border-slate-100 text-slate-500 font-bold rounded-2xl flex items-center gap-2 hover:bg-slate-50 transition-all text-sm"
                    >
                      <ChevronLeft className="w-5 h-5" /> পিছনে
                    </button>
                  )}
                  {step < 3 ? (
                    <button 
                      type="button"
                      onClick={nextStep}
                      className="flex-1 bg-primary text-white py-3.5 rounded-2xl font-bold shadow-lg shadow-primary/10 hover:shadow-primary/20 flex items-center justify-center gap-2 transition-all text-sm"
                    >
                      পরবর্তী ধাপ <ChevronRight size={18} />
                    </button>
                  ) : (
                    <button 
                      type="submit"
                      className="flex-1 bg-emerald-600 text-white py-3.5 rounded-2xl font-bold shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all uppercase tracking-[0.1em] text-sm"
                    >
                      অভিযোগ জমা দিন <Send size={18} />
                    </button>
                  )}
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Features / Pillars - Grouped in 1 Card */}
        <div className="mt-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-slate-50"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: ShieldCheck, color: 'emerald-600', title: 'গোপনীয়তা সুরক্ষা', desc: 'আপনার সকল তথ্য এনক্রিপ্টেড এবং সম্পূর্ণ নিরাপদ রাখা হয় সরকারি নিয়মে।' },
                { icon: CheckCircle2, color: 'blue-600', title: 'স্বচ্ছ সমাধান', desc: 'প্রতিটি পদক্ষেপে আপনাকে নোটিফিকেশন প্রদান করা হবে স্বচ্ছতা বজায় রাখতে।' },
                { icon: Phone, color: 'amber-600', title: 'সরাসরি সহায়তা', desc: 'যেকোনো সমস্যার সমাধানে সরাসরি হেল্পলাইনে কল করুন ২৪/৭ যেকোনো সময়।' },
              ].map((item, idx) => (
                <div key={idx} className="space-y-3 group">
                  <div className={`w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform`}>
                    <item.icon className="text-primary" size={24} />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">{item.title}</h4>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
