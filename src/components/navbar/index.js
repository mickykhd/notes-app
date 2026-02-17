import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import Cookies from 'js-cookie';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { handleChange } from '../../pages/login/assets/loginSlice';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Notes', path: '/notes', protected: true },
  { label: 'About', path: '/about' },
];

const Navbar = ({ theme = 'light', onToggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, user } = useSelector(state => state.loginData);

  const toggleMenu = () => setIsOpen(prev => !prev);

  const handleLogout = () => {
    Cookies.remove('notes-auth');
    dispatch(handleChange({ name: 'logout' }));
    navigate('/');
    setShowLogoutConfirm(false);
  };

  const renderLinks = (isMobile = false) => (
    <div
      className={cn(
        'flex items-center gap-2 text-sm font-medium',
        isMobile ? 'flex-col gap-4 text-base' : ''
      )}
    >
      {NAV_LINKS.filter(link => (link.protected ? token : true)).map(({ label, path }) => {
        const isActive = location.pathname === path;
        return (
          <Link
            key={path}
            to={path}
            className={cn(
              'relative px-3 py-1 transition-colors',
              isActive ? 'text-primary' : 'text-muted hover:text-primary'
            )}
            onClick={() => setIsOpen(false)}
          >
            {label}
            {isActive && (
              <motion.span
                layoutId="nav-pill"
                className="absolute inset-x-1 -bottom-2 h-0.5 rounded-full bg-[var(--accent-color)]"
              />
            )}
          </Link>
        );
      })}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-3">
        <Button
          variant="ghost"
          size="sm"
          className="border border-transparent bg-transparent text-muted hover:bg-black/5 dark:hover:bg-white/10"
          onClick={onToggleTheme}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          <span className="hidden text-xs uppercase tracking-[0.4em] sm:inline">
            {theme === 'dark' ? 'Light' : 'Dark'} Mode
          </span>
        </Button>
        {token ? (
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-2">
            <p className="text-xs uppercase tracking-[0.4em] text-muted">
              Welcome {user}
            </p>
            <Button variant="ghost" size="sm" onClick={() => setShowLogoutConfirm(true)}>
              Logout
            </Button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" onClick={() => navigate('/login')}>
              Login
            </Button>
            <Button size="sm" onClick={() => navigate('/signup')}>
              Sign Up
            </Button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <motion.header
      className="glass-panel flex items-center justify-between px-5 py-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <Link to="/" className="font-display text-xl font-semibold tracking-wide" onClick={() => setIsOpen(false)}>
        Lumina Notes
      </Link>
      <div className="hidden items-center gap-3 sm:flex">{renderLinks()}</div>
      <Button
        variant="ghost"
        size="sm"
        className="sm:hidden"
        onClick={toggleMenu}
        aria-label="Toggle navigation"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute left-4 right-4 top-[4.5rem] rounded-3xl border border-white/10 bg-surface p-6 shadow-glow sm:hidden dark:bg-dusk/95"
          >
            {renderLinks(true)}
          </motion.div>
        )}
      </AnimatePresence>

      {showLogoutConfirm &&
        typeof document !== 'undefined' &&
        createPortal(
          <div className="fixed inset-0 z-[999] bg-black/60">
            <div className="absolute left-1/2 top-1/2 w-[clamp(18rem,90vw,26rem)] -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-white/10 bg-surface p-6 shadow-glow dark:bg-dusk/95">
              <h2 className="font-display text-2xl text-primary">Log out?</h2>
              <p className="mt-3 text-sm text-muted">
                You&apos;ll be signed out on this device. Your notes stay safe and cached via cookies for 30 days.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button variant="danger" className="flex-1" onClick={handleLogout}>
                  Yes, log me out
                </Button>
                <Button variant="secondary" className="flex-1" onClick={() => setShowLogoutConfirm(false)}>
                  Stay signed in
                </Button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </motion.header>
  );
};

export default Navbar;
