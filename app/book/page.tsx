import { BookHero } from '@/components/sections/book/BookHero';
import { BookDetail } from '@/components/sections/book/BookDetail';
import { MetadataBand } from '@/components/sections/book/MetadataBand';
import { SharedReviewsSection } from '@/components/sections/shared/SharedReviewsSection';
import { BookCta } from '@/components/sections/book/BookCta';

export const metadata = {
  title: 'The Book | Rory Ruckus and his Very Silly Signs',
  description: 'Learn all about the hilarious picture book Rory Ruckus and his Very Silly Signs by Rich Cavagnaro.',
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
