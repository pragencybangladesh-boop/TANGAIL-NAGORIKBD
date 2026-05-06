import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { User, Phone, MapPin, CreditCard, Settings, Camera, AlertCircle, Save, Loader2, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function UserProfile() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'settings'>('profile');
  
  const [profileData, setProfileData] = useState({
    name: '',
    phoneNumber: '',
    address: '',
    nidNumber: '',
  });

  const [settingsData, setSettingsData] = useState({
    emailNotifications: true,
    smsNotifications: false,
    profileVisibility: 'public',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      try {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          setProfileData({
            name: data.name || user.displayName || '',
            phoneNumber: data.phoneNumber || '',
            address: data.address || '',
            nidNumber: data.nidNumber || '',
          });
          if (data.settings) {
            setSettingsData({
              emailNotifications: data.settings.emailNotifications ?? true,
              smsNotifications: data.settings.smsNotifications ?? false,
              profileVisibility: data.settings.profileVisibility || 'public',
            });
          }
        } else {
          // Initialize user doc if it doesn't exist
          await setDoc(docRef, {
            uid: user.uid,
            email: user.email,
            name: user.displayName || '',
            phoneNumber: '',
            address: '',
            nidNumber: '',
            settings: settingsData
          });
          setProfileData(prev => ({ ...prev, name: user.displayName || '' }));
        }
      } catch (error) {
        handleFirestoreError(error, OperationType.GET, 'users');
        toast.error('প্রোফাইল লোড করতে সমস্যা হচ্ছে');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user]);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSettingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setSettingsData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setSaving(true);
    try {
      const docRef = doc(db, 'users', user.uid);
      await updateDoc(docRef, {
        name: profileData.name,
        phoneNumber: profileData.phoneNumber,
        address: profileData.address,
        nidNumber: profileData.nidNumber,
      });
      toast.success('প্রোফাইল আপডেট করা হয়েছে');
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, 'users');
      toast.error('প্রোফাইল আপডেট করতে ব্যর্থ হয়েছে');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setSaving(true);
    try {
      const docRef = doc(db, 'users', user.uid);
      await updateDoc(docRef, {
        settings: settingsData
      });
      toast.success('সেটিংস আপডেট করা হয়েছে');
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, 'users');
      toast.error('সেটিংস আপডেট করতে ব্যর্থ হয়েছে');
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
    return (
      <div className="pt-32 pb-20 min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <AlertCircle className="w-12 h-12 text-amber-500 mx-auto" />
          <h2 className="text-2xl font-bold text-slate-800">লগইন প্রয়োজন</h2>
          <p className="text-slate-600">প্রোফাইল দেখতে অনুগ্রহ করে লগইন করুন</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="pt-32 pb-20 min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 mb-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/5 rounded-full blur-3xl -z-10" />
          
          <div className="relative group shrink-0">
            <div className="w-28 h-28 rounded-full bg-slate-100 flex items-center justify-center text-4xl font-black text-slate-400 capitalize border-4 border-white shadow-lg overflow-hidden">
              {user.photoURL ? (
                <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                profileData.name ? profileData.name.charAt(0) : user.email?.charAt(0) || 'U'
              )}
            </div>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">{profileData.name || 'নাম যুক্ত নেই'}</h1>
            <p className="text-slate-500 font-medium mt-1">{user.email}</p>
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-4">
              {user.emailVerified ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold uppercase tracking-wider border border-emerald-100">
                  <CheckCircle2 className="w-3.5 h-3.5" /> ভেরিফায়েড একাউন্ট
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-[10px] font-bold uppercase tracking-wider border border-amber-100">
                  <AlertCircle className="w-3.5 h-3.5" /> ভেরিফিকেশন বাকি
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
              activeTab === 'profile' ? 'bg-primary text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <User className="w-4 h-4" /> ব্যক্তিগত তথ্য
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
              activeTab === 'settings' ? 'bg-primary text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Settings className="w-4 h-4" /> একাউন্ট সেটিংস
          </button>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="space-y-6">
              <h2 className="text-xl font-bold text-slate-800 tracking-tight flex items-center gap-2 border-b border-slate-100 pb-4 mb-6">
                <User className="w-5 h-5 text-primary" /> প্রোফাইল আপডেট
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">পুরো নাম</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User className="w-4 h-4 text-slate-400" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={profileData.name}
                      onChange={handleProfileChange}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-slate-700"
                      placeholder="আপনার নাম লিখুন"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">মোবাইল নাম্বার</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Phone className="w-4 h-4 text-slate-400" />
                    </div>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={profileData.phoneNumber}
                      onChange={handleProfileChange}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-slate-700"
                      placeholder="যেমন: ০১XXXXXXXXX"
                    />
                  </div>
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">বর্তমান ঠিকানা</label>
                  <div className="relative">
                    <div className="absolute top-3.5 left-4 pointer-events-none">
                      <MapPin className="w-4 h-4 text-slate-400" />
                    </div>
                    <input
                      type="text"
                      name="address"
                      value={profileData.address}
                      onChange={handleProfileChange}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-slate-700 block"
                      placeholder="উপজেলা, গ্রাম বা রাস্তার ঠিকানা"
                    />
                  </div>
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">জাতীয় পরিচয়পত্র নম্বর (NID)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <CreditCard className="w-4 h-4 text-slate-400" />
                    </div>
                    <input
                      type="text"
                      name="nidNumber"
                      value={profileData.nidNumber}
                      onChange={handleProfileChange}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-slate-700 font-mono tracking-wider"
                      placeholder="NID নম্বর দিন"
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">জাতীয় নাগরিক সেবা গ্রহণের জন্য NID নম্বর গুরুত্বপূর্ণ।</p>
                </div>
              </div>

              <div className="pt-6 flex justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className="px-8 py-3 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  সংরক্ষণ করুন
                </button>
              </div>
            </form>
          )}

          {activeTab === 'settings' && (
            <form onSubmit={handleSaveSettings} className="space-y-6">
              <h2 className="text-xl font-bold text-slate-800 tracking-tight flex items-center gap-2 border-b border-slate-100 pb-4 mb-6">
                <Settings className="w-5 h-5 text-primary" /> নোটিফিকেশন ও প্রেফারেন্স
              </h2>

              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div>
                    <h3 className="font-bold text-slate-800">ইমেইল নোটিফিকেশন</h3>
                    <p className="text-xs text-slate-500 mt-1">গুরুত্বপূর্ণ আপডেট ইমেইলে পেতে চাই</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      name="emailNotifications"
                      checked={settingsData.emailNotifications}
                      onChange={handleSettingsChange}
                      className="sr-only peer" 
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div>
                    <h3 className="font-bold text-slate-800">SMS নোটিফিকেশন</h3>
                    <p className="text-xs text-slate-500 mt-1">জরুরী এলার্ট মোবাইলে পেতে চাই</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      name="smsNotifications"
                      checked={settingsData.smsNotifications}
                      onChange={handleSettingsChange}
                      className="sr-only peer" 
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                <div className="space-y-2 p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <h3 className="font-bold text-slate-800">প্রোফাইল ভিজিবিলিটি</h3>
                  <p className="text-xs text-slate-500 mb-3">অন্যান্য নাগরিক আপনার প্রোফাইল দেখতে পারবে কি না নির্ধারণ করুন</p>
                  <select
                    name="profileVisibility"
                    value={settingsData.profileVisibility}
                    onChange={handleSettingsChange}
                    className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium text-slate-700"
                  >
                    <option value="public">পাবলিক (সবাই দেখতে পাবে)</option>
                    <option value="restricted">রেস্ট্রিক্টেড (শুধুমাত্র ভলান্টিয়ার ও এডমিন)</option>
                    <option value="private">প্রাইভেট (শুধুমাত্র আমি)</option>
                  </select>
                </div>
              </div>

              <div className="pt-6 flex justify-end gap-4">
                <button
                  type="submit"
                  disabled={saving}
                  className="px-8 py-3 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  সংরক্ষণ করুন
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}
