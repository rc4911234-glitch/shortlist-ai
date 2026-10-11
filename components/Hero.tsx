import React from "react";
import { ArrowRight, CheckCircle2, TrendingUp, Users, Zap } from "lucide-react";

interface HeroProps {
  onScrollToScanner: () => void;
}

export default function Hero({ onScrollToScanner }: HeroProps) {
  return (
    <section className="relative pt-12 pb-16 overflow-hidden">
      {/* Background glow decorations */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-400/10 blur-[100px] pointer-events-none rounded-full" />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Urgent Announcement Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs sm:text-sm font-medium mb-6">
          <Zap className="w-4 h-4 text-blue-600 animate-pulse" />
          <span>75% of resumes are auto-rejected by ATS bots before HR even opens them.</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-6">
          Stop Getting Ghosted. <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500">
            Beat the ATS & Land Interviews.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 leading-relaxed mb-8">
          Match your resume against any Job Description in seconds. Discover missing keywords, fix formatting red flags, and optimize your bullet points with proven STAR metrics.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <button
            onClick={onScrollToScanner}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Scan My Resume Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Instant Free Scan • No Credit Card Required</span>
          </div>
        </div>

        {/* Social Proof & Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6 border-t border-slate-200">
          <div className="p-3 bg-white/70 backdrop-blur rounded-xl border border-slate-200/80 shadow-sm text-left">
            <div className="text-2xl font-bold text-slate-900">3.5x</div>
            <div className="text-xs text-slate-500 mt-0.5">Higher Interview Rate</div>
          </div>
          <div className="p-3 bg-white/70 backdrop-blur rounded-xl border border-slate-200/80 shadow-sm text-left">
            <div className="text-2xl font-bold text-slate-900">50+</div>
            <div className="text-xs text-slate-500 mt-0.5">ATS Filters Tested</div>
          </div>
          <div className="p-3 bg-white/70 backdrop-blur rounded-xl border border-slate-200/80 shadow-sm text-left">
            <div className="text-2xl font-bold text-slate-900">92%</div>
            <div className="text-xs text-slate-500 mt-0.5">Keyword Match Accuracy</div>
          </div>
          <div className="p-3 bg-white/70 backdrop-blur rounded-xl border border-slate-200/80 shadow-sm text-left">
            <div className="text-2xl font-bold text-slate-900">₹0</div>
            <div className="text-xs text-slate-500 mt-0.5">Free 1st Scan Forever</div>
          </div>
        </div>
      </div>
    </section>
  );
}
