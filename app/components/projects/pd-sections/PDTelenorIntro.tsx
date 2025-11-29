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
    <section className="bg-white w-full py-8 sm:py-12 md:py-16 lg:py-[96px] min-h-[760px] xl:min-h-[760px]" style={{ minHeight: '760px' }}>
      <div className="max-w-[1200px] mx-auto w-full px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="flex flex-col gap-6 sm:gap-8 md:gap-12 lg:gap-[64px] items-center w-full">

          {/* Row 1: Two columns (Text Left / Image Right) */}
          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-12 lg:gap-[64px] items-center w-full">

            {/* Left Column - Content */}
            <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 lg:gap-[48px] items-start w-full lg:w-1/2">

              {/* Service Design Text */}
              <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 lg:gap-[16px] items-start w-full">
                <h2 className="font-['Bricolage_Grotesque:SemiBold',sans-serif] font-semibold leading-8 sm:leading-10 md:leading-[40px] lg:leading-[44px] text-[#191818] text-lg sm:text-xl md:text-2xl lg:text-[36px] w-full" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                  {title}
                </h2>
                <p className="font-['Bricolage_Grotesque:Regular',sans-serif] font-normal leading-6 sm:leading-7 md:leading-[22px] lg:leading-[24px] text-[#494848] text-sm sm:text-base md:text-[15px] lg:text-[16px] w-full whitespace-pre-wrap" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                  {serviceDesignFeature?.description}
                </p>
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="w-full lg:w-1/2 h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] overflow-clip rounded-[16px] relative lg:order-2">
              <Image
                src="/rag-results.png"
                alt="Service design work at Telenor"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Row 2: Two columns (Image Left / Text Right) */}
          <div className="flex flex-col-reverse lg:flex-row gap-6 sm:gap-8 md:gap-12 lg:gap-[64px] items-center w-full">

            {/* Left Column - Image */}
            <div className="w-full lg:w-1/2 h-[150px] sm:h-[200px] md:h-[300px] lg:h-[400px] overflow-clip rounded-[16px] bg-gray-100 relative lg:order-2">

              {/* Chart placeholder - simplified version */}
              <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6">
                <div className="flex items-end justify-center h-[100px] sm:h-[150px] md:h-[200px] space-x-2 sm:space-x-4 w-full">
                  <div className="flex flex-col items-center flex-1">
                    <div className="w-6 sm:w-8 h-12 sm:h-24 bg-gray-400 rounded-t-sm flex-1"></div>
                    <span className="text-[10px] sm:text-xs mt-1 sm:mt-2 text-center">Creating user journeys</span>
                  </div>
                  <div className="flex flex-col items-center flex-1">
                    <div className="w-6 sm:w-8 h-16 sm:h-32 bg-gray-600 rounded-t-sm flex-1"></div>
                    <span className="text-[10px] sm:text-xs mt-1 sm:mt-2 text-center">Understanding needs</span>
                  </div>
                  <div className="flex flex-col items-center flex-1">
                    <div className="w-6 sm:w-8 h-8 sm:h-16 bg-gray-400 rounded-t-sm flex-1"></div>
                    <span className="text-[10px] sm:text-xs mt-1 sm:mt-2 text-center">Creating wireframes</span>
                  </div>
                  <div className="flex flex-col items-center flex-1">
                    <div className="w-6 sm:w-8 h-4 sm:h-8 bg-gray-300 rounded-t-sm flex-1"></div>
                    <span className="text-[10px] sm:text-xs mt-1 sm:mt-2 text-center">Designing</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Content (Testimonial) */}
            <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 lg:gap-[48px] items-start w-full lg:w-1/2 lg:order-1">

              {/* Testimonial */}
              {testimonialFeature && (
                <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 lg:gap-[24px] items-start w-full">
                  <h3 className="font-['Bricolage_Grotesque:SemiBold',sans-serif] font-semibold leading-8 sm:leading-9 md:leading-[30px] lg:leading-[32px] text-[#191818] text-base sm:text-lg md:text-xl lg:text-[24px] w-full" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                    {testimonialFeature.title}
                  </h3>
                  <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 lg:gap-[16px] items-start w-full">
                    <p className="font-['Bricolage_Grotesque:Regular',sans-serif] font-normal leading-7 sm:leading-8 md:leading-[26px] lg:leading-[28px] text-[#494848] text-sm sm:text-base md:text-lg lg:text-[18px] w-full italic" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                      {testimonialFeature.description.split('\n')[0]}
                    </p>
                    <div className="flex flex-col gap-2">
                      <p className="font-['Bricolage_Grotesque:SemiBold',sans-serif] font-semibold leading-6 sm:leading-7 md:leading-[22px] lg:leading-[24px] text-[#191818] text-sm sm:text-base md:text-[15px] lg:text-[16px]" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                        {testimonialFeature.description.split('\n')[1]}
                      </p>
                      <p className="font-['Bricolage_Grotesque:Regular',sans-serif] font-normal leading-5 sm:leading-6 md:leading-[18px] lg:leading-[20px] text-[#66] text-xs sm:text-sm md:text-[13px] lg:text-[14px]" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
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
    </section>
  );
}
