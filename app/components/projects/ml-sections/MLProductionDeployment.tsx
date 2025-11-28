'use client';

import React from 'react';

interface DeploymentStep {
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'pending';
  timeline?: string;
}

interface MLProductionDeploymentProps {
  title: string;
  description: string;
  steps: DeploymentStep[];
  background?: string;
}

export default function MLProductionDeployment({
  title,
  description,
  steps,
  background = 'bg-white'
}: MLProductionDeploymentProps) {
  // Get status indicator styles
  const getStatusIndicator = (status: 'completed' | 'in-progress' | 'pending') => {
    const statusStyles = {
      completed: 'bg-green-500',
      'in-progress': 'bg-blue-500',
      pending: 'bg-gray-300'
    };

    const statusText = {
      completed: 'Completed',
      'in-progress': 'In Progress',
      pending: 'Pending'
    };

    return (
      <div className="flex items-center gap-2">
        <div className={`w-3 h-3 rounded-full ${statusStyles[status]}`} />
        <span className="text-sm font-medium">{statusText[status]}</span>
      </div>
    );
  };

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
                <g filter="url(#filter0_deployment)">
                  <path d="M0 0L1796.12 0L1796.12 1811.04L0 1811.04L0 0Z" fill="#8EB2F2" />
                </g>
                <g filter="url(#filter1_deployment)">
                  <path d="M69.26 59.658L1747.27 59.658L1747.27 1751.39L69.26 1751.39L69.26 59.658Z" fill="#F28EC1" />
                </g>
                <g filter="url(#filter2_deployment)">
                  <path d="M143.84 135.801L1671.9 135.801L1671.9 1676.03L143.84 1676.03L143.84 135.801Z" fill="#F38300" />
                </g>
                <g filter="url(#filter3_deployment)">
                  <path d="M233.387 225.414L1583.15 225.414L1583.15 1585.63L233.387 1585.63L233.387 225.414Z" fill="#F44B2F" />
                </g>
              </g>
              <defs>
                <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1811.04" id="filter0_deployment" width="1796.12" x="0" y="0">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                  <feGaussianBlur result="effect1_foregroundBlur" stdDeviation="45" />
                </filter>
                <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1691.73" id="filter1_deployment" width="1678.01" x="69.26" y="59.658">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                  <feGaussianBlur result="effect1_foregroundBlur" stdDeviation="45" />
                </filter>
                <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1540.23" id="filter2_deployment" width="1528.06" x="143.84" y="135.801">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                  <feGaussianBlur result="effect1_foregroundBlur" stdDeviation="45" />
                </filter>
                <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1360.22" id="filter3_deployment" width="1349.76" x="233.387" y="225.414">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                  <feGaussianBlur result="effect1_foregroundBlur" stdDeviation="45" />
                </filter>
              </defs>
            </svg>
          </div>

          <div className="relative z-10 p-8 md:p-16">
            <div className="space-y-8">
              {steps.map((step, index) => (
                <div key={index} className="flex items-start gap-6">
                  {/* Step indicator */}
                  <div className="shrink-0 flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-white border-2 border-[#dddddd] flex items-center justify-center mb-2">
                      <span className="font-['Bricolage_Grotesque',sans-serif] text-[#191818] font-semibold" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                        {index + 1}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div className="w-0.5 h-full bg-[#dddddd]" />
                    )}
                  </div>

                  {/* Step content */}
                  <div className="flex-1 pt-1">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-['Bricolage_Grotesque',sans-serif] text-[#191818] text-xl font-semibold" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                        {step.title}
                      </h3>
                      {getStatusIndicator(step.status)}
                    </div>
                    <p className="font-['Bricolage_Grotesque',sans-serif] text-[#494848] text-base mb-2" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                      {step.description}
                    </p>
                    {step.timeline && (
                      <p className="font-['Bricolage_Grotesque',sans-serif] text-[#6b7280] text-sm" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                        {step.timeline}
                      </p>
                    )}
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