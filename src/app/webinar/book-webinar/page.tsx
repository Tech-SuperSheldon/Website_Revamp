import { Suspense } from "react";
import BhanzuWebinarBooking from "@/components/bhanzu-webinar/BhanzuWebinarBooking";

export const metadata = {
  title: "Book Webinar | SuperSheldon",
  description: "Register for SuperSheldon's free math webinar — How to unlock the magic of geometry.",
};

export default function BookWebinarPage() {
  return (
    <Suspense>
      <BhanzuWebinarBooking />
    </Suspense>
  );
}
