import React from 'react';
import Link from 'next/link';
import { cn } from '@/utils/cn';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("group flex items-center gap-2.5", className)}>
      <div className="relative flex items-center justify-center bg-primary-400 text-slate-900 w-10 h-10 rounded-xl shadow-sm border-2 border-slate-900 transform transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105">
        <span className="font-handwriting font-bold text-3xl leading-none -mt-1">R</span>
        
        {/* Playful Star */}
        <svg 
          className="absolute -top-3 -right-3 w-6 h-6 text-accent-500 animate-pulse origin-center" 
          viewBox="0 0 100 100" 
          fill="currentColor"
        >
          <path d="M50 0L61.2257 34.5492H97.5528L68.1636 55.9017L79.3893 90.4508L50 69.0983L20.6107 90.4508L31.8364 55.9017L2.44717 34.5492H38.7743L50 0Z" />
        </svg>
      </div>
      
      <div className="flex flex-col leading-none mt-1">
        <span className="font-display font-black text-2xl tracking-tighter">
          Rory <span className="text-secondary-600">Ruckus</span>
        </span>
      </div>
    </Link>
  );
}
