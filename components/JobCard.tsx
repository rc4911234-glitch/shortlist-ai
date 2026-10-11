"use client";

import React, { useState, useEffect } from "react";
import { 
  Building2, 
  MapPin, 
  DollarSign, 
  Clock, 
  ExternalLink, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  AlertCircle, 
  Mail, 
  Flame, 
  Sparkles, 
  Zap, 
  Send, 
  Heart, 
  Share2, 
  Lock, 
  Check 
} from "lucide-react";
import { Job } from "@/lib/types";

interface JobCardProps {
  job: Job;
  onApplyClick: (job: Job) => void;
  isSaved?: boolean;
  onToggleSave?: (jobId: string) => void;
}

export default function JobCard({ 
  job, 
  onApplyClick, 
  isSaved = false, 
  onToggleSave 
}: JobCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const isCapped = job.status === "capped" || job.applicantsCount >= job.maxApplicants;
  const spotsLeft = Math.max(0, job.maxApplicants - job.applicantsCount);
  const isAlmostFull = !isCapped && spotsLeft <= 10;
  const progressPercent = Math.min(100, Math.round((job.applicantsCount / job.maxApplicants) * 100));

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareText = `Check out this 50-cap role: ${job.title} at ${job.company} (${job.salary}) on ZeroSpamJobs! https://idea-disuess.vercel.app`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div 
      className={`bg-white rounded-3xl border transition-all duration-200 overflow-hidden ${
        isCapped
          ? "border-slate-300 opacity-90 bg-slate-50/50"
          : job.highlighted 
          ? "border-amber-300 bg-amber-50/20 shadow-md shadow-amber-500/5 ring-1 ring-amber-300" 
          : job.featured 
          ? "border-rose-200 shadow-md shadow-rose-500/5" 
          : "border-slate-200 hover:border-slate-300 shadow-sm hover:shadow"
      }`}
    >
      {/* Top Banner if Featured / Capped / Almost Full */}
      {isCapped ? (
        <div className="px-4 sm:px-6 py-1.5 bg-slate-800 text-slate-300 flex items-center justify-between text-[11px] font-bold">
          <div className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-amber-400" />
            <span>APPLICATION CAP REACHED: 50 / 50 APPLICANTS RECEIVED</span>
          </div>
          <span className="text-amber-400">Under Review by Hiring Lead</span>
        </div>
      ) : (job.featured || isAlmostFull) && (
        <div className="px-4 sm:px-6 py-1.5 bg-slate-900 text-white flex items-center justify-between text-[11px] font-bold">
          <div className="flex items-center gap-1.5">
            {job.featured && (
              <span className="flex items-center gap-1 text-amber-400">
                <Sparkles className="w-3 h-3" />
                <span>FEATURED HIRING SPRINT</span>
              </span>
            )}
          </div>
          {isAlmostFull && (
            <div className="flex items-center gap-1 text-rose-400 animate-pulse">
              <Flame className="w-3.5 h-3.5 fill-rose-400" />
              <span>URGENT: Only {spotsLeft} Application Spots Left!</span>
            </div>
          )}
        </div>
      )}

      {/* Main Row */}
      <div className="p-4 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        
        {/* Left: Logo & Core Info */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-slate-100 to-slate-200 border border-slate-200 flex items-center justify-center font-black text-slate-700 text-lg sm:text-xl shrink-0 shadow-inner overflow-hidden">
            {job.companyLogo ? (
              <img src={job.companyLogo} alt={job.company} className="w-full h-full object-cover" />
            ) : (
              job.company.substring(0, 2).toUpperCase()
            )}
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-xs font-bold text-slate-600">{job.company}</span>
              <span className="text-slate-300">•</span>
              <span className="inline-flex items-center gap-1 text-xs text-slate-600 font-medium">
                <MapPin className="w-3 h-3 text-slate-400" />
                <span>{job.location}</span>
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs text-slate-400 font-mono">{job.postedAt}</span>
              <span className="text-slate-300">•</span>
              <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">
                {job.experienceLevel}
              </span>
            </div>

            <h3 
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-base sm:text-lg font-extrabold text-slate-900 hover:text-rose-600 cursor-pointer transition-colors leading-snug"
            >
              {job.title}
            </h3>

            {/* Tags & Salary */}
            <div className="flex flex-wrap items-center gap-2 mt-2.5">
              <span className="px-2.5 py-0.5 rounded-lg text-xs font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
                💰 {job.salary}
              </span>
              
              {job.skills.slice(0, 4).map((skill, i) => (
                <span key={i} className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-700">
                  {skill}
                </span>
              ))}
              {job.skills.length > 4 && (
                <span className="text-[10px] text-slate-400 font-medium">
                  +{job.skills.length - 4} more
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right: 50-Spot Urgency Meter & CTAs */}
        <div className="w-full md:w-auto flex flex-row md:flex-col items-center md:items-end justify-between gap-3 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
          
          {/* Progress bar */}
          <div className="text-left md:text-right">
            <div className="flex items-center gap-1.5 text-xs font-bold">
              <span className={isCapped ? "text-slate-500 font-bold" : isAlmostFull ? "text-rose-600 font-extrabold" : "text-slate-800"}>
                {job.applicantsCount} / {job.maxApplicants} applied
              </span>
              <span className="text-[10px] text-slate-400 font-normal">
                {isCapped ? "(Closed)" : `(${spotsLeft} left)`}
              </span>
            </div>

            <div className="w-36 bg-slate-100 h-2 rounded-full overflow-hidden mt-1.5">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${
                  isCapped ? "bg-slate-400" : isAlmostFull ? "bg-rose-500" : "bg-blue-600"
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            {/* Share Button */}
            <button
              onClick={handleShare}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 border border-slate-200 transition-colors"
              title="Share job link"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>

            {/* Bookmark button */}
            {onToggleSave && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleSave(job.id);
                }}
                className={`p-2 rounded-xl border transition-colors ${
                  isSaved 
                    ? "bg-rose-50 border-rose-200 text-rose-600" 
                    : "border-slate-200 text-slate-400 hover:text-rose-500 hover:bg-slate-100"
                }`}
                title={isSaved ? "Saved to favorites" : "Bookmark job"}
              >
                <Heart className={`w-4 h-4 ${isSaved ? "fill-rose-500" : ""}`} />
              </button>
            )}

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-all flex items-center gap-1"
            >
              <span>{isExpanded ? "Less" : "Details"}</span>
              {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {/* Apply Button (or Capped state) */}
            {isCapped ? (
              <button
                disabled
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-200 text-slate-500 font-bold text-xs cursor-not-allowed"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>50/50 Capped</span>
              </button>
            ) : (
              <a
                href={job.applyUrl || (job.contactEmail ? `mailto:${job.contactEmail}` : "#")}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.stopPropagation();
                  onApplyClick(job);
                }}
                className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-sm shadow-rose-600/20 transition-all hover:scale-105 active:scale-95"
              >
                <span>Apply on Company Site</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Expandable Drawer (Pieter Levels Style Detail Card) */}
      {isExpanded && (
        <div className="px-4 sm:px-6 py-6 border-t border-slate-100 bg-slate-50/70 text-slate-800 space-y-5 animate-fadeIn">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              About the Role
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed font-normal">
              {job.description}
            </p>
          </div>

          {/* Perks & Benefits Pills */}
          {job.perks && job.perks.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Perks & Benefits
              </h4>
              <div className="flex flex-wrap gap-2">
                {job.perks.map((perk, i) => (
                  <span key={i} className="px-3 py-1 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-700 shadow-2xs">
                    {perk}
                  </span>
                ))}
              </div>
            </div>
          )}

          {job.responsibilities && job.responsibilities.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Key Responsibilities
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-600 list-disc list-inside">
                {job.responsibilities.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
          )}

          {job.requirements && job.requirements.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Requirements & Expectations
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-600 list-disc list-inside">
                {job.requirements.map((req, i) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Hiring manager contact & Direct In-App Apply Bar */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <Mail className="w-4 h-4 text-rose-500" />
                <span>
                  Direct hiring lead: <b>{job.contactEmail || `careers@${job.company.toLowerCase().replace(/[^a-z]/g, '')}.com`}</b>
                </span>
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Apply directly through ZeroSpamJobs to guarantee your profile is reviewed in 48 hours.
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <a
                href={job.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-slate-500 hover:text-slate-900 underline flex items-center gap-1"
              >
                <span>External Link</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              {isCapped ? (
                <button
                  disabled
                  className="px-6 py-2.5 rounded-xl bg-slate-200 text-slate-500 font-bold text-xs cursor-not-allowed"
                >
                  Application Cap Reached (50/50)
                </button>
              ) : (
                <a
                  href={job.applyUrl || (job.contactEmail ? `mailto:${job.contactEmail}` : "#")}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => onApplyClick(job)}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition-all hover:scale-105 active:scale-95"
                >
                  <span>Apply on Official Company Careers Site</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
