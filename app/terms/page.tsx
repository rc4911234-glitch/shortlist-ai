import React from "react";
import Link from "next/link";
import { FileText, ArrowLeft, CheckCircle2, AlertTriangle, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Terms & Conditions | ZeroSpamJobs",
  description: "Terms of Service and Employer Guidelines for ZeroSpamJobs."
};

export default function TermsPage() {
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
          <span className="text-xs font-mono text-slate-400">Last Updated: October 2026</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold border border-rose-200 mb-3">
            <FileText className="w-3.5 h-3.5" />
            <span>Legal Agreement</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Terms & Conditions
          </h1>
          <p className="text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
            Please read these terms carefully before posting jobs or browsing positions on ZeroSpamJobs. By using our platform, you agree to these guidelines.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>1. Strict Anti-Spam & Zero-Consultancy Policy</span>
            </h2>
            <p>
              ZeroSpamJobs is exclusively designed for <b>direct employers and verified startups</b>. The following types of postings are strictly prohibited and will be removed immediately without refund:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-600">
              <li>Third-party staffing agencies, staffing consultancies, or resume brokers.</li>
              <li>Multi-level marketing (MLM), pyramid schemes, or pay-to-work solicitations.</li>
              <li>Unpaid internships disguised as full-time employment without fair compensation.</li>
              <li>Postings without clear compensation ranges or containing misleading job descriptions.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-blue-600" />
              <span>2. The 50-Applicant Cap Agreement</span>
            </h2>
            <p>
              By posting on ZeroSpamJobs, employers agree to our core pledge: each listing is capped at <b>50 applicants</b>. Once 50 verified applications or redirects have been reached, the listing will automatically show as capped to preserve recruiter sanity and respect candidate dignity. Employers agree to review applicant submissions in good faith within 48 to 72 hours.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <span>3. Job Seeker Rights & Direct Apply</span>
            </h2>
            <p>
              Job seekers use ZeroSpamJobs completely free of charge. We do not charge fees to candidates for viewing listings or submitting applications. Candidates are redirected to the employer's official recruitment portal, and ZeroSpamJobs is not liable for individual hiring decisions or employment contracts entered between candidates and employers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">
              4. Payment & Listing Validity
            </h2>
            <p>
              Paid employer postings remain live for <b>30 consecutive days</b> or until closed by the employer. All transactions are billed in USD or INR as selected during checkout. Promotional launch postings are honored for the full 30-day duration.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">
              5. Limitation of Liability
            </h2>
            <p>
              ZeroSpamJobs acts as an independent curated job board connecting job seekers and employers. We perform automated and editorial sanity checks on postings, but do not guarantee that every applicant will be hired or that every posted role will result in an immediate hire.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">
              6. Governing Law & Contact
            </h2>
            <p>
              For any disputes, legal notices, or policy clarifications, please email:
              <br />
              <b>Legal team:</b> legal@zerospamjobs.com
            </p>
          </section>

        </div>
      </main>
    </div>
  );
}
