import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MockDB } from '../lib/db';
import { Booking, BookingStatus, Doctor, ContactInquiry } from '../types';

const Admin: React.FC = () => {
  const [isAuth, setIsAuth] = useState(MockDB.isLoggedIn());
  const [doctorsAuth, setDoctorsAuth] = useState(MockDB.isDoctorsLoggedIn());
  const [inquiriesAuth, setInquiriesAuth] = useState(MockDB.isInquiriesLoggedIn());
  const [financialsAuth, setFinancialsAuth] = useState(MockDB.isFinancialsLoggedIn());
  
  const [password, setPassword] = useState('');
  const [doctorsPassword, setDoctorsPassword] = useState('');
  const [inquiriesPassword, setInquiriesPassword] = useState('');
  const [financialsPassword, setFinancialsPassword] = useState('');
  
  const [filterType, setFilterType] = useState<'day' | 'month' | 'year' | 'range'>('day');
  const [filterValue, setFilterValue] = useState(new Date().toISOString().split('T')[0]);
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [reportData, setReportData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'queue' | 'reports' | 'doctors' | 'inquiries'>('queue');
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  
  // Password visibility states
  const [showPassword, setShowPassword] = useState(false);
  const [showDoctorsPassword, setShowDoctorsPassword] = useState(false);
  const [showInquiriesPassword, setShowInquiriesPassword] = useState(false);
  const [showFinancialsPassword, setShowFinancialsPassword] = useState(false);
  
  // Error states
  const [loginError, setLoginError] = useState('');
  const [doctorsError, setDoctorsError] = useState('');
  const [inquiriesError, setInquiriesError] = useState('');
  const [financialsError, setFinancialsError] = useState('');

  // Interactive States
  const [showDoctorForm, setShowDoctorForm] = useState(false);
  const [viewingPatientList, setViewingPatientList] = useState<{name: string, patients: Booking[]} | null>(null);

  // Refs
  const stationRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const formRef = useRef<HTMLDivElement | null>(null);

  // Doctor Form State
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [docForm, setDocForm] = useState<Partial<Doctor>>({
    name: '', 
    specialty: '', 
    qualifications: '', 
    hospital: '', 
    timing: '', 
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400', 
    fee: 500, 
    slotGap: 15, 
    maxTokens: 30, 
    isActive: true
  });

  const refreshData = () => {
    let data;
    if (filterType === 'range' && activeTab === 'reports') {
      data = getDateRangeReport(startDate, endDate, searchTerm);
    } else if (activeTab === 'reports') {
      data = MockDB.getDetailedReport(filterType, filterValue, searchTerm);
    } else {
      data = MockDB.getDetailedReport('day', filterValue, searchTerm);
    }
    
    setReportData(data);
    const updatedDoctors = MockDB.getDoctors();
    setDoctors(updatedDoctors);
    setInquiries(MockDB.getInquiries());
  };

  const getDateRangeReport = (start: string, end: string, search: string = '') => {
    const all = MockDB.getAllBookings();
    const filtered = all.filter(b => {
      const bookingDate = b.date;
      const matchesDate = bookingDate >= start && bookingDate <= end;
      const matchesSearch = search === '' || 
                          b.patientName.toLowerCase().includes(search.toLowerCase()) || 
                          b.patientPhone.includes(search);
                          
      return matchesDate && matchesSearch;
    });

    const doctorStats: Record<string, any> = {};
    let totalRevenue = 0;
    let totalCash = 0;
    let totalOnline = 0;

    filtered.forEach(b => {
      const docName = b.doctorName;
      if (!doctorStats[docName]) {
        doctorStats[docName] = { revenue: 0, cash: 0, online: 0, patients: 0 };
      }
      doctorStats[docName].revenue += b.fee;
      doctorStats[docName].patients += 1;
      totalRevenue += b.fee;
      
      if (b.paymentMode === 'Online') {
        doctorStats[docName].online += b.fee;
        totalOnline += b.fee;
      } else {
        doctorStats[docName].cash += b.fee;
        totalCash += b.fee;
      }
    });

    return {
      summary: { 
        totalRevenue, 
        totalCash, 
        totalOnline, 
        patientCount: filtered.length,
        startDate: start,
        endDate: end
      },
      doctorWise: Object.entries(doctorStats).map(([name, stats]) => ({ name, ...stats })),
      rawList: filtered
    };
  };

  const exportDoctorBookings = (doctorId: string, doctorName: string) => {
    const allBookings = MockDB.getAllBookings();
    const doctorBookings = allBookings.filter(b => 
      b.doctorId === doctorId && 
      b.date === filterValue && 
      b.status !== 'Absent'
    );
    
    if (doctorBookings.length === 0) {
      alert(`No bookings found for ${doctorName} on ${filterValue}`);
      return;
    }
    
    MockDB.exportExcel(doctorBookings);
  };

  const exportDateRangeData = () => {
    let data;
    if (filterType === 'range') {
      data = getDateRangeReport(startDate, endDate, searchTerm);
    } else {
      data = MockDB.getDetailedReport(filterType, filterValue, searchTerm);
    }
    
    if (data.rawList.length === 0) {
      alert(`No data found for the selected ${filterType === 'range' ? 'date range' : 'filter'}`);
      return;
    }
    
    MockDB.exportExcel(data.rawList);
  };

  useEffect(() => {
    if (isAuth) {
      refreshData();
      window.addEventListener('storage', refreshData);
      return () => window.removeEventListener('storage', refreshData);
    }
  }, [isAuth, filterType, filterValue, startDate, endDate, activeTab, searchTerm]);

  // Check all sessions on mount and storage events
  useEffect(() => {
    const checkAllSessions = () => {
      setIsAuth(MockDB.isLoggedIn());
      setDoctorsAuth(MockDB.isDoctorsLoggedIn());
      setInquiriesAuth(MockDB.isInquiriesLoggedIn());
      setFinancialsAuth(MockDB.isFinancialsLoggedIn());
    };
    
    checkAllSessions();
    window.addEventListener('storage', checkAllSessions);
    return () => window.removeEventListener('storage', checkAllSessions);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    
    if (MockDB.login(password)) {
      setIsAuth(true);
      refreshData();
    } else {
      setLoginError("Invalid Admin Password");
    }
  };

  const handleDoctorsLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setDoctorsError('');
    
    if (MockDB.loginDoctors(doctorsPassword)) {
      setDoctorsAuth(true);
      refreshData();
    } else {
      setDoctorsError("Invalid Password");
    }
  };

  const handleInquiriesLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setInquiriesError('');
    
    if (MockDB.loginInquiries(inquiriesPassword)) {
      setInquiriesAuth(true);
      refreshData();
    } else {
      setInquiriesError("Invalid Password");
    }
  };

  const handleFinancialsLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setFinancialsError('');
    
    if (MockDB.loginFinancials(financialsPassword)) {
      setFinancialsAuth(true);
      refreshData();
    } else {
      setFinancialsError("Invalid Password");
    }
  };

  const handleStatusChange = (id: string, status: BookingStatus) => {
    MockDB.updateBookingStatus(id, status);
    refreshData();
  };

  const handleSaveDoctor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docForm.name || !docForm.specialty || !docForm.timing) {
      alert("Please fill in required fields: Name, Specialty, and Timing");
      return;
    }

    const newDoc = {
      ...docForm,
      id: editingDoctor ? editingDoctor.id : 'DOC-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      isActive: docForm.isActive !== undefined ? docForm.isActive : true
    } as Doctor;
    
    MockDB.saveDoctor(newDoc);
    resetDoctorForm();
    refreshData();
  };

  const resetDoctorForm = () => {
    setEditingDoctor(null);
    setShowDoctorForm(false);
    setDocForm({
      name: '', 
      specialty: '', 
      qualifications: '', 
      hospital: '', 
      timing: '', 
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400', 
      fee: 500, 
      slotGap: 15, 
      maxTokens: 30, 
      isActive: true
    });
  };

  const handleDeleteDoctor = (id: string) => {
    if (window.confirm("Are you sure you want to permanently delete this doctor? This cannot be undone.")) {
      MockDB.deleteDoctor(id);
      refreshData();
    }
  };

  const toggleDoctorActive = (doctor: Doctor) => {
    const updated = { ...doctor, isActive: !doctor.isActive };
    MockDB.saveDoctor(updated);
    refreshData();
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
      if (!document.fullscreenElement) {
        el.requestFullscreen().catch(err => {
          console.error(`Error attempting to enable full-screen mode: ${err.message}`);
        });
      } else {
        document.exitFullscreen();
      }
    }
  };

  const handleDatabaseReset = () => {
    if (window.confirm("WARNING: This will clear ALL patients, doctors, and inquiries. Are you sure?")) {
      MockDB.resetAllData();
      refreshData();
    }
  };

  const deleteInquiry = (id: string) => {
    if (window.confirm("Delete this inquiry?")) {
      MockDB.deleteInquiry(id);
      refreshData();
    }
  };

  const handleLogout = () => {
    MockDB.logout();
    MockDB.logoutDoctors();
    MockDB.logoutInquiries();
    MockDB.logoutFinancials();
    setIsAuth(false);
    setDoctorsAuth(false);
    setInquiriesAuth(false);
    setFinancialsAuth(false);
  };

  const handleTabChange = (tab: 'queue' | 'reports' | 'doctors' | 'inquiries') => {
    setActiveTab(tab);
  };

  if (!isAuth) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-center">
        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white p-12 rounded-[48px] shadow-2xl max-w-md w-full border border-sky-100">
          <div className="w-16 h-16 bg-sky-600 rounded-2xl flex items-center justify-center text-white text-2xl font-black mx-auto mb-8 shadow-lg">S</div>
          <h2 className="text-3xl font-black text-sky-950 mb-4 uppercase tracking-tighter">OPD Staff</h2>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mb-10">Secured Dashboard Login</p>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Admin Password" 
                className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-5 font-bold outline-none focus:border-sky-500 transition-all text-center pr-12" 
                value={password} 
                onChange={(e) => {
                  setPassword(e.target.value);
                  setLoginError('');
                }} 
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-sky-600"
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
                className="text-red-500 text-sm font-bold"
              >
                {loginError}
              </motion.p>
            )}
            <button className="w-full bg-sky-950 text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-sky-700 transition-all shadow-xl shadow-sky-950/20">
              Unlock Dashboard
            </button>
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
            <button onClick={() => handleTabChange('queue')} className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'queue' ? 'bg-sky-600 text-white' : 'text-sky-400 hover:text-white'}`}>
              Queue
            </button>
            <button onClick={() => handleTabChange('doctors')} className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'doctors' ? 'bg-sky-600 text-white' : 'text-sky-400 hover:text-white'}`}>
              Doctors
            </button>
            <button onClick={() => handleTabChange('inquiries')} className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'inquiries' ? 'bg-sky-600 text-white' : 'text-sky-400 hover:text-white'}`}>
              Inquiries
            </button>
            <button onClick={() => handleTabChange('reports')} className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'reports' ? 'bg-sky-600 text-white' : 'text-sky-400 hover:text-white'}`}>
              Financials
            </button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={handleDatabaseReset} className="text-[8px] font-black text-white/20 uppercase tracking-widest hover:text-red-400 transition-colors">
            Reset DB
          </button>
          <button onClick={handleLogout} className="text-[10px] font-black text-red-400 uppercase tracking-widest hover:bg-red-500/10 px-4 py-2 rounded-xl">
            Logout All
          </button>
        </div>
      </nav>

      <div className="flex-grow p-8 lg:p-12 max-w-7xl mx-auto w-full">
        {/* Global Patient Detail Modal Overlay */}
        <AnimatePresence>
          {viewingPatientList && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-sky-950/90 backdrop-blur-md flex items-center justify-center p-6"
              onClick={() => setViewingPatientList(null)}
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }} 
                animate={{ scale: 1, y: 0 }} 
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white rounded-[56px] w-full max-w-4xl max-h-[85vh] overflow-hidden flex flex-col shadow-2xl"
                onClick={e => e.stopPropagation()}
              >
                <div className="p-10 bg-sky-950 text-white flex justify-between items-center">
                  <div>
                    <span className="text-sky-400 font-black uppercase tracking-widest text-[10px] mb-2 block">Patient Records</span>
                    <h3 className="text-3xl font-black tracking-tighter uppercase">{viewingPatientList.name}</h3>
                  </div>
                  <button onClick={() => MockDB.exportExcel(viewingPatientList.patients)} className="bg-emerald-500 text-white px-8 py-3 rounded-full font-black uppercase tracking-widest text-[10px] shadow-xl hover:bg-emerald-600">
                    Export (.xls)
                  </button>
                </div>
                <div className="flex-grow overflow-y-auto p-10 space-y-4 custom-scrollbar">
                  {viewingPatientList.patients.map(p => (
                    <div key={p.id} className="p-6 bg-slate-50 rounded-[28px] flex justify-between items-center border border-slate-100">
                      <div>
                        <p className="font-black text-sky-950 uppercase text-lg">#{p.tokenNumber} {p.patientName}</p>
                        <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mt-1">{p.slot} • {p.paymentMode}</p>
                        <p className="text-sky-600 font-bold text-[9px] uppercase tracking-widest">{p.patientPhone}</p>
                      </div>
                      <span className={`px-4 py-1.5 rounded-full font-black text-[9px] uppercase tracking-widest ${p.status === 'Completed' ? 'bg-emerald-100 text-emerald-600' : p.status === 'Absent' ? 'bg-red-100 text-red-600' : p.status === 'Present' ? 'bg-sky-100 text-sky-600' : 'bg-orange-100 text-orange-600'}`}>
                        {p.status}
                      </span>
                    </div>
                  ))}
                </div>
                <button onClick={() => setViewingPatientList(null)} className="p-8 font-black uppercase tracking-widest text-sky-950/20 hover:text-red-500">
                  Close View
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Doctor Form Modal */}
        <AnimatePresence>
          {showDoctorForm && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[90] bg-sky-950/90 backdrop-blur-md flex items-center justify-center p-6"
              onClick={() => resetDoctorForm()}
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }} 
                animate={{ scale: 1, y: 0 }} 
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white rounded-[56px] w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
                onClick={e => e.stopPropagation()}
                ref={formRef}
              >
                <div className="p-10 bg-sky-950 text-white flex justify-between items-center">
                  <div>
                    <span className="text-sky-400 font-black uppercase tracking-widest text-[10px] mb-2 block">
                      {editingDoctor ? 'Edit Doctor' : 'Add New Specialist'}
                    </span>
                    <h3 className="text-3xl font-black tracking-tighter uppercase">
                      {editingDoctor ? editingDoctor.name : 'New Doctor Profile'}
                    </h3>
                  </div>
                  <button onClick={resetDoctorForm} className="text-white/60 hover:text-white text-2xl">
                    ×
                  </button>
                </div>
                
                <div className="flex-grow overflow-y-auto p-10 space-y-6">
                  <form onSubmit={handleSaveDoctor} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-sky-950 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-6 py-4 font-bold outline-none focus:border-sky-500"
                          value={docForm.name}
                          onChange={(e) => setDocForm({...docForm, name: e.target.value})}
                          placeholder="Dr. John Doe, M.D."
                        />
                      </div>
                      
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-sky-950 mb-2">
                          Specialty *
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-6 py-4 font-bold outline-none focus:border-sky-500"
                          value={docForm.specialty}
                          onChange={(e) => setDocForm({...docForm, specialty: e.target.value})}
                          placeholder="Skin & VD Specialist"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-sky-950 mb-2">
                        Qualifications
                      </label>
                      <input
                        type="text"
                        className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-6 py-4 font-bold outline-none focus:border-sky-500"
                        value={docForm.qualifications}
                        onChange={(e) => setDocForm({...docForm, qualifications: e.target.value})}
                        placeholder="Professor of Skin, V.D. & Leprosy"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-sky-950 mb-2">
                        Hospital / Clinic
                      </label>
                      <input
                        type="text"
                        className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-6 py-4 font-bold outline-none focus:border-sky-500"
                        value={docForm.hospital}
                        onChange={(e) => setDocForm({...docForm, hospital: e.target.value})}
                        placeholder="Skin Care OPD, Brahmapur"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-sky-950 mb-2">
                          Consultation Fee (₹)
                        </label>
                        <input
                          type="number"
                          className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-6 py-4 font-bold outline-none focus:border-sky-500"
                          value={docForm.fee}
                          onChange={(e) => setDocForm({...docForm, fee: parseInt(e.target.value) || 500})}
                          min="0"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-sky-950 mb-2">
                          Slot Gap (minutes)
                        </label>
                        <input
                          type="number"
                          className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-6 py-4 font-bold outline-none focus:border-sky-500"
                          value={docForm.slotGap}
                          onChange={(e) => setDocForm({...docForm, slotGap: parseInt(e.target.value) || 15})}
                          min="5"
                          max="60"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-sky-950 mb-2">
                          Max Tokens per Day
                        </label>
                        <input
                          type="number"
                          className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-6 py-4 font-bold outline-none focus:border-sky-500"
                          value={docForm.maxTokens}
                          onChange={(e) => setDocForm({...docForm, maxTokens: parseInt(e.target.value) || 30})}
                          min="1"
                          max="100"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-sky-950 mb-2">
                        Timing Schedule *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-6 py-4 font-bold outline-none focus:border-sky-500"
                        value={docForm.timing}
                        onChange={(e) => setDocForm({...docForm, timing: e.target.value})}
                        placeholder="Mon-Sat: 09:00-18:00, Sun: 09:00-10:00"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-sky-950 mb-2">
                        Profile Image URL
                      </label>
                      <input
                        type="text"
                        className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-6 py-4 font-bold outline-none focus:border-sky-500"
                        value={docForm.image}
                        onChange={(e) => setDocForm({...docForm, image: e.target.value})}
                        placeholder="https://images.unsplash.com/photo-..."
                      />
                    </div>

                    <div className="flex items-center gap-4">
                      <input
                        type="checkbox"
                        id="isActive"
                        checked={docForm.isActive}
                        onChange={(e) => setDocForm({...docForm, isActive: e.target.checked})}
                        className="w-5 h-5 rounded"
                      />
                      <label htmlFor="isActive" className="text-sky-950 font-bold">
                        Active (Available for appointments)
                      </label>
                    </div>

                    <div className="flex justify-end gap-4 pt-6">
                      <button
                        type="button"
                        onClick={resetDoctorForm}
                        className="px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] bg-slate-100 text-sky-950 hover:bg-slate-200"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] bg-sky-600 text-white hover:bg-sky-700"
                      >
                        {editingDoctor ? 'Update Doctor' : 'Add Specialist'}
                      </button>
                    </div>
                  </form>
                </div>
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
                <input 
                  type="date" 
                  className="bg-slate-50 border-2 border-transparent rounded-2xl px-6 py-3 font-bold text-sky-950 outline-none" 
                  value={filterValue} 
                  onChange={(e) => setFilterValue(e.target.value)} 
                />
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {doctors.filter(d => d.isActive).map(doc => {
                const docBookings = MockDB.getAllBookings().filter(b => 
                  b.doctorId === doc.id && 
                  b.date === filterValue && 
                  (searchTerm === '' || b.patientName.toLowerCase().includes(searchTerm.toLowerCase()))
                );
                const activeList = docBookings.filter(b => b.status === 'Waiting' || b.status === 'Present' || b.status === 'Completed');
                const completedCount = docBookings.filter(b => b.status === 'Completed').length;
                const waitingCount = docBookings.filter(b => b.status === 'Waiting').length;

                return (
                  <div key={doc.id} ref={el => { stationRefs.current[doc.id] = el; }} className="bg-white rounded-[40px] border border-sky-100 overflow-hidden shadow-sm flex flex-col">
                    <div className="p-8 bg-sky-950 text-white flex flex-col gap-6">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                          <img src={doc.image} className="w-12 h-12 rounded-xl object-cover" alt={doc.name} />
                          <div>
                            <h3 className="font-black tracking-tight">{doc.name.split(',')[0]}</h3>
                            <div className="flex items-center gap-3 mt-2">
                              <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full text-[8px] font-black uppercase">
                                Completed: {completedCount}
                              </span>
                              <span className="bg-orange-500/20 text-orange-300 px-2 py-0.5 rounded-full text-[8px] font-black uppercase">
                                Waiting: {waitingCount}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => exportDoctorBookings(doc.id, doc.name)}
                            className="bg-emerald-500 text-white px-4 py-2 rounded-xl font-black text-[9px] uppercase hover:bg-emerald-600 shadow-lg shadow-emerald-500/20 flex items-center gap-1"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                            </svg>
                            Export
                          </button>
                          <button onClick={() => toggleFullscreen(doc.id)} className="bg-white/10 hover:bg-white/20 p-2 rounded-xl transition-all text-sky-400">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"/>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="p-8 space-y-4 flex-grow max-h-[400px] overflow-y-auto custom-scrollbar">
                      {activeList.length === 0 ? (
                        <div className="text-center py-10 text-gray-400">
                          <p className="font-bold">No bookings for today</p>
                          <p className="text-sm mt-2">No patients scheduled for {filterValue}</p>
                        </div>
                      ) : (
                        activeList.map(b => (
                          <div key={b.id} className={`p-4 rounded-2xl flex justify-between items-center transition-all ${b.status === 'Present' ? 'bg-sky-50 border-2 border-sky-200 shadow-xl' : b.status === 'Completed' ? 'bg-emerald-50 border border-emerald-100' : 'bg-slate-50'}`}>
                            <div>
                              <p className="font-black text-sky-950 uppercase text-sm">#{b.tokenNumber} {b.patientName}</p>
                              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{b.slot} • {b.paymentMode}</p>
                            </div>
                            <div className="flex gap-2">
                              {b.status === 'Waiting' && (
                                <button onClick={() => handleStatusChange(b.id, 'Present')} className="bg-sky-600 text-white px-4 py-2 rounded-xl font-black text-[9px] uppercase hover:bg-sky-700 shadow-lg shadow-sky-600/20">
                                  Call
                                </button>
                              )}
                              {b.status === 'Present' && (
                                <button onClick={() => handleStatusChange(b.id, 'Completed')} className="bg-emerald-600 text-white px-4 py-2 rounded-xl font-black text-[9px] uppercase hover:bg-emerald-700 shadow-lg shadow-emerald-600/20">
                                  Finish
                                </button>
                              )}
                              <button onClick={() => handleStatusChange(b.id, 'Absent')} className="text-red-500 font-black text-[9px] uppercase px-2 hover:underline">
                                Absent
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="space-y-12">
            {!financialsAuth ? (
              <div className="max-w-md mx-auto bg-white p-12 rounded-[48px] border border-sky-100 text-center shadow-2xl">
                <h3 className="text-2xl font-black text-sky-950 mb-4 uppercase">Financial Access Restricted</h3>
                <form onSubmit={handleFinancialsLogin} className="space-y-6">
                  <div className="relative">
                    <input 
                      autoFocus 
                      type={showFinancialsPassword ? "text" : "password"} 
                      placeholder="Enter Financials Password" 
                      className="w-full bg-slate-50 p-5 rounded-2xl font-bold border-2 border-transparent focus:border-sky-500 outline-none text-center pr-12" 
                      value={financialsPassword} 
                      onChange={e => {
                        setFinancialsPassword(e.target.value);
                        setFinancialsError('');
                      }} 
                    />
                    <button
                      type="button"
                      onClick={() => setShowFinancialsPassword(!showFinancialsPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-sky-600"
                    >
                      {showFinancialsPassword ? (
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
                  {financialsError && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm font-bold"
                    >
                      {financialsError}
                    </motion.p>
                  )}
                  <button className="w-full bg-sky-950 text-white py-5 rounded-2xl font-black uppercase shadow-xl">
                    Unlock Financials
                  </button>
                </form>
              </div>
            ) : (
              <div className="space-y-12">
                <div className="flex justify-between items-end mb-8">
                  <div>
                    <h2 className="text-4xl font-black text-sky-950 uppercase tracking-tighter">Revenue Report</h2>
                    <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mt-1">Financial Analysis & Auditing</p>
                  </div>
                  <div className="flex gap-4">
                    <select 
                      className="bg-white border-2 border-sky-100 p-4 rounded-2xl font-black text-xs uppercase" 
                      value={filterType} 
                      onChange={(e: any) => setFilterType(e.target.value)}
                    >
                      <option value="day">Daily</option>
                      <option value="month">Monthly</option>
                      <option value="year">Yearly</option>
                      <option value="range">Date Range</option>
                    </select>
                    
                    {filterType === 'range' ? (
                      <div className="flex gap-2">
                        <input 
                          type="date" 
                          className="bg-white border-2 border-sky-100 px-4 py-4 rounded-2xl font-bold text-sky-950 outline-none focus:border-sky-500"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                        />
                        <span className="flex items-center text-gray-400 font-bold">to</span>
                        <input 
                          type="date" 
                          className="bg-white border-2 border-sky-100 px-4 py-4 rounded-2xl font-bold text-sky-950 outline-none focus:border-sky-500"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                        />
                      </div>
                    ) : filterType === 'day' ? (
                      <input 
                        type="date" 
                        className="bg-white border-2 border-sky-100 px-6 py-4 rounded-2xl font-bold text-sky-950 outline-none focus:border-sky-500"
                        value={filterValue}
                        onChange={(e) => setFilterValue(e.target.value)}
                      />
                    ) : filterType === 'month' ? (
                      <input 
                        type="month" 
                        className="bg-white border-2 border-sky-100 px-6 py-4 rounded-2xl font-bold text-sky-950 outline-none focus:border-sky-500"
                        value={filterValue}
                        onChange={(e) => setFilterValue(e.target.value)}
                      />
                    ) : (
                      <input 
                        type="number" 
                        min="2000" 
                        max="2100"
                        className="bg-white border-2 border-sky-100 px-6 py-4 rounded-2xl font-bold text-sky-950 outline-none focus:border-sky-500 w-32"
                        value={filterValue}
                        onChange={(e) => setFilterValue(e.target.value)}
                        placeholder="Year"
                      />
                    )}
                    
                    <input 
                      type="text" 
                      placeholder="Search report..." 
                      className="bg-white border-2 border-sky-100 px-6 py-4 rounded-2xl font-bold text-sky-950 outline-none focus:border-sky-500" 
                      value={searchTerm} 
                      onChange={(e) => setSearchTerm(e.target.value)} 
                    />
                    
                    <button 
                      onClick={exportDateRangeData}
                      className="bg-emerald-500 text-white px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-emerald-600 flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                      </svg>
                      Export
                    </button>
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
                      <div 
                        className="bg-white p-10 rounded-[48px] text-center shadow-sm border border-sky-50 cursor-pointer" 
                        onClick={() => setViewingPatientList({name: 'Report Patients', patients: reportData.rawList})}
                      >
                        <span className="text-[10px] font-black text-gray-400 uppercase mb-2 block tracking-widest">Patient Count</span>
                        <span className="text-4xl font-black text-orange-600 block">{reportData.summary.patientCount} →</span>
                      </div>
                    </div>
                    
                    {filterType === 'range' && (
                      <div className="bg-sky-50 p-8 rounded-[40px] text-center">
                        <p className="text-sky-700 font-bold">
                          Showing data from {reportData.summary.startDate} to {reportData.summary.endDate}
                        </p>
                      </div>
                    )}
                    
                    {reportData.doctorWise.length > 0 && (
                      <div className="bg-white p-8 rounded-[40px] shadow-sm border border-sky-100">
                        <div className="flex justify-between items-center mb-6">
                          <h3 className="text-2xl font-black text-sky-950">Doctor-wise Breakdown</h3>
                          <button 
                            onClick={() => setViewingPatientList({name: 'All Patients', patients: reportData.rawList})}
                            className="text-sky-600 font-black text-[10px] uppercase tracking-widest hover:text-sky-800"
                          >
                            View All Patients →
                          </button>
                        </div>
                        <div className="space-y-4">
                          {reportData.doctorWise.map((doc: any, idx: number) => (
                            <div key={idx} className="p-4 bg-slate-50 rounded-2xl flex justify-between items-center hover:bg-slate-100 transition-colors">
                              <span className="font-black text-sky-950">{doc.name}</span>
                              <div className="flex gap-6">
                                <div className="text-center">
                                  <span className="text-xs font-black text-gray-400 block">Revenue</span>
                                  <span className="text-sm font-bold text-sky-600">₹{doc.revenue}</span>
                                </div>
                                <div className="text-center">
                                  <span className="text-xs font-black text-gray-400 block">Cash</span>
                                  <span className="text-sm font-bold text-emerald-600">₹{doc.cash}</span>
                                </div>
                                <div className="text-center">
                                  <span className="text-xs font-black text-gray-400 block">Online</span>
                                  <span className="text-sm font-bold text-indigo-600">₹{doc.online}</span>
                                </div>
                                <div className="text-center">
                                  <span className="text-xs font-black text-gray-400 block">Patients</span>
                                  <span className="text-sm font-bold text-orange-600">{doc.patients}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'doctors' && (
          <div className="space-y-12">
            {!doctorsAuth ? (
              <div className="max-w-md mx-auto bg-white p-12 rounded-[48px] border border-sky-100 text-center shadow-2xl">
                <h3 className="text-2xl font-black text-sky-950 mb-4 uppercase">Doctors Management Restricted</h3>
                <form onSubmit={handleDoctorsLogin} className="space-y-6">
                  <div className="relative">
                    <input 
                      autoFocus 
                      type={showDoctorsPassword ? "text" : "password"} 
                      placeholder="Enter Doctors Password" 
                      className="w-full bg-slate-50 p-5 rounded-2xl font-bold border-2 border-transparent focus:border-sky-500 outline-none text-center pr-12" 
                      value={doctorsPassword} 
                      onChange={e => {
                        setDoctorsPassword(e.target.value);
                        setDoctorsError('');
                      }} 
                    />
                    <button
                      type="button"
                      onClick={() => setShowDoctorsPassword(!showDoctorsPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-sky-600"
                    >
                      {showDoctorsPassword ? (
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
                  {doctorsError && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm font-bold"
                    >
                      {doctorsError}
                    </motion.p>
                  )}
                  <button className="w-full bg-sky-950 text-white py-5 rounded-2xl font-black uppercase shadow-xl">
                    Unlock Doctors
                  </button>
                </form>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center">
                  <h2 className="text-4xl font-black text-sky-950 uppercase">Doctors Roster</h2>
                  <button 
                    onClick={() => setShowDoctorForm(true)} 
                    className="bg-sky-600 text-white px-8 py-4 rounded-2xl font-black uppercase text-xs hover:bg-sky-700"
                  >
                    New Specialist
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {doctors.map(d => (
                    <div key={d.id} className="bg-white p-8 rounded-[40px] border border-sky-100 shadow-sm hover:shadow-xl transition-shadow">
                      <div className="flex items-start gap-6 mb-6">
                        <img src={d.image} className="w-20 h-20 rounded-3xl object-cover" alt={d.name} />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-black text-sky-950 text-lg truncate">{d.name.split(',')[0]}</h4>
                          <span className="text-sky-600 font-bold text-[10px] uppercase tracking-widest block mt-1">{d.specialty}</span>
                          <div className="flex items-center gap-2 mt-2">
                            <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase ${d.isActive ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                              {d.isActive ? 'Active' : 'Inactive'}
                            </span>
                            <span className="text-gray-500 font-bold text-[9px]">Fee: ₹{d.fee}</span>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{d.qualifications}</p>
                      <p className="text-gray-500 text-xs mb-6">{d.hospital}</p>
                      
                      <div className="flex justify-between items-center pt-6 border-t border-sky-50">
                        <div className="flex gap-2">
                          <button onClick={() => startEditing(d)} className="bg-sky-100 text-sky-600 px-4 py-2 rounded-xl font-black text-[10px] uppercase hover:bg-sky-200">
                            Edit
                          </button>
                          <button onClick={() => toggleDoctorActive(d)} className={`px-4 py-2 rounded-xl font-black text-[10px] uppercase ${d.isActive ? 'bg-orange-100 text-orange-600 hover:bg-orange-200' : 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200'}`}>
                            {d.isActive ? 'Deactivate' : 'Activate'}
                          </button>
                        </div>
                        <button onClick={() => handleDeleteDoctor(d.id)} className="text-red-500 font-black text-[10px] uppercase hover:text-red-700">
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {activeTab === 'inquiries' && (
          <div className="space-y-12">
            {!inquiriesAuth ? (
              <div className="max-w-md mx-auto bg-white p-12 rounded-[48px] border border-sky-100 text-center shadow-2xl">
                <h3 className="text-2xl font-black text-sky-950 mb-4 uppercase">Inquiries Access Restricted</h3>
                <form onSubmit={handleInquiriesLogin} className="space-y-6">
                  <div className="relative">
                    <input 
                      autoFocus 
                      type={showInquiriesPassword ? "text" : "password"} 
                      placeholder="Enter Inquiries Password" 
                      className="w-full bg-slate-50 p-5 rounded-2xl font-bold border-2 border-transparent focus:border-sky-500 outline-none text-center pr-12" 
                      value={inquiriesPassword} 
                      onChange={e => {
                        setInquiriesPassword(e.target.value);
                        setInquiriesError('');
                      }} 
                    />
                    <button
                      type="button"
                      onClick={() => setShowInquiriesPassword(!showInquiriesPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-sky-600"
                    >
                      {showInquiriesPassword ? (
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
                  {inquiriesError && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm font-bold"
                    >
                      {inquiriesError}
                    </motion.p>
                  )}
                  <button className="w-full bg-sky-950 text-white py-5 rounded-2xl font-black uppercase shadow-xl">
                    Unlock Inquiries
                  </button>
                </form>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center">
                  <h2 className="text-4xl font-black text-sky-950 uppercase">Contact Inquiries</h2>
                  <span className="bg-sky-100 text-sky-600 px-4 py-2 rounded-xl font-black text-xs">
                    {inquiries.length} Messages
                  </span>
                </div>
                
                <div className="space-y-6">
                  {inquiries.length === 0 ? (
                    <div className="bg-white p-12 rounded-[40px] text-center border border-sky-100">
                      <p className="text-gray-400 text-lg">No inquiries yet.</p>
                    </div>
                  ) : (
                    inquiries.map((inq) => (
                      <div key={inq.id} className="bg-white p-8 rounded-[40px] border border-sky-100 shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="font-black text-sky-950 text-xl">{inq.name}</h4>
                            <p className="text-sky-600 font-bold text-sm">{inq.email}</p>
                            {inq.phone && <p className="text-gray-500 text-sm mt-1">{inq.phone}</p>}
                          </div>
                          <div className="text-right">
                            <span className="text-gray-400 text-xs block">{new Date(inq.createdAt).toLocaleDateString()}</span>
                            <span className="text-gray-400 text-xs block">{new Date(inq.createdAt).toLocaleTimeString()}</span>
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <span className="bg-sky-50 text-sky-600 px-3 py-1 rounded-full text-[10px] font-black uppercase">
                            {inq.subject}
                          </span>
                        </div>
                        
                        <p className="text-gray-600 mb-6">{inq.message}</p>
                        
                        <div className="flex justify-end">
                          <button 
                            onClick={() => deleteInquiry(inq.id)} 
                            className="text-red-500 font-black text-[10px] uppercase hover:text-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;