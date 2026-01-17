
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MockDB } from '../lib/db';
import { Doctor } from '../types';

const Doctors: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  const refreshDoctors = () => {
    setDoctors(MockDB.getDoctors());
  };

  useEffect(() => {
    refreshDoctors();
    // Listen for changes from other tabs (Admin console)
    window.addEventListener('storage', refreshDoctors);
    return () => window.removeEventListener('storage', refreshDoctors);
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="bg-sky-950 text-white py-32 px-4 text-center relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <span className="text-sky-400 font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Medical Roster</span>
          <h1 className="text-6xl font-black mb-4 tracking-tighter text-white">Our Specialist Doctors</h1>
          <p className="text-sky-100/60 font-medium max-w-2xl mx-auto uppercase tracking-[0.2em] text-[10px]">Home / Specialists</p>
        </motion.div>
        <div className="absolute inset-0 bg-sky-900 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      </div>

      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {doctors.map((doc, idx) => (
            <motion.div 
              key={doc.id}
              initial={{ opacity: 0, scale: 0.95, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.7, 
                delay: idx * 0.1,
                ease: [0.22, 1, 0.36, 1] 
              }}
              className={`bg-white rounded-[48px] overflow-hidden border border-white group flex flex-col transition-all shadow-sm relative ${!doc.isActive ? 'opacity-70' : ''}`}
            >
              {!doc.isActive && (
                <div className="absolute top-10 left-1/2 -translate-x-1/2 z-30 bg-red-600 text-white px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-widest shadow-2xl">
                  Temporarily Unavailable
                </div>
              )}
              
              <div className={`relative h-[440px] overflow-hidden ${!doc.isActive ? 'grayscale' : ''}`}>
                <img src={doc.image} alt={doc.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-sky-950 via-sky-950/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                <div className="absolute bottom-10 left-10 right-10 text-white">
                  <span className="bg-sky-500 text-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 inline-block shadow-lg">
                    {doc.specialty}
                  </span>
                  <h3 className="text-3xl font-black leading-none tracking-tight drop-shadow-md">{doc.name}</h3>
                </div>
                <div className="absolute top-8 right-8 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-3xl text-white font-black text-center shadow-xl group-hover:bg-white/20 transition-colors">
                  <span className="text-[8px] uppercase tracking-widest block opacity-70">Consultation Fee</span>
                  <span className="text-xl block">₹{doc.fee}</span>
                </div>
              </div>

              <div className="p-10 flex flex-col flex-grow">
                <p className="text-sky-600 font-black text-xs mb-8 leading-relaxed tracking-widest uppercase border-b border-sky-50 pb-6">{doc.qualifications}</p>
                <div className="space-y-5 mb-12 flex-grow">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 shrink-0 bg-slate-50 rounded-xl flex items-center justify-center text-sky-500 border border-slate-100 group-hover:bg-sky-100 transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                    </div>
                    <div>
                      <span className="text-gray-400 font-black uppercase tracking-widest text-[8px] block mb-0.5">Primary Hospital</span>
                      <span className="text-sky-950 font-bold text-sm leading-tight block">{doc.hospital}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 shrink-0 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 transition-colors ${doc.isActive ? 'text-emerald-500 group-hover:bg-emerald-50' : 'text-red-400'}`}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    </div>
                    <div>
                      <span className="text-gray-400 font-black uppercase tracking-widest text-[8px] block mb-0.5">Availability</span>
                      <span className="text-sky-950 font-bold text-sm leading-tight block">{doc.isActive ? doc.timing : 'Currently Not Available'}</span>
                    </div>
                  </div>
                </div>
                <motion.div whileTap={{ scale: 0.96 }}>
                  {doc.isActive ? (
                    <Link 
                      to={`/appointment?doctorId=${doc.id}`} 
                      className="block w-full text-center bg-sky-950 text-white font-black py-5 rounded-[20px] hover:bg-sky-600 transition-all shadow-xl shadow-sky-900/10 uppercase tracking-[0.2em] text-xs"
                    >
                      Schedule Consultation
                    </Link>
                  ) : (
                    <div className="w-full text-center bg-slate-100 text-slate-400 font-black py-5 rounded-[20px] uppercase tracking-[0.2em] text-xs cursor-not-allowed">
                      Unavailable
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Doctors;
