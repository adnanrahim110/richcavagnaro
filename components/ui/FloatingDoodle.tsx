import React from 'react';
import { cn } from '@/utils/cn';

export type DoodleShape = 'star' | 'burst' | 'squiggle' | 'arrow' | 'circle' | 'blob';
export type DoodleAnimation = 'wiggle' | 'float' | 'swing' | 'pulse';

export interface FloatingDoodleProps {
  shape: DoodleShape;
  color?: string;
  animation?: DoodleAnimation;
  className?: string;
}

export function FloatingDoodle({
  shape,
  color = 'text-slate-200',
  animation = 'float',
  className
}: FloatingDoodleProps) {
  
  const animStyles = {
    wiggle: 'animate-wiggle',
    float: 'animate-float',
    swing: 'animate-swing',
    pulse: 'animate-pulse',
  };

  const shapes = {
    star: (
      <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
        <path d="M50 0L61.2257 34.5492H97.5528L68.1636 55.9017L79.3893 90.4508L50 69.0983L20.6107 90.4508L31.8364 55.9017L2.44717 34.5492H38.7743L50 0Z" />
      </svg>
    ),
    burst: (
      <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <path d="M50 10V30M50 70V90M10 50H30M70 50H90M21.7157 21.7157L35.8579 35.8579M64.1421 64.1421L78.2843 78.2843M21.7157 78.2843L35.8579 64.1421M64.1421 35.8579L78.2843 21.7157" />
      </svg>
    ),
    squiggle: (
      <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" className="w-full h-full">
        <path d="M10 50 C 30 10, 40 90, 60 50 C 80 10, 90 90, 110 50" />
      </svg>
    ),
    arrow: (
      <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <path d="M20 80C20 80 40 40 80 20M80 20L50 20M80 20L80 50" />
      </svg>
    ),
    circle: (
      <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" className="w-full h-full">
        <circle cx="50" cy="50" r="40" />
      </svg>
    ),
    blob: (
      <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
        <path d="M43,-62.4C53.7,-53.4,60.1,-39.7,66.1,-25.1C72.1,-10.5,77.7,5,74.5,18.5C71.3,32,59.3,43.5,45.8,50.8C32.3,58.1,17.3,61.2,1.7,58.8C-13.9,56.4,-29.4,48.5,-40.7,37.5C-52,26.5,-59.1,12.4,-61,-2.3C-62.9,-17,-59.6,-32.3,-50.2,-43.3C-40.8,-54.3,-25.3,-61,-9.5,-63.3C6.3,-65.6,22.7,-63.5,32,-61Z" transform="translate(50 50)" />
      </svg>
    ),
  };

  return (
    <div className={cn('pointer-events-none opacity-40', color, animStyles[animation], className)}>
      {shapes[shape]}
    </div>
  );
}
