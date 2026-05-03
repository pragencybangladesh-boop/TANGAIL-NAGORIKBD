import React, { useState, useEffect } from 'react';
import { db, handleFirestoreError, OperationType } from '../../../lib/firebase';
import { collection, query, getDocs, orderBy, updateDoc, doc } from 'firebase/firestore';
import { MessageSquare, CheckCircle2, Clock } from 'lucide-react';

export default function ComplaintsTab() {
  const [complaints, setComplaints] = useState<any[]>([]);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const q = query(collection(db, 'complaints'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      setComplaints(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (e) {
      handleFirestoreError(e, OperationType.LIST, 'complaints');
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'complaints', id), {
        status: newStatus,
        updatedAt: new Date()
      });
      fetchComplaints();
    } catch (e) {
      handleFirestoreError(e, OperationType.UPDATE, `complaints/${id}`);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-lg font-bold">নাগরিক অভিযোগসমূহ</h3>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-[10px] font-bold uppercase tracking-wider border border-amber-100">বকেয়া: {complaints.filter(c => c.status === 'Pending').length}</span>
            <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold uppercase tracking-wider border border-emerald-100">সমাধানিত: {complaints.filter(c => c.status === 'Resolved' || c.status === 'Completed').length}</span>
          </div>
        </div>
        <div className="divide-y divide-slate-50">
          {complaints.map(item => (
            <div key={item.id} className="p-6 space-y-4 hover:bg-slate-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                    (item.status === 'Resolved' || item.status === 'Completed') ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                  }`}>
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 tracking-tight">{item.title || item.category}</h4>
                    <p className="text-xs text-slate-400 capitalize">{item.upazila} • {item.category}</p>
                    <p className="text-sm text-slate-600 mt-2 line-clamp-2">{item.message || item.description}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                    (item.status === 'Resolved' || item.status === 'Completed') ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                    item.status === 'Processing' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                    'bg-amber-50 text-amber-600 border-amber-100'
                  }`}>
                    {item.status === 'Resolved' || item.status === 'Completed' ? 'সমাধানিত' : item.status === 'Processing' ? 'প্রক্রিয়াধীন' : 'অপেক্ষমান'}
                  </span>
                  <div className="flex gap-2">
                    {item.status === 'Pending' && (
                      <button 
                        onClick={() => handleUpdateStatus(item.id, 'Processing')}
                        className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-blue-600 hover:bg-blue-50 px-2 py-1 rounded-lg transition-colors border border-blue-100"
                      >
                        <Clock className="w-3 h-3" /> প্রক্রিয়ায় নিন
                      </button>
                    )}
                    {(item.status === 'Pending' || item.status === 'Processing') && (
                      <button 
                        onClick={() => handleUpdateStatus(item.id, 'Resolved')}
                        className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600 hover:bg-emerald-50 px-2 py-1 rounded-lg transition-colors border border-emerald-100"
                      >
                        <CheckCircle2 className="w-3 h-3" /> সমাধান করুন
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {complaints.length === 0 && (
            <div className="p-12 text-center text-slate-400 italic">এখনও কোনো অভিযোগ জমা পড়েনি।</div>
          )}
        </div>
      </div>
    </div>
  );
}
