import React from "react";
import { Check, Sparkles, Zap, Shield, HelpCircle } from "lucide-react";

interface PricingSectionProps {
  onSelectPlan: (planName: string, price: string) => void;
  pricingRef: React.RefObject<HTMLDivElement>;
}

export default function PricingSection({ onSelectPlan, pricingRef }: PricingSectionProps) {
  return (
    <section ref={pricingRef} className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 mb-3">
            <Zap className="w-3.5 h-3.5" />
            <span>Fair, Transparent Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Cheaper than 1 Coffee. <br />
            Worth a ₹50,000+ Salary Hike.
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3">
            Jobscan charges ₹4,000/month. We believe every ambitious candidate deserves an interview chance at a fair price.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto">
          
          {/* Plan 1: Free */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="text-base font-bold text-slate-900">Free Diagnostic</div>
              <p className="text-xs text-slate-500 mt-1">Perfect to test your current score</p>
              
              <div className="flex items-baseline gap-1 mt-6">
                <span className="text-4xl font-extrabold text-slate-900">₹0</span>
                <span className="text-xs text-slate-500">/ free forever</span>
              </div>

              <ul className="mt-8 space-y-3.5 text-xs text-slate-600">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>1 Free ATS Compatibility Scan</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Overall ATS Score (0-100)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Top 3 Missing Keywords</span>
                </li>
                <li className="flex items-center gap-2.5 text-slate-400">
                  <span className="w-4 h-4 text-center">—</span>
                  <span>AI STAR Bullet Rewrites (Locked)</span>
                </li>
                <li className="flex items-center gap-2.5 text-slate-400">
                  <span className="w-4 h-4 text-center">—</span>
                  <span>Unlimited Job Description Scans</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => window.scrollTo({ top: 400, behavior: "smooth" })}
              className="mt-8 w-full py-3 rounded-xl border border-slate-300 font-semibold text-xs text-slate-700 hover:bg-slate-50 transition-all"
            >
              Current Free Plan
            </button>
          </div>

          {/* Plan 2: 24-Hour Sprint Pass (Most Popular) */}
          <div className="bg-white rounded-3xl p-8 border-2 border-blue-600 shadow-xl shadow-blue-500/10 flex flex-col justify-between relative">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[11px] font-bold uppercase tracking-wider shadow-md">
              Most Popular • Instant Pass
            </div>

            <div>
              <div className="text-base font-bold text-slate-900">24-Hour Job Sprint</div>
              <p className="text-xs text-slate-500 mt-1">Applying to jobs today? Unlimited power.</p>
              
              <div className="flex items-baseline gap-1 mt-6">
                <span className="text-4xl font-extrabold text-blue-600">₹99</span>
                <span className="text-xs text-slate-500 font-medium">($4.99 USD) / 24 hours</span>
              </div>

              <ul className="mt-8 space-y-3.5 text-xs text-slate-700 font-medium">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Unlimited ATS Resumes Scans (24h)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>All Missing Keywords & Skill Gap Map</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>AI STAR Bullet Rewriter (Google Formula)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Workday & Greenhouse Pass Guarantee</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Download Clean ATS-Ready Text</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onSelectPlan("24-Hour Job Sprint", "₹99")}
              className="mt-8 w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Get 24h Pass for ₹99
            </button>
          </div>

          {/* Plan 3: Pro Monthly */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="text-base font-bold text-slate-900">Pro Job Hunter</div>
              <p className="text-xs text-slate-500 mt-1">Active job search over the next month</p>
              
              <div className="flex items-baseline gap-1 mt-6">
                <span className="text-4xl font-extrabold text-slate-900">₹299</span>
                <span className="text-xs text-slate-500">($12.99 USD) / month</span>
              </div>

              <ul className="mt-8 space-y-3.5 text-xs text-slate-600">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Unlimited Scans & Matches (30 Days)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Automated AI Cover Letter Generator</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Priority ATS-Approved Resume Templates</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>LinkedIn Profile Headline & About Optimizer</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Cancel Anytime in 1-Click</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onSelectPlan("Pro Job Hunter Monthly", "₹299")}
              className="mt-8 w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 font-semibold text-xs text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Get Monthly for ₹299
            </button>
          </div>
        </div>

        {/* Guarantee Banner */}
        <div className="mt-12 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
          <Shield className="w-4 h-4 text-emerald-600" />
          <span>100% Satisfaction Guarantee. Safe & Secure UPI / Card Checkout.</span>
        </div>
      </div>
    </section>
  );
}
