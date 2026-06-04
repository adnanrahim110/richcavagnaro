'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { book, title, amazonLink } from '@/content/book';
import { Button, Container, Badge } from '@/components/ui';
import { Star } from 'lucide-react';

export function BookHero() {
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
    <section className="relative min-h-[80vh] flex items-center bg-gradient-to-br from-secondary-50 via-white to-primary-50 overflow-hidden py-20">
      <Container className="relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col md:flex-row-reverse items-center justify-between gap-12"
        >
          {/* Image Column */}
          <motion.div variants={itemVariants} className="w-full md:w-1/2 flex justify-center items-center order-1 md:order-2">
            <div className="relative max-w-[380px] w-full">
              <Image 
                src={book.coverImage} 
                alt={title} 
                width={380} 
                height={480} 
                className="w-full h-auto drop-shadow-2xl -rotate-3 animate-float"
              />
            </div>
          </motion.div>

          {/* Content Column */}
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left order-2 md:order-1">
            <motion.h1 variants={itemVariants} className="font-display font-bold text-slate-900 text-4xl md:text-5xl">
              {title}
            </motion.h1>
            <motion.p variants={itemVariants} className="font-handwriting text-2xl text-accent-500 mt-3">
              {book.tagline}
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
              <Badge color="secondary">{book.ageRange}</Badge>
              <Badge color="green">{book.pageCount} pages</Badge>
              <Badge color="primary">Published {book.publishedYear}</Badge>
            </motion.div>
            <motion.div variants={itemVariants} className="flex flex-row items-center gap-2 mt-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} className="fill-current text-primary-400" />
                ))}
              </div>
              <span className="text-sm font-body text-slate-500">5.0 · Loved by families</span>
            </motion.div>
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 mt-8 w-full sm:w-auto">
              <Button size="lg" variant="primary" href={amazonLink} external>
                Buy on Amazon
              </Button>
              <Button size="md" variant="outline" href="/author">
                About the Author
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
