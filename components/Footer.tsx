import React from "react";
import { Sparkles, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="text-base font-bold text-white tracking-tight">
            Shortlist<span className="text-blue-400">AI</span>
          </span>
          <span className="text-slate-500 text-[11px] ml-2">
            © {new Date().getFullYear()} ShortlistAI Inc. All rights reserved.
          </span>
        </div>

        <div className="flex items-center gap-6 text-slate-400">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">ATS FAQ</a>
          <a href="mailto:support@shortlistai.com" className="hover:text-white transition-colors">Contact Support</a>
        </div>
      </div>
    </footer>
  );
}
