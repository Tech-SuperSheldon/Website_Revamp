"use client";

// A minimal, standalone footer for the /learn-* campaign landing pages — these
// pages are otherwise a dead end (see LearnLanding.tsx), so this isn't the full
// site footer, just enough to leave a trust signal: logo + how to reach us.
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail } from "lucide-react";
import type { Locale } from "@/lib/academies";

// Same numbers as the full site footer (NSfooter.tsx / UKHomeFooter.tsx / AU/NSfooter.tsx).
const PHONE: Record<Locale, string> = {
  global: "+91 7974695618 / +61 485860132",
  uk: "+91 7974695618 / +44 7360270223",
  au: "+91 7974695618 / +61 485860132",
};

export default function LearnFooter({
  country = "global",
}: {
  country?: Locale;
}) {
  const homeHref = country === "global" ? "/" : `/${country}`;

  return (
    <footer className="bg-[#03215F]">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-6 text-center sm:flex-row sm:justify-between sm:px-6 sm:py-8 sm:text-left lg:px-8">
        <Link href={homeHref} className="shrink-0">
          <div className="relative h-10 w-28 sm:h-12 sm:w-32">
            <Image
              src="/logo-footer.png"
              alt="SuperSheldon"
              fill
              className="object-contain"
            />
          </div>
        </Link>

        <div className="flex flex-col items-center gap-2 text-[12px] font-medium text-white sm:items-end sm:text-[13px]">
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 shrink-0" strokeWidth={2} />
            <span>{PHONE[country]}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 shrink-0" strokeWidth={2} />
            <span>support@supersheldon.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
