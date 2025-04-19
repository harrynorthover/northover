import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter, Lato, Merriweather } from "next/font/google";
import { draftMode } from "next/headers";

import "./globals.css";

import { getGlobalContent } from "@/lib/api";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "700", "900"],
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700", "900"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled } = await draftMode();
  const { general } = await getGlobalContent(isEnabled);
  const { backgroundsCollection } = general;

  // Randomly select a background image
  const backgroundImage =
    backgroundsCollection.items[
      Math.floor(Math.random() * backgroundsCollection.items.length)
    ]?.url;

  return (
    <html
      lang="en"
      className={`antialiased ${inter.variable} ${lato.variable} ${merriweather.variable}`}
    >
      <body
        suppressHydrationWarning={true}
        style={{
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          width: "100vw",
          height: "100vh",
        }}
      >
        <main className="container mx-auto min-h-screen p-6 lg:pt-20 md:p-8 lg:p-12">
          {children}

          <footer>
            <p className="text-left text-sm pt-20 text-gray-500">
              &copy; {new Date().getFullYear()} Harry Northover
            </p>
          </footer>
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  );
}
