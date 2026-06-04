'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { home } from '@/content/home';
import { Section, Container, SectionHead, Card, FloatingDoodle } from '@/components/ui';
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
    <Section bg="accent-soft" id="contact">
      <FloatingDoodle shape="burst" color="text-accent-300" animation="swing" className="absolute top-20 right-20 w-32 h-32" />
      <FloatingDoodle shape="circle" color="text-accent-200" animation="float" className="absolute bottom-20 left-10 w-40 h-40 opacity-50" />
      <Container>
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants}>
            <SectionHead 
              eyebrow={home.contactSection.eyebrow}
              heading={home.contactSection.heading}
              sillyHeading="Send a Giggle!"
              sub={home.contactSection.sub}
              align="center"
            />
          </motion.div>

          <motion.div variants={itemVariants} className="max-w-2xl mx-auto mt-10">
            <Card variant="elevated" padding="lg">
              <ContactForm />
            </Card>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
