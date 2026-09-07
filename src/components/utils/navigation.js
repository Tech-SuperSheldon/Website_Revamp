"use client";

import { openDemoModal } from "@/components/BookDemo/demoModalStore";

// Used to push to /demo; the booking wizard now opens in a popup on the
// current page instead (see DemoModalHost).
export function useOpenDemoBooking() {
  return () => openDemoModal();
}
