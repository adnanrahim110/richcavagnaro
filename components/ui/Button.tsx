import Link from 'next/link';
import { cn } from '@/utils/cn';
import { LucideIcon } from 'lucide-react';
import React from 'react';

type BaseButtonProps = {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = BaseButtonProps & {
  href?: never;
  external?: never;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonAsLink = BaseButtonProps & {
  href: string;
  external?: boolean;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  external,
  icon: Icon,
  iconPosition = 'left',
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-display font-semibold transition-all duration-200 select-none whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 relative overflow-hidden group border-2 border-transparent';
  
  const sizeStyles = {
    sm: 'text-sm px-4 py-2 rounded-md',
    md: 'text-base px-6 py-3 rounded-lg',
    lg: 'text-lg px-8 py-4 rounded-xl',
  };

  const variantStyles = {
    primary: 'bg-primary-500 text-primary-950 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] hover:-translate-y-1 hover:-rotate-1 active:shadow-[0px_0px_0px_0px_rgba(15,23,42,1)] active:translate-y-1',
    secondary: 'bg-secondary-500 text-white border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] hover:-translate-y-1 hover:rotate-1 active:shadow-[0px_0px_0px_0px_rgba(15,23,42,1)] active:translate-y-1',
    accent: 'bg-accent-500 text-white border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] hover:-translate-y-1 hover:-rotate-2 active:shadow-[0px_0px_0px_0px_rgba(15,23,42,1)] active:translate-y-1',
    outline: 'bg-paper-100 border-slate-900 text-slate-800 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] hover:-translate-y-1 active:shadow-[0px_0px_0px_0px_rgba(15,23,42,1)] active:translate-y-1 hover:bg-slate-100',
    ghost: 'text-slate-700 hover:bg-slate-100 hover:-rotate-2 active:scale-95',
  };

  const combinedClassName = cn(
    baseStyles,
    sizeStyles[size],
    variantStyles[variant],
    className
  );

  const content = (
    <>
      {Icon && iconPosition === 'left' && <Icon size={18} />}
      {children}
      {Icon && iconPosition === 'right' && <Icon size={18} />}
    </>
  );

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={combinedClassName} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedClassName} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {content}
      </Link>
    );
  }

  return (
    <button className={combinedClassName} {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  );
}
