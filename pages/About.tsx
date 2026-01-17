
import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
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
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div>
      {/* Page Header */}
      <div className="bg-sky-950 text-white py-32 px-4 text-center relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <h1 className="text-6xl font-black mb-4 tracking-tight">About Us</h1>
          <p className="text-sky-300 font-bold uppercase tracking-[0.3em] text-sm">Home / About Us</p>
        </motion.div>
        <div className="absolute inset-0 bg-sky-900 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      </div>

      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.span variants={itemVariants} className="text-sky-600 font-black uppercase tracking-widest text-sm mb-4 block">Experience the Future</motion.span>
            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-black text-sky-950 mb-8 leading-tight">Medical Care Unmatched Excellence</motion.h2>
            <motion.p variants={itemVariants} className="text-gray-600 text-lg mb-8 leading-relaxed">
              Welcome to Skin Care OPD, your trusted destination for comprehensive healthcare services. Our state-of-the-art clinic brings together renowned specialists from Visakhapatnam, offering expert care in multiple disciplines.
            </motion.p>
            <motion.div variants={itemVariants} className="bg-sky-50 border-l-8 border-sky-500 p-8 mb-10 italic text-sky-900 text-xl rounded-r-3xl shadow-sm">
              "Our team of esteemed doctors is led by our famous Skin and VD specialist Prof. Dr. Antaryami Sahoo."
            </motion.div>
            
            <motion.div variants={itemVariants} className="grid grid-cols-3 gap-6">
              {[
                { label: "Year Experience", value: "25k+" },
                { label: "Connected Doctors", value: "1k+" },
                { label: "Happy Member", value: "3M+" }
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -5 }}
                  className="bg-white p-6 rounded-[32px] shadow-xl text-center border border-sky-50"
                >
                  <span className="text-3xl font-black text-sky-600 block mb-1">{stat.value}</span>
                  <span className="text-[10px] text-gray-500 uppercase font-black tracking-wider leading-tight block">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          <div className="grid grid-cols-2 gap-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-16"
            >
              <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600" className="rounded-[40px] shadow-2xl h-full object-cover" alt="About 1" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <img src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=600" className="rounded-[40px] shadow-2xl h-full object-cover" alt="About 2" />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
