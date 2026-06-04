import { cn } from '@/utils/cn';
import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'bordered';
  padding?: 'sm' | 'md' | 'lg';
}

export function Card({
  variant = 'default',
  padding = 'md',
  className,
  children,
  ...props
}: CardProps) {
  const variantStyles = {
    default: 'border-2 border-slate-200 bg-white',
    elevated: 'bg-white border-2 border-slate-800 shadow-[8px_8px_0px_0px_rgba(15,23,42,0.1)] hover:shadow-[12px_12px_0px_0px_rgba(15,23,42,0.15)] transition-shadow duration-300',
    bordered: 'bg-white border-2 border-slate-800 shadow-sm',
  };

  const paddingStyles = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div className={cn('rounded-2xl overflow-hidden', variantStyles[variant], paddingStyles[padding], className)} {...props}>
      {children}
    </div>
  );
}
