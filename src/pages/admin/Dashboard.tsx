import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { 
  Bell, MessageSquare, Users, ShieldCheck, 
  LayoutDashboard, Settings, Menu, X, Bot
} from 'lucide-react';
import { motion } from 'motion/react';

// Tabs
import Overview from './tabs/Overview';
import NoticesTab from './tabs/NoticesTab';
import ComplaintsTab from './tabs/ComplaintsTab';
import AILogsTab from './tabs/AILogsTab';
import VolunteersTab from './tabs/VolunteersTab';

export default function AdminDashboard() {
  const { isAdmin, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  if (loading) return null;
  if (!isAdmin) return <Navigate to="/auth" />;

  const tabs = [
    { id: 'overview', label: 'ওভারভিউ', icon: LayoutDashboard, component: <Overview /> },
    { id: 'notices', label: 'নোটিশ ব্যবস্থাপনা', icon: Bell, component: <NoticesTab /> },
    { id: 'complaints', label: 'অভিযোগ মনিটরিং', icon: MessageSquare, component: <ComplaintsTab /> },
    { id: 'ai-logs', label: 'AI এসিস্ট্যান্ট লগ', icon: Bot, component: <AILogsTab /> },
    { id: 'volunteers', label: 'স্বেচ্ছাসেবী পর্যালোচনা', icon: Users, component: <VolunteersTab /> },
    { id: 'governance', label: 'প্রশাসন', icon: ShieldCheck, component: <div className="p-12 text-center text-slate-400 italic">শীঘ্রই আসছে...</div> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? '280px' : '84px' }}
        className="bg-white border-r border-slate-200 flex flex-col sticky top-0 h-screen overflow-hidden transition-all duration-300 shadow-sm z-50"
      >
        <div className="p-6 border-b border-slate-50 flex items-center justify-between overflow-hidden">
          {isSidebarOpen && <span className="text-xl font-bold text-primary truncate">অ্যাডমিন প্যানেল</span>}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-slate-50 rounded-xl transition-colors">
            {isSidebarOpen ? <X className="w-5 h-5 text-slate-400" /> : <Menu className="w-5 h-5 text-slate-400" />}
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all ${
                activeTab === tab.id 
                  ? 'bg-primary text-white shadow-lg shadow-primary/20 font-bold' 
                  : 'text-slate-500 hover:bg-slate-50 font-medium'
              }`}
            >
              <tab.icon className={`w-5 h-5 shrink-0 ${activeTab === tab.id ? 'text-white' : 'text-slate-400'}`} />
              {isSidebarOpen && <span className="truncate">{tab.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-50 overflow-hidden">
          <button className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-rose-500 hover:bg-rose-50 font-bold transition-all">
            <Settings className="w-5 h-5 shrink-0" />
            {isSidebarOpen && <span>সেটিংস</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-x-hidden">
        <header className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight leading-tight">
              {tabs.find(t => t.id === activeTab)?.label}
            </h1>
            <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mt-1">প্যানেল ড্যাশবোর্ড / {activeTab}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
              <p className="text-sm font-bold text-slate-900">অ্যাডমিন ইউজার</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">প্রধান নিয়ন্ত্রক</p>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary font-bold text-xl ring-4 ring-white shadow-sm border border-primary/20">
              A
            </div>
          </div>
        </header>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {tabs.find(t => t.id === activeTab)?.component}
        </motion.div>
      </main>
    </div>
  );
}
