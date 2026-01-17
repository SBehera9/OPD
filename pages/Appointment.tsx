
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Booking, Doctor, PaymentMode } from '../types';
import { useLocation, useNavigate } from 'react-router-dom';
import { MockDB } from '../lib/db';

const generateSlots = (timing: string, gap: number, selectedDate: string) => {
  const slots: string[] = [];
  const defaultSlots = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"];
  
  try {
    const dateObj = new Date(selectedDate);
    if (isNaN(dateObj.getTime())) return defaultSlots;
    
    const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
    let activeRange = timing;
    
    // Support multi-day strings like "Mon-Sat: 09:00-18:00, Sun: 09:00-10:00"
    if (timing.includes(',')) {
      const parts = timing.split(',');
      const specificPart = parts.find(p => p.includes(dayName));
      activeRange = specificPart || parts[0];
    }
    
    const timeRegex = /(\d{1,2}:\d{2})\s*(AM|PM)?/gi;
    const matches = activeRange.match(timeRegex);
    
    if (!matches || matches.length < 2) return defaultSlots;
    
    const parseTimeToMinutes = (timeStr: string) => {
      const match = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
      if (!match) return 0;
      let [_, h, m, meridiem] = match;
      let hours = parseInt(h);
      const minutes = parseInt(m);
      if (meridiem) {
        if (meridiem.toUpperCase() === 'PM' && hours < 12) hours += 12;
        if (meridiem.toUpperCase() === 'AM' && hours === 12) hours = 0;
      }
      return hours * 60 + minutes;
    };
    
    let startMinutes = parseTimeToMinutes(matches[0]);
    let endMinutes = parseTimeToMinutes(matches[1]);
    
    if (startMinutes >= endMinutes) return defaultSlots;
    
    for (let m = startMinutes; m < endMinutes; m += gap) {
      const hh = Math.floor(m / 60).toString().padStart(2, '0');
      const mm = (m % 60).toString().padStart(2, '0');
      slots.push(`${hh}:${mm}`);
    }
  } catch (e) { 
    return defaultSlots; 
  }
  return slots.length > 0 ? slots : defaultSlots;
};

const Appointment: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [paymentMode, setPaymentMode] = useState<PaymentMode>('Cash');
  const [isSuccess, setIsSuccess] = useState(false);
  const [generatedBooking, setGeneratedBooking] = useState<Booking | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  const refreshSpecialists = () => {
    const list = MockDB.getDoctors();
    setDoctors(list);
    
    // Check if currently selected doctor was removed or changed status
    const params = new URLSearchParams(location.search);
    const docId = params.get('doctorId');
    if (docId) {
      const doc = list.find(d => d.id === docId);
      if (doc) {
        setSelectedDoctor(doc);
        setStep(2);
      }
    }
  };

  useEffect(() => {
    refreshSpecialists();
    window.addEventListener('storage', refreshSpecialists);
    return () => window.removeEventListener('storage', refreshSpecialists);
  }, [location]);

  useEffect(() => {
    if (selectedDoctor && selectedDate) {
      const bookings = MockDB.getAllBookings();
      const taken = bookings
        .filter(b => b.doctorId === selectedDoctor.id && b.date === selectedDate && b.status !== 'Absent')
        .map(b => b.slot);
      setBookedSlots(taken);
      setSelectedSlot('');
    }
  }, [selectedDoctor, selectedDate]);

  const handleBooking = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.phone.trim()) newErrors.phone = "Mobile number is required";
    else if (!/^\d{10}$/.test(formData.phone.replace(/[\s-]/g, ''))) newErrors.phone = "Invalid number. Use 10 digits.";
    
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      const newBooking = MockDB.createBooking({
        patientName: formData.name,
        patientEmail: formData.email,
        patientPhone: formData.phone,
        doctorId: selectedDoctor!.id,
        doctorName: selectedDoctor!.name,
        date: selectedDate,
        slot: selectedSlot,
        fee: selectedDoctor!.fee,
        paymentMode
      });
      setGeneratedBooking(newBooking);
      setIsSuccess(true);
    } catch (err: any) { 
      setErrors({ general: err.message }); 
      alert(err.message);
    }
  };

  if (isSuccess && generatedBooking) {
    return (
      <div className="py-24 max-w-2xl mx-auto px-6 text-center">
        <style>{`@media print { body * { visibility: hidden; } .receipt-content, .receipt-content * { visibility: visible; } .receipt-content { position: absolute; left: 0; top: 0; width: 100%; padding: 40px; } .no-print { display: none !important; } }`}</style>
        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white p-12 rounded-[60px] shadow-2xl border border-sky-50 receipt-content relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500"></div>
          <div className="flex justify-center mb-8"><div className="w-16 h-16 bg-sky-600 rounded-3xl flex items-center justify-center text-white font-black text-3xl shadow-lg">S</div></div>
          <h2 className="text-4xl font-black text-sky-950 mb-3 tracking-tighter uppercase">Booking Confirmed</h2>
          <div className="bg-slate-50 rounded-[48px] p-10 mb-10 text-left space-y-8 border border-slate-100 shadow-inner">
            <div className="flex justify-between border-b border-slate-200 pb-8 items-center">
              <div>
                <span className="text-sky-600 font-black text-[10px] uppercase tracking-[0.3em] block mb-2">Queue Token</span>
                <span className="text-7xl font-black text-sky-950 tracking-tighter">#{generatedBooking.tokenNumber}</span>
              </div>
              <div className="text-right">
                <span className="text-gray-400 font-bold text-[10px] uppercase tracking-widest block mb-1">Date</span>
                <span className="text-sky-950 font-black text-2xl tracking-tight">{generatedBooking.date}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div><span className="text-gray-400 font-bold text-[10px] uppercase tracking-widest block mb-1">Patient</span><span className="text-sky-950 font-black uppercase text-sm block truncate">{generatedBooking.patientName}</span></div>
              <div><span className="text-gray-400 font-bold text-[10px] uppercase tracking-widest block mb-1">Time Slot</span><span className="text-sky-950 font-black text-sm block">{generatedBooking.slot}</span></div>
            </div>
          </div>
          <div className="flex gap-4 no-print">
            <button onClick={() => window.print()} className="flex-1 bg-sky-950 text-white py-5 rounded-3xl font-black uppercase tracking-widest text-[10px] hover:bg-sky-800 shadow-xl">Print Token</button>
            <button onClick={() => navigate('/')} className="flex-1 bg-slate-100 text-sky-950 py-5 rounded-3xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-200">Home</button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-center mb-20">
          <div className="flex items-center gap-4 bg-white px-8 py-4 rounded-full shadow-sm border border-sky-100">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black transition-all ${step >= s ? 'bg-sky-600 text-white shadow-lg' : 'bg-slate-100 text-slate-300'}`}>{s}</div>
                {s < 3 && <div className={`w-8 h-1 rounded-full transition-all ${step > s ? 'bg-sky-600' : 'bg-slate-100'}`}></div>}
              </div>
            ))}
          </div>
        </div>
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-10">
                <div className="text-center mb-16">
                  <span className="text-sky-600 font-black uppercase tracking-[0.4em] text-[10px] block mb-4">Step 01</span>
                  <h2 className="text-5xl font-black text-sky-950 tracking-tighter">Select Specialist</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {doctors.map(doc => (
                    <motion.div 
                      key={doc.id} 
                      whileHover={doc.isActive ? { y: -8 } : {}} 
                      onClick={() => { if (doc.isActive) { setSelectedDoctor(doc); setStep(2); } }} 
                      className={`bg-white p-8 rounded-[48px] border-2 border-transparent transition-all group relative ${doc.isActive ? 'hover:border-sky-500 cursor-pointer shadow-sm hover:shadow-2xl' : 'opacity-60 cursor-not-allowed border-slate-100'}`}
                    >
                      {!doc.isActive && <div className="absolute top-6 right-6 bg-red-500 text-white text-[8px] font-black uppercase px-2 py-1 rounded-lg z-10">Inactive</div>}
                      <img src={doc.image} className={`w-24 h-24 rounded-3xl object-cover mb-6 border-4 border-slate-50 ${!doc.isActive ? 'grayscale' : 'group-hover:border-sky-100'}`} alt="" />
                      <h4 className="text-xl font-black text-sky-950 mb-2 leading-tight">{doc.name.split(',')[0]}</h4>
                      <span className="text-[10px] font-black uppercase tracking-widest text-sky-500 block mb-6">{doc.specialty}</span>
                      <div className="flex justify-between items-center pt-6 border-t border-slate-50">
                        <span className="text-gray-400 font-bold text-xs">Fee: ₹{doc.fee}</span>
                        <span className={`font-black text-[10px] uppercase tracking-widest transition-transform ${doc.isActive ? 'text-sky-600 group-hover:translate-x-2' : 'text-slate-300'}`}>
                          {doc.isActive ? 'Select →' : 'Unavailable'}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
            {step === 2 && selectedDoctor && (
              <motion.div key="step2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-12">
                <div className="flex items-center gap-6 mb-16">
                  <button onClick={() => setStep(1)} className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-sky-950 shadow-sm hover:bg-sky-50">←</button>
                  <div>
                    <span className="text-sky-600 font-black uppercase tracking-[0.3em] text-[10px]">Booking For</span>
                    <h2 className="text-3xl font-black text-sky-950">{selectedDoctor.name}</h2>
                  </div>
                </div>
                {!selectedDoctor.isActive ? (
                  <div className="bg-red-50 border-2 border-red-100 p-12 rounded-[56px] text-center max-w-2xl mx-auto shadow-sm">
                    <div className="text-6xl mb-6">🗓️</div>
                    <h3 className="text-2xl font-black text-red-950 uppercase mb-4">Specialist Temporarily Unavailable</h3>
                    <p className="text-red-700 font-medium leading-relaxed mb-8">This specialist is currently not accepting new online bookings. Please check back later or contact the clinic reception for more details.</p>
                    <button onClick={() => setStep(1)} className="bg-red-950 text-white px-10 py-4 rounded-full font-black uppercase tracking-widest text-[10px]">Pick Another Specialist</button>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                      <div className="bg-white p-10 rounded-[56px] shadow-sm border border-sky-100">
                        <h3 className="text-xl font-black text-sky-950 mb-8 flex items-center gap-3"><span className="w-2 h-2 bg-sky-500 rounded-full"></span> Choose Date</h3>
                        <input type="date" min={new Date().toISOString().split('T')[0]} className="w-full bg-slate-50 border-2 border-transparent rounded-3xl px-8 py-6 font-bold text-sky-950 focus:border-sky-500 outline-none" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
                      </div>
                      <div className="bg-white p-10 rounded-[56px] shadow-sm border border-sky-100">
                        <h3 className="text-xl font-black text-sky-950 mb-8 flex items-center gap-3"><span className="w-2 h-2 bg-sky-500 rounded-full"></span> Available Slots</h3>
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                          {generateSlots(selectedDoctor.timing, selectedDoctor.slotGap, selectedDate).map(slot => {
                            const isBooked = bookedSlots.includes(slot);
                            return (
                              <button key={slot} disabled={isBooked} onClick={() => setSelectedSlot(slot)} className={`py-4 rounded-2xl font-black text-xs transition-all relative overflow-hidden ${isBooked ? 'bg-slate-50 text-slate-200 cursor-not-allowed border border-slate-100' : selectedSlot === slot ? 'bg-sky-600 text-white shadow-xl scale-105' : 'bg-slate-50 text-sky-950 hover:bg-sky-50 hover:text-sky-600'}`}>{slot}</button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center"><button disabled={!selectedDate || !selectedSlot} onClick={() => setStep(3)} className="bg-sky-950 text-white px-16 py-6 rounded-full font-black uppercase tracking-widest text-xs hover:bg-sky-600 disabled:opacity-30 shadow-2xl transition-all">Continue to Details</button></div>
                  </>
                )}
              </motion.div>
            )}
            {step === 3 && selectedDoctor && (
              <motion.div key="step3" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="max-w-3xl mx-auto">
                <div className="flex items-center gap-6 mb-16">
                  <button onClick={() => setStep(2)} className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-sky-950 shadow-sm">←</button>
                  <h2 className="text-3xl font-black text-sky-950">{selectedDate} @ {selectedSlot}</h2>
                </div>
                <div className="bg-white p-12 rounded-[64px] shadow-sm border border-sky-100 space-y-10">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-sky-950 px-4">Full Name*</label>
                      <input type="text" placeholder="Patient's Full Name" className={`w-full bg-slate-50 border-2 rounded-3xl px-8 py-5 focus:ring-4 focus:ring-sky-100 outline-none font-bold ${errors.name ? 'border-red-300' : 'border-transparent'}`} value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-sky-950 px-4">Mobile Number*</label>
                      <input type="tel" placeholder="10-digit Mobile" className={`w-full bg-slate-50 border-2 rounded-3xl px-8 py-5 focus:ring-4 focus:ring-sky-100 outline-none font-bold ${errors.phone ? 'border-red-300' : 'border-transparent'}`} value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                    </div>
                  </div>
                  <div className="pt-10 border-t border-slate-50">
                    <label className="text-[10px] font-black uppercase tracking-widest text-sky-950 px-4 mb-4 block">Select Payment Method</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button onClick={() => setPaymentMode('Cash')} className={`py-6 rounded-3xl font-black text-sm transition-all border-2 ${paymentMode === 'Cash' ? 'bg-sky-600 text-white border-sky-600 shadow-xl shadow-sky-600/20' : 'bg-slate-50 text-sky-950 border-transparent hover:border-sky-100'}`}>
                        <div className="flex flex-col items-center gap-1"><span>Cash</span><span className="text-[9px] opacity-60 uppercase tracking-widest">Pay at Counter</span></div>
                      </button>
                      <button onClick={() => setPaymentMode('Online')} className={`py-6 rounded-3xl font-black text-sm transition-all border-2 ${paymentMode === 'Online' ? 'bg-sky-600 text-white border-sky-600 shadow-xl shadow-sky-600/20' : 'bg-slate-50 text-sky-950 border-transparent hover:border-sky-100'}`}>
                        <div className="flex flex-col items-center gap-1"><span>Online</span><span className="text-[9px] opacity-60 uppercase tracking-widest">Online Payment Gateway</span></div>
                      </button>
                    </div>
                  </div>
                  <button onClick={handleBooking} className="w-full bg-sky-950 text-white py-6 rounded-[32px] font-black uppercase tracking-widest text-sm hover:bg-emerald-600 transition-all shadow-2xl mt-8">Confirm & Generate Token</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
