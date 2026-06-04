'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { home } from '@/content/home';
import { Section, Container, Button } from '@/components/ui';
import { Star } from 'lucide-react';

export function CtaBanner() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <Section bg="none" className="p-0 py-0 md:py-0">
      <div className="bg-primary-400 py-16 md:py-20 relative overflow-hidden">
        {/* Decorative Stars */}
        <Star className="absolute top-10 left-10 text-primary-300 fill-current opacity-60 w-8 h-8 -rotate-12" />
        <Star className="absolute bottom-10 left-20 text-primary-300 fill-current opacity-80 w-12 h-12 rotate-45" />
        <Star className="absolute top-16 right-24 text-primary-300 fill-current opacity-70 w-10 h-10 rotate-12" />
        <Star className="absolute bottom-12 right-12 text-primary-300 fill-current opacity-50 w-6 h-6 -rotate-45" />

        <Container className="relative z-10 text-center flex flex-col items-center">
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-col items-center"
          >
            <motion.h2 variants={itemVariants} className="font-display font-bold text-primary-950 text-3xl md:text-4xl">
              {home.ctaBanner.heading}
            </motion.h2>
            <motion.p variants={itemVariants} className="font-body text-primary-900 text-lg mt-3 max-w-xl mx-auto">
              {home.ctaBanner.sub}
            </motion.p>
            <motion.div variants={itemVariants} className="mt-8">
              <Button variant="secondary" size="lg" href={home.ctaBanner.ctaHref} external>
                {home.ctaBanner.ctaLabel}
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </div>
    </Section>
  );
}
