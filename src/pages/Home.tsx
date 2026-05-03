import { UPAZILAS } from '../data/mymensingh';
import UpazilaCard from '../components/ui/UpazilaCard';
import WeatherCard from '../components/ui/WeatherCard';
import { doc, getDocs, query, collection, where } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, ExternalLink, ShieldCheck, Globe, Landmark, Phone, Users, Mic, ArrowRight, Activity, FileText, Heart, GraduationCap, Zap, Sprout, Scale, Gavel, MessageSquare, Clock, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

const QUICK_ACTIONS = [
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

const HERO_STATS = [
    {label: 'উপজেলা', value: '১৩'},
    {label: 'অনলাইন সেবা', value: '৫০+'},
    {label: 'ডিজিটাল সেবা', value: '২৪/৭'},
    {label: 'নাগরিক সহায়ক', value: 'AI'},
];

export default function Home() {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();
  const [globalStats, setGlobalStats] = useState({
    total: 0,
    resolved: 0,
    pending: 0,
    inProgress: 0
  });

  useEffect(() => {
    const fetchGlobalStats = async () => {
      try {
        const q = query(collection(db, 'complaints'));
        const snapshot = await getDocs(q);
        const docs = snapshot.docs.map(doc => doc.data());
        setGlobalStats({
          total: docs.length,
          resolved: docs.filter(d => d.status === 'Resolved' || d.status === 'Completed').length,
          pending: docs.filter(d => d.status === 'Pending').length,
          inProgress: docs.filter(d => d.status === 'In Progress' || d.status === 'Processing').length
        });
      } catch (error) {
        console.error("Error fetching global stats:", error);
      }
    };
    fetchGlobalStats();
  }, []);

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
              <span className="text-yellow-400">✨</span> সরকারের সমালোচনা নয়, সরকারের সহযোগিতার মাধ্যমে উন্নত দেশ গড়ার প্রত্যায়ে NagorikBD 🇧🇩
            </span>
          </motion.div>

          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight">
            ময়মনসিংহ ডিজিটাল পোর্টাল
          </h1>
          <h2 className="text-xl sm:text-2xl font-semibold text-white/90 tracking-tight">
            নাগরিক বাংলাদেশ
          </h2>

          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            ময়মনসিংহ জেলার ডিজিটাল প্ল্যাটফর্ম — স্বচ্ছ, দ্রুত ও আধুনিক সেবায় নাগরিকের পাশে। ১৩টি উপজেলার ৫০+ অনলাইন সেবা এক জায়গায়।
          </p>

          <div className="flex flex-row items-center justify-center gap-4 pt-6">
            <Link to="/services" className="px-8 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-500 transition-all flex items-center gap-2 text-sm whitespace-nowrap">
              সেবাসমূহ দেখুন <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/upazilas" className="px-8 py-3 bg-white/10 text-white font-bold rounded-lg hover:bg-white/20 transition-all border border-white/20 text-sm whitespace-nowrap">
              উপজেলা সমূহ
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="relative z-10 max-w-5xl mx-auto mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 w-full px-4 sm:px-0">
            {HERO_STATS.map((stat, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/10 p-4 rounded-xl text-center text-white">
                    <div className="text-2xl font-bold mb-1">{stat.value}</div>
                    <div className="text-sm font-medium text-white/70">{stat.label}</div>
                </div>
            ))}
        </div>
      </section>

      {/* Weather Section */}
      <section className="max-w-7xl mx-auto px-6 -mt-8 relative z-20">
        <WeatherCard />
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="flex flex-col items-center text-center space-y-4 mb-20">
          <span className="text-green-800 bg-green-50 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mt-12">ডিজিটাল নাগরিক সেবা পোর্টাল</span>
          <h2 className="text-4xl md:text-5xl font-bold text-primary">আমাদের সেবাসমূহ</h2>
          <p className="text-body max-w-2xl text-lg">সরকারি সেবা সহজীকরণ ও নাগরিকের দোরগোড়ায় — দ্রুত, স্বচ্ছ ও নির্ভরযোগ্য সেবা প্রদান।</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {QUICK_ACTIONS.map((action, i) => (
            <Link to={action.path} key={i}>
              <motion.div
                whileHover={{ y: -4 }}
                className="bg-card p-6 rounded-2xl relative overflow-hidden border border-[#E5E7EB] shadow-green-soft hover:shadow-green-hover transition-all group h-full"
              >
                <div className={`w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white mb-4`}>
                  <action.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-heading mb-2">{action.label}</h3>
                <p className="text-body text-sm mb-4">সরকারি সেবায় দ্রুত আবেদন ও নিষ্পত্তি।</p>
                <div className="inline-block bg-background text-body text-xs font-bold px-3 py-1 rounded-full">২৪/৭ সেবা</div>
                
                {/* Background Circle */}
                <div className="absolute -top-6 -right-6 w-16 h-16 bg-icon-bg rounded-full opacity-50" />
              </motion.div>
            </Link>
          ))}
        </div>
        
        <div className="mt-10 flex justify-center">
            <Link to="/services" className="px-8 py-3 bg-emerald-800 text-white font-bold rounded-lg hover:bg-emerald-900 transition-all flex items-center gap-2 text-sm">
                সকল সেবা দেখুন <ArrowRight className="w-4 h-4" />
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
           <div className="bg-card p-6 rounded-2xl border border-[#E5E7EB] shadow-green-soft hover:shadow-green-hover transition-all">
                <div className="flex justify-between items-start mb-2">
                    <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full">নির্বাচন</span>
                    <span className="text-sm text-slate-500 flex items-center gap-1">📅 ২০ এপ্রিল, ২০২৬</span>
                </div>
                <h3 className="text-lg font-bold text-heading mb-2">প্রবাসী ভোটার সিস্টেম চালু</h3>
                <p className="text-body text-sm mb-4">ত্রয়োদশ জাতীয় সংসদ নির্বাচনকে সামনে রেখে প্রবাসীদের জন্য ডাকযোগে ভোটদানের (Postal Voting) সুবিধা চালু করেছে নির্বাচন কমিশন।</p>
                <Link to="/notices" className="text-primary font-bold flex items-center gap-1 text-sm">বিস্তারিত পড়ুন ↗</Link>
           </div>
           
           <div className="bg-card p-6 rounded-2xl border border-[#E5E7EB] shadow-green-soft hover:shadow-green-hover transition-all">
                <div className="flex justify-between items-start mb-2">
                    <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full">নোটিশ</span>
                    <span className="text-sm text-slate-500 flex items-center gap-1">📅 ২০ এপ্রিল, ২০২৬</span>
                </div>
                <h3 className="text-lg font-bold text-heading mb-2">ভোটার তালিকায় ঠিকানা পরিবর্তন স্থগিত</h3>
                <p className="text-body text-sm mb-4">চূড়ান্ত ভোটার তালিকা প্রস্তুতের লক্ষে এপ্রিল ২০২৬ থেকে ঠিকানা পরিবর্তনের কার্যক্রম সম্পূর্ণভাবে স্থগিত আছে।</p>
                <Link to="/notices" className="text-primary font-bold flex items-center gap-1 text-sm">বিস্তারিত পড়ুন ↗</Link>
           </div>
        </div>
      </section>

      {/* Upazilas Section */}
      <section className="bg-card py-32 mb-32 border-y border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
            <div className="space-y-1">
              <span className="text-accent text-[10px] font-bold uppercase tracking-[0.2em]">Districts & Units</span>
              <h2 className="text-2xl md:text-3xl font-bold text-primary">উপজেলা কেন্দ্রসমূহ</h2>
            </div>
            <Link to="/upazilas" className="text-primary font-bold flex items-center gap-2 hover:gap-4 transition-all text-sm">
              সেবাদেখুন : উপজেলা সমূহ <ArrowRight className="w-4 h-4" />
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
      <section className="max-w-7xl mx-auto px-6 mb-32 flex flex-col items-center gap-6">
        <h3 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight text-center">Good Citizens build Good Governance</h3>
        <Link 
          to="/volunteer-registration" 
          className="px-10 py-5 bg-emerald-700 text-white font-bold rounded-2xl hover:bg-emerald-600 transition-all flex items-center gap-4 text-xl shadow-2xl border border-emerald-600/50 whitespace-nowrap hover:scale-105 group"
        >
          নাগরিক বাংলাদেশ এর অংশ হতে জয়েন করুন <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </Link>
      </section>

      {/* Complaint Form Section */}
      <section className="max-w-4xl mx-auto px-6 mb-32">
        <div className="bg-card p-8 rounded-2xl border border-border shadow-green-strong">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
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
                <input type="text" className="w-full p-4 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 outline-none text-sm" placeholder="আপনার নাম লিখুন" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-heading">ইমেইল</label>
                <input type="email" className="w-full p-4 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 outline-none text-sm" placeholder="আপনার ইমেইল" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-heading">বিষয়</label>
              <input type="text" className="w-full p-4 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 outline-none text-sm" placeholder="অভিযোগের বিষয়" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-heading">আপনার অভিযোগ</label>
              <textarea className="w-full p-4 rounded-xl border border-border focus:ring-2 focus:ring-primary/20 outline-none h-32 text-sm" placeholder="বিস্তারিত লিখুন"></textarea>
            </div>
            <button onClick={(e) => { e.preventDefault(); navigate('/grievance'); }} className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary/90 transition-all text-base">অভিযোগ জমা দিন</button>
          </form>
        </div>
      </section>

      {/* Global Complaint Statistics Section */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_8px_40px_rgb(0,0,0,0.03)] overflow-hidden"
        >
          <div className="bg-slate-50/50 px-8 py-6 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Activity className="w-5 h-5 text-accent" />
              <h3 className="text-sm font-bold text-slate-700 tracking-wider uppercase">সারাদেশে নাগরিক অভিযোগের চিত্র</h3>
            </div>
            <Link to="/grievance" className="text-[10px] font-black text-accent hover:text-primary transition-colors uppercase tracking-[0.2em] flex items-center gap-2">
              অভিযোগ জমা দিন <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          
          <div className="p-10 md:p-14">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-4 divide-x-0 md:divide-x divide-slate-100 text-center md:text-left">
              {[
                { label: 'মোট অভিযোগ', value: globalStats.total, color: 'text-slate-900', icon: MessageSquare },
                { label: 'সমাধানকৃত', value: globalStats.resolved, color: 'text-emerald-600', icon: CheckCircle2 },
                { label: 'অপেক্ষমান', value: globalStats.pending, color: 'text-rose-500', icon: Clock },
                { label: 'প্রক্রিয়াধীন', value: globalStats.inProgress, color: 'text-blue-600', icon: Activity }
              ].map((stat, i) => (
                <div key={i} className="flex flex-col md:px-10 first:pl-0 last:pr-0">
                  <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                    <stat.icon className="w-3 h-3 text-slate-300" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</span>
                  </div>
                  <span className={`text-4xl md:text-6xl font-black ${stat.color} tracking-tighter tabular-nums leading-none`}>
                    {stat.value.toLocaleString('bn-BD')}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-12 text-[11px] text-slate-400 font-medium text-center border-t border-slate-50 pt-8 italic">
              * সকল উপজেলার সম্মিলিত তথ্যের ভিত্তিতে প্রতি মিনিটে স্বয়ংক্রিয়ভাবে আপডেট করা হয়।
            </p>
          </div>
        </motion.div>
      </section>

      {/* Floating Login CTA -> Good Governance */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-700 p-8 md:p-12 rounded-[2rem] text-center relative overflow-hidden shadow-2xl shadow-amber-900/20"
        >
          <div className="relative z-10 space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">সুশাসন ও নাগরিক অধিকার</h2>
            <p className="text-white/90 text-base md:text-lg max-w-2xl mx-auto font-medium">নাগরিকদের অধিকার সচেতনতা, আইনি সহায়তা এবং সুশাসন প্রতিষ্ঠায় আমাদের কার্যক্রম ও ব্লগ সম্পর্কে জানুন।</p>
            <div className="flex justify-center">
              <Link to="/governance" className="px-8 py-3 bg-white text-amber-900 font-bold rounded-lg hover:bg-amber-50 hover:scale-105 transition-all shadow-lg text-sm uppercase tracking-widest">
                বিস্তারিত জানুন
              </Link>
            </div>
          </div>
          {/* Decor */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <Globe className="absolute -top-20 -left-20 w-96 h-96 text-white" />
            <ShieldCheck className="absolute -bottom-20 -right-20 w-80 h-80 text-white" />
          </div>
        </motion.div>
      </section>
    </div>
  );
}
