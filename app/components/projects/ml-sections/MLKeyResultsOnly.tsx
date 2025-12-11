'use client';

import React from 'react';
import VideoPlayer from '@/components/ui/VideoPlayer';

interface MLKeyResultsOnlyProps {
  title: string;
  description: string;
  image: string;
  video?: string;
  background?: string;
}

export default function MLKeyResultsOnly({
  title,
  description,
  image,
  video,
  background = 'bg-bg-light'
}: MLKeyResultsOnlyProps) {
  return (
    <section className={`py-16 md:py-24 lg:py-32 relative z-10 rounded-bl-[32px] rounded-br-[32px] overflow-hidden`}>
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="mb-12 w-full">
          {title && (
            <h2 className="font-bricolage text-display-md font-semibold mb-5">
              {title}
            </h2>
          )}
          {description && (
            <p className="font-bricolage text-text-xl-regular max-w-[768px] mb-8">
              {description}
            </p>
          )}
        </div>

        <div className="flex justify-center">
          {video ? (
            <VideoPlayer
              src={video}
              title={title || "Key Results"}
              width={1216}
              height={600}
            />
          ) : (
            <img
              src={image}
              alt={title || "Key Results"}
              className="w-full max-w-full h-auto rounded-lg"
            />
          )}
        </div>
      </div>
    </section>
  );
}
