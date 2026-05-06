import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Droplet, Search, MapPin, Phone, UserPlus } from 'lucide-react';
import { addDoc, collection } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';

const BLOOD_BANKS = [
  { name: 'সিলেট এম এ জি ওসমানী মেডিকেল কলেজ ব্লাড ব্যাংক', phone: '০১৭৩৩-৩৩৬৭৯০', address: 'সিলেট সদর' },
  { name: 'রেড ক্রিসেন্ট ব্লাড ব্যাংক, সিলেট', phone: '০১৭৩৩-০০০০০০', address: 'সিলেট সদর' },
];

export default function BloodBank() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [donorData, setDonorData] = useState({
    name: '',
    bloodGroup: '',
    address: '',
    phone: '',
    lastDonationDate: '',
  });

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'bloodDonors'), donorData);
      alert('রেজিস্ট্রেশন সফল হয়েছে!');
      setShowRegistrationForm(false);
      setDonorData({ name: '', bloodGroup: '', address: '', phone: '', lastDonationDate: '' });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'bloodDonors');
    }
  };

  return (
    <div className="pt-32 pb-32 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="bg-red-600 p-8 md:p-12 rounded-[2rem] text-center mb-16 shadow-lg relative overflow-hidden">
          <div className="relative z-10 space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">জেলা ব্লাড ব্যাংক</h1>
            <p className="text-white/90 text-lg font-medium max-w-xl mx-auto">জরুরি প্রয়োজনে সিলেট জেলার ব্লাড ব্যাংক ও ডোনারদের সাথে সরাসরি যোগাযোগ করুন।</p>
          </div>
          {/* Decor */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <Droplet className="absolute -top-20 -left-20 w-96 h-96" />
          </div>
        </div>

        {/* Search and Registration Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Donor Search */}
          <div className="bg-card p-8 rounded-[2rem] border border-border shadow-sm">
            <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2"><Search className="text-red-500"/> ডোনার খুঁজুন</h2>
            <div className="relative">
              <input 
                type="text" 
                placeholder="রক্তের গ্রুপ বা এলাকা লিখে খুঁজুন..."
                className="w-full p-4 rounded-xl border border-border bg-background focus:ring-2 focus:ring-red-500 outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute right-4 top-4 text-body w-5 h-5"/>
            </div>
          </div>

          {/* Donor Registration */}
          <div className="bg-card p-8 rounded-[2rem] border border-border shadow-sm">
            <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2"><UserPlus className="text-red-500"/> ডোনার হিসেবে রেজিস্টার করুন</h2>
            <button 
              onClick={() => setShowRegistrationForm(!showRegistrationForm)}
              className="w-full py-4 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-all">
              {showRegistrationForm ? 'ফরমটি আড়াল করুন' : 'রেজিস্ট্রেশন করুন'}
            </button>
          </div>
        </div>

        {/* Registration Form */}
        {showRegistrationForm && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-card p-8 rounded-[2rem] border border-border shadow-lg mb-16"
          >
            <h2 className="text-2xl font-bold text-primary mb-6">ডোনার হিসেবে রেজিস্টার করুন</h2>
            <form onSubmit={handleRegister} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="text" placeholder="পূর্ণ নাম *" className="p-4 rounded-xl border border-border" required onChange={(e) => setDonorData({...donorData, name: e.target.value})} />
              <select className="p-4 rounded-xl border border-border" required onChange={(e) => setDonorData({...donorData, bloodGroup: e.target.value})}>
                <option value="">রক্তের গ্রুপ *</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
              <input type="text" placeholder="ঠিকানা *" className="p-4 rounded-xl border border-border" required onChange={(e) => setDonorData({...donorData, address: e.target.value})} />
              <input type="tel" placeholder="মোবাইল নাম্বার *" className="p-4 rounded-xl border border-border" required onChange={(e) => setDonorData({...donorData, phone: e.target.value})} />
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-medium text-body">শেষ রক্তদানের তারিখ</label>
                <input type="date" className="w-full p-4 rounded-xl border border-border" onChange={(e) => setDonorData({...donorData, lastDonationDate: e.target.value})} />
              </div>
              <button type="submit" className="md:col-span-2 py-4 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-all">রেজিস্ট্রেশন সম্পূর্ণ করুন</button>
            </form>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOOD_BANKS.filter(bank => bank.name.includes(searchTerm) || bank.address.includes(searchTerm)).map((bank, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-card p-8 rounded-[2rem] shadow-sm border border-border space-y-6 hover:shadow-lg transition-all"
            >
              <div className="w-14 h-14 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center">
                <Droplet className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-primary">{bank.name}</h3>
              <div className="space-y-3 text-body font-medium">
                <div className="flex items-center gap-3"><MapPin className="w-5 h-5 text-primary"/> {bank.address}</div>
                <div className="flex items-center gap-3"><Phone className="w-5 h-5 text-primary"/> {bank.phone}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
