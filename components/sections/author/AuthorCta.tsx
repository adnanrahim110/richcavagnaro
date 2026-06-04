'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { amazonLink, book } from '@/content/book';
import { Section, Container, Button } from '@/components/ui';

export function AuthorCta() {
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
      <div className="bg-primary-400 py-20 relative overflow-hidden">
        <Container className="relative z-10 text-center flex flex-col items-center">
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-col items-center"
          >
            <motion.h2 variants={itemVariants} className="font-display font-bold text-primary-950 text-3xl md:text-4xl">
              Bring Rory&apos;s Very Silly Signs Home!
            </motion.h2>
            <motion.p variants={itemVariants} className="font-body text-primary-900 text-lg mt-3 max-w-xl mx-auto">
              {book.tagline}
            </motion.p>
            <motion.div variants={itemVariants} className="mt-8">
              <Button variant="secondary" size="lg" href={amazonLink} external>
                Buy on Amazon
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </div>
    </Section>
  );
}
