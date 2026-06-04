import { AuthorHero } from '@/components/sections/author/AuthorHero';
import { AuthorDetail } from '@/components/sections/author/AuthorDetail';
import { SharedReviewsSection } from '@/components/sections/shared/SharedReviewsSection';
import { AuthorCta } from '@/components/sections/author/AuthorCta';

export const metadata = {
  title: 'About the Author | Rich Cavagnaro',
  description: 'Learn more about Rich Cavagnaro, the author of Rory Ruckus and his Very Silly Signs.',
};

export default function AuthorPage() {
  return (
    <>
      <AuthorHero />
      <AuthorDetail />
      <SharedReviewsSection 
        eyebrow="From the Community" 
        eyebrowColor="green" 
        heading="Readers everywhere are sharing the joy!" 
        sub="The feedback from families and educators has been incredible." 
        bg="accent-soft" 
        id="reader-reviews" 
      />
      <AuthorCta />
    </>
  );
}
