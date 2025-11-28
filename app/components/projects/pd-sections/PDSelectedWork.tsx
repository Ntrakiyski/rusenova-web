'use client';

import React from 'react';

interface PDSelectedWorkProps {
  title: string;
  description: string;
}

export default function PDSelectedWork({ title, description }: PDSelectedWorkProps) {
  return (
    <div className="box-border content-stretch flex flex-col gap-[64px] items-center px-0 py-[96px] relative size-full">
      <div className="max-w-[1280px] relative shrink-0 w-full">
        <div className="flex flex-col items-center max-w-inherit size-full">
          <div className="box-border content-stretch flex flex-col gap-[32px] items-center max-w-inherit px-[32px] py-0 relative w-full">
            <div className="content-stretch flex flex-col gap-[32px] items-center relative shrink-0 w-full">
              <div className="content-stretch flex flex-col gap-[20px] items-center max-w-[768px] relative shrink-0 w-full">
                <div className="content-stretch flex flex-col gap-[12px] items-center relative shrink-0 w-full">
                  <p className="font-['Bricolage_Grotesque:SemiBold',sans-serif] font-semibold leading-[44px] relative shrink-0 text-[#191818] text-[36px] text-center w-full" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                    {title}
                  </p>
                </div>
                <p className="font-['Bricolage_Grotesque:Regular',sans-serif] font-normal leading-[30px] relative shrink-0 text-[#475467] text-[20px] text-center w-full" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                  {description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}