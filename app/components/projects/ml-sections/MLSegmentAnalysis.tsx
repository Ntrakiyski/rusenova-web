'use client';

import React from 'react';

interface SegmentMetric {
  name: string;
  value: string;
}

interface Segment {
  name: string;
  metrics: SegmentMetric[];
}

interface MLSegmentAnalysisProps {
  title: string;
  description: string;
  segments: Segment[];
  background?: string;
}

export default function MLSegmentAnalysis({
  title,
  description,
  segments,
  background = 'bg-black'
}: MLSegmentAnalysisProps) {
  const strengths = segments.find(s => s.name === "Strengths")?.metrics || [];
  const weaknesses = segments.find(s => s.name === "Weaknesses")?.metrics || [];

  return (
    <section className={`${background} py-16 md:py-24 relative z-10`}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          {title && (
            <h2 className="font-['Bricolage_Grotesque',sans-serif] text-white text-3xl sm:text-4xl mb-5" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
              {title}
            </h2>
          )}
          {description && (
            <p className="font-['Bricolage_Grotesque',sans-serif] text-white text-lg sm:text-xl max-w-[768px]" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
              {description}
            </p>
          )}
        </div>

        <div className="bg-black overflow-hidden w-full">
          <div className="grid grid-cols-1 gap-8">
            {/* Left Column - Strengths */}
            <div>
              <h3 className="font-['Bricolage_Grotesque',sans-serif] text-white text-xl sm:text-2xl font-bold mb-6" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                Strengths:
              </h3>
              <div className="space-y-3">
                {strengths.map((point, index) => (
                  <div key={index} className="font-['Bricolage_Grotesque',sans-serif] text-white text-base sm:text-lg leading-relaxed" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                    {point.name}: {point.value}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Weaknesses */}
            <div>
              <h3 className="font-['Bricolage_Grotesque',sans-serif] text-white text-xl sm:text-2xl font-bold mb-6" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                Weaknesses:
              </h3>
              <div className="space-y-3">
                {weaknesses.map((point, index) => (
                  <div key={index} className="font-['Bricolage_Grotesque',sans-serif] text-white text-base sm:text-lg leading-relaxed" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                    {point.name}: {point.value}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
