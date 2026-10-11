"use client";

import React from "react";
import { Search, SlidersHorizontal, MapPin, Zap, Heart } from "lucide-react";
import { JobCategory, ExperienceFilter, CurrencyFilter } from "@/lib/types";

interface FilterBarProps {
  selectedCategory: JobCategory;
  onSelectCategory: (cat: JobCategory) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  sortBy: "latest" | "urgency" | "salary";
  onSortChange: (sort: "latest" | "urgency" | "salary") => void;
  experienceFilter: ExperienceFilter;
  onExperienceFilterChange: (exp: ExperienceFilter) => void;
  currencyFilter: CurrencyFilter;
  onCurrencyFilterChange: (curr: CurrencyFilter) => void;
  showSavedOnly: boolean;
  onToggleShowSavedOnly: () => void;
  savedCount: number;
  totalCount: number;
}

export default function FilterBar({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  experienceFilter,
  onExperienceFilterChange,
  currencyFilter,
  onCurrencyFilterChange,
  showSavedOnly,
  onToggleShowSavedOnly,
  savedCount,
  totalCount
}: FilterBarProps) {
  const categories: { label: JobCategory; icon: string }[] = [
    { label: "All", icon: "🔥" },
    { label: "Engineering", icon: "💻" },
    { label: "Design", icon: "🎨" },
    { label: "Marketing", icon: "📈" },
    { label: "Freshers", icon: "🚀 0-2 Yrs" },
    { label: "Remote Worldwide", icon: "🌍" },
  ];

  return (
    <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 py-3.5 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Search & Sort Controls */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-3 mb-3">
          <div className="relative w-full lg:max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by title, skill, or company (e.g. Next.js, Python, Razorpay)..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all placeholder:text-slate-400"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between w-full lg:w-auto gap-2.5 text-xs">
            {/* Experience filter dropdown */}
            <select
              value={experienceFilter}
              onChange={(e) => onExperienceFilterChange(e.target.value as ExperienceFilter)}
              className="px-2.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-semibold outline-none text-xs"
            >
              <option value="All">All Experience</option>
              <option value="Freshers (0-2 Yrs)">Freshers (0-2 Yrs)</option>
              <option value="Mid-Level (2-5 Yrs)">Mid-Level (2-5 Yrs)</option>
              <option value="Senior (5+ Yrs)">Senior (5+ Yrs)</option>
            </select>

            {/* Currency toggle */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => onCurrencyFilterChange("All")}
                className={`px-2 py-1 rounded-lg font-bold text-[11px] transition-all ${
                  currencyFilter === "All" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800"
                }`}
              >
                All
              </button>
              <button
                onClick={() => onCurrencyFilterChange("INR")}
                className={`px-2 py-1 rounded-lg font-bold text-[11px] transition-all ${
                  currencyFilter === "INR" ? "bg-white text-emerald-700 shadow-sm" : "text-slate-500 hover:text-slate-800"
                }`}
              >
                ₹ INR
              </button>
              <button
                onClick={() => onCurrencyFilterChange("USD")}
                className={`px-2 py-1 rounded-lg font-bold text-[11px] transition-all ${
                  currencyFilter === "USD" ? "bg-white text-blue-700 shadow-sm" : "text-slate-500 hover:text-slate-800"
                }`}
              >
                $ USD
              </button>
            </div>

            {/* Saved Jobs Bookmark filter */}
            <button
              onClick={onToggleShowSavedOnly}
              className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all ${
                showSavedOnly
                  ? "bg-rose-600 text-white shadow-sm"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-700"
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${showSavedOnly ? "fill-white" : ""}`} />
              <span>Saved ({savedCount})</span>
            </button>

            {/* Sort Toggle */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => onSortChange("latest")}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                  sortBy === "latest" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Latest
              </button>
              <button
                onClick={() => onSortChange("urgency")}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                  sortBy === "urgency" ? "bg-white text-rose-600 shadow-sm" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                ⚡ Almost Full
              </button>
            </div>
          </div>
        </div>

        {/* Category Pills (RemoteOK Style) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.label}
              onClick={() => onSelectCategory(cat.label)}
              className={`shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                selectedCategory === cat.label
                  ? "bg-slate-900 text-white shadow-sm scale-[1.02]"
                  : "bg-slate-100/80 hover:bg-slate-200 text-slate-700 hover:text-slate-900"
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}
