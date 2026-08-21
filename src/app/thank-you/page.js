import ThankYou from "@/components/ThankYou";

export const metadata = {
  title: "Thank You | Your Free Demo is Booked — SuperSheldon",
  description:
    "Your free SuperSheldon demo session is confirmed. Here's what happens next.",
  // A confirmation page has no standalone value in search results, and indexing
  // it would let people land here without ever filling the form.
  robots: { index: false, follow: true },
};

export default function ThankYouPage() {
  return <ThankYou />;
}
