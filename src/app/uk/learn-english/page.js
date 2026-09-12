import LearnLanding from "@/components/LearnForm/LearnLanding";

export const metadata = {
  title: "Learn English Online | UK | Super Sheldon",
  description:
    "Book a free 1:1 live English class with a verified Super Sheldon tutor. Rated 4.8/5 on Google, Excellent on Trustpilot, STEM.org accredited.",
};

export default function LearnEnglishUKPage() {
  return <LearnLanding subject="English" country="uk" />;
}
