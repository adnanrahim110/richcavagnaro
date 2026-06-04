export interface Review {
  quote: string;
  reviewer: string;
  role: string;
  stars: number;
  source: string;
}

export const reviews: Review[] = [
  {
    quote: "Rory's signs had my kids rolling on the floor laughing! It's the most requested bedtime book in our house.",
    reviewer: "Sarah M.",
    role: "Parent of Two",
    stars: 5,
    source: "Amazon Review"
  },
  {
    quote: "A brilliant and engaging story. My students immediately wanted to create their own silly signs for the classroom after we read it.",
    reviewer: "Mr. Davis",
    role: "3rd Grade Teacher",
    stars: 5,
    source: "Goodreads"
  },
  {
    quote: "One of the best new picture books of the year. The illustrations are vibrant and the humor is perfectly tuned for this age group.",
    reviewer: "Linda P.",
    role: "School Librarian",
    stars: 5,
    source: "Amazon Review"
  },
  {
    quote: "A wonderful tool for teaching expressive writing in a fun, pressure-free way. Rory is a character that every child can relate to.",
    reviewer: "Dr. Elena R.",
    role: "Reading Specialist",
    stars: 5,
    source: "Goodreads"
  },
  {
    quote: "Absolutely delightful! The mix-ups at the school fair scene are comedic gold and a great lesson in problem-solving.",
    reviewer: "Jessica T.",
    role: "Kindergarten Teacher",
    stars: 5,
    source: "Amazon Review"
  },
  {
    quote: "We've read it ten times this week and it's still funny. A fantastic gift for any kid who loves to draw and be a little goofy.",
    reviewer: "Mark H.",
    role: "Parent of a 6-year-old",
    stars: 5,
    source: "Goodreads"
  }
];
