import React from 'react';
import { motion } from 'motion/react';
import { 
  Shield, 
  Target, 
  Users, 
  Cpu, 
  Globe, 
  Lock, 
  Scale, 
  Eye, 
  TrendingUp,
  Award,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Transparency() {
  const { language } = useLanguage();

  const isEn = language === 'en';

  const sections = [
    {
      icon: <Target className="w-8 h-8 text-primary" />,
      title: isEn ? "Our Vision: Building a Transparent & Accountable Nation" : "আমাদের লক্ষ্য: একটি স্বচ্ছ ও জবাবদিহিমূলক জাতি গঠন",
      content: isEn ? "At Insights Bangladesh, our vision is to transform Bangladesh into a modern, transparent, and accountable nation by leveraging the power of data and Artificial Intelligence. We believe that true development is not just about physical infrastructure; it is about building high-trust institutions and empowering citizens through digital sovereignty." : "ইনসাইটস বাংলাদেশ-এ আমাদের লক্ষ্য হলো তথ্য এবং কৃত্রিম বুদ্ধিমত্তার (AI) শক্তি ব্যবহার করে বাংলাদেশকে একটি আধুনিক, স্বচ্ছ এবং জবাবদিহিমূলক রাষ্ট্রে রূপান্তর করা। আমরা বিশ্বাস করি যে প্রকৃত উন্নয়ন কেবল ভৌত অবকাঠামোর মধ্যে সীমাবদ্ধ নয়; এটি উচ্চ-আস্থা সম্পন্ন প্রতিষ্ঠান গড়ে তোলা এবং ডিজিটাল সার্বভৌমত্বের মাধ্যমে নাগরিকদের ক্ষমতায়ন করার বিষয়।"
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: isEn ? "Leadership & Expertise" : "নেতৃত্ব এবং দক্ষতা",
      content: isEn ? "The institution is led by Nafiul Ahmad Rafi (Nafiul Rafi), a prominent AI Governance Researcher, Digital Architect, and Strategy Specialist. Ahmad Rafi (Founder & Lead Analyst): With an extensive background in AI infrastructure and strategic research, Ahmad Rafi focuses on the ethical implementation of Large Language Models (LLMs) and Open-Source Intelligence (OSINT). His work is dedicated to creating 'Minimalist Authority' in digital systems—ensuring they are authoritative, secure, and user-centric." : "প্রতিষ্ঠানটি নাফিউল আহমদ রাফি (নাফিউল রাফি)-এর নেতৃত্বে পরিচালিত হচ্ছে, যিনি একজন প্রখ্যাত AI গভর্নেন্স গবেষক, ডিজিটাল আর্কিটেক্ট এবং স্ট্র্যাটেজি স্পেশালিস্ট। আহমদ রাফি (প্রতিষ্ঠাতা ও প্রধান বিশ্লেষক): AI অবকাঠামো এবং কৌশলগত গবেষণায় বিস্তৃত অভিজ্ঞতাসম্পন্ন আহমদ রাফি মূলত লার্জ ল্যাঙ্গুয়েজ মডেল (LLMs) এবং ওপেন-সোর্স ইন্টেলিজেন্স (OSINT)-এর নৈতিক বাস্তবায়নের ওপর কাজ করেন। তাঁর কাজ ডিজিটাল সিস্টেমে 'মিনিমালিস্ট অথরিটি' তৈরির প্রতি নিবেদিত—যা নিশ্চিত করে যে সিস্টেমগুলো হবে নির্ভরযোগ্য, নিরাপদ এবং জনমুখী।"
    },
    {
      icon: <Cpu className="w-8 h-8 text-primary" />,
      title: isEn ? "The Nagorik AI Initiative" : "নাগরিক AI উদ্যোগ",
      content: isEn ? "Currently, Insights Bangladesh is operated through personal investment, maintaining 100% independence from external influence. We are now building Nagorik AI, a groundbreaking project under our NagorikBD portal. We are developing a specialized dataset designed to train AI models on governance, public service delivery, and citizen rights in the context of Bangladesh. This dataset will serve as a digital public good, enabling automated monitoring of district-wise development." : "বর্তমানে ইনসাইটস বাংলাদেশ ব্যক্তিগত বিনিয়োগের মাধ্যমে পরিচালিত হচ্ছে, যা বাহ্যিক প্রভাব থেকে ১০০% স্বাধীনতা বজায় রাখতে সহায়তা করে। আমরা এখন আমাদের নাগরিকবিডি পোর্টালের অধীনে একটি যুগান্তকারী প্রকল্প 'নাগরিক AI' তৈরি করছি। আমরা একটি বিশেষায়িত ডেটাসেট তৈরি করছি যা বাংলাদেশের প্রেক্ষাপটে সুশাসন, জনসেবা প্রদান এবং নাগরিক অধিকারের ওপর AI মডেলগুলোকে প্রশিক্ষণ দেবে। এই ডেটাসেটটি একটি ডিজিটাল পাবলিক গুড হিসেবে কাজ করবে।"
    }
  ];

  const sdgs = [
    {
      id: "SDG 16",
      title: isEn ? "Peace, Justice, and Strong Institutions" : "শান্তি, ন্যায়বিচার এবং শক্তিশালী প্রতিষ্ঠানসমূহ",
      desc: isEn ? "Strengthening institutional accountability through AI-driven monitoring." : "AI-চালিত পর্যবেক্ষণের মাধ্যমে প্রাতিষ্ঠানিক জবাবদিহিতা শক্তিশালী করা।"
    },
    {
      id: "SDG 11",
      title: isEn ? "Sustainable Cities and Communities" : "টেকসই শহর ও জনপদ",
      desc: isEn ? "Promoting citizen-centric urban and rural governance via the NagorikBD platform." : "নাগরিকবিডি প্ল্যাটফর্মের মাধ্যমে নাগরিক-কেন্দ্রিক নগর ও গ্রামীণ সুশাসন নিশ্চিত করা।"
    },
    {
      id: "SDG 9",
      title: isEn ? "Industry, Innovation, and Infrastructure" : "শিল্প, উদ্ভাবন ও অবকাঠামো",
      desc: isEn ? "Building the AI infrastructure necessary for a modern, data-driven Bangladesh." : "একটি আধুনিক ও তথ্য-চালিত বাংলাদেশের জন্য প্রয়োজনীয় AI অবকাঠামো তৈরি করা।"
    }
  ];

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 overflow-hidden text-white">
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '48px 48px' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold tracking-widest uppercase mb-8"
          >
            <Shield className="w-4 h-4 text-primary" /> 
            {isEn ? "Transparency & Governance" : "স্বচ্ছতা ও সুশাসন"}
          </motion.div>
          
          <div className="max-w-3xl">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-black mb-8 leading-tight"
            >
              Building a <span className="text-primary italic">Trusted</span> Digital Future.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-white/70 leading-relaxed font-medium"
            >
              Insights Bangladesh is a non-profit governance research institution dedicated to digital sovereignty and institutional accountability.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {sections.map((section, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-10 rounded-[3rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col items-start gap-6 group hover:border-primary/20 transition-all"
            >
              <div className="w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                {section.icon}
              </div>
              <h3 className="text-2xl font-black text-slate-900 leading-tight">
                {section.title}
              </h3>
              <p className="text-slate-600 leading-relaxed font-medium">
                {section.content}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* AI Initiative Details */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto rounded-[4rem] bg-white border border-slate-100 p-12 md:p-24 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] -mr-48 -mt-48" />
          
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-primary/5 text-primary text-sm font-black uppercase tracking-widest">
                <Cpu className="w-5 h-5" /> Nagorik AI
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
                Revolutionizing <br/> <span className="text-primary italic">Civic Impact</span>
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="mt-1 p-1 bg-emerald-100 text-emerald-600 rounded-lg">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 mb-1">Data Sovereignty</h4>
                    <p className="text-sm text-slate-600 font-medium leading-relaxed">
                      Utilizing local server configurations and quantized LLMs (like DeepSeek and Llama 3) to ensure sensitive citizen data remains secure within national borders.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1 p-1 bg-emerald-100 text-emerald-600 rounded-lg">
                    <Scale className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 mb-1">Ethical Framework</h4>
                    <p className="text-sm text-slate-600 font-medium leading-relaxed">
                      Open source intelligence for automated monitoring of district-wise development and identifying gaps in government accountability.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-slate-900 rounded-[3rem] p-8 md:p-12 text-white relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-50" />
              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-4 text-primary">
                  <Award className="w-8 h-8" />
                  <span className="font-black tracking-[0.2em] uppercase text-xs">Innovation Standards</span>
                </div>
                <p className="text-xl font-medium leading-relaxed italic opacity-90">
                  "Our work is dedicated to creating 'Minimalist Authority' in digital systems—ensuring they are authoritative, secure, and user-centric."
                </p>
                <div className="pt-8 border-t border-white/10 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center font-black text-lg">NR</div>
                  <div>
                    <div className="font-black">Nafiul Rafi</div>
                    <div className="text-xs opacity-50 uppercase tracking-widest font-bold">Founder & Lead Analyst</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SDG Commitment */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-[0.3em] text-xs">
            <Globe className="w-4 h-4" /> Global Standards
          </div>
          <h2 className="text-4xl font-black text-slate-900">SDG Commitment</h2>
          <p className="text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
            Our initiatives are directly aligned with the United Nations Sustainable Development Goals to build a sustainable and just future.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sdgs.map((sdg, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="p-8 rounded-[2.5rem] bg-emerald-50 border border-emerald-100 flex flex-col items-center text-center gap-4"
            >
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center font-black text-emerald-600 shadow-sm">
                {sdg.id}
              </div>
              <h4 className="text-lg font-black text-slate-900 leading-tight">{sdg.title}</h4>
              <p className="text-xs text-slate-600 font-bold leading-relaxed">{sdg.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Institutional Integrity */}
      <section className="py-24 px-6 max-w-7xl mx-auto border-t border-slate-100">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <div className="space-y-4">
            <h4 className="text-xl font-black flex items-center gap-2 text-slate-900">
              <Shield className="w-6 h-6 text-primary" /> Non-Profit Mission
            </h4>
            <p className="text-slate-600 text-sm font-medium leading-relaxed">
              Insights Bangladesh is a dedicated non-profit governance research institution, maintaining total independence from commercial or external political influence.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-xl font-black flex items-center gap-2 text-slate-900">
              <Eye className="w-6 h-6 text-primary" /> Data Ethics
            </h4>
            <p className="text-slate-600 text-sm font-medium leading-relaxed">
              We prioritize the privacy of every citizen. Our "Privacy by Design" approach ensures that while we track institutional performance, individual identities are protected.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-xl font-black flex items-center gap-2 text-slate-900">
              <BookOpen className="w-6 h-6 text-primary" /> Open Access
            </h4>
            <p className="text-slate-600 text-sm font-medium leading-relaxed">
              We are committed to making our governance research available to policymakers and the general public to foster a culture of evidence-based decision-making.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto rounded-[3rem] bg-slate-900 text-white p-12 md:p-20 text-center space-y-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-emerald-900/30 opacity-50" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black leading-tight">
              Join Us in Building <br/>
              <span className="text-primary italic">High-Trust Institutions.</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto font-medium pt-4">
              Explore our NagorikBD portal to see how data and AI are reshaping governance in real-time.
            </p>
            <div className="pt-10">
              <button 
                onClick={() => window.scrollTo(0, 0)}
                className="bg-primary text-white font-black px-12 py-5 rounded-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-3 group"
              >
                Back to Top <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
