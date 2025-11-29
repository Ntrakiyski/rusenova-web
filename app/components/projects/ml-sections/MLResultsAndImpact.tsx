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
    <section className={`${background} py-16 md:py-24 min-h-[760px] xl:min-h-[760px] relative`} style={{ minHeight: '760px' }}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-full">
        {/* Title and Description Row */}
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

        {/* Image Row */}
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

        {/* Cards Row - Two Columns */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Quantifiable Outcomes Card */}
          <div className="bg-white rounded-[12px] overflow-hidden flex-1">
            <div className="p-4 sm:p-6 pb-0 pt-6 sm:pt-8">
              <div className="flex flex-col gap-4 items-center mb-4 sm:mb-6">
                <div className="bg-blue-100 rounded-[8px] w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
                  <Image
                    src="/file.svg"
                    alt="File icon"
                    width={24}
                    height={24}
                    className="w-5 sm:w-6 h-5 sm:h-6"
                  />
                </div>
                <h3 className="font-['Bricolage_Grotesque',sans-serif] text-[#191818] text-xl sm:text-2xl text-center" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                  Quantifiable Outcomes
                </h3>
              </div>
            </div>
            <div className="p-4 sm:p-6">
              <div className="flex flex-col gap-3 sm:gap-4">
                {outcomes.map((item, index) => (
                  <div key={index} className="flex gap-2 sm:gap-3 items-start">
                    <div className="shrink-0 mt-0.5">
                      <Image
                        src="/file.svg"
                        alt="Bullet point"
                        width={16}
                        height={16}
                        className="w-4 sm:w-5 h-4 sm:h-5"
                      />
                    </div>
                    <p className="font-['Bricolage_Grotesque',sans-serif] text-[#494848] text-base sm:text-xl leading-relaxed" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Business Value Card */}
          <div className="bg-white rounded-[12px] overflow-hidden flex-1">
            <div className="p-4 sm:p-6 pb-0 pt-6 sm:pt-8">
              <div className="flex flex-col gap-4 items-center mb-4 sm:mb-6">
                <div className="bg-[#dcfae6] rounded-[8px] w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
                  <Image
                    src="/file.svg"
                    alt="File icon"
                    width={24}
                    height={24}
                    className="w-5 sm:w-6 h-5 sm:h-6"
                  />
                </div>
                <h3 className="font-['Bricolage_Grotesque',sans-serif] text-[#191818] text-xl sm:text-2xl text-center" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                  Business Value
                </h3>
              </div>
            </div>
            <div className="p-4 sm:p-6">
              <div className="flex flex-col gap-3 sm:gap-4">
                {businessValue.map((item, index) => (
                  <div key={index} className="flex gap-2 sm:gap-3 items-start">
                    <div className="shrink-0 mt-0.5">
                      <Image
                        src="/file.svg"
                        alt="Bullet point"
                        width={16}
                        height={16}
                        className="w-4 sm:w-5 h-4 sm:h-5"
                      />
                    </div>
                    <p className="font-['Bricolage_Grotesque',sans-serif] text-[#494848] text-base sm:text-xl leading-relaxed" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
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
