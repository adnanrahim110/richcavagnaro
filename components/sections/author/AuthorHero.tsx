'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { author } from '@/content/author';
import { Container } from '@/components/ui';

export function AuthorHero() {
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
    <section className="relative min-h-[85vh] flex items-center bg-gradient-to-br from-primary-50 via-white to-accent-50 overflow-hidden py-20">
      {/* Decorative Blobs */}
      <svg className="absolute top-0 left-0 w-48 h-48 md:w-96 md:h-96 text-primary-100 fill-current opacity-40 pointer-events-none -translate-x-1/3 -translate-y-1/3" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path d="M47.7,-57.2C59.9,-46.4,66.6,-28.9,70.5,-10.8C74.4,7.4,75.4,26.1,65.8,40.1C56.2,54.1,36,63.2,16.5,66.2C-2.9,69.2,-21.6,66,-37.2,55.9C-52.8,45.8,-65.3,28.8,-69.1,10.2C-72.9,-8.4,-68,-28.6,-55.5,-39.9C-43,-51.2,-22.9,-53.6,-2.8,-50.3C17.3,-47,35.5,-68,47.7,-57.2Z" transform="translate(100 100)" />
      </svg>
      <svg className="absolute bottom-0 right-0 w-64 h-64 md:w-[500px] md:h-[500px] text-accent-100 fill-current opacity-30 pointer-events-none translate-x-1/4 translate-y-1/4" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path d="M45.7,-76.3C58.9,-69.3,69,-55.4,76.5,-40.4C84,-25.4,88.9,-9.4,85.6,4.8C82.3,19,70.8,31.4,59.1,42.5C47.4,53.6,35.5,63.4,21.3,71C7.1,78.6,-9.4,84,-24.1,79.5C-38.8,75,-51.7,60.6,-61.6,45.6C-71.5,30.6,-78.4,15.3,-78.1,0.2C-77.8,-14.9,-70.3,-29.8,-60.1,-41.8C-49.9,-53.8,-37,-62.9,-23.4,-69.4C-9.8,-75.9,4.5,-79.8,20.2,-79.2C35.9,-78.6,32.5,-83.3,45.7,-76.3Z" transform="translate(100 100)" />
      </svg>
      <svg className="absolute top-1/2 right-1/4 w-32 h-32 md:w-64 md:h-64 text-primary-100 fill-current opacity-30 pointer-events-none -translate-y-1/2" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path d="M39.9,-66.6C52.4,-57.9,63.8,-47.4,71.4,-34.3C79,-21.2,82.8,-5.5,81.1,9.8C79.4,25.1,72.2,40.1,60.9,51.2C49.6,62.3,34.2,69.5,18.4,72.6C2.6,75.7,-13.6,74.7,-28.5,69.1C-43.4,63.5,-57,53.3,-65.4,39.8C-73.8,26.3,-77,9.5,-74,-6.2C-71,-21.9,-61.8,-36.5,-50,-46.3C-38.2,-56.1,-23.8,-61.1,-9.1,-63.9C5.6,-66.7,27.4,-75.3,39.9,-66.6Z" transform="translate(100 100)" />
      </svg>

      <Container className="relative z-10 w-full max-w-6xl">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col items-center text-center"
        >
          <motion.div variants={itemVariants} className="relative w-44 h-44 md:w-56 md:h-56 rounded-full overflow-hidden ring-4 ring-primary-400 ring-offset-8 ring-offset-white drop-shadow-xl">
            <Image 
              src={author.photo} 
              alt={author.name} 
              fill 
              className="object-cover"
            />
          </motion.div>
          <motion.h1 variants={itemVariants} className="font-display font-bold text-slate-900 text-5xl md:text-6xl mt-6">
            {author.name}
          </motion.h1>
          <motion.p variants={itemVariants} className="font-handwriting text-2xl md:text-3xl text-accent-500 mt-4">
            {author.tagline}
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}
