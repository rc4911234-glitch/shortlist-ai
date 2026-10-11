import React from "react";
import Link from "next/link";
import { ArrowLeft, Flame, Users, DollarSign, ShieldCheck, Zap, Heart } from "lucide-react";

export const metadata = {
  title: "About & Manifesto | ZeroSpamJobs",
  description: "Why we built the Anti-Naukri job board: Max 50 applicants, 100% salary transparency, zero ghost jobs."
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 selection:bg-rose-600 selection:text-white">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Job Board</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-rose-600">The Anti-Naukri Manifesto</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 text-rose-700 text-xs font-bold border border-rose-200 mb-4">
            <Flame className="w-4 h-4 fill-rose-600 text-rose-600" />
            <span>Why ZeroSpamJobs Exists</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            The Job Search Market is <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-amber-600">
              Completely Broken.
            </span>
          </h1>
          <p className="text-base text-slate-600 mt-4 max-w-2xl leading-relaxed">
            We are fixing hiring for both sides: giving candidates a 1-in-50 real chance instead of 1-in-2,500, and saving founders from drowning in 3,000 AI-generated spam resumes.
          </p>
        </div>

        {/* The 3 Broken Truths */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <div className="text-rose-600 font-black text-2xl mb-1">2,000+</div>
            <div className="text-xs font-bold text-slate-900 mb-1">Black Hole Applications</div>
            <p className="text-xs text-slate-500 leading-relaxed">
              On LinkedIn & Naukri, each role gets thousands of applicants in 2 hours. 98% are never opened by a human.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <div className="text-amber-600 font-black text-2xl mb-1">0%</div>
            <div className="text-xs font-bold text-slate-900 mb-1">Salary Transparency</div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Companies hide salaries until the 5th interview round, wasting weeks of candidate and engineer time.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <div className="text-blue-600 font-black text-2xl mb-1">40%+</div>
            <div className="text-xs font-bold text-slate-900 mb-1">Ghost Jobs & Brokers</div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Third-party consultancies post fake job ads just to collect phone numbers and sell courses.
            </p>
          </div>
        </div>

        {/* The Solution */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <h2 className="text-xl font-black text-slate-900">
            Our 3 Unbreakable Rules
          </h2>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-700 font-bold flex items-center justify-center shrink-0">
                1
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Strict 50-Applicant Cap</h3>
                <p className="text-slate-600 text-xs mt-0.5">
                  Every role on ZeroSpamJobs locks permanently once 50 people apply. When you apply here, your odds of being interviewed are 1-in-50.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center shrink-0">
                2
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">100% Upfront Salary Disclosed</h3>
                <p className="text-slate-600 text-xs mt-0.5">
                  No "Competitive Salary" bullshit. Every listing has verified salary brackets in USD ($80k-$160k) or INR (₹15L-₹40L) before you apply.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0">
                3
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Direct to Company Careers (No Middleman)</h3>
                <p className="text-slate-600 text-xs mt-0.5">
                  We don't harvest your resumes to sell to recruiters. Clicking Apply takes you directly to the startup's official ATS (Greenhouse, Lever, Ashby).
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500">
              Inspired by Pieter Levels (RemoteOK). Fast, independent, bootstrapped.
            </div>
            <Link
              href="/"
              className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition-all hover:scale-105"
            >
              Explore Verified 50-Cap Roles →
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
