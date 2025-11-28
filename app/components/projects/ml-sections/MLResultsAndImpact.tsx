'use client';

import React from 'react';
import Image from 'next/image';

interface MLResultsAndImpactProps {
  title: string;
  description: string;
  outcomes: string[];
  businessValue: string[];
  image?: string;
  background?: string;
}

export default function MLResultsAndImpact({
  title,
  description,
  outcomes,
  businessValue,
  image,
  background = 'bg-[#252222]'
}: MLResultsAndImpactProps) {
  return (
    <section className={`${background} py-16 md:py-24 relative`}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 md:mb-12 text-center">
          {title && (
            <h2 className="font-['Bricolage_Grotesque',sans-serif] text-white text-3xl sm:text-4xl mb-5" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
              {title}
            </h2>
          )}
          {description && (
            <p className="font-['Inter',sans-serif] text-white text-lg sm:text-xl max-w-[768px] mx-auto leading-[30px]">
              {description}
            </p>
          )}
        </div>

        {image && (
          <div className="mb-8 flex justify-center">
            <div className="w-full max-w-[1216px]">
              <Image
                src={image}
                alt={title || 'Results'}
                className="w-full rounded-[12px] border border-white"
                width={1216}
                height={600}
              />
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          {/* Quantifiable Outcomes Card */}
          <div className="flex-1 bg-white rounded-[12px] overflow-hidden">
            <div className="p-6 md:p-8 pb-0 pt-8">
              <div className="flex flex-col gap-6 items-center mb-6">
                <div className="bg-blue-100 rounded-[8px] w-12 h-12 flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
                    <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" stroke="#155DFC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </div>
                <h3 className="font-['Bricolage_Grotesque',sans-serif] text-[#191818] text-2xl text-center" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                  Quantifiable Outcomes
                </h3>
              </div>
            </div>
            <div className="p-6 md:p-8">
              <div className="flex flex-col gap-4">
                {outcomes.map((item, index) => (
                  <div key={index} className="flex gap-3 items-start">
                    <div className="shrink-0 mt-0.5">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
                        <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#f7f4ed" />
                        <path clipRule="evenodd" d="M2 12L12 17L22 12L12 7L2 12Z" fill="#191818" fillRule="evenodd" />
                      </svg>
                    </div>
                    <p className="font-['Bricolage_Grotesque',sans-serif] text-[#494848] text-xl leading-[30px]" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Business Value Card */}
          <div className="flex-1 bg-white rounded-[12px] overflow-hidden">
            <div className="p-6 md:p-8 pb-0 pt-8">
              <div className="flex flex-col gap-6 items-center mb-6">
                <div className="bg-[#dcfae6] rounded-[8px] w-12 h-12 flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#079455" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    <path d="M2 17L12 22L22 17" stroke="#079455" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    <path d="M2 12L12 17L22 12" stroke="#079455" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </div>
                <h3 className="font-['Bricolage_Grotesque',sans-serif] text-[#191818] text-2xl text-center" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                  Business Value
                </h3>
              </div>
            </div>
            <div className="p-6 md:p-8">
              <div className="flex flex-col gap-4">
                {businessValue.map((item, index) => (
                  <div key={index} className="flex gap-3 items-start">
                    <div className="shrink-0 mt-0.5">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
                        <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#f7f4ed" />
                        <path clipRule="evenodd" d="M2 12L12 17L22 12L12 7L2 12Z" fill="#191818" fillRule="evenodd" />
                      </svg>
                    </div>
                    <p className="font-['Bricolage_Grotesque',sans-serif] text-[#494848] text-xl leading-[30px]" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                      {item}
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