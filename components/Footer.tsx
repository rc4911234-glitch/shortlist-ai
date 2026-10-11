import React from "react";
import { Flame, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Manifesto */}
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center text-white">
              <Flame className="w-5 h-5 fill-white" />
            </div>
            <span className="text-base font-black text-white tracking-tight">
              Zero<span className="text-rose-500">Spam</span>Jobs
            </span>
          </div>
          <p className="text-slate-400 leading-relaxed text-xs">
            The job market is broken. Candidates submit 200 applications into algorithmic black holes, while hiring managers get flooded with 3,000 irrelevant AI resumes. 
            By strictly capping applications at 50 per role, we restore human review, direct founder connection, and transparent compensation.
          </p>
        </div>

        {/* Links & Subfooter */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div className="text-slate-500">
            © {new Date().getFullYear()} ZeroSpamJobs. Built like Pieter Levels (RemoteOK) • Fast, lean, solo.
          </div>

          <div className="flex items-center gap-6 text-slate-400">
            <a href="#" className="hover:text-white transition-colors">Manifesto</a>
            <a href="#" className="hover:text-white transition-colors">Pricing for Startups</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="mailto:contact@zerospamjobs.com" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
