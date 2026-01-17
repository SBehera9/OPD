
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MockDB } from '../lib/db';

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      // Simulate API call and save to MockDB
      setTimeout(() => {
        MockDB.saveInquiry(formData);
        setIsSubmitting(false);
        setSubmitted(true);
      }, 1500);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    setErrors({});
    setSubmitted(false);
  };

  const infoCards = [
    { icon: "📍", title: "Office Address", content: "Doctors Lane, Kali Mandir Rd, New Bus Stand Rd, Brahmapur, Odisha 760001" },
    { icon: "📞", title: "Make A Call", content: "+91 904 090 1236", sub: "0680 3560121" },
    { icon: "✉️", title: "24/7 Support", content: "care@skincareopd.com", sub: "response within 24 hours" }
  ];

  return (
    <div className="bg-white overflow-hidden">
      <div className="bg-sky-950 text-white py-32 px-4 text-center relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10"
        >
          <span className="text-sky-400 font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Connect With Us</span>
          <h1 className="text-6xl font-black mb-4 tracking-tighter">Get In Touch</h1>
          <p className="text-sky-100/60 font-bold uppercase tracking-[0.3em] text-[10px]">Home / Contact Us</p>
        </motion.div>
        <div className="absolute inset-0 bg-sky-900 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      </div>

      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-32">
          {infoCards.map((card, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -10 }}
              className="bg-slate-50 p-12 rounded-[56px] border border-transparent hover:border-sky-100 text-center flex flex-col items-center hover:shadow-2xl transition-all"
            >
              <div className="w-24 h-24 bg-white rounded-[32px] flex items-center justify-center text-4xl mb-8 shadow-sm">{card.icon}</div>
              <h4 className="text-2xl font-black text-sky-950 mb-4 tracking-tight">{card.title}</h4>
              <p className="text-gray-500 font-medium leading-relaxed max-w-[240px]">{card.content}</p>
              {card.sub && <p className="text-sky-600 font-black mt-4 text-[10px] uppercase tracking-widest bg-sky-100 px-4 py-1.5 rounded-full">{card.sub}</p>}
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-sky-600 font-black uppercase tracking-widest text-xs mb-4 block">Inquiry Form</span>
            <h2 className="text-5xl font-black text-sky-950 mb-12 leading-tight tracking-tight">Write us a Message</h2>
            
            <div className="bg-slate-50 p-10 md:p-12 rounded-[56px] shadow-sm border border-sky-50 relative min-h-[500px] flex flex-col justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100, transition: { duration: 0.3 } }}
                    onSubmit={handleSubmit} 
                    className="space-y-6 w-full"
                    noValidate
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-sky-950 px-2">Name*</label>
                        <input 
                          type="text" 
                          placeholder="Full Name" 
                          className={`w-full bg-white border-2 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-sky-100 transition-all outline-none font-bold ${errors.name ? 'border-red-400 bg-red-50' : 'border-transparent'}`} 
                          value={formData.name}
                          onChange={(e) => {
                            setFormData({...formData, name: e.target.value});
                            if (errors.name) setErrors({...errors, name: ''});
                          }}
                        />
                        {errors.name && <p className="text-red-500 text-[10px] font-black uppercase tracking-widest px-2">{errors.name}</p>}
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-sky-950 px-2">E-mail*</label>
                        <input 
                          type="email" 
                          placeholder="Email Address" 
                          className={`w-full bg-white border-2 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-sky-100 transition-all outline-none font-bold ${errors.email ? 'border-red-400 bg-red-50' : 'border-transparent'}`} 
                          value={formData.email}
                          onChange={(e) => {
                            setFormData({...formData, email: e.target.value});
                            if (errors.email) setErrors({...errors, email: ''});
                          }}
                        />
                        {errors.email && <p className="text-red-500 text-[10px] font-black uppercase tracking-widest px-2">{errors.email}</p>}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-sky-950 px-2">Phone</label>
                        <input 
                          type="tel" 
                          placeholder="Phone Number" 
                          className="w-full bg-white border-2 border-transparent rounded-2xl px-6 py-4 focus:ring-4 focus:ring-sky-100 transition-all outline-none font-bold" 
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-sky-950 px-2">Subject*</label>
                        <input 
                          type="text" 
                          placeholder="Purpose of message" 
                          className={`w-full bg-white border-2 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-sky-100 transition-all outline-none font-bold ${errors.subject ? 'border-red-400 bg-red-50' : 'border-transparent'}`} 
                          value={formData.subject}
                          onChange={(e) => {
                            setFormData({...formData, subject: e.target.value});
                            if (errors.subject) setErrors({...errors, subject: ''});
                          }}
                        />
                        {errors.subject && <p className="text-red-500 text-[10px] font-black uppercase tracking-widest px-2">{errors.subject}</p>}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-sky-950 px-2">Message</label>
                      <textarea 
                        placeholder="Type your message here..." 
                        rows={5} 
                        className="w-full bg-white border-2 border-transparent rounded-[32px] px-8 py-6 focus:ring-4 focus:ring-sky-100 transition-all outline-none font-bold resize-none"
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                      ></textarea>
                    </div>
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-sky-600 text-white px-12 py-5 rounded-full font-black text-lg uppercase tracking-widest hover:bg-sky-700 transition-all shadow-xl shadow-sky-600/20 flex items-center justify-center gap-4"
                    >
                      {isSubmitting ? (
                        <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : 'Send Message'}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    exit={{ opacity: 0, scale: 1.1, transition: { duration: 0.3 } }}
                    transition={{ type: "spring", damping: 15, stiffness: 100 }}
                    className="text-center py-10 w-full"
                  >
                    <motion.div 
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ 
                        type: "spring", 
                        damping: 12, 
                        stiffness: 200, 
                        delay: 0.3 
                      }}
                      className="w-32 h-32 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-10 text-5xl shadow-[0_20px_40px_rgba(16,185,129,0.3)] border-8 border-white"
                    >
                      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <motion.path 
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.5, delay: 0.6 }}
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth="3.5" 
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </motion.div>
                    <motion.h3 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="text-4xl font-black text-sky-950 mb-4 tracking-tight"
                    >
                      Success!
                    </motion.h3>
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="text-gray-500 font-medium text-lg max-w-sm mx-auto leading-relaxed mb-12"
                    >
                      Thank you, <span className="text-sky-600 font-bold">{formData.name}</span>. Your message has been safely delivered to our medical team.
                    </motion.p>
                    <motion.button 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={resetForm} 
                      className="bg-sky-950 text-white px-12 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:bg-sky-800 transition-all shadow-2xl flex items-center gap-4 mx-auto"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                      Send Another Message
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:sticky lg:top-32"
          >
            <div className="h-[650px] rounded-[64px] overflow-hidden shadow-2xl border-[20px] border-white relative group">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3761.4695029415715!2d84.8034503!3d19.3119564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a22ac6d337f7911%3A0x892a014972f09440!2sSkin%20Care%20OPD!5e0!3m2!1sen!2sin!4v1715888888888!5m2!1sen!2sin" 
                className="w-full h-full grayscale group-hover:grayscale-0 transition-all duration-1000"
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy"
                title="Clinic Location"
              ></iframe>
              <div className="absolute top-10 left-10 bg-white/95 backdrop-blur-md p-8 rounded-[32px] shadow-2xl border border-sky-100 max-w-[240px]">
                <span className="text-sky-600 font-black text-[10px] uppercase block mb-2 tracking-widest">Main Clinic</span>
                <p className="text-sky-950 font-black text-base leading-tight">Doctors Lane, Kali Mandir Rd, Brahmapur</p>
                <div className="mt-4 pt-4 border-t border-sky-100 text-emerald-500 font-black text-[10px] uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span> Open Now
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
