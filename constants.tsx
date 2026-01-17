
import { Doctor, Department } from './types';

export const DOCTORS: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Antaryami Sahoo, M.D.',
    qualifications: 'Professor of Skin, V.D. & Leprosy',
    specialty: 'Skin & VD Specialist',
    hospital: 'Skin Care OPD, Brahmapur',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400',
    timing: 'Mon-Sat: 09:00-18:00, Sun: 09:00-10:00',
    fee: 500,
    slotGap: 10,
    maxTokens: 50,
    isActive: true
  },
  {
    id: '2',
    name: 'Dr. Narendranath Nagoti',
    qualifications: 'M.S., DNB (Surgical Gastroenterology)',
    specialty: 'Surgical Gastroenterologist',
    hospital: 'Pinnacle Hospital, Visakhapatnam',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
    timing: 'Visiting Consultant (Check Schedule)',
    fee: 1000,
    slotGap: 15,
    maxTokens: 30,
    isActive: true
  },
  {
    id: '3',
    name: 'Dr. M. Navya',
    qualifications: 'MBBS, MD (Radiation Oncology)',
    specialty: 'Pain & Palliative Care Specialist',
    hospital: 'KIMS Hospital, Visakhapatnam',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400',
    timing: 'Every Month 1st & 3rd Wednesday, 12:30PM to 4:00PM',
    fee: 800,
    slotGap: 20,
    maxTokens: 20,
    isActive: true
  },
  {
    id: '4',
    name: 'Dr. Pavan Kumar Rudrabhatla',
    qualifications: 'M.D., D.M. (Neurology) SCTIMST',
    specialty: 'Neurologist & Epilepsy Specialist',
    hospital: 'Medicover Hospital, Visakhapatnam',
    image: 'https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=400',
    timing: 'Every Month 4th Saturday 10:30AM to 3:00PM',
    fee: 1200,
    slotGap: 15,
    maxTokens: 25,
    isActive: true
  },
  {
    id: '5',
    name: 'Dr. M. Sharanya',
    qualifications: 'M.B.B.S., M.D (Pulmonology)',
    specialty: 'Pulmonologist (T.B & Chest Specialist)',
    hospital: 'KIMS-Icon Hospital, Visakhapatnam',
    image: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=80&w=400',
    timing: 'Every Month 4th Wednesday, 10:30AM to 3:00PM',
    fee: 900,
    slotGap: 15,
    maxTokens: 25,
    isActive: true
  },
  {
    id: '6',
    name: 'Dr. T. Vinay Bhushanam',
    qualifications: 'M.S., M.Ch.(Neuro) NIMS',
    specialty: 'Neuro Surgeon & Interventional Neurologist',
    hospital: 'Medicover Hospital, Visakhapatnam',
    image: 'https://images.unsplash.com/photo-1612272323027-4b2422360541?auto=format&fit=crop&q=80&w=400',
    timing: 'Every Month 2nd Monday 10:00AM to 3:00PM',
    fee: 1500,
    slotGap: 20,
    maxTokens: 20,
    isActive: true
  }
];

export const DEPARTMENTS: Department[] = [
  {
    id: 'dermatology',
    title: 'Dermatology',
    icon: 'skin',
    description: 'Skin and VD care covering the most vital parts of the human body.',
    fullContent: 'Skin covers the most part of human body. Therefore, it is mandatory to take care of skin in order to keep it glowing and healthy. We treat skin diseases like white spots, eczema etc.'
  },
  {
    id: 'neurology',
    title: 'Neurology',
    icon: 'brain',
    description: 'Diagnosis and treatment of neurological disorders.',
    fullContent: 'Comprehensive neurology services including Electroencephalography (EEG) and treatment of various neurological conditions, focusing on the intricate central nervous system.'
  },
  {
    id: 'neurosurgery',
    title: 'Neurosurgery',
    icon: 'surgery',
    description: 'Surgical expertise for brain and spine conditions.',
    fullContent: 'Expert care for the central nervous system (CNS), handling complex brain and spine surgeries with innovation and care, utilizing state-of-the-art diagnostic imaging.'
  },
  {
    id: 'gastroenterology',
    title: 'Gastroenterology',
    icon: 'digestive',
    description: 'Digestive health solutions.',
    fullContent: 'Focused on the digestive system and its disorders, delivering top-notch medical solutions and treatments for stomach, liver, and intestinal health.'
  },
  {
    id: 'oncology',
    title: 'Oncology',
    icon: 'cancer',
    description: 'Comprehensive cancer care and prevention.',
    fullContent: 'Oncology is the field of medicine that deals with the diagnosis, treatment, and prevention of cancer. We offer radiation and pain & palliative care specialist consultations.'
  },
  {
    id: 'pulmonology',
    title: 'Pulmonology',
    icon: 'lungs',
    description: 'Respiratory health and chest services.',
    fullContent: 'Our specialists are dedicated to respiratory health, treating conditions like T.B., chest infections, and chronic pulmonary diseases using modern diagnostic technology.'
  }
];
