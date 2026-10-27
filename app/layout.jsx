import {
  Inter,
  Noto_Sans_Arabic,
  Vazirmatn,
} from "next/font/google";

import BottomNavigation from "@/components/navigation/BottomNavigation/BottomNavigation";
import SiteHeader from "@/components/navigation/SiteHeader/SiteHeader";
import { navItems } from "@/data/navigation";

import "@/styles/global.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

/*
  Arabic and Farsi translations only.
  Not preloaded: the browser downloads them
  when text with lang="ar" or lang="fa" is shown.
*/
const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  display: "swap",
  variable: "--font-noto-sans-arabic",
  preload: false,
});

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  display: "swap",
  variable: "--font-vazirmatn",
  preload: false,
});

export const metadata = {
  title: "DanskKlar",
  description:
    "Danish language practice and PD3.5 preparation",
};

export default function RootLayout({
  children,
}) {
  return (
    <html
      lang="da"
      className={`${inter.variable} ${notoSansArabic.variable} ${vazirmatn.variable}`}
      data-theme="warm"
      data-appearance="light"
      suppressHydrationWarning
    >
      <body>
        <a
          href="#main-content"
          className="u-skip-link"
        >
          Skip to content
        </a>

        <SiteHeader />

        <div id="main-content">
          {children}
        </div>

        <BottomNavigation items={navItems} />
      </body>
    </html>
  );
}