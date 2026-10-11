"use client";

import React from "react";
import Link from "next/link";
import { Zap, Plus, Bell, ShieldCheck, Flame, Briefcase, Building2 } from "lucide-react";

interface NavbarProps {
  onOpenPostJob: () => void;
  onOpenAlerts: () => void;
  onOpenMyApplications: () => void;
  appliedCount: number;
}

export default function Navbar({ 
  onOpenPostJob, 
  onOpenAlerts, 
  onOpenMyApplications,
  appliedCount 
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Logo */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2.5 cursor-pointer shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 via-orange-500 to-amber-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20">
            <Flame className="w-6 h-6 fill-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black tracking-tight text-slate-900">
                Zero<span className="text-rose-600">Spam</span>Jobs
              </span>
              <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-rose-100 text-rose-700 tracking-wider">
                Max 50
              </span>
            </div>
            <p className="text-[10px] text-slate-500 hidden sm:block font-medium">
              Curated Remote & Startup Jobs • Capped at 50 Applicants
            </p>
          </div>
        </div>

        {/* Live Ticker Indicator */}
        <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>⚡ 50-Applicant Cap Enabled — 100% Guaranteed Review</span>
        </div>

        {/* Right CTAs */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Candidate Applications tracker */}
          <button
            onClick={onOpenMyApplications}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <Briefcase className="w-4 h-4 text-blue-600" />
            <span className="hidden sm:inline">My Applications</span>
            {appliedCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center">
                {appliedCount}
              </span>
            )}
          </button>

          {/* Employer Hiring Review Portal Link */}
          <Link
            href="/company/applicants"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <Building2 className="w-4 h-4 text-emerald-600" />
            <span>Employer Portal</span>
          </Link>

          {/* Job Alerts */}
          <button
            onClick={onOpenAlerts}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <Bell className="w-4 h-4 text-amber-500" />
            <span>Job Alerts</span>
          </button>

          {/* Founder Panel */}
          <Link
            href="/admin"
            className="hidden lg:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold text-slate-500 hover:text-rose-600 hover:bg-slate-100 transition-colors"
          >
            <span>Founder Panel</span>
          </Link>

          {/* Big Post a Job CTA */}
          <button
            onClick={onOpenPostJob}
            className="inline-flex items-center gap-1.5 px-3.5 sm:px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-rose-600/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Post a Job (₹1,999)</span>
          </button>
        </div>
      </div>
    </header>
  );
}
