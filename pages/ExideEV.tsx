
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ExideEV: React.FC = () => {
  return (
    <div>
      <div className="bg-sky-950 text-white py-32 px-4 text-center relative overflow-hidden">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative z-10">
          <h1 className="text-6xl font-black mb-4 tracking-tight">Exide Electric Vehicles</h1>
          <p className="text-sky-300 font-bold uppercase tracking-[0.3em] text-sm">Innovation in Sustainable Mobility</p>
        </motion.div>
        <div className="absolute inset-0 bg-sky-900 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      </div>

      <section className="py-32 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}>
            <span className="text-sky-600 font-black uppercase tracking-widest text-sm mb-4 block">Future of Transport</span>
            <h2 className="text-5xl font-black text-sky-950 mb-8 leading-tight">Eco-Friendly Mobility for a Greener Tomorrow</h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-10">
              Skin Care OPD Group is proud to partner with Exide for promoting sustainable electric mobility solutions. Our fleet of E-Rickshaws and Electric 3-Wheelers are designed for efficiency and environmental care.
            </p>
            <div className="grid grid-cols-2 gap-8 mb-12">
              <div className="bg-sky-50 p-8 rounded-[40px] text-center">
                <div className="text-4xl mb-4">⚡</div>
                <h4 className="font-black text-sky-950">Zero Emissions</h4>
              </div>
              <div className="bg-sky-50 p-8 rounded-[40px] text-center">
                <div className="text-4xl mb-4">🔋</div>
                <h4 className="font-black text-sky-950">Fast Charging</h4>
              </div>
            </div>
            <Link to="/contact" className="bg-sky-950 text-white px-10 py-5 rounded-full font-black uppercase tracking-widest hover:bg-sky-600 transition-all shadow-xl">Inquire for Dealership</Link>
          </motion.div>
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=800" className="rounded-[60px] shadow-2xl" alt="Electric Vehicle" />
            <motion.div animate={{ y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 3 }} className="absolute -bottom-10 -right-10 bg-white p-10 rounded-[40px] shadow-2xl border border-sky-50 max-w-[200px]">
              <span className="text-4xl font-black text-sky-600 block mb-2">100%</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Cleaner Energy Solutions</span>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExideEV;
