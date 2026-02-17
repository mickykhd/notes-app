import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { toast } from 'sonner';
import { handleChange } from './assets/loginSlice';
import { baseURL } from '../../constants/baseUrl';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';

const Login = () => {
  const [input, setInput] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = event => {
    const { name, value } = event.target;
    setInput(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = async event => {
    event?.preventDefault();
    if (!input.email || !input.password) {
      toast.error('Please fill in both email and password.');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${baseURL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });

      const info = await response.json();

      if (!response.ok) {
        toast.error(info?.message || 'Invalid credentials');
        return;
      }

      dispatch(handleChange({ name: 'token', value: info }));
      Cookies.set('notes-auth', JSON.stringify(info), { expires: 30 });
      toast.success('Welcome back! Redirecting you to your notes.');
      navigate('/notes');
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="grid gap-10 lg:grid-cols-2">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <p className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-1 text-xs uppercase tracking-[0.4em] text-muted">
          Lumina Notes
        </p>
        <h1 className="font-display text-4xl leading-tight text-primary md:text-5xl">
          Sign in to continue the flow.
        </h1>
        <p className="text-base text-muted">
          Your last session is ready where you left it. Secure cookies keep you signed in for 30 days across tabs and devices.
        </p>
        <div className="flex flex-wrap gap-4 text-sm text-muted">
          <div className="surface-panel px-4 py-3">
            <p className="text-xl font-semibold text-primary">30d</p>
            <p className="text-xs uppercase tracking-[0.4em] text-muted">persistent</p>
          </div>
          <div className="surface-panel px-4 py-3">
            <p className="text-xl font-semibold text-primary">100%</p>
            <p className="text-xs uppercase tracking-[0.4em] text-muted">responsive</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <Card className="glass-panel">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-primary">Welcome back</CardTitle>
            <CardDescription className="text-muted">
              Enter your credentials to access notes instantly.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-5" onSubmit={handleLogin}>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm text-muted">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="alex@lumina.dev"
                  value={input.email}
                  onChange={handleInputChange}
                  autoComplete="email"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm text-muted">
                  Password
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={input.password}
                  onChange={handleInputChange}
                  autoComplete="current-password"
                />
              </div>
              <Button type="submit" size="lg" className="w-full" disabled={loading}>
                {loading ? 'Signing you in...' : 'Log In'}
              </Button>
              <p className="text-sm text-muted">
                New here?{' '}
                <button type="button" className="text-accent underline-offset-4 hover:underline" onClick={() => navigate('/signup')}>
                  Create an account
                </button>
              </p>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
};

export default Login;
