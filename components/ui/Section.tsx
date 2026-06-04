import { cn } from '@/utils/cn';
import React from 'react';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  bg?: 'white' | 'cream' | 'paper' | 'primary-soft' | 'secondary-soft' | 'accent-soft' | 'green-soft' | 'none';
  size?: 'normal' | 'sm';
}

export function Section({
  as: Component = 'section',
  id,
  bg = 'white',
  size = 'normal',
  className,
  children,
  ...props
}: SectionProps) {
  const bgStyles = {
    white: 'bg-white',
    cream: 'bg-slate-50',
    paper: 'bg-paper-100',
    'primary-soft': 'bg-primary-100',
    'secondary-soft': 'bg-secondary-100',
    'accent-soft': 'bg-accent-100',
    'green-soft': 'bg-green-100',
    none: '',
  };

  const sizeStyles = {
    normal: 'py-16 md:py-24',
    sm: 'py-10 md:py-16',
  };

  return (
    <Component id={id} className={cn('relative overflow-hidden', bgStyles[bg], sizeStyles[size], className)} {...props}>
      {children}
    </Component>
  );
}
