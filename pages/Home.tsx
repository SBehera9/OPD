import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DEPARTMENTS } from '../constants';
import { MockDB } from '../lib/db';
import { Doctor } from '../types';

const Home: React.FC = () => {
  const [featuredDoctors, setFeaturedDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    const loadDoctors = () => {
      const all = MockDB.getDoctors().filter(d => d.isActive);
      setFeaturedDoctors(all.slice(0, 3));
    };
    loadDoctors();
    window.addEventListener('storage', loadDoctors);
    return () => window.removeEventListener('storage', loadDoctors);
  }, []);

  return (
    <div className="overflow-hidden bg-white">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[800px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 12, ease: "easeOut" }}
            src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=1920" 
            alt="Medical Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-sky-950/95 via-sky-950/40 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-white w-full">
          <motion.div 
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "circOut" }}
            className="max-w-4xl"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl px-6 py-2.5 rounded-full border border-white/20 mb-8"
            >
              <span className="w-3 h-3 bg-sky-400 rounded-full animate-pulse"></span>
              <span className="text-sky-200 text-[10px] font-black uppercase tracking-[0.4em]">Skin Care OPD Brahmapur</span>
            </motion.div>
            
            <h1 className="text-7xl md:text-9xl font-black mb-8 leading-[0.9] tracking-tighter">
              Protect Your <br /> 
              <span className="gradient-text">Health & Love</span>
            </h1>
            
            <p className="text-xl md:text-3xl text-sky-100/70 mb-12 leading-relaxed font-medium max-w-3xl">
              Completely e-enable covalent functionalities and market positioning infomediaries. Interactively initiate exceptional care.
            </p>

            <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  to="/appointment" 
                  className="bg-sky-600 text-white px-14 py-6 rounded-[28px] font-black text-xl hover:bg-sky-500 transition-all shadow-[0_20px_60px_-15px_rgba(14,165,233,0.5)] inline-block uppercase tracking-widest"
                >
                  Book Appointment
                </Link>
              </motion.div>
              
              <div className="flex items-center gap-6 group">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center border border-white/20 group-hover:bg-white/20 transition-all">
                  <svg className="w-8 h-8 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                </div>
                <div>
                  <span className="text-sky-300 font-black uppercase text-[10px] tracking-[0.3em] block mb-1">Call Us Anytime</span>
                  <span className="text-xl font-bold tracking-tight">+91 904 090 1236</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Floating scroll indicator */}
        <motion.div 
          animate={{ y: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/40"
        >
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/></svg>
        </motion.div>
      </section>

      {/* Feature Section */}
      <section className="py-32 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 -mt-52 relative z-30">
            {[
              { icon: "🛡️", title: "Disease Analysis", desc: "Completely enable covalent function and market positioning infomediarie exceptional supply." },
              { icon: "👨‍⚕️", title: "Medicine Expert", desc: "Expert doctors with MD & MS qualifications from leading medical institutes from Visakhapatnam." },
              { icon: "🎯", title: "Customer Focus", desc: "Delivering quality healthcare for generations with a patient-first compassionate approach." }
            ].map((f, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-white p-12 rounded-[64px] shadow-2xl shadow-sky-950/5 border border-white flex flex-col items-center text-center group"
              >
                <div className="text-6xl mb-8 group-hover:scale-125 transition-transform duration-500">{f.icon}</div>
                <h3 className="text-2xl font-black text-sky-950 mb-4 tracking-tight uppercase">{f.title}</h3>
                <p className="text-gray-500 font-medium leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-40 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-sky-600 font-black uppercase tracking-[0.4em] text-[10px] mb-6 block">About Skin Care OPD</span>
              <h2 className="text-5xl md:text-7xl font-black text-sky-950 mb-10 leading-[1] tracking-tighter">Delivering Quality Health Care For Generations</h2>
              <p className="text-gray-500 text-xl mb-12 leading-relaxed">
                Welcome to Skin Care OPD, your trusted destination for comprehensive healthcare services. Our clinic brings together renowned specialists offering expert care in multiple disciplines.
              </p>
              <div className="space-y-6 mb-16">
                {["Providing Compassionate Care", "Brings Innovation and Care Together", "From Prevention to Recovery"].map((item, i) => (
                  <div key={i} className="flex items-center gap-6 group">
                    <div className="w-12 h-12 bg-sky-100 rounded-2xl flex items-center justify-center text-sky-600 shadow-inner group-hover:bg-sky-600 group-hover:text-white transition-all">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
                    </div>
                    <span className="text-sky-950 font-black text-lg uppercase tracking-tight">{item}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-8">
                <Link to="/about" className="bg-sky-950 text-white px-12 py-5 rounded-full font-black uppercase tracking-widest text-xs hover:bg-sky-800 transition-all shadow-xl inline-block">More About Us</Link>
                <div className="flex items-center gap-3">
                    <span className="text-4xl font-black text-sky-600">25+</span>
                    <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Years of<br/>Experience</span>
                </div>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative z-10 rounded-[80px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border-[20px] border-white">
                <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800" alt="Clinic Interior" className="w-full" />
              </div>
              <div className="absolute top-10 right-10 bg-sky-600 text-white p-8 rounded-[40px] shadow-2xl z-20 text-center">
                <div className="text-4xl font-black mb-1">15+</div>
                <div className="text-[9px] font-black uppercase tracking-widest">High Expert<br/>Doctors</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Specialty Grid */}
      <section className="py-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div className="max-w-2xl">
              <span className="text-sky-600 font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Specialist Services</span>
              <h2 className="text-5xl md:text-7xl font-black text-sky-950 leading-[1] tracking-tighter">Our Clinic Offers <br/> Expert Services</h2>
            </div>
            <Link to="/department" className="text-sky-600 font-black uppercase tracking-widest text-xs border-b-4 border-sky-100 pb-2 hover:border-sky-600 transition-all">All Departments →</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {DEPARTMENTS.map((dept, idx) => (
              <motion.div 
                key={dept.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -15 }}
                className="bg-white p-12 rounded-[56px] shadow-sm hover:shadow-2xl transition-all border border-slate-50 group text-center"
              >
                <div className="text-7xl mb-10 group-hover:scale-110 transition-transform duration-500">{dept.icon === 'skin' ? '✨' : dept.icon === 'brain' ? '🧠' : dept.icon === 'surgery' ? '⚕️' : dept.icon === 'digestive' ? '🥗' : dept.icon === 'cancer' ? '🧬' : '🫁'}</div>
                <h3 className="text-2xl font-black text-sky-950 mb-4 tracking-tight uppercase">{dept.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-10">{dept.description}</p>
                <Link to={`/appointment`} className="inline-block bg-sky-50 text-sky-600 px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest group-hover:bg-sky-600 group-hover:text-white transition-all">Book Service</Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Download App Section */}
      <section className="py-32 bg-sky-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-sky-900 rounded-[80px] p-16 md:p-32 flex flex-col lg:flex-row items-center gap-20 overflow-hidden relative">
            <div className="relative z-10 lg:w-1/2">
                <span className="text-sky-400 font-black uppercase tracking-widest text-xs mb-6 block">Stay Connected</span>
                <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-none">Download Our <br/> Health App</h2>
                <p className="text-sky-100/60 text-xl mb-12 leading-relaxed">Book appointments, track tokens live, and get reports directly on your mobile. Available for Android and iOS.</p>
                <div className="flex flex-wrap gap-6">
                    <button className="bg-white text-sky-950 px-10 py-5 rounded-[24px] font-black uppercase tracking-widest text-xs flex items-center gap-4 hover:bg-sky-400 hover:text-white transition-all">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M17.523 15.341c-.551 0-1-.449-1-1s.449-1 1-1 1 .449 1 1-.449 1-1 1zm-5 0c-.551 0-1-.449-1-1s.449-1 1-1 1 .449 1 1-.449 1-1 1zm-5 0c-.551 0-1-.449-1-1s.449-1 1-1 1 .449 1 1-.449 1-1 1zm12.338-7.513l1.528-2.647c.105-.181.042-.413-.139-.517s-.413-.042-.517.139l-1.554 2.693c-1.391-.632-2.946-.983-4.577-.983s-3.186.351-4.577.983l-1.554-2.693c-.105-.181-.336-.243-.517-.139s-.243.336-.139.517l1.528 2.647c-2.458 1.488-4.226 3.921-4.665 6.84h18.804c-.439-2.919-2.207-5.352-4.665-6.84z"/></svg>
                        Google Play
                    </button>
                    <button className="bg-white text-sky-950 px-10 py-5 rounded-[24px] font-black uppercase tracking-widest text-xs flex items-center gap-4 hover:bg-sky-400 hover:text-white transition-all">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.1 2.48-1.34.03-1.77-.79-3.29-.79s-2 .77-3.27.82c-1.31.05-2.31-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87s2.2-.89 3.48-.76c.54.02 2.05.22 3.03 1.64-.08.05-1.81 1.05-1.79 3.19.02 2.56 2.22 3.42 2.25 3.43-.02.06-.35 1.21-1.19 2.45z"/></svg>
                        App Store
                    </button>
                </div>
            </div>
            <div className="lg:w-1/2 flex justify-center relative">
                <motion.img 
                    animate={{ y: [0, -30, 0] }}
                    transition={{ duration: 5, repeat: Infinity }}
                    src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=400" 
                    className="w-64 rounded-[48px] shadow-2xl relative z-10 border-8 border-white/10" 
                    alt="App Screenshot" 
                />
                <div className="absolute inset-0 bg-sky-500/20 rounded-full blur-[100px] scale-150"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Specialist Slider */}
      <section className="py-40 bg-slate-50 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="mb-24">
            <span className="text-sky-600 font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Our Team</span>
            <h2 className="text-5xl md:text-7xl font-black text-sky-950 mb-10 tracking-tighter">Meet Our Specialists</h2>
            <Link to="/doctors" className="bg-sky-600 text-white px-10 py-4 rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-sky-700 transition-all inline-block">All Doctors</Link>
          </div>

          <div className="flex flex-wrap gap-8">
            {featuredDoctors.map((doc, idx) => (
              <motion.div 
                key={doc.id}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="flex-1 min-w-[300px] bg-white p-10 rounded-[64px] border border-sky-100 hover:shadow-2xl transition-all group"
              >
                <div className="w-full h-80 rounded-[48px] overflow-hidden mb-10 border-4 border-sky-100">
                  <img src={doc.image} alt={doc.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                </div>
                <span className="text-sky-600 font-black uppercase tracking-widest text-[9px] mb-2 block">{doc.specialty}</span>
                <h4 className="text-3xl font-black text-sky-950 mb-6 tracking-tight">{doc.name}</h4>
                <Link to={`/doctors`} className="text-sky-600 font-black uppercase tracking-[0.2em] text-[10px] hover:text-sky-800 transition-colors">Full Profile →</Link>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-sky-500/5 rounded-full blur-[160px] -translate-y-1/2 translate-x-1/2"></div>
      </section>
    </div>
  );
};

export default Home;