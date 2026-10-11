import React from "react";
import { Star, CheckCircle } from "lucide-react";

export default function Testimonials() {
  const reviews = [
    {
      name: "Aman Verma",
      role: "Frontend Engineer at Swiggy",
      comment: "I applied to 40 jobs with zero replies. ShortlistAI pointed out I was missing Docker, Next.js, and CI/CD from my resume keywords. Added them, got 3 interview calls the following week!",
      rating: 5,
    },
    {
      name: "Pooja Hegde",
      role: "Product Analyst at FinTech Co",
      comment: "Jobscan was asking for $49/month which is insane. ₹99 for a day pass on ShortlistAI was the best investment ever. Rewrote my bullet points using the STAR suggestions.",
      rating: 5,
    },
    {
      name: "David Miller",
      role: "Full Stack Developer (USA)",
      comment: "Super fast ATS breakdown. The missing keyword chips and quantifiable metric checks are pure gold. Took my resume from 52% to 91% match.",
      rating: 5,
    },
  ];

  return (
    <section className="py-16 bg-white border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h3 className="text-2xl font-bold text-slate-900">
            Trusted by Job Seekers Getting Hired Globally
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Candidates who optimized their resume with ShortlistAI received 3.5x more interview invitations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div key={i} className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(r.rating)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "{r.comment}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900">{r.name}</div>
                  <div className="text-[11px] text-slate-500">{r.role}</div>
                </div>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 font-medium flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Verified Hire
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
