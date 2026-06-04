import { Hero } from '@/components/sections/home/Hero';
import { BookIntro } from '@/components/sections/home/BookIntro';
import { AuthorIntro } from '@/components/sections/home/AuthorIntro';
import { CtaBanner } from '@/components/sections/home/CtaBanner';
import { SharedReviewsSection } from '@/components/sections/shared/SharedReviewsSection';
import { ContactFormSection } from '@/components/sections/home/ContactFormSection';

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
