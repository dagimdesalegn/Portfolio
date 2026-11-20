import type { Metadata } from "next";
<<<<<<< HEAD
import { Analytics } from "@vercel/analytics/next";
=======
>>>>>>> a553802073d500abc7ec9cfcbfa784dad1c23580
import { Inter, Noto_Sans_Ethiopic, Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoEthiopic = Noto_Sans_Ethiopic({
  subsets: ["ethiopic"],
  variable: "--font-noto-ethiopic",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dagim Desalegn — Full-Stack Developer",
  description:
    "Portfolio of Dagim Desalegn, a full-stack developer from Ethiopia.",
  keywords: ["Full-Stack Developer", "Next.js", "React", "Ethiopia", "Portfolio"],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  icons: {
    icon: [{ url: "/profile.jpg", type: "image/jpeg" }],
    apple: "/profile.jpg",
  },
  openGraph: {
    title: "Dagim Desalegn — Full-Stack Developer",
    description: "A modern Ethiopian-inspired developer portfolio.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${notoEthiopic.variable}`}>
      <body className="bg-background font-body text-foreground antialiased">
        {children}
<<<<<<< HEAD
        <Analytics />
=======
>>>>>>> a553802073d500abc7ec9cfcbfa784dad1c23580
      </body>
    </html>
  );
}
