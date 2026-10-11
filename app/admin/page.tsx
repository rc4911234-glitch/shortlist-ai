"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  DollarSign, 
  Users, 
  Briefcase, 
  Clock, 
  Trash2, 
  ExternalLink, 
  Download, 
  Search, 
  ShieldCheck, 
  Flame, 
  ArrowLeft, 
  Mail, 
  Phone, 
  Linkedin, 
  FileText,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  Plus
} from "lucide-react";
import { Job } from "@/lib/types";
import { CandidateApplication } from "@/lib/serverStorage";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"candidates" | "jobs" | "payouts">("candidates");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<CandidateApplication[]>([]);
  const [stats, setStats] = useState({
    totalJobs: 8,
    totalApplications: 2,
    totalRevenueINR: 18489,
    totalRevenueUSD: 220,
    activeCandidatesCount: 152,
    averageReviewHours: "36 hrs"
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      const [jobsRes, appsRes, statsRes] = await Promise.all([
        fetch("/api/jobs"),
        fetch("/api/apply"),
        fetch("/api/stats")
      ]);

      const jobsData = await jobsRes.json();
      const appsData = await appsRes.json();
      const statsData = await statsRes.json();

      if (jobsData.success) setJobs(jobsData.jobs);
      if (appsData.success) setApplications(appsData.applications);
      if (statsData.success) setStats(statsData.stats);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleDeleteJob = async (jobId: string) => {
    if (!confirm("Are you sure you want to remove this job from the live board?")) return;
    try {
      const res = await fetch(`/api/jobs?id=${jobId}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setJobs(prev => prev.filter(j => j.id !== jobId));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleExportCSV = () => {
    const headers = "ID,Full Name,Email,Phone,Experience,Role,Company,LinkedIn,Pitch\n";
    const rows = applications.map(a => 
      `"${a.id}","${a.fullName}","${a.email}","${a.phone || ''}","${a.experience}","${a.jobTitle}","${a.company}","${a.linkedin || ''}","${(a.pitch || '').replace(/"/g, '""')}"`
    ).join("\n");

    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `ZeroSpamJobs_Candidates_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const filteredApplications = applications.filter(a => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      a.fullName.toLowerCase().includes(q) ||
      a.email.toLowerCase().includes(q) ||
      a.jobTitle.toLowerCase().includes(q) ||
      a.company.toLowerCase().includes(q) ||
      (a.pitch && a.pitch.toLowerCase().includes(q))
    );
  });

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 selection:bg-rose-500 selection:text-white">
      {/* Top Admin Header */}
      <header className="border-b border-slate-800 bg-slate-950/70 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link 
              href="/" 
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors flex items-center gap-1.5 text-xs font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Live Job Board</span>
            </Link>
            
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-rose-600 flex items-center justify-center text-white font-black text-sm">
                ZS
              </div>
              <div>
                <span className="text-sm font-extrabold text-white tracking-tight">
                  ZeroSpamJobs <span className="text-rose-500 font-mono text-xs">FOUNDER DASHBOARD</span>
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Backend Connected</span>
            </span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Metric Cards Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
              <span>Total Revenue</span>
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white">
              ₹{stats.totalRevenueINR.toLocaleString("en-IN")}
            </div>
            <div className="text-[11px] text-emerald-400 mt-1 font-medium">
              ~${stats.totalRevenueUSD} USD • 100% Margin
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
              <span>Active 50-Cap Roles</span>
              <Briefcase className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white">
              {stats.totalJobs}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Zero ghost jobs • Auto-closing at 50
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
              <span>Candidate Pool</span>
              <Users className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white">
              {stats.activeCandidatesCount}
            </div>
            <div className="text-[11px] text-amber-400 mt-1 font-medium">
              {applications.length} submitted via 1-Click Apply
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80">
            <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
              <span>Avg Review Time</span>
              <Clock className="w-4 h-4 text-rose-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white">
              {stats.averageReviewHours}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Guaranteed under 48 hours
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3 mb-6">
          <button
            onClick={() => setActiveTab("candidates")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "candidates"
                ? "bg-rose-600 text-white shadow-md shadow-rose-600/20"
                : "bg-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            📋 Candidate Applications ({applications.length})
          </button>

          <button
            onClick={() => setActiveTab("jobs")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "jobs"
                ? "bg-rose-600 text-white shadow-md shadow-rose-600/20"
                : "bg-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            💼 Manage Live Jobs ({jobs.length})
          </button>

          <button
            onClick={() => setActiveTab("payouts")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "payouts"
                ? "bg-rose-600 text-white shadow-md shadow-rose-600/20"
                : "bg-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            💳 Bank Payouts & Gateway
          </button>
        </div>

        {/* TAB 1: Candidates Talent Pool */}
        {activeTab === "candidates" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search candidates by name, email, or role..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-xs bg-slate-800 border border-slate-700 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none text-white placeholder:text-slate-500"
                />
              </div>

              <button
                onClick={handleExportCSV}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 transition-all"
              >
                <Download className="w-3.5 h-3.5 text-rose-400" />
                <span>Export Candidates CSV</span>
              </button>
            </div>

            {filteredApplications.length > 0 ? (
              <div className="grid grid-cols-1 gap-3.5">
                {filteredApplications.map((app) => (
                  <div key={app.id} className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 hover:border-slate-600 transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-700/60 mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-sm text-white">{app.fullName}</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
                            {app.id}
                          </span>
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5">
                          Applied for: <b className="text-slate-200">{app.jobTitle}</b> at <b className="text-slate-200">{app.company}</b>
                        </div>
                      </div>

                      <div className="text-xs text-slate-400 font-mono">
                        {app.submittedAt}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs mb-3">
                      <div className="flex items-center gap-2 text-slate-300">
                        <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <a href={`mailto:${app.email}`} className="hover:text-rose-400 truncate underline">{app.email}</a>
                      </div>

                      {app.phone && (
                        <div className="flex items-center gap-2 text-slate-300">
                          <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                          <span>{app.phone}</span>
                        </div>
                      )}

                      {app.linkedin && (
                        <div className="flex items-center gap-2 text-slate-300">
                          <Linkedin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                          <a href={app.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-rose-400 truncate underline flex items-center gap-1">
                            <span>Profile Link</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        </div>
                      )}
                    </div>

                    {app.pitch && (
                      <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-700/50 text-xs text-slate-300 mb-2">
                        <span className="font-bold text-slate-400 block mb-0.5">Candidate Pitch:</span>
                        "{app.pitch}"
                      </div>
                    )}

                    <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-700/40 text-xs text-slate-400 font-mono">
                      <span className="font-bold text-slate-400 block mb-0.5">Resume / Qualifications:</span>
                      {app.resumeText}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-slate-800/40 rounded-2xl border border-slate-800 text-slate-400 text-xs">
                No applications match your search.
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Live Jobs Management */}
        {activeTab === "jobs" && (
          <div className="space-y-4">
            <div className="rounded-2xl bg-slate-800/80 border border-slate-700/80 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950/60 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-700">
                    <tr>
                      <th className="p-4">Role & Company</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Salary</th>
                      <th className="p-4">Spots Filled</th>
                      <th className="p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/60 text-slate-300">
                    {jobs.map((job) => (
                      <tr key={job.id} className="hover:bg-slate-750/50">
                        <td className="p-4">
                          <div className="font-bold text-white text-sm">{job.title}</div>
                          <div className="text-xs text-slate-400">{job.company} • {job.location}</div>
                        </td>
                        <td className="p-4">
                          <span className="px-2 py-0.5 rounded-md bg-slate-700 text-slate-300 text-[11px] font-semibold">
                            {job.category}
                          </span>
                        </td>
                        <td className="p-4 font-bold text-emerald-400">
                          {job.salary}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white">{job.applicantsCount} / {job.maxApplicants}</span>
                            <div className="w-16 bg-slate-700 h-1.5 rounded-full overflow-hidden">
                              <div 
                                className="bg-rose-500 h-full rounded-full" 
                                style={{ width: `${Math.round((job.applicantsCount / job.maxApplicants) * 100)}%` }} 
                              />
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <button
                            onClick={() => handleDeleteJob(job.id)}
                            className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors"
                            title="Delete Job"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Payouts & Gateway Connection */}
        {activeTab === "payouts" && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700/80">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
                <CreditCard className="w-4 h-4" />
                <span>Direct Bank Settlement Integration</span>
              </div>
              <h3 className="text-xl font-black text-white">
                How You Receive Money into Your Bank Account
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                When companies pay <b>₹1,999 ($79)</b> to post a job or add upgrades, the payment is processed through a gateway and settled directly into your linked Indian/Global bank account within 24-48 hours.
              </p>

              <div className="my-6 space-y-3">
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-700/60">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm text-white">Razorpay (India UPI, GPay, Paytm & Cards)</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold">Recommended</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Sign up free on <b>razorpay.com</b>, get your API Key ID & Secret, and paste them into your <code>.env.local</code> file. Indian companies can pay using any UPI app or card.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-700/60">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm text-white">LemonSqueezy / Stripe (Global USD Payments)</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 font-bold">International</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Accepts international credit cards from US/European startups and automatically converts USD to INR directly to your bank account.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>Zero server fees: Running on free-tier Next.js and Vercel infrastructure.</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
