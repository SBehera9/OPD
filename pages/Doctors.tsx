import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MockDB } from '../lib/db';
import { Doctor } from '../types';

const Doctors: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');

  const refreshDoctors = () => {
    setDoctors(MockDB.getDoctors());
  };

  useEffect(() => {
    refreshDoctors();
    window.addEventListener('storage', refreshDoctors);
    return () => window.removeEventListener('storage', refreshDoctors);
  }, []);

  // Get unique specialties for filter
  const specialties = ['all', ...new Set(doctors.map(doc => doc.specialty))];
  
  // Filter doctors based on selected specialty
  const filteredDoctors = selectedSpecialty === 'all' 
    ? doctors 
    : doctors.filter(doc => doc.specialty === selectedSpecialty);

  const DoctorIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );

  const FilterIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
    </svg>
  );

  const ClockIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  const HospitalIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-sky-900 via-sky-800 to-blue-800 text-white overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-sky-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-20 md:py-32 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-flex items-center px-4 py-2 bg-sky-700/30 backdrop-blur-sm rounded-full text-sky-200 font-semibold text-sm tracking-wider mb-6 border border-sky-600/30">
                <DoctorIcon />
                <span className="ml-2">MEET OUR TEAM</span>
              </span>
              <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight tracking-tight">
                Expert <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-blue-300">Medical Specialists</span>
              </h1>
              <p className="text-sky-100 text-lg md:text-xl max-w-3xl mx-auto mb-8 leading-relaxed">
                Our board-certified doctors combine decades of experience with cutting-edge medical expertise.
              </p>
              
              {/* Breadcrumb */}
              <div className="flex items-center justify-center space-x-2 text-sm text-sky-300">
                <Link to="/" className="opacity-70 hover:opacity-100 transition-opacity">Home</Link>
                <span className="opacity-50">/</span>
                <span className="font-semibold">Our Doctors</span>
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
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: '25+', label: 'Years Experience' },
              { value: doctors.length, label: 'Specialists' },
              { value: '10K+', label: 'Patients Treated' },
              { value: '99%', label: 'Satisfaction Rate' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-center shadow-xl border border-sky-100"
              >
                <div className="text-3xl font-black text-sky-900 mb-1">{stat.value}</div>
                <div className="text-sm font-bold text-sky-700">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Filter Section - Redesigned */}
<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
  <div className="bg-gradient-to-r from-sky-50 to-blue-50 rounded-3xl shadow-xl overflow-hidden border border-sky-100">
    <div className="p-8">
      {/* Header */}
      <div className="text-center mb-10">
        <span className="inline-flex items-center px-4 py-2 bg-white rounded-full text-sm font-bold text-sky-700 mb-4 shadow-sm">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          SEARCH & FILTER
        </span>
        <h2 className="text-3xl md:text-4xl font-black text-sky-950 mb-4">
          Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-600">Specialist</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Browse our team of board-certified specialists across various medical disciplines
        </p>
      </div>

        {/* Filter Controls */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Specialty Filter */}
            <div className="flex-1">
              <label className="block text-sm font-bold text-sky-900 mb-3 uppercase tracking-wider">
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Medical Specialty
                </span>
              </label>
              <div className="flex flex-wrap gap-3">
                {specialties.map((specialty) => (
                  <motion.button
                    key={specialty}
                    onClick={() => setSelectedSpecialty(specialty)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-5 py-3 rounded-full text-sm font-bold transition-all duration-300 flex items-center ${
                      selectedSpecialty === specialty
                        ? 'bg-gradient-to-r from-sky-600 to-blue-600 text-white shadow-lg shadow-sky-500/30'
                        : 'bg-white text-sky-700 hover:bg-sky-100 shadow-md hover:shadow-lg'
                    }`}
                  >
                    {specialty === 'all' ? (
                      <>
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                        All Specialties
                      </>
                    ) : (
                      <>
                        <div className={`w-2 h-2 rounded-full mr-2 ${
                          selectedSpecialty === specialty ? 'bg-white' : 'bg-sky-500'
                        }`}></div>
                        {specialty}
                      </>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Reset Filter Button */}
            <div className="lg:self-end">
              <motion.button
                onClick={() => setSelectedSpecialty('all')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-5 py-3 bg-white text-sky-700 font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:bg-sky-50"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Reset Filters
              </motion.button>
            </div>
          </div>
        </div>

        {/* Active Filter Indicator */}
        {selectedSpecialty !== 'all' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-sky-500/10 to-blue-500/10 rounded-full"
          >
            <div className="w-2 h-2 bg-sky-500 rounded-full mr-2"></div>
            <span className="text-sm font-bold text-sky-700">
              Showing results for: <span className="text-sky-900">{selectedSpecialty}</span>
            </span>
          </motion.div>
        )}
      </div>

          {/* Stats Row */}
          <div className="bg-white/50 border-t border-sky-100">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-sky-100">
              <div className="p-6 text-center">
                <div className="text-2xl font-black text-sky-900">{filteredDoctors.length}</div>
                <div className="text-xs font-bold text-sky-700 uppercase tracking-wider">Doctors Found</div>
              </div>
              <div className="p-6 text-center">
                <div className="text-2xl font-black text-sky-900">{doctors.filter(d => d.isActive).length}</div>
                <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Available Now</div>
              </div>
              <div className="p-6 text-center">
                <div className="text-2xl font-black text-sky-900">{specialties.length - 1}</div>
                <div className="text-xs font-bold text-sky-700 uppercase tracking-wider">Specialties</div>
              </div>
              <div className="p-6 text-center">
                <div className="text-2xl font-black text-sky-900">24/7</div>
                <div className="text-xs font-bold text-blue-700 uppercase tracking-wider">Emergency Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

        {/* Doctors Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          {filteredDoctors.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-6">👨‍⚕️</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">No Doctors Found</h3>
              <p className="text-gray-600 mb-8">No doctors available for the selected specialty.</p>
              <button
                onClick={() => setSelectedSpecialty('all')}
                className="px-6 py-3 bg-sky-600 text-white rounded-full font-semibold hover:bg-sky-700 transition-colors"
              >
                View All Doctors
              </button>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-800">
                  Showing {filteredDoctors.length} {filteredDoctors.length === 1 ? 'Doctor' : 'Doctors'}
                  {selectedSpecialty !== 'all' && ` in ${selectedSpecialty}`}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDoctors.map((doc, idx) => (
                  <motion.div
                    key={doc.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ 
                      duration: 0.5, 
                      delay: idx * 0.1,
                    }}
                    className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-100 group"
                  >
                    {/* Doctor Image & Status */}
                    <div className="relative h-64 md:h-72 overflow-hidden">
                      <img 
                        src={doc.image} 
                        alt={doc.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60"></div>
                      
                      {/* Status Badge */}
                      <div className="absolute top-4 right-4">
                        <div className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                          doc.isActive 
                            ? 'bg-emerald-500/90 text-white backdrop-blur-sm' 
                            : 'bg-red-500/90 text-white backdrop-blur-sm'
                        }`}>
                          {doc.isActive ? 'Available' : 'Unavailable'}
                        </div>
                      </div>
                      
                      {/* Doctor Info Overlay */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold text-white mb-2">
                          {doc.specialty}
                        </span>
                        <h3 className="text-2xl font-black text-white leading-tight">{doc.name}</h3>
                        <p className="text-white/80 text-sm mt-1">{doc.qualifications}</p>
                      </div>
                    </div>

                    {/* Doctor Details */}
                    <div className="p-6">
                      {/* Fee Badge */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 mr-3">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div>
                            <span className="text-xs text-gray-500">Consultation Fee</span>
                            <div className="text-lg font-black text-sky-900">₹{doc.fee}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-xs text-gray-500">Experience</span>
                          <div className="text-lg font-black text-sky-900">25+ Years</div>
                        </div>
                      </div>

                      {/* Details Grid */}
                      <div className="space-y-4 mb-8">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center text-sky-600 mr-4">
                            <HospitalIcon />
                          </div>
                          <div>
                            <span className="text-xs text-gray-500 block">Primary Hospital</span>
                            <span className="text-sm font-semibold text-gray-800">{doc.hospital}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center mr-4 ${
                            doc.isActive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                          }`}>
                            <ClockIcon />
                          </div>
                          <div>
                            <span className="text-xs text-gray-500 block">Availability</span>
                            <span className={`text-sm font-semibold ${
                              doc.isActive ? 'text-emerald-700' : 'text-red-700'
                            }`}>
                              {doc.isActive ? doc.timing : 'Currently Unavailable'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        {doc.isActive ? (
                          <>
                            <Link
                              to={`/appointment?doctorId=${doc.id}`}
                              className="flex-1 bg-gradient-to-r from-sky-600 to-blue-600 text-white font-bold py-3 px-6 rounded-xl text-center hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                            >
                              Book Now
                            </Link>
                            <button className="w-12 h-12 flex items-center justify-center bg-sky-50 text-sky-600 rounded-xl hover:bg-sky-100 transition-colors">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </button>
                          </>
                        ) : (
                          <div className="w-full bg-gray-100 text-gray-400 font-bold py-3 px-6 rounded-xl text-center cursor-not-allowed">
                            Currently Unavailable
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-sky-50 to-blue-50 py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-black text-sky-950 mb-6">
              Can't Find Your Specialist?
            </h2>
            <p className="text-gray-600 text-lg mb-10 max-w-2xl mx-auto">
              Our team is here to help. Contact us for personalized assistance in finding the right doctor for your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-sky-700 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Contact Support
              </Link>
              <Link
                to="/appointment"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-sky-600 to-blue-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Schedule Appointment
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Doctors;