'use client';

import React from 'react';

interface PDKeepInMindProps {
  title: string;
  description: string;
}

export default function PDKeepInMind({ title, description }: PDKeepInMindProps) {
  return (
    <div
      className="box-border content-stretch flex-col gap-6 sm:gap-8 md:gap-12 lg:gap-[64px] items-center px-0 py-8 sm:py-12 md:py-16 lg:py-[96px] relative size-full"
      style={{
        background: 'radial-gradient(56.8% 56.8% at 50% 127.11%, #AB6236 0%, #252222 100%)'
      }}
    >
      <div className="box-border content-stretch flex-col gap-6 sm:gap-8 md:gap-12 lg:gap-[64px] items-center overflow-clip px-0 py-8 sm:py-12 md:py-16 lg:py-[96px] relative shrink-0">
        <div className="box-border content-stretch flex-col gap-4 sm:gap-6 md:gap-8 lg:gap-[32px] items-start max-w-full sm:max-w-[360px] md:max-w-[512px] lg:max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-[32px] py-0 relative shrink-0 w-full">
          <div className="content-stretch flex-col gap-4 sm:gap-6 md:gap-8 lg:gap-[32px] items-center relative shrink-0 w-full">
            <div className="content-stretch flex-col gap-4 sm:gap-6 md:gap-8 lg:gap-[20px] items-center max-w-full sm:max-w-[300px] md:max-w-[512px] lg:max-w-[768px] relative shrink-0 w-full px-4">
              <div className="content-stretch flex-col gap-3 sm:gap-4 md:gap-6 lg:gap-[12px] items-start relative shrink-0 w-full">
                <p className="font-['Bricolage_Grotesque:SemiBold',sans-serif] font-semibold leading-8 sm:leading-10 md:leading-[40px] lg:leading-[44px] relative shrink-0 text-lg sm:text-xl md:text-2xl lg:text-[36px] text-center text-white w-full" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                  {title}
                </p>
              </div>
              <p className="font-['Bricolage_Grotesque:SemiBold',sans-serif] font-semibold leading-normal sm:leading-6 md:leading-7 lg:leading-[normal] relative shrink-0 text-base sm:text-lg md:text-xl lg:text-[20px] text-center text-white w-full" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
