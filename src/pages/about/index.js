import React from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';

const pillars = [
  {
    title: 'Crafted with MERN',
    copy: 'MongoDB, Express, React, and Node.js combine for a resilient, scalable notes backend.',
  },
  {
    title: 'Security first',
    copy: 'Transport encryption and cookie-based auth keep every note private, even across devices.',
  },
  {
    title: 'Thoughtful UX',
    copy: 'Responsive layouts, cinematic motion, and glassy surfaces turn productivity into a ritual.',
  },
];

const About = () => {
  const { token } = useSelector(state => state.loginData);
  const navigate = useNavigate();

  return (
    <section className="space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <p className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-1 text-xs uppercase tracking-[0.4em] text-muted">
          The Origin Story
        </p>
        <h1 className="font-display text-4xl text-primary md:text-5xl">An elegant note sanctuary built with love.</h1>
        <p className="text-base text-muted md:text-lg">
          Lumina Notes is Ashrumochan&apos;s modern take on a MERN stack notes application—engineered for clarity,
          resilience, and delight. Every interaction is designed to keep you in flow while your ideas stay perfectly
          organized.
        </p>
        {token && (
          <Button size="lg" onClick={() => navigate('/notes')}>
            Back to your notes
          </Button>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {pillars.map(pillar => (
          <Card key={pillar.title} className="glass-panel">
            <CardHeader>
              <CardTitle className="text-primary">{pillar.title}</CardTitle>
              <CardDescription className="text-muted">{pillar.copy}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-1 w-14 rounded-full bg-gradient-to-r from-aurora to-neon" />
            </CardContent>
          </Card>
        ))}
      </motion.div>
    </section>
  );
};

export default About;
