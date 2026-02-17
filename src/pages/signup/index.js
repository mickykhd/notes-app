import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { baseURL } from '../../constants/baseUrl';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';

const Signup = () => {
  const [input, setInput] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = event => {
    const { name, value } = event.target;
    setInput(prev => ({ ...prev, [name]: value }));
  };

  const handleSignup = async event => {
    event?.preventDefault();
    if (!input.name || !input.email || !input.password) {
      toast.error('Please fill in all fields.');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${baseURL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });
      const info = await response.json();

      if (response.status === 201) {
        toast.success('Account created! You can log in now.');
        setInput({ name: '', email: '', password: '' });
        navigate('/login');
      } else {
        toast.error(info?.message || 'Please check the details and try again.');
      }
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
          Create an account in minutes.
        </h1>
        <p className="text-base text-muted">
          Join a distraction-free space where every note gets the cinematic treatment.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="glass-panel p-4">
            <p className="text-3xl font-semibold text-primary">2x</p>
            <p className="text-sm text-muted">Faster note capture</p>
          </div>
          <div className="glass-panel p-4">
            <p className="text-3xl font-semibold text-primary">0%</p>
            <p className="text-sm text-muted">Ads & distractions</p>
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
            <CardTitle className="text-2xl text-primary">Sign up</CardTitle>
            <CardDescription className="text-muted">
              Start documenting ideas with a radiant workspace.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-5" onSubmit={handleSignup}>
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm text-muted">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Astra Nova"
                  value={input.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm text-muted">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="astra@lumina.dev"
                  value={input.email}
                  onChange={handleInputChange}
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
                />
              </div>
              <Button type="submit" size="lg" className="w-full" disabled={loading}>
                {loading ? 'Creating...' : 'Create account'}
              </Button>
              <p className="text-sm text-muted">
                Already a member?{' '}
                <button type="button" className="text-accent underline-offset-4 hover:underline" onClick={() => navigate('/login')}>
                  Log in
                </button>
              </p>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
};

export default Signup;
