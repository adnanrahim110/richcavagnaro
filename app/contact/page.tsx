import { ContactFormSection } from "@/components/sections/contact/ContactFormSection";
import { ContactHero } from "@/components/sections/contact/ContactHero";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with children's book author Rich Cavagnaro. Reach out for school visits, book readings, or just to say hello!",
  openGraph: {
    title: "Contact Rich Cavagnaro | Send a Giggle",
    description:
      "Get in touch with children's book author Rich Cavagnaro. Reach out for school visits, book readings, or just to say hello!",
    url: "https://richcavagnarobooks.com/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactFormSection />
    </>
  );
}
