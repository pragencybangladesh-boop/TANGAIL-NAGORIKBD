import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { UPAZILAS } from '../../data/mymensingh';
import { db } from '../../lib/firebase';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import WeatherCard from '../../components/ui/WeatherCard';
import { 
  ArrowLeft, Users, Landmark, Map, Info, 
  Phone, Globe, Mail, FileText, Camera, ArrowRight,
  ShieldCheck, ExternalLink, Calendar, MapPin, Activity, Flame
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function UpazilaPortal() {
  const { id } = useParams();
  const upazila = UPAZILAS.find(u => u.id === id);
  const [notices, setNotices] = useState<any[]>([]);
  const [complaintStats, setComplaintStats] = useState({
    total: 0,
    resolved: 0,
    pending: 0,
    inProgress: 0
  });

  const currentMonthName = new Intl.DateTimeFormat('bn-BD', { month: 'long' }).format(new Date());

  useEffect(() => {
    if (upazila) {
      const fetchStats = async () => {
        try {
          const now = new Date();
          const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
          
          const q = query(
            collection(db, 'complaints'),
            where('upazilaId', '==', upazila.id),
            where('createdAt', '>=', startOfMonth)
          );
          
          const snapshot = await getDocs(q);
          const docs = snapshot.docs.map(doc => doc.data());
          
          setComplaintStats({
            total: docs.length,
            resolved: docs.filter(d => d.status === 'Resolved' || d.status === 'Completed').length,
            pending: docs.filter(d => d.status === 'Pending').length,
            inProgress: docs.filter(d => d.status === 'In Progress' || d.status === 'Processing').length
          });
        } catch (error) {
          console.error("Error fetching complaint stats:", error);
        }
      };

      const fetchNotices = async () => {
        try {
          const q = query(
            collection(db, 'notices'), 
            where('upazila', 'in', [upazila.id, 'all']),
            orderBy('createdAt', 'desc')
          );
          const snapshot = await getDocs(q);
          setNotices(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        } catch (error) {
          console.error("Error fetching notices:", error);
        }
      };
      fetchStats();
      fetchNotices();
    }
  }, [upazila]);

  if (!upazila) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-10 p-10 bg-bg-light">
        <div className="w-24 h-24 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center shadow-inner">
          <Info className="w-12 h-12" />
        </div>
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">দুঃখিত, উপজেলাটি পাওয়া যায়নি।</h2>
          <p className="text-slate-500 font-medium">আপনার অনুরোধকৃত তথ্য বর্তমানে সিস্টেমে পাওয়া যাচ্ছে না।</p>
        </div>
        <Link to="/upazilas" className="btn-gold px-10 py-5 rounded-full flex items-center gap-3">
          <ArrowLeft className="w-5 h-5" /> সকল উপজেলা দেখুন
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-bg-light min-h-screen">
      {/* New Immersive Hero Header */}
      <section className="relative pt-32 pb-24 flex items-center min-h-[95vh] bg-gradient-to-br from-green-800 to-green-950 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '48px 48px' }} />
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <img 
            src="input_file_0.png" 
            alt={upazila.name}
            className="w-full h-full object-cover opacity-[0.08] mix-blend-overlay"
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 max-w-3xl"
          >
            <Link to="/upazilas" className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors text-sm font-medium mb-4">
              <ArrowLeft className="w-4 h-4" /> ময়মনসিংহ জেলা পোর্টালে ফিরুন
            </Link>
            
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md">
                 <span className="text-accent text-lg leading-none">✨</span>
                 <span className="text-white text-[13px] md:text-sm font-medium">উপজেলা নাগরিক পোর্টাল · {upazila.name}</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight tracking-tight drop-shadow-sm">
                {upazila.name} উপজেলা
              </h1>
              
              <p className="text-2xl md:text-3xl text-white/95 font-medium mt-6">
                ময়মনসিংহ জেলার প্রাণকেন্দ্র
              </p>
              
              <p className="text-base md:text-lg text-white/70 font-medium mb-10">
                {upazila.name} · ময়মনসিংহ জেলা, ময়মনসিংহ বিভাগ
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/grievance" className="px-6 py-3.5 bg-[#1f6343] text-white rounded-2xl font-bold text-sm transition-all flex items-center gap-3 shadow-lg hover:bg-[#184d34]">
                অভিযোগ জানান <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/volunteer-registration" className="px-6 py-3.5 bg-transparent border border-white/30 text-white rounded-2xl font-bold text-sm transition-all hover:bg-white/10 shadow-lg text-center">
                ভলান্টিয়ার যুক্ত হন
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-12 w-full max-w-2xl">
              {[
                { icon: Map, label: 'আয়তন', value: upazila.area },
                { icon: Users, label: 'জনসংখ্যা', value: upazila.population },
                { icon: Landmark, label: 'ইউনিয়ন', value: `${upazila.unions}টি` },
                { icon: Calendar, label: 'প্রতিষ্ঠা', value: '১৯৮২' }
              ].map((stat, i) => (
                <div key={i} className="p-4 md:p-5 rounded-3xl bg-[#1e5f3f]/40 backdrop-blur-md border border-white/10 flex flex-col gap-2 hover:bg-[#1e5f3f]/60 transition-all duration-300">
                  <stat.icon className="w-5 h-5 text-[#ffda7c]" />
                  <div className="space-y-0.5 mt-1">
                    <p className="text-xl md:text-2xl font-bold text-white tracking-tight">{stat.value}</p>
                    <p className="text-[11px] md:text-xs text-white/70 font-medium">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      
      <div className="max-w-7xl mx-auto px-6 py-32">
        <div className="mb-10">
          <WeatherCard city={upazila.nameEn} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-24">
          <div className="lg:col-span-2 space-y-32">
            {/* Content & History Section */}
            <div className="space-y-12 md:space-y-16">
              <section className="bg-white p-8 md:px-12 md:py-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-50/80 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 -mr-40 -mt-40 blur-[100px] pointer-events-none" />
                <div className="space-y-6 relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/5 flex items-center justify-center text-primary shadow-sm border border-primary/10">
                      <Info className="w-5 h-5" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-semibold text-[#2D3436] tracking-tight leading-none">উপজেলা পরিচিতি</h2>
                  </div>
                  <div className="md:px-2">
                    <p className="text-[#4b5563] leading-[1.8] text-base md:text-lg font-normal text-justify md:text-left mb-8">
                      {upazila.description} ময়মনসিংহের এই জনপদ প্রাচীন ইতিহাস এবং আধুনিক অর্থনীতির এক অপূর্ব মেলবন্ধন। এখানকার মাটি ও মানুষ যেমন অতিথিপরায়ণ, তেমনই আমাদের ঐতিহ্যবাহী স্থাপত্য শিল্পসমূহ আমাদের জেলাকে করেছে আরও সমৃদ্ধ।
                    </p>

                    {/* Emergency Helplines - Slim Rectangular Design */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 border-t border-slate-100 pt-8">
                      {[
                        { number: '৯৯৯', label: 'পুলিশ/ফায়ার', color: 'bg-red-500' },
                        { number: '৩৩৩', label: 'সরকারি তথ্য', color: 'bg-blue-600' },
                        { number: '১০৯', label: 'নারী সহায়তা', color: 'bg-purple-600' },
                        { number: '৩৩১', label: 'দুর্যোগ সেবা', color: 'bg-orange-500' }
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl group hover:border-accent/40 hover:bg-white hover:shadow-lg hover:shadow-black/5 transition-all cursor-default">
                          <div className="flex flex-col">
                            <span className="text-[10px] text-slate-400 font-bold uppercase leading-none mb-1">{item.label}</span>
                            <span className="text-2xl font-black text-slate-900 tracking-tight leading-none">{item.number}</span>
                          </div>
                          <div className={`w-8 h-8 rounded-full ${item.color} flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition-transform`}>
                            <Phone className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Monthly Complaint Statistics Section - Single Pro Card */}
              <section className="space-y-6">
                <div className="bg-white rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden">
                  <div className="bg-slate-50/80 px-8 py-5 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Activity className="w-5 h-5 text-accent" />
                      <h3 className="text-sm font-bold text-slate-700 tracking-wider uppercase">{currentMonthName} মাসের অভিযোগ চিত্র</h3>
                    </div>
                    <Link to="/grievance" className="text-[10px] font-black text-accent hover:text-primary transition-colors uppercase tracking-[0.2em]">বিস্তারিত পোর্টাল</Link>
                  </div>
                  
                  <div className="p-8 md:p-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x-0 md:divide-x divide-slate-100 text-center md:text-left">
                      {[
                        { label: 'মোট অভিযোগ', value: complaintStats.total, color: 'text-slate-900' },
                        { label: 'সমাধানকৃত', value: complaintStats.resolved, color: 'text-emerald-600' },
                        { label: 'পেন্ডিং', value: complaintStats.pending, color: 'text-rose-500' },
                        { label: 'প্রক্রিয়াধীন', value: complaintStats.inProgress, color: 'text-blue-600' }
                      ].map((stat, i) => (
                        <div key={i} className="flex flex-col md:px-8 first:pl-0 last:pr-0">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">{stat.label}</span>
                          <span className={`text-4xl md:text-5xl font-black ${stat.color} tracking-tighter tabular-nums leading-none`}>
                            {stat.value.toLocaleString('bn-BD')}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-[10px] text-slate-400 font-medium px-4 text-center md:text-left">
                  * প্রয়োজনীয় সক্ষমতা ও কর্মকর্তাগণের দৈনন্দিন কাজের ফলে একটু দেরি হলেও আপনি আপডেট পাবেন।
                </p>
              </section>

              {/* Volunteer CTA section */}
              <section className="py-4">
                <Link 
                  to="/volunteer-registration" 
                  className="group relative overflow-hidden bg-gradient-to-r from-green-800 to-green-900 p-8 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl shadow-green-900/20 border border-white/10 hover:scale-[1.01] transition-all duration-500"
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 -mr-32 -mt-32 rounded-full blur-3xl pointer-events-none" />
                  <div className="relative z-10 flex flex-col items-center md:items-start gap-2">
                    <div className="flex items-center gap-2 text-amber-400">
                      <ShieldCheck className="w-4 h-4" />
                      <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] italic">Good Citizens build Good Governance</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight text-center md:text-left">
                      {upazila.name} উপজেলা হতে নাগরিক বাংলাদেশ এর অংশ হতে ক্লিক করুন
                    </h3>
                  </div>
                  <div className="relative z-10 bg-white/10 backdrop-blur-md px-6 py-3 rounded-xl border border-white/20 text-white font-bold text-sm flex items-center gap-2 group-hover:bg-white group-hover:text-green-900 transition-all duration-500 shrink-0">
                    ভলান্টিয়ার হতে চাই <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </section>

              <section className="space-y-6 md:space-y-8">
                <div className="flex items-center gap-4">
                  <div className="h-0.5 w-8 bg-accent" />
                  <h3 className="text-sm font-semibold text-slate-500 tracking-[0.2em] uppercase">প্রধান আকর্ষণ ও ঐতিহ্য</h3>
                </div>
                <div className="bg-white border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-hidden">
                  <div className="divide-y divide-slate-50">
                    {upazila.highlights.map((h, i) => (
                      <div 
                        key={i} 
                        className="flex items-center gap-4 px-6 md:px-8 py-4 md:py-5 hover:bg-slate-50/50 transition-colors group"
                      >
                        <div className="w-8 h-8 bg-slate-50 flex items-center justify-center font-medium text-slate-400 text-xs shadow-sm border border-slate-100/50 group-hover:bg-accent/10 group-hover:text-primary transition-all">
                          {(i + 1).toString().padStart(2, '0')}
                        </div>
                        <span className="font-medium text-base md:text-lg text-[#2D3436] tracking-tight">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>

            {/* Services Grid Section */}
            <section className="space-y-8 mt-12 md:mt-16">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <h3 className="text-xl md:text-2xl font-semibold text-slate-800 tracking-tight">২৪টি সেবা পাওয়া গেছে</h3>
                <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
                  {['সব', 'নাগরিক', 'ভূমি', 'স্বাস্থ্য', 'কৃষি'].map((tab, i) => (
                    <button key={i} className={`px-5 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors ${i === 0 ? 'bg-[#1f6343] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                {[
                  { title: 'NID নতুন আবেদন', desc: 'জাতীয় পরিচয়পত্রের জন্য অনলাইন নতুন আবেদন।', cat: 'নাগরিক', icon: ShieldCheck, to: '#' },
                  { title: 'NID সংশোধন', desc: 'নাম, জন্মতারিখ বা ঠিকানা সংশোধন।', cat: 'নাগরিক', icon: FileText, to: '#' },
                  { title: 'জন্ম নিবন্ধন', desc: 'নতুন জন্ম সনদ আবেদন ও ডাউনলোড।', cat: 'নাগরিক', icon: FileText, to: '#' },
                  { title: 'ওয়ারিশ সনদ', desc: 'ওয়ারিশ সনদের জন্য আবেদন প্রক্রিয়া।', cat: 'নাগরিক', icon: Users, to: '#' },
                  { title: 'ই-নামজারি', desc: 'অনলাইনে জমির নামজারির আবেদন।', cat: 'ভূমি', icon: Landmark, to: '#' },
                  { title: 'পাসপোর্ট আবেদন', desc: 'ই-পাসপোর্ট এর জন্য নতুন আবেদন।', cat: 'নাগরিক', icon: Globe, to: '#' },
                  { title: 'কৃষি সেবা', desc: 'কৃষকদের জন্য বিভিন্ন প্রণোদনা ও তথ্য।', cat: 'কৃষি', icon: Map, to: '#' },
                  { title: 'টেলিমেডিসিন', desc: 'বিশেষজ্ঞ চিকিৎসকের পরামর্শ।', cat: 'স্বাস্থ্য', icon: Phone, to: '#' },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col p-5 bg-white border border-slate-100 shadow-[0_2px_15px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all group">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-[#185e3c] text-white flex items-center justify-center shrink-0 shadow-sm">
                          <item.icon className="w-6 h-6" strokeWidth={2.2} />
                        </div>
                        <h4 className="font-bold text-lg text-slate-900">{item.title}</h4>
                      </div>
                      <span className="px-3.5 py-1.5 bg-[#fef2e0] text-[#b07e15] text-[11px] font-bold uppercase tracking-wide">
                        {item.cat}
                      </span>
                    </div>
                    <p className="text-[#64748b] text-base md:text-lg mb-5 flex-grow leading-relaxed">
                      {item.desc}
                    </p>
                    <div className="pt-2">
                      <Link to={item.to} className="text-[#185e3c] font-bold text-sm hover:text-[#11472c] transition-colors flex items-center gap-1.5 w-max group/link">
                        আবেদন করুন <ArrowRight className="w-4 h-4 -rotate-45 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Notices Section */}
            <section className="space-y-6 mt-12 md:mt-16 pb-10">
              <div className="flex flex-col gap-2 mb-6">
                <span className="px-3 py-1 bg-red-50 text-red-600 text-[11px] font-bold w-max border border-red-100">
                  নোটিশ
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight leading-tight">
                  {upazila.name} নোটিশ ও<br/>ঘোষণা
                </h3>
              </div>

              <div className="space-y-4">
                {(notices.length > 0 ? notices : [
                  { id: 1, tag: "নাগরিক", date: "২২ এপ্রিল, ২০২৬", title: "ভোটার নিবন্ধন কর্মসূচি", desc: "নতুন ভোটার নিবন্ধন কার্যক্রম শুরু হয়েছে। নির্ধারিত কেন্দ্রে গিয়ে নিবন্ধন করুন।" },
                  { id: 2, tag: "কৃষি", date: "২০ এপ্রিল, ২০২৬", title: "কৃষি প্রণোদনা বিতরণ", desc: "ক্ষুদ্র ও প্রান্তিক কৃষকদের মাঝে বিনামূল্যে বীজ ও সার বিতরণ করা হবে।" },
                  { id: 3, tag: "স্বাস্থ্য", date: "১৮ এপ্রিল, ২০২৬", title: "টিকাদান কর্মসূচি", desc: "৫ বছরের কম বয়সী শিশুদের ভিটামিন এ ক্যাপসুল খাওয়ানো হবে উপজেলার সব কেন্দ্রে।" }
                ]).map((notice: any, i: number) => (
                  <div key={notice.id || i} className="p-5 md:p-6 bg-white border border-slate-100 shadow-[0_2px_15px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1.5 bg-[#eaf4ef] text-[#1f6343] text-[11px] font-bold border border-[#d5eadf]">
                        {notice.tag || notice.category || "সাধারণ"}
                      </span>
                      <span className="text-sm font-medium text-slate-500">{notice.date}</span>
                    </div>
                    <h4 className="font-bold text-lg text-slate-900 mb-1.5">{notice.title}</h4>
                    {(notice.desc || notice.description) && (
                      <p className="text-[#64748b] text-base md:text-lg leading-relaxed">
                        {notice.desc || notice.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Elegant Sidebar Section */}
          <div className="space-y-8 md:space-y-12">
            {/* Modern Contact Card */}
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-[#1f6343] text-white p-8 md:p-10 rounded-[1.5rem] shadow-xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-12 opacity-[0.03]">
                <Phone className="w-48 h-48 rotate-12" />
              </div>
              <div className="space-y-10 relative z-10">
                <div className="space-y-3">
                  <span className="text-[#ffda7c] text-[12px] font-bold uppercase tracking-wider">জরুরি যোগাযোগ</span>
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight leading-tight">জরুরি সেবা নাম্বার</h3>
                </div>
                <div className="space-y-6">
                  {/* Item 1 */}
                  <div className="flex gap-4 items-center group cursor-pointer">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0 border border-white/5 group-hover:bg-[#ffda7c] group-hover:text-[#1f6343] transition-all duration-300">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-xs text-white/70 font-medium">থানা (ওসি)</p>
                      <p className="font-bold text-lg md:text-xl tracking-wide group-hover:text-[#ffda7c] transition-colors">+৮৮০ ১৩২০-০০০০০০</p>
                    </div>
                  </div>
                  {/* Item 2 */}
                  <div className="flex gap-4 items-center group cursor-pointer">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0 border border-white/5 group-hover:bg-[#ffda7c] group-hover:text-[#1f6343] transition-all duration-300">
                      <Activity className="w-5 h-5" />
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-xs text-white/70 font-medium">উপজেলা স্বাস্থ্য কমপ্লেক্স</p>
                      <p className="font-bold text-lg md:text-xl tracking-wide group-hover:text-[#ffda7c] transition-colors">+৮৮০ ১৭১১-০০০০০০</p>
                    </div>
                  </div>
                  {/* Item 3 */}
                  <div className="flex gap-4 items-center group cursor-pointer">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0 border border-white/5 group-hover:bg-[#ffda7c] group-hover:text-[#1f6343] transition-all duration-300">
                      <Users className="w-5 h-5" />
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-xs text-white/70 font-medium">উপজেলা নির্বাহী অফিসার</p>
                      <p className="font-bold text-lg md:text-xl tracking-wide group-hover:text-[#ffda7c] transition-colors">+৮৮০ ১৭০৮-০০০০০০</p>
                    </div>
                  </div>
                  {/* Item 4 */}
                  <div className="flex gap-4 items-center group cursor-pointer">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0 border border-white/5 group-hover:bg-[#ffda7c] group-hover:text-[#1f6343] transition-all duration-300">
                      <Flame className="w-5 h-5" />
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-xs text-white/70 font-medium">ফায়ার সার্ভিস</p>
                      <p className="font-bold text-lg md:text-xl tracking-wide group-hover:text-[#ffda7c] transition-colors">০৯২১-৬০০০০</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}
