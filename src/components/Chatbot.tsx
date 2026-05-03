import { useState } from 'react';
import { MessageCircle, X, Send, Bot, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getAIResponse } from '../lib/gemini';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';
import Logo from './Logo';

interface ChatbotProps {
  iconUrl?: string; // Made optional
}

export default function Chatbot() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chat, setChat] = useState<{ text: string, sender: 'user' | 'bot' }[]>([
    { text: 'স্বাগতম Nagorik Ai ইকো সিস্টেমে।  কিভাবে আপনাকে সহযোগিতা করতে পারি?', sender: 'bot' }
  ]);

  const handleSend = async () => {
    if (!message.trim() || isLoading) return;
    
    const userMessage = message.trim();
    setChat(prev => [...prev, { text: userMessage, sender: 'user' }]);
    setMessage('');
    setIsLoading(true);
    
    try {
      const response = await getAIResponse(userMessage, "You are a helpful assistant for Nagorik BD portal. Provide concise information about Mymensingh division, government services, and citizen support.");
      setChat(prev => [...prev, { text: response, sender: 'bot' }]);

      // Log to Firestore
      try {
        await addDoc(collection(db, 'aiQueries'), {
          query: userMessage,
          response: response,
          createdAt: serverTimestamp(),
          userName: user?.displayName || 'Anonymous',
          email: user?.email || 'N/A',
          source: 'floating_chatbot'
        });
      } catch (logError) {
        console.error("Error logging AI query from chatbot:", logError);
      }
    } catch (error) {
      console.error(error);
      setChat(prev => [...prev, { text: 'দুঃখিত, আমি এই মুহূর্তে উত্তর দিতে পারছি না।', sender: 'bot' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative group bg-white shadow-2xl hover:scale-105 transition-all duration-300 ring-4 ring-slate-100/50 flex items-center justify-center w-16 h-16 rounded-2xl overflow-hidden"
      >
        <div className="w-full h-full bg-white flex items-center justify-center p-2">
          <Logo showText={false} size={40} />
        </div>
        <div className="absolute top-1 right-1 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full animate-pulse" />
      </button>

      <AnimatePresence>
        {isOpen && (
            <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className="fixed inset-0 m-auto z-[100] w-[90vw] h-[90vh] max-w-[380px] max-h-[600px] bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden border border-slate-100"
          >
            {/* Header */}
            <div className="bg-primary p-6 text-white flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center p-1.5 shadow-sm">
                  <Logo showText={false} size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-lg tracking-tight text-white">Nagorik AI</h4>
                  <p className="text-[11px] text-white/70 font-medium tracking-wide mt-0.5">আপনার ব্যক্তিগত ডিজিটাল সহকারী</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="h-[350px] overflow-y-auto p-6 space-y-5 bg-slate-50/50">
              {chat.map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] px-5 py-3 rounded-2xl text-sm font-medium leading-relaxed ${
                    msg.sender === 'user' 
                      ? 'bg-primary text-white rounded-br-none' 
                      : 'bg-white text-slate-800 shadow-sm border border-slate-100 rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white px-5 py-3 rounded-2xl text-xs text-slate-400 italic shadow-sm border border-slate-100 rounded-tl-none flex items-center gap-2">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    <span>উত্তর তৈরি হচ্ছে...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-slate-100">
              <div className="flex items-center gap-2 bg-slate-100/80 px-4 py-2 rounded-full border border-slate-200">
                <input 
                  type="text" 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="আপনার জিজ্ঞাসা এখানে লিখুন..."
                  className="flex-grow bg-transparent border-none px-1 py-1 text-sm text-slate-700 outline-none placeholder:text-slate-400"
                />
                <button 
                  onClick={handleSend}
                  className="bg-primary text-white w-9 h-9 rounded-full flex items-center justify-center hover:bg-slate-900 transition-all shadow-md active:scale-95"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
