export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Book', href: '/book' },
  { label: 'Author', href: '/author' },
  { label: 'Contact', href: '/contact' },
];

export const footerLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Book', href: '/book' },
  { label: 'Author', href: '/author' },
  { label: 'Contact', href: '/contact' },
];

export interface SocialLink {
  label: string;
  href: string;
  iconName: string;
}

export const socialLinks: SocialLink[] = [
  { label: 'Facebook', href: '#', iconName: 'Facebook' },
  { label: 'Instagram', href: '#', iconName: 'Instagram' },
  { label: 'Twitter/X', href: '#', iconName: 'Twitter' },
];
