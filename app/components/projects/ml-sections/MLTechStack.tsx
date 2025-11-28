'use client';

import React from 'react';

interface MLTechStackProps {
  title: string;
  description: string;
  technologies?: string[];
  categories?: string[];
  background?: string;
}

export default function MLTechStack({
  title,
  description,
  technologies = [],
  categories = [],
  background = 'bg-white'
}: MLTechStackProps) {
  return (
    <section className={`${background} py-16 md:py-24 relative z-10`}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading section */}
        <div className="flex flex-col gap-8 mb-16">
          <h2 className="font-['Bricolage_Grotesque',sans-serif] text-[#101828] text-3xl md:text-4xl font-semibold text-center" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
            {title}
          </h2>
          {description && (
            <p className="font-['Bricolage_Grotesque',sans-serif] text-[#494848] text-lg md:text-xl leading-relaxed max-w-[800px] mx-auto text-center" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
              {description}
            </p>
          )}
        </div>

        {/* Tech stack content */}
        <div className="bg-[#f7f4ed] rounded-[24px] overflow-hidden relative w-full max-w-[1216px] mx-auto">
          {/* Background decorative gradient */}
          <div className="absolute right-0 bottom-0 w-[600px] h-[600px] md:w-[1000px] md:h-[1000px] pointer-events-none opacity-50">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1797 1812">
              <g>
                <g filter="url(#filter0_card1)">
                  <path d="M0 0L1796.12 0L1796.12 1811.04L0 1811.04L0 0Z" fill="#8EB2F2" />
                </g>
                <g filter="url(#filter1_card1)">
                  <path d="M69.26 59.658L1747.27 59.658L1747.27 1751.39L69.26 1751.39L69.26 59.658Z" fill="#F28EC1" />
                </g>
                <g filter="url(#filter2_card1)">
                  <path d="M143.84 135.801L1671.9 135.801L1671.9 1676.03L143.84 1676.03L143.84 135.801Z" fill="#F38300" />
                </g>
                <g filter="url(#filter3_card1)">
                  <path d="M233.387 225.414L1583.15 225.414L1583.15 1585.63L233.387 1585.63L233.387 225.414Z" fill="#F44B2F" />
                </g>
              </g>
              <defs>
                <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1811.04" id="filter0_card1" width="1796.12" x="0" y="0">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                  <feGaussianBlur result="effect1_foregroundBlur" stdDeviation="45" />
                </filter>
                <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1691.73" id="filter1_card1" width="1678.01" x="69.26" y="59.658">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                  <feGaussianBlur result="effect1_foregroundBlur" stdDeviation="45" />
                </filter>
                <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1540.23" id="filter2_card1" width="1528.06" x="143.84" y="135.801">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                  <feGaussianBlur result="effect1_foregroundBlur" stdDeviation="45" />
                </filter>
                <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1360.22" id="filter3_card1" width="1349.76" x="233.387" y="225.414">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                  <feGaussianBlur result="effect1_foregroundBlur" stdDeviation="45" />
                </filter>
              </defs>
            </svg>
          </div>

          <div className="relative z-10 p-8 md:p-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Technologies section */}
              {technologies.length > 0 && (
                <div className="col-span-1 md:col-span-2 lg:col-span-4">
                  <h3 className="font-['Inter',sans-serif] text-lg font-semibold text-[#191818] mb-6">
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {technologies.map((tech, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 border border-[#DDDDDD] rounded-lg shadow-sm bg-white"
                      >
                        <span className="font-['Inter',sans-serif] text-sm font-semibold text-[#191818]">
                          {tech}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Categories section */}
              {categories.length > 0 && (
                <div className="col-span-1 md:col-span-2 lg:col-span-4">
                  <h3 className="font-['Inter',sans-serif] text-lg font-semibold text-[#191818] mb-6">
                    Categories
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {categories.map((category, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 border border-[#DDDDDD] rounded-lg shadow-sm bg-white"
                      >
                        <span className="font-['Inter',sans-serif] text-sm font-semibold text-[#191818]">
                          {category}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}