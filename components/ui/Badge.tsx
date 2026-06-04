import { cn } from '@/utils/cn';
import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: 'primary' | 'secondary' | 'accent' | 'green';
  icon?: LucideIcon;
}

export function Badge({
  color = 'primary',
  icon: Icon,
  className,
  children,
  ...props
}: BadgeProps) {
  const colorStyles = {
    primary: 'bg-primary-100 text-primary-700',
    secondary: 'bg-secondary-100 text-secondary-700',
    accent: 'bg-accent-100 text-accent-700',
    green: 'bg-green-100 text-green-700',
  };

  return (
    <span className={cn('badge inline-flex items-center gap-1.5', colorStyles[color], className)} {...props}>
      {Icon && <Icon size={12} />}
      {children}
    </span>
  );
}
