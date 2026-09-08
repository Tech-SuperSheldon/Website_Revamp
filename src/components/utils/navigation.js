"use client";

import { openDemoModal } from "@/components/BookDemo/demoModalStore";

// Used to push to /demo; the booking wizard now opens in a popup on the
// current page instead (see DemoModalHost).
//
// Takes the same optional prefill as openDemoModal, so a CTA that already
// collected a phone number can hand it straight to the wizard. Most callers
// pass this as `onClick={openDemoBooking}` — openDemoModal ignores the click
// event those hand it.
export function useOpenDemoBooking() {
  return (prefill) => openDemoModal(prefill);
}
