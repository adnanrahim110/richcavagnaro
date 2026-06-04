export interface BookHighlight {
  iconName: string;
  title: string;
  description: string;
}

export const amazonLink = "#";

export const title = "Rory Ruckus and his Very Silly Signs";

export const book = {
  title: title,
  tagline:
    "A laugh-out-loud tale about big imagination, funny mix-ups, and the joy of a good sign!",
  synopsis: `Meet Rory Ruckus, an energetic and immensely creative kid with a very unique hobby: he loves making signs. From warning his parents about "Lava on the Rug" to directing the dog to the "Secret Bone Stash," Rory's colorful creations bring a whole new level of excitement to his home and school. But when his very silly signs start getting mixed up during the school fair, a hilarious chain of events unfolds that will have kids giggling on every page.

Perfect for young readers and parents alike, this vibrant picture book celebrates the beauty of boundless imagination and the unintended humor of a child's perspective. It's a fantastic read-aloud choice that keeps kids engaged while subtly encouraging them to practice their own writing and drawing skills in fun, expressive ways.

Educators and librarians will appreciate the gentle social-emotional themes woven throughout the silliness. As Rory learns to communicate his big ideas and navigate the cheerful chaos he creates, children learn that it's okay to make mistakes and that the best solutions often come from working together with a smile.`,
  amazonLink: amazonLink,
  ageRange: "4–8 years",
  pageCount: 32,
  publishedYear: "2024",
  coverImage: "/imgs/book-front.jpg",
  backCoverImage: "/imgs/book-mockup.png",
  highlights: [
    {
      iconName: "Megaphone",
      title: "Read-Aloud Friendly",
      description:
        "Rhythmic pacing and hilarious dialogue make it a joy to read aloud for storytime.",
    },
    {
      iconName: "Heart",
      title: "Social-Emotional Learning",
      description:
        "Subtly teaches kids about clear communication, empathy, and working together.",
    },
    {
      iconName: "BookOpen",
      title: "Classroom Approved",
      description:
        "A favorite among teachers for inspiring creative writing and classroom activities.",
    },
    {
      iconName: "Smile",
      title: "Laugh-Out-Loud Humor",
      description:
        "Packed with visual gags and funny misunderstandings that kids absolutely love.",
    },
  ] as BookHighlight[],
};
