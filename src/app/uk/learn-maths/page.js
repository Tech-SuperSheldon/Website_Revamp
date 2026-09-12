import LearnLanding from "@/components/LearnForm/LearnLanding";

export const metadata = {
  title: "Learn Maths Online | UK | Super Sheldon",
  description:
    "Book a free 1:1 live Maths class with a verified Super Sheldon tutor. Rated 4.8/5 on Google, Excellent on Trustpilot, STEM.org accredited.",
};

export default function LearnMathsUKPage() {
  return <LearnLanding subject="Maths" country="uk" />;
}
