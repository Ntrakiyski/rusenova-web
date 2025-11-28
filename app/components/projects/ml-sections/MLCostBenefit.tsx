'use client';

import React from 'react';

interface CostBenefitItem {
  description: string;
  cost: string | number;
  benefit: string | number;
  roi?: string;
  isHighlighted?: boolean;
}

interface MLCostBenefitProps {
  title: string;
  description: string;
  items: CostBenefitItem[];
  background?: string;
}

export default function MLCostBenefit({
  title,
  description,
  items,
  background = 'bg-white'
}: MLCostBenefitProps) {
  // Calculate ROI if not provided
  const calculateROI = (cost: string | number, benefit: string | number) => {
    if (typeof cost === 'string' || typeof benefit === 'string') return 'N/A';

    const costNum = parseFloat(cost.toString().replace(/[^0-9.-]/g, ''));
    const benefitNum = parseFloat(benefit.toString().replace(/[^0-9.-]/g, ''));

    if (isNaN(costNum) || isNaN(benefitNum) || costNum === 0) return 'N/A';

    const roi = ((benefitNum - costNum) / costNum) * 100;
    return `${roi.toFixed(1)}%`;
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
                <g filter="url(#filter0_cost_benefit)">
                  <path d="M0 0L1796.12 0L1796.12 1811.04L0 1811.04L0 0Z" fill="#8EB2F2" />
                </g>
                <g filter="url(#filter1_cost_benefit)">
                  <path d="M69.26 59.658L1747.27 59.658L1747.27 1751.39L69.26 1751.39L69.26 59.658Z" fill="#F28EC1" />
                </g>
                <g filter="url(#filter2_cost_benefit)">
                  <path d="M143.84 135.801L1671.9 135.801L1671.9 1676.03L143.84 1676.03L143.84 135.801Z" fill="#F38300" />
                </g>
                <g filter="url(#filter3_cost_benefit)">
                  <path d="M233.387 225.414L1583.15 225.414L1583.15 1585.63L233.387 1585.63L233.387 225.414Z" fill="#F44B2F" />
                </g>
              </g>
              <defs>
                <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1811.04" id="filter0_cost_benefit" width="1796.12" x="0" y="0">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                  <feGaussianBlur result="effect1_foregroundBlur" stdDeviation="45" />
                </filter>
                <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1691.73" id="filter1_cost_benefit" width="1678.01" x="69.26" y="59.658">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                  <feGaussianBlur result="effect1_foregroundBlur" stdDeviation="45" />
                </filter>
                <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1540.23" id="filter2_cost_benefit" width="1528.06" x="143.84" y="135.801">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                  <feGaussianBlur result="effect1_foregroundBlur" stdDeviation="45" />
                </filter>
                <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1360.22" id="filter3_cost_benefit" width="1349.76" x="233.387" y="225.414">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                  <feGaussianBlur result="effect1_foregroundBlur" stdDeviation="45" />
                </filter>
              </defs>
            </svg>
          </div>

          <div className="relative z-10 p-8 md:p-16">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="border-b border-[#dddddd]">
                    <th className="text-left py-4 px-4 font-['Bricolage_Grotesque',sans-serif] text-[#191818] font-semibold" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                      Description
                    </th>
                    <th className="text-left py-4 px-4 font-['Bricolage_Grotesque',sans-serif] text-[#191818] font-semibold" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                      Cost
                    </th>
                    <th className="text-left py-4 px-4 font-['Bricolage_Grotesque',sans-serif] text-[#191818] font-semibold" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                      Benefit
                    </th>
                    <th className="text-left py-4 px-4 font-['Bricolage_Grotesque',sans-serif] text-[#191818] font-semibold" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                      ROI
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => {
                    const roi = item.roi || calculateROI(item.cost, item.benefit);
                    const rowClass = item.isHighlighted
                      ? 'bg-[#fef6e6] border-b border-[#f0f0f0]'
                      : 'border-b border-[#f0f0f0]';

                    return (
                      <tr key={index} className={rowClass}>
                        <td className="py-4 px-4 font-['Bricolage_Grotesque',sans-serif] text-[#191818] font-medium" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                          {item.description}
                        </td>
                        <td className="py-4 px-4 font-['Bricolage_Grotesque',sans-serif] text-[#494848]" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                          {item.cost}
                        </td>
                        <td className="py-4 px-4 font-['Bricolage_Grotesque',sans-serif] text-[#494848]" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                          {item.benefit}
                        </td>
                        <td className="py-4 px-4 font-['Bricolage_Grotesque',sans-serif] text-[#494848] font-semibold" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                          {roi}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}