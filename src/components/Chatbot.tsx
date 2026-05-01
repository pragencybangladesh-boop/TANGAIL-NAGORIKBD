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
        className="relative group bg-white shadow-2xl hover:scale-105 transition-all duration-300 ring-4 ring-slate-100/50 flex items-center justify-center w-16 h-16 rounded-2xl"
      >
        <div className="w-full h-full bg-primary text-white rounded-2xl flex items-center justify-center overflow-hidden border border-white/10 shadow-inner">
          <Bot className="w-8 h-8" strokeWidth={1.5} />
        </div>
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 border-4 border-white rounded-full animate-pulse" />
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
                <div className="w-10 h-10 bg-white/10 rounded-2xl flex items-center justify-center p-2 backdrop-blur-sm">
                  <MessageCircle className="w-5 h-5 text-accent" />
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
