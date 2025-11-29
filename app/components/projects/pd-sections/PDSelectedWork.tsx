'use client';

import React from 'react';

interface PDSelectedWorkProps {
  title: string;
  description: string;
}

export default function PDSelectedWork({ title, description }: PDSelectedWorkProps) {
 return (
    <section className="w-full py-8 sm:py-12 md:py-16 lg:py-[96px] min-h-[760px] xl:min-h-[760px]" style={{ minHeight: '760px' }}>
      <div className="max-w-[1200px] mx-auto w-full px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 lg:gap-[32px] py-0 w-full">

          {/* Title */}
          <h2 className="font-['Bricolage_Grotesque:SemiBold',sans-serif] font-semibold leading-8 sm:leading-10 md:leading-[40px] lg:leading-[44px] text-[#191818] text-lg sm:text-xl md:text-2xl lg:text-[36px] text-center w-full" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
            {title}
          </h2>

          {/* Description */}
          <p className="font-['Bricolage_Grotesque:Regular',sans-serif] font-normal leading-7 sm:leading-8 md:leading-[28px] lg:leading-[30px] text-[#475467] text-sm sm:text-base md:text-lg lg:text-[20px] text-center w-full max-w-[768px] mx-auto" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
