export interface Review {
  quote: string;
  reviewer: string;
  stars: number;
}

export const reviews: Review[] = [
  {
    quote:
      "My daughter couldn't stop laughing at Rory's silly sign changes. Every time we thought things couldn't get any funnier, another sign appeared! It's become one of our favorite bedtime reads.",
    reviewer: "Linda Henry",
    stars: 5,
  },
  {
    quote:
      "This book is pure imagination on every page. The wordplay is clever, the story is engaging, and it sparked a wonderful conversation with my students about creativity and the power of words.",
    reviewer: "Anne Frank",
    stars: 5,
  },
  {
    quote:
      "Rory is exactly the kind of character kids love, curious, mischievous, and full of big ideas. We laughed from beginning to end and immediately read it a second time.",
    reviewer: "Sebastian Mark",
    stars: 5,
  },
];
