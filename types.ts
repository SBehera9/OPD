
export interface Doctor {
  id: string;
  name: string;
  qualifications: string;
  specialty: string;
  hospital: string;
  timing: string; // e.g. "10:00 - 14:00"
  image: string;
  fee: number;
  slotGap: number; // in minutes
  maxTokens: number;
  isActive: boolean;
}

export interface Department {
  id: string;
  title: string;
  description: string;
  fullContent: string;
  icon: string;
}

export type BookingStatus = 'Waiting' | 'Present' | 'Completed' | 'Absent';
export type PaymentMode = 'Cash' | 'Online';

export interface Booking {
  id: string;
  tokenNumber: number;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  doctorId: string;
  doctorName: string;
  date: string; // YYYY-MM-DD
  slot: string; // HH:mm
  fee: number;
  paymentMode: PaymentMode;
  status: BookingStatus;
  createdAt: string;
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
}
