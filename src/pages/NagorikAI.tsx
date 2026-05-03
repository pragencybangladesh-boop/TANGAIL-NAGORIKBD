import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, Send, User, Trash2, Loader2, Sparkles, Clock } from 'lucide-react';
import { getAIResponse } from '../lib/gemini';
import { useAuth } from '../context/AuthContext';
import { collection, addDoc, serverTimestamp, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import Logo from '../components/Logo';

interface Message {
  role: 'user' | 'ai';
  content: string;
}

export default function NagorikAI() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', content: 'স্বাগতম Nagorik Ai ইকো সিস্টেমে। কিভাবে আপনাকে সহযোগিতা করতে পারি?' }
  ]);
  const [recentLogs, setRecentLogs] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    fetchRecentLogs();
  }, []);

  const fetchRecentLogs = async () => {
    try {
      const q = query(collection(db, 'aiQueries'), orderBy('createdAt', 'desc'), limit(10));
      const snapshot = await getDocs(q);
      setRecentLogs(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await getAIResponse(userMessage, "You are a helpful assistant for Nagorik BD portal. Provide information about Mymensingh division, government services, and citizen support.");
      setMessages(prev => [...prev, { role: 'ai', content: response }]);
      
      // Log to Firestore
      try {
        await addDoc(collection(db, 'aiQueries'), {
          query: userMessage,
          response: response,
          createdAt: serverTimestamp(),
          userName: user?.displayName || 'Anonymous',
          email: user?.email || 'N/A'
        });
        fetchRecentLogs(); // Refresh logs
      } catch (logError) {
        console.error("Error logging AI query:", logError);
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'ai', content: 'দুঃখিত, আমি উত্তর দিতে পারছি না।' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-32 px-4">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Chat Interface */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden flex flex-col h-[700px]">
          {/* Header */}
          <div className="bg-primary p-6 text-white flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm p-2">
                <Logo showText={false} size={32} />
              </div>
              <div>
                <h2 className="text-xl font-bold">নাগরিক AI</h2>
                <p className="text-sm text-white/70">আপনার স্মার্ট সেবা সহকারী</p>
              </div>
            </div>
            <button 
              onClick={() => setMessages([{ role: 'ai', content: 'স্বাগতম Nagorik Ai ইকো সিস্টেমে। কিভাবে আপনাকে সহযোগিতা করতে পারি?' }])}
              className="p-2 hover:bg-white/10 rounded-xl transition-colors"
              title="চ্যাট মুছুন"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <AnimatePresence initial={false}>
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-3 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 overflow-hidden ${
                      msg.role === 'user' ? 'bg-primary/10 text-primary' : 'bg-white p-1.5 border border-slate-100'
                    }`}>
                      {msg.role === 'user' ? <User className="w-5 h-5" /> : (
                        <Logo showText={false} size={24} />
                      )}
                    </div>
                    <div className={`p-4 rounded-3xl text-sm leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-primary text-white rounded-tr-none' 
                        : 'bg-slate-100 text-slate-900 rounded-tl-none'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="flex gap-3 items-center text-slate-400 text-sm italic">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>উত্তর তৈরি হচ্ছে...</span>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Settings/Info Footer */}
          <div className="px-6 py-2 border-t border-slate-50 bg-slate-50/50 flex justify-center">
            <span className="text-[10px] text-slate-400 font-medium uppercase tracking-widest flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Powered by Gemini
            </span>
          </div>

          {/* Input */}
          <div className="p-6 border-t border-slate-100 bg-white">
            <div className="relative flex items-center bg-slate-100 rounded-2xl p-1 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="আপনার জিজ্ঞাসা এখানে লিখুন..."
                className="flex-1 bg-transparent border-none outline-none px-4 py-3 text-sm"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="bg-primary text-white p-3 rounded-xl hover:bg-primary-dark disabled:opacity-50 transition-all shadow-lg shadow-primary/20"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Global Activity Log */}
        <section className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-3">
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">নাগরিক জিজ্ঞাসা ও সমাধান</h3>
            </div>
            <div className="flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-widest">
              Live updates <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">ব্যবহারকারী</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">জিজ্ঞাসা</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">সময়</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {recentLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400">
                            <User className="w-4 h-4" />
                          </div>
                          <span className="text-xs font-bold text-slate-700">{log.userName || 'আজ্ঞাত'}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <p className="text-xs font-medium text-slate-600 line-clamp-1 max-w-sm">{log.query}</p>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-2 text-slate-400">
                          <Clock className="w-3 h-3" />
                          <span className="text-[10px] font-bold">
                            {log.createdAt?.toDate ? log.createdAt.toDate().toLocaleTimeString('bn-BD') : 'N/A'}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {recentLogs.length === 0 && (
                    <tr>
                      <td colSpan={3} className="px-8 py-20 text-center text-slate-400 italic text-sm">কোনো রেকর্ড পাওয়া যায়নি।</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="bg-slate-50 p-6 flex justify-center">
               <p className="text-[10px] font-bold text-slate-400 uppercase italic">
                 * কথোপকথন পর্যালোচনা করে উন্নত সেবা প্রদানের লক্ষে অ্যাডমিন প্যানেল থেকে তথ্য সংরক্ষণ বা ডিলিট করা হতে পারে
               </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
