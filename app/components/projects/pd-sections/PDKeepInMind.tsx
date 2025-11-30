'use client';

import React from 'react';

interface PDKeepInMindProps {
  title: string;
  description: string;
}

export default function PDKeepInMind({ title, description }: PDKeepInMindProps) {
  return (
    <section
      className="w-full py-8 sm:py-12 md:py-16 lg:py-[96px] min-h-[540px] xl:min-h-[540px] max-h-[540px] flex items-center justify-center"
      style={{
        background: 'radial-gradient(56.8% 56.8% at 50% 127.11%, #AB6236 0%, #252222 100%)',
        minHeight: '540px',
        maxHeight: '540px'
      }}
    >
      <div className="max-w-[1200px] mx-auto w-full px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center">
        <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 lg:gap-[32px] py-0 w-full">

          {/* Title and Description in single column */}
          <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 lg:gap-[20px] items-center w-full">

            <h2 className="font-['Bricolage_Grotesque:SemiBold',sans-serif] font-semibold leading-8 sm:leading-10 md:leading-[40px] lg:leading-[44px] text-lg sm:text-xl md:text-2xl lg:text-[36px] text-center text-white w-full max-w-[768px] mx-auto" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
              {title}
            </h2>

            <p className="font-['Bricolage_Grotesque:SemiBold',sans-serif] font-semibold leading-normal sm:leading-6 md:leading-7 lg:leading-[normal] text-base sm:text-lg md:text-xl lg:text-[20px] text-center text-white w-full max-w-[768px] mx-auto" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
              {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
