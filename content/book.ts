export interface BookHighlight {
  iconName: string;
  title: string;
  description: string;
}

export const amazonLink = "https://www.amazon.com/dp/1636446957";

export const title = "Rory Ruckus and his Very Silly Signs";

export const book = {
  title: title,
  tagline: "One Bored Kid. One Marker. One Very Silly Idea.",
  synopsis: `Meet Rory Ruckus, a kid with a BIG imagination and an even bigger talent for turning ordinary things into extraordinary fun.

      One quiet afternoon at school, Rory notices something strange: signs are everywhere. They're on the walls, above the doors, and around every corner. But Rory has a question...

      <strong>What if they said something a little more interesting?</strong>

      Before long, NO RUNNING becomes NO RUNNING SLOWLY, the LIBRARY turns into the LIE-BRARY, and the entire school is caught in a whirlwind of laughter, confusion, and wonderfully silly chaos.

      As Rory's mischievous sign swaps spread through the hallways, he discovers that words are powerful, creativity is a gift, and even the wildest ideas can lead to something meaningful.

      Perfect for young readers, families, classrooms, and storytime, <strong>Rory Ruckus and His Very Silly Signs</strong> is a laugh-out-loud adventure packed with imagination, wordplay, and heart.`,
  amazonLink: amazonLink,
  ageRange: "5+ years",
  pageCount: 40,
  publishedYear: "2026",
  coverImage: "/imgs/book-front.jpg",
  backCoverImage: "/imgs/book-mockup.png",
  highlights: [
    {
      iconName: "Megaphone",
      title: "Built for Read-Aloud Fun",
      description:
        "Playful pacing, funny sign changes, and expressive scenes make Rory’s story easy to enjoy at home, in classrooms, and during storytime.",
    },
    {
      iconName: "Heart",
      title: "Creativity That Learns Its Lesson",
      description:
        "Rory’s imagination begins with mischief, but the story gently shows how bright ideas can become helpful when guided with care.",
    },
    {
      iconName: "BookOpen",
      title: "Great for Classroom Conversations",
      description:
        "A strong fit for discussions about words, rules, responsibility, creative thinking, and how small choices can make a big difference.",
    },
    {
      iconName: "Smile",
      title: "Silly Signs Kids Will Remember",
      description:
        "Packed with mixed-up signs, school-day confusion, and visual surprises that give young readers plenty to giggle about.",
    },
  ] as BookHighlight[],
};
