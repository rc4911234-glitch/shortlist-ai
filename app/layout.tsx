import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ZeroSpamJobs - The Anti-Naukri Remote Job Board (Max 50 Applicants)",
  description: "Stop applying to 2,000-person black holes. Every job on ZeroSpamJobs is strictly capped at 50 applicants with 100% transparent salaries and direct company application links.",
  keywords: ["remote jobs", "software engineer jobs", "work from home", "high salary tech jobs", "anti-naukri", "remoteok alternative"],
  openGraph: {
    title: "ZeroSpamJobs - Curated Remote Jobs Capped at 50 Applicants",
    description: "Compete with 49 candidates, not 2,500. 100% upfront salaries in USD & INR. Zero consultancies. Zero ghost jobs.",
    url: "https://idea-disuess.vercel.app",
    siteName: "ZeroSpamJobs",
    images: [
      {
        url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "ZeroSpamJobs - High-Signal Remote Tech Board"
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZeroSpamJobs - Curated Remote Jobs Capped at 50 Applicants",
    description: "Every job strictly capped at 50 applicants. 100% salary transparency.",
    images: ["https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=630&fit=crop"]
  }
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
