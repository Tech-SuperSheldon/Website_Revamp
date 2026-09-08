"use client";

// Global store behind the "Book a Demo" popup.
//
// Every "Try a free Class" / "Book a Demo" CTA on the site used to navigate to
// /demo (or /au/demo). They now open the same wizard in a modal instead, so
// the visitor never leaves the page they were reading.
//
// This is a module-level singleton rather than a React context on purpose:
// the CTAs live in ~40 unrelated component trees (headers, heroes, FAQs,
// pricing tables, the floating pill, the chatbot…), several of which render
// outside any provider we'd realistically add. A singleton + a single
// <DemoModalHost /> in the root layout means any component can just call
// openDemoModal() with no wiring.

export type DemoMarket = "uk" | "au";

export type DemoModalState = {
  open: boolean;
};

const CLOSED: DemoModalState = { open: false };

let state: DemoModalState = CLOSED;
const listeners = new Set<(s: DemoModalState) => void>();

function emit() {
  listeners.forEach((l) => l(state));
}

export function subscribeDemoModal(listener: (s: DemoModalState) => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getDemoModalState(): DemoModalState {
  return state;
}

/** Open the booking wizard. There is one wizard for the whole site — see
 *  DemoModalHost — so there is nothing per-market to pass in. */
export function openDemoModal() {
  state = { open: true };
  emit();
}

export function closeDemoModal() {
  if (!state.open) return;
  state = CLOSED;
  emit();
}

/**
 * Click handler for CTAs that still carry an `href="/demo"` fallback (so they
 * stay real links for crawlers, middle-click and no-JS). Swallows the
 * navigation and opens the popup instead, but lets modifier-clicks through so
 * "open in new tab" keeps working for anyone who deliberately asks for it.
 */
export function openDemoOnClick(event: React.MouseEvent<HTMLElement>) {
  if (event.defaultPrevented) return;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  if (typeof event.button === "number" && event.button !== 0) return;
  event.preventDefault();
  openDemoModal();
}

