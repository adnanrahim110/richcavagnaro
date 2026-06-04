'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { home } from '@/content/home';
import { book } from '@/content/book';
import { Section, Container, SectionHead, Card, FloatingDoodle } from '@/components/ui';
import * as LucideIcons from 'lucide-react';

export function BookIntro() {
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

  const colors = [
    'text-primary-500 border-primary-500',
    'text-secondary-500 border-secondary-500',
    'text-accent-500 border-accent-500',
    'text-green-500 border-green-500',
  ];

  return (
    <Section bg="primary-soft" id="book-intro">
      <FloatingDoodle shape="star" color="text-primary-300" animation="pulse" className="absolute top-10 left-10 w-24 h-24" />
      <FloatingDoodle shape="squiggle" color="text-primary-300" animation="wiggle" className="absolute bottom-20 right-10 w-32 h-32" />
      <Container>
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants}>
            <SectionHead 
              eyebrow={home.bookSection.eyebrow}
              heading={home.bookSection.heading}
              sub={home.bookSection.sub}
              size="md"
              align="center"
            />
          </motion.div>

          <motion.div variants={itemVariants} className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {book.highlights.map((highlight, index) => {
              // @ts-expect-error dynamic key
              const Icon = LucideIcons[highlight.iconName] || LucideIcons.Star;
              const colorClass = colors[index % colors.length];
              const [textColor, borderColor] = colorClass.split(' ');

              return (
                <motion.div key={index} variants={itemVariants} className={`${index % 2 === 0 ? '-rotate-1' : 'rotate-2'} hover:rotate-0 transition-transform duration-300`}>
                  <Card variant="elevated" className={`border-t-8 ${borderColor} h-full`}>
                    <Icon size={32} className={textColor} />
                    <h3 className="font-display font-semibold text-slate-800 text-lg mt-4">
                      {highlight.title}
                    </h3>
                    <p className="font-body text-slate-600 text-sm mt-2">
                      {highlight.description}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
