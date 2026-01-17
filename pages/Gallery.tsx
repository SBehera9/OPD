import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Gallery: React.FC = () => {
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Clinic', 'Surgery', 'Diagnostics', 'Patient Care'];

  const images = [
    { url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800', title: "Modern Clinic", category: 'Clinic' },
    { url: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800', title: "Expert Care", category: 'Patient Care' },
    { url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800', title: "Diagnostics", category: 'Diagnostics' },
    { url: 'https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&q=80&w=800', title: "Specialists", category: 'Clinic' },
    { url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800', title: "Patient Care", category: 'Patient Care' },
    { url: 'https://images.unsplash.com/photo-1631217816660-ad3536554561?auto=format&fit=crop&q=80&w=800', title: "Surgery Dept", category: 'Surgery' },
    { url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800', title: "Advanced Lab", category: 'Diagnostics' },
    { url: 'https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80&w=800', title: "Recovery Suite", category: 'Surgery' },
    { url: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&q=80&w=800', title: "Wait Lounge", category: 'Clinic' },
  ];

  const filteredImages = filter === 'All' ? images : images.filter(img => img.category === filter);

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="bg-sky-950 text-white py-32 px-4 text-center relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <span className="text-sky-400 font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Visual Excellence</span>
          <h1 className="text-6xl font-black mb-6 tracking-tighter">Our Medical Gallery</h1>
          <p className="text-sky-100/60 font-medium max-w-2xl mx-auto uppercase tracking-widest text-[10px]">Excellence Captured in Brahmapur</p>
        </motion.div>
        <div className="absolute inset-0 bg-sky-900 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      </div>

      <section className="py-20 max-w-7xl mx-auto px-6">
        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
                filter === cat ? 'bg-sky-600 text-white shadow-xl shadow-sky-600/30 scale-105' : 'bg-white text-sky-900 hover:bg-sky-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredImages.map((img, i) => (
              <motion.div 
                key={img.url} 
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                transition={{ 
                  duration: 0.5, 
                  delay: i * 0.05,
                  ease: "easeOut"
                }}
                className="group relative h-[450px] overflow-hidden rounded-[56px] shadow-sm cursor-pointer border border-white"
              >
                <img 
                  src={img.url} 
                  alt={img.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sky-950 via-sky-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-10">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-sky-400 font-black uppercase tracking-widest text-[10px] mb-2 block">{img.category}</span>
                    <h4 className="text-white text-3xl font-black mb-4 tracking-tight leading-none">{img.title}</h4>
                    <div className="w-16 h-1 bg-sky-500 rounded-full"></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Bottom section with more detail */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-black text-sky-950 mb-8 tracking-tighter">Setting the gold standard in clinical environments.</h2>
            <p className="text-gray-500 text-lg leading-relaxed">Our facilities are maintained to the highest medical standards, ensuring a sterile, comfortable, and efficient environment for both our specialists and patients.</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;