'use client';

import React from 'react';

interface PDSelectedWorkProps {
  title: string;
  description: string;
}

export default function PDSelectedWork({ title, description }: PDSelectedWorkProps) {
 return (
    <section className="w-full py-8 sm:py-12 md:py-16 lg:py-[96px]">
      <div className="max-w-[1200px] mx-auto w-full px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 lg:gap-[32px] py-0 w-full">

          {/* Title */}
          <h2 className="font-bricolage font-semibold text-display-md text-text-primary text-center w-full">
            {title}
          </h2>

          {/* Description */}
          <p className="font-bricolage font-normal text-text-xl-regular text-text-secondary text-center w-full max-w-[768px] mx-auto">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
