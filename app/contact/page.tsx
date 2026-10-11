import React from "react";
import Link from "next/link";
import { ArrowLeft, Mail, MessageSquare, Twitter, Clock, ShieldCheck, Zap } from "lucide-react";

export const metadata = {
  title: "Contact & Support | ZeroSpamJobs",
  description: "Get in touch with the ZeroSpamJobs team. Founder response within 12 hours."
};

export default function ContactPage() {
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
          <span className="text-xs font-mono text-emerald-600 font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span>Support Online</span>
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200 mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Direct Founder Support</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Contact ZeroSpamJobs
          </h1>
          <p className="text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
            Have a question about a job listing, need assistance with your startup posting, or want to report an expired role? We respond within 12 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          
          {/* Card 1: Employer Support */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Employer & Billing Help</h3>
              <p className="text-xs text-slate-500 mt-1">
                For questions regarding invoices, featured upgrades, custom company branding, or hiring packages.
              </p>
            </div>
            <a
              href="mailto:billing@zerospamjobs.com"
              className="inline-flex items-center gap-2 text-xs font-bold text-rose-600 hover:text-rose-700 transition-colors"
            >
              <span>billing@zerospamjobs.com</span>
              <span>→</span>
            </a>
          </div>

          {/* Card 2: General / Candidate Inquiries */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">General & Editorial Inquiries</h3>
              <p className="text-xs text-slate-500 mt-1">
                Feedback, bug reports, feature requests, or reporting an expired link on our job board.
              </p>
            </div>
            <a
              href="mailto:contact@zerospamjobs.com"
              className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
            >
              <span>contact@zerospamjobs.com</span>
              <span>→</span>
            </a>
          </div>
        </div>

        {/* Support Commitments */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-amber-500 shrink-0" />
            <div>
              <span className="font-bold text-slate-900 block">Typical Response Time</span>
              <span className="text-slate-500">Under 12 hours, Monday through Sunday.</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
            <div>
              <span className="font-bold text-slate-900 block">Human Only</span>
              <span className="text-slate-500">Every message is answered by a human founder.</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
