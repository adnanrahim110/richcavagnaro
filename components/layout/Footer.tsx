import { Button, Container, FloatingDoodle, Logo } from "@/components/ui";
import { author } from "@/content/author";
import { amazonLink } from "@/content/book";
import { navLinks, socialLinks } from "@/content/navigation";
import Link from "next/link";
import React from "react";

const FacebookIcon = ({ size = 24 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = ({ size = 24 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const TwitterIcon = ({ size = 24 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
  </svg>
);

const iconMap: Record<string, React.ElementType> = {
  Facebook: FacebookIcon,
  Instagram: InstagramIcon,
  Twitter: TwitterIcon,
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 pt-20 pb-8 relative overflow-hidden border-t-16 border-slate-950">
      <FloatingDoodle
        shape="star"
        color="text-slate-800"
        animation="pulse"
        className="absolute top-20 left-10 w-32 h-32 opacity-50"
      />
      <FloatingDoodle
        shape="squiggle"
        color="text-slate-800"
        animation="wiggle"
        className="absolute bottom-10 left-1/4 w-24 h-24 opacity-60"
      />

      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12 relative z-10">
          <div className="mb-6 md:mb-0">
            <Logo className="mb-4 text-white" />
            <p className="font-body text-base text-slate-400 mt-3 max-w-xs font-medium">
              {author.tagline}
            </p>
            <div className="flex flex-row items-center gap-4 mt-8">
              {socialLinks.map((social) => {
                const IconComponent = iconMap[social.iconName];
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-accent-500 hover:rotate-12 hover:scale-110 transition-all shadow-sm border-2 border-transparent hover:border-white"
                  >
                    {IconComponent && <IconComponent size={18} />}
                  </a>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col items-start">
            <h3 className="font-display text-slate-500 text-sm font-bold uppercase tracking-widest mb-6 border-b-2 border-slate-800 pb-2">
              Quick Links
            </h3>
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-display font-bold text-lg text-slate-300 hover:text-white transition-colors relative group w-fit"
                >
                  {link.label}
                  <svg
                    className="absolute -bottom-1 left-0 w-full h-2 text-accent-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    viewBox="0 0 100 10"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0 5 Q 25 10, 50 5 T 100 5"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-start relative">
            <h3 className="font-display text-slate-500 text-sm font-bold uppercase tracking-widest mb-6 border-b-2 border-slate-800 pb-2">
              Get the Book
            </h3>
            <p className="font-body text-base text-slate-300 font-medium mb-6">
              Bring Rory&apos;s silly signs home and start giggling together!
            </p>
            <Button variant="primary" size="md" href={amazonLink} external>
              Buy on Amazon
            </Button>
          </div>
        </div>

        <div className="absolute top-6 right-8 lg:right-16 origin-top animate-swing z-10 hidden md:block">
          <div className="relative bg-primary-300 border-4 border-slate-900 p-3 shadow-[6px_6px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center rotate-3 transform hover:rotate-6 transition-transform cursor-pointer group w-48">
            <div className="absolute -top-8 left-6 w-1 h-8 bg-slate-500"></div>
            <div className="absolute -top-8 right-6 w-1 h-8 bg-slate-500"></div>
            <div
              className="absolute -top-10 left-4 w-6 h-5 bg-accent-500 rotate-12"
              style={{ clipPath: "polygon(5% 0, 95% 5%, 100% 95%, 0 100%)" }}
            ></div>
            <div
              className="absolute -top-10 right-4 w-6 h-5 bg-accent-500 -rotate-12"
              style={{ clipPath: "polygon(0 5%, 100% 0, 95% 100%, 5% 95%)" }}
            ></div>

            <span className="font-display font-black text-slate-900 text-[9px] uppercase tracking-widest block text-center line-through decoration-2 decoration-accent-500 opacity-80">
              Riverside Learning
            </span>
            <span className="font-handwriting font-bold text-accent-500 text-xl block text-center -rotate-6 drop-shadow-sm z-10 group-hover:scale-110 transition-transform my-0.5 leading-tight">
              Riverslide Recess!
            </span>
            <span className="font-display font-black text-slate-900 text-[9px] uppercase tracking-widest block text-center opacity-80 mt-1">
              Elementary
            </span>
          </div>
        </div>

        <div className="border-t-2 border-slate-800 pt-8 mt-12 flex justify-center relative z-10">
          <p className="font-display font-bold text-sm text-slate-500">
            &copy; {currentYear} {author.name}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
