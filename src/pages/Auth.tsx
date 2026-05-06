import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Lock, Mail, ArrowRight, ShieldCheck, AtSign } from 'lucide-react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        if (!userCredential.user.emailVerified) {
          setError('অনুগ্রহ করে আপনার ইমেইল ভেরিফাই করুন। একটি ভেরিফিকেশন লিঙ্ক পাঠানো হয়েছে।');
          await sendEmailVerification(userCredential.user);
        } else {
          alert('লগইন সফল হয়েছে!');
        }
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(userCredential.user);
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          uid: userCredential.user.uid,
          name,
          email,
        });
        alert('নিবন্ধন সফল হয়েছে! আপনার ইমেইল চেক করুন এবং অ্যাকাউন্ট ভেরিফাই করুন।');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'একটি সমস্যা হয়েছে, পুনরায় চেষ্টা করুন।');
    }
  };

  return (
    <div className="min-h-screen pt-20 flex items-stretch bg-bg-light overflow-hidden">
      {/* Decorative Side */}
      <div className="hidden lg:flex flex-1 relative bg-primary items-center justify-center p-24 overflow-hidden">
        {/* Background Visuals */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/60" />
        </div>
        
        {/* Abstract shapes */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white opacity-[0.02] rounded-full blur-[100px] -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent opacity-[0.03] rounded-full blur-[80px] -ml-24 -mb-24" />

        <div className="relative z-10 max-w-xl space-y-16">
          <motion.div 
            initial={{ opacity: 0, x: -40 }} 
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            <div className="w-24 h-24 bg-white/5 rounded-[2.5rem] flex items-center justify-center backdrop-blur-2xl border border-white/10 shadow-2xl">
               <ShieldCheck className="w-12 h-12 text-accent" />
            </div>
            <div className="space-y-6">
              <span className="text-accent text-[11px] font-bold uppercase tracking-[0.6em]">Smart Governance</span>
              <h2 className="text-5xl md:text-7xl font-bold text-white leading-[1.1] tracking-tight">আপনার ডিজিটাল <br/><span className="text-accent underline decoration-[10px] decoration-accent/20 underline-offset-[12px]">পরিচয়</span> নিশ্চিত করুন</h2>
            </div>
            <p className="text-white/50 text-xl font-medium leading-relaxed max-w-md">সিলেট জেলার সমন্বিত নাগরিক পোর্টালের মাধ্যমে সকল সরকারি সেবা এখন আপনার হাতের নাগালে। নিরাপদ ও দ্রুত সেবার অভিজ্ঞতায় আপনাকে স্বাগতম।</p>
          </motion.div>
        </div>
      </div>

      {/* Form Side */}
      <div className="flex-1 flex flex-col justify-center p-12 md:p-32 bg-white relative">
        <div className="max-w-md w-full mx-auto space-y-16">
          <div className="space-y-6">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight leading-none uppercase">
              {isLogin ? 'পোর্টালে প্রবেশ' : 'নাগরিক নিবন্ধন'}
            </h1>
            <p className="text-slate-500 font-medium text-base md:text-lg leading-relaxed">
              {isLogin ? 'আপনার নিবন্ধিত তথ্য ব্যবহার করে সিস্টেমে লগইন করুন।' : 'নতুন অ্যাকাউন্ট তৈরি করে সকল ই-সেবা উপভোগ করুন।'}
            </p>
            {error && <p className="text-red-500 font-bold">{error}</p>}
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={isLogin ? 'login' : 'signup'}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                {!isLogin && (
                  <div className="relative group">
                    <User className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-200 group-focus-within:text-primary transition-all w-6 h-6" />
                    <input 
                      type="text" 
                      placeholder="আপনার পূর্ণ নাম" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required={!isLogin}
                      className="w-full pl-14 pr-6 py-4 bg-bg-light border border-slate-50 rounded-[50px] outline-none focus:bg-white focus:shadow-md focus:border-primary/20 transition-all font-medium text-slate-900 text-base"
                    />
                  </div>
                )}
                
                <div className="relative group">
                  <AtSign className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-all w-5 h-5" />
                  <input 
                    type="email" 
                    placeholder="ইমেইল" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-14 pr-6 py-4 bg-bg-light border border-slate-50 rounded-[50px] outline-none focus:bg-white focus:shadow-md focus:border-primary/20 transition-all font-medium text-slate-900 text-base"
                  />
                </div>

                <div className="relative group">
                  <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-all w-5 h-5" />
                  <input 
                    type="password" 
                    placeholder="পাসওয়ার্ড" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-14 pr-6 py-4 bg-bg-light border border-slate-50 rounded-[50px] outline-none focus:bg-white focus:shadow-md focus:border-primary/20 transition-all font-medium text-slate-900 text-base"
                  />
                </div>
              </motion.div>
            </AnimatePresence>

            <button type="submit" className="w-full btn-gold !py-4 !rounded-[50px] !text-sm !uppercase tracking-[0.2em] shadow-xl shadow-accent/20 group">
              {isLogin ? 'সিস্টেমে প্রবেশ করুন' : 'অ্যাকাউন্ট তৈরি করুন'} 
              <ArrowRight className="w-4 h-4 inline-block ml-3 group-hover:translate-x-2 transition-transform" />
            </button>
          </form>

          <div className="pt-12 border-t border-slate-50 flex flex-col items-center gap-10">
            <p className="text-slate-400 font-bold text-lg">
              {isLogin ? 'অ্যাকাউন্ট নেই?' : 'ইতোমধ্যে অ্যাকাউন্ট আছে?'}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary font-bold ml-4 border-b-2 border-primary/20 hover:border-primary transition-all pb-1 translate-y-0 hover:-translate-y-0.5"
              >
                {isLogin ? 'নতুন তৈরি করুন' : 'সরাসরি লগইন'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
