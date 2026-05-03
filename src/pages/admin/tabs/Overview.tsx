import React from 'react';
import { motion } from 'motion/react';
import { Activity, Bell, MessageSquare, Users, ShieldCheck, FileText } from 'lucide-react';
import StatCard from '../../../components/ui/StatCard';

export default function Overview() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="মোট নোটিশ" value="২৪" icon={Bell} description="+৩ গত সপ্তাহে" />
        <StatCard label="অভিযোগ" value="১৫৬" icon={MessageSquare} description="১২টি প্রক্রিয়াধীন" />
        <StatCard label="স্বেচ্ছাসেবী" value="৮৪২" icon={Users} description="৫৫টি নতুন নিবন্ধন" />
        <StatCard label="ব্যবহারকারী" value="২.৫কে" icon={Activity} description="+১০% বৃদ্ধি" />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <h3 className="text-xl font-bold mb-6">সাম্প্রতিক কার্যক্রম</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="flex gap-4 p-4 hover:bg-slate-50 rounded-2xl transition-colors items-center">
                <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800 tracking-tight">নতুন অভিযোগ জমা হয়েছে</p>
                  <p className="text-xs text-slate-400">২ ঘণ্টা আগে • সদর উপজেলা</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <h3 className="text-xl font-bold mb-6">সিস্টেম স্ট্যাটাস</h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-sm font-medium">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                <span>ফায়ারবেস কানেকশন</span>
              </div>
              <span className="text-emerald-500 text-xs font-bold uppercase">অনলাইন</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-sm font-medium">
                <FileText className="w-5 h-5 text-blue-500" />
                <span>ডকুমেন্ট স্টোরেজ</span>
              </div>
              <span className="text-emerald-500 text-xs font-bold uppercase">স্বাভাবিক</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
