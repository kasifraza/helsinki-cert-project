import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AuthSessionProvider from "@/app/components/SessionProvider";
import { NotificationProvider } from "@/app/components/NotificationContext";
import Notification from "@/app/components/Notification";
import NavBar from "@/app/components/NavBar";
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
  description: "Full Stack Open Next.js Chapter 4",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-zinc-50 text-zinc-900">
        <AuthSessionProvider>
          <NotificationProvider>
            <NavBar />
            <Notification />
            <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-8">
              {children}
            </main>
          </NotificationProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
