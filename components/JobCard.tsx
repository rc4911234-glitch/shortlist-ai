"use client";

import React, { useState } from "react";
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
  Zap
} from "lucide-react";
import { Job } from "@/lib/types";

interface JobCardProps {
  job: Job;
  onApplyClick: (job: Job) => void;
}

export default function JobCard({ job, onApplyClick }: JobCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const spotsLeft = job.maxApplicants - job.applicantsCount;
  const isAlmostFull = spotsLeft <= 10;
  const progressPercent = Math.min(100, Math.round((job.applicantsCount / job.maxApplicants) * 100));

  return (
    <div 
      className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
        job.highlighted 
          ? "border-amber-300 bg-amber-50/20 shadow-md shadow-amber-500/5 ring-1 ring-amber-300" 
          : job.featured 
          ? "border-rose-200 shadow-md shadow-rose-500/5" 
          : "border-slate-200 hover:border-slate-300 shadow-sm hover:shadow"
      }`}
    >
      {/* Top Banner if Featured / Almost Full */}
      {(job.featured || isAlmostFull) && (
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
              <span className="text-xs font-bold text-slate-500">{job.company}</span>
              <span className="text-slate-300">•</span>
              <span className="inline-flex items-center gap-1 text-xs text-slate-600 font-medium">
                <MapPin className="w-3 h-3 text-slate-400" />
                <span>{job.location}</span>
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs text-slate-400 font-mono">{job.postedAt}</span>
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
              <span className={isAlmostFull ? "text-rose-600 font-extrabold" : "text-slate-800"}>
                {job.applicantsCount} / {job.maxApplicants} applied
              </span>
              <span className="text-[10px] text-slate-400 font-normal">
                ({spotsLeft} left)
              </span>
            </div>

            <div className="w-36 bg-slate-100 h-2 rounded-full overflow-hidden mt-1.5">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${
                  isAlmostFull ? "bg-rose-500" : "bg-blue-600"
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-all flex items-center gap-1"
            >
              <span>{isExpanded ? "Less" : "Details"}</span>
              {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            <a
              href={job.applyUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onApplyClick(job)}
              className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-xl bg-slate-900 hover:bg-rose-600 text-white font-bold text-xs shadow-sm transition-all hover:scale-105 active:scale-95"
            >
              <span>Apply</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
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

          {/* Hiring manager contact & Direct Apply Bar */}
          <div className="p-4 rounded-xl bg-white border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <Mail className="w-4 h-4 text-rose-500" />
              <span>
                Direct hiring lead: <b>{job.contactEmail || `careers@${job.company.toLowerCase().replace(/[^a-z]/g, '')}.com`}</b>
              </span>
            </div>

            <a
              href={job.applyUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onApplyClick(job)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition-all"
            >
              <span>Submit Direct Application ({spotsLeft} spots remaining)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
