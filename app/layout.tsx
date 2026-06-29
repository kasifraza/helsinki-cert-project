import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blog App - Full Stack Open",
  description: "Full Stack Open Next.js Chapter 2 Exercises",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col font-sans">
        <nav className="border-b border-zinc-200 px-6 py-4">
          <div className="max-w-3xl mx-auto flex gap-4 text-sm font-medium text-zinc-600">
            <Link href="/" className="hover:text-zinc-900 transition-colors">
              home
            </Link>
            <span className="text-zinc-300">|</span>
            <Link
              href="/blogs"
              className="hover:text-zinc-900 transition-colors"
            >
              blogs
            </Link>
            <span className="text-zinc-300">|</span>
            <Link
              href="/blogs/new"
              className="hover:text-zinc-900 transition-colors"
            >
              create new
            </Link>
          </div>
        </nav>
        <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
