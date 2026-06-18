import { cn } from "@/utils/cn";
import { Star } from "lucide-react";
import React from "react";
import { Card } from "./Card";

export interface ReviewCardProps {
  quote: string;
  reviewer: string;
  className?: string;
  truncateLength?: number;
  onReadMore?: () => void;
}

export function ReviewCard({ quote, reviewer, className, truncateLength, onReadMore }: ReviewCardProps) {
  const shouldTruncate = truncateLength && quote.length > truncateLength;
  const displayQuote = shouldTruncate ? quote.slice(0, truncateLength).trim() + "..." : quote;

  return (
    <Card
      variant="elevated"
      className={cn(
        "flex flex-col justify-between relative w-full bg-primary-50 rotate-1 hover:-rotate-1 transition-transform",
        className,
      )}
    >
      <div
        className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-primary-200/80 -rotate-2 z-20"
        style={{ clipPath: "polygon(5% 0, 95% 5%, 100% 95%, 0 100%)" }}
      ></div>

      <span
        className="absolute top-4 left-4 text-6xl font-handwriting text-primary-200 select-none leading-none"
        aria-hidden="true"
      >
        &quot;
      </span>
      <div className="relative z-10 flex flex-col flex-1 gap-4 pt-6">
        <p className="font-handwriting text-slate-800 text-2xl leading-tight flex-1 px-2">
          {displayQuote}
          {shouldTruncate && onReadMore && (
            <button 
              onClick={onReadMore}
              className="inline-block ml-2 text-primary-600 hover:text-primary-700 font-sans text-sm font-bold tracking-wide hover:underline cursor-pointer"
            >
              Read more
            </button>
          )}
        </p>
        <div className="flex flex-col gap-1 mt-auto">
          <p className="font-display font-semibold text-slate-800 text-sm px-2">
            {reviewer}
          </p>
        </div>
      </div>
    </Card>
  );
}
