'use client';

import React from 'react';

interface PerformanceMetric {
  name: string;
  value: string;
  description: string;
  details?: string;
  isHighlighted?: boolean;
}

interface MLTechnicalPerformanceProps {
  title: string;
  description?: string;
  metrics: PerformanceMetric[];
  background?: string;
}

export default function MLTechnicalPerformance({
  title,
  description,
  metrics,
  background = 'bg-white'
}: MLTechnicalPerformanceProps) {
  // Find highlighted metrics for the right column
  const highlightedMetrics = metrics.filter(metric => metric.isHighlighted);
  const leftMetrics = metrics.filter(metric => !metric.isHighlighted);

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
                <g filter="url(#filter0_performance)">
                  <path d="M0 0L1796.12 0L1796.12 1811.04L0 1811.04L0 0Z" fill="#8EB2F2" />
                </g>
                <g filter="url(#filter1_performance)">
                  <path d="M69.26 59.658L1747.27 59.658L1747.27 1751.39L69.26 1751.39L69.26 59.658Z" fill="#F28EC1" />
                </g>
                <g filter="url(#filter2_performance)">
                  <path d="M143.84 135.801L1671.9 135.801L1671.9 1676.03L143.84 1676.03L143.84 135.801Z" fill="#F38300" />
                </g>
                <g filter="url(#filter3_performance)">
                  <path d="M233.387 225.414L1583.15 225.414L1583.15 1585.63L233.387 1585.63L233.387 225.414Z" fill="#F44B2F" />
                </g>
              </g>
              <defs>
                <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1811.04" id="filter0_performance" width="1796.12" x="0" y="0">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                  <feGaussianBlur result="effect1_foregroundBlur" stdDeviation="45" />
                </filter>
                <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1691.73" id="filter1_performance" width="1678.01" x="69.26" y="59.658">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                  <feGaussianBlur result="effect1_foregroundBlur" stdDeviation="45" />
                </filter>
                <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1540.23" id="filter2_performance" width="1528.06" x="143.84" y="135.801">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                  <feGaussianBlur result="effect1_foregroundBlur" stdDeviation="45" />
                </filter>
                <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1360.22" id="filter3_performance" width="1349.76" x="233.387" y="225.414">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                  <feGaussianBlur result="effect1_foregroundBlur" stdDeviation="45" />
                </filter>
              </defs>
            </svg>
          </div>

          <div className="relative z-10 p-8 md:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Metrics List */}
              <div className="lg:col-span-2 space-y-8">
                {leftMetrics.map((metric, index) => (
                  <div key={index} className="flex items-start justify-between gap-8">
                    <div className="flex-1">
                      <h3 className="font-['Bricolage_Grotesque',sans-serif] text-[#191818] text-xl font-semibold mb-2" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                        {metric.name}
                      </h3>
                      <p className="font-['Bricolage_Grotesque',sans-serif] text-[#494848] text-base" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                        {metric.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="font-['Bricolage_Grotesque',sans-serif] text-[#155DFC] text-3xl font-bold" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                        {metric.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Column - Highlighted Metrics */}
              <div className="space-y-8">
                {highlightedMetrics.map((metric, index) => (
                  <div key={index} className="bg-white rounded-[16px] p-6 border border-[#dddddd]">
                    <h3 className="font-['Bricolage_Grotesque',sans-serif] text-[#191818] text-xl font-semibold mb-4" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                      {metric.name}
                    </h3>
                    <div className="font-['Bricolage_Grotesque',sans-serif] text-[#155DFC] text-3xl font-bold mb-4" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                      {metric.value}
                    </div>
                    <p className="font-['Bricolage_Grotesque',sans-serif] text-[#494848] text-base" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                      {metric.details || metric.description}
                    </p>
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