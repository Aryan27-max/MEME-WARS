import type { Metadata } from "next";
import { Russo_One, Bangers, Inter } from "next/font/google";
import "./globals.css";

const russo = Russo_One({
  weight: "400",
  variable: "--font-russo",
  subsets: ["latin"],
});

const bangers = Bangers({
  weight: "400",
  variable: "--font-bangers",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gen'Z – Banter Box | Roast, Meme, Rule The Match",
  description: "The ultimate retro-Memphis banter and meme battle arena for Gen-Z sports fans.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${russo.variable} ${bangers.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#fff9ea] text-black font-inter selection:bg-secondary selection:text-white">
        {children}
      </body>
    </html>
  );
}
