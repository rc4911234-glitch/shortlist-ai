"use client";

import React, { useState, useEffect } from "react";
import { X, CheckCircle2, Clock, Building2, ExternalLink, Briefcase } from "lucide-react";

interface MyApplicationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface StoredApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  appliedAt: string;
  fullName: string;
  email: string;
}

export default function MyApplicationsModal({ isOpen, onClose }: MyApplicationsModalProps) {
  const [applications, setApplications] = useState<StoredApplication[]>([]);

  useEffect(() => {
    if (isOpen) {
      try {
        const stored = localStorage.getItem("my_submitted_applications");
        if (stored) {
          setApplications(JSON.parse(stored));
        }
      } catch (err) {
        console.error(err);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden relative max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900">My 1-Click Applications</h3>
              <p className="text-xs text-slate-500">Track all your submitted 50-cap role applications</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-6 overflow-y-auto space-y-3.5 flex-1 text-xs">
          {applications.length > 0 ? (
            applications.map((app, i) => (
              <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all">
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div>
                    <span className="font-extrabold text-sm text-slate-900 block">{app.jobTitle}</span>
                    <span className="text-slate-500 font-semibold">{app.company}</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Delivered</span>
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>ID: {app.id}</span>
                  <span>Applied: {app.appliedAt}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-slate-400">
              <Clock className="w-10 h-10 mx-auto mb-2 opacity-40" />
              <p className="font-semibold text-slate-700">No applications submitted yet.</p>
              <p className="text-[11px] mt-1 text-slate-500">
                Click "1-Click Apply" on any job to claim your spot in under 30 seconds!
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 text-center text-[11px] text-slate-500">
          All applications guarantee a review within 48 hours by the hiring lead.
        </div>
      </div>
    </div>
  );
}
