import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ShortlistAI - Free ATS Resume Checker & 1-Click Optimizer",
  description: "Check your resume against ATS systems (Workday, Greenhouse, Taleo) and boost your score to 90%+ in 30 seconds.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-blue-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
