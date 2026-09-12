import LearnLanding from "@/components/LearnForm/LearnLanding";

export const metadata = {
  title: "Learn Maths Online | AU | Super Sheldon",
  description:
    "Book a free 1:1 live Maths class with a verified Super Sheldon tutor. Rated 4.8/5 on Google, Excellent on Trustpilot, STEM.org accredited.",
};

export default function LearnMathsAUPage() {
  return <LearnLanding subject="Maths" country="au" />;
}
