"use client";

import { Container, FloatingDoodle, Section } from "@/components/ui";
import { book, title } from "@/content/book";
import { motion, useInView } from "framer-motion";
import * as LucideIcons from "lucide-react";
import Image from "next/image";
import React, { useRef } from "react";

export function BookDetail() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  const paragraphs = book.synopsis.split("\n\n");

  const colors = [
    "text-primary-500 border-primary-500",
    "text-secondary-500 border-secondary-500",
    "text-accent-500 border-accent-500",
    "text-green-500 border-green-500",
  ];

  return (
    <Section bg="primary-soft" id="details">
      <FloatingDoodle
        shape="circle"
        color="text-primary-200"
        animation="float"
        className="absolute -bottom-20 -left-10 w-64 h-64 opacity-60"
      />
      <FloatingDoodle
        shape="star"
        color="text-primary-300"
        animation="pulse"
        className="absolute top-20 right-10 w-20 h-20"
      />
      <Container>
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="flex flex-col md:flex-row items-center md:items-start gap-12 lg:gap-16 mb-5">
            <div className="w-full md:w-[55%] flex flex-col">
              {paragraphs.map((p, i) => (
                <motion.p
                  key={i}
                  variants={itemVariants}
                  className="font-body text-slate-700 text-base leading-relaxed mb-4"
                >
                  {p}
                </motion.p>
              ))}
            </div>

            <motion.div
              variants={itemVariants}
              className="w-full md:w-[45%] flex justify-center"
            >
              <div className="relative w-full">
                <Image
                  src={book.backCoverImage}
                  alt={`${title} back cover`}
                  width={320}
                  height={400}
                  className="w-full h-auto relative z-10 scale-120 -ml-10"
                />
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {book.highlights.map((highlight, index) => {
              // @ts-expect-error dynamic key access
              const Icon = LucideIcons[highlight.iconName] || LucideIcons.Star;
              const colorClass = colors[index % colors.length];
              const [textColor, borderColor] = colorClass.split(" ");

              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`flex flex-col items-center border-t-2 ${borderColor} py-8 px-4`}
                >
                  <Icon size={40} className={textColor} />
                  <h3 className="font-display font-bold text-lg text-slate-800 text-center mt-4">
                    {highlight.title}
                  </h3>
                  <p className="font-body text-slate-600 text-sm text-center mt-2">
                    {highlight.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
