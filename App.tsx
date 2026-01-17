import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import About from './pages/About';
import Doctors from './pages/Doctors';
import Department from './pages/Department';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Appointment from './pages/Appointment';
import Admin from './pages/Admin';
import WaitingHall from './pages/WaitingHall';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

// Component to handle scroll restoration on navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const FacebookIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>
);

const TwitterIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
);

const InstagramIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z M17.5 6.5h.01 M7.5 2h9A5.5 5.5 0 0122 7.5v9a5.5 5.5 0 01-5.5 5.5h-9A5.5 5.5 0 012 16.5v-9A5.5 5.5 0 017.5 2z" /></svg>
);

const SOCIAL_LINKS = [
  { icon: <FacebookIcon />, label: 'Facebook', href: '#' },
  { icon: <TwitterIcon />, label: 'Twitter', href: '#' },
  { icon: <InstagramIcon />, label: 'Instagram', href: '#' },
];

const TopBar = () => (
  <div className="bg-sky-950 text-white text-[11px] font-bold tracking-[0.1em] uppercase py-2.5 px-6 hidden md:flex justify-between items-center border-b border-white/5">
    <div className="flex items-center gap-8">
      <span className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
        Brahmapur, Odisha 760001
      </span>
      <span className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
        care@skincareopd.com
      </span>
    </div>
    <div className="flex items-center gap-6">
      <div className="flex gap-4">
        {SOCIAL_LINKS.map((s, idx) => (
          <a key={idx} href={s.href} className="opacity-60 hover:opacity-100 transition-opacity hover:text-sky-400" aria-label={s.label}>
            {s.icon}
          </a>
        ))}
      </div>
      <Link to="/admin" className="text-[9px] border border-white/20 px-2 py-1 rounded hover:bg-white/10 transition-colors">Staff Login</Link>
    </div>
  </div>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Doctors', path: '/doctors' },
    { name: 'Department', path: '/department' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white/95 backdrop-blur-xl shadow-sm sticky top-0 z-50 border-b border-sky-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20 md:h-24">
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div 
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.8, ease: "anticipate" }}
              className="w-12 h-12 bg-gradient-to-br from-sky-500 to-sky-700 rounded-2xl flex items-center justify-center text-white font-extrabold text-2xl shadow-lg shadow-sky-500/20"
            >
              S
            </motion.div>
            <div>
              <span className="text-2xl font-black text-sky-950 block leading-none tracking-tight">Skin Care</span>
              <span className="text-[10px] font-black text-sky-500 uppercase tracking-[0.2em] block mt-1">OPD Services</span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-[13px] font-bold tracking-wide transition-all relative py-2 ${
                  isActive(link.path) ? 'text-sky-600' : 'text-slate-600 hover:text-sky-500'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <motion.div 
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-sky-500 rounded-full"
                  />
                )}
              </Link>
            ))}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/appointment"
                className="bg-sky-600 text-white px-7 py-3 rounded-full font-bold text-xs hover:bg-sky-700 transition-all shadow-xl shadow-sky-600/20 uppercase tracking-widest"
              >
                Appointment
              </Link>
            </motion.div>
          </div>

          <button className="lg:hidden p-2 text-sky-900" onClick={() => setIsOpen(!isOpen)}>
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16"/></svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t p-6 flex flex-col gap-6"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-lg font-bold text-sky-900 hover:text-sky-600"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/appointment"
              className="bg-sky-600 text-white text-center px-6 py-4 rounded-2xl font-bold text-lg"
              onClick={() => setIsOpen(false)}
            >
              Book Appointment
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

const Footer = () => (
  <footer className="bg-sky-950 text-white pt-24 pb-12 overflow-hidden relative">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 relative z-10">
      <div>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-sky-500/20">S</div>
          <span className="text-2xl font-black tracking-tight">Skin Care OPD</span>
        </div>
        <p className="text-sky-200/70 mb-8 leading-relaxed font-medium">
          Leading the way in personalized medical excellence since 2000. Award-winning clinical care for generations in Odisha.
        </p>
        <div className="flex gap-4">
          {SOCIAL_LINKS.map((s, idx) => (
            <a key={idx} href={s.href} className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center hover:bg-sky-500 hover:border-sky-500 transition-all group" aria-label={s.label}>
              <span className="group-hover:scale-110 transition-transform">
                {s.icon}
              </span>
            </a>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-lg font-bold mb-8 text-sky-400 uppercase tracking-widest">Navigation</h4>
        <ul className="space-y-4 text-sky-100/60 font-bold">
          <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
          <li><Link to="/doctors" className="hover:text-white transition-colors">Our Doctors</Link></li>
          <li><Link to="/waiting-hall" className="hover:text-white transition-colors text-sky-400">Live Waiting Hall</Link></li>
        </ul>
      </div>

      <div>
        <h4 className="text-lg font-bold mb-8 text-sky-400 uppercase tracking-widest">Legal</h4>
        <ul className="space-y-4 text-sky-100/60 font-bold">
          <li><Link to="/contact" className="hover:text-white transition-colors">Contact Support</Link></li>
          <li><Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
          <li><Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link></li>
        </ul>
      </div>

      <div>
        <h4 className="text-lg font-bold mb-8 text-sky-400 uppercase tracking-widest">Connect</h4>
        <div className="space-y-6 text-sky-100/80 font-medium text-sm">
          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 flex items-center justify-center text-sky-400 shrink-0 mt-0.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            </div>
            <span className="leading-relaxed">Doctors Lane, Kali Mandir Rd, Brahmapur, Odisha 760001</span>
          </div>
          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 flex items-center justify-center text-sky-400 shrink-0 mt-0.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
            </div>
            <span className="leading-relaxed">+91 904 090 1236</span>
          </div>
          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 flex items-center justify-center text-sky-400 shrink-0 mt-0.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            </div>
            <span className="leading-relaxed">care@skincareopd.com</span>
          </div>
        </div>
      </div>
    </div>
    
    <div className="max-w-7xl mx-auto px-6 mt-24 pt-12 border-t border-white/5 text-center text-sky-500/50 text-xs font-bold tracking-widest uppercase">
      <p>Copyright © 2024 Skin Care OPD. Design By - aceit</p>
    </div>
    <div className="absolute bottom-0 right-0 w-96 h-96 bg-sky-500/5 rounded-full blur-[120px]"></div>
  </footer>
);

const App: React.FC = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-white">
        <TopBar />
        <Navbar />
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
              <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
              <Route path="/doctors" element={<PageWrapper><Doctors /></PageWrapper>} />
              <Route path="/department" element={<PageWrapper><Department /></PageWrapper>} />
              <Route path="/gallery" element={<PageWrapper><Gallery /></PageWrapper>} />
              <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
              <Route path="/appointment" element={<PageWrapper><Appointment /></PageWrapper>} />
              <Route path="/admin" element={<PageWrapper><Admin /></PageWrapper>} />
              <Route path="/waiting-hall" element={<PageWrapper><WaitingHall /></PageWrapper>} />
              <Route path="/privacy-policy" element={<PageWrapper><PrivacyPolicy /></PageWrapper>} />
              <Route path="/terms-of-service" element={<PageWrapper><TermsOfService /></PageWrapper>} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;