import { Hero } from '@/components/sections/home/Hero';
import { BookIntro } from '@/components/sections/home/BookIntro';
import { AuthorIntro } from '@/components/sections/home/AuthorIntro';
import { CtaBanner } from '@/components/sections/home/CtaBanner';
import { SharedReviewsSection } from '@/components/sections/shared/SharedReviewsSection';
import { ContactFormSection } from '@/components/sections/home/ContactFormSection';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to the official website of Rich Cavagnaro, author of the hilarious children\'s adventure book, Rory Ruckus. Discover the book, meet the author, and join the fun!',
  openGraph: {
    title: 'Rich Cavagnaro | Children\'s Book Author',
    description: 'Welcome to the official website of Rich Cavagnaro, author of the hilarious children\'s adventure book, Rory Ruckus.',
    url: 'https://richcavagnaro.com/',
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <BookIntro />
      <AuthorIntro />
      <CtaBanner />
      <SharedReviewsSection heading="What Readers Are Saying" limit={4} bg="green-soft" />
      <ContactFormSection />
    </>
  );
}
