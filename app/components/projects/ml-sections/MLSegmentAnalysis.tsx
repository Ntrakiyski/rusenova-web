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
  background = 'bg-bg-dark'
}: MLSegmentAnalysisProps) {
  const strengths = segments.find(s => s.name === "Strengths")?.metrics || [];
  const weaknesses = segments.find(s => s.name === "Weaknesses")?.metrics || [];

  return (
    <section className={`${background} py-16 md:py-24 min-h-[760px] xl:min-h-[760px] relative z-10 flex items-center`} style={{ minHeight: '760px' }}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="mb-12 w-full">
          {title && (
            <h2 className="font-bricolage text-text-white text-display-md font-semibold mb-5">
              {title}
            </h2>
          )}
          {description && (
            <p className="font-bricolage text-text-white text-text-xl-regular max-w-[768px]">
              {description}
            </p>
          )}
        </div>

        <div className="bg-bg-dark overflow-hidden w-full">
          <div className="grid grid-cols-1 gap-8">
            {/* Left Column - Strengths */}
            <div>
              <h3 className="font-bricolage text-text-white text-display-xs font-bold mb-6">
                Strengths:
              </h3>
              <div className="space-y-3">
                {strengths.map((point, index) => (
                  <div key={index} className="font-bricolage text-text-white text-text-lg-regular leading-relaxed">
                    {point.name}: {point.value}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Weaknesses */}
            <div>
              <h3 className="font-bricolage text-text-white text-display-xs font-bold mb-6">
                Weaknesses:
              </h3>
              <div className="space-y-3">
                {weaknesses.map((point, index) => (
                  <div key={index} className="font-bricolage text-text-white text-text-lg-regular leading-relaxed">
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
