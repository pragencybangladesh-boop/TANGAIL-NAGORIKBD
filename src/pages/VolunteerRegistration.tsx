import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { addDoc, collection, query, where, getDocs, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { CheckCircle2, Search, User, Phone, MapPin, GraduationCap, Facebook, FileText, ChevronRight, Clock, ShieldCheck, ArrowRight } from 'lucide-react';

export default function VolunteerRegistration() {
  const [formData, setFormData] = useState({ 
    name: '', 
    phone: '', 
    district: 'Mymensingh', 
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
  
  const [isTracking, setIsTracking] = useState(false);
  const [trackingInput, setTrackingInput] = useState('');
  const [trackingResult, setTrackingResult] = useState<any>(null);
  const [trackingError, setTrackingError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<string | null>(null);
  const [formError, setFormError] = useState('');

  const validatePhone = (phone: string) => {
    const phoneRegex = /^01[3-9]\d{8}$/;
    return phoneRegex.test(phone);
  };

  const generateTrackingId = () => {
    return 'V-' + Math.random().toString(36).substring(2, 7).toUpperCase();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!validatePhone(formData.phone)) {
      setFormError('অনুগ্রহ করে সঠিক মোবাইল নম্বর প্রদান করুন (১১ ডিজিট, যেমন: ০১৭XXXXXXXX)');
      return;
    }

    setIsSubmitting(true);
    const trackingId = generateTrackingId();
    
    try {
      await addDoc(collection(db, 'volunteers'), {
        ...formData,
        trackingId,
        status: 'অপেক্ষমান',
        createdAt: serverTimestamp()
      });
      setSubmissionResult(trackingId);
    } catch (error) {
      setFormError('আবেদন জমা দিতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
      handleFirestoreError(error, OperationType.CREATE, 'volunteers');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTrackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTrackingError('');
    setTrackingResult(null);
    
    try {
      const q = query(collection(db, 'volunteers'), where('trackingId', '==', trackingInput.trim().toUpperCase()));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        setTrackingError('দুঃখিত, এই ট্র্যাকিং আইডিটি পাওয়া যায়নি।');
      } else {
        const data = querySnapshot.docs[0].data();
        setTrackingResult({
          ...data,
          createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toLocaleDateString('bn-BD') : 'N/A'
        });
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, 'volunteers');
    }
  };

  if (submissionResult) {
    return (
      <div className="pt-40 pb-32 bg-[#f8fafc] min-h-screen flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-12 rounded-3xl text-center space-y-8 shadow-2xl max-w-lg border border-emerald-50"
        >
          <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10 text-emerald-500" />
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">অভিনন্দন!</h2>
            <p className="text-slate-500 text-base font-medium">আপনার আবেদনটি সফলভাবে গৃহীত হয়েছে।</p>
          </div>
          
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">আপনার ভলান্টিয়ার আইডি</p>
            <div className="text-4xl font-black text-primary tracking-tighter">{submissionResult}</div>
            <p className="text-[11px] text-slate-400 font-bold bg-white/50 py-2 rounded-lg">ভবিষ্যত অনুসন্ধানের জন্য এই আইডিটি সংরক্ষণ করুন।</p>
          </div>

          <div className="flex items-center gap-3 bg-amber-50 p-4 rounded-xl border border-amber-100 text-amber-700">
            <Clock className="w-5 h-5 shrink-0" />
            <p className="text-xs font-bold text-left leading-relaxed">
              আপনার আবেদনটি বর্তমানে পর্যালোচনার অধীনে রয়েছে। আমরা আগামী ৭২ ঘণ্টার মধ্যে আপনার মোবাইলে আপডেট জানাবো।
            </p>
          </div>

          <button 
            onClick={() => { setSubmissionResult(null); setIsTracking(false); }} 
            className="w-full bg-slate-900 text-white py-4 rounded-xl text-sm font-bold shadow-xl hover:bg-slate-800 transition-all"
          >
            ফিরে যান
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-24 md:pt-40 pb-32 bg-[#f8fafc] min-h-screen">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-6 mb-12 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full border border-primary/10">
          <ShieldCheck className="w-4 h-4 text-primary" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Volunteer Network</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">আপনার উপজেলাকে বদলে দিন</h1>
        <p className="text-sm md:text-lg font-medium text-slate-500 max-w-2xl mx-auto leading-relaxed">
          নাগরিক বাংলাদেশ এর ভলান্টিয়ার হিসেবে জয়েন করে আপনার এলাকার প্রশাসনিক স্বচ্ছতা ও সেবায় অবদান রাখুন।
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-6">
        {/* Tab Toggle */}
        <div className="bg-slate-200/50 p-1 rounded-2xl flex items-center mb-10 max-w-sm mx-auto shadow-sm">
          <button 
            type="button"
            onClick={() => setIsTracking(false)}
            className={`flex-1 py-3 text-xs font-bold rounded-xl transition-all ${!isTracking ? 'bg-white text-primary shadow-lg' : 'text-slate-500 hover:text-slate-700'}`}
          >
            আবেদন করুন
          </button>
          <button 
            type="button"
            onClick={() => setIsTracking(true)}
            className={`flex-1 py-3 text-xs font-bold rounded-xl transition-all ${isTracking ? 'bg-white text-primary shadow-lg' : 'text-slate-500 hover:text-slate-700'}`}
          >
            ট্র্যাক করুন
          </button>
        </div>

        <AnimatePresence mode="wait">
          {!isTracking ? (
            <motion.div 
              key="apply"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden"
            >
              <div className="p-8 md:p-12 space-y-10">
                <div className="flex items-center gap-4 text-primary">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">ভলান্টিয়ার রেজিস্ট্রেশন</h3>
                    <p className="text-xs text-slate-400 font-medium">সঠিক তথ্য দিয়ে ফরমটি পূরণ করুন।</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Personal Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 ml-2">আপনার পূর্ণ নাম *</label>
                      <input 
                        type="text" 
                        required
                        placeholder="যেমন: মোঃ আব্দুল্লাহ" 
                        className="w-full bg-slate-50 py-4 px-6 rounded-2xl font-bold text-slate-900 border-2 border-transparent focus:border-primary/50 focus:bg-white outline-none transition-all text-sm"
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 ml-2">মোবাইল নম্বর *</label>
                      <input 
                        type="tel" 
                        required
                        placeholder="যেমন: ০১৭XXXXXXXX" 
                        className="w-full bg-slate-50 py-4 px-6 rounded-2xl font-bold text-slate-900 border-2 border-transparent focus:border-primary/50 focus:bg-white outline-none transition-all text-sm"
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                  </div>

                  {/* Location */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 ml-2">জেলা</label>
                      <input 
                        type="text" 
                        disabled
                        className="w-full bg-slate-100 py-4 px-6 rounded-2xl font-bold text-slate-400 border-2 border-transparent outline-none text-sm cursor-not-allowed"
                        value={formData.district}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 ml-2">উপজেলা *</label>
                      <input 
                        type="text" 
                        required
                        placeholder="উপজেলার নাম" 
                        className="w-full bg-slate-50 py-4 px-6 rounded-2xl font-bold text-slate-900 border-2 border-transparent focus:border-primary/50 focus:bg-white outline-none transition-all text-sm"
                        value={formData.upazila}
                        onChange={e => setFormData({...formData, upazila: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 ml-2">ইউনিয়ন *</label>
                      <input 
                        type="text" 
                        required
                        placeholder="ইউনিয়নের নাম" 
                        className="w-full bg-slate-50 py-4 px-6 rounded-2xl font-bold text-slate-900 border-2 border-transparent focus:border-primary/50 focus:bg-white outline-none transition-all text-sm"
                        value={formData.union}
                        onChange={e => setFormData({...formData, union: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 ml-2">পেশা বা শিক্ষা প্রতিষ্ঠান *</label>
                      <input 
                        type="text" 
                        required
                        placeholder="যেমন: ছাত্র, শিক্ষক, ব্যবসায়ী" 
                        className="w-full bg-slate-50 py-4 px-6 rounded-2xl font-bold text-slate-900 border-2 border-transparent focus:border-primary/50 focus:bg-white outline-none transition-all text-sm"
                        value={formData.educationOrProfession}
                        onChange={e => setFormData({...formData, educationOrProfession: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 ml-2">রক্তের গ্রুপ *</label>
                      <select 
                        required
                        className="w-full bg-slate-50 py-4 px-6 rounded-2xl font-bold text-slate-900 border-2 border-transparent focus:border-primary/50 focus:bg-white outline-none transition-all text-sm appearance-none cursor-pointer"
                        value={formData.bloodGroup}
                        onChange={e => setFormData({...formData, bloodGroup: e.target.value})}
                      >
                        <option value="">নির্বাচন করুন</option>
                        {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(group => <option key={group} value={group}>{group}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 ml-2">আপনি কেন জয়েন করতে চান? *</label>
                    <textarea 
                      required
                      placeholder="আপনার দক্ষাতা ও আগ্রহ সম্পর্কে সংক্ষেপে লিখুন..." 
                      className="w-full bg-slate-50 py-4 px-6 rounded-2xl font-bold text-slate-900 border-2 border-transparent focus:border-primary/50 focus:bg-white outline-none transition-all text-sm h-32 resize-none"
                      value={formData.about}
                      onChange={e => setFormData({...formData, about: e.target.value})}
                    />
                  </div>

                  {formError && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="bg-red-50 text-red-500 p-4 rounded-xl border border-red-100 text-sm font-bold text-center"
                    >
                      {formError}
                    </motion.div>
                  )}

                  <button 
                    disabled={isSubmitting}
                    className={`w-full py-5 rounded-2xl font-black shadow-2xl transition-all flex items-center justify-center gap-3 tracking-widest uppercase text-sm ${isSubmitting ? 'bg-slate-100 text-slate-400' : 'bg-primary text-white shadow-primary/20 hover:scale-[1.01] active:scale-[0.99]'}`}
                  >
                    {isSubmitting ? 'প্রসেসিং হচ্ছে...' : 'আবেদন জমা দিন'} 
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="track"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 p-8 md:p-12 space-y-10"
            >
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">আবেদন ট্র্যাক করুন</h3>
                <p className="text-sm text-slate-400 font-medium">ভলান্টিয়ার আইডি দিয়ে আপনার আবেদনের অবস্থা জানুন।</p>
              </div>

              <form onSubmit={handleTrackSubmit} className="max-w-md mx-auto space-y-4">
                <div className="relative group">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-primary transition-colors" />
                  <input 
                    type="text" 
                    required
                    placeholder="যেমন: V-XXXXX" 
                    className="w-full bg-slate-50 py-4 pl-14 pr-6 rounded-2xl font-bold text-slate-900 border-2 border-transparent focus:border-primary/50 focus:bg-white outline-none transition-all text-base uppercase"
                    value={trackingInput}
                    onChange={e => setTrackingInput(e.target.value)}
                  />
                </div>
                <button type="submit" className="w-full bg-primary text-white py-4 rounded-xl font-bold shadow-xl hover:translate-y-[-2px] transition-all">সার্চ করুন</button>
                
                {trackingError && (
                  <p className="text-center text-red-500 text-xs font-bold bg-red-50 py-3 rounded-lg border border-red-100">{trackingError}</p>
                )}
              </form>

              {trackingResult && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-slate-50 border border-slate-200 rounded-3xl p-8 space-y-8"
                >
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">ভলান্টিয়ারের নাম</span>
                      <p className="text-xl font-black text-slate-900">{trackingResult.name}</p>
                    </div>
                    <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                      trackingResult.status === 'অপেক্ষমান' ? 'bg-amber-50 text-amber-600 border-amber-200' :
                      trackingResult.status === 'অনুমোদিত' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' :
                      'bg-red-50 text-red-600 border-red-200'
                    }`}>
                      {trackingResult.status}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-8 pt-8 border-t border-slate-200">
                    <div className="space-y-1">
                      <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">এলাকা</span>
                      <p className="text-sm font-bold text-slate-800">{trackingResult.upazila}, {trackingResult.district}</p>
                    </div>
                    <div className="space-y-1 text-right">
                      <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">আবেদনের তারিখ</span>
                      <p className="text-sm font-bold text-slate-800">{trackingResult.createdAt}</p>
                    </div>
                  </div>

                  <div className="bg-white/60 p-4 rounded-2xl border border-white flex items-center gap-4">
                    <Clock className="w-5 h-5 text-primary" />
                    <p className="text-[11px] font-black text-slate-500 leading-relaxed uppercase tracking-tight">
                      {trackingResult.status === 'অপেক্ষমান' ? 'আপনার আবেদনটি শীঘ্রই রিভিউ করা হবে। অনুগ্রহ করে ৭২ ঘণ্টা অপেক্ষা করুন।' : 'আপনার আবেদনের ফলাফল চূড়ান্ত করা হয়েছে।'}
                    </p>
                  </div>

                  {trackingResult.status === 'অনুমোদিত' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="pt-6"
                    >
                      <div className="bg-white rounded-3xl p-8 shadow-2xl border-4 border-slate-900 relative overflow-hidden group max-w-sm mx-auto aspect-[3/5]">
                        {/* ID Card Header */}
                        <div className="absolute top-0 left-0 w-full h-24 bg-slate-900 flex items-center justify-center">
                          <div className="text-center">
                            <h4 className="text-white font-black text-xs uppercase tracking-[0.3em]">Nagorik BD</h4>
                            <p className="text-amber-400 text-[8px] font-black uppercase tracking-widest mt-1">Digital Volunteer ID</p>
                          </div>
                        </div>

                        {/* ID Card Content */}
                        <div className="mt-20 space-y-6 text-center">
                          <div className="w-24 h-24 bg-slate-100 rounded-2xl mx-auto border-4 border-white shadow-xl flex items-center justify-center text-slate-300">
                             <User className="w-12 h-12" />
                          </div>
                          
                          <div className="space-y-1">
                            <h5 className="text-xl font-black text-slate-900 tracking-tight">{trackingResult.name}</h5>
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 rounded-full border border-emerald-100">
                               <ShieldCheck className="w-3 h-3 text-emerald-500" />
                               <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">Verified Volunteer</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4 text-left">
                            <div className="space-y-1">
                              <span className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">ID Number</span>
                              <p className="text-xs font-black text-slate-900">{trackingResult.trackingId}</p>
                            </div>
                            <div className="space-y-1 text-right">
                              <span className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">Blood Group</span>
                              <p className="text-xs font-black text-red-600">{trackingResult.bloodGroup}</p>
                            </div>
                            <div className="space-y-1">
                              <span className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">Area</span>
                              <p className="text-[10px] font-black text-slate-900 leading-tight">{trackingResult.upazila}, {trackingResult.district}</p>
                            </div>
                            <div className="space-y-1 text-right">
                              <span className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">Issue Date</span>
                              <p className="text-[10px] font-black text-slate-900">{trackingResult.createdAt}</p>
                            </div>
                          </div>

                          <div className="pt-6 border-t border-slate-100">
                             <div className="w-full flex justify-center opacity-20">
                                {/* Mock QR Code Replacement */}
                                <div className="grid grid-cols-4 gap-1 p-2 bg-slate-200 rounded-lg">
                                   {[...Array(16)].map((_, i) => <div key={i} className={`w-2 h-2 rounded-[2px] ${Math.random() > 0.5 ? 'bg-slate-900' : 'bg-transparent'}`} />)}
                                </div>
                             </div>
                             <p className="text-[7px] text-slate-400 font-bold uppercase tracking-widest mt-4">Authorized by Nagorik BD Authority</p>
                          </div>
                        </div>

                        {/* Decoration */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 -mr-16 -mt-16 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-400/5 -ml-16 -mb-16 rounded-full blur-3xl pointer-events-none" />
                      </div>
                      <p className="text-center text-[10px] font-bold text-slate-400 mt-6 italic">
                        * এটি একটি ডিজিটাল আইডি কার্ড। স্ক্রিনশট নিয়ে এটি সংরক্ষণ করুন।
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
