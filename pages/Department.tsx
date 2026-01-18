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
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-sky-900 via-blue-800 to-indigo-900 text-white overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-96 h-96 bg-sky-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-20 md:py-32 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sky-200 font-semibold text-sm tracking-wider mb-6 border border-white/20">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                SPECIALIZED CARE
              </span>
              <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight tracking-tight">
                Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-blue-300">Medical Departments</span>
              </h1>
              <p className="text-sky-100 text-lg md:text-xl max-w-3xl mx-auto mb-8 leading-relaxed">
                Comprehensive healthcare services across specialized disciplines with cutting-edge technology and expert care.
              </p>
              
              {/* Breadcrumb */}
              <div className="flex items-center justify-center space-x-2 text-sm text-sky-300">
                <Link to="/" className="opacity-70 hover:opacity-100 transition-opacity">Home</Link>
                <span className="opacity-50">/</span>
                <span className="font-semibold">Departments</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60L60 53.3C120 46.7 240 33.3 360 30C480 26.7 600 33.3 720 40C840 46.7 960 53.3 1080 50C1200 46.7 1320 33.3 1380 26.7L1440 20V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V60Z" fill="white"/>
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <main className="relative -mt-2">
        {/* Stats Banner */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { value: '12+', label: 'Specialized Departments', subLabel: 'Medical Excellence' },
              { value: '50+', label: 'Expert Specialists', subLabel: 'Skilled Professionals' },
              { value: '25+', label: 'Years Experience', subLabel: 'Trusted Care' },
              { value: '24/7', label: 'Emergency Care', subLabel: 'Always Available' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-center shadow-xl border border-sky-100"
              >
                <div className="text-3xl font-black text-sky-900 mb-1">{stat.value}</div>
                <div className="text-sm font-bold text-sky-700 mb-1">{stat.label}</div>
                <div className="text-xs text-gray-500">{stat.subLabel}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Departments Grid - Keeping original card design */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sky-400 font-black uppercase tracking-[0.3em] text-xs mb-4 block">Our Specialization</span>
            <h2 className="text-4xl md:text-5xl font-black text-sky-950 mb-4 leading-tight">
              Specialized Medical Disciplines
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Excellence Across Clinical Disciplines with Advanced Medical Care
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {DEPARTMENTS.map((dept, idx) => (
              <motion.div 
                key={dept.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: idx * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                className="bg-white rounded-[56px] p-12 shadow-sm border border-slate-100 hover:shadow-2xl transition-all duration-300 group flex flex-col text-center h-full"
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
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link 
                      to="/appointment" 
                      className="inline-block bg-sky-600 text-white px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-sky-700 transition-all shadow-lg shadow-sky-600/20"
                    >
                      Book Specialty Slot
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Detailed Departments Section */}
        <section className="py-20 bg-gradient-to-r from-sky-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-flex items-center px-4 py-2 bg-white rounded-full text-sm font-bold text-sky-700 mb-4 shadow-sm">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                ADVANCED TREATMENTS
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-sky-950 mb-4">
                Comprehensive Healthcare Services
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Each department is equipped with state-of-the-art technology and staffed by leading specialists
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {DEPARTMENTS.slice(0, 6).map((dept, idx) => (
                  <div key={idx} className="p-6 hover:bg-sky-50 rounded-2xl transition-colors">
                    <div className="flex items-start mb-4">
                      <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center mr-4">
                        <div className="w-6 h-6 bg-sky-500 rounded-full"></div>
                      </div>
                      <div>
                        <h4 className="font-bold text-sky-900">{dept.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">Advanced treatments available</p>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {dept.fullContent ? dept.fullContent.substring(0, 100) + '...' : dept.description}
                    </p>
                    <Link 
                      to={`/doctors?department=${dept.id}`}
                      className="inline-flex items-center text-sky-600 font-medium text-sm mt-4 hover:text-sky-800"
                    >
                      View Specialists
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-gradient-to-r from-sky-600 to-blue-600 rounded-3xl shadow-2xl p-12 text-white">
              <h2 className="text-3xl md:text-4xl font-black mb-6">
                Need Expert Medical Consultation?
              </h2>
              <p className="text-sky-100 text-lg mb-10 max-w-2xl mx-auto">
                Our team of specialists is ready to provide you with the best medical care. Book your appointment today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-sky-700 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Contact Support
                </Link>
                <Link
                  to="/appointment"
                  className="inline-flex items-center justify-center px-8 py-4 bg-sky-800 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-white/20"
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Book Appointment
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Department;