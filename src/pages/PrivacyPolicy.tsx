import React from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  Lock, 
  Server, 
  Database, 
  UserCheck, 
  FileText, 
  Info, 
  Mail,
  ShieldAlert,
  Fingerprint
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function PrivacyPolicy() {
  const { language } = useLanguage();
  const isEn = language === 'en';

  const sections = [
    {
      icon: <Server className="w-6 h-6 text-primary" />,
      title: isEn ? "1. Our Commitment to Data Sovereignty" : "১. ডাটা সার্বভৌমত্বের প্রতি আমাদের প্রতিশ্রুতি",
      content: isEn 
        ? "Under the leadership of Ahmad Rafi (AI Governance Researcher), we adhere to the principle of 'Data Sovereignty.' Unlike many platforms, we prioritize local server configurations and private AI infrastructure (Local LLMs) to ensure that citizen data remains within our secure environment and is not exploited by third-party commercial entities."
        : "আহমদ রাফি (AI গভর্নেন্স গবেষক)-এর নেতৃত্বে আমরা 'ডেটা সার্বভৌমত্ব' নীতি অনুসরণ করি। অন্যান্য প্ল্যাটফর্মের বিপরীতে আমরা স্থানীয় সার্ভার কনফিগারেশন এবং প্রাইভেট AI অবকাঠামোকে (Local LLMs) অগ্রাধিকার দেই যাতে নাগরিক তথ্য আমাদের সুরক্ষিত পরিবেশে থাকে এবং কোনো তৃতীয় পক্ষের বাণিজ্যিক প্রতিষ্ঠান দ্বারা শোষিত না হয়।"
    },
    {
      icon: <Database className="w-6 h-6 text-primary" />,
      title: isEn ? "2. Information We Collect" : "২. আমরা যে তথ্য সংগ্রহ করি",
      content: isEn
        ? "To provide a transparent governance monitoring system, we collect voluntary citizen feedback, anonymized technical data (logs, IP addresses), and aggregated data points for the Nagorik AI Dataset contributions."
        : "একটি স্বচ্ছ শাসন ব্যবস্থা পর্যবেক্ষণের জন্য আমরা স্বেচ্ছায় প্রদানকৃত নাগরিক মতামত, বেনামী প্রযুক্তিগত তথ্য এবং নাগরিক AI ডেটাসেটের জন্য সমষ্টিগত ডেটা পয়েন্ট সংগ্রহ করি।"
    },
    {
      icon: <FileText className="w-6 h-6 text-primary" />,
      title: isEn ? "3. How We Use Your Information" : "৩. আমরা কীভাবে আপনার তথ্য ব্যবহার করি",
      content: isEn
        ? "The information we collect is used strictly for research and civic impact purposes: analyzing government service delivery, building the Nagorik AI dataset for machine learning, and providing data-driven insights for policy reform. We do not sell or trade personal data."
        : "আমাদের সংগৃহীত তথ্য কঠোরভাবে গবেষণা এবং নাগরিক প্রভাবের উদ্দেশ্যে ব্যবহৃত হয়: সরকারি পরিষেবা বিশ্লেষণ, মেশিন লার্নিংয়ের জন্য নাগোরিক AI ডেটাসেট তৈরি এবং নীতি সংস্কারের জন্য তথ্য-চালিত অন্তর্দৃষ্টি প্রদান। আমরা ব্যক্তিগত তথ্য বিক্রি বা লেনদেন করি না।"
    },
    {
      icon: <Lock className="w-6 h-6 text-primary" />,
      title: isEn ? "4. Data Security and AI Governance" : "৪. ডেটা নিরাপত্তা এবং AI গভর্নেন্স",
      content: isEn
        ? "We implement high-level security protocols including strict anonymization of the Nagorik AI primary dataset, local processing via quantized models (Llama 3, DeepSeek) to minimize public cloud exposure, and industry-standard SSL/TLS encryption."
        : "আমরা উচ্চ-স্তরের নিরাপত্তা প্রোটোকল বাস্তবায়ন করি যার মধ্যে রয়েছে ডেটাসেটের কঠোর বেনামীকরণ, পাবলিক ক্লাউড এক্সপোজার কমাতে লোকাল হার্ডওয়্যারে কোয়ান্টাইজড মডেলের (Llama 3, DeepSeek) মাধ্যমে প্রসেসিং এবং স্ট্যান্ডার্ড SSL/TLS এনক্রিপশন।"
    },
    {
      icon: <UserCheck className="w-6 h-6 text-primary" />,
      title: isEn ? "6. User Rights" : "৬. ব্যবহারকারীর অধিকার",
      content: isEn
        ? "Users have the right to request information about how data is being used, request deletion of personal feedback, and opt-out of non-essential data collection."
        : "ব্যবহারকারীদের অধিকার আছে তাদের তথ্য কীভাবে ব্যবহৃত হচ্ছে তা জানার, ব্যক্তিগত মতামত মুছে ফেলার অনুরোধ করার এবং অপ্রয়োজনীয় তথ্য সংগ্রহ থেকে বিরত থাকার।"
    }
  ];

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* Header Section */}
      <section className="pt-32 pb-16 px-6 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto space-y-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-4"
          >
            <ShieldCheck className="w-7 h-7 text-primary" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-slate-900"
          >
            {isEn ? "Privacy Policy" : "গোপনীয়তা নীতি"}
          </motion.h1>
          <div className="flex flex-wrap gap-6 text-sm font-bold text-slate-400 uppercase tracking-widest">
            <span className="flex items-center gap-2"><Info className="w-4 h-4" /> Effective: May 6, 2026</span>
            <span className="flex items-center gap-2 font-black text-primary"><Fingerprint className="w-4 h-4" /> Version 2.1.0</span>
          </div>
        </div>
      </section>

      {/* Intro Text */}
      <section className="py-12 px-6 max-w-4xl mx-auto">
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-lg text-slate-600 font-medium leading-relaxed italic border-l-4 border-primary pl-6"
        >
          {isEn 
            ? "At Insights Bangladesh (insightsbangladesh.com), we prioritize the privacy and security of our users. This policy outlines how we protect information within our ecosystem, including the NagorikBD portal and the Nagorik AI dataset initiative."
            : "ইনসাইটস বাংলাদেশ (insightsbangladesh.com)-এ আমরা আমাদের ব্যবহারকারীদের গোপনীয়তা এবং নিরাপত্তাকে অগ্রাধিকার দেই। এই নীতিটি আমাদের ইকোসিস্টেমের মধ্যে কীভাবে তথ্য সুরক্ষিত করি তা বর্ণনা করে।"}
        </motion.p>
      </section>

      {/* Policy Sections */}
      <section className="pb-24 px-6 max-w-4xl mx-auto space-y-12">
        {sections.map((section, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
            className="p-8 md:p-12 rounded-[2.5rem] bg-white border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow group"
          >
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-14 h-14 shrink-0 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-primary/5 transition-colors">
                {section.icon}
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-black text-slate-900 group-hover:text-primary transition-colors">
                  {section.title}
                </h3>
                <p className="text-slate-600 font-medium leading-relaxed">
                  {section.content}
                </p>
              </div>
            </div>
          </motion.div>
        ))}

        {/* SDG Section Specific Layout */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-12 rounded-[3rem] bg-slate-900 text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] -mr-32 -mt-32" />
          <div className="relative z-10 space-y-6">
            <h3 className="text-2xl font-black">{isEn ? "5. SDG Alignment & Ethical Data Use" : "৫. SDG অ্যালাইনমেন্ট এবং নৈতিক ডেটা ব্যবহার"}</h3>
            <p className="text-white/70 font-medium leading-relaxed">
              {isEn 
                ? "Our data practices are aligned with UN SDG 16 (Peace, Justice, and Strong Institutions). We ensure that our data collection serves the public good by fostering transparency and reducing corruption through evidence-based reporting."
                : "আমাদের ডেটা পদ্ধতিগুলো UN SDG ১৬-এর সাথে সামঞ্জস্যপূর্ণ। আমরা নিশ্চিত করি যে আমাদের তথ্য সংগ্রহ জনকল্যাণে কাজ করে এবং প্রমাণ-ভিত্তিক রিপোর্টিংয়ের মাধ্যমে স্বচ্ছতা বৃদ্ধি করে।"
              }
            </p>
          </div>
        </motion.div>

        {/* Contact info card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-12 rounded-[3rem] bg-emerald-50 border border-emerald-100 flex flex-col md:flex-row justify-between items-center gap-8"
        >
          <div className="space-y-2 text-center md:text-left">
            <h4 className="text-xl font-black text-slate-900">{isEn ? "Have Questions?" : "প্রশ্ন আছে?"}</h4>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">{isEn ? "Contact our AI Governance Team" : "আমাদের AI গভর্নেন্স টিমের সাথে যোগাযোগ করুন"}</p>
          </div>
          <div className="flex flex-col gap-3 w-full md:w-auto">
            <a href="mailto:director@nagorikbd.org" className="bg-white px-8 py-4 rounded-2xl border border-emerald-200 flex items-center justify-center gap-3 font-black text-emerald-700 hover:bg-emerald-50 transition-all shadow-sm">
              <Mail className="w-5 h-5" /> director@nagorikbd.org
            </a>
            <div className="text-center md:text-right">
              <div className="text-xs font-black text-slate-400 uppercase tracking-tighter">Insights Bangladesh</div>
              <div className="text-xs font-bold text-slate-400">Lead: Ahmad Rafi</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Important Disclaimer */}
      <section className="py-12 px-6 max-w-4xl mx-auto border-t border-slate-200">
        <div className="flex gap-4 items-start text-xs text-slate-400 font-bold leading-relaxed">
          <ShieldAlert className="w-10 h-10 shrink-0 text-slate-300" />
          <p>
            {isEn 
              ? "This portal may contain links to government websites or international research databases. We are not responsible for the privacy practices of these external sites. As we scale our operations and secure further funding, we may update this policy to reflect new technologies or regulatory requirements."
              : "এই পোর্টালে সরকারি ওয়েবসাইট বা আন্তর্জাতিক গবেষণা ডাটাবেসের লিঙ্ক থাকতে পারে। আমরা সেই সাইটগুলোর গোপনীয়তা রক্ষার জন্য দায়ী নই। আমরা এই নীতিমালার নিয়মিত আপডেট করতে পারি।"}
          </p>
        </div>
      </section>
    </div>
  );
}
