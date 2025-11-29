'use client';

import React from 'react';

interface MLKeyResultsOnlyProps {
  title: string;
  description: string;
  image: string;
  background?: string;
}

export default function MLKeyResultsOnly({
  title,
  description,
  image,
  background = 'bg-[#252222]'
}: MLKeyResultsOnlyProps) {
  return (
    <section className={`${background} py-16 md:py-24 relative z-10`}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          {title && (
            <h2 className="font-['Bricolage_Grotesque',sans-serif] text-white text-3xl sm:text-4xl mb-5" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
              {title}
            </h2>
          )}
          {description && (
            <p className="font-['Bricolage_Grotesque',sans-serif] text-white text-lg sm:text-xl max-w-[768px] mb-8" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
              {description}
            </p>
          )}
        </div>

        <div className="flex justify-center">
          <img
            src={image}
            alt={title || "Key Results"}
            className="w-full max-w-full h-auto rounded-lg"
          />
        </div>
      </div>
    </section>
  );
}
