'use client';

import React from 'react';
import Image from 'next/image';

interface MLArchitectureProps {
  title: string;
  description: string;
  image: string;
  background?: string;
}

export default function MLArchitecture({
  title,
  description,
  image,
  background = 'bg-white'
}: MLArchitectureProps) {
  return (
    <section className={`${background} py-16 md:py-24 relative`}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          {title && (
            <h2 className="font-['Bricolage_Grotesque',sans-serif] text-[#101828] text-3xl sm:text-4xl mb-5" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
              {title}
            </h2>
          )}
          {description && (
            <p className="font-['Bricolage_Grotesque',sans-serif] text-[#494848] text-lg sm:text-xl max-w-[768px]" style={{ fontVariationSettings: "'opsz' 14, 'wdth' 100" }}>
              {description}
            </p>
          )}
        </div>

        {image && (
          <div className="flex justify-center">
            <Image
              src={image}
              alt={title || 'Architecture Diagram'}
              className="w-full max-w-[800px] rounded-lg"
              width={800}
              height={500}
            />
          </div>
        )}
      </div>
    </section>
  );
}