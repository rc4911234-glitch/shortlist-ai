import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ZeroSpamJobs - Curated Remote & Startup Jobs (Capped at 50 Applicants)",
  description: "Stop applying to 2,000-person black holes. Every job on ZeroSpamJobs is capped at 50 applicants with 100% transparent salaries and direct founder links.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-rose-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
