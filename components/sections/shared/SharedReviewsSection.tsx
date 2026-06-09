"use client";

import {
  Container,
  FloatingDoodle,
  ReviewCard,
  Section,
  SectionHead,
} from "@/components/ui";
import { reviews } from "@/content/reviews";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface SharedReviewsSectionProps {
  eyebrow?: string;
  eyebrowColor?: "primary" | "secondary" | "accent" | "green";
  heading: string;
  sub?: string;
  bg?:
    | "white"
    | "cream"
    | "paper"
    | "primary-soft"
    | "secondary-soft"
    | "accent-soft"
    | "green-soft"
    | "none";
  id?: string;
  limit?: number;
}

export function SharedReviewsSection({
  eyebrow,
  eyebrowColor,
  heading,
  sub,
  bg = "white",
  id = "reviews",
  limit,
}: SharedReviewsSectionProps) {
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

  const displayReviews = limit ? reviews.slice(0, limit) : reviews;

  return (
    <Section bg={bg} id={id}>
      <FloatingDoodle
        shape="star"
        color="text-slate-400"
        animation="pulse"
        className="absolute top-20 right-10 w-24 h-24 opacity-20"
      />
      <FloatingDoodle
        shape="squiggle"
        color="text-slate-400"
        animation="wiggle"
        className="absolute bottom-20 left-10 w-32 h-32 opacity-20"
      />
      <Container>
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants}>
            <SectionHead
              eyebrow={eyebrow}
              eyebrowColor={eyebrowColor}
              heading={heading}
              sub={sub}
              align="center"
            />
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-12 cursor-grab active:cursor-grabbing -mx-3.5"
          >
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              pagination={{
                clickable: true,
                totalClass: "swiper-pagination",
                bulletClass:
                  "swiper-pagination-bullet !bg-primary-500 !opacity-50 hover:!opacity-100",
                bulletActiveClass: "!opacity-100 !bg-primary-600",
              }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              breakpoints={{
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="px-3.5! *:items-center"
            >
              {displayReviews.map((review, index) => (
                <SwiperSlide key={index} className="h-auto py-12">
                  <ReviewCard
                    quote={review.quote}
                    reviewer={review.reviewer}
                    stars={review.stars}
                    className="h-full"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
