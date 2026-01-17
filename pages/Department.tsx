import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DEPARTMENTS } from '../constants';

const DepartmentIcon = ({ type }: { type: string }) => {
  const iconClasses = "w-16 h-16 text-sky-600";
  switch (type) {
    case 'skin':
      return (
        <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9-9 4.03-9 9 4.03 9 9 9z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 7v2m0 6v2m-5-5h2m6 0h2" />
        </svg>
      );
    case 'brain':
      return (
        <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      );
    case 'surgery':
      return (
        <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 11-4.243-4.243 3 3 0 014.243 4.243z" />
        </svg>
      );
    case 'digestive':
      return (
        <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      );
    case 'cancer':
      return (
        <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      );
    case 'lungs':
      return (
        <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      );
    default:
      return (
        <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      );
  }
};

const Department: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="bg-sky-950 text-white py-32 px-4 text-center relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10"
        >
          <span className="text-sky-400 font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Our Specialization</span>
          <h1 className="text-6xl font-black mb-4 tracking-tighter">Medical Departments</h1>
          <p className="text-sky-100/60 font-bold uppercase tracking-[0.2em] text-[10px]">Excellence Across Clinical Disciplines</p>
        </motion.div>
        <div className="absolute inset-0 bg-sky-900 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      </div>

      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {DEPARTMENTS.map((dept, idx) => (
            <motion.div 
              key={dept.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-[56px] p-12 shadow-sm border border-slate-100 hover:shadow-2xl transition-all group flex flex-col text-center"
            >
              <motion.div 
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  type: "spring", 
                  stiffness: 260, 
                  damping: 12,
                  delay: (idx * 0.1) + 0.3
                }}
                className="mx-auto mb-10 w-24 h-24 bg-sky-50 rounded-[32px] flex items-center justify-center transition-colors group-hover:bg-sky-100"
              >
                <DepartmentIcon type={dept.icon} />
              </motion.div>
              
              <h3 className="text-2xl font-black text-sky-950 mb-4 tracking-tight uppercase">{dept.title}</h3>
              <p className="text-gray-500 font-medium leading-relaxed mb-8 flex-grow">
                {dept.description}
              </p>
              
              <div className="mt-auto">
                <Link 
                  to="/appointment" 
                  className="inline-block bg-sky-600 text-white px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-sky-700 transition-all shadow-lg shadow-sky-600/20"
                >
                  Book Specialty Slot
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Detail Content Section (Optionally shown or linked) */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6 space-y-20">
          {DEPARTMENTS.map((dept) => (
            <motion.div 
              key={dept.id + '-detail'}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="border-b border-slate-50 pb-16 last:border-0"
            >
              <h2 className="text-4xl font-black text-sky-950 mb-6 flex items-center gap-4">
                <span className="w-1.5 h-10 bg-sky-600 rounded-full"></span>
                {dept.title}
              </h2>
              <p className="text-gray-600 text-xl leading-relaxed">
                {dept.fullContent}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Department;