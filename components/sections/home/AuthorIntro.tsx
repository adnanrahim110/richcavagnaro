"use client";

import {
  Button,
  Container,
  FloatingDoodle,
  Section,
  SectionHead,
} from "@/components/ui";
import { author } from "@/content/author";
import { home } from "@/content/home";
import { motion, useInView } from "framer-motion";
import { Sparkles } from "lucide-react";
import Image from "next/image";
import React, { useRef } from "react";

export function AuthorIntro() {
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

  return (
    <Section bg="secondary-soft" id="author-intro">
      <FloatingDoodle
        shape="blob"
        color="text-secondary-200"
        animation="float"
        className="absolute -top-10 -right-10 w-64 h-64 opacity-50"
      />
      <FloatingDoodle
        shape="arrow"
        color="text-secondary-300"
        animation="wiggle"
        className="absolute bottom-10 left-10 w-20 h-20 -rotate-12"
      />
      <Container>
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col md:flex-row items-center md:items-start gap-12"
        >
          <motion.div
            variants={itemVariants}
            className="w-full md:w-1/3 flex justify-center"
          >
            <div className="relative w-56 h-64 md:w-64 md:h-72 bg-white p-4 pb-12 shadow-[8px_8px_0px_rgba(15,23,42,1)] border-4 border-slate-900 -rotate-2 hover:rotate-1 transition-transform group">
              <div
                className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-8 bg-secondary-400 opacity-90 rotate-3 z-20"
                style={{ clipPath: "polygon(5% 0, 95% 5%, 100% 95%, 0 100%)" }}
              ></div>
              <div className="relative w-full h-full border-2 border-slate-800 overflow-hidden">
                <Image
                  src={author.photo}
                  alt={author.name}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <div className="absolute bottom-2 left-0 w-full text-center">
                <span className="font-handwriting text-3xl text-slate-800">
                  Hi, I&apos;m Rich!
                </span>
              </div>
            </div>
          </motion.div>

          <div className="w-full md:w-2/3 flex flex-col items-center md:items-start">
            <motion.div variants={itemVariants}>
              <SectionHead
                eyebrow={home.authorSection.eyebrow}
                heading={home.authorSection.heading}
                size="sm"
                align="left"
                className="md:items-start! md:!text-left"
              />
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="font-body text-slate-600 text-base leading-relaxed mt-4 text-center md:text-left"
            >
              {home.authorSection.sub}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col gap-3 mt-6 w-full"
            >
              {author.funFacts.map((fact, index) => (
                <div key={index} className="flex flex-row items-start">
                  <Sparkles
                    size={16}
                    className="text-primary-500 flex-shrink-0 mt-0.5"
                  />
                  <p className="font-body text-sm text-slate-700 ml-2">
                    {fact}
                  </p>
                </div>
              ))}
            </motion.div>

            <motion.div variants={itemVariants} className="mt-6">
              <Button variant="outline" size="md" href="/author">
                Meet Rich
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
