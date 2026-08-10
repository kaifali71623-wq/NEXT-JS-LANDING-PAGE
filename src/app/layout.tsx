import type { Metadata } from "next";
import { Audiowide, Manrope } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const audiowide = Audiowide({
  variable: "--font-audiowide",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kaif Ali — Book a Fit Call | B2C Service Business Websites",
  description:
    "Most website problems aren't design problems. They're thinking problems. Book a Fit Call with Kaif Ali — 7 years, 500+ sites reviewed, 200+ projects delivered.",
  keywords: [
    "Kaif Ali",
    "B2C website",
    "WordPress developer",
    "Web developer",
    "Fit Call",
    "Website strategy",
    "UX",
    "Selvinx",
  ],
  authors: [{ name: "Kaif Ali" }],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Kaif Ali — Book a Fit Call",
    description:
      "7 years building B2C service business websites. 500+ reviewed. 200+ delivered. Book your Fit Call.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${audiowide.variable} ${manrope.variable} antialiased bg-background text-foreground`}
      >
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
