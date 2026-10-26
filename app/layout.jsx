import { Inter } from "next/font/google";

import BottomNavigation from "@/components/navigation/BottomNavigation/BottomNavigation";
import { navItems } from "@/data/navigation";

import "@/styles/global.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
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
      className={inter.variable}
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

        <div id="main-content">
          {children}
        </div>

        <BottomNavigation items={navItems} />
      </body>
    </html>
  );
}