import React, { useState, useEffect } from 'react';
import { collection, query, getDocs, orderBy, addDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Activity, FileText, CheckCircle2, AlertTriangle, XCircle, Send, X } from 'lucide-react';
import { toast } from 'react-hot-toast';

type TabType = 'all' | 'সত্য' | 'মিথ্যা' | 'বিভ্রান্তিকর';

export default function Governance() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [claimData, setClaimData] = useState({ claim: '', source: '', email: '' });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = query(collection(db, 'governance_posts'), orderBy('date', 'desc'));
        const snapshot = await getDocs(q);
        setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        handleFirestoreError(error, OperationType.GET, 'governance_posts');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleSubmitClaim = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!claimData.claim.trim()) return toast.error('দয়া করে আপনার দাবিটি লিখুন');
    
    setSubmitting(true);
    try {
      await addDoc(collection(db, 'fact_check_claims'), {
        ...claimData,
        status: 'pending',
        createdAt: new Date().toISOString()
      });
      toast.success('আপনার দাবিটি জমা দেওয়া হয়েছে। আমরা দ্রুত এটি যাচাই করব।');
      setIsModalOpen(false);
      setClaimData({ claim: '', source: '', email: '' });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'fact_check_claims');
      toast.error('দুঃখিত, তথ্য জমা দেওয়া সম্ভব হয়নি।');
    } finally {
      setSubmitting(false);
    }
  };

  const filteredPosts = activeTab === 'all' 
    ? posts 
    : posts.filter(post => post.verdict === activeTab);

  const getVerdictIcon = (verdict: string) => {
    switch (verdict) {
      case 'সত্য': return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      case 'মিথ্যা': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'বিভ্রান্তিকর': return <AlertTriangle className="w-4 h-4 text-orange-500" />;
      default: return null;
    }
  };

  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case 'সত্য': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'মিথ্যা': return 'bg-red-50 text-red-600 border-red-100';
      case 'বিভ্রান্তিকর': return 'bg-orange-50 text-orange-600 border-orange-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  const getCardStyle = (verdict: string) => {
    switch (verdict) {
      case 'সত্য': return 'border-emerald-200 shadow-emerald-900/5 bg-emerald-50/30';
      case 'মিথ্যা': return 'border-red-200 shadow-red-900/5 bg-red-50/30';
      case 'বিভ্রান্তিকর': return 'border-orange-200 shadow-orange-900/5 bg-orange-50/30';
      default: return 'border-slate-100 shadow-[0_4px_25px_rgb(0,0,0,0.03)] bg-white';
    }
  };

  return (
    <div className="bg-background min-h-screen">
      <section className="relative min-h-[45vh] flex flex-col items-center justify-center pt-32 pb-20 px-6 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '48px 48px' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold tracking-widest uppercase"
          >
            <CheckCircle2 className="w-4 h-4 text-primary" /> Fact Checking Service
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white tracking-tight"
          >
            সত্য জানুন
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed font-medium"
          >
            অফওয়াহ এবং ভুল তথ্যের ভিড়ে সঠিক খবর যাচাই করুন। আমরা আমাদের তথ্য প্রযুক্তির মাধ্যমে জনস্বার্থে সঠিক তথ্য প্রকাশ করি।
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-primary text-white font-black px-10 py-5 rounded-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3 mx-auto text-lg group"
            >
              তথ্য যাচাইয়ের আবেদন করুন 
              <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      <div className="pt-16 pb-24 px-6 max-w-7xl mx-auto">
        <div className="flex justify-center gap-3 mb-12 overflow-x-auto pb-4 scrollbar-hide">
          {[
            { id: 'all', label: 'সকল', icon: <BookOpen className="w-4 h-4" /> },
            { id: 'সত্য', label: 'সত্য', icon: <CheckCircle2 className="w-4 h-4" /> },
            { id: 'মিথ্যা', label: 'মিথ্যা', icon: <XCircle className="w-4 h-4" /> },
            { id: 'বিভ্রান্তিকর', label: 'বিভ্রান্তিকর', icon: <AlertTriangle className="w-4 h-4" /> }
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black transition-all ${activeTab === tab.id ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-105' : 'bg-white text-slate-500 border border-slate-100 hover:bg-slate-50'}`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <div className="text-slate-400 font-bold tracking-widest uppercase text-xs">অপেক্ষা করুন...</div>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-32 text-slate-400 bg-slate-50 rounded-[3rem] border border-slate-100 italic font-medium">কোনো তথ্য পাওয়া যায়নি।</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, i) => (
              <motion.div 
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`rounded-[2rem] p-6 border hover:shadow-2xl transition-all group flex flex-col relative overflow-hidden ${getCardStyle(post.verdict)}`}
              >
                <div className="flex justify-between items-center mb-6">
                  <span className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-full ${
                    post.type === 'fact-check' ? 'bg-amber-50 text-amber-600' :
                    post.type === 'blog' ? 'bg-blue-50 text-blue-600' : 
                    'bg-emerald-50 text-emerald-600'
                  }`}>
                    {post.type === 'fact-check' ? 'ফ্যাক্ট চেক' : post.type === 'blog' ? 'ব্লগ' : 'কার্যক্রম'}
                  </span>
                  <span className="text-slate-300 text-[10px] font-black tracking-widest uppercase">{post.date}</span>
                </div>

                {post.type === 'fact-check' && post.verdict && (
                  <div className={`mb-4 flex items-center gap-2 px-4 py-2 rounded-xl border border-dashed font-black text-sm ${getVerdictColor(post.verdict)}`}>
                    {getVerdictIcon(post.verdict)}
                    সিদ্ধান্ত: {post.verdict}
                  </div>
                )}

                <h2 className="text-base font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors leading-tight line-clamp-2">{post.title}</h2>
                <p className="text-slate-600 mb-4 text-xs line-clamp-4 leading-relaxed font-medium flex-grow">{post.content}</p>
                
                <button className="w-full py-2.5 rounded-xl bg-white/50 text-slate-900 font-bold hover:bg-primary hover:text-white border border-slate-200 transition-all uppercase text-[10px] tracking-[0.2em] flex items-center justify-center gap-2 overflow-hidden relative">
                  <span className="relative z-10">বিস্তারিত পড়ুন</span>
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Claim Submission Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-xl bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl overflow-hidden"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-8 right-8 p-2 rounded-full bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="text-center mb-10">
                <div className="w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <Send className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-3xl font-black text-slate-900 mb-2">তথ্য যাচাইয়ের আবেদন</h2>
                <p className="text-slate-500 font-medium">কোনো খবর বা তথ্য নিয়ে সন্দেহ থাকলে নিচে বিস্তারিত লিখুন।</p>
              </div>

              <form onSubmit={handleSubmitClaim} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-black text-slate-900 tracking-wide uppercase">আপনার সন্দেহজনক দাবি বা খবরটি কি? *</label>
                  <textarea 
                    required
                    value={claimData.claim}
                    onChange={(e) => setClaimData({...claimData, claim: e.target.value})}
                    placeholder="খবর বা তথ্যটি বিস্তারিত লিখুন..."
                    className="w-full px-6 py-4 rounded-[1.5rem] bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 min-h-[120px] transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-black text-slate-900 tracking-wide uppercase">তথ্যের উৎস (যদি থাকে)</label>
                  <input 
                    type="text"
                    value={claimData.source}
                    onChange={(e) => setClaimData({...claimData, source: e.target.value})}
                    placeholder="লিঙ্ক বা অ্যাপের নাম..."
                    className="w-full px-6 py-4 rounded-[1.5rem] bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-black text-slate-900 tracking-wide uppercase">আপনার ইমেইল (ঐচ্ছিক)</label>
                  <input 
                    type="email"
                    value={claimData.email}
                    onChange={(e) => setClaimData({...claimData, email: e.target.value})}
                    placeholder="ফলাফল পাওয়ার জন্য..."
                    className="w-full px-6 py-4 rounded-[1.5rem] bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>

                <button 
                  disabled={submitting}
                  className="w-full py-5 bg-primary text-white font-black rounded-[1.5rem] shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-3 mt-4"
                >
                  {submitting ? 'জমা হচ্ছে...' : (
                    <>
                      জমা দিন <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
