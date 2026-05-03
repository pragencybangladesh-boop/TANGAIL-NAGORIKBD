import React, { useState, useEffect } from 'react';
import { db, handleFirestoreError, OperationType } from '../../../lib/firebase';
import { collection, query, getDocs, orderBy, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { Users, CheckCircle2, XCircle, Clock, Search, Filter, Phone, MapPin, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function VolunteersTab() {
  const [volunteers, setVolunteers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchVolunteers();
  }, []);

  const fetchVolunteers = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'volunteers'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      setVolunteers(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (e) {
      handleFirestoreError(e, OperationType.LIST, 'volunteers');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      await updateDoc(doc(db, 'volunteers', id), { status });
      setVolunteers(prev => prev.map(v => v.id === id ? { ...v, status } : v));
    } catch (e) {
      handleFirestoreError(e, OperationType.UPDATE, `volunteers/${id}`);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('আপনি কি এই আবেদনটি মুছে ফেলতে চান?')) return;
    try {
      await deleteDoc(doc(db, 'volunteers', id));
      setVolunteers(prev => prev.filter(v => v.id !== id));
    } catch (e) {
      handleFirestoreError(e, OperationType.DELETE, `volunteers/${id}`);
    }
  };

  const filteredVolunteers = volunteers.filter(v => {
    const matchesFilter = filter === 'all' || v.status === filter;
    const matchesSearch = v.name.toLowerCase().includes(search.toLowerCase()) || 
                         v.trackingId.toLowerCase().includes(search.toLowerCase()) ||
                         v.upazila.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Search & Filter Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="relative flex-1 max-w-md group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors w-5 h-5" />
          <input 
            type="text" 
            placeholder="নাম, আইডি বা উপজেলা দিয়ে খুঁজুন..." 
            className="w-full pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-2xl outline-none focus:border-primary/50 transition-all text-sm font-medium shadow-sm"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          {[
            { label: 'সব', value: 'all' },
            { label: 'অপেক্ষমান', value: 'অপেক্ষমান' },
            { label: 'অনুমোদিত', value: 'অনুমোদিত' },
            { label: 'বাতিল', value: 'বাতিল' }
          ].map(f => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-6 py-3 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                filter === f.value 
                  ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' 
                  : 'bg-white text-slate-500 border-slate-100 hover:border-slate-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'মোট আবেদন', value: volunteers.length, color: 'bg-blue-50 text-blue-600', icon: Users },
          { label: 'অপেক্ষমান', value: volunteers.filter(v => v.status === 'অপেক্ষমান').length, color: 'bg-amber-50 text-amber-600', icon: Clock },
          { label: 'অনুমোদিত', value: volunteers.filter(v => v.status === 'অনুমোদিত').length, color: 'bg-emerald-50 text-emerald-600', icon: CheckCircle2 },
          { label: 'বাতিল', value: volunteers.filter(v => v.status === 'বাতিল').length, color: 'bg-rose-50 text-rose-600', icon: XCircle },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-3">
            <div className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-2xl font-black text-slate-900 leading-none">{stat.value.toLocaleString('bn-BD')}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Table/List */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden min-h-[400px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-[400px] text-slate-400">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-sm font-medium">লোড হচ্ছে...</p>
          </div>
        ) : filteredVolunteers.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[400px] text-slate-400 opacity-50">
            <Users className="w-12 h-12 mb-4" />
            <p className="text-sm font-medium">কোনো তথ্য পাওয়া যায়নি</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">ভলান্টিয়ার তথ্য</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">অবস্থান ও পেশা</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">স্ট্যাটাস</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                <AnimatePresence>
                  {filteredVolunteers.map(v => (
                    <motion.tr 
                      key={v.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="hover:bg-slate-50/30 transition-colors group"
                    >
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 font-bold group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                            {v.name[0]}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-bold text-slate-900">{v.name}</p>
                              <span className="text-[9px] font-black bg-slate-100 px-2 py-0.5 rounded-full text-slate-500 uppercase tracking-wider">{v.trackingId}</span>
                            </div>
                            <div className="flex flex-col gap-1 mt-1">
                              <div className="flex items-center gap-1.5 text-slate-400">
                                <Phone className="w-3 h-3" />
                                <span className="text-xs font-medium">{v.phone}</span>
                              </div>
                              <div className="flex items-center gap-1.5 text-slate-400">
                                <Clock className="w-3 h-3" />
                                <span className="text-[10px] font-medium">{v.createdAt?.toDate ? v.createdAt.toDate().toLocaleDateString('bn-BD') : 'N/A'}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                            <MapPin className="w-3.5 h-3.5 text-rose-500" />
                            <span>{v.upazila}, {v.district}</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                            <GraduationCap className="w-3.5 h-3.5 text-blue-500" />
                            <span>{v.educationOrProfession}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                          v.status === 'অপেক্ষমান' ? 'bg-amber-50 text-amber-600 border-amber-200' :
                          v.status === 'অনুমোদিত' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' :
                          'bg-red-50 text-red-600 border-red-200'
                        }`}>
                          {v.status === 'অপেক্ষমান' && <Clock className="w-3 h-3" />}
                          {v.status === 'অনুমোদিত' && <CheckCircle2 className="w-3 h-3" />}
                          {v.status === 'বাতিল' && <XCircle className="w-3 h-3" />}
                          {v.status}
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2">
                          {v.status === 'অপেক্ষমান' ? (
                            <>
                              <button 
                                onClick={() => handleStatusUpdate(v.id, 'অনুমোদিত')}
                                className="p-2bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-all p-2"
                                title="অনুমোদন করুন"
                              >
                                <CheckCircle2 className="w-5 h-5" />
                              </button>
                              <button 
                                onClick={() => handleStatusUpdate(v.id, 'বাতিল')}
                                className="p-2 bg-rose-100 text-rose-600 rounded-lg hover:bg-rose-200 transition-all"
                                title="বাতিল করুন"
                              >
                                <XCircle className="w-5 h-5" />
                              </button>
                            </>
                          ) : (
                            <button 
                             onClick={() => handleStatusUpdate(v.id, 'অপেক্ষমান')}
                             className="text-xs font-bold text-slate-400 hover:text-primary transition-colors underline underline-offset-4"
                            >
                              রিসেট করুন
                            </button>
                          )}
                          <button 
                             onClick={() => handleDelete(v.id)}
                             className="p-2 text-slate-300 hover:text-red-500 transition-colors ml-2"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
