'use client';

import React from 'react';
import Image from 'next/image';

interface MLArchitectureProps {
  title: string;
  description: string;
  image: string;
  background?: string;
}

/**
 * MLArchitecture component displays the architecture section of an ML project.
 * Shows project architecture with title, description, and visual diagram.
 * 
 * @param title - Section title
 * @param description - Section description
 * @param image - Architecture diagram image URL
 * @param background - Optional background color class (defaults to bg-bg-white)
 */
export default function MLArchitecture({
  title,
  description,
  image,
  background = 'bg-bg-white'
}: MLArchitectureProps) {
  return (
    <section className={`${background} py-16 md:py-24 lg:py-32 relative`}>
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 h-full">
        {/* Title and Description Row */}
        <div className="mb-12">
          {title && (
            <h2 className="font-bricolage text-text-primary text-display-md font-semibold mb-5">
              {title}
            </h2>
          )}
          {description && (
            <p className="font-bricolage text-text-secondary text-text-xl-regular max-w-[768px]">
              {description}
            </p>
          )}
        </div>

        {/* Content Row with Image */}
        {image && (
          <div className="flex justify-center">
            <Image
              src={image}
              alt={title || 'Architecture Diagram'}
              className="w-full rounded-lg"
              width={800}
              height={500}
            />
          </div>
        )}
      </div>
    </section>
  );
}
