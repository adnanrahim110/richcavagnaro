import { cn } from '@/utils/cn';
import React from 'react';

export interface SectionHeadProps {
  eyebrow?: string;
  eyebrowColor?: 'primary' | 'secondary' | 'accent' | 'green';
  heading: string;
  sillyHeading?: string;
  sub?: string;
  align?: 'left' | 'center';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function SectionHead({
  eyebrow,
  eyebrowColor = 'primary',
  heading,
  sillyHeading,
  sub,
  align = 'center',
  size = 'md',
  className,
}: SectionHeadProps) {
  const eyebrowColorStyles = {
    primary: 'bg-primary-300 text-primary-950 font-handwriting text-lg px-4 py-1 -rotate-2',
    secondary: 'bg-secondary-300 text-secondary-950 font-handwriting text-lg px-4 py-1 rotate-2',
    accent: 'bg-accent-300 text-white font-handwriting text-lg px-4 py-1 -rotate-1',
    green: 'bg-green-300 text-green-950 font-handwriting text-lg px-4 py-1 rotate-1',
  };

  const headingSizeStyles = {
    sm: 'text-2xl md:text-3xl',
    md: 'text-3xl md:text-4xl',
    lg: 'text-4xl md:text-5xl',
  };

  return (
    <div className={cn('flex flex-col gap-4', align === 'center' ? 'text-center items-center' : 'text-left items-start', className)}>
      {eyebrow && (
        <span className={cn('badge', eyebrowColorStyles[eyebrowColor])}>
          {eyebrow}
        </span>
      )}
      <div className="relative inline-block mt-2 group cursor-default">
        <h2 className={cn('font-display font-bold relative z-10 transition-all duration-300', headingSizeStyles[size], sillyHeading && 'group-hover:opacity-30 group-hover:line-through decoration-4')}>
          {heading}
        </h2>
        {sillyHeading && (
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-full text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none">
            <span className="font-handwriting text-3xl md:text-5xl text-accent-500 rotate-[-5deg] inline-block">
              {sillyHeading}
            </span>
          </div>
        )}
        <svg className="absolute -bottom-3 left-0 w-full h-5 text-accent-400 opacity-60 -z-10 animate-wiggle" viewBox="0 0 100 10" preserveAspectRatio="none">
          <path d="M0 5 Q 25 10, 50 5 T 100 5" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
        </svg>
      </div>
      {sub && (
        <p className={cn('font-body text-slate-600 max-w-2xl', align === 'center' && 'mx-auto')}>
          {sub}
        </p>
      )}
    </div>
  );
}
