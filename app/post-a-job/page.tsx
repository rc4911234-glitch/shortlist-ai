"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Sparkles, 
  Check, 
  ShieldCheck, 
  Flame, 
  Building2, 
  DollarSign, 
  MapPin, 
  Zap, 
  CheckCircle2, 
  Plus, 
  Globe, 
  ExternalLink, 
  Star, 
  Send,
  Eye,
  Radio
} from "lucide-react";
import confetti from "canvas-confetti";
import { Job } from "@/lib/types";

const POPULAR_TAGS = [
  "React", "Next.js", "TypeScript", "Node.js", "Python", 
  "Go", "AI / ML", "PostgreSQL", "Tailwind CSS", "AWS", "Rust"
];

const POPULAR_LOCATIONS = [
  "Remote (Worldwide)",
  "Remote (US Only)",
  "Remote (Europe)",
  "Remote (India / APAC)"
];

export default function PostJobPage() {
  const router = useRouter();

  // Form states
  const [title, setTitle] = useState("Senior Full Stack Engineer");
  const [company, setCompany] = useState("Acme Labs");
  const [companyLogo, setCompanyLogo] = useState("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&h=120&fit=crop");
  const [location, setLocation] = useState("Remote (Worldwide)");
  const [category, setCategory] = useState<Job["category"]>("Engineering");
  const [salary, setSalary] = useState("$90,000 - $140,000 / yr");
  const [skills, setSkills] = useState(["React", "TypeScript", "Next.js", "PostgreSQL"]);
  const [newSkillInput, setNewSkillInput] = useState("");
  const [applyUrl, setApplyUrl] = useState("https://careers.acmelabs.com/apply");
  const [contactEmail, setContactEmail] = useState("hiring@acmelabs.com");
  const [description, setDescription] = useState(
    "We are looking for a Senior Full Stack Engineer to lead our next-generation product initiatives. High autonomy, async-first team, and equity grants."
  );

  // Upgrades (Pieter Levels Style)
  const [pinToTop, setPinToTop] = useState(true);
  const [highlightYellow, setHighlightYellow] = useState(true);
  const [networkBroadcast, setNetworkBroadcast] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Price Calculation
  let basePriceUSD = 199;
  let addOnsUSD = 0;
  if (pinToTop) addOnsUSD += 79;
  if (highlightYellow) addOnsUSD += 39;
  if (networkBroadcast) addOnsUSD += 99;
  const totalUSD = basePriceUSD + addOnsUSD;

  const toggleTag = (tag: string) => {
    if (skills.includes(tag)) {
      setSkills(skills.filter(s => s !== tag));
    } else {
      if (skills.length < 6) {
        setSkills([...skills, tag]);
      }
    }
  };

  const handleAddCustomTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && newSkillInput.trim()) {
      e.preventDefault();
      const trimmed = newSkillInput.trim();
      if (!skills.includes(trimmed) && skills.length < 6) {
        setSkills([...skills, trimmed]);
      }
      setNewSkillInput("");
    }
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !company || !applyUrl) {
      alert("Please fill in Job Title, Company Name, and Apply Link.");
      return;
    }

    setIsSubmitting(true);

    const newJob: Job = {
      id: `job-${Date.now()}`,
      title,
      company,
      companyLogo,
      location,
      type: "Full-Time",
      category,
      salary,
      skills: skills.length > 0 ? skills : ["React", "TypeScript"],
      description,
      responsibilities: [
        "Take end-to-end ownership of core architecture and customer-facing features.",
        "Work directly with leadership and contribute to technical roadmap decisions.",
        "Maintain clean, resilient, and well-tested code."
      ],
      requirements: [
        "3+ years of professional engineering or relevant product experience.",
        "High degree of initiative, curiosity, and strong written async communication.",
        "Proven ability to deliver high-impact software independently."
      ],
      applyUrl: applyUrl.startsWith("http") ? applyUrl : `https://${applyUrl}`,
      postedAt: "Just now",
      featured: pinToTop,
      highlighted: highlightYellow,
      experienceLevel: "Mid-Level (2-5 Yrs)",
      currency: salary.includes("$") ? "USD" : "INR",
      perks: ["🏝 100% Remote", "💻 Equipment Budget", "🌴 Flexible PTO", "🚀 Equity Options"],
      status: "open",
      applicantsCount: 1,
      maxApplicants: 50,
      contactEmail: contactEmail || `careers@${company.toLowerCase().replace(/[^a-z]/g, "")}.com`,
      employerToken: `tok_${Math.random().toString(36).substring(7)}`
    };

    try {
      await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newJob)
      });

      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.4 }
      });

      setIsSuccess(true);
      setTimeout(() => {
        router.push("/");
      }, 2500);
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 selection:bg-rose-600 selection:text-white pb-20">
      {/* Top Header */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Job Board</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-rose-600">ZeroSpamJobs</span>
            <span className="text-slate-300">•</span>
            <span className="text-xs font-semibold text-slate-500">Post a Remote Job</span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-10">
        
        {/* Title Section */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold border border-rose-200 mb-3">
            <Flame className="w-3.5 h-3.5 fill-rose-600" />
            <span>Reach 45,000+ Global Tech Talent</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Hire Your Next Senior Engineer <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-amber-600">
              Without 2,000 Garbage Resumes.
            </span>
          </h1>
          <p className="text-sm text-slate-600 mt-3 leading-relaxed">
            Every listing is strictly capped at <b>50 applicants</b>. You receive high-intent candidates directly into your ATS, while respecting human dignity.
          </p>
        </div>

        {/* Success View */}
        {isSuccess ? (
          <div className="max-w-xl mx-auto bg-white rounded-3xl border border-slate-200 p-10 text-center shadow-xl animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-black text-slate-900">Your Job is LIVE!</h2>
            <p className="text-xs text-slate-600 mt-2 max-w-sm mx-auto leading-relaxed">
              Your role <b>"{title}"</b> at <b>{company}</b> has been published on the board with the 50-applicant cap active.
            </p>
            <div className="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
              <div>Redirecting to home job directory...</div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Form Section (7 cols) */}
            <form onSubmit={handlePublish} className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
              
              {/* Step 1: Company Info */}
              <div>
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-rose-600" />
                  <span>1. Company Details</span>
                </h3>

                <div className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Company Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Stripe, Linear, Supabase"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none text-xs font-semibold"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Company Logo URL</label>
                      <input
                        type="url"
                        placeholder="https://company.com/logo.png"
                        value={companyLogo}
                        onChange={(e) => setCompanyLogo(e.target.value)}
                        className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none text-xs"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2: Role Details */}
              <div className="pt-4 border-t border-slate-100">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span>2. The Position</span>
                </h3>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Job Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Senior Backend Engineer (Go / Distributed Systems)"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none text-xs font-bold text-slate-900"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Category</label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value as Job["category"])}
                        className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none text-xs font-semibold"
                      >
                        <option value="Engineering">💻 Software Engineering</option>
                        <option value="Product">💼 Product & Operations</option>
                        <option value="Design">🎨 Design & UX</option>
                        <option value="Marketing">📈 Growth & Marketing</option>
                        <option value="Freshers">🚀 Junior / Freshers (0-2 Yrs)</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Salary Range * (100% Upfront)</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. $90,000 - $140,000 / yr or ₹25L - ₹38L"
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                        className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none text-xs font-bold text-emerald-700"
                      />
                    </div>
                  </div>

                  {/* Remote Geographic Eligibility Pills */}
                  <div>
                    <label className="font-bold text-slate-700 block mb-1.5">Remote Location Restriction</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {POPULAR_LOCATIONS.map((loc, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setLocation(loc)}
                          className={`p-2.5 rounded-xl text-center text-[11px] font-bold border transition-all ${
                            location === loc
                              ? "bg-rose-50 border-rose-400 text-rose-700 shadow-sm"
                              : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
                          }`}
                        >
                          {loc}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tech Stack Pills */}
                  <div>
                    <label className="font-bold text-slate-700 block mb-1.5">
                      Required Skills & Tech Stack (Max 6)
                    </label>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {POPULAR_TAGS.map((tag, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => toggleTag(tag)}
                          className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-all ${
                            skills.includes(tag)
                              ? "bg-slate-900 border-slate-900 text-white"
                              : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"
                          }`}
                        >
                          {skills.includes(tag) ? `✓ ${tag}` : `+ ${tag}`}
                        </button>
                      ))}
                    </div>

                    <input
                      type="text"
                      placeholder="Type custom skill and press Enter..."
                      value={newSkillInput}
                      onChange={(e) => setNewSkillInput(e.target.value)}
                      onKeyDown={handleAddCustomTag}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none text-xs"
                    />
                  </div>

                  {/* Direct ATS Apply URL (RemoteOK Core Feature) */}
                  <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-3">
                    <div>
                      <label className="font-bold text-slate-900 block mb-1 flex items-center gap-1.5">
                        <ExternalLink className="w-3.5 h-3.5 text-amber-600" />
                        <span>Direct ATS / Application URL *</span>
                      </label>
                      <input
                        type="url"
                        required
                        placeholder="https://boards.greenhouse.io/yourcompany/jobs/... or Lever / Ashby link"
                        value={applyUrl}
                        onChange={(e) => setApplyUrl(e.target.value)}
                        className="w-full p-3 rounded-xl border border-amber-300 bg-white focus:ring-2 focus:ring-amber-500 outline-none text-xs font-mono"
                      />
                      <p className="text-[11px] text-amber-800 mt-1">
                        Candidates will click directly to this link. We don't hoard resumes or get in the middle.
                      </p>
                    </div>

                    <div>
                      <label className="font-bold text-slate-800 block mb-1">
                        Hiring Lead / Notification Email
                      </label>
                      <input
                        type="email"
                        placeholder="careers@company.com"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-amber-200 bg-white focus:ring-2 focus:ring-amber-500 outline-none text-xs"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Short Pitch / Role Description</label>
                    <textarea
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none text-xs leading-relaxed"
                    />
                  </div>
                </div>
              </div>

              {/* Step 3: Pieter Levels Upsells */}
              <div className="pt-4 border-t border-slate-100">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span>3. High-Converting Add-ons (Optional Boosts)</span>
                </h3>
                <p className="text-xs text-slate-500 mb-3">
                  These upgrades get 3x to 5x more clicks from top engineers:
                </p>

                <div className="space-y-2.5 text-xs">
                  <label className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    pinToTop ? "bg-amber-50/50 border-amber-300 shadow-sm" : "border-slate-200 hover:bg-slate-50"
                  }`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={pinToTop}
                        onChange={(e) => setPinToTop(e.target.checked)}
                        className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500"
                      />
                      <div>
                        <div className="font-bold text-slate-900">⭐️ Pin to top of board for 7 days</div>
                        <div className="text-[11px] text-slate-500">Stays at the very top of all searches. 3x visibility.</div>
                      </div>
                    </div>
                    <span className="font-mono font-bold text-slate-900">+$79 (₹6,500)</span>
                  </label>

                  <label className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    highlightYellow ? "bg-yellow-50/50 border-yellow-300 shadow-sm" : "border-slate-200 hover:bg-slate-50"
                  }`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={highlightYellow}
                        onChange={(e) => setHighlightYellow(e.target.checked)}
                        className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500"
                      />
                      <div>
                        <div className="font-bold text-slate-900">🟡 Highlight card in yellow</div>
                        <div className="text-[11px] text-slate-500">Draws candidate eyes immediately with prominent badge.</div>
                      </div>
                    </div>
                    <span className="font-mono font-bold text-slate-900">+$39 (₹3,200)</span>
                  </label>

                  <label className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    networkBroadcast ? "bg-rose-50/50 border-rose-300 shadow-sm" : "border-slate-200 hover:bg-slate-50"
                  }`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={networkBroadcast}
                        onChange={(e) => setNetworkBroadcast(e.target.checked)}
                        className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500"
                      />
                      <div>
                        <div className="font-bold text-slate-900">📢 Blast to 45,000+ Telegram & WhatsApp members</div>
                        <div className="text-[11px] text-slate-500">Instant direct push within 2 hours of publication.</div>
                      </div>
                    </div>
                    <span className="font-mono font-bold text-slate-900">+$99 (₹8,200)</span>
                  </label>
                </div>
              </div>

              {/* Checkout Box */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
                  <div>
                    <div className="text-xs font-semibold text-slate-300">
                      Standard 30-Day Listing + Selected Boosts
                    </div>
                    <div className="text-base font-bold text-white mt-0.5">
                      Total Investment: ${totalUSD} USD <span className="text-xs text-slate-400 font-normal">(₹{(totalUSD * 83).toLocaleString("en-IN")} INR)</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-black text-rose-400">${totalUSD} USD</div>
                    <div className="text-[10px] text-slate-400">30 Days Active Distribution</div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-sm shadow-lg shadow-rose-600/30 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>{isSubmitting ? "Processing Listing..." : `Pay $${totalUSD} & Publish Job Live`}</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 text-center">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>30-Day Money-Back Guarantee if you receive fewer than 10 qualified applicants.</span>
              </div>
            </form>

            {/* Live Card Preview Section (5 cols - Pieter Levels Style) */}
            <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <Eye className="w-4 h-4 text-rose-600" />
                  <span>Real-Time Job Card Preview</span>
                </div>
                <span className="text-[11px] font-mono text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                  Live View
                </span>
              </div>

              {/* The Rendered Preview Job Card */}
              <div className={`rounded-3xl border transition-all duration-300 shadow-md overflow-hidden ${
                highlightYellow 
                  ? "bg-gradient-to-r from-amber-50/90 via-yellow-50/70 to-amber-50/90 border-amber-300 ring-2 ring-amber-400/30" 
                  : "bg-white border-slate-200"
              }`}>
                {/* Featured Header Pill if pinned */}
                {pinToTop && (
                  <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[11px] font-black uppercase tracking-wider px-4 py-1 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5 fill-white" />
                      <span>⭐️ Featured Priority Listing</span>
                    </span>
                    <span className="text-[10px] font-normal opacity-90">Pinned for 7 Days</span>
                  </div>
                )}

                <div className="p-5">
                  <div className="flex items-start gap-3.5 mb-3">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center font-black text-slate-700 text-lg shrink-0 overflow-hidden shadow-inner">
                      {companyLogo ? (
                        <img src={companyLogo} alt={company} className="w-full h-full object-cover" />
                      ) : (
                        company.substring(0, 2).toUpperCase()
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-0.5">
                        <span className="font-bold text-slate-700">{company || "Company"}</span>
                        <span>•</span>
                        <span className="text-slate-500">{location}</span>
                        <span>•</span>
                        <span className="text-[10px] text-slate-400 font-mono">Just now</span>
                      </div>
                      <h4 className="text-base font-extrabold text-slate-900 leading-snug truncate">
                        {title || "Job Title"}
                      </h4>
                    </div>
                  </div>

                  {/* Salary & Skills */}
                  <div className="flex flex-wrap items-center gap-1.5 mb-4">
                    <span className="px-2.5 py-0.5 rounded-lg text-xs font-black bg-emerald-50 text-emerald-700 border border-emerald-200">
                      💰 {salary}
                    </span>
                    {skills.map((skill, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-700">
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* 50-Spot Urgency Meter & CTA */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                    <div>
                      <div className="text-[11px] font-bold text-slate-700">
                        1 / 50 applied <span className="text-slate-400 font-normal">(49 spots left)</span>
                      </div>
                      <div className="w-28 bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1">
                        <div className="h-full bg-blue-600 rounded-full w-[2%]" />
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 text-white font-bold text-xs shadow-sm shadow-rose-600/20">
                      <span>Apply on Company Site</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Box for Founders */}
              <div className="p-5 rounded-3xl bg-white border border-slate-200 space-y-3 text-xs text-slate-600">
                <div className="font-bold text-slate-900 text-sm">
                  Why Fast-Growing Startups Post Here:
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span><b>50 Capped Limit:</b> Only candidates who genuinely read your job description apply.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span><b>Direct ATS Integration:</b> Applicants submit directly to your Greenhouse or Lever URL.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span><b>Google Jobs Indexing:</b> Structured JSON-LD schema gets your role ranked on Google Search worldwide.</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

      </main>
    </div>
  );
}
