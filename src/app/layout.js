import "./globals.css";
import { Baloo_2, Manrope } from "next/font/google";
import Script from "next/script";


import FestiveOverlay from "@/components/sharedcomps/Festiveoverlay";

// Headings site-wide use Baloo 2 (see globals.css h1-h6 rule); body text uses
// Manrope via the Tailwind `sans` family below.
const baloo2 = Baloo_2({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-baloo",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata = {
  title: "SuperSheldon | Interactive Online Learning for Kids & Students",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect is expensive (DNS+TLS held open) and should be used
            sparingly — only for the origin that loads soonest/matters most.
            GTM fires first and is what most users are waiting on; the rest
            get the cheaper DNS-only hint. */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.clarity.ms" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
        <link rel="dns-prefetch" href="https://www.facebook.com" />

        {/* 1️⃣ Microsoft Clarity */}
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "sitl07ekvp");
            `,
          }}
        />

        {/* 2️⃣ Google Tag Manager (Head) */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-W52HW3B7');`}
        </Script>

        {/* 2️⃣b Second Google Tag Manager container. Lives here in the root
            layout — which wraps every route — so it loads once on every page
            of /, /au, /uk and the campaign pages alike. Deliberately NOT
            placed in the header/footer components: those are duplicated per
            region (NSheader, UKHomeHeader, AU/NSheader, HeroHeaderNav, …) and
            several pages render more than one, which would fire the container
            twice and double-count every pageview. */}
        <Script id="gtm-script-2" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-MXGQC6QG');`}
        </Script>

        {/* 3️⃣ Google Analytics (GA4) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-T3X5175CZ7"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-T3X5175CZ7');
            `,
          }}
        />

        {/* 4️⃣ Meta Pixel (Facebook Pixel - UPDATED SINGLE VERSION) */}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '2001958333960772');
              fbq('track', 'PageView');
            `,
          }}
        />
      </head>

      <body
        className={`${baloo2.variable} ${manrope.variable} font-sans relative overflow-x-hidden bg-[#FFF9F3] min-h-screen`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-W52HW3B7"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        {/* Google Tag Manager (noscript) — second container */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MXGQC6QG"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        {/* Meta Pixel noscript fallback (UPDATED) */}
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            alt=""
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=2001958333960772&ev=PageView&noscript=1"
          />
        </noscript>

        {/* Global background glows */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="fixed -left-[300px] top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-orange-200 opacity-20 blur-3xl pointer-events-none -z-10" />
          <div className="fixed -right-[300px] top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-orange-200 opacity-20 blur-3xl pointer-events-none -z-10" />
        </div>

        {/* Page content */}
        <main className="relative z-10">
          {/* <CursorTrail /> */}
          {/* <FestiveOverlay /> */}
          {children}</main>
      </body>
    </html>
  );
}
