'use client';

import React from 'react';

interface PDKeepInMindProps {
  title: string;
  description: string;
}

export default function PDKeepInMind({ title, description }: PDKeepInMindProps) {
  return (
    <div
      className="box-border content-stretch flex flex-col gap-[64px] items-center px-0 py-[96px] relative size-full"
      style={{
        background: 'radial-gradient(56.8% 56.8% at 50% 127.11%, #AB6236 0%, #252222 100%)'
      }}
    >
      <div className="box-border content-stretch flex flex-col gap-[64px] items-center overflow-clip px-0 py-[96px] relative shrink-0">
        <div className="box-border content-stretch flex flex-col gap-[32px] items-start max-w-[1280px] px-[32px] py-0 relative shrink-0 w-[1280px]">
          <div className="content-stretch flex flex-col gap-[32px] items-center relative shrink-0 w-full">
            <div className="content-stretch flex flex-col gap-[20px] items-center max-w-[768px] relative shrink-0 w-full">
              <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
                <p className="font-['Bricolage_Grotesque:SemiBold',sans-serif] font-semibold leading-[44px] relative shrink-0 text-[36px] text-center text-white w-full" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                  {title}
                </p>
              </div>
              <p className="font-['Bricolage_Grotesque:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[20px] text-center text-white w-full" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}