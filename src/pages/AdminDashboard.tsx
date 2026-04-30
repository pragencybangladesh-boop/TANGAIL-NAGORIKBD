import React, { useState, useEffect } from 'react';
import { useAuth } from '../lib/AuthContext';
import { Navigate } from 'react-router-dom';
import { db, OperationType, handleFirestoreError } from '../lib/firebase';
import { collection, query, getDocs, addDoc, deleteDoc, doc, orderBy, updateDoc, setDoc } from 'firebase/firestore';
import { Trash2, Plus, Bell, MessageSquare, Users, ShieldCheck, FileText } from 'lucide-react';
import { motion } from 'motion/react';
import { UPAZILAS } from '../data/upazilas';

export default function AdminDashboard() {
  const { isAdmin, loading, roles } = useAuth();
  const [activeTab, setActiveTab] = useState<'notices' | 'complaints' | 'volunteers' | 'moderators' | 'governance'>('notices');
  const [notices, setNotices] = useState<any[]>([]);
  const [complaints, setComplaints] = useState<any[]>([]);
  const [volunteers, setVolunteers] = useState<any[]>([]);
  const [rolesList, setRolesList] = useState<any[]>([]);
  const [governancePosts, setGovernancePosts] = useState<any[]>([]);

  // Notice Form State
  const [newNotice, setNewNotice] = useState({ title: '', category: 'General', urgent: false, date: new Date().toLocaleDateString('bn-BD'), upazila: 'সকল উপজেলা' });
  const [newRole, setNewRole] = useState({ email: '', canEditNotices: false, canMonitorComplaints: false });
  const [newGovernancePost, setNewGovernancePost] = useState({ title: '', type: 'blog', content: '', date: new Date().toLocaleDateString('bn-BD') });

  useEffect(() => {
    if (isAdmin || roles.canEditNotices || roles.canMonitorComplaints) {
      if (activeTab === 'notices' && !isAdmin && !roles.canEditNotices) {
         setActiveTab(roles.canMonitorComplaints ? 'complaints' : 'notices');
      }
      fetchData();
    }
  }, [isAdmin, roles, activeTab]);

  const fetchData = async () => {
    try {
      if (activeTab === 'notices' && (isAdmin || roles.canEditNotices)) {
        const q = query(collection(db, 'notices'), orderBy('date', 'desc'));
        const snapshot = await getDocs(q);
        setNotices(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } else if (activeTab === 'complaints' && (isAdmin || roles.canMonitorComplaints)) {
        const snapshot = await getDocs(collection(db, 'complaints'));
        setComplaints(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } else if (activeTab === 'volunteers' && isAdmin) {
        const snapshot = await getDocs(collection(db, 'volunteers'));
        setVolunteers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } else if (activeTab === 'moderators' && isAdmin) {
        const snapshot = await getDocs(collection(db, 'roles'));
        setRolesList(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } else if (activeTab === 'governance' && isAdmin) {
        const q = query(collection(db, 'governance_posts'), orderBy('date', 'desc'));
        const snapshot = await getDocs(q);
        setGovernancePosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'notices'), newNotice);
      setNewNotice({ title: '', category: 'General', urgent: false, date: new Date().toLocaleDateString('bn-BD'), upazila: 'সকল উপজেলা' });
      fetchData();
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'notices');
    }
  };

  const handleAddGovernancePost = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'governance_posts'), newGovernancePost);
      setNewGovernancePost({ title: '', type: 'blog', content: '', date: new Date().toLocaleDateString('bn-BD') });
      fetchData();
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'governance_posts');
    }
  };

  const handleDelete = async (collectionName: string, id: string) => {
    if (!window.confirm('আপনি কি নিশ্চিত যে এটি ডিলিট করতে চান?')) return;
    try {
      await deleteDoc(doc(db, collectionName, id));
      fetchData();
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, collectionName);
    }
  };

  const handleStatusChange = async (complaintId: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'complaints', complaintId), { status: newStatus });
      fetchData();
    } catch (error) {
       handleFirestoreError(error, OperationType.UPDATE, 'complaints');
    }
  };

  const handleAddRole = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRole.email) return;
    try {
      await setDoc(doc(db, 'roles', newRole.email), {
        email: newRole.email,
        canEditNotices: newRole.canEditNotices,
        canMonitorComplaints: newRole.canMonitorComplaints
      });
      setNewRole({ email: '', canEditNotices: false, canMonitorComplaints: false });
      fetchData();
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'roles');
    }
  };

  if (loading) return <div className="pt-32 px-6 text-center">লোড হচ্ছে...</div>;
  if (!isAdmin && !roles.canEditNotices && !roles.canMonitorComplaints) return <Navigate to="/" />;

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <h1 className="text-4xl font-bold text-slate-900 tracking-tight">অ্যাডমিন ড্যাশবোর্ড</h1>
        
        <div className="flex flex-wrap bg-slate-100 p-1 rounded-2xl">
          {(isAdmin || roles.canEditNotices) && (
            <button 
              onClick={() => setActiveTab('notices')}
              className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${activeTab === 'notices' ? 'bg-white text-primary shadow-sm' : 'text-slate-500'}`}
            >
              <Bell className="w-4 h-4" /> নোটিশ
            </button>
          )}
          {(isAdmin || roles.canMonitorComplaints) && (
            <button 
              onClick={() => setActiveTab('complaints')}
              className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${activeTab === 'complaints' ? 'bg-white text-primary shadow-sm' : 'text-slate-500'}`}
            >
              <MessageSquare className="w-4 h-4" /> অভিযোগ
            </button>
          )}
          {isAdmin && (
            <button 
              onClick={() => setActiveTab('volunteers')}
              className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${activeTab === 'volunteers' ? 'bg-white text-primary shadow-sm' : 'text-slate-500'}`}
            >
              <Users className="w-4 h-4" /> ভলান্টিয়ার্স
            </button>
          )}
          {isAdmin && (
            <button 
              onClick={() => setActiveTab('moderators')}
              className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${activeTab === 'moderators' ? 'bg-white text-primary shadow-sm' : 'text-slate-500'}`}
            >
              <ShieldCheck className="w-4 h-4" /> মডারেটরস
            </button>
          )}
          {isAdmin && (
            <button 
              onClick={() => setActiveTab('governance')}
              className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${activeTab === 'governance' ? 'bg-white text-primary shadow-sm' : 'text-slate-500'}`}
            >
              <FileText className="w-4 h-4" /> সুশাসন
            </button>
          )}
        </div>
      </div>

      {activeTab === 'notices' && (
        <div className="space-y-12">
          {/* Add Notice Form */}
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><Plus className="text-primary" /> নতুন নোটিশ যুক্ত করুন</h2>
            <form onSubmit={handleAddNotice} className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <input 
                type="text" 
                placeholder="শিরোনাম" 
                className="md:col-span-4 p-4 bg-slate-50 rounded-xl outline-none border border-transparent focus:border-primary/20"
                value={newNotice.title}
                onChange={e => setNewNotice({...newNotice, title: e.target.value})}
                required
              />
              <select 
                className="p-4 bg-slate-50 rounded-xl outline-none"
                value={newNotice.category}
                onChange={e => setNewNotice({...newNotice, category: e.target.value})}
              >
                <option value="General">সাধারণ</option>
                <option value="Project">প্রকল্প</option>
                <option value="Career">ক্যারিয়ার</option>
                <option value="Event">ইভেন্ট</option>
              </select>
              <select 
                className="md:col-span-2 p-4 bg-slate-50 rounded-xl outline-none"
                value={newNotice.upazila}
                onChange={e => setNewNotice({...newNotice, upazila: e.target.value})}
              >
                <option value="সকল উপজেলা">সকল উপজেলা</option>
                {UPAZILAS.map((upazila) => (
                  <option key={upazila.id} value={upazila.id}>{upazila.name}</option>
                ))}
              </select>
              <button className="bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all p-4">সংরক্ষণ করুন</button>
            </form>
          </div>

          <div className="grid gap-6">
            {notices.map(notice => (
              <div key={notice.id} className="bg-white p-6 rounded-2xl border border-slate-100 flex items-center justify-between shadow-sm">
                <div>
                  <h3 className="font-bold text-lg">{notice.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-1 rounded">
                      {notice.upazila === 'সকল উপজেলা' ? 'সকল উপজেলা' : (UPAZILAS.find(u => u.id === notice.upazila)?.name || notice.upazila)}
                    </span>
                    <p className="text-slate-400 text-sm">{notice.category} • {notice.date}</p>
                  </div>
                </div>
                {isAdmin && (
                  <button onClick={() => handleDelete('notices', notice.id)} className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-all">
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'complaints' && (
        <div className="grid gap-6">
          {complaints.length === 0 ? <p className="text-center text-slate-400 py-20">কোনো অভিযোগ পাওয়া যায়নি।</p> : (
            complaints.map(complaint => (
              <div key={complaint.id} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-bold">{complaint.name}</h3>
                      <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-1 rounded">Ref: {complaint.id}</span>
                    </div>
                    <p className="text-slate-400 font-medium">{complaint.email} • {complaint.phone}</p>
                  </div>
                  {isAdmin && (
                    <button onClick={() => handleDelete('complaints', complaint.id)} className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-all">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
                <p className="text-slate-600 leading-relaxed bg-slate-50 p-6 rounded-2xl">{complaint.message}</p>
                <div className="flex justify-between items-center bg-slate-50 px-6 py-4 rounded-2xl border border-slate-100">
                  <div className="space-y-1">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">বর্তমান অবস্থা</p>
                    <select 
                      value={complaint.status || 'অপেক্ষমান'}
                      onChange={(e) => handleStatusChange(complaint.id, e.target.value)}
                      className="bg-transparent font-bold capitalize outline-none cursor-pointer"
                    >
                      <option value="অপেক্ষমান">অপেক্ষমান</option>
                      <option value="দেখা হয়েছে">দেখা হয়েছে</option>
                      <option value="স্থানান্তরিত">স্থানীয় কর্মকর্তার কাছে প্রেরণ</option>
                      <option value="প্রক্রিয়াধীন">প্রক্রিয়াধীন</option>
                      <option value="সমাধান করা হয়েছে">সমাধান করা হয়েছে</option>
                    </select>
                  </div>
                  <p className="text-[10px] font-bold text-slate-400 tracking-widest">{complaint.createdAt}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'volunteers' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {volunteers.length === 0 ? <p className="text-center text-slate-400 py-20 md:col-span-3">কোনো ভলান্টিয়ার নেই।</p> : (
            volunteers.map(volunteer => (
              <div key={volunteer.id} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold">{volunteer.name}</h3>
                    <p className="text-primary font-bold text-sm tracking-widest uppercase">{volunteer.area}</p>
                  </div>
                  <button onClick={() => handleDelete('volunteers', volunteer.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-2">
                  <p className="text-slate-600 font-medium">রক্তের গ্রুপ: <span className="text-red-500 font-bold">{volunteer.bloodGroup}</span></p>
                  <p className="text-slate-600 font-medium tracking-widest">{volunteer.phone}</p>
                  <p className="text-slate-400 text-sm italic">{volunteer.skills}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
      {activeTab === 'moderators' && isAdmin && (
        <div className="space-y-12">
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><ShieldCheck className="text-primary" /> মডারেটর / ভলান্টিয়ার যুক্ত করুন</h2>
            <form onSubmit={handleAddRole} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input 
                type="email" 
                placeholder="ইমেইল এড্রেস" 
                className="col-span-full md:col-span-1 p-4 bg-slate-50 rounded-xl outline-none border border-transparent focus:border-primary/20"
                value={newRole.email}
                onChange={e => setNewRole({...newRole, email: e.target.value})}
                required
              />
              <div className="flex bg-slate-50 p-4 rounded-xl items-center gap-6 overflow-x-auto">
                <label className="flex items-center gap-2 font-medium shrink-0 cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="w-5 h-5 accent-primary" 
                    checked={newRole.canEditNotices}
                    onChange={e => setNewRole({...newRole, canEditNotices: e.target.checked})}
                  />
                  নোটিশ আপডেট
                </label>
                <label className="flex items-center gap-2 font-medium shrink-0 cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="w-5 h-5 accent-primary" 
                    checked={newRole.canMonitorComplaints}
                    onChange={e => setNewRole({...newRole, canMonitorComplaints: e.target.checked})}
                  />
                  অভিযোগ মনিটর
                </label>
              </div>
              <button className="bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all p-4 md:col-span-2 shadow-xl">
                সংরক্ষণ করুন
              </button>
            </form>
          </div>

          <div className="grid gap-6">
            {rolesList.length === 0 ? <p className="text-center text-slate-400 py-20">কোনো মডারেটর নেই।</p> : (
              rolesList.map(role => (
                <div key={role.id} className="bg-white p-6 rounded-2xl border border-slate-100 flex flex-col md:flex-row md:items-center justify-between shadow-sm gap-4">
                  <div>
                    <h3 className="font-bold text-lg">{role.email}</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                       {role.canEditNotices && <span className="text-[10px] bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-bold uppercase tracking-widest">নোটিশ আপডেট</span>}
                       {role.canMonitorComplaints && <span className="text-[10px] bg-red-50 text-red-600 px-3 py-1 rounded-full font-bold uppercase tracking-widest">অভিযোগ মনিটর</span>}
                       {!role.canEditNotices && !role.canMonitorComplaints && <span className="text-[10px] bg-slate-100 text-slate-500 px-3 py-1 rounded-full font-bold uppercase tracking-widest">কোনো ভূমিকা নেই</span>}
                    </div>
                  </div>
                  <button onClick={() => handleDelete('roles', role.id)} className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-all self-start md:self-auto">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {activeTab === 'governance' && isAdmin && (
        <div className="space-y-12">
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><Plus className="text-primary" /> সুশাসন পোস্ট যুক্ত করুন</h2>
            <form onSubmit={handleAddGovernancePost} className="md:col-span-4 gap-6 space-y-4">
              <input 
                type="text" 
                placeholder="শিরোনাম" 
                className="w-full p-4 bg-slate-50 rounded-xl outline-none border border-transparent focus:border-primary/20"
                value={newGovernancePost.title}
                onChange={e => setNewGovernancePost({...newGovernancePost, title: e.target.value})}
                required
              />
              <select 
                className="w-full p-4 bg-slate-50 rounded-xl outline-none"
                value={newGovernancePost.type}
                onChange={e => setNewGovernancePost({...newGovernancePost, type: e.target.value})}
              >
                <option value="blog">ব্লগ</option>
                <option value="activity">কার্যক্রম</option>
              </select>
              <textarea 
                placeholder="বিস্তারিত বিবরণ..." 
                className="w-full p-4 bg-slate-50 rounded-xl outline-none border border-transparent focus:border-primary/20 min-h-[150px]"
                value={newGovernancePost.content}
                onChange={e => setNewGovernancePost({...newGovernancePost, content: e.target.value})}
                required
              />
              <button className="bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all p-4 px-8 shadow-md">
                প্রকাশ করুন
              </button>
            </form>
          </div>

          <div className="grid gap-6">
            {governancePosts.length === 0 ? <p className="text-center text-slate-400 py-20">কোনো পোস্ট নেই।</p> : (
              governancePosts.map(post => (
                <div key={post.id} className="bg-white p-6 rounded-2xl border border-slate-100 flex items-center justify-between shadow-sm gap-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{post.title}</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                       <span className="text-[10px] bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full font-bold uppercase tracking-widest">{post.type === 'blog' ? 'ব্লগ' : 'কার্যক্রম'}</span>
                       <span className="text-slate-400 text-sm font-medium">{post.date}</span>
                    </div>
                  </div>
                  <button onClick={() => handleDelete('governance_posts', post.id)} className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-all self-start">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
