import React from 'react';
import { motion } from 'framer-motion';

const TermsOfService: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="bg-sky-950 text-white py-32 px-4 text-center relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10"
        >
          <span className="text-sky-400 font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Compliance</span>
          <h1 className="text-6xl font-black mb-4 tracking-tighter">Terms of Service</h1>
          <p className="text-sky-100/60 font-bold uppercase tracking-[0.2em] text-[10px]">Last Updated: January 1, 2024</p>
        </motion.div>
        <div className="absolute inset-0 bg-sky-900 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      </div>

      <section className="py-24 max-w-4xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-[56px] p-12 md:p-20 shadow-sm border border-sky-50 space-y-12"
        >
          <div className="space-y-6">
            <h2 className="text-3xl font-black text-sky-950 tracking-tight uppercase border-b border-slate-100 pb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600 leading-relaxed">
              By accessing the Skin Care OPD website and utilizing our online appointment booking system, you agree to be bound by these Terms of Service. If you do not agree, please refrain from using our digital services.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-black text-sky-950 tracking-tight uppercase border-b border-slate-100 pb-4">2. Appointment Booking</h2>
            <p className="text-gray-600 leading-relaxed">
              Tokens generated via this platform are sequential. Patients are requested to arrive at least 15 minutes prior to their allocated slot. The clinic reserves the right to adjust slot timings based on clinical emergencies.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-black text-sky-950 tracking-tight uppercase border-b border-slate-100 pb-4">3. Cancellation & Refunds</h2>
            <p className="text-gray-600 leading-relaxed">
              Cancellations must be made at least 4 hours before the scheduled time. Refunds for online payments are processed within 5-7 business days, subject to a nominal administrative fee. Cash payments made at the counter are non-refundable once the consultation is completed.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-black text-sky-950 tracking-tight uppercase border-b border-slate-100 pb-4">4. Patient Conduct</h2>
            <p className="text-gray-600 leading-relaxed">
              Patients are expected to maintain decorum within the clinic premises. Misbehavior with staff or other patients may lead to immediate cancellation of the appointment without refund and possible legal action.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-black text-sky-950 tracking-tight uppercase border-b border-slate-100 pb-4">5. Disclaimer</h2>
            <p className="text-gray-600 leading-relaxed">
              The information on this website is for general awareness and does not substitute professional medical advice. Always consult with our specialists for diagnosis and treatment plans. Skin Care OPD is not liable for outcomes based solely on the information provided on this website.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-black text-sky-950 tracking-tight uppercase border-b border-slate-100 pb-4">6. Jurisdiction</h2>
            <p className="text-gray-600 leading-relaxed">
              These terms are governed by the laws of India. Any disputes arising shall be subject to the exclusive jurisdiction of the courts in Brahmapur, Odisha.
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default TermsOfService;