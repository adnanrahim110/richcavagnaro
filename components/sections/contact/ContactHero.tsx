'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { contact } from '@/content/contact';
import { Container } from '@/components/ui';

export function ContactHero() {
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
    <section className="relative min-h-[45vh] flex items-center bg-secondary-50 overflow-hidden py-20">
      {/* Decorative SVG Paper Plane */}
      <svg className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 w-40 h-40 md:w-[300px] md:h-[300px] text-secondary-200 opacity-40 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 2L11 13" />
        <path d="M22 2L15 22L11 13L2 9L22 2Z" fill="currentColor" />
      </svg>

      <Container className="relative z-10 w-full">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col items-center text-center max-w-2xl mx-auto"
        >
          <motion.h1 variants={itemVariants} className="font-display font-bold text-slate-900 text-4xl md:text-5xl">
            {contact.hero.heading}
          </motion.h1>
          <motion.p variants={itemVariants} className="font-body text-lg text-slate-600 max-w-xl mx-auto mt-4">
            {contact.hero.sub}
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}
