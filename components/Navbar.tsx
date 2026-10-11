import React from "react";
import { Sparkles, ShieldCheck } from "lucide-react";

interface NavbarProps {
  onScrollToScanner: () => void;
  onScrollToPricing: () => void;
}

export default function Navbar({ onScrollToScanner, onScrollToPricing }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              Shortlist<span className="text-blue-600">AI</span>
            </span>
            <span className="hidden sm:inline-block ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
              ATS 2.0 Engine
            </span>
          </div>
        </div>

        <nav className="flex items-center gap-6">
          <button 
            onClick={onScrollToPricing}
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            Pricing
          </button>
          <div className="hidden md:flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Greenhouse & Workday Compatible</span>
          </div>
          <button
            onClick={onScrollToScanner}
            className="text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Check Resume Free
          </button>
        </nav>
      </div>
    </header>
  );
}
