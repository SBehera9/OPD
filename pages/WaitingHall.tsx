import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Booking, Doctor } from '../types';
import { MockDB } from '../lib/db';

const WaitingHall: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(MockDB.isLiveDisplayLoggedIn());
  const [password, setPassword] = useState('');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const today = new Date().toISOString().split('T')[0];
  const terminalRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    
    if (MockDB.loginLiveDisplay(password)) {
      setIsAuthenticated(true);
    } else {
      setLoginError('Invalid Live Display Password');
    }
  };

  const handleLogout = () => {
    MockDB.logoutLiveDisplay();
    setIsAuthenticated(false);
    setPassword('');
  };

  const fetchData = useCallback(() => {
    const loadedDoctors = MockDB.getDoctors();
    setDoctors(loadedDoctors);
    const allBookings = MockDB.getAllBookings();
    const todayBookings = allBookings.filter((b: Booking) => b.date === today);
    setBookings(todayBookings);
  }, [today]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
      const interval = setInterval(fetchData, 4000); 
      window.addEventListener('storage', fetchData);
      
      // Auto-logout after 60 minutes
      const logoutTimer = setTimeout(() => {
        handleLogout();
      }, 60 * 60 * 1000);
      
      return () => {
        clearInterval(interval);
        clearTimeout(logoutTimer);
        window.removeEventListener('storage', fetchData);
      };
    }
  }, [fetchData, isAuthenticated]);

  useEffect(() => {
    // Check session on component mount and storage events
    const checkSession = () => {
      const isStillAuth = MockDB.isLiveDisplayLoggedIn();
      if (!isStillAuth) {
        setIsAuthenticated(false);
      }
    };

    checkSession();
    window.addEventListener('storage', checkSession);
    
    return () => window.removeEventListener('storage', checkSession);
  }, []);

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

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6">
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-slate-800/50 backdrop-blur-lg border border-slate-700 rounded-[48px] p-12 max-w-md w-full shadow-2xl"
        >
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-sky-600 rounded-[24px] flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(16,185,129,0.3)]">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3xl font-black text-white mb-2">Live Display Console</h2>
            <p className="text-slate-400 text-sm">Secure Medical Terminal Access</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Live Display Password"
                className="w-full bg-slate-900/50 border-2 border-slate-700 text-white rounded-2xl px-6 py-5 font-bold outline-none focus:border-emerald-500 transition-all text-center placeholder-slate-500 pr-12"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setLoginError('');
                }}
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-emerald-400"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            
            {loginError && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm mt-2 text-center font-bold"
              >
                {loginError}
              </motion.p>
            )}
            
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-600 to-sky-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:opacity-90 transition-all shadow-[0_10px_30px_rgba(16,185,129,0.3)]"
            >
              Access Terminal
            </button>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-slate-500 text-xs">
              Password: display123
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  // Main Terminal Screen
  return (
    <div className="min-h-screen bg-[#020617] text-white p-4 lg:p-8 flex flex-col font-sans overflow-hidden">
      {/* Terminal Header with Logout */}
      <header className="flex flex-col md:flex-row justify-between items-center mb-10 border-b border-white/5 pb-8 gap-6">
        <div className="flex items-center gap-6">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-sky-600 rounded-[24px] flex items-center justify-center font-black text-4xl shadow-[0_0_40px_rgba(14,165,233,0.4)]"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </motion.div>
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-black tracking-tighter uppercase leading-none">
              Skin Care <span className="text-emerald-500">OPD</span>
            </h1>
            <div className="flex items-center gap-2 mt-2 justify-center md:justify-start">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
              <p className="text-sky-400 font-bold uppercase tracking-[0.3em] text-[9px]">Live Medical Terminal Board</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="bg-white/5 px-8 py-4 rounded-[24px] border border-white/10 backdrop-blur-xl text-center">
            <div className="text-3xl font-black tabular-nums tracking-tighter text-emerald-400">
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}
            </div>
            <div className="text-white/30 font-bold uppercase tracking-widest text-[8px] mt-1">{new Date().toDateString()}</div>
          </div>
          
          <button
            onClick={handleLogout}
            className="bg-red-600/20 text-red-400 hover:bg-red-600/30 px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all border border-red-600/30"
          >
            Lock Terminal
          </button>
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
                <div className="p-6 bg-gradient-to-r from-sky-900/40 to-emerald-900/40 border-b border-white/5 flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl overflow-hidden border border-emerald-500/20 shadow-lg">
                      <img src={doc.image} alt={doc.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <h2 className="text-lg font-black truncate leading-none">{doc.name.split(',')[0]}</h2>
                      <span className="text-emerald-400 font-bold uppercase text-[8px] tracking-widest mt-1 block truncate">{doc.specialty}</span>
                    </div>
                  </div>
                  {doc.isActive && (
                    <button 
                      onClick={() => toggleFullscreen(doc.id)}
                      className="bg-white/5 hover:bg-white/10 p-3 rounded-xl transition-all text-emerald-400/50 hover:text-emerald-400"
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
                  <div className="bg-gradient-to-r from-emerald-600/80 to-sky-600/80 rounded-[28px] p-6 shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/20 transition-colors"></div>
                    <div className="flex items-center gap-2 mb-4 relative z-10">
                       <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                       <h4 className="text-[8px] font-black uppercase tracking-[0.2em] text-emerald-100">Now Consulting</h4>
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
                            <p className="text-emerald-200 font-bold mt-2 text-[9px]">TOKEN HOLDER</p>
                          </div>
                          <div className="text-5xl font-black text-white">
                            <span className="text-xl opacity-40">#</span>{current.tokenNumber}
                          </div>
                        </motion.div>
                      ) : (
                        <div className="py-4 text-center text-emerald-200/20 font-black text-[10px] uppercase tracking-widest border border-dashed border-emerald-400/30 rounded-xl relative z-10">
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
                          <span className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center font-black text-emerald-400 text-sm">{b.tokenNumber}</span>
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
        <span>Skin Care OPD Terminal v4.2.0 | Session Active</span>
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5">
            <span className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse"></span> 
            Secure Sync Active
          </span>
        </div>
      </footer>
    </div>
  );
};

export default WaitingHall;