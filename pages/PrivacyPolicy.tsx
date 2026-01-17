import React from 'react';
import { motion } from 'framer-motion';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="bg-sky-950 text-white py-32 px-4 text-center relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10"
        >
          <span className="text-sky-400 font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Legal Documentation</span>
          <h1 className="text-6xl font-black mb-4 tracking-tighter">Privacy Policy</h1>
          <p className="text-sky-100/60 font-bold uppercase tracking-[0.2em] text-[10px]">Effective Date: January 1, 2024</p>
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
            <h2 className="text-3xl font-black text-sky-950 tracking-tight uppercase border-b border-slate-100 pb-4">1. Introduction</h2>
            <p className="text-gray-600 leading-relaxed">
              At Skin Care OPD, we are committed to protecting your personal and medical information. This Privacy Policy outlines how we collect, use, and safeguard your data when you use our website and appointment services.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-black text-sky-950 tracking-tight uppercase border-b border-slate-100 pb-4">2. Information We Collect</h2>
            <p className="text-gray-600 leading-relaxed">
              We collect information to provide better medical services to our patients. This includes:
            </p>
            <ul className="list-disc list-inside space-y-4 text-gray-600 font-medium">
              <li><span className="text-sky-950 font-bold">Personal Identity:</span> Name, phone number, and email address provided during booking.</li>
              <li><span className="text-sky-950 font-bold">Appointment Data:</span> Choice of specialist, date of visit, and consultation type.</li>
              <li><span className="text-sky-950 font-bold">Digital Data:</span> IP address, browser type, and usage patterns via cookies to improve site performance.</li>
            </ul>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-black text-sky-950 tracking-tight uppercase border-b border-slate-100 pb-4">3. Use of Information</h2>
            <p className="text-gray-600 leading-relaxed">
              Your data is used exclusively for:
            </p>
            <ul className="list-disc list-inside space-y-4 text-gray-600 font-medium">
              <li>Managing medical appointments and token generation.</li>
              <li>Sending appointment reminders and clinical updates via SMS or Email.</li>
              <li>Improving our patient care services and website functionality.</li>
              <li>Processing consultation payments and generating receipts.</li>
            </ul>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-black text-sky-950 tracking-tight uppercase border-b border-slate-100 pb-4">4. Patient Confidentiality</h2>
            <p className="text-gray-600 leading-relaxed">
              In accordance with medical ethics and Indian law, all health-related information is strictly confidential. We do not sell or share your personal health records with third-party marketing agencies. Data is only shared with medical staff directly involved in your care.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-black text-sky-950 tracking-tight uppercase border-b border-slate-100 pb-4">5. Security Measures</h2>
            <p className="text-gray-600 leading-relaxed">
              We implement industry-standard security protocols, including encryption and secure servers, to protect your data from unauthorized access or disclosure.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-black text-sky-950 tracking-tight uppercase border-b border-slate-100 pb-4">6. Contact Us</h2>
            <p className="text-gray-600 leading-relaxed">
              If you have any questions regarding your privacy, please contact our data protection officer at <span className="text-sky-600 font-bold">privacy@skincareopd.com</span> or visit our clinic in Brahmapur.
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;