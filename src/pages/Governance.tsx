import React, { useState, useEffect } from 'react';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { motion } from 'motion/react';
import { BookOpen, Activity, FileText } from 'lucide-react';

export default function Governance() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'blog' | 'activity'>('all');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = query(collection(db, 'governance_posts'), orderBy('date', 'desc'));
        const snapshot = await getDocs(q);
        setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching governance posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const filteredPosts = activeTab === 'all' 
    ? posts 
    : posts.filter(post => post.type === activeTab);

  return (
    <div className="bg-background">
      <section className="relative min-h-[40vh] flex flex-col items-center justify-center pt-32 pb-20 px-6 bg-gradient-to-br from-green-800 to-green-950 overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '48px 48px' }} />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">সুশাসন ও নাগরিক অধিকার</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
            নাগরিকদের অধিকার সচেতনতা, আইনি সহায়তা এবং সুশাসন প্রতিষ্ঠায় আমাদের কার্যক্রম ও ব্লগসমূহ।
          </p>
        </div>
      </section>

      <div className="pt-16 pb-20 px-6 max-w-7xl mx-auto">

      <div className="flex justify-center gap-4 mb-10 overflow-x-auto pb-4 scrollbar-hide">
        <button 
          onClick={() => setActiveTab('all')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all ${activeTab === 'all' ? 'bg-[#1f6343] text-white shadow-md' : 'bg-white text-slate-600 border border-slate-100 hover:bg-slate-50'}`}
        >
          <BookOpen className="w-4 h-4" /> সর্বশেষ আপডেট
        </button>
        <button 
          onClick={() => setActiveTab('blog')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all ${activeTab === 'blog' ? 'bg-[#1f6343] text-white shadow-md' : 'bg-white text-slate-600 border border-slate-100 hover:bg-slate-50'}`}
        >
          <FileText className="w-4 h-4" /> ব্লগ
        </button>
        <button 
          onClick={() => setActiveTab('activity')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all ${activeTab === 'activity' ? 'bg-[#1f6343] text-white shadow-md' : 'bg-white text-slate-600 border border-slate-100 hover:bg-slate-50'}`}
        >
          <Activity className="w-4 h-4" /> কার্যক্রম
        </button>
      </div>

      {loading ? (
        <div className="text-center py-20 text-slate-400 font-medium">লোড হচ্ছে...</div>
      ) : filteredPosts.length === 0 ? (
        <div className="text-center py-20 text-slate-400 bg-slate-50 rounded-3xl border border-slate-100">কোনো তথ্য পাওয়া যায়নি।</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post, i) => (
            <motion.div 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-[0_2px_15px_rgb(0,0,0,0.03)] hover:shadow-xl transition-all group flex flex-col"
            >
              <div className="flex justify-between items-start mb-4">
                <span className={`px-3 py-1 text-[11px] font-bold uppercase tracking-widest rounded-full ${post.type === 'blog' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'}`}>
                  {post.type === 'blog' ? 'ব্লগ' : 'কার্যক্রম'}
                </span>
                <span className="text-slate-400 text-[11px] font-bold tracking-widest uppercase">{post.date}</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-primary transition-colors line-clamp-2">{post.title}</h2>
              <p className="text-slate-600 mb-8 line-clamp-4 leading-relaxed flex-grow">{post.content}</p>
              <button className="text-primary font-bold hover:text-primary/80 transition-colors uppercase text-sm tracking-widest flex items-center gap-2 mt-auto">
                বিস্তারিত পড়ুন
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  </div>
);
}
