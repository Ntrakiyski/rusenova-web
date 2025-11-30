'use client';

import React from 'react';
import Image from 'next/image';

interface Metric {
  value: string;
  label: string;
  icon?: React.ReactNode;
  iconBg?: string;
  iconSvg?: string;
}

interface MLWhatIBuildProps {
  title?: string;
  description: string;
  metrics: Metric[];
  background?: string;
  bulletPoints?: string[];
}

export default function MLWhatIBuild({
  title,
  description,
  metrics,
  background = 'bg-white',
  bulletPoints
}: MLWhatIBuildProps) {
  // Default icons for common metric types
  const getDefaultIcon = (label: string, iconBg: string = 'bg-[#dcfae6]') => {
    switch(label.toLowerCase()) {
      case 'precision':
        return (
          <div className={`${iconBg} rounded-full w-12 h-12 flex items-center justify-center shrink-0`}>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
              <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#079455" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        );
      case 'recall':
        return (
          <div className="bg-[#f4ebff] rounded-full w-12 h-12 flex items-center justify-center shrink-0">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#7F56D9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        );
      case 'time saved':
      case 'time':
        return (
          <div className="bg-[#fef0c7] rounded-full w-12 h-12 flex items-center justify-center shrink-0">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
              <path d="M12 6V12L16 14M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#DC6803" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        );
      default:
        return (
          <div className={`${iconBg} rounded-full w-12 h-12 flex items-center justify-center shrink-0`}>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
              <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#155DFC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        );
    }
  };

   return (
    <section className={`${background} py-16 md:py-24 lg:py-32 min-h-[760px] xl:min-h-[760px] relative z-10 flex items-center`} style={{ minHeight: '760px' }}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start w-full">
          {/* Text Content - Left Side */}
          <div className="w-full lg:w-1/2">
            {title && (
              <h2 className="font-['Bricolage_Grotesque',sans-serif] text-[#191818] text-2xl sm:text-3xl mb-6" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                {title}
              </h2>
            )}
            <div className="space-y-3">
              {bulletPoints && bulletPoints.map((point, index) => (
                <div key={index} className="flex items-start gap-2 sm:gap-3">
                  <div className="shrink-0 mt-1.5">
                    <div className="w-2 h-2 rounded-full bg-[#f38300]" />
                  </div>
                  <p className="font-['Bricolage_Grotesque',sans-serif] text-[#191818] text-sm sm:text-base" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Metrics Cards - Right Side */}
          <div className="w-full lg:w-1/2">
            {/* Metrics Cards Section */}
            <div className="flex flex-col gap-4 w-full">
              {metrics.map((metric, index) => (
                <div key={index} className="bg-[#F7F4ED] rounded-[16px] p-4 w-full">
                  <div className="flex items-center gap-3 w-full">
                    {metric.icon
                      || (metric.iconSvg ? (
                        <div className={`${metric.iconBg || 'bg-[#dcfae6]'} rounded-full w-12 h-12 flex items-center justify-center shrink-0`}>
                          <div dangerouslySetInnerHTML={{ __html: metric.iconSvg }} />
                        </div>
                      ) : getDefaultIcon(metric.label, metric.iconBg))}
                    <div className="flex-1 min-w-0">
                      <p className="font-['Bricolage_Grotesque',sans-serif] text-[#191818] text-lg sm:text-xl mb-1" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                        {metric.value}
                      </p>
                      <p className="font-['Bricolage_Grotesque',sans-serif] text-[#494848] text-sm sm:text-base truncate" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                        {metric.label}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
