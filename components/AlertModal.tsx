"use client";

import React, { useState } from "react";
import { X, Bell, Check, Sparkles, Shield, Send, CheckCircle2 } from "lucide-react";
import confetti from "canvas-confetti";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AlertModal({ isOpen, onClose }: AlertModalProps) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("Engineering");
  const [isJoined, setIsJoined] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Post to backend API
    fetch("/api/alerts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, phone, role })
    }).catch(console.error);

    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 }
    });

    setIsJoined(true);
    setTimeout(() => {
      setIsJoined(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {isJoined ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-slate-900">Alerts Activated!</h3>
            <p className="text-slate-600 text-xs mt-2">
              You will be notified within 60 seconds whenever a new 50-cap role in <b>{role}</b> drops.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">
              <Bell className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>Speed is everything</span>
            </div>
            
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">
              Get Notified in 60s
            </h3>
            
            <p className="text-slate-600 text-xs mt-1.5 leading-relaxed">
              Jobs close after 50 applicants. Our alert bot pings you immediately so you can be in the <b>first 10 applications</b> that recruiters actually open.
            </p>

            <div className="space-y-3.5 my-6 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Your Email *</label>
                <input
                  type="email"
                  required
                  placeholder="you@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">WhatsApp Number (Optional for instant WhatsApp ping)</label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Role Preference</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none font-medium"
                >
                  <option value="Engineering">💻 Software & Engineering</option>
                  <option value="Design">🎨 UI/UX & Design</option>
                  <option value="Marketing">📈 Growth & Marketing</option>
                  <option value="Product">💼 Product Management</option>
                  <option value="Freshers">🚀 Freshers & Entry Level (0-2 Yrs)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4 text-rose-400" />
              <span>Turn On Free Instant Alerts</span>
            </button>

            <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              <span>Zero Spam. Unsubscribe with 1-click anytime.</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
