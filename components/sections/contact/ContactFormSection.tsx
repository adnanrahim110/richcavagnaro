'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Section, Container, SectionHead, Card } from '@/components/ui';
import { ContactForm } from '@/components/sections/shared/ContactForm';

export function ContactFormSection() {
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
    <Section bg="white" id="contact-form">
      <Container>
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants}>
            <SectionHead 
              heading="Send a Message"
              size="sm"
              align="center"
            />
          </motion.div>

          <motion.div variants={itemVariants} className="mt-10 max-w-2xl mx-auto">
            <Card variant="elevated" padding="lg">
              <ContactForm />
            </Card>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
