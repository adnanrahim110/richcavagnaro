'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { book } from '@/content/book';
import { Section, Container } from '@/components/ui';
import { BookOpen, Users, Calendar, Tag } from 'lucide-react';

export function MetadataBand() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const metadata = [
    { icon: BookOpen, label: "Pages", value: book.pageCount },
    { icon: Users, label: "Ages", value: book.ageRange },
    { icon: Calendar, label: "Published", value: book.publishedYear },
    { icon: Tag, label: "Genre", value: "Children's Picture Book" },
  ];

  return (
    <Section bg="secondary-soft" size="sm">
      <Container>
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-4"
        >
          {metadata.map((item, index) => {
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex flex-col items-center text-center px-6 py-4 md:py-0 border-r border-secondary-200 even:border-r-0 md:even:border-r last:border-r-0"
              >
                <item.icon size={24} className="text-secondary-600" />
                <span className="font-body text-xs text-slate-500 uppercase tracking-wide mt-2">
                  {item.label}
                </span>
                <span className="font-display font-semibold text-slate-800 text-lg">
                  {item.value}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </Section>
  );
}
