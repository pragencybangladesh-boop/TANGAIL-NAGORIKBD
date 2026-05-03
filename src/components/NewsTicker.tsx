import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';

export default function NewsTicker() {
  const [notices, setNotices] = useState<any[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'notices'), orderBy('createdAt', 'desc'), limit(5));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setNotices(snapshot.docs.map(doc => doc.data().title));
    });
    return unsubscribe;
  }, []);

  if (notices.length === 0) return null;

  return (
    <div className="bg-slate-900 text-white overflow-hidden py-2 hidden md:block">
      <div className="max-w-7xl mx-auto px-4 flex items-center">
        <div className="flex items-center gap-2 bg-primary px-3 py-1 rounded text-xs font-bold uppercase tracking-wider mr-4 shrink-0">
          <Bell className="w-3 h-3" />
          <span>নতুন নোটিশ</span>
        </div>
        <div className="flex gap-12 animate-marquee whitespace-nowrap">
          {notices.map((notice, i) => (
            <span key={i} className="text-sm font-medium hover:text-primary transition-colors cursor-pointer capitalize">
              • {notice}
            </span>
          ))}
          {/* Duplicate for seamless effect */}
          {notices.map((notice, i) => (
            <span key={`dup-${i}`} className="text-sm font-medium hover:text-primary transition-colors cursor-pointer capitalize">
              • {notice}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
