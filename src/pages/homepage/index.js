import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const features = [
  {
    title: 'Fluid note taking',
    copy: 'Craft notes with a distraction-free editor that syncs instantly.',
  },
  {
    title: 'Stay organized',
    copy: 'Group, edit, and delete notes effortlessly across all devices.',
  },
  {
    title: 'Secure by design',
    copy: 'Your content is encrypted in transit with resilient auth guards.',
  },
];

const Homepage = () => {
  const navigate = useNavigate();
  const { token } = useSelector(state => state.loginData);

  return (
    <section className="relative overflow-hidden py-12 sm:py-16">
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="space-y-8"
          >
            <p className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-1 text-xs uppercase tracking-[0.4em] text-muted">
              Lumina Notes
            </p>
            <h1 className="font-display text-3xl leading-tight text-primary sm:text-4xl md:text-5xl lg:text-6xl">
              A luminous space for every thought, task, and breakthrough.
            </h1>
            <p className="text-base text-muted md:text-lg">
              Capture ideas in a serene workspace, organize them with intention, and revisit them anywhere. Responsive by default, animated with purpose.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {!token && (
                <Button size="lg" className="w-full sm:w-auto" onClick={() => navigate('/signup')}>
                  Start creating
                </Button>
              )}
              <Button
                variant="secondary"
                size="lg"
                className="w-full rounded-full px-8 py-5 text-base shadow-[0_18px_45px_rgba(15,23,42,0.15)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_25px_55px_rgba(15,23,42,0.25)] sm:w-auto"
                onClick={() => navigate('/notes')}
              >
                View your notes
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-[0.65rem] uppercase tracking-[0.45em] text-muted sm:gap-6">
              <span>Encrypted</span>
              <span className="h-1 w-1 rounded-full bg-white/40" />
              <span>Responsive</span>
              <span className="h-1 w-1 rounded-full bg-white/40" />
              <span>Lightning-fast</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1"
          >
            {features.map(feature => (
              <Card key={feature.title} className="glass-panel h-full">
                <CardHeader>
                  <CardTitle className="text-primary">{feature.title}</CardTitle>
                  <CardDescription className="text-muted">{feature.copy}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-1 w-16 rounded-full bg-[var(--accent-color)]" />
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Homepage;
