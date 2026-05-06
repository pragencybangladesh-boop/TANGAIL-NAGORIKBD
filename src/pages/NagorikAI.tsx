import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, Send, User, Trash2, Loader2, Sparkles, Clock, ArrowRight, Globe, Mic, MicOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { collection, addDoc, serverTimestamp, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { getAIResponse } from '../lib/gemini';
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
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'bn-BD';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(prev => prev + transcript);
        setIsRecording(false);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    }
  }, []);

  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
    } else {
      if (!recognitionRef.current) {
        alert('আপনার ব্রাউজার ভয়েস ইনপুট সমর্থন করে না।');
        return;
      }
      try {
        recognitionRef.current.start();
        setIsRecording(true);
      } catch (err) {
        console.error('Failed to start recognition:', err);
      }
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await getAIResponse(userMessage);
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
      } catch (logError) {
        console.error("Error logging AI query:", logError);
        handleFirestoreError(logError, OperationType.CREATE, 'aiQueries');
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
      <div className="max-w-4xl mx-auto h-[75vh] min-h-[600px]">
        {/* Chat Interface */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 flex flex-col h-full">
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
              <Sparkles className="w-3 h-3" /> Powered by Nagorik Ai
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
                placeholder={isRecording ? "আলাপ শুনছি..." : "আপনার জিজ্ঞাসা এখানে লিখুন..."}
                className="flex-1 bg-transparent border-none outline-none px-4 py-3 text-sm"
              />
              <div className="flex items-center gap-1 mr-1">
                <button
                  onClick={toggleRecording}
                  title={isRecording ? "থামান" : "ভয়েস ইনপুট"}
                  className={`p-3 rounded-xl transition-all ${
                    isRecording 
                      ? 'bg-red-500 text-white animate-pulse' 
                      : 'bg-slate-200 text-slate-500 hover:bg-slate-300'
                  }`}
                >
                  {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="bg-primary text-white p-3 rounded-xl hover:bg-primary/90 disabled:opacity-50 transition-all shadow-lg shadow-primary/20"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
