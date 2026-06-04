'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { home } from '@/content/home';
import { book } from '@/content/book';
import { Button, Container } from '@/components/ui';

const renderHeadline = (text: string) => {
  const matchWord = "Magic";
  const parts = text.split(new RegExp(`(${matchWord})`, 'gi'));
  return parts.map((part, i) => 
    part.toLowerCase() === matchWord.toLowerCase() 
      ? <span key={i} className="text-primary-500">{part}</span> 
      : part
  );
};

export function Hero() {
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
    <section className="relative min-h-screen flex items-center bg-paper-100 overflow-hidden border-b-8 border-primary-500">
      {/* Decorative SVGs */}
      <svg className="absolute top-20 left-10 w-64 h-64 text-primary-200 fill-current opacity-30 pointer-events-none" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="100" r="100" />
      </svg>
      <svg className="absolute bottom-20 right-10 w-80 h-80 text-secondary-200 fill-current opacity-30 pointer-events-none" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,81.4,-46.3C91,-33.5,97.2,-18,97.6,-2.4C98,13.2,92.5,28.9,83.8,42.5C75.1,56.1,63.1,67.6,49.1,76.5C35.1,85.4,19.1,91.7,2.5,87.3C-14.1,82.9,-31.2,67.8,-46.3,55.1C-61.4,42.4,-74.5,32.1,-82.9,18C-91.3,3.9,-95,-14,-90.4,-29.4C-85.8,-44.8,-72.9,-57.7,-58.5,-64.8C-44.1,-71.9,-28.2,-73.2,-13,-76.6C2.2,-80,24.3,-85.5,44.7,-76.4Z" transform="translate(100 100)" />
      </svg>
      <svg className="absolute top-1/3 right-1/4 w-32 h-32 text-accent-200 fill-current opacity-40 pointer-events-none" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path d="M49.4,-72C64.3,-62.4,76.8,-48.9,85.5,-32.9C94.2,-16.9,99.1,1.6,95.3,18.7C91.5,35.8,79,51.5,63.9,62.9C48.8,74.3,31.1,81.4,12.7,85.2C-5.7,89,-24.8,89.5,-42.2,82.8C-59.6,76.1,-75.3,62.2,-85.2,45C-95.1,27.8,-99.2,7.3,-95.4,-11.5C-91.6,-30.3,-79.9,-47.4,-64.8,-57.8C-49.7,-68.2,-31.2,-71.9,-14.2,-74.6C2.8,-77.3,25.6,-79,49.4,-72Z" transform="translate(100 100)" />
      </svg>

      <Container className="relative z-10 py-20 md:py-32">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col-reverse md:flex-row items-center justify-between gap-12"
        >
          {/* Left Column */}
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left relative">
            <svg className="absolute -top-10 -left-10 w-16 h-16 text-primary-400 fill-current animate-float" style={{ animationDelay: '0s' }} viewBox="0 0 24 24"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
            <svg className="absolute top-1/2 -right-8 w-12 h-12 text-accent-400 fill-current animate-wiggle" style={{ animationDelay: '1s' }} viewBox="0 0 24 24"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
            <svg className="absolute -bottom-8 left-10 w-8 h-8 text-primary-400 fill-current animate-float" style={{ animationDelay: '0.5s' }} viewBox="0 0 24 24"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
            
            <motion.h1 variants={itemVariants} className="font-display font-bold text-primary-950 text-4xl md:text-5xl lg:text-7xl">
              {renderHeadline(home.hero.headline)}
            </motion.h1>
            <motion.p variants={itemVariants} className="font-body text-lg md:text-xl text-slate-600 max-w-lg mt-4">
              {home.hero.subheadline}
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mt-8 justify-center md:justify-start">
              <Button size="lg" variant="primary" href={home.hero.primaryCtaHref} external>
                {home.hero.primaryCtaLabel}
              </Button>
              <Button size="lg" variant="outline" href={home.hero.secondaryCtaHref}>
                {home.hero.secondaryCtaLabel}
              </Button>
            </motion.div>
          </div>

          {/* Right Column */}
          <motion.div variants={itemVariants} className="w-full md:w-1/2 flex justify-center items-center">
            <div className="relative max-w-[280px] md:max-w-[380px] w-full">
              {/* Tape holding the book */}
              <div className="absolute -top-4 left-1/4 w-20 h-8 bg-accent-500 opacity-90 -rotate-6 z-20" style={{ clipPath: 'polygon(5% 0, 95% 5%, 100% 95%, 0 100%)' }}></div>
              <div className="absolute -bottom-6 right-1/4 w-20 h-8 bg-secondary-500 opacity-90 rotate-6 z-20" style={{ clipPath: 'polygon(0 5%, 100% 0, 95% 100%, 5% 95%)' }}></div>
              <Image 
                src={book.coverImage} 
                alt={book.title} 
                width={380} 
                height={480} 
                className="w-full h-auto shadow-[12px_12px_0px_rgba(15,23,42,1)] -rotate-3 animate-float border-4 border-slate-900 bg-white"
              />
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
