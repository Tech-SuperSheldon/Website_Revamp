import CursorTrail from "@/components/sharedcomps/CursorTrail";
import { icons } from "lucide-react";
import "./globals.css";
import { Quicksand } from "next/font/google";
import Script from "next/script";


import FestiveOverlay from "@/components/sharedcomps/Festiveoverlay";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-quicksand",
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
        className={`${quicksand.variable} font-sans relative overflow-x-hidden bg-[#FFF9F3] min-h-screen`}
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
