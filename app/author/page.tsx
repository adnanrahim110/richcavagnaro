import { AuthorHero } from '@/components/sections/author/AuthorHero';
import { AuthorDetail } from '@/components/sections/author/AuthorDetail';
import { SharedReviewsSection } from '@/components/sections/shared/SharedReviewsSection';
import { AuthorCta } from '@/components/sections/author/AuthorCta';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About the Author',
  description: 'Learn more about Rich Cavagnaro, the creative mind behind Rory Ruckus. Discover his journey, fun facts, and what inspired his hilarious storytelling.',
  openGraph: {
    title: 'About the Author | Rich Cavagnaro',
    description: 'Learn more about Rich Cavagnaro, the creative mind behind Rory Ruckus. Discover his journey, fun facts, and what inspired his hilarious storytelling.',
    url: 'https://richcavagnaro.com/author',
  },
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
