import { cn } from '@/utils/cn';
import React from 'react';

export interface TitleProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  size?: string;
  font?: 'display' | 'body' | 'handwriting';
  weight?: string;
  color?: string;
}

export function Title({
  as: Component = 'h2',
  size,
  font = 'display',
  weight = 'semibold',
  color = 'text-slate-800',
  className,
  children,
  ...props
}: TitleProps) {
  const fontStyles = {
    display: 'font-display',
    body: 'font-body',
    handwriting: 'font-handwriting',
  };

  return (
    <Component 
      className={cn(
        fontStyles[font],
        weight ? `font-${weight}` : '',
        size ? `text-${size}` : '',
        color,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
