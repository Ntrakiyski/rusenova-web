'use client';

import React from 'react';

interface SegmentMetric {
  name: string;
  value: string;
}

interface Segment {
  name: string;
  metrics: SegmentMetric[];
  insights?: string[];
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
  background = 'bg-white'
}: MLSegmentAnalysisProps) {
  return (
    <section className={`${background} py-16 md:py-24 relative z-10`}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          {title && (
            <h2 className="font-['Bricolage_Grotesque',sans-serif] text-[#101828] text-3xl sm:text-4xl mb-5" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
              {title}
            </h2>
          )}
          {description && (
            <p className="font-['Bricolage_Grotesque',sans-serif] text-[#494848] text-lg sm:text-xl max-w-[768px]" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
              {description}
            </p>
          )}
        </div>

        <div className="bg-[#f7f4ed] rounded-[24px] overflow-hidden relative w-full">
          {/* Background decorative gradient */}
          <div className="absolute right-0 bottom-0 w-[600px] h-[600px] md:w-[1000px] md:h-[1000px] pointer-events-none opacity-50">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1797 1812">
              <g>
                <g filter="url(#filter0_segment)">
                  <path d="M0 0L1796.12 0L1796.12 1811.04L0 1811.04L0 0Z" fill="#8EB2F2" />
                </g>
                <g filter="url(#filter1_segment)">
                  <path d="M69.26 59.658L1747.27 59.658L1747.27 1751.39L69.26 1751.39L69.26 59.658Z" fill="#F28EC1" />
                </g>
                <g filter="url(#filter2_segment)">
                  <path d="M143.84 135.801L1671.9 135.801L1671.9 1676.03L143.84 1676.03L143.84 135.801Z" fill="#F38300" />
                </g>
                <g filter="url(#filter3_segment)">
                  <path d="M233.387 225.414L1583.15 225.414L1583.15 1585.63L233.387 1585.63L233.387 225.414Z" fill="#F44B2F" />
                </g>
              </g>
              <defs>
                <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1811.04" id="filter0_segment" width="1796.12" x="0" y="0">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                  <feGaussianBlur result="effect1_foregroundBlur" stdDeviation="45" />
                </filter>
                <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1691.73" id="filter1_segment" width="1678.01" x="69.26" y="59.658">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                  <feGaussianBlur result="effect1_foregroundBlur" stdDeviation="45" />
                </filter>
                <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1540.23" id="filter2_segment" width="1528.06" x="143.84" y="135.801">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                  <feGaussianBlur result="effect1_foregroundBlur" stdDeviation="45" />
                </filter>
                <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1360.22" id="filter3_segment" width="1349.76" x="233.387" y="225.414">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                  <feGaussianBlur result="effect1_foregroundBlur" stdDeviation="45" />
                </filter>
              </defs>
            </svg>
          </div>

          <div className="relative z-10 p-8 md:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Segment List */}
              <div className="lg:col-span-1 space-y-6">
                {segments.map((segment, index) => (
                  <div key={index} className="bg-white rounded-[12px] p-4 border border-[#dddddd]">
                    <h3 className="font-['Bricolage_Grotesque',sans-serif] text-[#191818] text-lg font-semibold mb-3" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                      {segment.name}
                    </h3>
                    <div className="space-y-2">
                      {segment.metrics.map((metric, metricIndex) => (
                        <div key={metricIndex} className="flex justify-between items-center">
                          <span className="font-['Bricolage_Grotesque',sans-serif] text-[#494848] text-sm" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                            {metric.name}
                          </span>
                          <span className="font-['Bricolage_Grotesque',sans-serif] text-[#191818] font-semibold text-sm" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                            {metric.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Column - Insights */}
              <div className="lg:col-span-2 space-y-8">
                {segments.map((segment, index) => (
                  segment.insights && segment.insights.length > 0 && (
                    <div key={index} className="bg-white rounded-[16px] p-6 border border-[#dddddd]">
                      <h3 className="font-['Bricolage_Grotesque',sans-serif] text-[#191818] text-xl font-semibold mb-4" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                        {segment.name} Insights
                      </h3>
                      <div className="space-y-4">
                        {segment.insights.map((insight, insightIndex) => (
                          <div key={insightIndex} className="flex items-start gap-3">
                            <div className="shrink-0 mt-1">
                              <div className="w-2 h-2 rounded-full bg-[#155DFC]" />
                            </div>
                            <p className="font-['Bricolage_Grotesque',sans-serif] text-[#494848] text-base" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                              {insight}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}