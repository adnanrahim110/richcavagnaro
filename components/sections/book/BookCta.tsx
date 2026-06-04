'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { amazonLink } from '@/content/book';
import { Section, Container, Button } from '@/components/ui';
import { Sparkles } from 'lucide-react';

export function BookCta() {
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
      <div className="bg-gradient-to-br from-secondary-600 to-secondary-800 py-20 relative overflow-hidden">
        {/* Decorative Sparkles */}
        <Sparkles className="absolute top-10 left-10 text-secondary-400 fill-current opacity-30 w-12 h-12" />
        <Sparkles className="absolute bottom-10 right-16 text-secondary-400 fill-current opacity-40 w-16 h-16" />
        <Sparkles className="absolute top-1/2 right-1/3 text-secondary-400 fill-current opacity-20 w-8 h-8 -translate-y-1/2" />

        <Container className="relative z-10 text-center flex flex-col items-center">
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-col items-center"
          >
            <motion.h2 variants={itemVariants} className="font-display font-bold text-white text-3xl md:text-4xl">
              Ready to meet Rory Ruckus?
            </motion.h2>
            <motion.p variants={itemVariants} className="font-body text-secondary-100 text-lg mt-3 max-w-xl mx-auto">
              Grab your copy today and enjoy the hilarious world of very silly signs with your young reader.
            </motion.p>
            <motion.div variants={itemVariants} className="mt-8">
              <Button variant="primary" size="lg" href={amazonLink} external>
                Buy on Amazon
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </div>
    </Section>
  );
}
