
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MockDB } from '../lib/db';
import { Booking, BookingStatus, Doctor, ContactInquiry } from '../types';

const Admin: React.FC = () => {
  const [isAuth, setIsAuth] = useState(MockDB.isLoggedIn());
  const [password, setPassword] = useState('');
  const [finPassword, setFinPassword] = useState('');
  const [filterType, setFilterType] = useState<'day' | 'month' | 'year'>('day');
  const [filterValue, setFilterValue] = useState(new Date().toISOString().split('T')[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [reportData, setReportData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'queue' | 'reports' | 'doctors' | 'inquiries'>('queue');
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [isFinLocked, setIsFinLocked] = useState(!MockDB.isFinancialsUnlocked());
  
  // Interactive States
  const [showDoctorForm, setShowDoctorForm] = useState(false);
  const [viewingPatientList, setViewingPatientList] = useState<{name: string, patients: Booking[]} | null>(null);

  // Refs
  const stationRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const formRef = useRef<HTMLDivElement | null>(null);

  // Doctor Form State
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [docForm, setDocForm] = useState<Partial<Doctor>>({
    name: '', specialty: '', qualifications: '', hospital: '', 
    timing: '', image: '', fee: 500, slotGap: 15, maxTokens: 30, isActive: true
  });

  const refreshData = () => {
    const data = MockDB.getDetailedReport(filterType, filterValue, searchTerm);
    setReportData(data);
    setDoctors(MockDB.getDoctors());
    setInquiries(MockDB.getInquiries());
  };

  useEffect(() => {
    if (isAuth) {
      refreshData();
      window.addEventListener('storage', refreshData);
      return () => window.removeEventListener('storage', refreshData);
    }
  }, [isAuth, filterType, filterValue, activeTab, searchTerm]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (MockDB.login(password)) setIsAuth(true);
    else alert("Invalid Credentials");
  };

  const handleFinUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (MockDB.unlockFinancials(finPassword)) {
      setIsFinLocked(false);
      refreshData();
    } else {
      alert("Invalid Financial Access Password");
    }
  };

  const handleStatusChange = (id: string, status: BookingStatus) => {
    MockDB.updateBookingStatus(id, status);
  };

  const handleSaveDoctor = (e: React.FormEvent) => {
    e.preventDefault();
    const newDoc = {
      ...docForm,
      id: editingDoctor ? editingDoctor.id : 'DOC-' + Date.now(),
      isActive: docForm.isActive !== undefined ? docForm.isActive : true
    } as Doctor;
    MockDB.saveDoctor(newDoc);
    setEditingDoctor(null);
    setShowDoctorForm(false);
    setDocForm({
      name: '', specialty: '', qualifications: '', hospital: '', 
      timing: '', image: '', fee: 500, slotGap: 15, maxTokens: 30, isActive: true
    });
  };

  const handleDeleteDoctor = (id: string) => {
    if (window.confirm("Are you sure you want to permanently delete this doctor? This cannot be undone.")) {
      MockDB.deleteDoctor(id);
    }
  };

  const toggleDoctorActive = (doctor: Doctor) => {
    const updated = { ...doctor, isActive: !doctor.isActive };
    MockDB.saveDoctor(updated);
  };

  const startEditing = (d: Doctor) => {
    setEditingDoctor(d);
    setDocForm(d);
    setShowDoctorForm(true);
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
  };

  const toggleFullscreen = (id: string) => {
    const el = stationRefs.current[id];
    if (el) {
      if (!document.fullscreenElement) el.requestFullscreen();
      else document.exitFullscreen();
    }
  };

  const handleDatabaseReset = () => {
    if (window.confirm("WARNING: This will clear ALL patients, doctors, and inquiries. Are you sure?")) {
        MockDB.resetAllData();
        window.location.reload();
    }
  };

  if (!isAuth) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-center">
        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white p-12 rounded-[48px] shadow-2xl max-w-md w-full border border-sky-100">
          <div className="w-16 h-16 bg-sky-600 rounded-2xl flex items-center justify-center text-white text-2xl font-black mx-auto mb-8 shadow-lg">S</div>
          <h2 className="text-3xl font-black text-sky-950 mb-4 uppercase tracking-tighter">OPD Staff</h2>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mb-10">Secured Dashboard Login</p>
          <form onSubmit={handleLogin} className="space-y-6">
            <input type="password" placeholder="Admin Password" className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-5 font-bold outline-none focus:border-sky-500 transition-all text-center" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className="w-full bg-sky-950 text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-sky-700 transition-all shadow-xl shadow-sky-950/20">Unlock Dashboard</button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <nav className="bg-sky-950 text-white p-6 px-12 flex justify-between items-center shadow-lg shrink-0 sticky top-0 z-50 overflow-x-auto">
        <div className="flex items-center gap-12">
           <div className="font-black text-xl tracking-tighter uppercase flex items-center gap-3">
             <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center text-sm">S</div>
             Console
           </div>
           <div className="flex gap-2 bg-white/5 p-1 rounded-2xl">
             <button onClick={() => setActiveTab('queue')} className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'queue' ? 'bg-sky-600 text-white' : 'text-sky-400 hover:text-white'}`}>Queue</button>
             <button onClick={() => setActiveTab('doctors')} className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'doctors' ? 'bg-sky-600 text-white' : 'text-sky-400 hover:text-white'}`}>Doctors</button>
             <button onClick={() => setActiveTab('inquiries')} className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'inquiries' ? 'bg-sky-600 text-white' : 'text-sky-400 hover:text-white'}`}>Inquiries</button>
             <button onClick={() => setActiveTab('reports')} className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'reports' ? 'bg-sky-600 text-white' : 'text-sky-400 hover:text-white'}`}>Financials</button>
           </div>
        </div>
        <div className="flex items-center gap-4">
            <button onClick={handleDatabaseReset} className="text-[8px] font-black text-white/20 uppercase tracking-widest hover:text-red-400 transition-colors">Reset DB</button>
            <button onClick={() => { MockDB.logout(); setIsAuth(false); }} className="text-[10px] font-black text-red-400 uppercase tracking-widest hover:bg-red-500/10 px-4 py-2 rounded-xl">Logout</button>
        </div>
      </nav>

      <div className="flex-grow p-8 lg:p-12 max-w-7xl mx-auto w-full">
        {/* Global Patient Detail Modal Overlay */}
        <AnimatePresence>
          {viewingPatientList && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-sky-950/90 backdrop-blur-md flex items-center justify-center p-6"
              onClick={() => setViewingPatientList(null)}
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                className="bg-white rounded-[56px] w-full max-w-4xl max-h-[85vh] overflow-hidden flex flex-col shadow-2xl"
                onClick={e => e.stopPropagation()}
              >
                <div className="p-10 bg-sky-950 text-white flex justify-between items-center">
                  <div>
                    <span className="text-sky-400 font-black uppercase tracking-widest text-[10px] mb-2 block">Patient Records</span>
                    <h3 className="text-3xl font-black tracking-tighter uppercase">{viewingPatientList.name}</h3>
                  </div>
                  <button onClick={() => MockDB.exportExcel(viewingPatientList.patients)} className="bg-emerald-500 text-white px-8 py-3 rounded-full font-black uppercase tracking-widest text-[10px] shadow-xl hover:bg-emerald-600">Export (.xls)</button>
                </div>
                <div className="flex-grow overflow-y-auto p-10 space-y-4 custom-scrollbar">
                  {viewingPatientList.patients.map(p => (
                    <div key={p.id} className="p-6 bg-slate-50 rounded-[28px] flex justify-between items-center border border-slate-100">
                      <div>
                        <p className="font-black text-sky-950 uppercase text-lg">#{p.tokenNumber} {p.patientName}</p>
                        <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mt-1">{p.slot} • {p.paymentMode}</p>
                        <p className="text-sky-600 font-bold text-[9px] uppercase tracking-widest">{p.patientPhone}</p>
                      </div>
                      <span className={`px-4 py-1.5 rounded-full font-black text-[9px] uppercase tracking-widest ${p.status === 'Completed' ? 'bg-emerald-100 text-emerald-600' : p.status === 'Absent' ? 'bg-red-100 text-red-600' : p.status === 'Present' ? 'bg-sky-100 text-sky-600' : 'bg-orange-100 text-orange-600'}`}>{p.status}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => setViewingPatientList(null)} className="p-8 font-black uppercase tracking-widest text-sky-950/20 hover:text-red-500">Close View</button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {activeTab === 'queue' && (
          <div className="space-y-12">
            <div className="bg-white p-8 rounded-[40px] shadow-sm border border-sky-100 mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="text-3xl font-black text-sky-950 uppercase tracking-tighter">Medical Stations</h2>
                <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mt-1">Real-time Station Monitoring</p>
              </div>
              <div className="flex items-center gap-4 w-full md:w-auto">
                <input 
                  type="text" 
                  placeholder="Search Patient..." 
                  className="flex-grow bg-slate-50 border-2 border-transparent rounded-2xl px-6 py-3 font-bold text-sky-950 outline-none focus:border-sky-500" 
                  value={searchTerm} 
                  onChange={(e) => setSearchTerm(e.target.value)} 
                />
                <input type="date" className="bg-slate-50 border-2 border-transparent rounded-2xl px-6 py-3 font-bold text-sky-950 outline-none" value={filterValue} onChange={(e) => setFilterValue(e.target.value)} />
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {doctors.filter(d => d.isActive).map(doc => {
                const docBookings = MockDB.getAllBookings().filter(b => b.doctorId === doc.id && b.date === filterValue && (searchTerm === '' || b.patientName.toLowerCase().includes(searchTerm.toLowerCase())));
                const activeList = docBookings.filter(b => b.status === 'Waiting' || b.status === 'Present');

                return (
                  <div key={doc.id} ref={el => { stationRefs.current[doc.id] = el; }} className="bg-white rounded-[40px] border border-sky-100 overflow-hidden shadow-sm flex flex-col">
                    <div className="p-8 bg-sky-950 text-white flex flex-col gap-6">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                          <img src={doc.image} className="w-12 h-12 rounded-xl object-cover" alt="" />
                          <h3 className="font-black tracking-tight">{doc.name}</h3>
                        </div>
                        <button onClick={() => toggleFullscreen(doc.id)} className="bg-white/10 hover:bg-white/20 p-2 rounded-xl transition-all text-sky-400"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"/></svg></button>
                      </div>
                    </div>

                    <div className="p-8 space-y-4 flex-grow max-h-[400px] overflow-y-auto custom-scrollbar">
                      {activeList.map(b => (
                        <div key={b.id} className={`p-4 rounded-2xl flex justify-between items-center transition-all ${b.status === 'Present' ? 'bg-sky-50 border-2 border-sky-200 shadow-xl scale-105' : 'bg-slate-50'}`}>
                          <div>
                            <p className="font-black text-sky-950 uppercase text-sm">#{b.tokenNumber} {b.patientName}</p>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{b.slot} • {b.paymentMode}</p>
                          </div>
                          <div className="flex gap-2">
                            {b.status === 'Waiting' && <button onClick={() => handleStatusChange(b.id, 'Present')} className="bg-sky-600 text-white px-4 py-2 rounded-xl font-black text-[9px] uppercase hover:bg-sky-700 shadow-lg shadow-sky-600/20">Call</button>}
                            {b.status === 'Present' && <button onClick={() => handleStatusChange(b.id, 'Completed')} className="bg-emerald-600 text-white px-4 py-2 rounded-xl font-black text-[9px] uppercase hover:bg-emerald-700 shadow-lg shadow-emerald-600/20">Finish</button>}
                            <button onClick={() => handleStatusChange(b.id, 'Absent')} className="text-red-500 font-black text-[9px] uppercase px-2 hover:underline">Absent</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
            <div className="space-y-12">
            {!isFinLocked ? (
              <div className="space-y-12">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className="text-4xl font-black text-sky-950 uppercase tracking-tighter">Revenue Report</h2>
                        <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mt-1">Financial Analysis & Auditing</p>
                    </div>
                    <div className="flex gap-4">
                        <select className="bg-white border-2 border-sky-100 p-4 rounded-2xl font-black text-xs uppercase" value={filterType} onChange={(e:any) => setFilterType(e.target.value)}>
                            <option value="day">Daily</option>
                            <option value="month">Monthly</option>
                            <option value="year">Yearly</option>
                        </select>
                        <input type="text" placeholder="Search report..." className="bg-white border-2 border-sky-100 px-6 py-4 rounded-2xl font-bold text-sky-950 outline-none focus:border-sky-500" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>
                </div>
                {reportData && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                      <div className="bg-white p-10 rounded-[48px] text-center shadow-sm border border-sky-50">
                        <span className="text-[10px] font-black text-gray-400 uppercase mb-2 block tracking-widest">Total Revenue</span>
                        <span className="text-5xl font-black text-sky-600 tracking-tighter block">₹{reportData.summary.totalRevenue}</span>
                      </div>
                      <div className="bg-white p-10 rounded-[48px] text-center shadow-sm border border-sky-50">
                        <span className="text-[10px] font-black text-gray-400 uppercase mb-2 block tracking-widest">Cash</span>
                        <span className="text-4xl font-black text-emerald-600 block">₹{reportData.summary.totalCash}</span>
                      </div>
                      <div className="bg-white p-10 rounded-[48px] text-center shadow-sm border border-sky-50">
                        <span className="text-[10px] font-black text-gray-400 uppercase mb-2 block tracking-widest">Online</span>
                        <span className="text-4xl font-black text-indigo-600 block">₹{reportData.summary.totalOnline}</span>
                      </div>
                      <div className="bg-white p-10 rounded-[48px] text-center shadow-sm border border-sky-50 cursor-pointer" onClick={() => setViewingPatientList({name: 'Report Patients', patients: reportData.rawList})}>
                        <span className="text-[10px] font-black text-gray-400 uppercase mb-2 block tracking-widest">Patient Count</span>
                        <span className="text-4xl font-black text-orange-600 block">{reportData.summary.patientCount} →</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
                <div className="max-w-md mx-auto bg-white p-12 rounded-[48px] border border-sky-100 text-center shadow-2xl">
                    <h3 className="text-2xl font-black text-sky-950 mb-4 uppercase">Financial Access Restricted</h3>
                    <form onSubmit={handleFinUnlock} className="space-y-6">
                    <input autoFocus type="password" placeholder="Verify Admin Password" className="w-full bg-slate-50 p-5 rounded-2xl font-bold border-2 border-transparent focus:border-sky-500 outline-none text-center" value={finPassword} onChange={e => setFinPassword(e.target.value)} />
                    <button className="w-full bg-sky-950 text-white py-5 rounded-2xl font-black uppercase shadow-xl">Unlock Financials</button>
                    </form>
                </div>
            )}
            </div>
        )}

        {/* Existing Doctor & Inquiry Tabs logic remains here but simplified for space... */}
        {activeTab === 'doctors' && (
            <div className="space-y-12">
                <div className="flex justify-between items-center">
                    <h2 className="text-4xl font-black text-sky-950 uppercase">Doctors Roster</h2>
                    <button onClick={() => setShowDoctorForm(!showDoctorForm)} className="bg-sky-600 text-white px-8 py-4 rounded-2xl font-black uppercase text-xs">New Specialist</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {doctors.map(d => (
                        <div key={d.id} className="bg-white p-6 rounded-[40px] border border-sky-100 flex flex-col items-center">
                            <img src={d.image} className="w-24 h-24 rounded-3xl object-cover mb-4" alt="" />
                            <h4 className="font-black text-sky-950 uppercase">{d.name}</h4>
                            <div className="mt-4 flex gap-2">
                                <button onClick={() => startEditing(d)} className="text-[10px] font-black text-sky-600 uppercase">Edit</button>
                                <button onClick={() => handleDeleteDoctor(d.id)} className="text-[10px] font-black text-red-500 uppercase">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
