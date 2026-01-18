// lib/db.ts
import { Booking, Doctor, BookingStatus, ContactInquiry } from '../types';
import { DOCTORS as INITIAL_DOCTORS } from '../constants';

const triggerSync = () => {
  window.dispatchEvent(new Event('storage'));
};

// Session timeout constants
const ADMIN_SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes for security
const LIVE_DISPLAY_TIMEOUT = 60 * 60 * 1000; // 60 minutes for live display
const DOCTORS_SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes
const INQUIRIES_SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes
const FINANCIALS_SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

// Helper function for session checking
const checkSession = (sessionKey: string, timeKey: string, timeout: number): boolean => {
  const session = localStorage.getItem(sessionKey);
  const sessionTime = localStorage.getItem(timeKey);
  
  if (!session || !sessionTime) {
    localStorage.removeItem(sessionKey);
    localStorage.removeItem(timeKey);
    return false;
  }
  
  const timeDiff = Date.now() - parseInt(sessionTime);
  
  if (timeDiff > timeout) {
    localStorage.removeItem(sessionKey);
    localStorage.removeItem(timeKey);
    triggerSync();
    return false;
  }
  return true;
};

export const MockDB = {
  // --- AUTHENTICATION ---
  login: (password: string): boolean => {
    if (password === 'admin123') {
      localStorage.setItem('opd_session', 'active_' + Date.now());
      localStorage.setItem('opd_session_time', Date.now().toString());
      triggerSync();
      return true;
    }
    return false;
  },

  loginLiveDisplay: (password: string): boolean => {
    if (password === 'display123') {
      localStorage.setItem('opd_live_display_session', 'active_' + Date.now());
      localStorage.setItem('opd_live_display_session_time', Date.now().toString());
      triggerSync();
      return true;
    }
    return false;
  },

  loginDoctors: (password: string): boolean => {
    if (password === 'admin123') {
      localStorage.setItem('opd_doctors_session', 'active_' + Date.now());
      localStorage.setItem('opd_doctors_session_time', Date.now().toString());
      triggerSync();
      return true;
    }
    return false;
  },

  loginInquiries: (password: string): boolean => {
    if (password === 'admin123') {
      localStorage.setItem('opd_inquiries_session', 'active_' + Date.now());
      localStorage.setItem('opd_inquiries_session_time', Date.now().toString());
      triggerSync();
      return true;
    }
    return false;
  },

  loginFinancials: (password: string): boolean => {
    if (password === 'admin123') {
      localStorage.setItem('opd_financials_session', 'active_' + Date.now());
      localStorage.setItem('opd_financials_session_time', Date.now().toString());
      triggerSync();
      return true;
    }
    return false;
  },

  // --- SESSION CHECKERS ---
  isLoggedIn: (): boolean => {
    return checkSession('opd_session', 'opd_session_time', ADMIN_SESSION_TIMEOUT);
  },

  isLiveDisplayLoggedIn: (): boolean => {
    return checkSession('opd_live_display_session', 'opd_live_display_session_time', LIVE_DISPLAY_TIMEOUT);
  },

  isDoctorsLoggedIn: (): boolean => {
    return checkSession('opd_doctors_session', 'opd_doctors_session_time', DOCTORS_SESSION_TIMEOUT);
  },

  isInquiriesLoggedIn: (): boolean => {
    return checkSession('opd_inquiries_session', 'opd_inquiries_session_time', INQUIRIES_SESSION_TIMEOUT);
  },

  isFinancialsLoggedIn: (): boolean => {
    return checkSession('opd_financials_session', 'opd_financials_session_time', FINANCIALS_SESSION_TIMEOUT);
  },

  // --- LOGOUT ---
  logout: () => {
    localStorage.removeItem('opd_session');
    localStorage.removeItem('opd_session_time');
    localStorage.removeItem('financials_unlocked');
    triggerSync();
  },

  logoutLiveDisplay: () => {
    localStorage.removeItem('opd_live_display_session');
    localStorage.removeItem('opd_live_display_session_time');
    triggerSync();
  },

  logoutDoctors: () => {
    localStorage.removeItem('opd_doctors_session');
    localStorage.removeItem('opd_doctors_session_time');
    triggerSync();
  },

  logoutInquiries: () => {
    localStorage.removeItem('opd_inquiries_session');
    localStorage.removeItem('opd_inquiries_session_time');
    triggerSync();
  },

  logoutFinancials: () => {
    localStorage.removeItem('opd_financials_session');
    localStorage.removeItem('opd_financials_session_time');
    triggerSync();
  },

  // --- DATA MAINTENANCE ---
  resetAllData: () => {
    localStorage.removeItem('opd_doctors');
    localStorage.removeItem('opd_bookings');
    localStorage.removeItem('opd_inquiries');
    triggerSync();
  },

  // --- DOCTOR MANAGEMENT ---
  getDoctors: (): Doctor[] => {
    const stored = localStorage.getItem('opd_doctors');
    if (!stored) {
      localStorage.setItem('opd_doctors', JSON.stringify(INITIAL_DOCTORS));
      return INITIAL_DOCTORS;
    }
    return JSON.parse(stored);
  },

  saveDoctor: (doctor: Doctor) => {
    const doctors = MockDB.getDoctors();
    const index = doctors.findIndex(d => d.id === doctor.id);
    if (index !== -1) {
      doctors[index] = doctor;
    } else {
      doctors.push(doctor);
    }
    localStorage.setItem('opd_doctors', JSON.stringify(doctors));
    triggerSync();
  },

  deleteDoctor: (id: string) => {
    const doctors = MockDB.getDoctors();
    const filtered = doctors.filter(d => d.id !== id);
    localStorage.setItem('opd_doctors', JSON.stringify(filtered));
    triggerSync();
  },

  // --- BOOKINGS & QUEUE ---
  getAllBookings: (): Booking[] => {
    return JSON.parse(localStorage.getItem('opd_bookings') || '[]');
  },

  isLimitReached: (doctorId: string, date: string): boolean => {
    const doctor = MockDB.getDoctors().find(d => d.id === doctorId);
    if (!doctor) return true;
    const bookings = MockDB.getAllBookings();
    const count = bookings.filter(b => b.doctorId === doctorId && b.date === date && b.status !== 'Absent').length;
    return count >= doctor.maxTokens;
  },

  isSlotBooked: (doctorId: string, date: string, slot: string): boolean => {
    const bookings = MockDB.getAllBookings();
    return bookings.some(b => 
      b.doctorId === doctorId && 
      b.date === date && 
      b.slot === slot && 
      b.status !== 'Absent'
    );
  },

  createBooking: (data: Omit<Booking, 'id' | 'tokenNumber' | 'status' | 'createdAt'>): Booking => {
    const bookings = MockDB.getAllBookings();
    const doctor = MockDB.getDoctors().find(d => d.id === data.doctorId);
    
    if (!doctor) throw new Error("Doctor not found.");

    const docBookingsOnDay = bookings.filter(b => b.doctorId === data.doctorId && b.date === data.date);
    
    if (docBookingsOnDay.length >= doctor.maxTokens) {
      throw new Error(`Booking limit reached for ${data.doctorName} on this day.`);
    }

    if (MockDB.isSlotBooked(data.doctorId, data.date, data.slot)) {
      throw new Error("This slot was just booked by another patient. Please select another time.");
    }

    const nextToken = docBookingsOnDay.length + 1;

    const newBooking: Booking = {
      ...data,
      id: 'BK-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      tokenNumber: nextToken,
      status: 'Waiting',
      createdAt: new Date().toISOString()
    };

    bookings.push(newBooking);
    localStorage.setItem('opd_bookings', JSON.stringify(bookings));
    triggerSync();
    return newBooking;
  },

  updateBookingStatus: (id: string, status: BookingStatus): void => {
    const bookings = MockDB.getAllBookings();
    const index = bookings.findIndex(b => b.id === id);
    if (index !== -1) {
      bookings[index].status = status;
      localStorage.setItem('opd_bookings', JSON.stringify(bookings));
      triggerSync();
    }
  },

  // --- CONTACT INQUIRIES ---
  saveInquiry: (inquiry: Omit<ContactInquiry, 'id' | 'createdAt'>) => {
    const inquiries = MockDB.getInquiries();
    const newInquiry: ContactInquiry = {
      ...inquiry,
      id: 'INQ-' + Date.now(),
      createdAt: new Date().toISOString()
    };
    inquiries.push(newInquiry);
    localStorage.setItem('opd_inquiries', JSON.stringify(inquiries));
    triggerSync();
  },

  getInquiries: (): ContactInquiry[] => {
    return JSON.parse(localStorage.getItem('opd_inquiries') || '[]');
  },

  deleteInquiry: (id: string): void => {
    const inquiries = MockDB.getInquiries();
    const filtered = inquiries.filter(inq => inq.id !== id);
    localStorage.setItem('opd_inquiries', JSON.stringify(filtered));
    triggerSync();
  },

  // --- ADVANCED REPORTING ---
  getDetailedReport: (filterType: 'day' | 'month' | 'year', value: string, search: string = '') => {
    const all = MockDB.getAllBookings();
    const filtered = all.filter(b => {
      const matchesDate = filterType === 'day' ? b.date === value :
                        filterType === 'month' ? b.date.startsWith(value) :
                        b.date.startsWith(value);
      
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
      summary: { totalRevenue, totalCash, totalOnline, patientCount: filtered.length },
      doctorWise: Object.entries(doctorStats).map(([name, stats]) => ({ name, ...stats })),
      rawList: filtered
    };
  },

  getDateRangeReport: (startDate: string, endDate: string, search: string = '') => {
    const all = MockDB.getAllBookings();
    const filtered = all.filter(b => {
      const bookingDate = b.date;
      const matchesDate = bookingDate >= startDate && bookingDate <= endDate;
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
        startDate,
        endDate
      },
      doctorWise: Object.entries(doctorStats).map(([name, stats]) => ({ name, ...stats })),
      rawList: filtered
    };
  },

  exportExcel: (data: Booking[]) => {
    const headers = "Booking ID,Token,Patient Name,Doctor,Date,Slot,Fee,Payment,Status\n";
    const rows = data.map(b => 
      `${b.id},${b.tokenNumber},${b.patientName},${b.doctorName},${b.date},${b.slot},${b.fee},${b.paymentMode},${b.status}`
    ).join("\n");
    
    const blob = new Blob([headers + rows], { type: 'application/vnd.ms-excel' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `OPD_Report_${new Date().toISOString().split('T')[0]}.xls`;
    a.click();
    window.URL.revokeObjectURL(url);
  }
};