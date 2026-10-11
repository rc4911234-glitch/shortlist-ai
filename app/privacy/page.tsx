import React from "react";
import Link from "next/link";
import { ShieldCheck, ArrowLeft, Lock, Eye, Database, Globe } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | ZeroSpamJobs",
  description: "Our privacy policy: Zero candidate tracking, zero resume hoarding, 100% transparent."
};

export default function PrivacyPage() {
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
          <span className="text-xs font-mono text-slate-400">Effective: October 2026</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Privacy-First Architecture</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
            Unlike legacy job boards (Naukri, Indeed, LinkedIn) that sell your resume data to spammy consultancies, ZeroSpamJobs does not harvest or sell your personal data. Here is exactly how we protect your privacy.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Database className="w-5 h-5 text-rose-600" />
              <span>1. Zero Resume Hoarding (Our Core Principle)</span>
            </h2>
            <p>
              When you click <b>"Apply on Company Site"</b>, we redirect you directly to the employer's official Applicant Tracking System (such as Greenhouse, Lever, Ashby, or Workable) or official email. We do not store your resume PDFs on our servers. You apply directly to the company.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Eye className="w-5 h-5 text-blue-600" />
              <span>2. Information We Collect</span>
            </h2>
            <p>We only collect the absolute minimum data required to run our service:</p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-600">
              <li><b>For Job Seekers:</b> If you subscribe to job alerts, we store your email or WhatsApp number solely to deliver notifications when a new 50-cap role drops. We never sell this list to third parties.</li>
              <li><b>For Employers:</b> Company name, job title, company logo URL, salary range, and application URL. If you purchase listing upgrades, payment processing is handled securely by certified third-party payment gateways (Stripe / Razorpay). We never see or store your full credit card numbers.</li>
              <li><b>Local Browser Storage:</b> We use browser localStorage on your device to remember bookmarked jobs and your personal application count. This data remains on your machine.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Lock className="w-5 h-5 text-amber-600" />
              <span>3. How We Use Information</span>
            </h2>
            <p>We use your information exclusively to:</p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-600">
              <li>Display and index verified job postings for candidates worldwide.</li>
              <li>Enforce the 50-applicant cap so that postings lock once their review limit is reached.</li>
              <li>Send requested email or WhatsApp alerts for new listings.</li>
              <li>Prevent fraud, spam, consultancy scraping, and unauthorized automated bot attacks.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Globe className="w-5 h-5 text-indigo-600" />
              <span>4. GDPR, CCPA & Global Compliance</span>
            </h2>
            <p>
              If you reside in the European Union (GDPR) or California (CCPA), you have the right to request deletion of your alert subscription at any time. Simply click the unsubscribe link in any alert email or email us at <b>privacy@zerospamjobs.com</b> and your record will be removed within 24 hours.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900">
              5. Contact Us Regarding Privacy
            </h2>
            <p>
              If you have any questions or data removal requests, contact our founder directly at:
              <br />
              <b>Email:</b> privacy@zerospamjobs.com or contact@zerospamjobs.com
            </p>
          </section>

        </div>
      </main>
    </div>
  );
}
