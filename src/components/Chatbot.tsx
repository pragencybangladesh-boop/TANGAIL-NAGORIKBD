import { useState, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getAIResponse } from '../lib/gemini';
import { collection, addDoc, serverTimestamp, query, where, orderBy, getDocs, limit } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
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

  const [hasLoadedHistory, setHasLoadedHistory] = useState(false);

  useEffect(() => {
    const loadHistory = async () => {
      if (isOpen && user && !hasLoadedHistory) {
        try {
          const q = query(
            collection(db, 'aiQueries'),
            where('uid', '==', user.uid),
            limit(50)
          );
          const querySnapshot = await getDocs(q);
          const historyRaw: any[] = [];
          
          querySnapshot.forEach((doc) => {
            historyRaw.push(doc.data());
          });
          
          // Sort locally to avoid needing a composite index
          historyRaw.sort((a, b) => {
            const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
            const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
            return timeA - timeB;
          });
          
          const history: { text: string, sender: 'user' | 'bot' }[] = [];
          historyRaw.forEach((data) => {
            if (data.query && data.response) {
              history.push({ text: data.query, sender: 'user' });
              history.push({ text: data.response, sender: 'bot' });
            }
          });

          if (history.length > 0) {
            setChat([{ text: 'স্বাগতম Nagorik Ai ইকো সিস্টেমে।  কিভাবে আপনাকে সহযোগিতা করতে পারি?', sender: 'bot' }, ...history]);
          }
          setHasLoadedHistory(true);
        } catch (error) {
          console.error("Error loading chat history:", error);
          // Don't show error to user for history load failure
        }
      }
    };
    loadHistory();
  }, [isOpen, user, hasLoadedHistory]);

  const handleSend = async () => {
    if (!message.trim() || isLoading) return;
    
    const userMessage = message.trim();
    setChat(prev => [...prev, { text: userMessage, sender: 'user' }]);
    setMessage('');
    setIsLoading(true);
    
    try {
      const response = await getAIResponse(userMessage, "You are a helpful assistant for Nagorik BD portal. Provide concise information about Sylhet district, government services, and citizen support.");
      setChat(prev => [...prev, { text: response, sender: 'bot' }]);

      // Log to Firestore
      try {
        await addDoc(collection(db, 'aiQueries'), {
          query: userMessage,
          response: response,
          createdAt: serverTimestamp(),
          userName: user?.displayName || 'Anonymous',
          email: user?.email || 'N/A',
          uid: user?.uid || 'anonymous',
          source: 'floating_chatbot'
        });
      } catch (logError) {
        console.error("Error logging AI query from chatbot:", logError);
        handleFirestoreError(logError, OperationType.CREATE, 'aiQueries');
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
        className="relative group shadow-2xl hover:scale-105 transition-all duration-300 ring-4 ring-white/10 flex items-center justify-center w-16 h-16 rounded-2xl overflow-hidden bg-primary"
      >
        <div className="w-full h-full flex items-center justify-center text-white drop-shadow-[0_0_8px_rgba(13,148,136,0.8)]">
          <Bot size={32} />
        </div>
        <div className="absolute top-1 right-1 w-3 h-3 bg-accent border-2 border-primary rounded-full animate-pulse shadow-[0_0_8px_rgba(13,148,136,0.8)]" />
      </button>

      <AnimatePresence>
        {isOpen && (
            <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className="fixed inset-0 m-auto z-[100] w-[90vw] h-[90vh] max-w-[380px] max-h-[600px] bg-card rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden border border-border flex flex-col"
          >
            {/* Header */}
            <div className="bg-primary p-6 text-white flex justify-between items-center shrink-0 border-b border-border">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center p-1.5 shadow-sm text-white backdrop-blur-sm border border-white/20">
                  <Bot size={24} />
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
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5 bg-background">
              {chat.map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] px-5 py-3 rounded-2xl text-sm font-medium leading-relaxed ${
                    msg.sender === 'user' 
                      ? 'bg-accent text-white rounded-br-none shadow-md shadow-accent/20' 
                      : 'bg-card text-body shadow-sm border border-border rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-card px-5 py-3 rounded-2xl text-xs text-slate-400 italic shadow-sm border border-border rounded-tl-none flex items-center gap-2">
                    <Loader2 className="w-3 h-3 text-accent animate-spin" />
                    <span>উত্তর তৈরি হচ্ছে...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 bg-card border-t border-border shrink-0">
              <div className="flex items-center gap-2 bg-background px-4 py-2 rounded-full border border-border focus-within:border-accent/50 focus-within:ring-1 focus-within:ring-accent/50 transition-all">
                <input 
                  type="text" 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="আপনার জিজ্ঞাসা এখানে লিখুন..."
                  className="flex-grow bg-transparent border-none px-1 py-1 text-sm text-body outline-none placeholder:text-slate-500"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading || !message.trim()}
                  className="bg-accent text-white w-9 h-9 rounded-full flex items-center justify-center hover:brightness-110 transition-all shadow-md shadow-accent/30 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
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
