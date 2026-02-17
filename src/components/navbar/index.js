import React, { useCallback, useEffect, useMemo, useState } from 'react';
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

  useEffect(() => {
    if (typeof document === 'undefined') return undefined;
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(prev => !prev);

  const handleLogout = () => {
    Cookies.remove('notes-auth');
    dispatch(handleChange({ name: 'logout' }));
    navigate('/');
    setShowLogoutConfirm(false);
  };

  const filteredLinks = useMemo(
    () => NAV_LINKS.filter(link => (link.protected ? token : true)),
    [token]
  );

  const renderLinks = useCallback(
    (isMobile = false) => {
      const containerClasses = cn(
        'flex items-center gap-2 text-sm font-medium',
        isMobile ? 'flex-col items-start gap-6 text-lg' : ''
      );

      return (
        <div className={containerClasses}>
          {filteredLinks.map(({ label, path }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={cn(
                  'relative px-3 py-1 transition-colors duration-150',
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

          <div
            className={cn(
              'flex gap-3 sm:items-center',
              isMobile ? 'w-full flex-col gap-4 border-t border-base-200 pt-4' : 'sm:flex-row'
            )}
          >
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                'border border-transparent bg-transparent text-muted hover:bg-black/5 dark:hover:bg-white/10',
                isMobile ? 'w-full justify-center' : ''
              )}
              onClick={onToggleTheme}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              <span className={cn('text-xs uppercase tracking-[0.4em]', isMobile ? 'ml-2' : 'hidden sm:inline')}>
                {theme === 'dark' ? 'Light' : 'Dark'} Mode
              </span>
            </Button>

            {token ? (
              <div
                className={cn(
                  'flex gap-3',
                  isMobile ? 'w-full flex-col' : 'flex-col items-start sm:flex-row sm:items-center sm:gap-2'
                )}
              >
                <p className="text-xs uppercase tracking-[0.4em] text-muted">Welcome {user}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  className={isMobile ? 'btn-outline w-full rounded-2xl' : ''}
                  onClick={() => setShowLogoutConfirm(true)}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className={cn('flex gap-2', isMobile ? 'w-full flex-col gap-3' : '')}>
                <Button
                  variant="secondary"
                  size="sm"
                  className={isMobile ? 'w-full rounded-2xl' : ''}
                  onClick={() => navigate('/login')}
                >
                  Login
                </Button>
                <Button
                  size="sm"
                  className={isMobile ? 'btn-primary w-full rounded-2xl' : ''}
                  onClick={() => navigate('/signup')}
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      );
    },
    [filteredLinks, location.pathname, navigate, onToggleTheme, setIsOpen, theme, token, user]
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

      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="fixed inset-0 z-[990] sm:hidden"
                style={{ backgroundColor: theme === 'dark' ? 'rgba(5, 6, 15, 0.96)' : 'rgba(245, 247, 251, 0.96)' }}
                onClick={toggleMenu}
              >
                <motion.div
                  initial={{ y: 36, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 36, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 360, damping: 32 }}
                  className="mx-4 mt-20 rounded-[1.75rem] border border-base-300 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.18)]"
                  style={{
                    backgroundColor: theme === 'dark' ? 'rgba(15, 18, 30, 0.95)' : 'rgba(255, 255, 255, 0.98)',
                    color: theme === 'dark' ? 'var(--fg-primary)' : 'var(--fg-primary)',
                  }}
                  onClick={event => event.stopPropagation()}
                >
                  <div className="text-xs uppercase tracking-[0.5em] text-muted">Navigate</div>
                  <div className="mt-4 space-y-4">{renderLinks(true)}</div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}

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
