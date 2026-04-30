import { Facebook, Youtube, Mail, Phone, MapPin, ExternalLink, ShieldCheck, BarChart3, MessageSquare, CheckSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#11291d] text-slate-300 pt-20 pb-12 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        {/* Brand Section */}
        <div className="mb-14">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center p-2 shadow-lg">
              <img 
                src="input_file_1.png" 
                alt="Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <h3 className="text-2xl font-bold text-white leading-tight">নাগরিক বিডি</h3>
              <span className="text-[13px] text-white/70 font-medium">টাঙ্গাইল জেলা পোর্টাল</span>
            </div>
          </div>
          <p className="text-white/70 text-[15px] leading-relaxed max-w-2xl font-medium">
            টাঙ্গাইল জেলার ডিজিটাল নাগরিক প্ল্যাটফর্ম — সরকারি সেবা সহজীকরণ ও নাগরিক অংশগ্রহণ নিশ্চিত করার একটি উদ্যোগ।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16">
          {/* Quick Links */}
          <div>
            <h4 className="text-[#ffda7c] text-lg font-bold mb-6">দ্রুত লিংক</h4>
            <ul className="space-y-4">
              {[
                { name: 'সেবাসমূহ', path: '/services' },
                { name: 'উপজেলা', path: '/' },
                { name: 'নোটিশ', path: '/notices' },
                { name: 'Nagorik AI', path: '#' },
              ].map((link, i) => (
                <li key={i}>
                  <Link to={link.path} className="text-white/70 hover:text-white transition-all font-medium text-[15px]">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Important Links */}
          <div>
            <h4 className="text-[#ffda7c] text-lg font-bold mb-6">গুরুত্বপূর্ণ</h4>
            <ul className="space-y-4">
              {[
                { name: 'জাতীয় তথ্য বাতায়ন', path: 'https://bangladesh.gov.bd/' },
                { name: 'NID সেবা', path: 'https://services.nidw.gov.bd/nid-pub/' },
                { name: 'জন্ম নিবন্ধন', path: 'https://bdris.gov.bd/' },
                { name: 'ভূমি সেবা', path: 'https://land.gov.bd/' },
              ].map((link, i) => (
                <li key={i}>
                  <a href={link.path} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-all font-medium text-[15px]">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#ffda7c] text-lg font-bold mb-6">যোগাযোগ</h4>
            <ul className="space-y-4">
              <li className="flex gap-3 items-start">
                <MapPin className="w-5 h-5 text-white/60 shrink-0 mt-0.5" />
                <span className="text-white/70 font-medium text-[15px]">জেলা প্রশাসকের কার্যালয়, টাঙ্গাইল</span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone className="w-5 h-5 text-white/60 shrink-0" />
                <span className="text-white/70 font-medium text-[15px]">৯৯৯ (জরুরি সেবা)</span>
              </li>
              <li className="flex gap-3 items-center">
                <Mail className="w-5 h-5 text-white/60 shrink-0" />
                <a href="mailto:info@nagorikbd.org" className="text-white/70 hover:text-white transition-colors font-medium text-[15px]">info@nagorikbd.org</a>
              </li>
            </ul>
            <div className="flex gap-3 mt-6">
              <a href="https://www.facebook.com/share/1CyG6Fmcpe/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 transition-all">
                <Facebook className="w-5 h-5 text-white/80" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 transition-all">
                <Youtube className="w-5 h-5 text-white/80" />
              </a>
            </div>
          </div>

          {/* Partner Network */}
          <div className="lg:col-span-1 border border-white/10 p-6 rounded-2xl bg-white/[0.02]">
            <h4 className="text-[#ffda7c] text-lg font-bold mb-2">পার্টনার নেটওয়ার্ক</h4>
            <p className="text-white/60 text-sm mb-6">নাগরিক বিডি পরিবারের অন্যান্য প্ল্যাটফর্ম</p>
            
            <div className="space-y-4">
              <a href="https://nagorikbd.org" target="_blank" rel="noopener noreferrer" className="block bg-[#1a3826] border border-white/5 p-4 rounded-xl hover:bg-[#1f402c] transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-[#ffda7c]" />
                  </div>
                  <div>
                    <h5 className="text-white font-bold text-[15px] flex items-center gap-2">Nagorik BD <ExternalLink className="w-3.5 h-3.5 text-white/40 group-hover:text-white/80" /></h5>
                    <p className="text-white/50 text-[13px] mt-0.5">ডিজিটাল নাগরিক প্ল্যাটফর্ম</p>
                  </div>
                </div>
              </a>

              <a href="https://insightsbangladesh.com" target="_blank" rel="noopener noreferrer" className="block bg-[#1a3826] border border-white/5 p-4 rounded-xl hover:bg-[#1f402c] transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center shrink-0">
                    <BarChart3 className="w-5 h-5 text-[#ffda7c]" />
                  </div>
                  <div>
                    <h5 className="text-white font-bold text-[15px] flex items-center gap-2">Insights Bangladesh <ExternalLink className="w-3.5 h-3.5 text-white/40 group-hover:text-white/80" /></h5>
                    <p className="text-white/50 text-[13px] mt-0.5">ডেটা, রিসার্চ ও অন্তর্দৃষ্টি</p>
                  </div>
                </div>
              </a>

              <a href="https://talkbangladesh.com" target="_blank" rel="noopener noreferrer" className="block bg-[#1a3826] border border-white/5 p-4 rounded-xl hover:bg-[#1f402c] transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5 text-[#ffda7c]" />
                  </div>
                  <div>
                    <h5 className="text-white font-bold text-[15px] flex items-center gap-2">Talk Bangladesh <ExternalLink className="w-3.5 h-3.5 text-white/40 group-hover:text-white/80" /></h5>
                    <p className="text-white/50 text-[13px] mt-0.5">সোশ্যাল কমিউনিটি প্ল্যাটফর্ম</p>
                  </div>
                </div>
              </a>

              <a href="https://factcheckbd.org" target="_blank" rel="noopener noreferrer" className="block bg-[#1a3826] border border-white/5 p-4 rounded-xl hover:bg-[#1f402c] transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center shrink-0">
                    <CheckSquare className="w-5 h-5 text-[#ffda7c]" />
                  </div>
                  <div>
                    <h5 className="text-white font-bold text-[15px] flex items-center gap-2">Fact Check BD <ExternalLink className="w-3.5 h-3.5 text-white/40 group-hover:text-white/80" /></h5>
                    <p className="text-white/50 text-[13px] mt-0.5">ফ্যাক্ট চেকিং প্ল্যাটফর্ম</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-[13px] font-medium text-center md:text-left">
            &copy; {currentYear} নাগরিক বিডি — টাঙ্গাইল জেলা পোর্টাল। সর্বস্বত্ব সংরক্ষিত।
          </p>
          <div className="flex items-center gap-6 text-[13px] font-medium text-white/50">
            <button className="hover:text-white/80 transition-colors">গোপনীয়তা নীতি</button>
            <button className="hover:text-white/80 transition-colors">শর্তাবলী</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
