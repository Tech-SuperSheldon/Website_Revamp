import { NextResponse } from "next/server";

// Cloud Run has no built-in geo header (that's only injected by a GCP Load
// Balancer / Cloud Armor, which isn't in front of this service), so country
// is resolved via a free IP-geolocation lookup. Result is cached in a cookie
// so it only runs once per visitor instead of on every request.
const COUNTRY_TO_PATH = {
  AU: "/au",
  GB: "/uk",
};

const GEO_COOKIE = "ss_geo_redirected";
const LOOKUP_TIMEOUT_MS = 1500;

function getClientIp(request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (!forwardedFor) return null;
  return forwardedFor.split(",")[0].trim();
}

async function lookupCountry(ip) {
  if (!ip) return null;
  try {
    const res = await fetch(`https://ipwho.is/${ip}`, {
      signal: AbortSignal.timeout(LOOKUP_TIMEOUT_MS),
    });
    const data = await res.json();
    if (!data?.success) return null;
    return data.country_code || null;
  } catch {
    return null;
  }
}

export async function middleware(request) {
  // Already resolved for this visitor (or they've already been routed once
  // and may have deliberately navigated back to the global site) — leave
  // them alone.
  if (request.cookies.has(GEO_COOKIE)) {
    return NextResponse.next();
  }

  const country = await lookupCountry(getClientIp(request));
  const targetPath = country ? COUNTRY_TO_PATH[country] : null;

  const response = targetPath
    ? NextResponse.redirect(new URL(targetPath, request.url))
    : NextResponse.next();

  response.cookies.set(GEO_COOKIE, "1", {
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    sameSite: "lax",
  });

  return response;
}

export const config = {
  matcher: "/",
};
