"use client";

import React, { useState } from "react";
import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Sparkles, 
  Copy, 
  Check, 
  Download, 
  Lock, 
  TrendingUp, 
  FileText,
  ShieldCheck,
  Zap,
  ArrowRight
} from "lucide-react";
import { ATSAnalysisResult } from "@/lib/atsEngine";

interface ScoreReportProps {
  result: ATSAnalysisResult;
  onOpenPricing: () => void;
  reportRef: React.RefObject<HTMLDivElement>;
}

export default function ScoreReport({ result, onOpenPricing, reportRef }: ScoreReportProps) {
  const [copiedKeyword, setCopiedKeyword] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKeyword(text);
    setTimeout(() => setCopiedKeyword(null), 2000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-600 bg-emerald-50 border-emerald-200";
    if (score >= 60) return "text-amber-600 bg-amber-50 border-amber-200";
    return "text-rose-600 bg-rose-50 border-rose-200";
  };

  const getScoreBadgeColor = (score: number) => {
    if (score >= 80) return "bg-emerald-500";
    if (score >= 60) return "bg-amber-500";
    return "bg-rose-500";
  };

  return (
    <div ref={reportRef} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Top Main Result Card */}
      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden mb-8">
        <div className="p-6 sm:p-10 border-b border-slate-100 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white relative">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            
            {/* Score circle & diagnosis */}
            <div className="flex items-center gap-6">
              <div className="relative flex items-center justify-center shrink-0">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-8 border-slate-700/60 flex flex-col items-center justify-center bg-slate-900/90 shadow-2xl">
                  <span className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                    {result.overallScore}
                  </span>
                  <span className="text-xs uppercase tracking-wider text-slate-400 font-medium">
                    out of 100
                  </span>
                </div>
                <div className={`absolute -top-1 -right-1 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase text-white ${getScoreBadgeColor(result.overallScore)} shadow-md`}>
                  Grade {result.grade}
                </div>
              </div>

              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-slate-200 mb-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                  <span>ATS System Benchmark Passed</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold">
                  {result.overallScore >= 75
                    ? "Great Match! Resume is ATS Optimized"
                    : result.overallScore >= 60
                    ? "Moderate Match - Missing Key ATS Filters"
                    : "High ATS Rejection Risk Detected"}
                </h3>
                <p className="text-slate-300 text-sm mt-1 max-w-xl leading-relaxed">
                  {result.summary}
                </p>
              </div>
            </div>

            {/* Quick action card */}
            <div className="w-full lg:w-auto p-4 sm:p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center lg:text-left shrink-0">
              <div className="text-xs text-slate-300 font-medium mb-1">Pass rate with this score:</div>
              <div className="text-2xl font-bold text-amber-300">
                {result.overallScore >= 80 ? "Top 10% of Applicants" : result.overallScore >= 60 ? "Only ~32% Callback Chance" : "Bottom 15% (Likely Filtered)"}
              </div>
              <button
                onClick={onOpenPricing}
                className="mt-3 w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold text-sm shadow-md transition-all hover:scale-[1.02]"
              >
                <Zap className="w-4 h-4 fill-white" />
                <span>Fix to 90%+ with AI (₹99)</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3 Pillar Summary Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200 bg-slate-50/70">
          <div className="p-6">
            <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">Target Keyword Match</div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-slate-900">{result.keywordMatchRate}%</span>
              <span className="text-xs text-slate-500">({result.matchedKeywords.length} matched / {result.missingKeywords.length} missing)</span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full mt-3 overflow-hidden">
              <div className="bg-blue-600 h-full rounded-full transition-all duration-700" style={{ width: `${result.keywordMatchRate}%` }} />
            </div>
          </div>

          <div className="p-6">
            <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">Formatting & Structure</div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-slate-900">{result.formattingScore}%</span>
              <span className="text-xs text-slate-500">ATS Layout compliance</span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full mt-3 overflow-hidden">
              <div className="bg-emerald-600 h-full rounded-full transition-all duration-700" style={{ width: `${result.formattingScore}%` }} />
            </div>
          </div>

          <div className="p-6">
            <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">Impact & Quantified Metrics</div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-slate-900">{result.impactScore}%</span>
              <span className="text-xs text-slate-500">({result.quantifiedMetricsCount} metrics, {result.actionVerbsCount} action verbs)</span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full mt-3 overflow-hidden">
              <div className="bg-indigo-600 h-full rounded-full transition-all duration-700" style={{ width: `${result.impactScore}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Keywords & Formatting Checks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        
        {/* Missing & Matched Keywords Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-500" />
              <span>Missing Critical Keywords ({result.missingKeywords.length})</span>
            </h4>
            <span className="text-xs text-slate-400">Click to copy</span>
          </div>
          <p className="text-xs text-slate-500 mb-4 leading-relaxed">
            These keywords appeared repeatedly in the target Job Description or ATS benchmark, but were not detected in your resume:
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {result.missingKeywords.length > 0 ? (
              result.missingKeywords.map((kw, i) => (
                <button
                  key={i}
                  onClick={() => handleCopy(kw)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition-all hover:scale-105 active:scale-95"
                  title="Click to copy"
                >
                  <span>+ {kw}</span>
                  {copiedKeyword === kw ? (
                    <Check className="w-3 h-3 text-emerald-600" />
                  ) : (
                    <Copy className="w-3 h-3 opacity-60" />
                  )}
                </button>
              ))
            ) : (
              <div className="text-xs text-emerald-600 font-medium">All major keywords detected!</div>
            )}
          </div>

          <div className="pt-4 border-t border-slate-100">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Matched Keywords in Resume ({result.matchedKeywords.length})</span>
            </h5>
            <div className="flex flex-wrap gap-1.5">
              {result.matchedKeywords.map((kw, i) => (
                <span key={i} className="px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {kw}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Formatting & Structure Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
          <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <span>ATS Layout & Formatting Checklist</span>
          </h4>
          <p className="text-xs text-slate-500 mb-5 leading-relaxed">
            Applicant Tracking Systems parse standard headers and contact info. Any missing section leads to automated rejection:
          </p>

          <div className="space-y-3.5">
            {result.formattingChecks.map((item, i) => (
              <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                {item.passed ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                )}
                <div className="text-left">
                  <div className={`text-xs font-semibold ${item.passed ? "text-slate-900" : "text-rose-700"}`}>
                    {item.title}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {item.recommendation}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI STAR Bullet Optimizer Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md mb-1.5 border border-indigo-200">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI STAR-Method Optimization</span>
            </div>
            <h4 className="text-xl font-bold text-slate-900">
              Transform Weak Bullet Points into High-Impact Achievements
            </h4>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Top recruiters look for the Google XYZ Formula: <i>"Accomplished [X] as measured by [Y], by doing [Z]"</i>.
            </p>
          </div>

          <button
            onClick={onOpenPricing}
            className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-sm transition-all"
          >
            <Lock className="w-3.5 h-3.5 text-amber-400" />
            <span>Generate Full AI Tailoring</span>
          </button>
        </div>

        <div className="space-y-4">
          {result.bulletSuggestions.map((item, i) => (
            <div key={i} className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 rounded-xl bg-white border border-rose-200/80">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-rose-600 mb-1 flex items-center gap-1">
                    <XCircle className="w-3 h-3" />
                    <span>Before (Low ATS Impact)</span>
                  </div>
                  <p className="text-xs text-slate-600 font-mono">
                    "{item.original}"
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 mb-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>After (AI Optimized + Quantified)</span>
                  </div>
                  <p className="text-xs text-slate-800 font-mono font-medium">
                    "{item.improved}"
                  </p>
                </div>
              </div>
              <div className="mt-2.5 text-[11px] text-slate-500 flex items-center gap-1.5">
                <span className="font-semibold text-slate-700">Why this works:</span>
                <span>{item.reason}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Unlock Pro CTA Banner */}
      <div className="rounded-3xl p-8 sm:p-10 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white shadow-xl shadow-blue-500/20 text-center relative overflow-hidden">
        <div className="max-w-2xl mx-auto relative z-10">
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
            Want to guaranteed pass the ATS filter for this job?
          </h3>
          <p className="text-blue-100 text-sm sm:text-base leading-relaxed mb-6">
            Get unlimited AI resume tailoring, automated keyword injection, and an ATS-formatted PDF export for just ₹99.
          </p>
          <button
            onClick={onOpenPricing}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-blue-700 font-bold text-base shadow-lg transition-all hover:scale-105 active:scale-95"
          >
            <span>Unlock Pro Pass for ₹99 ($4.99)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
