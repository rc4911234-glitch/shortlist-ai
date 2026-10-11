"use client";

import React, { useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ResumeScanner from "@/components/ResumeScanner";
import ScoreReport from "@/components/ScoreReport";
import PricingSection from "@/components/PricingSection";
import PricingModal from "@/components/PricingModal";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import { ATSAnalysisResult } from "@/lib/atsEngine";

export default function Home() {
  const [analysisResult, setAnalysisResult] = useState<ATSAnalysisResult | null>(null);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState({ name: "24-Hour Job Sprint", price: "₹99" });

  const scannerRef = useRef<HTMLDivElement>(null);
  const reportRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);

  const handleScanComplete = (result: ATSAnalysisResult) => {
    setAnalysisResult(result);
    // Smooth scroll to report
    setTimeout(() => {
      reportRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 150);
  };

  const handleScrollToScanner = () => {
    scannerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScrollToPricing = () => {
    pricingRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleOpenPricing = (planName = "24-Hour Job Sprint", price = "₹99") => {
    setSelectedPlan({ name: planName, price });
    setIsPricingModalOpen(true);
  };

  return (
    <main className="min-h-screen flex flex-col bg-slate-50 selection:bg-blue-600 selection:text-white">
      <Navbar
        onScrollToScanner={handleScrollToScanner}
        onScrollToPricing={handleScrollToPricing}
      />

      <Hero onScrollToScanner={handleScrollToScanner} />

      <ResumeScanner
        onScanComplete={handleScanComplete}
        scannerRef={scannerRef}
      />

      {analysisResult && (
        <ScoreReport
          result={analysisResult}
          onOpenPricing={() => handleOpenPricing("24-Hour Job Sprint", "₹99")}
          reportRef={reportRef}
        />
      )}

      <PricingSection
        onSelectPlan={(name, price) => handleOpenPricing(name, price)}
        pricingRef={pricingRef}
      />

      <Testimonials />

      <Footer />

      <PricingModal
        isOpen={isPricingModalOpen}
        onClose={() => setIsPricingModalOpen(false)}
        planName={selectedPlan.name}
        price={selectedPlan.price}
      />
    </main>
  );
}
