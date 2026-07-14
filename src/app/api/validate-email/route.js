// Server-side email validator for the demo form.
// Rejects: bad format, disposable/temporary inboxes, and domains that don't
// actually exist (no MX and no A record). Real providers (gmail, yahoo,
// outlook, company/vendor domains, …) pass automatically because they have MX.
import dns from "node:dns/promises";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Common throwaway / temp-mail providers — reject these outright.
const DISPOSABLE = new Set([
  "mailinator.com", "tempmail.com", "temp-mail.org", "10minutemail.com",
  "guerrillamail.com", "guerrillamail.info", "yopmail.com", "trashmail.com",
  "getnada.com", "sharklasers.com", "dispostable.com", "maildrop.cc",
  "fakeinbox.com", "throwawaymail.com", "mailnesia.com", "mohmal.com",
  "moakt.com", "emailondeck.com", "tempinbox.com", "fakemail.net",
  "tmailor.com", "temp-mail.io", "mailtemp.net", "1secmail.com", "spam4.me",
  "burnermail.io", "mailcatch.com", "inboxbear.com", "byom.de",
]);

function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), ms)),
  ]);
}

export async function POST(req) {
  let email;
  try {
    ({ email } = await req.json());
  } catch {
    return Response.json({ valid: false, reason: "bad_request" }, { status: 400 });
  }

  const value = String(email || "").trim().toLowerCase();
  const match = /^[^\s@]+@([^\s@]+\.[^\s@]+)$/.exec(value);
  if (!match) {
    return Response.json({ valid: false, reason: "format", message: "Please enter a valid email address." });
  }

  const domain = match[1];
  if (DISPOSABLE.has(domain)) {
    return Response.json({
      valid: false,
      reason: "disposable",
      message: "Temporary / disposable emails aren't allowed — please use a real email.",
    });
  }

  // Primary check: does the domain accept mail (MX records)?
  try {
    const mx = await withTimeout(dns.resolveMx(domain), 4000);
    if (Array.isArray(mx) && mx.length > 0) {
      return Response.json({ valid: true });
    }
  } catch {
    /* fall through to A-record fallback */
  }

  // Fallback: some domains receive mail without MX but have an A/AAAA record.
  try {
    const a = await withTimeout(dns.resolve(domain), 3000);
    if (Array.isArray(a) && a.length > 0) {
      return Response.json({ valid: true, reason: "no_mx" });
    }
  } catch {
    /* no records */
  }

  return Response.json({
    valid: false,
    reason: "no_domain",
    message: "This email domain doesn't seem to exist. Please check for a typo.",
  });
}
