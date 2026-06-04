'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { author } from '@/content/author';
import { book, title } from '@/content/book';
import { Section, Container, Card, Button, FloatingDoodle } from '@/components/ui';
import { Sparkles, Star } from 'lucide-react';

export function AuthorDetail() {
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

  const paragraphs = author.bio.split('\n\n');

  return (
    <Section bg="secondary-soft" id="author-details">
      <FloatingDoodle shape="squiggle" color="text-secondary-200" animation="wiggle" className="absolute top-10 left-10 w-32 h-32 opacity-70" />
      <FloatingDoodle shape="blob" color="text-secondary-200" animation="float" className="absolute bottom-10 right-0 w-56 h-56 opacity-40" />
      <Container>
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Two-Column Detail Layout */}
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            {/* Left Column (Bio) */}
            <div className="w-full lg:w-[60%] flex flex-col">
              {paragraphs.map((p, i) => (
                <motion.p key={i} variants={itemVariants} className="font-body text-slate-700 text-base leading-relaxed mb-5">
                  {p}
                </motion.p>
              ))}
            </div>
            
            {/* Right Column (Fun Facts) */}
            <motion.div variants={itemVariants} className="w-full lg:w-[40%]">
              <Card variant="elevated" padding="lg">
                <h3 className="flex items-center font-display font-semibold text-slate-800 text-xl">
                  <Sparkles size={20} className="text-primary-500 mr-2" />
                  A Few Things About Rich
                </h3>
                <div className="flex flex-col gap-4 mt-4">
                  {author.funFacts.map((fact, index) => (
                    <div key={index} className="flex flex-row items-start">
                      <Star size={16} className="fill-current text-primary-400 flex-shrink-0 mt-0.5" />
                      <p className="font-body text-slate-700 text-sm ml-3">
                        {fact}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Book Cross-link Strip */}
          <motion.div variants={itemVariants} className="mt-16 w-full">
            <div className="flex flex-col sm:flex-row items-center gap-8 bg-primary-50 rounded-2xl px-8 py-6">
              <div className="flex-shrink-0">
                <Image 
                  src={book.coverImage} 
                  alt={title} 
                  width={120} 
                  height={150} 
                  className="rounded-xl shadow-md"
                />
              </div>
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                <span className="font-body text-xs text-slate-500 uppercase tracking-wide">
                  Also by Rich
                </span>
                <h4 className="font-display font-semibold text-slate-800 text-xl mt-1">
                  {title}
                </h4>
                <p className="font-body text-slate-600 text-sm mt-1">
                  {book.tagline}
                </p>
                <div className="mt-3">
                  <Button variant="outline" size="sm" href="/book">
                    See the Book
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
