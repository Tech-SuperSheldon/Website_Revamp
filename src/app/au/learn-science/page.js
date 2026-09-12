import LearnLanding from "@/components/LearnForm/LearnLanding";

export const metadata = {
  title: "Learn Science Online | AU | Super Sheldon",
  description:
    "Book a free 1:1 live Science class with a verified Super Sheldon tutor. Rated 4.8/5 on Google, Excellent on Trustpilot, STEM.org accredited.",
};

export default function LearnScienceAUPage() {
  return <LearnLanding subject="Science" country="au" />;
}
