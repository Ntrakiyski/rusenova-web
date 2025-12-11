'use client';

import React from 'react';
import Image from 'next/image';

interface PDKeepInMindProps {
  title: string;
  description: string;
}

export default function PDKeepInMind({ title, description }: PDKeepInMindProps) {
  return (
    <section
      className="w-full py-16 md:py-24 lg:py-32 flex items-center justify-center bg-bg-dark relative overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto w-full px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center">
        <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 lg:gap-[32px] py-0 w-full">
          <div className="relative rounded-lg w-full">
            <div className="flex flex-col items-center overflow-clip rounded-[inherit] w-full">
              <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 lg:gap-[32px] py-0 w-full">
                <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 lg:gap-[20px] items-center w-full">
                  <h2 className="font-bricolage font-semibold text-display-md text-center text-white w-full max-w-[768px] mx-auto">
                    {title}
                  </h2>

                  <p className="font-bricolage font-regular text-xl text-center text-white w-full max-w-[768px] mx-auto">
                    {description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-[-1935px] right-[-425px] z-0 w-[2130px] h-[2130px]">
        <Image
          alt=""
          className="pointer-events-none object-cover object-bottom-right"
          src="/gradient-orange-pink.png"
          width={2130}
          height={2130}
        />
      </div>
    </section>
  );
}
