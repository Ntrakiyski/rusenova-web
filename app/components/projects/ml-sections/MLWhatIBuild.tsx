'use client';

import React from 'react';
import Image from 'next/image';

interface Metric {
  value: string;
  label: string;
  icon?: React.ReactNode;
  iconBg?: string;
}

interface MLWhatIBuildProps {
  description: string;
  metrics: Metric[];
  background?: string;
}

export default function MLWhatIBuild({
  description,
  metrics,
  background = 'bg-white'
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
    <section className={`${background} py-16 md:py-24 lg:py-32 relative z-10`}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
          {/* Description */}
          <div className="flex-1">
            <p className="font-['Bricolage_Grotesque',sans-serif] text-[#494848] text-lg sm:text-xl leading-relaxed" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
              {description}
            </p>
          </div>

          {/* Metrics Cards */}
          <div className="flex-1 w-full">
            <div className="flex flex-col gap-6">
              {metrics.map((metric, index) => (
                <div key={index} className="bg-white border border-[#dddddd] rounded-[16px] p-6">
                  <div className="flex items-center gap-5">
                    {metric.icon || getDefaultIcon(metric.label, metric.iconBg)}
                    <div className="flex-1">
                      <p className="font-['Bricolage_Grotesque',sans-serif] text-[#191818] text-xl mb-2" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                        {metric.value}
                      </p>
                      <p className="font-['Bricolage_Grotesque',sans-serif] text-[#494848]" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
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