// import "./globals.css";
// import { Quicksand } from "next/font/google";

// const quicksand = Quicksand({
//   subsets: ["latin"],
//   weight: ["300", "400", "500", "600", "700"],
//   variable: "--font-quicksand",
// });

// export const metadata = {
//   title: "Supersheldon",
//   description: "Worldwide Exam Prep Made Easy",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//     <body className={`${quicksand.variable} font-sans relative overflow-x-hidden bg-[#FFF9F3] min-h-screen`}>
//   {/* Global background glows */}
//     <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
//       <div className="fixed -left-[300px] top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-orange-200 opacity-20 blur-3xl pointer-events-none -z-10" />
//       <div className="fixed -right-[300px] top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-orange-200 opacity-20 blur-3xl pointer-events-none -z-10" />
//     </div>
//   {/*  Page content */}
//   <main className="relative z-10">{children}</main>
// </body>
//     </html>
//   );
// }


import { icons } from "lucide-react";
import "./globals.css";
import { Quicksand } from "next/font/google";
import Script from "next/script";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-quicksand",
});




export const metadata = {
  title: "SuperSheldon | Interactive Online Learning for Kids & Students",
  icons:{
    icon : "/favicon.png",
  }
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

        {/* 2️⃣ Google Analytics (GA4) */}
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

        {/* 3️⃣ Meta Pixel (Facebook Pixel) */}
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
              fbq('init', '1446687446534264');
              fbq('track', 'PageView');
            `,
          }}
        />
      </head>

      <body
        className={`${quicksand.variable} font-sans relative overflow-x-hidden bg-[#FFF9F3] min-h-screen`}
      >
        {/* Meta Pixel noscript fallback (recommended placement in <body>) */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1446687446534264&ev=PageView&noscript=1"
          />
        </noscript>

        {/* Global background glows */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="fixed -left-[300px] top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-orange-200 opacity-20 blur-3xl pointer-events-none -z-10" />
          <div className="fixed -right-[300px] top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-orange-200 opacity-20 blur-3xl pointer-events-none -z-10" />
        </div>

        {/* Page content */}
        <main className="relative z-10">{children}</main>
      </body>
    </html>
  );
}
