"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Sparkles, Zap, ArrowDown, Users, CheckCircle2, DollarSign, Clock, Plus } from "lucide-react";

interface HeroProps {
  onOpenAlerts: () => void;
  onOpenPostJob: () => void;
}

export default function Hero({ onOpenAlerts, onOpenPostJob }: HeroProps) {
  return (
    <section className="pt-10 pb-8 bg-gradient-to-b from-white via-slate-50/50 to-slate-100/50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Anti-Naukri Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm font-bold mb-5 shadow-sm">
          <Zap className="w-4 h-4 fill-rose-600 text-rose-600 animate-pulse" />
          <span>The Anti-Naukri Job Board • Zero Consultancies • Zero Ghost Jobs</span>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1] mb-5">
          Stop Applying to <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-orange-600 to-amber-600">
            2,000-Person Black Holes.
          </span>
        </h1>

        {/* Pieter Levels Style Subtitle */}
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-600 leading-relaxed font-medium mb-8">
          Every job on this board is strictly <b>capped at 50 applicants</b>. Once 50 people apply, the job freezes. You compete with 49 candidates, not 2,500. Direct founder/lead contact with 100% salary disclosed upfront.
        </p>

        {/* 4 Pillars of Radical Difference */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto mb-6 text-left">
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 text-rose-600 mb-1">
              <Users className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Applicant Cap</span>
            </div>
            <div className="text-xl font-extrabold text-slate-900">Max 50 Spots</div>
            <p className="text-[11px] text-slate-500 mt-0.5">1-in-50 interview chance vs 1-in-2,000</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 text-emerald-600 mb-1">
              <DollarSign className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Salary</span>
            </div>
            <div className="text-xl font-extrabold text-slate-900">100% Transparent</div>
            <p className="text-[11px] text-slate-500 mt-0.5">Real numbers in INR & USD upfront</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 text-blue-600 mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Verified Only</span>
            </div>
            <div className="text-xl font-extrabold text-slate-900">Zero Ghost Jobs</div>
            <p className="text-[11px] text-slate-500 mt-0.5">Direct hiring manager / founder link</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 text-amber-600 mb-1">
              <Clock className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Speed</span>
            </div>
            <div className="text-xl font-extrabold text-slate-900">48-Hr Review</div>
            <p className="text-[11px] text-slate-500 mt-0.5">Small pools mean HR actually reads CVs</p>
          </div>
        </div>

        {/* Quick candidate and founder action banner */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={onOpenAlerts}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 px-4 py-2 rounded-xl border border-slate-200 shadow-sm transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Get WhatsApp Alerts for New 50-Spot Jobs</span>
          </button>

          <Link
            href="/post-a-job"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 px-4 py-2 rounded-xl border border-rose-200 shadow-sm transition-all hover:scale-105"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            <span>Post a Job for Free ($199 Value)</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
