"use client";

import { cn } from "@/utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { Card } from "./Card";

export interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  review: { quote: string; reviewer: string } | null;
  onNext: () => void;
  onPrev: () => void;
  hasNext: boolean;
  hasPrev: boolean;
}

export function ReviewModal({
  isOpen,
  onClose,
  review,
  onNext,
  onPrev,
  hasNext,
  hasPrev,
}: ReviewModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && hasNext) onNext();
      if (e.key === "ArrowLeft" && hasPrev) onPrev();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, onNext, onPrev, hasNext, hasPrev]);

  if (!isOpen || !review) return null;

  const content = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6 md:p-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl max-h-full flex flex-col items-center pointer-events-none"
          >
            <Card
              variant="elevated"
              className="relative w-full flex-col pointer-events-auto bg-primary-50 overflow-y-auto overflow-x-hidden p-6 sm:p-10 shadow-2xl flex max-h-[85vh] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-primary-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-primary-300"
            >
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-primary-200/80 -rotate-2 z-20"
                style={{ clipPath: "polygon(5% 0, 95% 5%, 100% 95%, 0 100%)" }}
              ></div>

              <span
                className="absolute top-4 left-4 text-6xl sm:text-8xl font-handwriting text-primary-200 select-none leading-none z-10"
                aria-hidden="true"
              >
                &quot;
              </span>

              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-200/50 hover:bg-slate-200 text-slate-600 transition-colors z-30"
                aria-label="Close"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              <div className="relative z-20 flex flex-col gap-6 flex-1 mt-10 sm:mt-12">
                <p className="font-handwriting text-slate-800 text-xl sm:text-2xl leading-tight px-2">
                  {review.quote}
                </p>
                <div className="mt-auto pt-6 px-2">
                  <p className="font-display font-semibold text-slate-800 text-lg">
                    {review.reviewer}
                  </p>
                </div>
              </div>
            </Card>

            <div className="flex gap-4 mt-6 pointer-events-auto">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onPrev();
                }}
                disabled={!hasPrev}
                className={cn(
                  "p-3 rounded-full bg-white shadow-md transition-colors",
                  hasPrev
                    ? "text-primary-600 hover:bg-primary-50 cursor-pointer"
                    : "text-slate-300 cursor-not-allowed opacity-50",
                )}
                aria-label="Previous review"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNext();
                }}
                disabled={!hasNext}
                className={cn(
                  "p-3 rounded-full bg-white shadow-md transition-colors",
                  hasNext
                    ? "text-primary-600 hover:bg-primary-50 cursor-pointer"
                    : "text-slate-300 cursor-not-allowed opacity-50",
                )}
                aria-label="Next review"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  // Portal to root for better z-index management
  if (typeof document !== "undefined") {
    return createPortal(content, document.body);
  }

  return null;
}
