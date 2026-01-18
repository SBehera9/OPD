import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // Add this import

const About: React.FC = () => {
  // SVG Icons Components
  const AwardIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
    </svg>
  );

  const DoctorIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
    </svg>
  );

  const UsersIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
    </svg>
  );

  const CalendarIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
    </svg>
  );

  const StethoscopeIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h6.344c2.672 0 4.011-3.231 2.122-5.121l-4-4A1 1 0 019 8.172V4.414l.707-.707A1 1 0 008 2H7z" clipRule="evenodd" />
    </svg>
  );

  const HeartIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
    </svg>
  );

  const ArrowRightIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const stats = [
    { icon: <AwardIcon />, value: "25+", label: "Years Experience", subLabel: "Medical Excellence" },
    { icon: <DoctorIcon />, value: "50+", label: "Expert Doctors", subLabel: "Specialized Care" },
    { icon: <UsersIcon />, value: "10K+", label: "Patients Served", subLabel: "Trust & Care" },
    { icon: <CalendarIcon />, value: "24/7", label: "Emergency Care", subLabel: "Always Available" }
  ];

  const features = [
    { icon: <StethoscopeIcon />, title: "Advanced Diagnostics", desc: "State-of-the-art diagnostic equipment" },
    { icon: <HeartIcon />, title: "Patient-Centric Care", desc: "Personalized treatment plans" },
    { icon: <DoctorIcon />, title: "Expert Specialists", desc: "Board-certified physicians" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-sky-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-sky-900 to-sky-800 text-white overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-sky-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-20 md:py-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <span className="inline-block px-4 py-2 bg-sky-700/30 backdrop-blur-sm rounded-full text-sky-200 font-semibold text-sm tracking-wider mb-6 border border-sky-600/30">
                SKIN CARE OPD
              </span>
              <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight tracking-tight">
                Excellence in <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-blue-300">Dermatological Care</span>
              </h1>
              <p className="text-sky-100 text-lg md:text-xl max-w-3xl mx-auto mb-8 leading-relaxed">
                Pioneering skin care solutions with 25+ years of expertise, combining advanced technology with compassionate care.
              </p>
              
              {/* Breadcrumb */}
              <div className="flex items-center justify-center space-x-2 text-sm text-sky-300">
                <Link to="/" className="opacity-70 hover:opacity-100 transition-opacity">Home</Link>
                <span className="opacity-50">/</span>
                <span className="font-semibold">About Us</span>
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
        {/* Stats Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-center shadow-xl border border-sky-100"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-sky-100 to-blue-100 text-sky-600 mb-4">
                  {stat.icon}
                </div>
                <div className="text-3xl font-black text-sky-900 mb-1">{stat.value}</div>
                <div className="text-sm font-bold text-sky-700 mb-1">{stat.label}</div>
                <div className="text-xs text-gray-500">{stat.subLabel}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* About Content */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
            >
              <motion.span 
                variants={itemVariants}
                className="inline-flex items-center px-4 py-2 rounded-full bg-sky-100 text-sky-700 font-bold text-sm tracking-wider mb-6"
              >
                <span className="w-2 h-2 bg-sky-500 rounded-full mr-2"></span>
                ABOUT OUR CLINIC
              </motion.span>
              
              <motion.h2 
                variants={itemVariants}
                className="text-3xl md:text-4xl lg:text-5xl font-black text-sky-950 mb-6 leading-tight"
              >
                Leading <span className="text-sky-600">Skin & VD Care</span> in Visakhapatnam
              </motion.h2>
              
              <motion.p 
                variants={itemVariants}
                className="text-gray-600 text-lg mb-8 leading-relaxed"
              >
                At Skin Care OPD, we combine decades of medical expertise with cutting-edge technology to provide comprehensive dermatological care. Our clinic is staffed by renowned specialists dedicated to your skin health.
              </motion.p>

              {/* Highlight Quote */}
              <motion.div 
                variants={itemVariants}
                className="relative mb-10"
              >
                <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-sky-500 to-blue-500 rounded-full"></div>
                <div className="pl-8">
                  <p className="text-xl text-sky-900 font-medium italic mb-4">
                    "Our mission is to provide accessible, high-quality dermatological care with compassion and expertise."
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-sky-600 flex items-center justify-center text-white font-bold mr-3">
                      AS
                    </div>
                    <div>
                      <div className="font-bold text-sky-900">Prof. Dr. Antaryami Sahoo</div>
                      <div className="text-sm text-gray-500">Lead Dermatologist & Founder</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Features List */}
              <motion.div variants={itemVariants} className="space-y-4 mb-10">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-blue-500 flex items-center justify-center text-white">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-sky-900 mb-1">{feature.title}</h4>
                      <p className="text-gray-600 text-sm">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* CTA Button - FIXED */}
              <motion.div variants={itemVariants}>
                <Link 
                  to="/appointment"
                  className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-sky-600 to-blue-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 mx-auto lg:mx-0"
                >
                  <span>Book Consultation</span>
                  <ArrowRightIcon className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Image Grid */}
            <div className="relative">
              {/* Main Image */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative mb-8"
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800" 
                    className="w-full h-[400px] md:h-[500px] object-cover"
                    alt="Modern Clinic Facility"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-sky-900/40 to-transparent"></div>
                </div>
                {/* Floating Badge */}
                <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-2xl">
                  <div className="text-4xl font-black text-sky-600">25+</div>
                  <div className="text-sm font-bold text-sky-900">Years of Excellence</div>
                </div>
              </motion.div>

              {/* Secondary Image */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800" 
                    className="w-full h-[300px] object-cover"
                    alt="Medical Team"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-sky-900/40 to-transparent"></div>
                </div>
                {/* Pattern Overlay */}
                <div className="absolute -top-6 -left-6 w-24 h-24">
                  <div className="w-full h-full border-4 border-sky-300/30 rounded-2xl"></div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="bg-gradient-to-r from-sky-50 to-blue-50 py-20 mb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black text-sky-950 mb-4">Our Commitment to Care</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">Excellence in dermatology through innovation, compassion, and personalized treatment.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Innovation", desc: "Leveraging latest technologies for accurate diagnosis and treatment." },
                { title: "Compassion", desc: "Patient-first approach with empathetic care and support." },
                { title: "Excellence", desc: "Highest standards of medical practice and continuous improvement." }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="text-5xl text-sky-600 font-black mb-4">0{index + 1}</div>
                  <h3 className="text-xl font-bold text-sky-900 mb-4">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;