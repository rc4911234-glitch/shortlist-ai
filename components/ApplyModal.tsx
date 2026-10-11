"use client";

import React, { useState } from "react";
import { 
  X, 
  CheckCircle2, 
  ExternalLink, 
  Flame, 
  Send, 
  FileText, 
  Sparkles, 
  ShieldCheck, 
  Linkedin, 
  Github, 
  Mail, 
  Phone, 
  User 
} from "lucide-react";
import confetti from "canvas-confetti";
import { Job } from "@/lib/types";

interface ApplyModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
  onApplicationSubmitted: (jobId: string) => void;
}

export default function ApplyModal({
  job,
  isOpen,
  onClose,
  onApplicationSubmitted,
}: ApplyModalProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [experience, setExperience] = useState("1-3 years");
  const [pitch, setPitch] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [appId, setAppId] = useState("");

  if (!isOpen || !job) return null;

  const spotsLeft = job.maxApplicants - job.applicantsCount;
  const currentSpot = job.applicantsCount + 1;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !email) {
      alert("Please provide your Name and Email.");
      return;
    }

    const generatedId = `APP-${Math.floor(10000 + Math.random() * 90000)}`;
    setAppId(generatedId);

    // Save locally
    try {
      const stored = localStorage.getItem("my_submitted_applications");
      const list = stored ? JSON.parse(stored) : [];
      list.push({
        id: generatedId,
        jobId: job.id,
        jobTitle: job.title,
        company: job.company,
        appliedAt: new Date().toLocaleDateString(),
        fullName,
        email,
      });
      localStorage.setItem("my_submitted_applications", JSON.stringify(list));

      // Post to backend API
      fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: generatedId,
          jobId: job.id,
          jobTitle: job.title,
          company: job.company,
          fullName,
          email,
          phone,
          linkedin,
          experience,
          pitch,
          resumeText
        })
      }).catch(console.error);
    } catch (err) {
      console.error(err);
    }

    // Trigger celebratory confetti
    confetti({
      particleCount: 110,
      spread: 75,
      origin: { y: 0.55 },
    });

    setIsSuccess(true);
    onApplicationSubmitted(job.id);
  };

  const handleReset = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden relative my-6">
        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          /* Application Success View */
          <div className="p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 mb-2">
              <span>Spot #{currentSpot} of 50 Confirmed</span>
            </div>

            <h3 className="text-2xl font-black text-slate-900">
              Application Delivered!
            </h3>

            <p className="text-slate-600 text-xs mt-2 max-w-sm mx-auto leading-relaxed">
              Your profile has been forwarded directly to the hiring lead at <b>{job.company}</b> ({job.contactEmail || "hiring team"}).
            </p>

            <div className="my-5 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-1.5 text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500">Application ID:</span>
                <span className="font-mono font-bold text-slate-900">{appId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Role:</span>
                <span className="font-semibold text-slate-900">{job.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Company:</span>
                <span className="font-semibold text-slate-900">{job.company}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Expected Review Time:</span>
                <span className="text-emerald-700 font-bold">Within 48 Hours</span>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all"
            >
              Back to Job Board
            </button>
          </div>
        ) : (
          /* 1-Click Apply Form */
          <form onSubmit={handleSubmit} className="p-6 sm:p-8">
            {/* Header info */}
            <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-rose-600 mb-1">
              <Flame className="w-3.5 h-3.5 fill-rose-600" />
              <span>Direct 1-Click Apply • Spot #{currentSpot} of {job.maxApplicants}</span>
            </div>

            <h3 className="text-xl font-black text-slate-900 leading-tight">
              {job.title}
            </h3>

            <div className="flex flex-wrap items-center gap-2 mt-1.5 mb-5 text-xs text-slate-500">
              <span className="font-bold text-slate-700">{job.company}</span>
              <span>•</span>
              <span>{job.location}</span>
              <span>•</span>
              <span className="text-emerald-700 font-bold">{job.salary}</span>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Full Name *</label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="Rahul Sharma"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Email Address *</label>
                  <div className="relative">
                    <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="rahul@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">WhatsApp / Phone</label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Total Experience</label>
                  <select
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none font-medium"
                  >
                    <option value="0-1 years (Fresher)">0-1 years (Fresher)</option>
                    <option value="1-3 years">1-3 years</option>
                    <option value="3-5 years">3-5 years</option>
                    <option value="5+ years">5+ years</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">LinkedIn Profile or GitHub URL</label>
                <div className="relative">
                  <Linkedin className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="url"
                    placeholder="https://linkedin.com/in/yourname or github.com/username"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Resume Link or Quick Summary *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Paste Google Drive / Dropbox resume link OR paste a summary of your key skills and achievements..."
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none text-xs"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">1-Sentence Pitch: Why are you a great fit?</label>
                <input
                  type="text"
                  placeholder="e.g. Built 3 full-stack React/Node apps handling 50k users, excited to solve scheduling infra."
                  value={pitch}
                  onChange={(e) => setPitch(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none text-xs"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md shadow-rose-600/25 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 mt-4"
              >
                <Send className="w-4 h-4" />
                <span>Claim Spot #{currentSpot} & Submit Application</span>
              </button>

              {/* Trust footer & external link fallback */}
              <div className="pt-2 text-center space-y-1">
                <div className="text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Guaranteed Human Review • 48-Hour Feedback Policy</span>
                </div>

                <div className="text-[11px] text-slate-400">
                  Prefer company career portal?{" "}
                  <a
                    href={job.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-600 hover:text-slate-900 underline inline-flex items-center gap-0.5"
                  >
                    <span>Open external site</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
