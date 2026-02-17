import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { Toaster } from 'sonner';
import Homepage from './pages/homepage';
import Signup from './pages/signup';
import Login from './pages/login';
import Notes from './pages/notes';
import About from './pages/about';
import Navbar from './components/navbar';
import { handleChange } from './pages/login/assets/loginSlice';

const AppRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  const dispatch = useDispatch();
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const storedTheme = localStorage.getItem('notes-theme');
    if (storedTheme === 'dark' || storedTheme === 'light') {
      setTheme(storedTheme);
    } else {
      const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }, []);

  useEffect(() => {
    document.body.classList.toggle('theme-dark', theme === 'dark');
    localStorage.setItem('notes-theme', theme);
  }, [theme]);

  const handleThemeToggle = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    const storedAuth = Cookies.get('notes-auth');
    if (storedAuth) {
      try {
        const parsed = JSON.parse(storedAuth);
        if (parsed?.token) {
          dispatch(handleChange({ name: 'token', value: parsed }));
        }
      } catch (error) {
        console.error('Failed to parse auth cookie', error);
      }
    }
  }, [dispatch]);

  return (
    <div className="min-h-screen cosmic-gradient text-primary transition-colors">
      <BrowserRouter>
        <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 pb-16 pt-6 md:px-10">
          <Navbar theme={theme} onToggleTheme={handleThemeToggle} />
          <motion.main
            className="mt-10 flex-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <AppRoutes />
          </motion.main>
        </div>
        <Toaster richColors theme="dark" duration={3500} />
      </BrowserRouter>
    </div>
  );
}

export default App;
