import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ClipboardList, CheckCircle2, ChevronRight } from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { toast } from 'react-hot-toast';

const QUESTIONS = [
  {
    id: 'biggestIssue',
    title: 'আপনার এলাকায় সবচেয়ে বেশি সমস্যা কিসের?',
    options: [
      'রাস্তাঘাট ও ড্রেনেজ সমস্যা',
      'বিদ্যুৎ ও পানি সরবরাহ',
      'মাদক ও কিশোর গ্যাং',
      'বেকারত্ব ও কর্মসংস্থান',
      'দুর্নীতি ও ঘুষ'
    ]
  },
  {
    id: 'worstDepartment',
    title: 'কোন সরকারি দপ্তরে হয়রানি বেশি হচ্ছে?',
    options: [
      'ভূমি অফিস',
      'থানা / পুলিশ স্টেশন',
      'পাসপোর্ট অফিস',
      'বিআরটিএ (BRTA)',
      'সরকারি হাসপাতাল'
    ]
  },
  {
    id: 'digitalizationNeed',
    title: 'সরকারি সেবা পেতে আপনার সবচেয়ে বড় বাঁধা কি?',
    options: [
      'সঠিক তথ্যের অভাব',
      'দালাল চক্রের দৌরাত্ম্য',
      'অতিরিক্ত অর্থ আদায়',
      'দীর্ঘ সময় ও সিরিয়াল'
    ]
  },
  {
    id: 'lastHarassment',
    title: 'শেষ কবে সেবা পেতে হয়রানির শিকার হয়েছেন?',
    options: [
      'গত এক সপ্তাহে',
      'গত এক মাসে',
      'গত ছয় মাসে',
      'কখনোই না'
    ]
  }
];

export default function CitizenSurveyModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Check if user should see the survey
    const hasCompletedSurvey = localStorage.getItem('nagorik_survey_completed');
    if (hasCompletedSurvey) return;

    let visitCount = parseInt(localStorage.getItem('nagorik_visit_count') || '0', 10);
    
    // Using sessionStorage to define a "session"
    const hasVisitedThisSession = sessionStorage.getItem('nagorik_session_active');
    
    if (!hasVisitedThisSession) {
      visitCount += 1;
      localStorage.setItem('nagorik_visit_count', visitCount.toString());
      sessionStorage.setItem('nagorik_session_active', 'true');
    }

    if (visitCount >= 2) {
      // Show slightly delayed
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSelectOption = (option: string) => {
    const questionId = QUESTIONS[currentStep].id;
    setAnswers(prev => ({ ...prev, [questionId]: option }));
  };

  const handleNext = async () => {
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      await submitSurvey();
    }
  };

  const submitSurvey = async () => {
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'citizen_surveys'), {
        ...answers,
        createdAt: new Date().toISOString()
      });
      localStorage.setItem('nagorik_survey_completed', 'true');
      toast.success('আপনার অভিমত সফলভাবে জমা হয়েছে। ধন্যবাদ!');
      setIsOpen(false);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'citizen_surveys');
      toast.error('দুঃখিত, তথ্য জমা দেওয়া সম্ভব হয়নি।');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleSkip = () => {
    setIsOpen(false);
    // Ask again next time, so we don't set 'nagorik_survey_completed'
  };

  if (!isOpen) return null;

  const currentQuestion = QUESTIONS[currentStep];
  const hasAnsweredCurrent = !!answers[currentQuestion.id];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 p-6 text-white text-center relative">
             <button 
                onClick={handleSkip}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-colors"
                title="পরে অংশ নিন"
              >
                <X className="w-5 h-5 opacity-80 hover:opacity-100" />
              </button>
             <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                <ClipboardList className="w-6 h-6 text-white" />
             </div>
             <h3 className="text-xl font-bold tracking-tight">নাগরিক জরিপ</h3>
             <p className="text-emerald-100 text-xs mt-2 font-medium">আপনার এলাকার সমস্যাগুলো চিহ্নিত করতে সাহায্য করুন</p>
             
             {/* Progress bar */}
             <div className="mt-6 flex gap-1 px-4">
               {QUESTIONS.map((_, idx) => (
                 <div key={idx} className="h-1.5 flex-1 rounded-full bg-white/20 overflow-hidden">
                   {idx <= currentStep && (
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        className="h-full bg-white"
                      />
                   )}
                 </div>
               ))}
             </div>
          </div>

          {/* Question Area */}
          <div className="p-6 md:p-8 flex-1 bg-slate-50">
             <motion.div
               key={currentStep}
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -20 }}
               transition={{ duration: 0.3 }}
             >
               <h4 className="text-lg font-bold text-slate-800 mb-6 text-center leading-tight">
                 {currentQuestion.title}
               </h4>
               
               <div className="space-y-3">
                 {currentQuestion.options.map((option, idx) => {
                   const isSelected = answers[currentQuestion.id] === option;
                   return (
                     <button
                       key={idx}
                       onClick={() => handleSelectOption(option)}
                       className={`w-full p-4 rounded-xl text-left font-medium transition-all flex items-center justify-between border ${
                         isSelected 
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-900 shadow-sm shadow-emerald-500/10' 
                          : 'border-slate-200 bg-white text-slate-700 hover:border-emerald-300 hover:bg-emerald-50/50'
                       }`}
                     >
                       <span>{option}</span>
                       <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                         isSelected ? 'border-emerald-500 bg-emerald-500' : 'border-slate-300'
                       }`}>
                         {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                       </div>
                     </button>
                   );
                 })}
               </div>
             </motion.div>
          </div>

          {/* Footer Controls */}
          <div className="p-6 bg-white border-t border-slate-100">
             <button
               onClick={handleNext}
               disabled={!hasAnsweredCurrent || isSubmitting}
               className="w-full py-3.5 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20"
             >
               {isSubmitting ? 'জমা দেওয়া হচ্ছে...' : currentStep === QUESTIONS.length - 1 ? 'জমা দিন' : 'পরবর্তী প্রশ্ন'} 
               {!isSubmitting && currentStep !== QUESTIONS.length - 1 && <ChevronRight className="w-4 h-4" />}
             </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
