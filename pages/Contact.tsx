import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MockDB } from '../lib/db';

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    subject: '', 
    message: '' 
  });
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
    { 
      icon: "📍", 
      title: "Office Address", 
      content: "Doctors Lane, Kali Mandir Rd, Brahmapur, Odisha 760001",
      sub: "Near New Bus Stand"
    },
    { 
      icon: "📞", 
      title: "Make A Call", 
      content: "+91 904 090 1236", 
      sub: "0680 3560121"
    },
    { 
      icon: "✉️", 
      title: "24/7 Support", 
      content: "care@skincareopd.com", 
      sub: "response within 24 hours"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-sky-900 via-blue-800 to-indigo-900 text-white overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-96 h-96 bg-sky-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-20 md:py-32 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sky-200 font-semibold text-sm tracking-wider mb-6 border border-white/20">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                GET IN TOUCH
              </span>
              <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight tracking-tight">
                Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-blue-300">Our Clinic</span>
              </h1>
              <p className="text-sky-100 text-lg md:text-xl max-w-3xl mx-auto mb-8 leading-relaxed">
                Reach out to our medical team for appointments, inquiries, or emergency assistance
              </p>
              
              {/* Breadcrumb */}
              <div className="flex items-center justify-center space-x-2 text-sm text-sky-300">
                <Link to="/" className="opacity-70 hover:opacity-100 transition-opacity">Home</Link>
                <span className="opacity-50">/</span>
                <span className="font-semibold">Contact Us</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60L60 53.3C120 46.7 240 33.3 360 30C480 26.7 600 33.3 720 40C840 46.7 960 53.3 1080 50C1200 46.7 1320 33.3 1380 26.7L1440 20V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V60Z" fill="white"/>
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <main className="relative -mt-2">
        {/* Contact Info Cards */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {infoCards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 text-center shadow-xl border border-sky-100"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-sky-100 text-sky-600 text-3xl mb-6">
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold text-sky-900 mb-3">{card.title}</h3>
                <p className="text-gray-700 font-medium mb-2">{card.content}</p>
                {card.sub && (
                  <div className="inline-block px-3 py-1 bg-sky-100 text-sky-700 text-xs font-bold rounded-full">
                    {card.sub}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Form and Map Section - KEEPING EXACTLY ORIGINAL */}
        <section className="py-24 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            {/* Left Column - Form - EXACTLY ORIGINAL */}
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

            {/* Right Column - Map - EXACTLY ORIGINAL */}
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

        {/* FAQ Section */}
        <section className="bg-gradient-to-r from-sky-50 to-blue-50 py-20 mb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-flex items-center px-4 py-2 bg-white rounded-full text-sm font-bold text-sky-700 mb-4 shadow-sm">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                FREQUENTLY ASKED QUESTIONS
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-sky-950 mb-4">
                Common Questions Answered
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Quick answers to common questions about appointments and clinic services
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  question: "What are your clinic hours?",
                  answer: "Our clinic is open Monday to Saturday from 8:00 AM to 8:00 PM. Emergency services available 24/7."
                },
                {
                  question: "Do I need an appointment?",
                  answer: "While appointments are recommended for specialized consultations, we also accept walk-in patients."
                },
                {
                  question: "What documents should I bring?",
                  answer: "Please bring your ID proof, any previous medical records, and current medication list if applicable."
                },
                {
                  question: "Is parking available?",
                  answer: "Yes, we have dedicated patient parking available on-site free of charge."
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <h4 className="text-xl font-bold text-sky-900 mb-4 flex items-center">
                    <div className="w-8 h-8 bg-sky-100 text-sky-600 rounded-lg flex items-center justify-center mr-4">
                      Q
                    </div>
                    {faq.question}
                  </h4>
                  <p className="text-gray-600 ml-12">{faq.answer}</p>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                to="/appointment"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-sky-600 to-blue-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Book Appointment Online
              </Link>
            </div>
          </div>
        </section>

        {/* Emergency Contact Banner */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-3xl p-12 text-white text-center shadow-2xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-left">
                <h3 className="text-3xl font-black mb-4">Emergency Medical Assistance</h3>
                <p className="text-red-100 text-lg">Available 24/7 for urgent medical needs</p>
              </div>
              <div className="flex items-center">
                <div className="text-right mr-6">
                  <div className="text-4xl font-black">+91 904 090 1236</div>
                  <div className="text-red-200 font-bold">Call Immediately for Emergencies</div>
                </div>
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Contact;