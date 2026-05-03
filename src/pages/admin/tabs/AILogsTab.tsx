import React, { useState, useEffect } from 'react';
import { db, handleFirestoreError, OperationType } from '../../../lib/firebase';
import { collection, query, getDocs, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { Bot, User, Trash2, Calendar, Mail, MessageSquare } from 'lucide-react';

export default function AILogsTab() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'aiQueries'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      setLogs(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (e) {
      handleFirestoreError(e, OperationType.LIST, 'aiQueries');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('আপনি কি এই লগটি মুছে ফেলতে চান?')) return;
    try {
      await deleteDoc(doc(db, 'aiQueries', id));
      setLogs(prev => prev.filter(log => log.id !== id));
    } catch (e) {
      handleFirestoreError(e, OperationType.DELETE, `aiQueries/${id}`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-800">নাগরিক AI লগসমূহ</h3>
          <p className="text-sm text-slate-500">AI এসিস্ট্যান্টের সাথে নাগরিকদের সকল কথোপকথন এখানে সংরক্ষিত আছে।</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-primary/5 border border-primary/10 rounded-xl">
             <span className="text-primary font-bold text-lg">{logs.length.toLocaleString('bn-BD')}</span>
             <span className="text-slate-500 text-xs ml-2 font-medium">মোট জিজ্ঞাসা</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="divide-y divide-slate-50">
          {logs.map(log => (
            <div key={log.id} className="p-8 space-y-6 hover:bg-slate-50 transition-colors group">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* User Info */}
                <div className="md:col-span-3 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{log.userName || 'Anonymous'}</p>
                      <p className="text-[11px] text-slate-400 font-medium">{log.email || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-slate-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-medium">
                      {log.createdAt?.toDate ? log.createdAt.toDate().toLocaleString('bn-BD') : 'N/A'}
                    </span>
                  </div>
                  {log.source && (
                    <div className="inline-block px-2 py-1 bg-blue-50 text-blue-600 rounded-md text-[9px] font-black uppercase tracking-wider border border-blue-100">
                      Source: {log.source}
                    </div>
                  )}
                </div>

                {/* Conversation */}
                <div className="md:col-span-8 space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-slate-400">
                      <MessageSquare className="w-3 h-3" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">জিজ্ঞাসা / Query</span>
                    </div>
                    <p className="text-sm font-bold text-slate-800 bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                      {log.query}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-primary">
                      <Bot className="w-3 h-3" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">AI উত্তর / Response</span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed p-3 rounded-xl bg-slate-50/50">
                      {log.response}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="md:col-span-1 flex md:flex-col justify-end items-end gap-2">
                  <button 
                    onClick={() => handleDelete(log.id)}
                    className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                    title="মুছে ফেলুন"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {logs.length === 0 && !loading && (
            <div className="p-20 text-center text-slate-400 italic">
              <Bot className="w-12 h-12 mx-auto mb-4 opacity-10" />
              এখনও কোনো AI কথোপকথন রেকর্ড করা হয়নি।
            </div>
          )}
          {loading && (
            <div className="p-20 text-center text-slate-400 italic">
              তথ্য লোড হচ্ছে...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
