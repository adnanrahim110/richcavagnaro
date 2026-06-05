import { BookHero } from '@/components/sections/book/BookHero';
import { BookDetail } from '@/components/sections/book/BookDetail';
import { MetadataBand } from '@/components/sections/book/MetadataBand';
import { SharedReviewsSection } from '@/components/sections/shared/SharedReviewsSection';
import { BookCta } from '@/components/sections/book/BookCta';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Book',
  description: 'Explore "Rory Ruckus", a laugh-out-loud children\'s book full of silly mix-ups and big imaginations. Get your copy today on Amazon!',
  openGraph: {
    title: 'Rory Ruckus by Rich Cavagnaro | The Book',
    description: 'Explore "Rory Ruckus", a laugh-out-loud children\'s book full of silly mix-ups and big imaginations.',
    url: 'https://richcavagnaro.com/book',
  },
};

export default function BookPage() {
  return (
    <>
      <BookHero />
      <BookDetail />
      <MetadataBand />
      <SharedReviewsSection 
        eyebrow="What Readers Say" 
        eyebrowColor="secondary" 
        heading="A hit with parents, teachers, and kids!" 
        sub="See why families and educators everywhere are laughing along with Rory's very silly signs." 
        bg="secondary-soft" 
      />
      <BookCta />
    </>
  );
}
