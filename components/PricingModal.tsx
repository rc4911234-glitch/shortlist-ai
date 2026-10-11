"use client";

import React, { useState } from "react";
import { X, CheckCircle2, ShieldCheck, Zap, QrCode, CreditCard, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
  price: string;
}

export default function PricingModal({ isOpen, onClose, planName, price }: PricingModalProps) {
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<"upi" | "card">("upi");

  if (!isOpen) return null;

  const handleSimulatePayment = () => {
    // Fire celebratory confetti!
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    setPaymentSuccess(true);
  };

  const handleReset = () => {
    setPaymentSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden relative">
        
        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {paymentSuccess ? (
          /* Payment Success State */
          <div className="p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Payment Successful!</h3>
            <p className="text-slate-600 text-sm mt-2">
              You now have <strong>Unlimited Pro Access</strong> to AI resume tailoring and Workday-ready exports.
            </p>
            <div className="my-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-left text-xs text-emerald-800 space-y-1.5">
              <div className="font-semibold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Active Plan: {planName}</span>
              </div>
              <div>Transaction ID: SL-{Math.floor(100000 + Math.random() * 900000)}</div>
              <div>Valid for: Next 24 Hours</div>
            </div>
            <button
              onClick={handleReset}
              className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all"
            >
              Start Optimizing Resumes Now
            </button>
          </div>
        ) : (
          /* Checkout Modal State */
          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
              <Zap className="w-4 h-4" />
              <span>Instant Pro Checkout</span>
            </div>
            
            <h3 className="text-2xl font-bold text-slate-900">
              Unlock {planName}
            </h3>
            
            <div className="flex items-baseline gap-2 mt-2 pb-5 border-b border-slate-100">
              <span className="text-3xl font-extrabold text-slate-900">{price}</span>
              <span className="text-xs text-slate-500">one-time immediate activation</span>
            </div>

            {/* Payment Method Selector */}
            <div className="grid grid-cols-2 gap-2 my-5">
              <button
                type="button"
                onClick={() => setSelectedMethod("upi")}
                className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                  selectedMethod === "upi"
                    ? "border-blue-600 bg-blue-50/50 text-blue-700 shadow-sm"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                <QrCode className="w-4 h-4 text-blue-600" />
                <span>UPI (GPay/PhonePe)</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMethod("card")}
                className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                  selectedMethod === "card"
                    ? "border-blue-600 bg-blue-50/50 text-blue-700 shadow-sm"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                <CreditCard className="w-4 h-4 text-indigo-600" />
                <span>Cards / NetBanking</span>
              </button>
            </div>

            {/* Payment Preview Container */}
            {selectedMethod === "upi" ? (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center mb-6">
                <div className="w-32 h-32 mx-auto bg-white p-2 rounded-xl border border-slate-300 flex items-center justify-center shadow-inner mb-2">
                  <div className="flex flex-col items-center">
                    <QrCode className="w-20 h-20 text-slate-800" />
                    <span className="text-[10px] text-slate-400 mt-1">Scan via any UPI app</span>
                  </div>
                </div>
                <div className="text-xs font-medium text-slate-700">UPI ID: shortlistai@upi</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Instant activation after scan</div>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5 mb-6 text-left">
                <div>
                  <label className="text-[11px] text-slate-500 font-medium">Card Number</label>
                  <input
                    type="text"
                    placeholder="4111 •••• •••• 4242"
                    readOnly
                    value="•••• •••• •••• 8912"
                    className="w-full text-xs font-mono p-2 rounded-lg border border-slate-200 bg-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] text-slate-500 font-medium">Expiry</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      readOnly
                      value="12/28"
                      className="w-full text-xs font-mono p-2 rounded-lg border border-slate-200 bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-500 font-medium">CVV</label>
                    <input
                      type="text"
                      placeholder="CVV"
                      readOnly
                      value="•••"
                      className="w-full text-xs font-mono p-2 rounded-lg border border-slate-200 bg-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Pay Button */}
            <button
              onClick={handleSimulatePayment}
              className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <span>Complete Payment of {price}</span>
            </button>

            <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>256-Bit SSL Encrypted • Razorpay & Stripe Ready</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
