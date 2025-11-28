'use client';

import React from 'react';
import Image from 'next/image';

interface PDTelenorFeature {
  title: string;
  description: string;
}

interface PDTelenorIntroProps {
  title: string;
  features: PDTelenorFeature[];
}

export default function PDTelenorIntro({ title, features }: PDTelenorIntroProps) {
  // Find the testimonial feature
  const testimonialFeature = features.find(feature => feature.title === "Telenor");
  const serviceDesignFeature = features.find(feature => feature.title === "Service Design");

  return (
    <div className="bg-white box-border content-stretch flex flex-col gap-[64px] items-center px-0 py-[96px] relative size-full">
      <div className="max-w-[1280px] relative shrink-0 w-full px-[32px]">
        {/* First Row: Content on Left, Image on Right */}
        <div className="box-border content-stretch flex gap-[64px] items-center relative w-full mb-[64px]">
          {/* Left Column - Content */}
          <div className="basis-0 content-center flex flex-col gap-[48px] grow items-start max-w-[50%] min-h-px min-w-px relative shrink-0">
            {/* Service Design Text */}
            <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
              <p className="font-['Bricolage_Grotesque:SemiBold',sans-serif] font-semibold leading-[44px] relative shrink-0 text-[#191818] text-[36px] w-full" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                {title}
              </p>
              <p className="font-['Bricolage_Grotesque:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#494848] text-[16px] w-full whitespace-pre-wrap" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                {serviceDesignFeature?.description}
              </p>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="basis-0 content-stretch flex grow items-center max-w-[50%] min-h-px min-w-px relative shrink-0">
            <div className="relative shrink-0 w-full h-[500px] overflow-clip rounded-[16px]">
              <Image
                src="/rag-results.png"
                alt="Service design work at Telenor"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Second Row: Image on Left, Content on Right */}
        <div className="box-border content-stretch flex gap-[64px] items-center relative w-full">
          {/* Left Column - Image */}
          <div className="basis-0 content-stretch flex grow items-center max-w-[50%] min-h-px min-w-px relative shrink-0">
            <div className="relative shrink-0 w-full h-[400px] overflow-clip rounded-[16px] bg-gray-100">
              {/* Chart placeholder - simplified version */}
              <div className="flex items-center justify-center h-full p-6">
                <div className="flex items-end justify-center h-[200px] space-x-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-24 bg-gray-400 rounded-t-sm"></div>
                    <span className="text-xs mt-2">Creating user journeys</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-32 bg-gray-600 rounded-t-sm"></div>
                    <span className="text-xs mt-2">Understanding needs</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-16 bg-gray-400 rounded-t-sm"></div>
                    <span className="text-xs mt-2">Creating wireframes</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 bg-gray-300 rounded-t-sm"></div>
                    <span className="text-xs mt-2">Designing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Content (Testimonial) */}
          <div className="basis-0 content-center flex flex-col gap-[48px] grow items-start max-w-[50%] min-h-px min-w-px relative shrink-0">
            {/* Testimonial */}
            {testimonialFeature && (
              <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
                <p className="font-['Bricolage_Grotesque:SemiBold',sans-serif] font-semibold leading-[32px] relative shrink-0 text-[#191818] text-[24px] w-full" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                  {testimonialFeature.title}
                </p>
                <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
                  <p className="font-['Bricolage_Grotesque:Regular',sans-serif] font-normal leading-[28px] relative shrink-0 text-[#494848] text-[18px] w-full italic" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                    {testimonialFeature.description.split('\n')[0]}
                  </p>
                  <div>
                    <p className="font-['Bricolage_Grotesque:SemiBold',sans-serif] font-semibold leading-[24px] relative shrink-0 text-[#191818] text-[16px]" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                      {testimonialFeature.description.split('\n')[1]}
                    </p>
                    <p className="font-['Bricolage_Grotesque:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[#666] text-[14px]" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                      Head of Digital Sales & Marketing
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}