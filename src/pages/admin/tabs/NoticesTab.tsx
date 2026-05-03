import React, { useState, useEffect } from 'react';
import { db, handleFirestoreError, OperationType } from '../../../lib/firebase';
import { collection, query, getDocs, addDoc, deleteDoc, doc, orderBy } from 'firebase/firestore';
import { Trash2, Plus, Bell } from 'lucide-react';
import { UPAZILAS } from '../../../data/mymensingh';

export default function NoticesTab() {
  const [notices, setNotices] = useState<any[]>([]);
  const [newNotice, setNewNotice] = useState({ title: '', content: '', upazila: 'all', category: 'general' });

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const q = query(collection(db, 'notices'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      setNotices(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (e) {
      handleFirestoreError(e, OperationType.LIST, 'notices');
    }
  };

  const handleAddNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'notices'), {
        ...newNotice,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      setNewNotice({ title: '', content: '', upazila: 'all', category: 'general' });
      fetchNotices();
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, 'notices');
    }
  };

  const handleDeleteNotice = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'notices', id));
      fetchNotices();
    } catch (e) {
      handleFirestoreError(e, OperationType.DELETE, `notices/${id}`);
    }
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleAddNotice} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4">
        <h3 className="text-xl font-bold mb-4">নতুন নোটিশ যোগ করুন</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            className="p-3 border border-slate-200 rounded-xl outline-none focus:border-primary transition-colors text-sm"
            placeholder="নোটিশের শিরোনাম"
            value={newNotice.title}
            onChange={e => setNewNotice({...newNotice, title: e.target.value})}
            required
          />
          <select 
            className="p-3 border border-slate-200 rounded-xl outline-none focus:border-primary transition-colors text-sm bg-white"
            value={newNotice.upazila}
            onChange={e => setNewNotice({...newNotice, upazila: e.target.value})}
          >
            <option value="all">সকল উপজেলা</option>
            {UPAZILAS.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
          </select>
        </div>
        <textarea
          className="w-full p-3 border border-slate-200 rounded-xl outline-none focus:border-primary transition-colors h-32 text-sm"
          placeholder="বিস্তারিত বর্ণনা..."
          value={newNotice.content}
          onChange={e => setNewNotice({...newNotice, content: e.target.value})}
          required
        />
        <button type="submit" className="bg-primary text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-primary-dark transition-all text-sm font-bold shadow-lg shadow-primary/20">
          <Plus className="w-5 h-5" /> নোটিশ প্রকাশ করুন
        </button>
      </form>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-lg font-bold">প্রকাশিত নোটিশসমূহ</h3>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{notices.length}টি নোটিশ</span>
        </div>
        <div className="divide-y divide-slate-50">
          {notices.map(notice => (
            <div key={notice.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                  <Bell className="w-5 h-5" />
                </div>
                  <div>
                    <h4 className="font-bold text-slate-800 tracking-tight">{notice.title}</h4>
                    <p className="text-xs text-slate-400 capitalize">
                      {notice.upazila === 'all' ? 'সকল উপজেলা' : UPAZILAS.find(u => u.id === notice.upazila)?.name || notice.upazila} • {notice.category}
                    </p>
                  </div>
              </div>
              <button 
                onClick={() => handleDeleteNotice(notice.id)}
                className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-colors"
                title="মুছে ফেলুন"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
          {notices.length === 0 && (
            <div className="p-12 text-center text-slate-400 italic">কোনো নোটিশ পাওয়া যায়নি।</div>
          )}
        </div>
      </div>
    </div>
  );
}
