import React from "react";
import Link from "next/link";
import { ArrowLeft, RefreshCw, CheckCircle2, ShieldCheck, Mail } from "lucide-react";

export const metadata = {
  title: "Refund Policy | ZeroSpamJobs",
  description: "30-Day Money-Back Guarantee and Refund Policy for ZeroSpamJobs."
};

export default function RefundsPage() {
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
          <span className="text-xs font-mono text-slate-400">Policy: 30-Day Guarantee</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Employer Satisfaction Guaranteed</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Refund & Guarantee Policy
          </h1>
          <p className="text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
            We believe in honest, results-driven pricing. Here is how our 100% money-back guarantee works for startups and employers.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>1. The 30-Day Candidate Signal Guarantee</span>
            </h2>
            <p>
              When an employer purchases a featured listing or upgrade on ZeroSpamJobs, we guarantee that you will receive qualified, high-signal applicants directly into your ATS or inbox. If your job receives fewer than 10 relevant candidate applications or clicks within 30 days of posting, we will either:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-600">
              <li><b>Re-pin and re-broadcast your listing for another 30 days for 100% FREE</b> to our entire newsletter and alert network, OR</li>
              <li><b>Issue a full 100% refund</b> back to your original payment method, no questions asked.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-blue-600" />
              <span>2. How to Request a Refund</span>
            </h2>
            <p>
              To request a refund under our guarantee, simply email <b>billing@zerospamjobs.com</b> with:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-600">
              <li>Your Job Title and Company Name</li>
              <li>Receipt or Transaction ID from Stripe / Razorpay</li>
              <li>A brief note describing why the applicant pool did not match your needs</li>
            </ul>
            <p>
              Refunds are processed within 24 to 48 business hours and will reflect on your card or bank statement within 3 to 5 business days.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Mail className="w-5 h-5 text-rose-600" />
              <span>3. Candidate Policy</span>
            </h2>
            <p>
              Job seekers never pay to use ZeroSpamJobs, view job details, or submit applications. Therefore, there are no candidate fees or candidate refunds.
            </p>
          </section>

        </div>
      </main>
    </div>
  );
}
