import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                VISUAL TOUR
              </span>
              <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight tracking-tight">
                Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-blue-300">Medical Gallery</span>
              </h1>
              <p className="text-sky-100 text-lg md:text-xl max-w-3xl mx-auto mb-8 leading-relaxed">
                A visual journey through our state-of-the-art facilities and compassionate care environment
              </p>
              
              {/* Breadcrumb */}
              <div className="flex items-center justify-center space-x-2 text-sm text-sky-300">
                <Link to="/" className="opacity-70 hover:opacity-100 transition-opacity">Home</Link>
                <span className="opacity-50">/</span>
                <span className="font-semibold">Gallery</span>
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
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: images.length, label: 'Gallery Photos', color: 'sky' },
              { value: categories.length - 1, label: 'Categories', color: 'blue' },
              { value: '25+', label: 'Years Documented', color: 'indigo' },
              { value: '5000+', label: 'Patients Served', color: 'purple' }
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

        {/* Gallery Section - EXACTLY SAME AS ORIGINAL */}
        <section className="py-20 max-w-7xl mx-auto px-6">
          {/* Filter Tabs - Improved styling but same functionality */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setFilter(cat)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
                  filter === cat 
                    ? 'bg-gradient-to-r from-sky-600 to-blue-600 text-white shadow-xl shadow-sky-600/30 scale-105' 
                    : 'bg-white text-sky-900 hover:bg-sky-50 shadow-lg hover:shadow-xl'
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>

          {/* Image Grid - EXACTLY SAME AS ORIGINAL */}
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

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-sky-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-flex items-center px-4 py-2 bg-white rounded-full text-sm font-bold text-sky-700 mb-4 shadow-sm">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                VIRTUAL TOUR
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-sky-950 mb-4">
                Experience Our Facility
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Schedule a physical visit or take a virtual tour of our modern medical facility
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="bg-white rounded-3xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-sky-900 mb-6">Why Choose Our Facility?</h3>
                <ul className="space-y-4">
                  {[
                    "State-of-the-art medical equipment",
                    "Sterile and hygienic environment",
                    "Comfortable patient rooms",
                    "Advanced surgical suites",
                    "24/7 emergency care",
                    "Friendly and professional staff"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-sky-500 rounded-full mr-3"></div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="relative">
                <div className="bg-gradient-to-br from-sky-600 to-blue-600 rounded-3xl p-10 text-white text-center">
                  <div className="text-5xl mb-6">🏥</div>
                  <h3 className="text-2xl font-bold mb-4">Schedule a Visit</h3>
                  <p className="text-sky-100 mb-8">
                    Prefer to see our facility in person? Schedule a guided tour with our facility coordinator.
                  </p>
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center px-8 py-4 bg-white text-sky-700 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Schedule Tour
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Gallery;