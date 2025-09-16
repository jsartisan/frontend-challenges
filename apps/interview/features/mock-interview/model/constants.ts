export const LEVELS = [
  {
    id: "junior",
    name: "Junior Engineer",
    description: "For students or graduates with under two years experience.",
    color: "bg-bg-easy-subtle",
  },
  {
    id: "mid-level",
    name: "Mid Engineer",
    description: "For engineers with 2-5 years of experience, comfortable with most core concepts.",
    color: "bg-bg-medium-subtle",
  },
  {
    id: "senior",
    name: "Senior Engineer",
    description: "For experienced engineers (5+ years) who can solve complex problems and lead projects.",
    color: "bg-bg-hard-subtle",
  },
] as const;

export type Level = (typeof LEVELS)[number]["id"];
