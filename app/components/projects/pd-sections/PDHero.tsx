'use client';

import React from 'react';

interface PDHeroProps {
  title: string;
  subtitle: string;
  titleHighlight?: string;
  background?: string;
}

export default function PDHero({
  title,
  subtitle,
  titleHighlight,
  background = 'bg-[#252222]'
}: PDHeroProps) {
  // Split subtitle to highlight the titleHighlight part
  const subtitleParts = subtitle.split(titleHighlight || '');

  return (
    <div className={`${background} content-stretch flex flex-col isolate items-center relative size-full`}>
      <div className="box-border content-stretch flex flex-col gap-[64px] min-h-[700px] items-center pb-0 pt-[96px] px-0 relative shrink-0 w-full z-[1]">
        <div className="max-w-[1280px] relative rounded-[16px] shrink-0 w-full">
          <div className="flex flex-col items-center max-w-inherit overflow-clip rounded-[inherit] size-full">
            <div className="box-border content-stretch flex flex-col gap-[32px] items-center max-w-inherit pb-0 pt-[40px] px-[32px] relative w-full">
              <div className="content-stretch flex flex-col gap-[48px] items-center relative shrink-0 w-full">
                <div className="content-stretch flex flex-col gap-[24px] items-center max-w-[1024px] relative shrink-0 w-full">
                  <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0 w-full">
                    <p className="font-['Bricolage_Grotesque:Bold',sans-serif] font-bold leading-[120px] relative shrink-0 text-[90px] text-center text-white tracking-[-1.8px] max-w-[800px] mx-auto w-full" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                      {title}
                    </p>
                  </div>
                  <p className="font-['Bricolage_Grotesque:Regular',sans-serif] font-normal leading-[30px] max-w-[768px] relative shrink-0 text-[#babcc0] text-[20px] text-center w-full" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                    {subtitleParts[0]}
                    {titleHighlight && (
                      <span className="font-['Bricolage_Grotesque:Bold',sans-serif] font-bold text-[#f38300]" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
                        {titleHighlight}
                      </span>
                    )}
                    {subtitleParts[1]}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}