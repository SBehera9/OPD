
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Booking, Doctor } from '../types';
import { MockDB } from '../lib/db';

const WaitingHall: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const today = new Date().toISOString().split('T')[0];
  const terminalRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const fetchData = useCallback(() => {
    setDoctors(MockDB.getDoctors());
    const allBookings = MockDB.getAllBookings();
    setBookings(allBookings.filter((b: Booking) => b.date === today));
  }, [today]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 4000); 
    window.addEventListener('storage', fetchData);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', fetchData);
    };
  }, [fetchData]);

  const toggleFullscreen = (id: string) => {
    const el = terminalRefs.current[id];
    if (el) {
      if (!document.fullscreenElement) {
        el.requestFullscreen().catch(err => {
          console.error(`Error attempting to enable full-screen mode: ${err.message}`);
        });
      } else {
        document.exitFullscreen();
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white p-4 lg:p-8 flex flex-col font-sans overflow-hidden">
      {/* Cinematic Header */}
      <header className="flex flex-col md:flex-row justify-between items-center mb-10 border-b border-white/5 pb-8 gap-6">
        <div className="flex items-center gap-6">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 bg-sky-600 rounded-[24px] flex items-center justify-center font-black text-4xl shadow-[0_0_40px_rgba(14,165,233,0.4)]"
          >
            S
          </motion.div>
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-black tracking-tighter uppercase leading-none">Skin Care <span className="text-sky-500">OPD</span></h1>
            <div className="flex items-center gap-2 mt-2 justify-center md:justify-start">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
              <p className="text-sky-400 font-bold uppercase tracking-[0.3em] text-[9px]">Live Medical Terminal Board</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white/5 px-8 py-4 rounded-[24px] border border-white/10 backdrop-blur-xl text-center">
          <div className="text-3xl font-black tabular-nums tracking-tighter text-sky-400">
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}
          </div>
          <div className="text-white/30 font-bold uppercase tracking-widest text-[8px] mt-1">{new Date().toDateString()}</div>
        </div>
      </header>

      {/* Grid of Doctor Terminals */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-grow overflow-y-auto pb-20 custom-scrollbar">
        <AnimatePresence>
          {doctors.map((doc) => {
            const docBookings = bookings.filter(b => b.doctorId === doc.id);
            const current = docBookings.find(b => b.status === 'Present');
            const waiting = docBookings.filter(b => b.status === 'Waiting').sort((a,b) => a.tokenNumber - b.tokenNumber).slice(0, 4);
            const absent = docBookings.filter(b => b.status === 'Absent').slice(-3);

            return (
              <motion.div 
                key={doc.id}
                ref={(el) => { terminalRefs.current[doc.id] = el; }}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={`bg-slate-900/40 rounded-[40px] border border-white/5 flex flex-col overflow-hidden shadow-2xl backdrop-blur-md relative ${!doc.isActive ? 'opacity-40 grayscale' : ''}`}
              >
                {!doc.isActive && (
                  <div className="absolute inset-0 bg-black/60 z-30 flex flex-col items-center justify-center text-center p-10">
                    <div className="text-6xl mb-6 opacity-30">🔐</div>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-2 leading-none">Station Closed</h3>
                    <p className="text-white/40 font-black text-[10px] uppercase tracking-[0.3em]">Inactive Specialist</p>
                  </div>
                )}

                {/* Station Header */}
                <div className="p-6 bg-sky-950/40 border-b border-white/5 flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl overflow-hidden border border-sky-500/20 shadow-lg">
                      <img src={doc.image} alt={doc.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <h2 className="text-lg font-black truncate leading-none">{doc.name.split(',')[0]}</h2>
                      <span className="text-sky-500 font-bold uppercase text-[8px] tracking-widest mt-1 block truncate">{doc.specialty}</span>
                    </div>
                  </div>
                  {doc.isActive && (
                    <button 
                      onClick={() => toggleFullscreen(doc.id)}
                      className="bg-white/5 hover:bg-white/10 p-3 rounded-xl transition-all text-sky-400/50 hover:text-sky-400"
                      title="Fullscreen Terminal"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"/>
                      </svg>
                    </button>
                  )}
                </div>

                <div className="flex-grow p-6 flex flex-col gap-6">
                  {/* NOW CONSULTING */}
                  <div className="bg-sky-600 rounded-[28px] p-6 shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/20 transition-colors"></div>
                    <div className="flex items-center gap-2 mb-4 relative z-10">
                       <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                       <h4 className="text-[8px] font-black uppercase tracking-[0.2em] text-sky-100">Now Consulting</h4>
                    </div>
                    
                    <AnimatePresence mode="wait">
                      {current ? (
                        <motion.div 
                          key={current.id}
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          className="flex justify-between items-end relative z-10"
                        >
                          <div className="min-w-0 pr-2">
                            <p className="text-2xl font-black truncate uppercase leading-none">{current.patientName}</p>
                            <p className="text-sky-200 font-bold mt-2 text-[9px]">TOKEN HOLDER</p>
                          </div>
                          <div className="text-5xl font-black text-white">
                            <span className="text-xl opacity-40">#</span>{current.tokenNumber}
                          </div>
                        </motion.div>
                      ) : (
                        <div className="py-4 text-center text-sky-200/20 font-black text-[10px] uppercase tracking-widest border border-dashed border-sky-400/30 rounded-xl relative z-10">
                          Station Ready
                        </div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* QUEUE */}
                  <div className="space-y-2">
                    <h4 className="text-[8px] font-black uppercase tracking-widest text-white/20 px-2 mb-2">Upcoming Queue</h4>
                    {waiting.map(b => (
                      <div key={b.id} className="bg-white/5 px-4 py-3 rounded-[18px] flex justify-between items-center border border-white/5">
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 bg-sky-500/10 rounded-lg flex items-center justify-center font-black text-sky-400 text-sm">{b.tokenNumber}</span>
                          <span className="font-bold text-sm text-white/80 truncate max-w-[100px]">{b.patientName.split(' ')[0]}</span>
                        </div>
                        <span className="text-[9px] font-bold text-white/20">{b.slot}</span>
                      </div>
                    ))}
                    {waiting.length === 0 && !current && (
                      <div className="py-10 text-center opacity-5">
                        <span className="text-[9px] font-black uppercase tracking-[0.4em]">Queue Empty</span>
                      </div>
                    )}
                  </div>

                  {/* ABSENT STATUS ALERT */}
                  {absent.length > 0 && (
                    <motion.div 
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="mt-auto pt-4 bg-red-600/90 rounded-[28px] p-5 border border-red-400/30 backdrop-blur-md shadow-2xl"
                    >
                      <div className="flex items-center gap-2 mb-4">
                         <span className="w-2.5 h-2.5 bg-white rounded-full animate-ping"></span>
                         <h4 className="text-[10px] font-black uppercase tracking-widest text-white">Absent Alert</h4>
                      </div>
                      <div className="space-y-2">
                        {absent.map(b => (
                          <div key={b.id} className="bg-white/20 backdrop-blur-md text-white px-4 py-3 rounded-2xl flex justify-between items-center border border-white/10">
                            <span className="font-black text-lg">#{b.tokenNumber}</span>
                            <span className="font-bold uppercase text-[9px] opacity-70 tracking-widest truncate max-w-[80px]">{b.patientName.split(' ')[0]}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <footer className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center text-white/10 font-black uppercase text-[8px] tracking-[0.5em] shrink-0">
        <span>Skin Care OPD Terminal v4.2.0</span>
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5"><span className="w-1 h-1 bg-sky-500 rounded-full"></span> Secure Sync Active</span>
        </div>
      </footer>
    </div>
  );
};

export default WaitingHall;
