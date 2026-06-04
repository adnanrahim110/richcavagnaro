import { cn } from '@/utils/cn';
import React from 'react';
import { Card } from './Card';
import { Star } from 'lucide-react';

export interface ReviewCardProps {
  quote: string;
  reviewer: string;
  role: string;
  stars: number;
  source?: string;
  className?: string;
}

export function ReviewCard({
  quote,
  reviewer,
  role,
  stars,
  source,
  className,
}: ReviewCardProps) {
  return (
    <Card variant="elevated" className={cn('flex flex-col justify-between relative bg-primary-50 rotate-1 hover:-rotate-1 transition-transform', className)}>
      {/* Tape decoration */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-primary-200/80 -rotate-2 z-20" style={{ clipPath: 'polygon(5% 0, 95% 5%, 100% 95%, 0 100%)' }}></div>
      
      <span className="absolute top-4 left-4 text-6xl font-handwriting text-primary-200 select-none leading-none" aria-hidden="true">
        &quot;
      </span>
      <div className="relative z-10 flex flex-col flex-1 gap-4 pt-6">
        <p className="font-handwriting text-slate-800 text-2xl leading-tight flex-1 px-2">
          {quote}
        </p>
        <div className="flex flex-col gap-1 mt-auto">
          <div className="flex items-center gap-1 mb-2">
            {Array.from({ length: stars }).map((_, i) => (
              <Star key={i} size={16} className="fill-current text-primary-400" />
            ))}
          </div>
          <p className="font-display font-semibold text-slate-800 text-sm">
            {reviewer}
          </p>
          <p className="font-body text-slate-500 text-xs">
            {role}
          </p>
          {source && (
            <p className="font-body text-slate-400 text-xs">
              {source}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}
