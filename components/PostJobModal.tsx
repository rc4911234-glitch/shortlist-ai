"use client";

import React, { useState } from "react";
import { 
  X, 
  Sparkles, 
  Check, 
  ShieldCheck, 
  QrCode, 
  CreditCard, 
  Flame, 
  Building2, 
  DollarSign, 
  MapPin, 
  Zap,
  CheckCircle2,
  Plus
} from "lucide-react";
import confetti from "canvas-confetti";
import { Job } from "@/lib/types";

interface PostJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJobPublished: (newJob: Job) => void;
}

export default function PostJobModal({ isOpen, onClose, onJobPublished }: PostJobModalProps) {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("Remote (Worldwide)");
  const [category, setCategory] = useState<Job["category"]>("Engineering");
  const [salary, setSalary] = useState("₹15,00,000 - ₹25,00,000 / yr");
  const [skills, setSkills] = useState("React, TypeScript, Node.js, Next.js");
  const [applyUrl, setApplyUrl] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [description, setDescription] = useState("");

  // Upgrades
  const [pinToTop, setPinToTop] = useState(true);
  const [highlightYellow, setHighlightYellow] = useState(true);
  const [telegramBroadcast, setTelegramBroadcast] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card">("upi");
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  // Calculate total price in INR
  let totalINR = 1999;
  if (pinToTop) totalINR += 999;
  if (highlightYellow) totalINR += 499;
  if (telegramBroadcast) totalINR += 1499;

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !company || !applyUrl) {
      alert("Please fill in Job Title, Company Name, and Apply Link.");
      return;
    }

    const newJob: Job = {
      id: `job-${Date.now()}`,
      title,
      company,
      location,
      type: "Full-Time",
      category,
      salary,
      skills: skills.split(",").map(s => s.trim()).filter(Boolean),
      description: description || `We are looking for an exceptional ${title} to join ${company}. Direct candidate applications only.`,
      responsibilities: [
        "Take ownership of critical features and architecture.",
        "Collaborate with the team in an agile environment.",
        "Maintain high standards for code quality and reliability."
      ],
      requirements: [
        "Strong fundamentals and hands-on experience in the required tech stack.",
        "Proven ability to ship independently and communicate proactively."
      ],
      applyUrl: applyUrl.startsWith("http") ? applyUrl : `https://${applyUrl}`,
      postedAt: "Just now",
      featured: pinToTop,
      highlighted: highlightYellow,
      experienceLevel: "Mid-Level (2-5 Yrs)",
      currency: salary.includes("$") ? "USD" : "INR",
      perks: ["🏝 100% Remote", "💻 Equipment Budget", "🚀 Equity Grants"],
      status: "open",
      applicantsCount: 1,
      maxApplicants: 50,
      contactEmail: contactEmail || `careers@${company.toLowerCase().replace(/[^a-z]/g, '')}.com`,
      employerToken: `tok_${Math.random().toString(36).substring(7)}`
    };

    // Post to backend API
    fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newJob)
    }).catch(console.error);

    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.5 }
    });

    setIsSuccess(true);
    setTimeout(() => {
      onJobPublished(newJob);
      setIsSuccess(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden relative my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="p-10 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-slate-900">Job Published Live!</h3>
            <p className="text-slate-600 text-sm mt-2">
              Your job is now pinned live on the board with the 50-applicant cap active.
            </p>
          </div>
        ) : (
          <form onSubmit={handlePublish} className="p-6 sm:p-8">
            <div className="flex items-center gap-2 text-xs font-bold text-rose-600 uppercase tracking-wider mb-1">
              <Flame className="w-4 h-4 fill-rose-600" />
              <span>Reach Top 1% Verified Talent</span>
            </div>
            
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Post a Job on ZeroSpamJobs
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              Only high-signal candidates apply. Your job is capped at 50 applicants to save your inbox.
            </p>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Company Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Razorpay, Supabase, Zerodha"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none text-xs"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Job Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Senior Frontend Engineer"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as Job["category"])}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none text-xs"
                  >
                    <option value="Engineering">💻 Engineering</option>
                    <option value="Design">🎨 Design</option>
                    <option value="Marketing">📈 Marketing</option>
                    <option value="Product">💼 Product</option>
                    <option value="Freshers">🚀 Freshers (0-2 Yrs)</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Remote (Worldwide) or Bengaluru"
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none text-xs"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Salary Bracket *</label>
                  <input
                    type="text"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    placeholder="e.g. ₹18L - ₹28L or $90k - $130k"
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none text-xs font-semibold text-emerald-700"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Required Skills (Comma separated)</label>
                <input
                  type="text"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  placeholder="e.g. React, TypeScript, GraphQL, Next.js"
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Direct Apply URL *</label>
                  <input
                    type="text"
                    required
                    placeholder="https://company.com/apply or Google Form"
                    value={applyUrl}
                    onChange={(e) => setApplyUrl(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none text-xs"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Hiring Lead / Founder Email</label>
                  <input
                    type="email"
                    placeholder="founder@company.com"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Short Description (2-3 lines)</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="What is your product and what problem will this person solve?"
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none text-xs"
                />
              </div>

              {/* Pieter Levels Style Upgrades Selector */}
              <div className="pt-2 border-t border-slate-200">
                <span className="font-bold text-slate-900 block mb-2 text-xs">
                  Boost Your Listing (Optional Add-ons):
                </span>

                <div className="space-y-2">
                  <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={pinToTop}
                        onChange={(e) => setPinToTop(e.target.checked)}
                        className="rounded text-rose-600 focus:ring-rose-500"
                      />
                      <span className="font-medium text-slate-800">⭐️ Pin to top of board for 7 days</span>
                    </div>
                    <span className="font-bold text-slate-900">+₹999 ($39)</span>
                  </label>

                  <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={highlightYellow}
                        onChange={(e) => setHighlightYellow(e.target.checked)}
                        className="rounded text-rose-600 focus:ring-rose-500"
                      />
                      <span className="font-medium text-slate-800">🟡 Highlight card in yellow (3x clicks)</span>
                    </div>
                    <span className="font-bold text-slate-900">+₹499 ($19)</span>
                  </label>

                  <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={telegramBroadcast}
                        onChange={(e) => setTelegramBroadcast(e.target.checked)}
                        className="rounded text-rose-600 focus:ring-rose-500"
                      />
                      <span className="font-medium text-slate-800">📢 Blast to 15,000 Telegram/WhatsApp members</span>
                    </div>
                    <span className="font-bold text-slate-900">+₹1,499 ($49)</span>
                  </label>
                </div>
              </div>

              {/* Free Launch Special Checkout */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase">
                    <span>🎉 100% Free Launch Promotion</span>
                  </div>
                  <div className="text-sm font-bold text-slate-200 mt-1">
                    Free for First 20 Verified Startups <span className="text-xs text-slate-400 line-through">(Normally ₹1,999)</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>Publish Job for Free</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>30-Day Money-back guarantee if you don't get 10+ high-quality candidates.</span>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
