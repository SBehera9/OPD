
import { Booking, Doctor, BookingStatus, ContactInquiry } from '../types';
import { DOCTORS as INITIAL_DOCTORS } from '../constants';

const triggerSync = () => {
  window.dispatchEvent(new Event('storage'));
};

export const MockDB = {
  // --- AUTHENTICATION ---
  login: (password: string): boolean => {
    if (password === 'admin123') {
      localStorage.setItem('opd_session', 'active_' + Date.now());
      return true;
    }
    return false;
  },

  isLoggedIn: (): boolean => {
    return !!localStorage.getItem('opd_session');
  },

  logout: () => {
    localStorage.removeItem('opd_session');
    localStorage.removeItem('financials_unlocked');
  },

  unlockFinancials: (password: string): boolean => {
    if (password === 'admin123') {
      localStorage.setItem('financials_unlocked', 'true');
      return true;
    }
    return false;
  },

  isFinancialsUnlocked: (): boolean => {
    return localStorage.getItem('financials_unlocked') === 'true';
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
