import { useState } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ChatbotProps {
  iconUrl?: string; // Made optional
}

export default function Chatbot({ iconUrl }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState<{ text: string, sender: 'user' | 'bot' }[]>([
    { text: 'স্বাগতম! আমি টাঙ্গাইল জেলা নাগরিক সহায়ক। আমি আপনাকে কিভাবে সাহায্য করতে পারি?', sender: 'bot' }
  ]);

  const handleSend = () => {
    if (!message.trim()) return;
    setChat([...chat, { text: message, sender: 'user' }]);
    setMessage('');
    
    // Simple AI Response simulation
    setTimeout(() => {
      setChat(prev => [...prev, { 
        text: 'আপনার বার্তার জন্য ধন্যবাদ। আমি আপনার জিজ্ঞাসার উত্তর দিতে তথ্য সংগ্রহ করছি। আপনি কি কোনো নির্দিষ্ট উপজেলা সম্পর্কে জানতে চান?', 
        sender: 'bot' 
      }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative group bg-white p-2 rounded-full shadow-2xl hover:scale-110 transition-all duration-500 ring-4 ring-slate-100 flex items-center justify-center"
      >
        <div className="w-14 h-14 bg-[#1f6343] text-white rounded-full flex items-center justify-center overflow-hidden border border-slate-100 shadow-inner">
          <Bot className="w-8 h-8" strokeWidth={2} />
        </div>
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 border-4 border-white rounded-full animate-pulse" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="absolute bottom-24 right-0 w-[90vw] max-w-[380px] bg-white rounded-[3rem] shadow-[-20px_40px_80px_rgba(0,0,0,0.1)] overflow-hidden border border-slate-100"
          >
            {/* Header */}
            <div className="bg-primary p-8 text-white flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center p-2">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-black text-lg leading-none tracking-tight">Nagorik AI</h4>
                  <p className="text-[10px] text-accent font-bold uppercase tracking-widest mt-1">Jamalpur DPI Assistant</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="bg-white/10 hover:bg-white/20 p-2 rounded-xl transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="h-[400px] overflow-y-auto p-8 space-y-6 bg-slate-50/50">
              {chat.map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-5 rounded-[2rem] text-sm font-bold leading-relaxed ${
                    msg.sender === 'user' 
                      ? 'bg-primary text-white rounded-tr-none shadow-xl shadow-primary/20' 
                      : 'bg-white text-slate-800 shadow-sm border border-slate-100 rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-6 pb-8 bg-white border-t border-slate-50">
              <div className="flex gap-3 bg-slate-100 p-2 rounded-2xl">
                <input 
                  type="text" 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="আপনার জিজ্ঞাসা এখানে লিখুন..."
                  className="flex-grow bg-transparent border-none px-4 py-3 text-sm font-bold text-slate-700 outline-none placeholder:text-slate-400"
                />
                <button 
                  onClick={handleSend}
                  className="bg-primary text-white w-12 h-12 rounded-xl flex items-center justify-center hover:bg-slate-900 transition-all shadow-lg active:scale-95"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
