import { ContactHero } from '@/components/sections/contact/ContactHero';
import { ContactFormSection } from '@/components/sections/contact/ContactFormSection';

export const metadata = {
  title: 'Contact | Rory Ruckus and his Very Silly Signs',
  description: 'Get in touch with Rich Cavagnaro, author of Rory Ruckus and his Very Silly Signs.',
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactFormSection />
    </>
  );
}
