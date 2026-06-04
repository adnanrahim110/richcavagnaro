'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navLinks } from '@/content/navigation';
import { amazonLink } from '@/content/book';
import { Button, Logo } from '@/components/ui';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/utils/cn';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pointer-events-none">
        <div className={cn(
          "pointer-events-auto mx-auto max-w-7xl h-[72px] flex items-center justify-between px-6 rounded-full transition-all duration-300",
          scrolled ? 'bg-white/95 backdrop-blur-md shadow-md border border-slate-200/50' : 'bg-white/50 backdrop-blur-sm shadow-sm border border-slate-200/30'
        )}>
          <div className="flex-shrink-0">
            <Logo className="text-slate-900" />
          </div>

          <nav className="hidden md:flex flex-1 justify-center items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'font-display text-base font-bold transition-transform duration-200 relative group',
                    isActive ? 'text-slate-900' : 'text-slate-700 hover:text-slate-900 hover:-rotate-2'
                  )}
                >
                  {link.label}
                  {isActive ? (
                    <svg className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[110%] h-3 text-primary-500 z-[-1]" viewBox="0 0 100 10" preserveAspectRatio="none">
                      <path d="M0 5 Q 25 10, 50 5 T 100 5" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
                    </svg>
                  ) : (
                    <svg className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[110%] h-3 text-accent-400 opacity-0 group-hover:opacity-100 transition-opacity z-[-1]" viewBox="0 0 100 10" preserveAspectRatio="none">
                      <path d="M0 5 Q 25 10, 50 5 T 100 5" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
                    </svg>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex flex-shrink-0">
            <Button
              variant="accent"
              size="sm"
              href={amazonLink}
              external
              className={cn(
                'transition-opacity duration-300',
                scrolled ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
              )}
            >
              Buy the Book
            </Button>
          </div>

          <div className="md:hidden flex-shrink-0">
            <Button variant="ghost" size="sm" onClick={() => setDrawerOpen(true)} aria-label="Open menu" className="min-h-[44px] min-w-[44px] p-0">
              <Menu size={24} />
            </Button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ x: 288 }}
              animate={{ x: 0 }}
              exit={{ x: 288 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-72 bg-white z-50 flex flex-col shadow-2xl"
            >
              <div className="flex justify-end p-4">
                <Button variant="ghost" size="sm" onClick={() => setDrawerOpen(false)} aria-label="Close menu" className="min-h-[44px] min-w-[44px] p-0">
                  <X size={24} />
                </Button>
              </div>
              <nav className="flex flex-col py-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setDrawerOpen(false)}
                    className="py-4 px-6 font-display text-lg font-semibold text-slate-800 hover:bg-slate-50 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="border-t border-slate-100 my-4" />
              <div className="px-6 pb-6 mt-auto">
                <Button
                  variant="primary"
                  href={amazonLink}
                  external
                  className="w-full"
                  onClick={() => setDrawerOpen(false)}
                >
                  Buy the Book
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
