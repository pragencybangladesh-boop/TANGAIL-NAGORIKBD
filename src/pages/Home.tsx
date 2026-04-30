import { UPAZILAS } from '../data/upazilas';
import UpazilaCard from '../components/UpazilaCard';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, ExternalLink, ShieldCheck, Globe, Landmark, Phone, Users, Mic, ArrowRight, Activity, FileText, Heart, GraduationCap, Zap, Sprout, Scale, Gavel, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

export default function Home() {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const quickActions = [
    { label: 'ভূমি সেবা', icon: Landmark, color: 'bg-emerald-50', iconColor: 'text-emerald-700', path: '/services' },
    { label: 'জন্ম নিবন্ধন', icon: FileText, color: 'bg-blue-50', iconColor: 'text-blue-700', path: '/services' },
    { label: 'স্বাস্থ্য সেবা', icon: Heart, color: 'bg-rose-50', iconColor: 'text-rose-700', path: '/services' },
    { label: 'শিক্ষা পোর্টাল', icon: GraduationCap, color: 'bg-amber-50', iconColor: 'text-amber-700', path: '/services' },
    { label: 'বিদ্যুৎ বিপণন', icon: Zap, color: 'bg-yellow-50', iconColor: 'text-yellow-700', path: '/services' },
    { label: 'কৃষি সহায়তা', icon: Sprout, color: 'bg-green-50', iconColor: 'text-green-700', path: '/services' },
    { label: 'আইনী সহায়তা', icon: Scale, color: 'bg-indigo-50', iconColor: 'text-indigo-700', path: '/services' },
    { label: 'পাসপোর্ট সেবা', icon: Globe, color: 'bg-cyan-50', iconColor: 'text-cyan-700', path: '/services' },
    { label: 'ট্যাক্স পরিশোধ', icon: Gavel, color: 'bg-slate-50', iconColor: 'text-slate-700', path: '/services' },
    { label: 'সামাজিক নিরাপত্তা', icon: ShieldCheck, color: 'bg-teal-50', iconColor: 'text-teal-700', path: '/services' },
    { label: 'অভিযোগ বক্স', icon: Phone, color: 'bg-orange-50', iconColor: 'text-orange-700', path: '/grievance' },
    { label: 'অন্যান্য সেবা', icon: Activity, color: 'bg-purple-50', iconColor: 'text-purple-700', path: '/services' },
  ];

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-32 pb-12 px-6 bg-gradient-to-br from-green-800 to-green-950 overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '48px 48px' }} />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/20"
          >
            <span className="text-white text-sm font-medium flex items-center gap-2">
              <span className="text-yellow-400">✨</span> সরকারি সেবা সহজীকরণ ও নাগরিক অংশগ্রহণ
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight tracking-tight">
            নাগরিক বিডি
          </h1>
          <h2 className="text-3xl md:text-4xl font-semibold text-white/90 tracking-tight">
            টাঙ্গাইল জেলা নাগরিক পোর্টাল
          </h2>

          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            টাঙ্গাইল জেলার ডিজিটাল প্ল্যাটফর্ম — স্বচ্ছ, দ্রুত ও আধুনিক সেবায় নাগরিকের পাশে। ৭টি উপজেলার ৪৫+ অনলাইন সেবা এক জায়গায়।
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Link to="/services" className="px-8 py-4 bg-green-600 text-white font-bold rounded-xl hover:bg-green-500 transition-all flex items-center gap-2">
              সেবাসমূহ দেখুন <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/upazilas" className="px-8 py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-all border border-white/20">
              উপজেলা সমূহ
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="relative z-10 max-w-5xl mx-auto mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            {[
                {label: 'উপজেলা', value: '৭'},
                {label: 'অনলাইন সেবা', value: '৪৫+'},
                {label: 'ডিজিটাল সেবা', value: '২৪/৭'},
                {label: 'নাগরিক সহায়তক', value: 'AI'},
            ].map((stat, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/10 p-6 rounded-2xl text-center text-white">
                    <div className="text-3xl font-bold mb-1">{stat.value}</div>
                    <div className="text-sm font-medium text-white/70">{stat.label}</div>
                </div>
            ))}
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="flex flex-col items-center text-center space-y-4 mb-20">
          <span className="text-green-800 bg-green-50 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mt-12">ডিজিটাল নাগরিক সেবা পোর্টাল</span>
          <h2 className="text-4xl md:text-5xl font-bold text-primary">টাঙ্গাইল জেলার সেবাসমূহ</h2>
          <p className="text-body max-w-2xl text-lg">সরকারি সেবা সহজীকরণ ও নাগরিকের দোরগোড়ায় — দ্রুত, স্বচ্ছ ও নির্ভরযোগ্য সেবা প্রদান।</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {quickActions.map((action, i) => (
            <Link to={action.path} key={i}>
              <motion.div
                whileHover={{ y: -4 }}
                className="bg-card p-6 rounded-2xl relative overflow-hidden border border-[#E5E7EB] shadow-green-soft hover:shadow-green-hover transition-all group h-full"
              >
                <div className={`w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white mb-4`}>
                  <action.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-heading mb-2">{action.label}</h3>
                <p className="text-body text-xs mb-4">সরকারি সেবায় দ্রুত আবেদন ও নিষ্পত্তি।</p>
                <div className="inline-block bg-background text-body text-[10px] font-bold px-3 py-1 rounded-full">২৪/৭ সেবা</div>
                
                {/* Background Circle */}
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-icon-bg rounded-full" />
              </motion.div>
            </Link>
          ))}
        </div>
        
        <div className="mt-16 flex justify-center">
            <Link to="/services" className="px-8 py-4 bg-emerald-800 text-white font-bold rounded-xl hover:bg-emerald-900 transition-all flex items-center gap-3">
                সকল সেবা দেখুন <ArrowRight className="w-5 h-5" />
            </Link>
        </div>
      </section>

      {/* Notices Section */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="flex flex-col mb-12">
            <span className="text-green-800 bg-green-50 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest self-start mb-4">নোটিশ ও ঘোষণা</span>
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-heading">সর্বশেষ নোটিশ</h2>
                <Link to="/notices" className="text-primary font-bold flex items-center gap-2 hover:gap-3 transition-all">
                  সকল নোটিস দেখুন ↗
                </Link>
            </div>
        </div>
        
        <div className="grid gap-6">
           <div className="bg-card p-6 rounded-3xl border border-[#E5E7EB] shadow-green-soft hover:shadow-green-hover transition-all">
                <div className="flex justify-between items-start mb-4">
                    <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full">নির্বাচন</span>
                    <span className="text-sm text-slate-500 flex items-center gap-1">📅 ২০ এপ্রিল, ২০২৬</span>
                </div>
                <h3 className="text-xl font-bold text-heading mb-3">প্রবাসী ভোটার সিস্টেম চালু</h3>
                <p className="text-body text-sm mb-4">ত্রয়োদশ জাতীয় সংসদ নির্বাচনকে সামনে রেখে প্রবাসীদের জন্য ডাকযোগে ভোটদানের (Postal Voting) সুবিধা চালু করেছে নির্বাচন কমিশন।</p>
                <Link to="/notices" className="text-primary font-bold flex items-center gap-1 text-sm">বিস্তারিত পড়ুন ↗</Link>
           </div>
           
           <div className="bg-card p-6 rounded-3xl border border-[#E5E7EB] shadow-green-soft hover:shadow-green-hover transition-all">
                <div className="flex justify-between items-start mb-4">
                    <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full">নোটিশ</span>
                    <span className="text-sm text-slate-500 flex items-center gap-1">📅 ২০ এপ্রিল, ২০২৬</span>
                </div>
                <h3 className="text-xl font-bold text-heading mb-3">ভোটার তালিকায় ঠিকানা পরিবর্তন স্থগিত</h3>
                <p className="text-body text-sm mb-4">চূড়ান্ত ভোটার তালিকা প্রস্তুতের লক্ষে এপ্রিল ২০২৬ থেকে ঠিকানা পরিবর্তনের কার্যক্রম সম্পূর্ণভাবে স্থগিত আছে।</p>
                <Link to="/notices" className="text-primary font-bold flex items-center gap-1 text-sm">বিস্তারিত পড়ুন ↗</Link>
           </div>
        </div>
      </section>

      {/* Upazilas Section */}
      <section className="bg-card py-32 mb-32 border-y border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-20 gap-8">
            <div className="space-y-4">
              <span className="text-accent text-[11px] font-bold uppercase tracking-[0.4em]">Districts & Units</span>
              <h2 className="text-4xl md:text-5xl font-bold text-primary">উপজেলা কেন্দ্রসমূহ</h2>
            </div>
            <Link to="/upazilas" className="text-primary font-bold flex items-center gap-2 hover:gap-4 transition-all">
              সেবাদেখুন : উপজেলা সমূহ <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {UPAZILAS.slice(0, 4).map((upazila, i) => (
              <UpazilaCard key={upazila.id} upazila={upazila} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Volunteer CTA */}
      <section className="max-w-7xl mx-auto px-6 mb-32 flex justify-center">
        <Link 
          to="/volunteer" 
          className="px-10 py-5 bg-primary text-white font-bold rounded-2xl hover:bg-primary/90 transition-all flex items-center gap-3 text-lg shadow-green-strong hover:scale-105"
        >
          ভলান্টিয়ার জয়েন করতে ক্লিক করুন <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      {/* Complaint Form Section */}
      <section className="max-w-4xl mx-auto px-6 mb-32">
        <div className="bg-card p-8 md:p-12 rounded-[2rem] border border-border shadow-green-strong">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
              <MessageSquare size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-heading">অভিযোগ ফর্ম</h2>
              <p className="text-body text-sm">আপনার যেকোনো অভিযোগ আমাদের জানান, আমরা দ্রুত ব্যবস্থা নেব।</p>
            </div>
          </div>
          
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-heading">নাম</label>
                <input type="text" className="w-full p-4 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 outline-none" placeholder="আপনার নাম লিখুন" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-heading">ইমেইল</label>
                <input type="email" className="w-full p-4 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 outline-none" placeholder="আপনার ইমেইল" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-heading">বিষয়</label>
              <input type="text" className="w-full p-4 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 outline-none" placeholder="অভিযোগের বিষয়" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-heading">আপনার অভিযোগ</label>
              <textarea className="w-full p-4 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 outline-none h-32" placeholder="বিস্তারিত লিখুন"></textarea>
            </div>
            <button onClick={(e) => { e.preventDefault(); navigate('/grievance'); }} className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary/90 transition-all">অভিযোগ জমা দিন</button>
          </form>
        </div>
      </section>

      {/* Floating Login CTA -> Good Governance */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-primary p-8 md:p-12 rounded-[2rem] text-center relative overflow-hidden"
        >
          <div className="relative z-10 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">সুশাসন ও নাগরিক অধিকার</h2>
            <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto font-medium">নাগরিকদের অধিকার সচেতনতা, আইনি সহায়তা এবং সুশাসন প্রতিষ্ঠায় আমাদের কার্যক্রম ও ব্লগ সম্পর্কে জানুন।</p>
            <div className="flex justify-center">
              <Link to="/governance" className="btn-gold !px-8 !py-4 text-sm uppercase tracking-widest hover:scale-105 transition-all">
                বিস্তারিত জানুন
              </Link>
            </div>
          </div>
          {/* Decor */}
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
            <Globe className="absolute -top-20 -left-20 w-96 h-96" />
            <ShieldCheck className="absolute -bottom-20 -right-20 w-80 h-80" />
          </div>
        </motion.div>
      </section>
    </div>
  );
}
